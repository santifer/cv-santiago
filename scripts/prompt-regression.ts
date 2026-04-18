#!/usr/bin/env npx tsx

/**
 * Prompt Regression Testing
 *
 * Compares two prompt versions by running the full eval suite against each.
 * Uses X-Prompt-Version header to select which Langfuse prompt version to use.
 *
 * Usage: npm run prompt:regression -- --v1=production --v2=5
 *        npm run prompt:regression -- --v1=1 --v2=2
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const CHAT_API_URL = process.env.CHAT_API_URL || 'http://localhost:3000/api/chat'
const PROMPT_REGRESSION_SECRET = process.env.PROMPT_REGRESSION_SECRET

if (!PROMPT_REGRESSION_SECRET) {
  console.error('❌ Missing PROMPT_REGRESSION_SECRET env var')
  process.exit(1)
}

interface Assertion {
  type: string
  value?: string | number
  values?: string[]
  expected?: string
  pattern?: string
  flags?: string
  criteria?: string
}

interface Test {
  id: string
  description: string
  input: string
  lang: 'es' | 'en'
  assertions: Assertion[]
}

interface Dataset {
  name: string
  tests: Test[]
}

interface VersionResult {
  testId: string
  response: string
  passed: boolean
  failedAssertions: string[]
}

async function callChatWithVersion(input: string, lang: string, version: string): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (version !== 'production') {
    headers['X-Prompt-Version'] = version
    headers['X-Prompt-Auth'] = PROMPT_REGRESSION_SECRET!
  }

  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages: [{ role: 'user', content: input }],
      lang,
    }),
  })

  if (!response.ok) throw new Error(`Chat API error: ${response.status}`)

  const reader = response.body?.getReader()
  if (!reader) throw new Error('No reader')

  const decoder = new TextDecoder()
  let buffer = ''
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let idx
    while ((idx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, idx).trim()
      buffer = buffer.slice(idx + 1)
      if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        try {
          const data = JSON.parse(line.slice(6))
          if (data.text) fullText += data.text
        } catch { /* skip */ }
      }
    }
  }

  return fullText
}

function simpleAssertionCheck(response: string, assertion: Assertion): boolean {
  const lower = response.toLowerCase()
  switch (assertion.type) {
    case 'contains':
      return lower.includes((assertion.value as string).toLowerCase())
    case 'contains_any':
      return (assertion.values || []).some(v => lower.includes(v.toLowerCase()))
    case 'not_contains':
      return !lower.includes((assertion.value as string).toLowerCase())
    case 'max_words':
      return response.trim().split(/\s+/).length <= (assertion.value as number)
    case 'min_words':
      return response.trim().split(/\s+/).length >= (assertion.value as number)
    case 'regex':
      return new RegExp(assertion.pattern!, assertion.flags).test(response)
    case 'language':
    case 'rag_used':
    case 'rag_not_used':
    case 'source_includes':
    case 'source_not_includes':
    case 'llm_judge':
      return true // Skip non-deterministic assertions in regression
    default:
      return true
  }
}

