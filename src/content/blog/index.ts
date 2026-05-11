import { generatedBlogPosts } from './generated'
import type { BlogPost } from './types'

const posts: readonly BlogPost[] = [...generatedBlogPosts]
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getBlogPosts(): readonly BlogPost[] {
  return posts
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getFeaturedBlogPosts(limit = 3): readonly BlogPost[] {
  return posts.slice(0, limit)
}

export function getBlogRoutes(): string[] {
  return posts.map((post) => `/blog/${post.slug}`)
}

export function getLatestBlogPost(): BlogPost | undefined {
  return posts[0]
}
