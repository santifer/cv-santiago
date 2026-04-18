import Anthropic from '@anthropic-ai/sdk'
import { Langfuse } from 'langfuse'
import {
  searchPortfolio, formatChunksForContext, extractSources, calcCost,
  filterSourcesByResponse, detectMentionedArticles, HOME_SOURCE,
} from './_shared/rag.js'
import { getSystemPrompt } from './_shared/prompt.js'

export const config = {
  runtime: 'edge',
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

let langfuseClient = null
function getLangfuse() {
  if (!langfuseClient && process.env.LANGFUSE_SECRET_KEY) {
    langfuseClient = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_BASE_URL,
    })
  }
  return langfuseClient
}

// ---------------------------------------------------------------------------
// Claude reasoning layer — turns raw RAG chunks into a verified answer
// ---------------------------------------------------------------------------

const VOICE_OVERRIDE = `Respuesta para conversación hablada. Max 2-3 frases. Sin markdown ni links. Lenguaje natural hablado. Sé preciso con datos del contexto — nunca inventes. SIEMPRE habla en PRIMERA PERSONA como Yifan — nunca en tercera persona ("Yifan hizo..."), sino "Yo hice...", "Construí...", "Mi proyecto...".`

async function reasonWithClaude(query, formattedChunks, span, langfuse) {
  const t0 = Date.now()
  const reasoningSpan = span?.span({ name: 'claude-reasoning', metadata: { query } })

  try {
    const { text: systemPromptText } = await getSystemPrompt(langfuse)

    const response = await Promise.race([
      client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: `${systemPromptText}\n\n${VOICE_OVERRIDE}`,
        messages: [
          { role: 'user', content: query },
          {
            role: 'assistant',
            content: [{
              type: 'tool_use',
              id: 'voice_rag_call',
              name: 'search_portfolio',
              input: { query },
            }],
          },
          {
            role: 'user',
            content: [{
              type: 'tool_result',
              tool_use_id: 'voice_rag_call',
              content: formattedChunks,
            }],
          },
        ],
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Claude reasoning timeout (>3s)')), 3000)),
    ])

    const answer = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    const inputTokens = response.usage?.input_tokens || 0
    const outputTokens = response.usage?.output_tokens || 0
    const latencyMs = Date.now() - t0

    reasoningSpan?.end({
      metadata: {
        inputTokens,
        outputTokens,
        latencyMs,
        cost: calcCost('claude-sonnet-4-6', inputTokens, outputTokens),
      },
    })

    return answer || null
  } catch (err) {
    reasoningSpan?.end({ metadata: { error: err.message, latencyMs: Date.now() - t0 } })
    return null // fallback to raw chunks
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { query, traceId, currentPage } = await req.json()

    if (!traceId) {
      return new Response(JSON.stringify({ error: 'Missing traceId' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing query' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create span under existing voice trace if provided
    const langfuse = getLangfuse()
    let trace = null
    if (langfuse && traceId) {
      trace = langfuse.trace({ id: traceId })
    }
    const ragSpan = trace?.span({ name: 'voice-rag', metadata: { query } })

    const t0 = Date.now()

    try {
      const ragResult = await searchPortfolio(query, ragSpan, client)

      const formattedChunks = ragResult.chunks
        ? formatChunksForContext(ragResult.chunks)
        : 'No relevant content found.'

      const sources = ragResult.sources || []

      ragSpan?.end({
        metadata: {
          chunksFound: ragResult.chunks?.length || 0,
          degraded: ragResult.degraded,
          metrics: ragResult.metrics,
        },
      })

      // Latency budget: skip Claude reasoning if RAG already took >1.5s
      const ragElapsedMs = Date.now() - t0
      const reasonedAnswer = (ragResult.chunks && ragElapsedMs <= 1500)
        ? await reasonWithClaude(query, formattedChunks, trace, langfuse)
        : null

      // Tier 1: Claude + RAG → reasoned answer
      // Tier 2: RAG only (Claude failed) → raw chunks
      // Tier 3: both failed → handled by catch below
      const context = reasonedAnswer || formattedChunks

      // Filter sources to articles mentioned in the answer (same logic as chat.js)
      const responseText = reasonedAnswer || ''
      let filteredSources = sources.length > 0
        ? filterSourcesByResponse(sources, responseText)
        : []

      // Enrich with keyword-detected articles not in RAG sources
      const ragArticleIds = new Set(filteredSources.map(s => s.article_id))
      const detected = detectMentionedArticles(responseText)
      for (const d of detected) {
        if (!ragArticleIds.has(d.article_id) && filteredSources.length < 3) {
          filteredSources.push(d)
        }
      }

      // Home fallback when RAG found chunks but no specific article matched
      if (filteredSources.length === 0 && sources.length > 0) {
        filteredSources = [HOME_SOURCE]
      }

      if (langfuse) await langfuse.flushAsync()

      return new Response(JSON.stringify({ context, sources: filteredSources, currentPage }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (err) {
      ragSpan?.end({ metadata: { error: err.message } })
      if (langfuse) await langfuse.flushAsync()

      // Return empty context on timeout/error rather than failing
      return new Response(JSON.stringify({
        context: 'Search unavailable — answer from your general knowledge.',
        sources: [],
      }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    console.error('RAG search error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
