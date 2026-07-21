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

// Repos with stars/forks in i18n.ts project cards.
// `extraLinks` allows matching cards that link to a custom domain (e.g. career-ops.org)
// instead of github.com/owner/repo.
interface I18nRepo {
  owner: string
  repo: string
  label: string
  extraLinks?: string[]
}
const I18N_REPOS: I18nRepo[] = [
  { owner: 'santifer', repo: 'career-ops', label: 'career-ops (i18n)', extraLinks: ['career-ops.org'] },
  { owner: 'santifer', repo: 'warpchart', label: 'warpchart (i18n)', extraLinks: ['warpchart.dev'] },
  { owner: 'santifer', repo: 'cv-santiago', label: 'cv-santiago (i18n)' },
  { owner: 'santifer', repo: 'claude-pulse', label: 'claude-pulse (i18n)' },
  { owner: 'santifer', repo: 'claude-eye', label: 'claude-eye (i18n)' },
  { owner: 'santifer', repo: 'claudeable', label: 'claudeable (i18n)' },
  { owner: 'santifer', repo: 'jacobo-workflows', label: 'jacobo-workflows (i18n)' },
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

const ghHeaders = {
  'User-Agent': 'santifer-build/1.0',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

/** Contributor count via the Link-header pagination trick (per_page=1 → last page = count). */
async function fetchReleaseInfo(owner: string, repo: string): Promise<{ count: number; latestTag: string; latestDate: Date } | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`,
      { headers: ghHeaders },
    )
    if (!res.ok) return null
    const arr = await res.json()
    if (!Array.isArray(arr) || arr.length === 0) return null
    return { count: arr.length, latestTag: arr[0].tag_name, latestDate: new Date(arr[0].published_at) }
  } catch {
    return null
  }
}

async function fetchContributorCount(owner: string, repo: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=false`,
      { headers: ghHeaders },
    )
    if (!res.ok) return null
    const link = res.headers.get('link') ?? ''
    const m = link.match(/[?&]page=(\d+)>; rel="last"/)
    if (m) return parseInt(m[1], 10)
    const arr = await res.json()
    return Array.isArray(arr) ? arr.length : null
  } catch {
    return null
  }
}

