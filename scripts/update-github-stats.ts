/**
 * Fetches current GitHub repo stats and updates:
 * 1. GitHubRepoBadge components in article pages (stars="X" forks="Y")
 * 2. Project cards in i18n.ts (stars: 'X', forks: 'Y')
 * Runs as part of the build pipeline.
 *
 * Usage: npx tsx scripts/update-github-stats.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const I18N_PATH = resolve(__dirname, '../src/i18n.ts')

interface BadgeConfig {
  owner: string
  repo: string
  file: string
  label: string
}

// Repos with GitHubRepoBadge in article components
const BADGE_REPOS: BadgeConfig[] = [
  { owner: 'santifer', repo: 'career-ops', file: 'src/CareerOps.tsx', label: 'career-ops (badge)' },
  { owner: 'santifer', repo: 'jacobo-workflows', file: 'src/JacoboAgent.tsx', label: 'jacobo-workflows (badge)' },
]

// Repos with stars/forks in i18n.ts project cards
const I18N_REPOS = [
  { owner: 'santifer', repo: 'career-ops', label: 'career-ops (i18n)' },
  { owner: 'santifer', repo: 'cv-santiago', label: 'cv-santiago (i18n)' },
  { owner: 'santifer', repo: 'claude-pulse', label: 'claude-pulse (i18n)' },
  { owner: 'santifer', repo: 'claude-eye', label: 'claude-eye (i18n)' },
  { owner: 'santifer', repo: 'claudeable', label: 'claudeable (i18n)' },
  { owner: 'santifer', repo: 'santifer-irepair', label: 'santifer-irepair (i18n)' },
]

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`
  }
  return String(n)
}

const statsCache = new Map<string, { stars: number; forks: number }>()

async function fetchGitHubStats(owner: string, repo: string): Promise<{ stars: number; forks: number } | null> {
  const key = `${owner}/${repo}`
  if (statsCache.has(key)) return statsCache.get(key)!

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'User-Agent': 'santifer-build/1.0',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    })
    if (!res.ok) {
      console.warn(`  ⚠ GitHub API returned ${res.status} for ${key}`)
      return null
    }
    const data = await res.json()
    const result = { stars: data.stargazers_count, forks: data.forks_count }
    statsCache.set(key, result)
    return result
  } catch (err) {
    console.warn(`  ⚠ GitHub fetch failed:`, (err as Error).message)
    return null
  }
}

async function main() {
  console.log('⭐ Updating GitHub stats...\n')

  let anyChanged = false

  // 1. Update GitHubRepoBadge components in article pages
  for (const repo of BADGE_REPOS) {
    const filePath = resolve(__dirname, '..', repo.file)
    let content: string
    try {
      content = readFileSync(filePath, 'utf-8')
    } catch {
      console.log(`  ⏭ ${repo.label}: file not found`)
      continue
    }

    const repoPattern = `repo="${repo.owner}/${repo.repo}"`
    if (!content.includes(repoPattern)) {
      console.log(`  ⏭ ${repo.label}: no GitHubRepoBadge found`)
      continue
    }

    const stats = await fetchGitHubStats(repo.owner, repo.repo)
    if (!stats) continue

    const s = formatCount(stats.stars)
    const f = formatCount(stats.forks)

    const badgeRegex = new RegExp(
      `(repo="${repo.owner}/${repo.repo}"\\s+stars=")[^"]+("\\s+forks=")[^"]+(")`,
    )
    const newContent = content.replace(badgeRegex, `$1${s}$2${f}$3`)

    if (newContent !== content) {
      writeFileSync(filePath, newContent, 'utf-8')
      anyChanged = true
      console.log(`  ✓ ${repo.label}: ${s} stars, ${f} forks`)
    } else {
      console.log(`  ⏭ ${repo.label}: no changes (${s} stars, ${f} forks)`)
    }
  }

  // 2. Update stars/forks in i18n.ts project cards
  let i18n = readFileSync(I18N_PATH, 'utf-8')
  let i18nChanged = false

  for (const repo of I18N_REPOS) {
    const stats = await fetchGitHubStats(repo.owner, repo.repo)
    if (!stats) continue

    const s = formatCount(stats.stars)
    const f = formatCount(stats.forks)

    // Match blocks that contain the repo link/github and update stars/forks within
    const linkPattern = `${repo.owner}/${repo.repo}`
    if (!i18n.includes(linkPattern)) {
      console.log(`  ⏭ ${repo.label}: not found in i18n.ts`)
      continue
    }

    // Find blocks with this repo (via link: or github: field) and update stars line
    const blockRegex = new RegExp(
      `((?:link|github): '(?:github\\.com\\/)?${linkPattern.replace(/\//g, '\\/')}',\\n\\s+stars: ')[^']+(')`
      , 'g')
    let newI18n = i18n.replace(blockRegex, `$1${s}$2`)

    // Update forks if present
    if (stats.forks > 0) {
      const forksRegex = new RegExp(
        `((?:link|github): '(?:github\\.com\\/)?${linkPattern.replace(/\//g, '\\/')}',\\n\\s+stars: '[^']+',\\n\\s+forks: ')[^']+(')`
        , 'g')
      newI18n = newI18n.replace(forksRegex, `$1${f}$2`)
    }

    if (newI18n !== i18n) {
      i18n = newI18n
      i18nChanged = true
      console.log(`  ✓ ${repo.label}: ${s} stars${stats.forks > 0 ? `, ${f} forks` : ''}`)
    } else {
      console.log(`  ⏭ ${repo.label}: no changes (${s} stars)`)
    }
  }

  if (i18nChanged) {
    writeFileSync(I18N_PATH, i18n, 'utf-8')
    anyChanged = true
  }

  // 3. Update hero stats in App.tsx (comment markers: hero-stats:owner/repo:stars/forks)
  const APP_PATH = resolve(__dirname, '../src/App.tsx')
  let appTsx = readFileSync(APP_PATH, 'utf-8')
  let appChanged = false

  for (const repo of [{ owner: 'santifer', repo: 'career-ops', label: 'career-ops (hero)' }]) {
    const stats = await fetchGitHubStats(repo.owner, repo.repo)
    if (!stats) continue

    const s = formatCount(stats.stars)
    const f = formatCount(stats.forks)

    const starsRegex = new RegExp(
      `(hero-stats:${repo.repo}:stars \\*/\\}<span[^>]*>)[^<]+(<\\/span>)`,
    )
    const forksRegex = new RegExp(
      `(hero-stats:${repo.repo}:forks \\*/\\}<span[^>]*>)[^<]+(<\\/span>)`,
    )

    const newApp = appTsx
      .replace(starsRegex, `$1${s}$2`)
      .replace(forksRegex, `$1${f}$2`)

    if (newApp !== appTsx) {
      appTsx = newApp
      appChanged = true
      console.log(`  ✓ ${repo.label}: ${s} stars, ${f} forks`)
    } else {
      console.log(`  ⏭ ${repo.label}: no changes (${s} stars, ${f} forks)`)
    }
  }

  if (appChanged) {
    writeFileSync(APP_PATH, appTsx, 'utf-8')
    anyChanged = true
  }

  // 4. Update career-ops star count in SEO meta descriptions (i18n.ts + index.html)
  const careerOpsStats = await fetchGitHubStats('santifer', 'career-ops')
  if (careerOpsStats) {
    const starLabel = formatCount(careerOpsStats.stars) + '+'

    // i18n.ts — ES and EN description patterns: "(XXK+ estrellas en GitHub)" / "(XXK+ GitHub stars)"
    const esMetaRegex = /(\()\d+[\d.]*K\+\s*estrellas en GitHub(\))/g
    const enMetaRegex = /(\()\d+[\d.]*K\+\s*GitHub stars(\))/g

    const newI18nMeta = readFileSync(I18N_PATH, 'utf-8')
      .replace(esMetaRegex, `$1${starLabel} estrellas en GitHub$2`)
      .replace(enMetaRegex, `$1${starLabel} GitHub stars$2`)

    if (newI18nMeta !== readFileSync(I18N_PATH, 'utf-8')) {
      writeFileSync(I18N_PATH, newI18nMeta, 'utf-8')
      anyChanged = true
      console.log(`  ✓ meta descriptions: ${starLabel} stars`)
    }

    // index.html — same patterns in meta tags
    const INDEX_PATH = resolve(__dirname, '../index.html')
    const indexContent = readFileSync(INDEX_PATH, 'utf-8')
    const newIndex = indexContent
      .replace(esMetaRegex, `$1${starLabel} estrellas en GitHub$2`)
      .replace(enMetaRegex, `$1${starLabel} GitHub stars$2`)

    if (newIndex !== indexContent) {
      writeFileSync(INDEX_PATH, newIndex, 'utf-8')
      anyChanged = true
      console.log(`  ✓ index.html meta descriptions: ${starLabel} stars`)
    }
  }

  // 5. Universal sweep: update ANY career-ops star reference in all content files
  // Patterns: "35K+ stars", "35K+ estrellas", "35K+ ⭐", "35K+ GitHub stars", "35K stars", "35K estrellas"
  if (careerOpsStats) {
    const starLabel = formatCount(careerOpsStats.stars)
    const starLabelPlus = starLabel + '+'

    // Files to sweep — all i18n content + about + career-ops-i18n
    const sweepFiles = [
      resolve(__dirname, '../src/about-i18n.ts'),
      resolve(__dirname, '../src/career-ops-i18n.ts'),
      resolve(__dirname, '../public/llms.txt'),
      resolve(__dirname, '../public/humans.txt'),
    ]

    // Patterns: careful NOT to match hero metrics entries (those already handled by section 2)
    // Match patterns like "35K+ stars", "35K+ estrellas", "35K+ ⭐", "35K+ GitHub stars"
    const patterns = [
      { re: /\b\d+[\d.]*K\+\s*stars/gi, replace: `${starLabelPlus} stars` },
      { re: /\b\d+[\d.]*K\+\s*estrellas/gi, replace: `${starLabelPlus} estrellas` },
      { re: /\b\d+[\d.]*K\+\s*⭐/g, replace: `${starLabelPlus} ⭐` },
      { re: /\b\d+[\d.]*K\+\s*GitHub stars/g, replace: `${starLabelPlus} GitHub stars` },
      { re: /\b\d+[\d.]*K\s+stars\b/gi, replace: `${starLabel} stars` },
      { re: /\b\d+[\d.]*K\s+estrellas\b/gi, replace: `${starLabel} estrellas` },
    ]

    for (const filePath of sweepFiles) {
      let content: string
      try {
        content = readFileSync(filePath, 'utf-8')
      } catch {
        continue // file doesn't exist, skip
      }
      let newContent = content
      for (const { re, replace } of patterns) {
        newContent = newContent.replace(re, replace)
      }
      if (newContent !== content) {
        writeFileSync(filePath, newContent, 'utf-8')
        anyChanged = true
        const relPath = filePath.replace(resolve(__dirname, '..') + '/', '')
        console.log(`  ✓ sweep ${relPath}: ${starLabelPlus} stars`)
      }
    }
  }

  if (anyChanged) {
    console.log('\n✅ GitHub stats updated')
  } else {
    console.log('\n⏭ No changes needed')
  }
}

main()
