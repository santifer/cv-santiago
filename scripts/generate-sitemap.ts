/**
 * Auto-generates sitemap.xml from the article registry.
 *
 * Runs as part of the build pipeline (after vite build, before prerender).
 * Ensures every registered article has proper <url> entries with hreflang.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { articleRegistry } from '../src/articles/registry.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '..', 'dist')

const today = new Date().toISOString().slice(0, 10)

// ---------------------------------------------------------------------------
// URL builder
// ---------------------------------------------------------------------------

interface SitemapUrl {
  loc: string
  hreflangEs: string
  hreflangEn: string
  xDefault: string
  lastmod: string
  priority: string
}

function urlBlock(u: SitemapUrl): string {
  return `  <url>
    <loc>${u.loc}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${u.hreflangEs}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.hreflangEn}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.xDefault}"/>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
}

// ---------------------------------------------------------------------------
// Build URLs
// ---------------------------------------------------------------------------

const base = 'https://xueyifan.io'
const urls: SitemapUrl[] = []

// Home ES + EN
urls.push({
  loc: `${base}/`,
  hreflangEs: `${base}/`,
  hreflangEn: `${base}/en`,
  xDefault: `${base}/`,
  lastmod: today,
  priority: '1.0',
})
urls.push({
  loc: `${base}/en`,
  hreflangEs: `${base}/`,
  hreflangEn: `${base}/en`,
  xDefault: `${base}/`,
  lastmod: today,
  priority: '0.9',
})

// About / Entity Home — ES + EN
urls.push({
  loc: `${base}/sobre-mi`,
  hreflangEs: `${base}/sobre-mi`,
  hreflangEn: `${base}/about`,
  xDefault: `${base}/sobre-mi`,
  lastmod: today,
  priority: '0.9',
})
urls.push({
  loc: `${base}/about`,
  hreflangEs: `${base}/sobre-mi`,
  hreflangEn: `${base}/about`,
  xDefault: `${base}/sobre-mi`,
  lastmod: today,
  priority: '0.9',
})

// Articles from registry
for (const article of articleRegistry) {
  const esUrl = `${base}/${article.slugs.es}`
  const enUrl = `${base}/${article.slugs.en}`
  const xDefault = `${base}/${article.xDefaultSlug ?? article.slugs.es}`

  const articleLastmod = article.seoMeta?.dateModified ?? today

  // ES version
  urls.push({
    loc: esUrl,
    hreflangEs: esUrl,
    hreflangEn: enUrl,
    xDefault,
    lastmod: articleLastmod,
    priority: '0.8',
  })

  // EN version (skip if same slug — already covered)
  if (article.slugs.en !== article.slugs.es) {
    urls.push({
      loc: enUrl,
      hreflangEs: esUrl,
      hreflangEn: enUrl,
      xDefault,
      lastmod: articleLastmod,
      priority: '0.8',
    })
  }
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(urlBlock).join('\n')}
</urlset>
`

writeFileSync(resolve(dist, 'sitemap.xml'), xml, 'utf-8')
console.log(`[sitemap] Generated ${urls.length} URLs in dist/sitemap.xml`)
