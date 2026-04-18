/**
 * Fetches current Discord server member count via public Invite API
 * (no auth, no token — the invite code is already public on the site)
 * and updates every mention across i18n files.
 *
 * Rounded DOWN to nearest 100 (e.g. 1312 → "1,300+" / "1.300+")
 * so we never over-promise.
 *
 * Two formatting modes:
 *   - 'full'  → "1.300+" (ES) / "1,300+" (EN) — for paragraph prose
 *   - 'short' → "1.3K+"  — for compact lists (i18n.ts service cards)
 *
 * Usage: npx tsx scripts/update-discord-stats.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const INVITE_CODE = '8pRpHETxa4'

type Locale = 'es' | 'en'
type Format = 'full' | 'short'

interface Target {
  file: string
  /** capture group 1 = the number portion we replace */
  pattern: RegExp
  locale: Locale
  format: Format
  description: string
}

const CAREER_OPS_I18N = resolve(__dirname, '../src/career-ops-i18n.ts')
const I18N = resolve(__dirname, '../src/i18n.ts')

const TARGETS: Target[] = [
  // ES — career-ops-i18n.ts
  { file: CAREER_OPS_I18N, locale: 'es', format: 'full', description: 'tldr ES',
    pattern: /(\d[\d.,]*)\+\s+en Discord/ },
  { file: CAREER_OPS_I18N, locale: 'es', format: 'full', description: 'body ES',
    pattern: /más de (\d[\d.,]*) personas en Discord/ },
  { file: CAREER_OPS_I18N, locale: 'es', format: 'full', description: 'communityBody ES',
    pattern: /communityBody:\s*'(\d[\d.,]*)\+\s*builders ya usan Career-Ops/ },
  { file: CAREER_OPS_I18N, locale: 'es', format: 'full', description: 'FAQ ES (supera)',
    pattern: /comunidad en Discord ya supera las (\d[\d.,]*) personas/ },

  // EN — career-ops-i18n.ts
  { file: CAREER_OPS_I18N, locale: 'en', format: 'full', description: 'tldr EN',
    pattern: /(\d[\d.,]*)\+\s+on Discord/ },
  { file: CAREER_OPS_I18N, locale: 'en', format: 'full', description: 'body EN',
    pattern: /A community of (\d[\d.,]*)\+\s+people formed on Discord/ },
  { file: CAREER_OPS_I18N, locale: 'en', format: 'full', description: 'communityBody EN',
    pattern: /communityBody:\s*'(\d[\d.,]*)\+\s*builders already use Career-Ops/ },
  { file: CAREER_OPS_I18N, locale: 'en', format: 'full', description: 'FAQ EN (is now)',
    pattern: /Discord community is now (\d[\d.,]*)\+\s+people/ },

  // i18n.ts — compact service cards
  { file: I18N, locale: 'es', format: 'short', description: 'service card ES',
    pattern: /comunidad Discord \((\d[\d.,]*K?)\+\s*miembros\)/ },
  { file: I18N, locale: 'en', format: 'short', description: 'service card EN',
    pattern: /Discord community management \((\d[\d.,]*K?)\+\s*members\)/ },
]

async function fetchMemberCount(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`,
      { headers: { 'User-Agent': 'xueyifan-build/1.0' } },
    )
    if (!res.ok) {
      console.warn(`  ⚠ Discord API returned ${res.status}`)
      return null
    }
    const data = (await res.json()) as { approximate_member_count?: number }
    if (typeof data.approximate_member_count !== 'number') {
      console.warn('  ⚠ Discord API response missing approximate_member_count')
      return null
    }
    return data.approximate_member_count
  } catch (err) {
    console.warn('  ⚠ Discord fetch failed:', (err as Error).message)
    return null
  }
}

function formatFull(n: number, locale: Locale): string {
  const rounded = Math.floor(n / 100) * 100
  const sep = locale === 'es' ? '.' : ','
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep)
}

function formatShort(n: number): string {
  const rounded = Math.floor(n / 100) * 100
  if (rounded >= 1000) {
    const k = rounded / 1000
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`
  }
  return String(rounded)
}

async function main() {
  console.log('💬 Updating Discord stats...\n')

  const members = await fetchMemberCount()
  if (members === null) {
    console.log('  Skipping — API unavailable.\n')
    return
  }

  const rounded = Math.floor(members / 100) * 100
  console.log(`  Discord members: ${members} (rounded → ${rounded})\n`)

  const fileCache = new Map<string, string>()
  const fileChanged = new Map<string, boolean>()

  for (const target of TARGETS) {
    const content = fileCache.get(target.file) ?? readFileSync(target.file, 'utf-8')
    fileCache.set(target.file, content)
    if (!fileChanged.has(target.file)) fileChanged.set(target.file, false)

    const match = content.match(target.pattern)
    if (!match) {
      console.warn(`  ⚠ Pattern not found: ${target.description}`)
      continue
    }
    const currentNum = match[1]
    const newNum = target.format === 'full'
      ? formatFull(members, target.locale)
      : formatShort(members)

    if (currentNum === newNum) {
      console.log(`  ✓ ${target.description.padEnd(24)} already ${newNum}`)
      continue
    }

    const updated = content.replace(target.pattern, (full) =>
      full.replace(currentNum, newNum),
    )
    fileCache.set(target.file, updated)
    fileChanged.set(target.file, true)
    console.log(`  ✓ ${target.description.padEnd(24)} ${currentNum} → ${newNum}`)
  }

  let anyWritten = false
  for (const [file, changed] of fileChanged) {
    if (changed) {
      writeFileSync(file, fileCache.get(file)!)
      anyWritten = true
    }
  }

  console.log(anyWritten ? '\n✓ Discord stats updated.\n' : '\n✓ Discord stats already up to date.\n')
}

main().catch(err => {
  console.error('Discord stats update failed:', err)
  process.exit(0) // non-blocking
})
