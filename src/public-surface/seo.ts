import { faridProfile, getSeo } from '../content/farid-profile'
import { articleRegistry } from '../articles/registry'

export const SITE_URL = 'https://sayagos.tech'

export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized === '/' ? '/' : normalized}`
}

export function getHomeSeo(path = '/') {
  const seo = getSeo()
  return {
    ...seo,
    url: absoluteUrl(path),
    image: `${SITE_URL}/images/og-preview.png`,
    siteName: faridProfile.domain,
    author: faridProfile.fullName,
  }
}

export function getBlogIndexSeo() {
  return {
    title: 'Blog | Farid Sayago',
    description: "Farid Sayago's field notes on data science, MLOps, Python, analytics, and AI workflows.",
    url: absoluteUrl('/blog'),
    image: `${SITE_URL}/images/og-preview.png`,
    siteName: faridProfile.domain,
    author: faridProfile.fullName,
  }
}

export function getBlogIndexJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Farid Sayago Blog',
    description: "Field notes from Farid Sayago's data science and MLOps work.",
    url: absoluteUrl('/blog'),
    author: {
      '@type': 'Person',
      name: faridProfile.fullName,
      url: SITE_URL,
    },
  }
}

export function getHomeJsonLd(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absoluteUrl(path),
    mainEntity: {
      '@type': 'Person',
      name: faridProfile.fullName,
      alternateName: faridProfile.name,
      url: SITE_URL,
      email: faridProfile.email,
      jobTitle: ['Data Scientist', 'MLOps Engineer', 'Data Analyst'],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
      },
      knowsAbout: faridProfile.technologies,
      sameAs: [
        faridProfile.socials.github,
        faridProfile.socials.linkedin,
        faridProfile.socials.x,
        faridProfile.socials.instagram,
      ],
    },
  }
}

export function getArticleSeo(path: string) {
  const normalized = path.replace(/^\//, '')
  const article = articleRegistry.find(config => (
    config.slugs.en === normalized || config.slugs.es === normalized
  ))
  if (!article) return null

  const lang = article.slugs.es === normalized ? 'es' : 'en'
  const meta = article.seo[lang]
  const image = article.ogImage || article.seoMeta?.images?.[0] || `${SITE_URL}/images/og-preview.png`

  return {
    article,
    lang,
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(`/${normalized}`),
    image,
    author: faridProfile.fullName,
    siteName: faridProfile.domain,
  }
}

export function getArticleJsonLd(path: string) {
  const seo = getArticleSeo(path)
  if (!seo) return null
  const { article } = seo
  const meta = article.seoMeta

  return {
    '@context': 'https://schema.org',
    '@type': meta?.articleType || 'Article',
    headline: seo.title,
    description: seo.description,
    image: meta?.images || [seo.image],
    datePublished: meta?.datePublished,
    dateModified: meta?.dateModified,
    author: {
      '@type': 'Person',
      name: faridProfile.fullName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: faridProfile.fullName,
    },
    mainEntityOfPage: seo.url,
    keywords: meta?.keywords,
    about: meta?.about,
  }
}
