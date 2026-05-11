import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const DEFAULT_OBSIDIAN_BLOG_DIR = '/home/faris/Documents/obsidian/portfolio/blog'
const OBSIDIAN_BLOG_DIR = process.env.OBSIDIAN_BLOG_DIR || DEFAULT_OBSIDIAN_BLOG_DIR
const GENERATED_FILE = resolve(root, 'src/content/blog/generated.ts')
const DEFAULT_HERO_IMAGE = '/images/project1.webp'
const DEFAULT_OG_IMAGE = 'https://sayagos.tech/images/og-preview.png'

interface FrontmatterData {
  [key: string]: unknown
}

interface SyncedBlogPost {
  slug: string
  title: string
  description: string
  date: string
  displayDate: string
  tags: string[]
  published: boolean
  readingTime: string
  content: string
  sourceFile: string
  heroImage: string
  ogImage: string
  contentStage: 'seed' | 'complete'
  ragReady: boolean
}

function getMarkdownFiles(directory: string): string[] {
  if (!existsSync(directory)) return []

  return readdirSync(directory)
    .flatMap((entry) => {
      const path = join(directory, entry)
      const stats = statSync(path)

      if (stats.isDirectory()) return getMarkdownFiles(path)
      if (stats.isFile() && extname(path).toLowerCase() === '.md') return [path]
      return []
    })
    .sort((a, b) => a.localeCompare(b))
}

function parseFrontmatterValue(value: string): unknown {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return trimmed.replace(/^['"]|['"]$/g, '')
}

function parseMarkdown(raw: string): { data: FrontmatterData; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw.trimStart() }

  const data: FrontmatterData = {}
  let currentListKey: string | null = null

  for (const line of match[1].split(/\r?\n/)) {
    const listItem = line.match(/^\s*-\s+(.+)$/)
    if (listItem && currentListKey) {
      const existing = Array.isArray(data[currentListKey]) ? data[currentListKey] as string[] : []
      existing.push(String(parseFrontmatterValue(listItem[1])))
      data[currentListKey] = existing
      continue
    }

    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!keyValue) continue

    const [, key, value] = keyValue
    if (value.trim() === '') {
      currentListKey = key
      data[key] = []
      continue
    }

    currentListKey = null
    data[key] = parseFrontmatterValue(value)
  }

  return { data, content: match[2].trimStart() }
}

function requireString(data: FrontmatterData, key: string, sourceFile: string): string {
  const value = data[key]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${sourceFile}: frontmatter field "${key}" is required`)
  }
  return value.trim()
}

function optionalString(data: FrontmatterData, key: string): string | undefined {
  const value = data[key]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((tag) => tag.trim()).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((tag) => tag.trim()).filter(Boolean)
  return []
}

function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length
}

function estimateReadingTime(content: string): string {
  return `${Math.max(1, Math.ceil(countWords(content) / 220))} min read`
}

function formatDisplayDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(parsed)
}

function stripDuplicateTitle(content: string, title: string): string {
  const lines = content.trimStart().split(/\r?\n/)
  const first = lines[0]?.trim()
  if (first && first.replace(/^#\s+/, '').trim().toLowerCase() === title.trim().toLowerCase()) {
    return lines.slice(1).join('\n').trimStart()
  }
  return content.trimStart()
}

function assertSupportedMarkdown(content: string, sourceFile: string) {
  const unsupported: string[] = []
  if (/!\[\[/.test(content)) unsupported.push('embedded Obsidian files (![[...]])')
  if (/(^|[^!])\[\[/.test(content)) unsupported.push('Obsidian wikilinks ([[...]])')
  if (/^>\s*\[!\w+\]/m.test(content)) unsupported.push('Obsidian callouts (> [!...])')

  if (unsupported.length > 0) {
    throw new Error(`${sourceFile}: unsupported syntax for public blog sync: ${unsupported.join(', ')}`)
  }
}

function buildPost(filePath: string): SyncedBlogPost | null {
  const sourceFile = relative(OBSIDIAN_BLOG_DIR, filePath)
  const raw = readFileSync(filePath, 'utf-8')
  const { data, content: rawContent } = parseMarkdown(raw)

  if (data.published !== true) return null

  const title = requireString(data, 'title', sourceFile)
  const description = requireString(data, 'description', sourceFile)
  const date = requireString(data, 'date', sourceFile)
  const slug = toSlug(optionalString(data, 'slug') || basename(filePath, extname(filePath)))
  const tags = normalizeTags(data.tags)
  const content = stripDuplicateTitle(rawContent, title).trim()

  assertSupportedMarkdown(content, sourceFile)

  if (!slug) throw new Error(`${sourceFile}: slug is empty after normalization`)
  if (tags.length === 0) throw new Error(`${sourceFile}: published posts need at least one tag`)
  if (content.length === 0) throw new Error(`${sourceFile}: published posts need body content`)

  const words = countWords(content)
  const contentStage = data.contentStage === 'complete' || data.contentStage === 'seed'
    ? data.contentStage
    : words >= 900 ? 'complete' : 'seed'

  return {
    slug,
    title,
    description,
    date,
    displayDate: formatDisplayDate(date),
    tags,
    published: true,
    readingTime: optionalString(data, 'readingTime') || estimateReadingTime(content),
    content,
    sourceFile,
    heroImage: optionalString(data, 'heroImage') || DEFAULT_HERO_IMAGE,
    ogImage: optionalString(data, 'ogImage') || DEFAULT_OG_IMAGE,
    contentStage,
    ragReady: data.ragReady !== false,
  }
}

function renderGeneratedFile(posts: SyncedBlogPost[]): string {
  return `import type { BlogPost } from './types'\n\n// Generated by scripts/sync-obsidian-blog.ts. Do not edit by hand.\nexport const generatedBlogPosts = ${JSON.stringify(posts, null, 2)} as const satisfies readonly BlogPost[]\n`
}

function main() {
  if (!existsSync(OBSIDIAN_BLOG_DIR)) {
    throw new Error(`Obsidian blog directory not found: ${OBSIDIAN_BLOG_DIR}`)
  }

  const posts = getMarkdownFiles(OBSIDIAN_BLOG_DIR)
    .map(buildPost)
    .filter((post): post is SyncedBlogPost => post !== null)

  const seenSlugs = new Set<string>()
  for (const post of posts) {
    if (seenSlugs.has(post.slug)) throw new Error(`Duplicate blog slug: ${post.slug}`)
    seenSlugs.add(post.slug)
  }

  mkdirSync(dirname(GENERATED_FILE), { recursive: true })
  writeFileSync(GENERATED_FILE, renderGeneratedFile(posts), 'utf-8')

  console.log(`Synced ${posts.length} published blog post${posts.length === 1 ? '' : 's'} from ${OBSIDIAN_BLOG_DIR}`)
}

main()
