/**
 * Post-build prerender for Farid-only public surface.
 *
 * The public surface is intentionally small and explicit. Legacy routes are
 * not prerendered; they should resolve to 404/noindex instead of redirecting.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import React, { Suspense } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Critters from 'critters'
import App from '../src/App.tsx'
import GlobalNav from '../src/GlobalNav.tsx'
import BlogIndexPage from '../src/BlogIndexPage.tsx'
import BlogPostPage from '../src/BlogPostPage.tsx'
import { getPrerenderRoutes, blockedLegacyRoutes } from '../src/public-surface/routes.ts'
import { getHomeSeo, getHomeJsonLd, getBlogIndexSeo, getBlogIndexJsonLd, getArticleSeo, getArticleJsonLd, absoluteUrl } from '../src/public-surface/seo.ts'
import { findForbiddenPublicIdentityTerms } from '../src/public-surface/forbidden-identity.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const indexPath = resolve(distDir, 'index.html')

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripReactSSRTags(html: string): string {
  return html.replace(/<link[^>]*>/g, '')
}

function NotFound() {
  return (
    <main className="farid-shell farid-not-found">
      <h1 className="farid-display">404</h1>
      <p>That page is not part of Farid's portfolio.</p>
      <Link to="/" className="farid-button-primary">Back home</Link>
    </main>
  )
}

function AppRoutes() {
  const { pathname } = useLocation()
  return (
    <>
      <GlobalNav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/en" element={<App />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {blockedLegacyRoutes.map(path => <Route key={path} path={path} element={<NotFound />} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <span hidden data-prerender-path={pathname} />
    </>
  )
}

function renderRoute(path: string): string {
  return stripReactSSRTags(renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>,
  ))
}

function replaceOrInsertMeta(html: string, selector: RegExp, replacement: string, before = '</head>'): string {
  if (selector.test(html)) return html.replace(selector, replacement)
  return html.replace(before, `    ${replacement}\n  ${before}`)
}

function replaceJsonLd(html: string, jsonLd: object): string {
  const script = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`
  if (/<script type="application\/ld\+json">[\s\S]*?<\/script>/.test(html)) {
    return html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, script)
  }
  return html.replace('</head>', `    ${script}\n  </head>`)
}

function injectArticleHreflang(html: string, articleSeo: NonNullable<ReturnType<typeof getArticleSeo>>): string {
  const { article } = articleSeo
  const links = [
    { lang: 'es', slug: article.slugs.es },
    { lang: 'en', slug: article.slugs.en },
    { lang: 'x-default', slug: article.xDefaultSlug || article.slugs.en },
  ]
    .map(({ lang, slug }) => `<link rel="alternate" hreflang="${lang}" href="${absoluteUrl(`/${slug}`)}" />`)
    .join('\n    ')

  const withoutExisting = html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '')
  return withoutExisting.replace('</head>', `    ${links}\n  </head>`)
}

function applySeo(html: string, routePath: string): string {
  const isBlogIndex = routePath === '/blog'
  const isArticle = routePath.startsWith('/blog/')
  const articleSeo = isArticle ? getArticleSeo(routePath) : null
  const seo = articleSeo || (isBlogIndex ? getBlogIndexSeo() : getHomeSeo(routePath))
  const jsonLd = articleSeo ? getArticleJsonLd(routePath) : (isBlogIndex ? getBlogIndexJsonLd() : getHomeJsonLd(routePath))
  const title = seo.title
  const description = seo.description
  const url = seo.url
  const image = seo.image

  let result = html
    .replace('<html lang="en" class="dark">', `<html lang="en" class="dark">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(title)}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${isArticle ? 'article' : 'website'}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:site_name" content="[^"]*" \/>/, `<meta property="og:site_name" content="sayagos.tech" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`)

  result = replaceOrInsertMeta(result, /<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="index, follow" />')
  if (isArticle && articleSeo?.article.seoMeta) {
    const meta = articleSeo.article.seoMeta
    result = result.replace('</head>', `    <meta property="article:published_time" content="${meta.datePublished}" />\n    <meta property="article:modified_time" content="${meta.dateModified}" />\n    <meta property="article:author" content="https://www.linkedin.com/in/faridsayago/" />\n    <meta property="article:tag" content="${esc(meta.articleTags)}" />\n  </head>`)
  }
  if (articleSeo) result = injectArticleHreflang(result, articleSeo)
  return jsonLd ? replaceJsonLd(result, jsonLd) : result
}

function injectRoot(html: string, rendered: string): string {
  return html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)
}

let indexHtml: string
try {
  indexHtml = readFileSync(indexPath, 'utf-8')
} catch {
  console.error('Error: dist/index.html not found. Run "vite build" first.')
  process.exit(1)
}

const critters = new Critters({
  path: distDir,
  publicPath: '/',
  inlineFonts: false,
  preload: 'media',
  compress: true,
  reduceInlineStyles: true,
})

async function writePage(html: string, outputPath: string, label: string) {
  const dir = dirname(outputPath)
  mkdirSync(dir, { recursive: true })
  try {
    writeFileSync(outputPath, await critters.process(html), 'utf-8')
    console.log(`[prerender] ${label} (with critical CSS)`)
  } catch (err) {
    writeFileSync(outputPath, html, 'utf-8')
    console.log(`[prerender] ${label} (no critical CSS: ${err instanceof Error ? err.message : 'unknown'})`)
  }
}

function outputPathForRoute(routePath: string): string {
  if (routePath === '/') return indexPath
  return resolve(distDir, routePath.replace(/^\//, ''), 'index.html')
}

for (const route of getPrerenderRoutes()) {
  const rendered = renderRoute(route.path)
  const html = applySeo(injectRoot(indexHtml, rendered), route.path)
  await writePage(html, outputPathForRoute(route.path), `${route.path}: prerendered`)
}

const notFoundHtml = replaceJsonLd(
  indexHtml
    .replace('<div id="root"></div>', `<div id="root">${renderRoute('/404')}</div>`)
    .replace(/<title>[^<]*<\/title>/, '<title>404 — Page not found | sayagos.tech</title>')
    .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, nofollow" />')
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${absoluteUrl('/404')}" />`),
  { '@context': 'https://schema.org', '@type': 'WebPage', name: '404 — Page not found', url: absoluteUrl('/404') },
)
writeFileSync(resolve(distDir, '404.html'), notFoundHtml, 'utf-8')
console.log('[prerender] 404.html created')

for (const route of getPrerenderRoutes()) {
  const html = readFileSync(outputPathForRoute(route.path), 'utf-8')
  const terms = findForbiddenPublicIdentityTerms(html)
  if (terms.length > 0) {
    console.error(`[prerender] Forbidden legacy identity in ${route.path}: ${terms.join(', ')}`)
    process.exit(1)
  }
}

console.log('[prerender] Farid-only public surface complete')