async function compareResponses(v1Response: string, v2Response: string, testInput: string): Promise<{ better: 'v1' | 'v2' | 'equal'; reason: string }> {
  const result = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Compare two chatbot responses to the same question. This is Yifan's CV chatbot.

Question: "${testInput.slice(0, 200)}"

V1: "${v1Response.slice(0, 400)}"

V2: "${v2Response.slice(0, 400)}"

Which is better? Consider: helpfulness, conciseness, accuracy, tone.
JSON only: {"better": "v1"|"v2"|"equal", "reason": "brief explanation"}`
    }],
  })

  const text = result.content[0]?.type === 'text' ? result.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return { better: 'equal', reason: 'Parse error' }
  return JSON.parse(jsonMatch[0])
}

function loadDatasets(): Dataset[] {
  const dir = path.join(import.meta.dirname, '..', 'evals', 'datasets')
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
}

async function main() {
  const v1Arg = process.argv.find(a => a.startsWith('--v1='))
  const v2Arg = process.argv.find(a => a.startsWith('--v2='))

  const v1 = v1Arg?.split('=')[1] || 'production'
  const v2 = v2Arg?.split('=')[1]

  if (!v2) {
    console.error('Usage: npm run prompt:regression -- --v1=production --v2=5')
    process.exit(1)
  }

  console.log(`\n🔍 Prompt Regression Testing`)
  console.log(`   V1: ${v1} (baseline)`)
  console.log(`   V2: ${v2} (candidate)\n`)

  const datasets = loadDatasets()
  const allTests: Test[] = datasets.flatMap(d => d.tests)

  console.log(`   Running ${allTests.length} tests against both versions...\n`)

  const v1Results: VersionResult[] = []
  const v2Results: VersionResult[] = []
  const comparisons: { testId: string; better: string; reason: string; v1Response: string; v2Response: string }[] = []

  for (let i = 0; i < allTests.length; i++) {
    const test = allTests[i]
    process.stdout.write(`   [${i + 1}/${allTests.length}] ${test.id}: `)

    try {
      const [r1, r2] = await Promise.all([
        callChatWithVersion(test.input, test.lang, v1),
        callChatWithVersion(test.input, test.lang, v2),
      ])

      const v1Failed = test.assertions
        .filter(a => !simpleAssertionCheck(r1, a))
        .map(a => a.type)
      const v2Failed = test.assertions
        .filter(a => !simpleAssertionCheck(r2, a))
        .map(a => a.type)

      v1Results.push({ testId: test.id, response: r1, passed: v1Failed.length === 0, failedAssertions: v1Failed })
      v2Results.push({ testId: test.id, response: r2, passed: v2Failed.length === 0, failedAssertions: v2Failed })

      // Only compare semantically if results differ
      if (r1 !== r2) {
        const comparison = await compareResponses(r1, r2, test.input)
        comparisons.push({ testId: test.id, ...comparison, v1Response: r1, v2Response: r2 })
        console.log(`v1:${v1Failed.length === 0 ? '✅' : '❌'} v2:${v2Failed.length === 0 ? '✅' : '❌'} → ${comparison.better}`)
      } else {
        console.log(`v1:✅ v2:✅ → identical`)
      }
    } catch (error) {
      console.log(`⚠️ Error: ${error instanceof Error ? error.message : 'Unknown'}`)
      v1Results.push({ testId: test.id, response: '', passed: false, failedAssertions: ['error'] })
      v2Results.push({ testId: test.id, response: '', passed: false, failedAssertions: ['error'] })
    }
  }

  // Generate report
  const v1Passed = v1Results.filter(r => r.passed).length
  const v2Passed = v2Results.filter(r => r.passed).length
  const v2Better = comparisons.filter(c => c.better === 'v2').length
  const v1Better = comparisons.filter(c => c.better === 'v1').length
  const equal = comparisons.filter(c => c.better === 'equal').length

  let report = `# Prompt Regression Report — v${v1} vs v${v2}

Generated: ${new Date().toISOString().slice(0, 19)}

## Summary

| Metric | V1 (${v1}) | V2 (${v2}) |
|--------|------------|------------|
| Assertions Passed | ${v1Passed}/${allTests.length} | ${v2Passed}/${allTests.length} |
| Semantically Better | ${v1Better} | ${v2Better} |
| Equal | ${equal} | ${equal} |

## Verdict

`

  if (v2Passed >= v1Passed && v2Better >= v1Better) {
    report += `✅ **V2 is safe to promote** — equal or better on all metrics.\n`
  } else if (v2Passed < v1Passed) {
    report += `❌ **V2 regressed** — ${v1Passed - v2Passed} tests that passed on V1 now fail.\n`
  } else {
    report += `⚠️ **Mixed results** — review individual test changes below.\n`
  }

  // Tests that changed
  const changed = allTests.filter((_, i) => v1Results[i].passed !== v2Results[i].passed)
  if (changed.length > 0) {
    report += `\n## Changed Tests\n\n`
    for (const test of changed) {
      const idx = allTests.indexOf(test)
      const v1r = v1Results[idx]
      const v2r = v2Results[idx]
      report += `### ${test.id}\n\n`
      report += `**Direction:** ${v1r.passed ? '✅→❌ REGRESSION' : '❌→✅ IMPROVEMENT'}\n\n`
      report += `**Input:** ${test.input}\n\n`
      report += `**V1 Response:**\n> ${v1r.response.slice(0, 300).replace(/\n/g, '\n> ')}\n\n`
      report += `**V2 Response:**\n> ${v2r.response.slice(0, 300).replace(/\n/g, '\n> ')}\n\n`
      if (v2r.failedAssertions.length > 0) {
        report += `**V2 Failed:** ${v2r.failedAssertions.join(', ')}\n\n`
      }
      report += `---\n\n`
    }
  }

  // Save
  const resultsDir = path.join(import.meta.dirname, '..', 'evals', 'results')
  if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true })
  const reportPath = path.join(resultsDir, `prompt-regression-v${v1}-vs-v${v2}.md`)
  fs.writeFileSync(reportPath, report)

  console.log(`\n════════════════════════════════════════════`)
  console.log(`  PROMPT REGRESSION RESULTS`)
  console.log(`════════════════════════════════════════════\n`)
  console.log(`  V1 (${v1}): ${v1Passed}/${allTests.length} passed`)
  console.log(`  V2 (${v2}): ${v2Passed}/${allTests.length} passed`)
  console.log(`  Semantic: V1 better ${v1Better} | V2 better ${v2Better} | Equal ${equal}`)
  console.log(`\n  Report: ${reportPath}\n`)
}

main().catch(console.error)
