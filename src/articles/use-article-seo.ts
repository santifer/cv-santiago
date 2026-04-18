import { useEffect } from 'react'

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    if (attr === 'name') el.name = key
    else el.setAttribute('property', key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

// ---------------------------------------------------------------------------
// useArticleSeo — full meta/OG/Twitter/hreflang/JSON-LD for articles
// ---------------------------------------------------------------------------

export interface ArticleSeoOpts {
  lang: string
  slug: string
  altSlug: string
  title: string
  description: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  articleTags: string
  jsonLd: object
  /** ES slug used as x-default hreflang (defaults to slug when lang=es) */
  xDefaultSlug?: string
}

export function useArticleSeo(opts: ArticleSeoOpts) {
  useEffect(() => {
    const {
      lang, slug, altSlug, title, description, image,
      publishedTime, modifiedTime, articleTags, jsonLd, xDefaultSlug,
    } = opts

    const url = `https://xueyifan.io/${slug}`
    const altUrl = `https://xueyifan.io/${altSlug}`
    const altLang = lang === 'zh' ? 'en' : 'es'
    const defaultSlug = xDefaultSlug ?? (lang === 'zh' ? slug : altSlug)

    document.title = title

    // Standard meta
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'author', 'Yifan Fernández de Valderrama')
    upsertMeta('name', 'robots', 'index, follow')

    // Open Graph
    upsertMeta('property', 'og:type', 'article')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:site_name', 'xueyifan.io')
    upsertMeta('property', 'og:locale', lang === 'zh' ? 'es_ES' : 'en_US')
    upsertMeta('property', 'og:locale:alternate', lang === 'zh' ? 'en_US' : 'es_ES')
    upsertMeta('property', 'article:published_time', publishedTime)
    if (modifiedTime) upsertMeta('property', 'article:modified_time', modifiedTime)
    upsertMeta('property', 'article:author', 'https://www.linkedin.com/in/xueyifan')
    upsertMeta('property', 'article:tag', articleTags)
    if (image) upsertMeta('property', 'og:image', image)

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    if (image) upsertMeta('name', 'twitter:image', image)

    // Canonical
    upsertLink('canonical', url)

    // Hreflang
    const createdLinks: HTMLLinkElement[] = []
    for (const { hreflang, href } of [
      { hreflang: lang, href: url },
      { hreflang: altLang, href: altUrl },
      { hreflang: 'x-default', href: `https://xueyifan.io/${defaultSlug}` },
    ]) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = href
      document.head.appendChild(link)
      createdLinks.push(link)
    }

    // JSON-LD — remove any pre-existing (from prerender) before adding
    const existing = document.querySelector('script[type="application/ld+json"]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      script.remove()
      createdLinks.forEach(l => l.remove())
    }
  }, [opts.lang, opts.slug, opts.title])
}

// ---------------------------------------------------------------------------
// useHomeSeo — lightweight, only updates existing tags from index.html
// ---------------------------------------------------------------------------

export function useHomeSeo({ lang, title, description }: { lang: string; title: string; description: string }) {
  useEffect(() => {
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'en' ? 'en_US' : 'es_ES')

    const canonical = lang === 'en' ? 'https://xueyifan.io/en' : 'https://xueyifan.io/'
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)

    document.documentElement.lang = lang
  }, [lang, title, description])
}
