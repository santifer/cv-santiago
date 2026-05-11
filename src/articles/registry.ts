import type { ComponentType } from 'react'
import { getBlogPosts } from '../content/blog'

const SITE_URL = 'https://sayagos.tech'
const DEFAULT_KEYWORDS = ['Data Science', 'MLOps', 'Python', 'AI systems', 'Farid Sayago']

export interface ArticleSeo { title: string; description: string }
export interface ArticleSeoMeta {
  datePublished: string
  dateModified: string
  keywords: string[]
  articleType: 'Article' | 'TechArticle'
  articleTags: string
  images: string[]
  about: Array<Record<string, string>>
  extra?: Record<string, string>
}
export interface ArticleConfig {
  id: string
  slugs: { es: string; en: string }
  titles: { es: string; en: string }
  seo: { es: ArticleSeo; en: ArticleSeo }
  sectionLabels: { es: Record<string, string>; en: Record<string, string> }
  type: 'collab' | 'case-study' | 'bridge'
  ogImage?: string
  heroImage?: string
  contentStage?: 'seed' | 'complete'
  component: () => Promise<{ default: ComponentType<{ lang: 'es' | 'en' }> | ComponentType }>
  xDefaultSlug?: string
  ragReady?: boolean
  i18nFile?: string
  seoMeta?: ArticleSeoMeta
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))]
}

function absoluteImage(path: string): string {
  if (path.startsWith('https://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function keywordsFor(tags: readonly string[]): string[] {
  return unique([...tags, ...DEFAULT_KEYWORDS]).slice(0, 10)
}

export const articleRegistry: ArticleConfig[] = getBlogPosts().map((post) => ({
  id: post.slug,
  slugs: { es: `blog/${post.slug}`, en: `blog/${post.slug}` },
  titles: { es: post.title, en: post.title },
  seo: {
    es: {
      title: `${post.title} | Farid Sayago`,
      description: post.description,
    },
    en: {
      title: `${post.title} | Farid Sayago`,
      description: post.description,
    },
  },
  sectionLabels: { es: {}, en: {} },
  type: 'case-study',
  ogImage: post.ogImage,
  heroImage: absoluteImage(post.heroImage || post.ogImage || '/images/project1.webp'),
  contentStage: post.contentStage,
  ragReady: post.ragReady,
  component: () => import('../BlogPostPage.tsx'),
  seoMeta: {
    datePublished: post.date,
    dateModified: post.date,
    keywords: keywordsFor(post.tags),
    articleType: post.tags.some((tag) => /mlops|python|infra|data|ai/i.test(tag)) ? 'TechArticle' : 'Article',
    articleTags: post.tags.join(','),
    images: [absoluteImage(post.heroImage || post.ogImage || '/images/project1.webp')],
    about: post.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
  },
}))

export function getEsSlugs(): Set<string> { return new Set(['/']) }
export function getAltPaths(): Record<string, string> { return { '/': '/', '/en': '/' } }
export function getPageTitles(): Record<string, string> {
  return Object.fromEntries(articleRegistry.map((article) => [`/${article.slugs.en}`, article.titles.en]))
}
export function getSectionLabels(): Record<string, Record<string, string>> { return {} }
