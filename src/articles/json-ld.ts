import { articleRegistry } from './registry'

type Lang = 'es' | 'en'

/**
 * Shared FAQPage builder. Used by buildArticleJsonLd (case studies) and
 * by prerender.tsx for /about + /sobre-mi. Centralizing here means any
 * page with a `faq` array gets schema-compliant FAQPage SSR'd into the
 * prerendered HTML — invisible-FAQ-on-pageload bugs cannot recur.
 */
export function buildFaqPage(
  faq: readonly { q: string; a: string }[],
  pageUrl: string,
  lang: Lang,
) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl.replace(/\/$/, '')}/#faq`,
    inLanguage: lang,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

interface JsonLdOptions {
  lang: Lang
  url: string
  altUrl: string
  headline: string
  alternativeHeadline: string
  description: string
  datePublished: string
  dateModified: string
  keywords: string[]
  images: string[]
  breadcrumbHome: string
  breadcrumbCurrent: string
  /** Publisher org — only for collabs (e.g. Marily) */
  publisher?: { name: string; url: string }
  /** FAQ items — generates FAQPage schema */
  faq?: readonly { q: string; a: string }[]
  /** Article type — default 'Article' */
  articleType?: 'Article' | 'TechArticle'
  /** Extra 'about' entities */
  about?: Array<Record<string, string>>
  /** Extra fields like proficiencyLevel, dependencies */
  extra?: Record<string, string>
  /** Citation URLs (LinkedIn posts, external sources) */
  citation?: Array<{ '@type': string; name: string; url: string; sameAs?: string }>
  /** isBasedOn — source material (course, workshop, research) */
  isBasedOn?: Record<string, unknown>
  /** mentions — tools and platforms referenced */
  mentions?: Array<Record<string, string | string[] | Record<string, string>>>
  /** discussionUrl — link to Reddit/HN thread */
  discussionUrl?: string
  /** relatedLink — link to cross-posted article (Dev.to, etc.) */
  relatedLink?: string
  /** video — VideoObject for embedded/linked video content */
  video?: Record<string, unknown>
  /** subjectOf — events where this content was presented */
  subjectOf?: Record<string, unknown>
}

const PERSON = {
  '@type': 'Person',
  '@id': 'https://santifer.io/#person',
  name: 'Santiago Fernández de Valderrama Aparicio',
  alternateName: ['Santiago Fernández de Valderrama', 'santifer', 'Santi'],
  url: 'https://santifer.io',
  description: "Santiago Fernández de Valderrama is a software engineer specializing in multi-agent AI systems and agentic adoption. He created career-ops, an open-source project maintained by an orchestrated fleet of AI agents, and coined 'agentic maintenance': gated, evidence-based upkeep of a living codebase, sustained by a fleet of AI agents under human direction.",
  jobTitle: ['AI Forward Deployed Engineer', 'Applied AI Engineer', 'Multi-Agent Systems Engineer', 'Agentic AI Engineer', 'Head of Applied AI', 'Solutions Architect (No/Low-Code & AI)', 'AI Product Manager'],
  sameAs: [
    'https://www.linkedin.com/in/santifer',
    'https://github.com/santifer',
    'https://x.com/santifer',
    'https://dev.to/santifer',
    'https://santifer.substack.com',
    'https://contentdigest.santifer.io',
    'https://www.youtube.com/@santifer_io',
    'https://stackoverflow.com/users/32541743',
    'https://orcid.org/0009-0006-2192-7210',
    'https://www.crunchbase.com/person/santiago-fernandez-de-valderrama',
    'https://huggingface.co/santifer',
    'https://www.wikidata.org/wiki/Q138710224',
    'https://santiferirepair.es',
    'https://career-ops.org/about',
    'https://www.facebook.com/santifer.io/',
    'https://www.producthunt.com/@santifer',
    'https://app.daily.dev/santifer',
  ],
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': 'https://santifer.io/#website',
  name: 'santifer.io',
  url: 'https://santifer.io',
}

