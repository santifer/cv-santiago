export type BlogContentStage = 'seed' | 'complete'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  displayDate: string
  tags: readonly string[]
  published: boolean
  readingTime: string
  content: string
  sourceFile: string
  heroImage?: string
  ogImage?: string
  contentStage: BlogContentStage
  ragReady: boolean
}
