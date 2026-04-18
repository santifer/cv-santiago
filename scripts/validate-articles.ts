/**
 * Build-time SEO validation for articles in the registry.
 *
 * Modes:
 *   --check  (default)  validate everything, errors break build
 *   --fix               auto-correct deterministic values (git dates), report the rest
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/validate-articles.ts
 *   npx tsx --tsconfig tsconfig.app.json scripts/validate-articles.ts --fix
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const FIX_MODE = process.argv.includes('--fix')

/** Map article id → source file (relative to root) */
const SOURCE_MAP: Record<string, string> = {
  'n8n-for-pms': 'src/N8nForPMs.tsx',
  'jacobo': 'src/JacoboAgent.tsx',
  'business-os': 'src/BusinessOS.tsx',
  'programmatic-seo': 'src/ProgrammaticSeo.tsx',
  'xueyifan-irepair': 'src/XueyifanIRepair.tsx',
  'self-healing-chatbot': 'src/SelfHealingChatbot.tsx',
  'career-ops': 'src/CareerOps.tsx',
}

// ---------------------------------------------------------------------------
// Import registry (type-only reference — we read it as text too)
// ---------------------------------------------------------------------------

import { articleRegistry } from '../src/articles/registry.ts'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Severity = 'error' | 'warn'
interface Issue { severity: Severity; msg: string }

function gitLastModified(filePath: string): string | null {
  try {
    return execSync(`git log --format=%aI -1 -- "${filePath}"`, { cwd: root, encoding: 'utf-8' }).trim() || null
  } catch { return null }
}

/** Extract a simple string value from a multiline block: key: 'value' or key: "value" */
function extractString(source: string, key: string): string | null {
  const re = new RegExp(`${key}:\\s*['"\`]([^'"\`]+)['"\`]`)
  const m = source.match(re)
  return m ? m[1] : null
}

