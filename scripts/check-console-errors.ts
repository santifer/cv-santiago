/**
 * Post-deploy console error checker.
 *
 * Launches headless Chromium via Playwright, visits every URL from the sitemap,
 * captures console.error messages, and reports them.
 *
 * Usage:
 *   npx tsx scripts/check-console-errors.ts [base-url]
 *   Default base URL: http://localhost:5173
 *   Production: npx tsx scripts/check-console-errors.ts https://xueyifan.io
 *
 * Exit code 1 if any console errors found.
 */

import { chromium } from 'playwright'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const baseUrl = process.argv[2] || 'http://localhost:5173'

// Extract URLs from sitemap
function getUrls(): string[] {
  const sitemapPath = resolve(root, 'dist', 'sitemap.xml')
  if (!existsSync(sitemapPath)) {
    console.error('dist/sitemap.xml not found. Run npm run build first.')
    process.exit(1)
  }
  const sitemap = readFileSync(sitemapPath, 'utf-8')
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])

  // Add utility pages not in sitemap
  urls.push('https://xueyifan.io/privacidad', 'https://xueyifan.io/privacy')

  // Convert to use the base URL
  return urls.map(url => url.replace('https://xueyifan.io', baseUrl))
}

interface PageResult {
  url: string
  errors: string[]
  warnings: string[]
  duration: number
}

async function checkPage(page: Awaited<ReturnType<Awaited<ReturnType<typeof chromium.launch>>['newPage']>>, url: string): Promise<PageResult> {
  const errors: string[] = []
  const warnings: string[] = []
  const t0 = Date.now()

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text()
      // Skip known non-issues
      if (text.includes('favicon') || text.includes('net::ERR_')) return
      errors.push(text.slice(0, 200))
    }
    if (msg.type() === 'warning') {
      const text = msg.text()
      if (text.includes('DevTools') || text.includes('React does not recognize')) return
      warnings.push(text.slice(0, 200))
    }
  })

  page.on('pageerror', err => {
    errors.push(`[Uncaught] ${err.message.slice(0, 200)}`)
  })

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
    // Wait a bit for hydration + animations
    await page.waitForTimeout(2000)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    errors.push(`[Navigation] ${msg.slice(0, 200)}`)
  }

  return { url, errors, warnings, duration: Date.now() - t0 }
}

async function main() {
  const urls = getUrls()
  console.log(`\n[console-check] Checking ${urls.length} pages at ${baseUrl}\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (ConsoleCheck/1.0)',
  })

  let totalErrors = 0
  let totalWarnings = 0

  for (const url of urls) {
    const page = await context.newPage()
    const result = await checkPage(page, url)
    await page.close()

    const slug = url.replace(baseUrl, '') || '/'
    const errCount = result.errors.length
    const warnCount = result.warnings.length
    totalErrors += errCount
    totalWarnings += warnCount

    if (errCount > 0) {
      console.log(`\x1b[31m✗\x1b[0m ${slug} — ${errCount} error(s) (${result.duration}ms)`)
      for (const err of result.errors) {
        console.log(`  \x1b[31mERR\x1b[0m ${err}`)
      }
    } else if (warnCount > 0) {
      console.log(`\x1b[33m⚠\x1b[0m ${slug} — ${warnCount} warning(s) (${result.duration}ms)`)
    } else {
      console.log(`\x1b[32m✓\x1b[0m ${slug} (${result.duration}ms)`)
    }
  }

  await browser.close()

  console.log(`\nPages: ${urls.length} | Errors: ${totalErrors} | Warnings: ${totalWarnings}\n`)

  if (totalErrors > 0) {
    console.error('\x1b[31m✗ Console errors found. Fix before deploying.\x1b[0m\n')
    process.exit(1)
  }

  console.log('\x1b[32m✓ No console errors.\x1b[0m\n')
}

main()