export function buildArticleJsonLd(opts: JsonLdOptions) {
  const inLanguage = opts.lang === 'es' ? 'es' : 'en'

  const graph: Record<string, unknown>[] = [
    {
      '@type': opts.articleType || 'Article',
      '@id': `${opts.url}/#article`,
      headline: opts.headline,
      alternativeHeadline: opts.alternativeHeadline,
      description: opts.description,
      author: { '@id': 'https://santifer.io/#person' },
      // Publisher: Person-as-publisher is valid for CreativeWork on personal sites
      // (Santiago publishes on his own domain). Override only for collabs (e.g. Marily).
      publisher: opts.publisher
        ? { '@type': 'Organization', name: opts.publisher.name, url: opts.publisher.url }
        : { '@id': 'https://santifer.io/#person' },
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
      keywords: opts.keywords,
      url: opts.url,
      mainEntityOfPage: opts.url,
      image: opts.images,
      inLanguage,
      isPartOf: { '@id': 'https://santifer.io/#website' },
      ...(opts.about ? { about: opts.about } : {}),
      ...(opts.extra || {}),
      ...(opts.citation ? { citation: opts.citation } : {}),
      ...(opts.isBasedOn ? { isBasedOn: opts.isBasedOn } : {}),
      ...(opts.mentions ? { mentions: opts.mentions } : {}),
      ...(opts.discussionUrl ? { discussionUrl: opts.discussionUrl } : {}),
      ...(opts.relatedLink ? { relatedLink: opts.relatedLink } : {}),
      ...(opts.video ? { video: opts.video } : {}),
      ...(opts.subjectOf ? { subjectOf: opts.subjectOf } : {}),
      workTranslation: { '@id': `${opts.altUrl}/#article` },
    },
    PERSON,
    WEBSITE,
    {
      '@type': 'BreadcrumbList',
      '@id': `${opts.url}/#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', '@id': `${opts.url}/#breadcrumb-1`, position: 1, name: opts.breadcrumbHome, item: 'https://santifer.io' },
        { '@type': 'ListItem', '@id': `${opts.url}/#breadcrumb-2`, position: 2, name: opts.breadcrumbCurrent, item: opts.url },
      ],
    },
  ]

  if (opts.faq && opts.faq.length > 0) {
    graph.push(buildFaqPage(opts.faq, opts.url, opts.lang))
  }

  // HowTo schema removed — deprecated by Google Sept 2023

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/**
 * Build JSON-LD for an article using registry as single source of truth.
 * Components call this instead of buildArticleJsonLd directly, ensuring
 * client-side schema matches prerendered schema (fixes hydration divergence).
 */
export function buildJsonLdFromRegistry(
  articleId: string,
  lang: Lang,
  i18n: {
    header: { h1: string }
    seo: { title: string; description: string }
    slug: string
    altSlug: string
    nav: { breadcrumbHome: string; breadcrumbCurrent: string }
    faq: { items: readonly { q: string; a: string }[] }
  },
  overrides?: Partial<JsonLdOptions>,
) {
  const config = articleRegistry.find(a => a.id === articleId)
  if (!config?.seoMeta) throw new Error(`Article "${articleId}" not found in registry or missing seoMeta`)

  const meta = config.seoMeta
  return buildArticleJsonLd({
    lang,
    url: `https://santifer.io/${i18n.slug}`,
    altUrl: `https://santifer.io/${i18n.altSlug}`,
    headline: i18n.header.h1,
    alternativeHeadline: i18n.seo.title,
    description: i18n.seo.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    keywords: meta.keywords,
    images: config.heroImage ? [config.heroImage] : meta.images,
    breadcrumbHome: i18n.nav.breadcrumbHome,
    breadcrumbCurrent: i18n.nav.breadcrumbCurrent,
    faq: i18n.faq.items,
    articleType: meta.articleType,
    about: meta.about,
    extra: meta.extra,
    citation: meta.citation,
    isBasedOn: meta.isBasedOn,
    mentions: meta.mentions,
    discussionUrl: meta.discussionUrl,
    relatedLink: meta.relatedLink,
    video: meta.video,
    subjectOf: meta.subjectOf,
    ...overrides,
  })
}
