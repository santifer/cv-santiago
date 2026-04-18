#!/usr/bin/env python3
"""Submit sitemap to Google Search Console via service account.

Usage: python3 scripts/gsc-submit-sitemap.py
Requires: GOOGLE_APPLICATION_CREDENTIALS env var or ~/.config/gsc/credentials.json
"""
import json, time, urllib.request, urllib.parse, base64, os, sys

CREDS_PATH = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", os.path.expanduser("~/.config/gsc/credentials.json"))
SITE_URL = "sc-domain:xueyifan.io"
SITEMAP_URL = "https://xueyifan.io/sitemap.xml"

try:
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding
except ImportError:
    print("ERROR: pip3 install cryptography")
    sys.exit(1)

with open(CREDS_PATH) as f:
    creds = json.load(f)

header = base64.urlsafe_b64encode(json.dumps({"alg":"RS256","typ":"JWT"}).encode()).rstrip(b'=').decode()
now = int(time.time())
payload = base64.urlsafe_b64encode(json.dumps({
    "iss": creds["client_email"],
    "scope": "https://www.googleapis.com/auth/webmasters",
    "aud": creds["token_uri"],
    "iat": now, "exp": now + 3600,
}).encode()).rstrip(b'=').decode()

pk = serialization.load_pem_private_key(creds["private_key"].encode(), password=None)
sig = base64.urlsafe_b64encode(pk.sign(f"{header}.{payload}".encode(), padding.PKCS1v15(), hashes.SHA256())).rstrip(b'=').decode()

data = urllib.parse.urlencode({"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer", "assertion": f"{header}.{payload}.{sig}"}).encode()
token = json.loads(urllib.request.urlopen(urllib.request.Request(creds["token_uri"], data=data)).read())["access_token"]

site_encoded = urllib.parse.quote(SITE_URL, safe='')
sitemap_encoded = urllib.parse.quote(SITEMAP_URL, safe='')
url = f"https://www.googleapis.com/webmasters/v3/sites/{site_encoded}/sitemaps/{sitemap_encoded}"

req = urllib.request.Request(url, method="PUT", headers={"Authorization": f"Bearer {token}", "Content-Length": "0"})
try:
    resp = urllib.request.urlopen(req)
    print(f"✅ GSC sitemap submitted ({resp.status})")
except urllib.error.HTTPError as e:
    print(f"❌ GSC submit failed ({e.code}): {e.read().decode()[:200]}")
    sys.exit(1)
