/**
 * Export article content into normalized JSON chunks for RAG indexing.
 *
 * Supports multiple input formats via pluggable parsers:
 *   - i18n TypeScript objects (articles)
 *   - Plaintext (llms.txt)
 *   - Markdown (future)
 *
 * Output: scripts/chunks/{source}.json
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/export-chunks.ts
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { articleRegistry } from '../src/articles/registry.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const CHUNKS_DIR = resolve(root, 'scripts/chunks')

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChunkMetadata {
  article_id: string
  article_slug_en: string
  article_slug_es: string
  section_id: string
  section_anchor: string
  page_path_en: string
  page_path_es: string
  source_file: string
  format: 'i18n' | 'markdown' | 'plaintext'
}

interface Chunk {
  content: string
  metadata: ChunkMetadata
}

// ---------------------------------------------------------------------------
// Keys to EXCLUDE when traversing i18n objects (metadata, navigation, images)
// ---------------------------------------------------------------------------

const EXCLUDE_KEYS = new Set([
  'slug', 'altSlug', 'readingTime', 'date', 'badge', 'seo', 'nav',
  'breadcrumbHome', 'breadcrumbCurrent', 'back',
  'href', 'icon', 'src', 'imgAlt', 'imgTitle', 'image', 'ogImage',
  'kickerLink', 'figcaption', 'importUrl', 'downloadUrl', 'jsonUrl',
  'num', 'emoji', 'kind', 'value',  // metric values, step numbers
  'internalLinks',
])

// ---------------------------------------------------------------------------
// HTML stripping
// ---------------------------------------------------------------------------

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, '').trim()
}

// ---------------------------------------------------------------------------
// Recursive text extraction from nested i18n objects
// ---------------------------------------------------------------------------

function extractText(obj: unknown, depth = 0): string {
  if (depth > 10) return '' // safety guard

  if (typeof obj === 'string') {
    return stripHtml(obj)
  }

  if (Array.isArray(obj)) {
    return obj.map(item => extractText(item, depth + 1)).filter(Boolean).join('\n')
  }

  if (typeof obj === 'object' && obj !== null) {
    const parts: string[] = []
    for (const [key, value] of Object.entries(obj)) {
      if (EXCLUDE_KEYS.has(key)) continue
      const text = extractText(value, depth + 1)
      if (text) parts.push(text)
    }
    return parts.join('\n')
  }

  return ''
}

// ---------------------------------------------------------------------------
// Parser 1: i18n TypeScript objects
// ---------------------------------------------------------------------------

interface I18nSource {
  articleId: string
  content: Record<string, unknown>
  sourceFile: string
}

async function loadI18nSources(): Promise<I18nSource[]> {
  const sources: I18nSource[] = []

  for (const article of articleRegistry) {
    if (!article.ragReady || !article.i18nFile) continue

    const modulePath = resolve(root, article.i18nFile)
    try {
      const mod = await import(modulePath)
      // Find the *Content export that is an object (e.g. jacoboContent, chatbotContent)
      const contentKey = Object.keys(mod).find(k => k.endsWith('Content') && typeof mod[k] === 'object' && mod[k] !== null)
      if (!contentKey) {
        console.warn(`  ⚠ ${article.id}: no *Content export found in ${article.i18nFile}, skipping`)
        continue
      }
      sources.push({
        articleId: article.id,
        content: mod[contentKey] as Record<string, unknown>,
        sourceFile: article.i18nFile,
      })
    } catch (err) {
      console.warn(`  ⚠ ${article.id}: failed to import ${article.i18nFile} — ${err}`)
    }
  }

  return sources
}

function parseI18n(source: I18nSource): Chunk[] {
  const article = articleRegistry.find(a => a.id === source.articleId)
  if (!article) {
    console.warn(`  ⚠ Article ${source.articleId} not found in registry, skipping`)
    return []
  }

  const en = source.content.en as Record<string, unknown> | undefined
  if (!en) {
    console.warn(`  ⚠ No .en key found in ${source.sourceFile}, skipping`)
    return []
  }

  const baseMetadata: Omit<ChunkMetadata, 'section_id' | 'section_anchor'> = {
    article_id: source.articleId,
    article_slug_en: `/${article.slugs.en}`,
    article_slug_es: `/${article.slugs.es}`,
    page_path_en: `/${article.slugs.en}`,
    page_path_es: `/${article.slugs.es}`,
    source_file: source.sourceFile,
    format: 'i18n',
  }

  const chunks: Chunk[] = []

  // Build anchor lookup from registry sectionLabels (source of truth for HTML IDs)
  const registryAnchors = new Set(Object.keys(article.sectionLabels.en))

  // Helper: resolve the correct HTML anchor for a given i18n key
  const resolveAnchor = (key: string): string => {
    // Direct match in registry (most sections)
    if (registryAnchors.has(key)) return `#${key}`
    // camelCase → kebab-case fallback (e.g. timeSinks → time-sinks)
    const kebab = key.replace(/([A-Z])/g, '-$1').replace(/(\d+)/g, '-$1').toLowerCase().replace(/^-/, '')
    if (registryAnchors.has(kebab)) return `#${kebab}`
    return ''
  }

  // Extract header + intro as a single "intro" chunk
  const introText = [
    extractText(en.header),
    extractText(en.intro),
    typeof en.tldr === 'string' ? stripHtml(en.tldr) : extractText(en.tldr),
  ].filter(Boolean).join('\n')

  if (introText.trim()) {
    chunks.push({
      content: introText.trim(),
      metadata: { ...baseMetadata, section_id: 'intro', section_anchor: '' },
    })
  }

  // Extract heroMetrics
  if (en.heroMetrics) {
    const metricsText = extractText(en.heroMetrics)
    if (metricsText.trim()) {
      chunks.push({
        content: metricsText.trim(),
        metadata: { ...baseMetadata, section_id: 'metrics', section_anchor: '' },
      })
    }
  }

  // Extract each section (nested under en.sections) — only if it has a real page anchor
  const sections = en.sections as Record<string, unknown> | undefined
  if (sections && typeof sections === 'object') {
    for (const [sectionKey, sectionValue] of Object.entries(sections)) {
      const anchor = resolveAnchor(sectionKey)
      if (!anchor) continue // skip sections without a navigable anchor
      const text = extractText(sectionValue)
      if (!text.trim()) continue

      chunks.push({
        content: text.trim(),
        metadata: {
          ...baseMetadata,
          section_id: sectionKey,
          section_anchor: anchor,
        },
      })
    }
  }

  // Extract top-level content keys — only those with a real page anchor
  const skipKeys = new Set(['en', 'es', 'header', 'intro', 'tldr', 'heroMetrics', 'sections'])
  for (const [key, value] of Object.entries(en)) {
    if (skipKeys.has(key)) continue
    if (sections && key in sections) continue
    const anchor = resolveAnchor(key)
    if (!anchor) continue // skip metadata keys (slug, seo, footer, etc.)
    const text = extractText(value)
    if (!text.trim()) continue
    chunks.push({
      content: text.trim(),
      metadata: {
        ...baseMetadata,
        section_id: key,
        section_anchor: anchor,
      },
    })
  }

  return chunks
}

// ---------------------------------------------------------------------------
// Parser 2: Plaintext (llms.txt)
// ---------------------------------------------------------------------------

function parsePlaintext(filePath: string, articleId: string): Chunk[] {
  const fullPath = resolve(root, filePath)
  let content: string
  try {
    content = readFileSync(fullPath, 'utf-8')
  } catch {
    console.warn(`  ⚠ File ${filePath} not found, skipping`)
    return []
  }

  // Split by double newlines or section headers
  const sections = content.split(/\n{2,}/)
  const chunks: Chunk[] = []
  let currentSection = 'general'

  for (const block of sections) {
    const trimmed = block.trim()
    if (!trimmed) continue

    // Detect section headers (lines starting with ## or all caps)
    const headerMatch = trimmed.match(/^##?\s+(.+)/)
    if (headerMatch) {
      currentSection = headerMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }

    chunks.push({
      content: trimmed,
      metadata: {
        article_id: articleId,
        article_slug_en: '',
        article_slug_es: '',
        section_id: currentSection,
        section_anchor: '',
        page_path_en: '/llms.txt',
        page_path_es: '/llms.txt',
        source_file: filePath,
        format: 'plaintext',
      },
    })
  }

  return chunks
}

// ---------------------------------------------------------------------------
// Parser 3: Markdown (for future use)
// ---------------------------------------------------------------------------

function parseMarkdown(content: string, articleId: string, sourceFile: string): Chunk[] {
  // Strip frontmatter
  const body = content.replace(/^---[\s\S]*?---\n/, '')

  const chunks: Chunk[] = []
  let currentH2 = 'general'
  let currentH3 = ''
  let currentText = ''

  for (const line of body.split('\n')) {
    const h2Match = line.match(/^##\s+(.+)/)
    const h3Match = line.match(/^###\s+(.+)/)

    if (h2Match || h3Match) {
      // Flush current text
      if (currentText.trim()) {
        const sectionId = currentH3 || currentH2
        chunks.push({
          content: currentText.trim(),
          metadata: {
            article_id: articleId,
            article_slug_en: '',
            article_slug_es: '',
            section_id: sectionId,
            section_anchor: `#${sectionId}`,
            page_path_en: '',
            page_path_es: '',
            source_file: sourceFile,
            format: 'markdown',
          },
        })
      }
      currentText = ''

      if (h2Match) {
        currentH2 = h2Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        currentH3 = ''
      } else if (h3Match) {
        currentH3 = h3Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      }
    }

    currentText += line + '\n'
  }

  // Flush remaining
  if (currentText.trim()) {
    const sectionId = currentH3 || currentH2
    chunks.push({
      content: currentText.trim(),
      metadata: {
        article_id: articleId,
        article_slug_en: '',
        article_slug_es: '',
        section_id: sectionId,
        section_anchor: `#${sectionId}`,
        page_path_en: '',
        page_path_es: '',
        source_file: sourceFile,
        format: 'markdown',
      },
    })
  }

  return chunks
}

// Expose for future use
void parseMarkdown

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('📦 Exporting content chunks for RAG...\n')

  mkdirSync(CHUNKS_DIR, { recursive: true })

  const i18nSources = await loadI18nSources()
  let totalChunks = 0

  // Process i18n sources (already filtered to ragReady articles)
  for (const source of i18nSources) {
    const article = articleRegistry.find(a => a.id === source.articleId)!

    const chunks = parseI18n(source)
    if (chunks.length === 0) continue

    // Validate: every non-empty section_anchor must exist in registry sectionLabels
    const validAnchors = new Set(Object.keys(article.sectionLabels.en))
    for (const chunk of chunks) {
      const anchor = chunk.metadata.section_anchor
      if (anchor) {
        const anchorId = anchor.replace(/^#/, '')
        if (!validAnchors.has(anchorId)) {
          console.warn(`  ⚠ ${source.articleId}: anchor "${anchor}" (section: ${chunk.metadata.section_id}) not in registry — badge will link to broken hash`)
        }
      }
    }

    const outPath = resolve(CHUNKS_DIR, `${source.articleId}.json`)
    writeFileSync(outPath, JSON.stringify(chunks, null, 2))
    console.log(`  ✓ ${source.articleId} → ${chunks.length} chunks`)
    totalChunks += chunks.length
  }

  // Farid profile seed for RAG: public-safe llms.txt
  const profileChunks = parsePlaintext('public/llms.txt', 'farid-profile')
  if (profileChunks.length > 0) {
    const outPath = resolve(CHUNKS_DIR, 'farid-profile.json')
    writeFileSync(outPath, JSON.stringify(profileChunks, null, 2))
    console.log(`  ✓ farid-profile → ${profileChunks.length} chunks`)
    totalChunks += profileChunks.length
  }

  console.log(`\n✅ Total: ${totalChunks} chunks exported to scripts/chunks/`)
}

main()