/** Merged PR count via the search API total_count. */
async function fetchMergedPrCount(owner: string, repo: string): Promise<number | null> {
  try {
    const q = encodeURIComponent(`repo:${owner}/${repo} is:pr is:merged`)
    const res = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=1`, { headers: ghHeaders })
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.total_count === 'number' ? data.total_count : null
  } catch {
    return null
  }
}

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

    // Match blocks that contain the repo link/github and update stars/forks within.
    // Build alternation of all valid link patterns: github.com/owner/repo, owner/repo, or any extraLinks.
    const ghPattern = `${repo.owner}/${repo.repo}`
    const allLinks = [ghPattern, ...(repo.extraLinks ?? [])]
    if (!allLinks.some((l) => i18n.includes(l))) {
      console.log(`  ⏭ ${repo.label}: not found in i18n.ts`)
      continue
    }

    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // For ghPattern, allow optional `github.com/` prefix; for extraLinks match literally.
    const linkAlternation = [
      `(?:github\\.com\\/)?${escape(ghPattern)}`,
      ...(repo.extraLinks ?? []).map(escape),
    ].join('|')

    // Find blocks with this repo (via link: or github: field) and update the stars line.
    // Allow up to 5 intermediate `key: value,` lines between link/github and stars
    // (e.g. linkUrl, caseStudyUrl, badge, etc.).
    const intermediate = `(?:\\s+\\w+: [^\\n]+,\\n){0,5}`
    const blockRegex = new RegExp(
      `((?:link|github): '(?:${linkAlternation})',\\n${intermediate}\\s+stars: ')[^']+(')`,
      'g',
    )
    let newI18n = i18n.replace(blockRegex, `$1${s}$2`)

    // Update forks if present (must come on the line right after stars)
    if (stats.forks > 0) {
      const forksRegex = new RegExp(
        `((?:link|github): '(?:${linkAlternation})',\\n${intermediate}\\s+stars: '[^']+',\\n\\s+forks: ')[^']+(')`,
        'g',
      )
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

    // index.html — same patterns in meta tags + interactionStatistic counts on SoftwareSourceCode
    const INDEX_PATH = resolve(__dirname, '../index.html')
    const indexContent = readFileSync(INDEX_PATH, 'utf-8')
    const starsCounterRegex = /("name": "GitHub Stars", "userInteractionCount": )\d+/
    const forksCounterRegex = /("name": "GitHub Forks", "userInteractionCount": )\d+/
    const newIndex = indexContent
      .replace(esMetaRegex, `$1${starLabel} estrellas en GitHub$2`)
      .replace(enMetaRegex, `$1${starLabel} GitHub stars$2`)
      .replace(starsCounterRegex, `$1${careerOpsStats.stars}`)
      .replace(forksCounterRegex, `$1${careerOpsStats.forks}`)

    if (newIndex !== indexContent) {
      writeFileSync(INDEX_PATH, newIndex, 'utf-8')
      anyChanged = true
      console.log(`  ✓ index.html updated: meta + interactionStatistic`)
    }
  }

  // 5. Universal sweep: update ANY career-ops star/fork reference in all content files
  // Patterns: "35K+ stars", "35K+ estrellas", "35K+ ⭐", "35K+ GitHub stars", "35K stars", "35K estrellas",
  //           "7.1K+ forks", "5K+ forks"
  if (careerOpsStats) {
    const starLabel = formatCount(careerOpsStats.stars)
    const starLabelPlus = starLabel + '+'
    const forkLabel = formatCount(careerOpsStats.forks)
    const forkLabelPlus = forkLabel + '+'

    // Files to sweep — all i18n content + about + career-ops-i18n + chatbot prompt + index.html
    // (index.html meta description / og:description / twitter:description use the "X.XK+ ⭐" format,
    //  which section 4's "GitHub stars"/"estrellas" patterns don't catch — the ⭐ pattern below does.)
    const sweepFiles = [
      resolve(__dirname, '../src/i18n.ts'),
      resolve(__dirname, '../src/about-i18n.ts'),
      resolve(__dirname, '../src/career-ops-i18n.ts'),
      resolve(__dirname, '../src/story-i18n.ts'),
      resolve(__dirname, '../public/llms.txt'),
      resolve(__dirname, '../public/humans.txt'),
      resolve(__dirname, '../chatbot-prompt.txt'),
      resolve(__dirname, '../index.html'),
    ]

    // Story page (D-10): live counters carry a VISIBLE dated "as of" inside the citable
    // passage. Refresh the date alongside the numbers — a stale date next to a live
    // number is worse than no date. Tightly scoped to the star-counter phrasing so
    // frozen dated claims elsewhere (e.g. manifesto signatures) never match.
    const now = new Date()
    const asOfEn = `${now.toLocaleString('en-US', { month: 'long' })} ${now.getFullYear()}`
    const asOfEs = `${now.toLocaleString('es-ES', { month: 'long' })} de ${now.getFullYear()}`

    // Patterns: careful NOT to match hero metrics entries (those already handled by section 2)
    // Match patterns like "35K+ stars", "35K+ estrellas", "35K+ ⭐", "35K+ GitHub stars"
    const patterns = [
      { re: /\b\d+[\d.]*K\+\s*stars/gi, replace: `${starLabelPlus} stars` },
      { re: /\b\d+[\d.]*K\+\s*estrellas/gi, replace: `${starLabelPlus} estrellas` },
      { re: /\b\d+[\d.]*K\+\s*⭐/g, replace: `${starLabelPlus} ⭐` },
      { re: /\b\d+[\d.]*K\+\s*GitHub stars/g, replace: `${starLabelPlus} GitHub stars` },
      { re: /\b\d+[\d.]*K\s+stars\b/gi, replace: `${starLabel} stars` },
      { re: /\b\d+[\d.]*K\s+estrellas\b/gi, replace: `${starLabel} estrellas` },
      // "X de estrellas" / "X de stars" (Spanish narrative with intermediate "de")
      { re: /\b\d+[\d.]*K\s+de\s+estrellas\b/gi, replace: `${starLabel} de estrellas` },
      { re: /\b\d+[\d.]*K\+\s*forks/gi, replace: `${forkLabelPlus} forks` },
      // Metric-card entries where value/label are separated by object syntax:
      // `value: '40.1K+', label: 'GitHub stars'` — generic sweep can't bridge the `', label: '`.
      { re: /(value: ')\d+[\d.]*K\+(', label: 'GitHub stars')/g, replace: `$1${starLabelPlus}$2` },
      // Story page dated live counters (see asOfEn/asOfEs above)
      { re: /GitHub stars \(as of [A-Za-z]+ \d{4}\)/g, replace: `GitHub stars (as of ${asOfEn})` },
      { re: /estrellas en GitHub \(a [a-záéíóúñ]+ de \d{4}\)/g, replace: `estrellas en GitHub (a ${asOfEs})` },
    ]

    // Lines that include `// HISTORIC` are protected (week-1 viral snapshot, do not auto-bump).
    // The marker can appear on the same line OR up to 2 lines above the protected content.
    const HISTORIC_WINDOW = 3
    for (const filePath of sweepFiles) {
      let content: string
      try {
        content = readFileSync(filePath, 'utf-8')
      } catch {
        continue // file doesn't exist, skip
      }
      const lines = content.split('\n')
      const protectedIdx = new Set<number>()
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('HISTORIC')) {
          for (let j = i; j < Math.min(i + HISTORIC_WINDOW, lines.length); j++) {
            protectedIdx.add(j)
          }
        }
      }
      const newLines = lines.map((line, i) => {
        if (protectedIdx.has(i)) return line
        let next = line
        for (const { re, replace } of patterns) {
          next = next.replace(re, replace)
        }
        return next
      })
      const newContent = newLines.join('\n')
      if (newContent !== content) {
        writeFileSync(filePath, newContent, 'utf-8')
        anyChanged = true
        const relPath = filePath.replace(resolve(__dirname, '..') + '/', '')
        console.log(`  ✓ sweep ${relPath}: ${starLabelPlus} stars`)
      }
    }
  }

  // 6. ai-agent-fleet article: exact-integer live figures (scoped to this file ONLY).
  // Patterns are numerically guarded so week-1 HISTORIC figures ("12,000+ stars",
  // "12.000 estrellas", "16 PRs fusionadas") never match.
  const FLEET_I18N = resolve(__dirname, '../src/ai-agent-fleet-i18n.ts')
  if (careerOpsStats) {
    let fleet = ''
    try {
      fleet = readFileSync(FLEET_I18N, 'utf-8')
    } catch {
      // article not created yet — skip
    }
    if (fleet) {
      const original = fleet
      const { stars, forks } = careerOpsStats
      const enInt = (n: number) => n.toLocaleString('en-US')
      const esInt = (n: number) => n.toLocaleString('de-DE') // '.' thousands separator
      const kStars = Math.floor(stars / 1000) * 1000

      // H1/title rounded figure: EN "59,000-star" / ES "59.000 estrellas" (guarded ≥20K)
      fleet = fleet.replace(/\b(?:[2-9]\d|[1-9]\d{2}),000-([Ss]tar)\b/g, `${enInt(kStars)}-$1`)
      fleet = fleet.replace(/\b(?:[2-9]\d|[1-9]\d{2})\.000 ([Ee]strellas)\b/g, `${esInt(kStars)} $1`)

      // Prose exact integers (≥3 digits so historic small counts never match)
      fleet = fleet.replace(/\b[\d,]{3,} GitHub stars\b/g, `${enInt(stars)} GitHub stars`)
      fleet = fleet.replace(/\b[\d.]{3,} estrellas en GitHub\b/g, `${esInt(stars)} estrellas en GitHub`)

      // Numbers-box table rows
      fleet = fleet.replace(/(\['GitHub stars', ')[\d,]+(')/g, `$1${enInt(stars)}$2`)
      fleet = fleet.replace(/(\['Estrellas en GitHub', ')[\d.]+(')/g, `$1${esInt(stars)}$2`)
      // 'Forks' label is shared by both language tables — preserve each row's separator style
      fleet = fleet.replace(/(\['Forks', ')([\d.,]+)(')/g, (_m, a: string, num: string, c: string) =>
        `${a}${num.includes('.') ? esInt(forks) : enInt(forks)}${c}`)

      const contributors = await fetchContributorCount('santifer', 'career-ops')
      if (contributors) {
        fleet = fleet.replace(/\b\d{3,} contributors\b/g, `${contributors} contributors`)
        fleet = fleet.replace(/\b\d{3,} contribuidores\b/g, `${contributors} contribuidores`)
        fleet = fleet.replace(/(\['Contributors', ')\d+(')/g, `$1${contributors}$2`)
        fleet = fleet.replace(/(\['Contribuidores', ')\d+(')/g, `$1${contributors}$2`)
      }

      const mergedPrs = await fetchMergedPrCount('santifer', 'career-ops')
      if (mergedPrs) {
        fleet = fleet.replace(/\b[\d,]{3,} merged PRs\b/g, `${enInt(mergedPrs)} merged PRs`)
        fleet = fleet.replace(/\b[\d.]{3,} PRs fusionadas\b/g, `${esInt(mergedPrs)} PRs fusionadas`)
        fleet = fleet.replace(/(\['Merged PRs', ')[\d,]+(')/g, `$1${enInt(mergedPrs)}$2`)
        fleet = fleet.replace(/(\['PRs fusionadas', ')[\d.,]+(')/g, `$1${esInt(mergedPrs)}$2`)
      }

      // Releases row: count + latest tag + date, live from the API so it never fossilizes
      // (fila corregida a mano el 21-jul tras quedar fósil: 21/v1.18.0 junto a contadores frescos)
      const releases = await fetchReleaseInfo('santifer', 'career-ops')
      if (releases) {
        const ver = releases.latestTag.replace(/^.*?v(?=\d)/, 'v')
        const relMonthsEs = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
        const relDateEs = `${releases.latestDate.getDate()} de ${relMonthsEs[releases.latestDate.getMonth()]}`
        const relDateEn = releases.latestDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
        fleet = fleet.replace(/(\['Releases desde el despegue de abril', ')[^']+(')/g, `$1${releases.count} (última: ${ver}, ${relDateEs})$2`)
        fleet = fleet.replace(/(\['Releases since the April launch', ')[^']+(')/g, `$1${releases.count} (latest: ${ver}, ${relDateEn})$2`)
      }

      // "As of <date>:" line above the numbers box — live rows refresh every build,
      // static rows carry their own inline (Jul 2026) dates.
      const now = new Date()
      const todayEn = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      const esMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      const todayEs = `${now.getDate()} de ${esMonths[now.getMonth()]} de ${now.getFullYear()}`
      fleet = fleet.replace(/(asOf: 'As of )[A-Z][a-z]+ \d{1,2}, \d{4}(:')/g, `$1${todayEn}$2`)
      fleet = fleet.replace(/(asOf: 'A )\d{1,2} de [a-zá-ú]+ de \d{4}(:')/g, `$1${todayEs}$2`)

      if (fleet !== original) {
        writeFileSync(FLEET_I18N, fleet, 'utf-8')
        anyChanged = true
        console.log(`  ✓ ai-agent-fleet: stars ${enInt(stars)}, forks ${enInt(forks)}${contributors ? `, ${contributors} contributors` : ''}${mergedPrs ? `, ${enInt(mergedPrs)} merged PRs` : ''}`)
      } else {
        console.log('  ⏭ ai-agent-fleet: no changes')
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
