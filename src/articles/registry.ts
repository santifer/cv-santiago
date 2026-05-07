import type { ComponentType } from 'react'

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

export const articleRegistry: ArticleConfig[] = [
  {
    id: 'mlops-field-notes',
    slugs: { es: 'blog/mlops-field-notes', en: 'blog/mlops-field-notes' },
    titles: { es: 'MLOps Field Notes', en: 'MLOps Field Notes' },
    seo: {
      es: {
        title: 'MLOps Field Notes: Start Small, Stay Reliable | Farid Sayago',
        description: 'A practical note on building reliable machine-learning workflows without over-engineering from day one.',
      },
      en: {
        title: 'MLOps Field Notes: Start Small, Stay Reliable | Farid Sayago',
        description: 'A practical note on building reliable machine-learning workflows without over-engineering from day one.',
      },
    },
    sectionLabels: { es: {}, en: {} },
    type: 'case-study',
    ogImage: 'https://sayagos.tech/images/og-preview.png',
    heroImage: 'https://sayagos.tech/images/project1.webp',
    contentStage: 'seed',
    ragReady: false,
    component: () => import('../FaridFieldNotes.tsx'),
    seoMeta: {
      datePublished: '2026-05-01',
      dateModified: '2026-05-01',
      keywords: ['MLOps', 'Python', 'Infrastructure', 'machine learning workflows', 'reproducibility'],
      articleType: 'TechArticle',
      articleTags: 'MLOps,Python,Infrastructure',
      images: ['https://sayagos.tech/images/project1.webp'],
      about: [{ '@type': 'Thing', name: 'MLOps' }],
    },
  },
]

export function getEsSlugs(): Set<string> { return new Set(['/']) }
export function getAltPaths(): Record<string, string> { return { '/': '/', '/en': '/' } }
export function getPageTitles(): Record<string, string> { return { '/blog/mlops-field-notes': 'MLOps Field Notes' } }
export function getSectionLabels(): Record<string, Record<string, string>> { return {} }
