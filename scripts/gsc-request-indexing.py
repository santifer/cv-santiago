#!/usr/bin/env python3
"""Request Google indexing for all sitemap URLs via Indexing API.

Usage: python3 scripts/gsc-request-indexing.py
Requires: GOOGLE_APPLICATION_CREDENTIALS or ~/.config/gsc/credentials.json
          + Indexing API enabled in Google Cloud project
"""
import json, time, urllib.request, urllib.parse, base64, os, sys, xml.etree.ElementTree as ET

CREDS_PATH = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", os.path.expanduser("~/.config/gsc/credentials.json"))
SITEMAP_URL = "https://xueyifan.io/sitemap.xml"

try:
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding
except ImportError:
    print("ERROR: pip3 install cryptography")
    sys.exit(1)

# Fetch sitemap URLs
try:
    sitemap = urllib.request.urlopen(SITEMAP_URL).read().decode()
    root = ET.fromstring(sitemap)
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [loc.text for loc in root.findall('.//s:loc', ns)]
except Exception as e:
    print(f"ERROR: Could not fetch sitemap: {e}")
    sys.exit(1)

if not urls:
    print("No URLs found in sitemap")
    sys.exit(0)

# Auth
with open(CREDS_PATH) as f:
    creds = json.load(f)

header = base64.urlsafe_b64encode(json.dumps({"alg":"RS256","typ":"JWT"}).encode()).rstrip(b'=').decode()
now = int(time.time())
payload = base64.urlsafe_b64encode(json.dumps({
    "iss": creds["client_email"],
    "scope": "https://www.googleapis.com/auth/indexing",
    "aud": creds["token_uri"],
    "iat": now, "exp": now + 3600,
}).encode()).rstrip(b'=').decode()

pk = serialization.load_pem_private_key(creds["private_key"].encode(), password=None)
sig = base64.urlsafe_b64encode(pk.sign(f"{header}.{payload}".encode(), padding.PKCS1v15(), hashes.SHA256())).rstrip(b'=').decode()

data = urllib.parse.urlencode({"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer", "assertion": f"{header}.{payload}.{sig}"}).encode()
token = json.loads(urllib.request.urlopen(urllib.request.Request(creds["token_uri"], data=data)).read())["access_token"]

# Request indexing
ok = 0
fail = 0
for url in urls:
    body = json.dumps({"url": url, "type": "URL_UPDATED"}).encode()
    req = urllib.request.Request(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        data=body,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req)
        ok += 1
    except urllib.error.HTTPError:
        fail += 1

print(f"✅ Google Indexing API: {ok}/{len(urls)} URLs submitted" + (f" ({fail} failed)" if fail else ""))