/** Extract an array literal (single-line or multiline) following a key */
function extractArray(source: string, key: string): string[] | null {
  // Match key: [ ... ] — multiline-safe
  const re = new RegExp(`${key}:\\s*\\[([^\\]]*?)\\]`, 's')
  const m = source.match(re)
  if (!m) return null
  const inner = m[1]
  // Extract quoted strings
  const items: string[] = []
  const strRe = /['"`]([^'"`]+)['"`]/g
  let sm
  while ((sm = strRe.exec(inner)) !== null) items.push(sm[1])
  return items
}

/** Check if a string block exists between useArticleSeo({ ... }) */
function extractSeoBlock(source: string): string | null {
  const start = source.indexOf('useArticleSeo({')
  if (start === -1) return null
  // Find matching closing })
  let depth = 0
  let i = source.indexOf('{', start)
  const begin = i
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') { depth--; if (depth === 0) break }
  }
  return source.slice(begin, i + 1)
}

/** Extract the buildArticleJsonLd({ ... }) or buildJsonLdFromRegistry(...) block */
function extractJsonLdBlock(source: string): string | null {
  // New pattern: buildJsonLdFromRegistry pulls data from registry (no inline block to extract)
  if (source.includes('buildJsonLdFromRegistry(')) return 'REGISTRY_DRIVEN'

  const start = source.indexOf('buildArticleJsonLd({')
  if (start === -1) return null
  let depth = 0
  let i = source.indexOf('{', start)
  const begin = i
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') { depth--; if (depth === 0) break }
  }
  return source.slice(begin, i + 1)
}

/** Count about entries in JSON-LD block */
function countAboutEntries(jsonLdBlock: string): number {
  const aboutMatch = jsonLdBlock.match(/about:\s*\[([\s\S]*?)\]/)?.[1]
  if (!aboutMatch) return 0
  return (aboutMatch.match(/@type/g) || []).length
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

function validateArticle(config: typeof articleRegistry[0]): { issues: Issue[]; fixes: string[] } {
  const issues: Issue[] = []
  const fixes: string[] = []

  const sourceRel = SOURCE_MAP[config.id]
  if (!sourceRel) {
    issues.push({ severity: 'warn', msg: `No source mapping for article "${config.id}"` })
    return { issues, fixes }
  }

  const sourcePath = resolve(root, sourceRel)
  let source: string
  try {
    source = readFileSync(sourcePath, 'utf-8')
  } catch {
    issues.push({ severity: 'error', msg: `Source file not found: ${sourceRel}` })
    return { issues, fixes }
  }

  const seoBlock = extractSeoBlock(source)
  const jsonLdBlock = extractJsonLdBlock(source)

  // Bridge pages don't use buildArticleJsonLd — skip article-specific checks
  if (config.type === 'bridge') {
    if (!seoBlock) {
      issues.push({ severity: 'error', msg: `useArticleSeo call not found in ${sourceRel}` })
    }
    return { issues, fixes }
  }

  if (!seoBlock) {
    issues.push({ severity: 'error', msg: `useArticleSeo call not found in ${sourceRel}` })
    return { issues, fixes }
  }
  if (!jsonLdBlock) {
    issues.push({ severity: 'error', msg: `buildArticleJsonLd/buildJsonLdFromRegistry call not found in ${sourceRel}` })
    return { issues, fixes }
  }

  // --- Extract values ---
  const seoPublished = extractString(seoBlock, 'publishedTime')
  const seoModified = extractString(seoBlock, 'modifiedTime')
  const seoImage = extractString(seoBlock, 'image')
  const seoXDefault = extractString(seoBlock, 'xDefaultSlug')

  // When using buildJsonLdFromRegistry, dates/keywords come from registry.seoMeta
  const isRegistryDriven = jsonLdBlock === 'REGISTRY_DRIVEN'
  const jsonPublished = isRegistryDriven ? config.seoMeta?.datePublished ?? null : extractString(jsonLdBlock, 'datePublished')
  const jsonModified = isRegistryDriven ? config.seoMeta?.dateModified ?? null : extractString(jsonLdBlock, 'dateModified')
  const jsonKeywords = isRegistryDriven ? config.seoMeta?.keywords ?? null : extractArray(jsonLdBlock, 'keywords')
  const jsonArticleType = isRegistryDriven ? config.seoMeta?.articleType ?? null : extractString(jsonLdBlock, 'articleType')
  const aboutCount = isRegistryDriven ? config.seoMeta?.about?.length ?? 0 : countAboutEntries(jsonLdBlock)

  // ===== REGISTRY-LEVEL ERRORS =====

  // 0a. Case-study MUST have citation + mentions in seoMeta
  if (config.type === 'case-study' && config.seoMeta) {
    if (!config.seoMeta.citation || config.seoMeta.citation.length === 0) {
      issues.push({ severity: 'error', msg: `Case-study "${config.id}" missing citation in seoMeta` })
    }
    if (!config.seoMeta.mentions || config.seoMeta.mentions.length === 0) {
      issues.push({ severity: 'error', msg: `Case-study "${config.id}" missing mentions in seoMeta` })
    }
  }

  // 0b. datePublished + dateModified MUST be YYYY-MM-DD format
  if (config.seoMeta) {
    const dateRe = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRe.test(config.seoMeta.datePublished)) {
      issues.push({ severity: 'error', msg: `datePublished "${config.seoMeta.datePublished}" not YYYY-MM-DD format` })
    }
    if (!dateRe.test(config.seoMeta.dateModified)) {
      issues.push({ severity: 'error', msg: `dateModified "${config.seoMeta.dateModified}" not YYYY-MM-DD format` })
    }
  }

  // ===== ERRORS (break build in --check) =====

  // 1. Date consistency: publishedTime vs datePublished
  if (seoPublished && jsonPublished && seoPublished !== jsonPublished) {
    issues.push({ severity: 'error', msg: `publishedTime mismatch: useArticleSeo="${seoPublished}" vs buildArticleJsonLd="${jsonPublished}"` })
  }

  // 2. xDefaultSlug vs registry ES slug
  if (seoXDefault && seoXDefault !== config.slugs.es) {
    issues.push({ severity: 'error', msg: `xDefaultSlug mismatch: useArticleSeo="${seoXDefault}" vs registry.slugs.es="${config.slugs.es}"` })
  }

  // 3. Hreflang paired: both ES and EN slugs defined
  if (!config.slugs.es || !config.slugs.en) {
    issues.push({ severity: 'error', msg: `Missing hreflang slug pair: es="${config.slugs.es}", en="${config.slugs.en}"` })
  }

  // ===== WARNINGS =====

  // 4. modifiedTime missing in useArticleSeo
  if (!seoModified) {
    issues.push({ severity: 'warn', msg: `modifiedTime missing in useArticleSeo (${sourceRel})` })
  }

  // 5. dateModified vs git log
  const gitDate = gitLastModified(sourceRel)
  if (gitDate && jsonModified) {
    const gitDay = gitDate.slice(0, 10)
    const jsonDay = jsonModified.slice(0, 10)
    if (gitDay > jsonDay) {
      issues.push({ severity: 'warn', msg: `dateModified outdated: source="${jsonDay}", git="${gitDay}" (${sourceRel})` })

      if (FIX_MODE) {
        // Auto-fix: update dateModified in buildArticleJsonLd and modifiedTime in useArticleSeo
        let updated = source.replace(
          new RegExp(`(dateModified:\\s*['"])${jsonModified}(['"])`),
          `$1${gitDay}$2`
        )
        if (seoModified) {
          updated = updated.replace(
            new RegExp(`(modifiedTime:\\s*['"])${seoModified}(['"])`),
            `$1${gitDay}$2`
          )
        } else {
          // Insert modifiedTime after publishedTime
          updated = updated.replace(
            /(publishedTime:\s*['"][^'"]+['"],?\s*\n)/,
            `$1    modifiedTime: '${gitDay}',\n`
          )
        }
        if (updated !== source) {
          writeFileSync(sourcePath, updated, 'utf-8')
          fixes.push(`Updated dateModified/modifiedTime to ${gitDay}`)
          source = updated // re-read for subsequent checks
        }
      }
    }
  }

  // 6. Date consistency between seo modifiedTime and jsonLd dateModified
  if (seoModified && jsonModified && seoModified !== jsonModified) {
    issues.push({ severity: 'warn', msg: `modifiedTime mismatch: useArticleSeo="${seoModified}" vs buildArticleJsonLd="${jsonModified}"` })

    if (FIX_MODE) {
      // Sync jsonLd dateModified ← seo modifiedTime
      const updated = source.replace(
        new RegExp(`(dateModified:\\s*['"])${jsonModified}(['"])`),
        `$1${seoModified}$2`
      )
      if (updated !== source) {
        writeFileSync(sourcePath, updated, 'utf-8')
        fixes.push(`Synced dateModified to match modifiedTime: ${seoModified}`)
      }
    }
  }

  // 7. Keywords < 10
  if (jsonKeywords && jsonKeywords.length < 10) {
    issues.push({ severity: 'warn', msg: `keywords count: ${jsonKeywords.length} (minimum: 10)` })
  }

  // 8. about entries < 2
  if (aboutCount < 2) {
    issues.push({ severity: 'warn', msg: `about entries: ${aboutCount} (minimum: 2)` })
  }

  // 9. SEO title/description length (per language)
  for (const lang of ['es', 'en'] as const) {
    const seo = config.seo[lang]
    if (seo.title.length > 60) {
      issues.push({ severity: 'warn', msg: `SEO title too long [${lang}]: ${seo.title.length} chars (max: 60)` })
    }
    if (seo.description.length > 160) {
      issues.push({ severity: 'warn', msg: `SEO description too long [${lang}]: ${seo.description.length} chars (max: 160)` })
    }
  }

  // 10. OG image missing
  if (!seoImage) {
    issues.push({ severity: 'warn', msg: `OG image missing in useArticleSeo (${sourceRel})` })
  }

  // 11. articleType for case-study
  if (config.type === 'case-study' && jsonArticleType !== 'TechArticle') {
    issues.push({ severity: 'warn', msg: `articleType missing or not TechArticle for case-study (${sourceRel})` })
  }

  // 12. Images without width/height in source (CLS prevention)
  const imgTagsInSource = source.match(/<img\s[^>]*>/g) || []
  const imgsMissingDims = imgTagsInSource.filter(tag => {
    if (tag.includes('role="presentation"')) return false
    if (tag.includes('aria-hidden')) return false
    return !tag.includes('width=') || !tag.includes('height=')
  })
  if (imgsMissingDims.length > 0) {
    issues.push({ severity: 'warn', msg: `${imgsMissingDims.length} <img> without width/height in source (CLS risk) (${sourceRel})` })
  }

  // 13. editorId in ArticleHeader/ArticleFooter
  if (!source.includes('ArticleHeader') || !/<ArticleHeader[^>]+editorId/.test(source)) {
    issues.push({ severity: 'warn', msg: `editorId missing in ArticleHeader (${sourceRel})` })
  }
  if (!source.includes('ArticleFooter') || !/<ArticleFooter[^>]+editorId/.test(source)) {
    issues.push({ severity: 'warn', msg: `editorId missing in ArticleFooter (${sourceRel})` })
  }

  return { issues, fixes }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\n[validate-articles] Mode: ${FIX_MODE ? '--fix' : '--check'}\n`)

let totalErrors = 0
let totalWarnings = 0
let totalFixes = 0

for (const config of articleRegistry) {
  const { issues, fixes } = validateArticle(config)

  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warn')
  totalErrors += errors.length
  totalWarnings += warnings.length
  totalFixes += fixes.length

  if (issues.length === 0) {
    console.log(`\x1b[32m✓\x1b[0m ${config.id} — 0 errors, 0 warnings`)
  } else {
    const icon = errors.length > 0 ? '\x1b[31m✗\x1b[0m' : '\x1b[33m⚠\x1b[0m'
    console.log(`${icon} ${config.id} — ${errors.length} errors, ${warnings.length} warnings`)
    for (const e of errors) {
      console.log(`  \x1b[31mERROR\x1b[0m ${e.msg}`)
    }
    for (const w of warnings) {
      console.log(`  \x1b[33mWARN\x1b[0m  ${w.msg}`)
    }
    for (const f of fixes) {
      console.log(`  \x1b[36mFIXED\x1b[0m ${f}`)
    }
  }
}

console.log(`\nArticles: ${articleRegistry.length} | Errors: ${totalErrors} | Warnings: ${totalWarnings}${totalFixes > 0 ? ` | Fixed: ${totalFixes}` : ''}`)

if (totalErrors > 0 && !FIX_MODE) {
  console.error('\n\x1b[31mValidation failed. Fix errors above or run with --fix.\x1b[0m\n')
  process.exit(1)
}

console.log('')
