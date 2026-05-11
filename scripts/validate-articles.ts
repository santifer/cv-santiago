/**
 * Validates the Farid article registry only references public Farid content.
 */

import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { articleRegistry } from '../src/articles/registry.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const forbidden = ['santifer', 'santiago', 'jacobo', 'business-os', 'business os']
let errors = 0

for (const article of articleRegistry) {
  const serialized = JSON.stringify(article).toLowerCase()
  for (const term of forbidden) {
    if (serialized.includes(term)) {
      errors++
      console.error(`❌ ${article.id} contains legacy term: ${term}`)
    }
  }

  try {
    await article.component()
  } catch (err) {
    errors++
    console.error(`❌ ${article.id} component failed to import: ${err instanceof Error ? err.message : String(err)}`)
  }

  if (article.ogImage && !article.ogImage.startsWith('https://sayagos.tech/')) {
    errors++
    console.error(`❌ ${article.id} ogImage must use https://sayagos.tech/`)
  }
}

const blogPostPath = resolve(root, 'src/BlogPostPage.tsx')
if (!existsSync(blogPostPath)) {
  errors++
  console.error('❌ src/BlogPostPage.tsx is missing')
}

if (errors > 0) process.exit(1)
console.log(`✅ ${articleRegistry.length} Farid article(s) validated`)
