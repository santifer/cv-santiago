/**
 * Fetches current Reddit post stats and updates i18n.ts if numbers changed.
 * Runs as part of the build pipeline.
 *
 * Usage: npx tsx scripts/update-reddit-stats.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const I18N_PATH = resolve(__dirname, '../src/i18n.ts')

interface RedditPost {
  url: string
  // Fields we update in i18n.ts
  upvotesKey: string
  commentsKey: string
}

const POSTS: RedditPost[] = [
  {
    url: 'https://old.reddit.com/r/SideProject/comments/1rw1lg4/i_automated_my_job_search_with_ai_agents_516/.json',
    upvotesKey: 'upvotes',
    commentsKey: 'comments',
  },
]

async function fetchRedditStats(jsonUrl: string): Promise<{ ups: number; comments: number } | null> {
  try {
    const res = await fetch(jsonUrl, {
      headers: { 'User-Agent': 'santifer-build/1.0' },
    })
    if (!res.ok) {
      console.warn(`  ⚠ Reddit API returned ${res.status}`)
      return null
    }
    const data = await res.json()
    const post = data[0]?.data?.children?.[0]?.data
    if (!post) return null
    return { ups: post.ups, comments: post.num_comments }
  } catch (err) {
    console.warn(`  ⚠ Reddit fetch failed:`, (err as Error).message)
    return null
  }
}

async function main() {
  console.log('📊 Updating Reddit stats...\n')

  let i18n = readFileSync(I18N_PATH, 'utf-8')
  let changed = false

  for (const post of POSTS) {
    const stats = await fetchRedditStats(post.url)
    if (!stats) {
      console.log('  ⏭ Skipped (fetch failed)')
      continue
    }

    const upvoteStr = String(stats.ups)
    const commentStr = String(stats.comments)

    // Replace only inside redditPost blocks (ES + EN)
    // Match the full redditPost object and update numbers within it
    const newI18n = i18n.replace(
      /redditPost:\s*\{[^}]+\}/g,
      (block) => block
        .replace(/(upvotes:\s*['"])\d+(['"])/, `$1${upvoteStr}$2`)
        .replace(/(comments:\s*['"])\d+(['"])/, `$1${commentStr}$2`)
    )

    if (newI18n !== i18n) {
      i18n = newI18n
      changed = true
      console.log(`  ✓ r/SideProject: ${upvoteStr} upvotes, ${commentStr} comments`)
    } else {
      console.log(`  ⏭ r/SideProject: no changes (${upvoteStr} upvotes, ${commentStr} comments)`)
    }
  }

  if (changed) {
    writeFileSync(I18N_PATH, i18n, 'utf-8')
    console.log('\n✅ i18n.ts updated')
  } else {
    console.log('\n⏭ No changes needed')
  }
}

main()
