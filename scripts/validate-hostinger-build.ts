/**
 * Validate that dist/ is deployable as a Hostinger static frontend.
 *
 * This does not test FTP credentials. It checks the files and routing helpers
 * that Hostinger needs after `npm run build`, sitemap generation, and prerender.
 */

import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getBlogPosts } from '../src/content/blog/index.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')

const requiredFiles = [
  'index.html',
  '404.html',
  '.htaccess',
  'llms.txt',
  'robots.txt',
  'sitemap.xml',
  'en/index.html',
  'blog/index.html',
  ...getBlogPosts().map((post) => `blog/${post.slug}/index.html`),
]

let errors = 0

function fail(message: string) {
  errors += 1
  console.error(`❌ ${message}`)
}

for (const file of requiredFiles) {
  if (!existsSync(resolve(dist, file))) fail(`Missing dist/${file}`)
}

const htaccessPath = resolve(dist, '.htaccess')
if (existsSync(htaccessPath)) {
  const htaccess = readFileSync(htaccessPath, 'utf-8')
  for (const requiredSnippet of [
    'ErrorDocument 404 /404.html',
    'RewriteRule ^ops/?$ /index.html [L]',
    'RewriteRule ^blog/([^/]+)$ /blog/$1/index.html [L]',
    'Content-Security-Policy',
    'https://api.sayagos.tech',
    'https://api.emailjs.com',
  ]) {
    if (!htaccess.includes(requiredSnippet)) fail(`dist/.htaccess missing ${requiredSnippet}`)
  }
}

if (existsSync(resolve(dist, 'api'))) {
  fail('dist/api exists. Hostinger frontend deploy must not include serverless API code.')
}

const indexPath = resolve(dist, 'index.html')
if (existsSync(indexPath)) {
  const index = readFileSync(indexPath, 'utf-8')
  if (!index.includes('Farid Sayago')) fail('dist/index.html does not look like the Farid portfolio')
}

if (process.env.REQUIRE_HOSTINGER_ENV === 'true') {
  if (process.env.VITE_API_BASE_URL !== 'https://api.sayagos.tech') {
    fail('VITE_API_BASE_URL must be https://api.sayagos.tech for Hostinger production builds')
  }
  for (const key of [
    'VITE_APP_EMAILJS_SERVICE_ID',
    'VITE_APP_EMAILJS_TEMPLATE_ID',
    'VITE_APP_EMAILJS_PUBLIC_KEY',
  ]) {
    if (!process.env[key]) fail(`${key} is required for the production contact form`)
  }
}

if (errors > 0) {
  console.error(`\nHostinger build validation failed with ${errors} issue(s).\n`)
  process.exit(1)
}

console.log('✅ Hostinger static build is deployable')
