/**
 * Fetches current Twitter/X tweet metrics and updates i18n.ts.
 * Uses OAuth 1.0a signing with credentials from ~/.claude/twitter-credentials.json
 * Runs as part of the build pipeline.
 *
 * SECURITY: Credentials are read from ~/.claude/ (outside repo). Nothing sensitive is committed.
 *
 * Usage: npx tsx scripts/update-twitter-stats.ts
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHmac } from 'node:crypto'
import { randomUUID } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const I18N_PATH = resolve(__dirname, '../src/i18n.ts')
const CREDS_PATH = join(process.env.HOME || '', '.claude/twitter-credentials.json')

interface TwitterCreds {
  consumer_key: string
  consumer_secret: string
  access_token: string
  access_token_secret: string
}

interface TweetStats {
  id: string
  replies: number
  retweets: number
  likes: number
  views: number
}

// Tweets to track: [id, label, i18n field prefix]
const TWEETS = [
  { id: '2041403685696053741', label: 'xueyifan (main tweet)', prefix: '' },
  { id: '2040891664617848993', label: 'Garry Tan (quote)', prefix: 'quote' },
]

function pctEncode(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())
}

function oauthSign(method: string, url: string, params: Record<string, string>, consumerSecret: string, tokenSecret: string): string {
  const paramStr = Object.keys(params).sort().map(k => `${pctEncode(k)}=${pctEncode(params[k])}`).join('&')
  const baseString = `${method}&${pctEncode(url)}&${pctEncode(paramStr)}`
  const signingKey = `${pctEncode(consumerSecret)}&${pctEncode(tokenSecret)}`
  return createHmac('sha1', signingKey).update(baseString).digest('base64')
}

function formatCount(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`
  }
  if (n >= 1000) {
    const k = n / 1000
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`
  }
  return String(n)
}

async function fetchTweetStats(creds: TwitterCreds, tweetIds: string[]): Promise<TweetStats[] | null> {
  const url = 'https://api.twitter.com/2/tweets'
  const queryParams: Record<string, string> = {
    ids: tweetIds.join(','),
    'tweet.fields': 'public_metrics',
  }

  const oauth: Record<string, string> = {
    oauth_consumer_key: creds.consumer_key,
    oauth_nonce: randomUUID().replace(/-/g, ''),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: creds.access_token,
    oauth_version: '1.0',
  }

  const allParams = { ...oauth, ...queryParams }
  oauth.oauth_signature = oauthSign('GET', url, allParams, creds.consumer_secret, creds.access_token_secret)

  const authHeader = 'OAuth ' + Object.keys(oauth).sort().map(k => `${pctEncode(k)}="${pctEncode(oauth[k])}"`).join(', ')
  const queryString = Object.entries(queryParams).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')

  try {
    const res = await fetch(`${url}?${queryString}`, {
      headers: { Authorization: authHeader },
    })
    if (!res.ok) {
      const body = await res.text()
      console.warn(`  ⚠ Twitter API returned ${res.status}: ${body}`)
      return null
    }
    const data = await res.json() as { data?: Array<{ id: string; public_metrics: { reply_count: number; retweet_count: number; like_count: number; impression_count: number; quote_count: number; bookmark_count: number } }> }
    if (!data.data) return null

    return data.data.map(t => ({
      id: t.id,
      replies: t.public_metrics.reply_count,
      retweets: t.public_metrics.retweet_count + t.public_metrics.quote_count,
      likes: t.public_metrics.like_count,
      views: t.public_metrics.impression_count,
    }))
  } catch (err) {
    console.warn(`  ⚠ Twitter fetch failed:`, (err as Error).message)
    return null
  }
}

async function main() {
  console.log('🐦 Updating Twitter stats...\n')

  if (!existsSync(CREDS_PATH)) {
    console.log('  ⏭ Skipped (no credentials at ~/.claude/twitter-credentials.json)')
    return
  }

  const creds: TwitterCreds = JSON.parse(readFileSync(CREDS_PATH, 'utf-8'))
  const stats = await fetchTweetStats(creds, TWEETS.map(t => t.id))

  if (!stats) {
    console.log('  ⏭ Skipped (API error)')
    return
  }

  let i18n = readFileSync(I18N_PATH, 'utf-8')
  let changed = false

  for (const tweet of TWEETS) {
    const s = stats.find(st => st.id === tweet.id)
    if (!s) continue

    const replies = formatCount(s.replies)
    const retweets = formatCount(s.retweets)
    const likes = formatCount(s.likes)
    const views = formatCount(s.views)

    const repliesKey = tweet.prefix ? `${tweet.prefix}Replies` : 'replies'
    const retweetsKey = tweet.prefix ? `${tweet.prefix}Retweets` : 'retweets'
    const likesKey = tweet.prefix ? `${tweet.prefix}Likes` : 'likes'
    const viewsKey = tweet.prefix ? `${tweet.prefix}Views` : 'views'

    // Update each metric in i18n.ts xPost blocks
    const updates: [string, string][] = [
      [repliesKey, replies],
      [retweetsKey, retweets],
      [likesKey, likes],
      [viewsKey, views],
    ]

    for (const [key, value] of updates) {
      const regex = new RegExp(`(${key}: ')[^']+(')`,'g')
      const newI18n = i18n.replace(regex, `$1${value}$2`)
      if (newI18n !== i18n) {
        i18n = newI18n
        changed = true
      }
    }

    console.log(`  ✓ ${tweet.label}: ${replies} replies, ${retweets} RT, ${likes} likes, ${views} views`)
  }

  if (changed) {
    writeFileSync(I18N_PATH, i18n, 'utf-8')
    console.log('\n✅ i18n.ts updated')
  } else {
    console.log('\n⏭ No changes needed')
  }
}

main()
