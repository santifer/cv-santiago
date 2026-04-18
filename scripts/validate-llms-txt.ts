/**
 * Build-time validation: checks that llms.txt stays in sync with i18n.ts content.
 *
 * Defines "proof points" — key terms/phrases that MUST appear in llms.txt
 * because they represent real content from the website. When i18n.ts adds
 * new sections or projects, add matching proof points here so the check
 * catches the drift on next build.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/validate-llms-txt.ts
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Proof points: key terms that MUST appear in llms.txt
// Grouped by source section for readable error messages.
// ---------------------------------------------------------------------------

interface ProofPoint {
  /** Where this content lives in the codebase */
  source: string
  /** Terms that must ALL appear in llms.txt (case-insensitive) */
  terms: string[]
}

const PROOF_POINTS: ProofPoint[] = [
  // -- Projects (i18n.ts → projects) --
  {
    source: 'i18n.ts → projects → Local RAG System',
    terms: ['Local RAG System', 'vector embeddings', 'semantic search'],
  },
  {
    source: 'i18n.ts → projects → Data Dashboard',
    terms: ['Data Dashboard'],
  },
  {
    source: 'i18n.ts → projects → Create Shop Crave',
    terms: ['Create, Shop & Crave'],
  },

  // -- Experience (i18n.ts → experience) --
  {
    source: 'i18n.ts → experience → Zrika',
    terms: ['Zrika', 'payment infrastructure'],
  },
  {
    source: 'i18n.ts → experience → NPCI',
    terms: ['NPCI', 'UPI Lite', '350M'],
  },
  {
    source: 'i18n.ts → experience → Rapipay',
    terms: ['Rapipay', 'merchant'],
  },
  {
    source: 'i18n.ts → experience → ICICI',
    terms: ['ICICI'],
  },

  // -- AI/ML Skills --
  {
    source: 'i18n.ts → claudeCode',
    terms: ['RAG', 'multi-agent', 'LangSmith'],
  },

  // -- Education --
  {
    source: 'i18n.ts → education → Purdue',
    terms: ['Purdue'],
  },

  // -- Certifications --
  {
    source: 'i18n.ts → certifications → Product School',
    terms: ['Product School'],
  },
  {
    source: 'i18n.ts → certifications → Anthropic',
    terms: ['Claude Code in Action'],
  },
]

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const llmsTxtPath = resolve(root, 'public/llms.txt')
let llmsTxt: string

try {
  llmsTxt = readFileSync(llmsTxtPath, 'utf-8').toLowerCase()
} catch {
  console.error(`\n❌ public/llms.txt not found\n`)
  process.exit(1)
}

let errors = 0

for (const pp of PROOF_POINTS) {
  const missing = pp.terms.filter(t => !llmsTxt.includes(t.toLowerCase()))
  if (missing.length > 0) {
    errors++
    console.error(
      `❌ llms.txt missing content from [${pp.source}]:\n` +
      `   Missing terms: ${missing.map(t => `"${t}"`).join(', ')}\n`
    )
  }
}

if (errors > 0) {
  console.error(
    `\n🔴 llms.txt is out of sync — ${errors} section(s) have missing content.\n` +
    `   Update public/llms.txt to include the missing information,\n` +
    `   or add the proof point to scripts/validate-llms-txt.ts if intentionally omitted.\n`
  )
  process.exit(1)
} else {
  console.log('✅ llms.txt is in sync with i18n content')
}
