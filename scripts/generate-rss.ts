/**
 * Auto-generates rss.xml from the article registry.
 *
 * Runs as part of the build pipeline (after generate-sitemap, before prerender).
 * One item per article, EN slug as canonical link (global audience).
 * Consumers: GitHub profile workflow (warpchart), feed readers.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/generate-rss.ts
 */

import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { articleRegistry } from '../src/articles/registry.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '..', 'dist')

const base = 'https://santifer.io'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T08:00:00Z`).toUTCString()
}

const articles = [...articleRegistry]
  .filter((a) => a.seoMeta?.datePublished)
  .sort((a, b) => (a.seoMeta!.datePublished < b.seoMeta!.datePublished ? 1 : -1))

const items = articles.map((a) => {
  const link = `${base}/${a.slugs.en}`
  return `    <item>
      <title>${escapeXml(a.seo.en.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.seo.en.description)}</description>
      <pubDate>${rfc822(a.seoMeta!.datePublished)}</pubDate>
    </item>`
})

const lastModified = articles
  .map((a) => a.seoMeta!.dateModified ?? a.seoMeta!.datePublished)
  .sort()
  .at(-1)!

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>santifer.io — Articles</title>
    <link>${base}</link>
    <description>Case studies on AI agents, multi-agent systems, LLMOps and open source — by Santiago Fernández de Valderrama (santifer).</description>
    <language>en</language>
    <lastBuildDate>${rfc822(lastModified)}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>
`

writeFileSync(resolve(dist, 'rss.xml'), xml, 'utf-8')
console.log(`[rss] Generated ${items.length} items in dist/rss.xml`)
