/**
 * Pings IndexNow API with all URLs from dist/sitemap.xml after build.
 *
 * Only runs when INDEXNOW_ENABLED=true (Vercel CI, not local).
 *
 * Usage:
 *   INDEXNOW_ENABLED=true npx tsx --tsconfig tsconfig.app.json scripts/indexnow-ping.ts
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Guard: only run when explicitly enabled
// ---------------------------------------------------------------------------

if (process.env.INDEXNOW_ENABLED !== 'true') {
  console.log('[indexnow] Skipped (INDEXNOW_ENABLED !== true)')
  process.exit(0)
}

// ---------------------------------------------------------------------------
// Read key
// ---------------------------------------------------------------------------

const keyPath = resolve(root, 'public', 'indexnow-key.txt')
const key = readFileSync(keyPath, 'utf-8').trim()

if (!key) {
  console.error('[indexnow] ERROR: empty key in public/indexnow-key.txt')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Parse sitemap.xml for <loc> URLs
// ---------------------------------------------------------------------------

const sitemapPath = resolve(root, 'dist', 'sitemap.xml')
let sitemap: string
try {
  sitemap = readFileSync(sitemapPath, 'utf-8')
} catch {
  console.error('[indexnow] ERROR: dist/sitemap.xml not found. Run build first.')
  process.exit(1)
}

const urls: string[] = []
const locRegex = /<loc>([^<]+)<\/loc>/g
let match: RegExpExecArray | null
while ((match = locRegex.exec(sitemap)) !== null) {
  urls.push(match[1])
}

if (urls.length === 0) {
  console.warn('[indexnow] No URLs found in sitemap.xml')
  process.exit(0)
}

console.log(`[indexnow] Pinging ${urls.length} URLs...`)

// ---------------------------------------------------------------------------
// POST to IndexNow API
// ---------------------------------------------------------------------------

const host = 'xueyifan.io'
const keyLocation = `https://${host}/indexnow-key.txt`

const body = {
  host,
  key,
  keyLocation,
  urlList: urls,
}

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  console.log(`[indexnow] Response: ${res.status} ${res.statusText}`)

  if (res.ok || res.status === 200 || res.status === 202) {
    for (const url of urls) {
      console.log(`  -> ${url}`)
    }
    console.log(`[indexnow] Done. ${urls.length} URLs submitted.`)
  } else {
    const text = await res.text()
    console.error(`[indexnow] Unexpected response: ${text}`)
    // Don't fail the build over IndexNow issues
  }
} catch (err) {
  console.error(`[indexnow] Network error (non-blocking):`, err)
  // Don't fail the build over IndexNow issues
}
