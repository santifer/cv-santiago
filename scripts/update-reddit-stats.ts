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
  jsonUrl: string
  /** Substring of the Reddit URL to match the correct block in i18n.ts */
  urlMatch: string
  label: string
}

const POSTS: RedditPost[] = [
  {
    jsonUrl: 'https://old.reddit.com/r/SideProject/comments/1rw1lg4/i_automated_my_job_search_with_ai_agents_516/.json',
    urlMatch: '1rw1lg4',
    label: 'r/SideProject',
  },
  {
    jsonUrl: 'https://old.reddit.com/r/n8n/comments/1sc3i30/i_built_a_whatsapp_voice_ai_agent_in_n8n_that/.json',
    urlMatch: '1sc3i30',
    label: 'r/n8n',
  },
  {
    jsonUrl: 'https://old.reddit.com/r/ClaudeAI/comments/1sd2f37/i_built_an_ai_job_search_system_with_claude_code/.json',
    urlMatch: '1sd2f37',
    label: 'r/ClaudeAI',
  },
]

async function fetchRedditStats(jsonUrl: string): Promise<{ ups: number; comments: number } | null> {
  try {
    const res = await fetch(jsonUrl, {
      headers: { 'User-Agent': 'xueyifan-build/1.0' },
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
    const stats = await fetchRedditStats(post.jsonUrl)
    if (!stats) {
      console.log(`  ⏭ ${post.label}: skipped (fetch failed)`)
      continue
    }

    const upvoteStr = String(stats.ups)
    const commentStr = String(stats.comments)

    // Match the specific redditPosts array entry by its unique URL substring
    // then update upvotes and comments within that block
    const blockRegex = new RegExp(
      `(\\{[^}]*${post.urlMatch}[^}]*\\})`,
      'g'
    )

    const newI18n = i18n.replace(blockRegex, (block) =>
      block
        .replace(/(upvotes:\s*['"])\d+(['"])/, `$1${upvoteStr}$2`)
        .replace(/(comments:\s*['"])\d+(['"])/, `$1${commentStr}$2`)
    )

    if (newI18n !== i18n) {
      i18n = newI18n
      changed = true
      console.log(`  ✓ ${post.label}: ${upvoteStr} upvotes, ${commentStr} comments`)
    } else {
      console.log(`  ⏭ ${post.label}: no changes (${upvoteStr} upvotes, ${commentStr} comments)`)
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
