/**
 * Build-time validation: checks that public/llms.txt stays in sync with
 * Farid's approved public portfolio facts.
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

interface ProofPoint {
  source: string
  terms: string[]
}

const PROOF_POINTS: ProofPoint[] = [
  {
    source: 'Farid identity',
    terms: ['Farid Sayago', 'MLOps', 'Colombia'],
  },
  {
    source: 'Intcomex experience',
    terms: ['Intcomex', 'Data Analyst', 'OLAP', 'Power BI'],
  },
  {
    source: 'Research experience',
    terms: ['Universidad Santo Tomás', 'Dask', 'econometric'],
  },
  {
    source: 'Projects',
    terms: ['wiener-git', 'WHTTP', 'Wiener Tickets'],
  },
  {
    source: 'Skills',
    terms: ['Python', 'SQL', 'Docker', 'Kubernetes'],
  },
  {
    source: 'Contact',
    terms: ['sayagos.tech', 'github.com/faridsz0605', 'linkedin.com/in/faridsayago'],
  },
]

const FORBIDDEN_TERMS = ['santifer', 'santiago fernández', 'santiago fernandez', 'jacobo', 'business os']

const llmsTxtPath = resolve(root, 'public/llms.txt')
let llmsTxt: string

try {
  llmsTxt = readFileSync(llmsTxtPath, 'utf-8')
} catch {
  console.error('\n❌ public/llms.txt not found\n')
  process.exit(1)
}

const lower = llmsTxt.toLowerCase()
let errors = 0

for (const pp of PROOF_POINTS) {
  const missing = pp.terms.filter(term => !lower.includes(term.toLowerCase()))
  if (missing.length > 0) {
    errors++
    console.error(`❌ llms.txt missing [${pp.source}]: ${missing.map(t => `"${t}"`).join(', ')}`)
  }
}

for (const term of FORBIDDEN_TERMS) {
  if (lower.includes(term)) {
    errors++
    console.error(`❌ llms.txt contains legacy identity term: "${term}"`)
  }
}

if (errors > 0) {
  console.error(`\n🔴 llms.txt validation failed with ${errors} issue(s).\n`)
  process.exit(1)
}

console.log('✅ llms.txt is Farid-only and in sync')
