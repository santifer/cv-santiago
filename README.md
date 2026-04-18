# xueyifan.io

**[:gb: English](#the-problem)** | **[:es: Español](#es-versión-en-español)**

> Interactive portfolio with AI chatbot (text + voice), agentic RAG, 71 automated evals, LLMOps dashboard, and 6-layer prompt injection defense

[![Live Demo](https://img.shields.io/badge/demo-xueyifan.io-blue?style=flat-square)](https://xueyifan.io)
[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-blueviolet?style=flat-square)](https://claude.ai/code)

---

<p align="center">
  <img src="docs/hero.gif" alt="xueyifan.io in motion" width="100%" />
</p>

---

## The Problem

Static CVs don't show what you can actually build. A PDF lists skills — it doesn't prove them.

## The Solution

A production-grade interactive portfolio that **demonstrates the skills it describes**: dual-mode AI chatbot (text + voice) with agentic RAG, full LLMOps observability with custom dashboard, 71 automated evals as CI gate, prompt versioning, and a closed-loop that generates tests from production failures.

**Key Features:**
- **AI Chatbot "Yifan"** — Text (Claude Sonnet) + Voice (OpenAI Realtime API). Responds in first person as Yifan. Agentic RAG with hybrid search (pgvector + BM25) and Haiku reranking
- **6-Layer Defense** — Keyword detection, canary tokens, fingerprinting, anti-extraction, online safety scoring, adversarial red team. Real-time jailbreak email alerts
- **71 Automated Evals** — 10 categories: factual accuracy, persona, boundaries, quality, safety, language, RAG quality, multi-turn, source badges, voice quality. CI gate on every push
- **LLMOps Dashboard** — Private `/ops` with 8 tabs: Overview, Conversations, Costs, RAG, Security, Evals, Voice, System. Real data from Langfuse + Supabase
- **Closed Loop** — Trace → online scoring → quality < 0.7 → auto-generate test → CI gate blocks deploy
- **Voice Mode** — OpenAI Realtime API, audio-to-audio, shared RAG pipeline, ~$0.25/session
- **6 Published Case Studies** — Bilingual (ES/EN) with JSON-LD, prerendered HTML, cross-linked RAG, and interactive architecture diagrams
- **Interactive Architecture Diagram** — GSAP-animated SVG with narrated audio, pan/zoom, dark mode sync. [Explore it →](https://xueyifan.io/self-healing-chatbot#architecture)
- **GEO-ready** — `llms.txt`, structured data (JSON-LD), AI crawler-friendly robots.txt

---

## Tech Stack

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_Sonnet-191919?style=flat&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_Realtime-412991?style=flat&logo=openai&logoColor=white)
![Langfuse](https://img.shields.io/badge/Langfuse-000000?style=flat&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Edge-000000?style=flat&logo=vercel&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat&logoColor=white)

---

## Chatbot Architecture

[![Interactive Architecture Diagram](public/chatbot/diagram-thumbnail.webp)](https://xueyifan.io/self-healing-chatbot#architecture)
> **[Explore the interactive diagram →](https://xueyifan.io/self-healing-chatbot#architecture)** 10 phases · narrated audio · zoom + pan

```
User message → FloatingChat.tsx → api/chat.js (Vercel Edge)
                                    ├── System prompt (Langfuse registry + fallback)
                                    ├── Claude Sonnet (tool_use decision)
                                    ├── Agentic RAG (if needed):
                                    │     ├── OpenAI embeddings (text-embedding-3-small)
                                    │     ├── Supabase pgvector (semantic) + full-text (BM25)
                                    │     └── Claude Haiku (reranking + diversification)
                                    ├── Claude Sonnet (streaming generation)
                                    ├── Langfuse tracing (every span with cost)
                                    └── waitUntil → Haiku scoring (0ms added latency)

Voice mode → useVoiceMode.ts → api/voice-token.js → OpenAI Realtime WebSocket
                                  └── api/rag-search.js (function calling for RAG)
```

### Key Files

| File | Path | Description |
|------|------|-------------|
| Chat edge function | `api/chat.js` | Main chatbot — RAG, tracing, scoring, streaming, defense |
| RAG pipeline | `api/_shared/rag.js` | Hybrid search, reranking, cost tracking, intent classification |
| Prompt management | `api/_shared/prompt.js` | Langfuse prompt registry with file fallback |
| Voice token | `api/voice-token.js` | OpenAI Realtime ephemeral token + rate limiting |
| Voice RAG | `api/rag-search.js` | RAG search for voice mode function calling |
| Voice trace | `api/voice-trace.js` | Voice session tracing with cost estimation |
| Chat widget | `src/FloatingChat.tsx` | React widget — streaming SSE, quick prompts, contact CTA |
| Voice hook | `src/useVoiceMode.ts` | WebSocket management, audio capture, transcript persistence |
| System prompt | `chatbot-prompt.txt` | Fallback prompt (production uses Langfuse v5) |

---

## LLMOps Dashboard (`/ops`)

Private, password-protected dashboard with 8 tabs showing real production data:

| Tab | What it shows | Data source |
|-----|---------------|-------------|
| Overview | KPIs, timelines, donuts, intent distribution | Langfuse traces |
| Conversations | Filter + list + detail with spans, cost, latency, scores | Langfuse traces + observations |
| Costs | Breakdown per component (toolDecision/embedding/reranking/generation/voice) | `trace.metadata.cost` |
| RAG | Activation rate, chunks per article | Langfuse tags + Supabase |
| Security | Defense funnel, safety distribution, jailbreak list | Langfuse tags + scores |
| Evals | Pass rates by category (embedded from real eval reports) | `evals/results/` via build |
| Voice | Sessions, text/voice split, latency P50/P95, cost per minute | Langfuse tags |
| System | Prompt versions, RAG document stats, model pricing | Langfuse prompts API + Supabase |

### Dashboard API Layer

| Endpoint | Path | Description |
|----------|------|-------------|
| Auth | `api/ops/auth.js` | Login (validates `OPS_DASHBOARD_SECRET`) |
| Stats | `api/ops/stats.js` | Aggregated stats, server-side compute from traces |
| Traces | `api/ops/traces.js` | List traces with filters (lang, mode, RAG, jailbreak) |
| Trace detail | `api/ops/trace/[id].js` | Full trace with observations, scores, Langfuse link |
| Evals | `api/ops/evals.js` | Eval results embedded from build |
| Prompts | `api/ops/prompts.js` | Prompt versions from Langfuse |
| RAG stats | `api/ops/rag-stats.js` | Document stats from Supabase |

---

## Evals & Testing

71 automated tests across 10 categories. ~70% deterministic (contains, regex, word count), ~30% LLM-as-Judge (Haiku).

| Category | Tests | Type |
|----------|-------|------|
| factual_accuracy | 9 | Deterministic |
| persona_adherence | 4 | Deterministic |
| boundary_testing | 7 | Deterministic |
| response_quality | 7 | Mixed |
| safety_jailbreak | 7 | Deterministic |
| language_handling | 5 | Deterministic |
| rag_quality | 16 | Mixed |
| multi_turn | 5 | Mixed |
| source_badges | 5 | Deterministic |
| voice_quality | 6 | Mixed |

---

## Scripts & CLI Tools

All scripts live in `scripts/` and run via `npm run`:

### Chatbot Operations
| Command | Script | Description |
|---------|--------|-------------|
| `npm run evals` | `evals/runner.ts` | Run 71 automated evals |
| `npm run adversarial` | `scripts/adversarial-test.ts` | Red team: 20+ auto-generated attacks |
| `npm run chats` | `scripts/chats.ts` | View last 50 conversations from Langfuse |
| `npm run chats -- --full` | `scripts/chats.ts` | Full conversations with messages |
| `npm run chats -- --jailbreak` | `scripts/chats.ts` | Only jailbreak attempts |
| `npm run evaluate-traces` | `scripts/evaluate-traces.ts` | Batch eval with Haiku (quality, safety, intent) |
| `npm run diagnose:rag` | `scripts/diagnose-rag.ts` | RAG quality diagnostic — detects retrieval misses |

### Prompt & RAG Management
| Command | Script | Description |
|---------|--------|-------------|
| `npm run prompt:sync` | `scripts/sync-prompt-to-langfuse.ts` | Sync prompt to Langfuse (hash-based, skip if unchanged) |
| `npm run prompt:regression` | `scripts/prompt-regression.ts` | Compare two prompt versions side by side |
| `npm run rag:sync` | `scripts/export-chunks.ts` + `scripts/ingest-rag.ts` | Re-export articles + ingest to Supabase |

### Contract & Integration Tests
| Command | Script | Description |
|---------|--------|-------------|
| `npm run test:contract` | `tests/ops-contract.test.ts` | Validate trace metadata matches dashboard contract (67 tests) |
| `npm run test:ops` | `tests/ops-dashboard.test.ts` | Test all 7 dashboard API endpoints (102 tests) |

### Build Pipeline
| Command | Script | Description |
|---------|--------|-------------|
| `npm run build` | (chained) | rag:sync → prompt:sync → embed-evals → reddit-stats → tsc → vite → sitemap → validate → prerender |
| — | `scripts/embed-evals.ts` | Parse eval reports → embed in dashboard |
| — | `scripts/generate-sitemap.ts` | Generate sitemap.xml with lastmod |
| — | `scripts/validate-articles.ts` | SEO validation (dates, keywords, OG images) |
| — | `scripts/validate-llms-txt.ts` | Validate llms.txt consistency |
| — | `scripts/prerender.tsx` | SSR prerender all pages with critical CSS |
| — | `scripts/indexnow-ping.ts` | Ping Bing/Yandex on deploy |

---

## Quick Start

```bash
git clone https://github.com/xueyifan/cv-Yifan.git
cd cv-Yifan
npm install
npm run dev
```

Open [localhost:5173](http://localhost:5173)

### Environment Variables

```bash
# Core
ANTHROPIC_API_KEY=           # Claude API (chatbot)
OPENAI_API_KEY=              # Embeddings + Voice

# RAG
SUPABASE_URL=                # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=   # Supabase service key

# Observability
LANGFUSE_PUBLIC_KEY=         # Langfuse tracing
LANGFUSE_SECRET_KEY=         # Langfuse tracing

# Alerts & Dashboard
RESEND_API_KEY=              # Jailbreak email alerts
OPS_DASHBOARD_SECRET=        # Dashboard password (/ops)
```

---

## Project Structure

```
src/
├── App.tsx                  # Full CV — all sections
├── FloatingChat.tsx         # Chat widget (text mode)
├── useVoiceMode.ts          # Voice mode hook (OpenAI Realtime)
├── VoiceOrb.tsx             # Voice UI (orb + transcript)
├── GlobalNav.tsx            # Navigation with breadcrumbs
├── main.tsx                 # React Router + lazy loading
├── i18n.ts                  # Bilingual translations
├── articles/
│   ├── registry.ts          # Centralized article config
│   ├── components.tsx       # Shared article components
│   └── json-ld.ts           # JSON-LD builder
├── ops/                     # LLMOps Dashboard
│   ├── OpsDashboard.tsx     # Shell + Overview tab
│   ├── OpsAuth.tsx          # Login screen
│   ├── types.ts             # Shared TypeScript interfaces
│   ├── hooks/               # useOpsApi, useTraces
│   ├── components/          # KpiCard, MetricChart, FilterBar, etc.
│   └── tabs/                # Conversations, Costs, Security, Evals, etc.
├── [Article].tsx             # Case study components (5 articles)
└── [article]-i18n.ts         # Bilingual content per article

api/
├── chat.js                  # Main chatbot edge function
├── voice-token.js           # Voice ephemeral token + rate limit
├── voice-trace.js           # Voice session tracing
├── rag-search.js            # RAG for voice function calling
├── _shared/
│   ├── rag.js               # RAG pipeline (search, rerank, cost)
│   ├── prompt.js            # Prompt versioning (Langfuse)
│   └── ops-auth.js          # Dashboard auth helper
└── ops/                     # Dashboard API proxy layer
    ├── auth.js              # Login
    ├── stats.js             # Aggregated stats
    ├── traces.js            # Trace list with filters
    ├── trace/[id].js        # Trace detail
    ├── evals.js             # Eval results
    ├── prompts.js           # Prompt versions
    └── rag-stats.js         # RAG document stats

evals/
├── datasets/                # 10 JSON datasets (71 test cases)
├── assertions.ts            # Deterministic assertions
├── llm-judge.ts             # LLM-as-Judge (Haiku)
└── runner.ts                # Eval runner

scripts/                     # See "Scripts & CLI Tools" section above
tests/
├── ops-contract.test.ts     # Contract tests (67 assertions)
└── ops-dashboard.test.ts    # Dashboard API tests (102 assertions)

chatbot-prompt.txt           # System prompt (fallback, prod uses Langfuse)
```

---

## Case Studies

| Article | Slugs | Type |
|---------|-------|------|
| Self-Healing Chatbot | `/chatbot-que-se-cura-solo` `/self-healing-chatbot` | case-study |
| Career-Ops | `/career-ops` `/career-ops-system` | case-study |
| Jacobo AI Agent | `/agente-ia-jacobo` `/ai-agent-jacobo` | case-study |
| Business OS | `/business-os-para-airtable` `/business-os-for-airtable` | case-study |
| Programmatic SEO | `/seo-programatico` `/programmatic-seo` | case-study |
| n8n for PMs | `/n8n-para-pms` `/n8n-for-pms` | collab |
| Xueyifan iRepair | `/xueyifan-irepair` `/xueyifan-irepair-founder` | bridge |

---

## Cost

- **<$0.005 per text conversation** (5 models in the pipeline)
- **~$0.25 per voice session** (OpenAI Realtime)
- **$0 infrastructure** (free tiers: Vercel, Supabase, Langfuse)
- **~$30/month** estimated at 200 conversations/day

---

## License

MIT

---

---

# :es: Versión en Español

> Portfolio interactivo con chatbot IA (texto + voz), RAG agéntico, 71 evals automatizados, dashboard LLMOps y defensa anti-inyección en 6 capas

[![Demo en vivo](https://img.shields.io/badge/demo-xueyifan.io-blue?style=flat-square)](https://xueyifan.io)

---

<p align="center">
  <img src="docs/hero.gif" alt="xueyifan.io en movimiento" width="100%" />
</p>

---

## El Problema

Los CVs estáticos no demuestran lo que realmente sabes construir. Un PDF lista habilidades — no las prueba.

## La Solución

Un portfolio interactivo de nivel producción que **demuestra las habilidades que describe**: chatbot IA dual (texto + voz) con RAG agéntico, observabilidad LLMOps completa con dashboard custom, 71 evals automatizados como CI gate, versionado de prompts, y un closed-loop que genera tests de fallos en producción.

**Funcionalidades:**
- **Chatbot IA "Yifan"** — Texto (Claude Sonnet) + Voz (OpenAI Realtime API). Responde en primera persona como Yifan. RAG agéntico con búsqueda híbrida (pgvector + BM25) y reranking con Haiku
- **Defensa en 6 capas** — Keyword detection, canary tokens, fingerprinting, anti-extraction, online safety scoring, adversarial red team. Alertas de jailbreak por email en tiempo real
- **71 Evals automatizados** — 10 categorías: factual, persona, boundaries, quality, safety, language, RAG, multi-turn, source badges, voice. CI gate en cada push
- **Dashboard LLMOps** — `/ops` privado con 8 pestañas: Overview, Conversations, Costs, RAG, Security, Evals, Voice, System. Datos reales de Langfuse + Supabase
- **Closed Loop** — Traza → scoring online → quality < 0.7 → auto-genera test → CI gate bloquea deploy
- **Modo voz** — OpenAI Realtime API, audio-to-audio, mismo pipeline RAG, ~$0.25/sesión
- **6 Case Studies publicados** — Bilingües (ES/EN) con JSON-LD, HTML prerenderizado, RAG cross-linked y diagramas de arquitectura interactivos
- **Diagrama de Arquitectura Interactivo** — SVG animado con GSAP, audio narrado, pan/zoom, sync dark mode. [Explorar →](https://xueyifan.io/chatbot-que-se-cura-solo#architecture)
- **GEO-ready** — `llms.txt`, datos estructurados (JSON-LD), robots.txt amigable con crawlers IA

---

## Stack Técnico

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_Sonnet-191919?style=flat&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_Realtime-412991?style=flat&logo=openai&logoColor=white)
![Langfuse](https://img.shields.io/badge/Langfuse-000000?style=flat&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Edge-000000?style=flat&logo=vercel&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat&logoColor=white)

---

## Arquitectura del Chatbot

[![Diagrama Interactivo de Arquitectura](public/chatbot/diagram-thumbnail.webp)](https://xueyifan.io/chatbot-que-se-cura-solo#architecture)
> **[Explorar el diagrama interactivo →](https://xueyifan.io/chatbot-que-se-cura-solo#architecture)** 10 fases · audio narrado · zoom + pan

```
Mensaje → FloatingChat.tsx → api/chat.js (Vercel Edge)
                               ├── System prompt (Langfuse registry + fallback)
                               ├── Claude Sonnet (decisión tool_use)
                               ├── RAG Agéntico (si necesario):
                               │     ├── OpenAI embeddings (text-embedding-3-small)
                               │     ├── Supabase pgvector (semántico) + full-text (BM25)
                               │     └── Claude Haiku (reranking + diversificación)
                               ├── Claude Sonnet (generación streaming)
                               ├── Langfuse tracing (cada span con coste)
                               └── waitUntil → Haiku scoring (0ms de latencia añadida)

Modo voz → useVoiceMode.ts → api/voice-token.js → OpenAI Realtime WebSocket
                                └── api/rag-search.js (function calling para RAG)
```

### Archivos Clave

| Archivo | Ruta | Descripción |
|---------|------|-------------|
| Chat edge function | `api/chat.js` | Chatbot principal — RAG, tracing, scoring, streaming, defensa |
| Pipeline RAG | `api/_shared/rag.js` | Búsqueda híbrida, reranking, coste, clasificación de intención |
| Gestión de prompt | `api/_shared/prompt.js` | Langfuse prompt registry con fallback local |
| Token de voz | `api/voice-token.js` | Token efímero OpenAI Realtime + rate limiting |
| RAG voz | `api/rag-search.js` | Búsqueda RAG para function calling de voz |
| Trace voz | `api/voice-trace.js` | Tracing de sesiones de voz con estimación de coste |
| Widget chat | `src/FloatingChat.tsx` | Widget React — streaming SSE, quick prompts, CTA de contacto |
| Hook de voz | `src/useVoiceMode.ts` | Gestión WebSocket, captura audio, persistencia de transcript |
| System prompt | `chatbot-prompt.txt` | Prompt fallback (producción usa Langfuse v5) |

---

## Dashboard LLMOps (`/ops`)

Dashboard privado protegido por contraseña con 8 pestañas mostrando datos reales:

| Pestaña | Qué muestra | Fuente de datos |
|---------|-------------|-----------------|
| Overview | KPIs, timelines, donuts, distribución de intents | Trazas Langfuse |
| Conversations | Filtros + lista + detalle con spans, coste, latencia, scores | Trazas + observaciones |
| Costs | Desglose por componente (toolDecision/embedding/reranking/generation/voice) | `trace.metadata.cost` |
| RAG | Tasa de activación, chunks por artículo | Tags Langfuse + Supabase |
| Security | Funnel de defensa, distribución de safety, lista de jailbreaks | Tags + scores |
| Evals | Pass rates por categoría (embebidos de reports reales) | `evals/results/` via build |
| Voice | Sesiones, split texto/voz, latencia P50/P95, coste por minuto | Tags Langfuse |
| System | Versiones de prompt, stats de documentos RAG, precios de modelos | API prompts Langfuse + Supabase |

---

## Evals y Testing

71 tests automatizados en 10 categorías. ~70% deterministas, ~30% LLM-as-Judge (Haiku).

| Categoría | Tests | Tipo |
|-----------|-------|------|
| factual_accuracy | 9 | Determinista |
| persona_adherence | 4 | Determinista |
| boundary_testing | 7 | Determinista |
| response_quality | 7 | Mixto |
| safety_jailbreak | 7 | Determinista |
| language_handling | 5 | Determinista |
| rag_quality | 16 | Mixto |
| multi_turn | 5 | Mixto |
| source_badges | 5 | Determinista |
| voice_quality | 6 | Mixto |

---

## Scripts y Herramientas CLI

Todos los scripts están en `scripts/` y se ejecutan con `npm run`:

### Operaciones del Chatbot
| Comando | Script | Descripción |
|---------|--------|-------------|
| `npm run evals` | `evals/runner.ts` | Ejecutar 71 evals automatizados |
| `npm run adversarial` | `scripts/adversarial-test.ts` | Red team: 20+ ataques auto-generados |
| `npm run chats` | `scripts/chats.ts` | Ver últimas 50 conversaciones de Langfuse |
| `npm run chats -- --full` | `scripts/chats.ts` | Conversaciones completas con mensajes |
| `npm run chats -- --jailbreak` | `scripts/chats.ts` | Solo intentos de jailbreak |
| `npm run evaluate-traces` | `scripts/evaluate-traces.ts` | Eval batch con Haiku (calidad, seguridad, intención) |
| `npm run diagnose:rag` | `scripts/diagnose-rag.ts` | Diagnóstico de calidad RAG — detecta retrieval misses |

### Gestión de Prompt y RAG
| Comando | Script | Descripción |
|---------|--------|-------------|
| `npm run prompt:sync` | `scripts/sync-prompt-to-langfuse.ts` | Sync prompt a Langfuse (basado en hash, skip si no cambió) |
| `npm run prompt:regression` | `scripts/prompt-regression.ts` | Comparar dos versiones del prompt |
| `npm run rag:sync` | `scripts/export-chunks.ts` + `scripts/ingest-rag.ts` | Re-exportar artículos + ingestar en Supabase |

### Tests de Contrato e Integración
| Comando | Script | Descripción |
|---------|--------|-------------|
| `npm run test:contract` | `tests/ops-contract.test.ts` | Validar que metadata de trazas coincide con contrato del dashboard (67 tests) |
| `npm run test:ops` | `tests/ops-dashboard.test.ts` | Testear los 7 endpoints API del dashboard (102 tests) |

---

## Inicio Rápido

```bash
git clone https://github.com/xueyifan/cv-Yifan.git
cd cv-Yifan
npm install
npm run dev
```

Abrir [localhost:5173](http://localhost:5173)

### Variables de Entorno

```bash
# Core
ANTHROPIC_API_KEY=           # Claude API (chatbot)
OPENAI_API_KEY=              # Embeddings + Voz

# RAG
SUPABASE_URL=                # URL del proyecto Supabase
SUPABASE_SERVICE_ROLE_KEY=   # Clave de servicio Supabase

# Observabilidad
LANGFUSE_PUBLIC_KEY=         # Tracing Langfuse
LANGFUSE_SECRET_KEY=         # Tracing Langfuse

# Alertas y Dashboard
RESEND_API_KEY=              # Alertas de jailbreak por email
OPS_DASHBOARD_SECRET=        # Contraseña del dashboard (/ops)
```

---

## Estructura del Proyecto

```
src/
├── App.tsx                  # CV completo — todas las secciones
├── FloatingChat.tsx         # Widget de chat (modo texto)
├── useVoiceMode.ts          # Hook de modo voz (OpenAI Realtime)
├── VoiceOrb.tsx             # UI de voz (orbe + transcript)
├── GlobalNav.tsx            # Navegación con breadcrumbs
├── main.tsx                 # React Router + lazy loading
├── i18n.ts                  # Traducciones bilingües
├── articles/
│   ├── registry.ts          # Config centralizada de artículos
│   ├── components.tsx        # Componentes compartidos
│   └── json-ld.ts           # Builder de JSON-LD
├── ops/                     # Dashboard LLMOps
│   ├── OpsDashboard.tsx     # Shell + pestaña Overview
│   ├── OpsAuth.tsx          # Pantalla de login
│   ├── types.ts             # Interfaces TypeScript compartidas
│   ├── hooks/               # useOpsApi, useTraces
│   ├── components/          # KpiCard, MetricChart, FilterBar, etc.
│   └── tabs/                # Conversations, Costs, Security, Evals, etc.
├── [Articulo].tsx            # Componentes de case studies (5 artículos)
└── [articulo]-i18n.ts        # Contenido bilingüe por artículo

api/
├── chat.js                  # Edge function principal del chatbot
├── voice-token.js           # Token efímero de voz + rate limit
├── voice-trace.js           # Tracing de sesiones de voz
├── rag-search.js            # RAG para function calling de voz
├── _shared/
│   ├── rag.js               # Pipeline RAG (búsqueda, rerank, coste)
│   ├── prompt.js            # Versionado de prompt (Langfuse)
│   └── ops-auth.js          # Helper de auth del dashboard
└── ops/                     # Capa API proxy del dashboard
    ├── auth.js, stats.js, traces.js, trace/[id].js
    ├── evals.js, prompts.js, rag-stats.js

evals/
├── datasets/                # 10 datasets JSON (71 test cases)
├── assertions.ts            # Assertions deterministas
├── llm-judge.ts             # LLM-as-Judge (Haiku)
└── runner.ts                # Runner de evaluaciones

scripts/                     # Ver sección "Scripts y Herramientas CLI"
tests/
├── ops-contract.test.ts     # Tests de contrato (67 assertions)
└── ops-dashboard.test.ts    # Tests API del dashboard (102 assertions)

chatbot-prompt.txt           # System prompt (fallback, producción usa Langfuse)
```

---

## Case Studies

| Artículo | Slugs | Tipo |
|----------|-------|------|
| Chatbot que se cura solo | `/chatbot-que-se-cura-solo` `/self-healing-chatbot` | case-study |
| Career-Ops | `/career-ops` `/career-ops-system` | case-study |
| Agente IA Jacobo | `/agente-ia-jacobo` `/ai-agent-jacobo` | case-study |
| Business OS | `/business-os-para-airtable` `/business-os-for-airtable` | case-study |
| SEO Programático | `/seo-programatico` `/programmatic-seo` | case-study |
| n8n para PMs | `/n8n-para-pms` `/n8n-for-pms` | collab |
| Xueyifan iRepair | `/xueyifan-irepair` `/xueyifan-irepair-founder` | bridge |

---

## Coste

- **<$0.005 por conversación de texto** (5 modelos en el pipeline)
- **~$0.25 por sesión de voz** (OpenAI Realtime)
- **$0 infraestructura** (free tiers: Vercel, Supabase, Langfuse)
- **~$30/mes** estimado a 200 conversaciones/día

---

## Licencia

MIT

---

## Let's Connect

[![Website](https://img.shields.io/badge/xueyifan.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://xueyifan.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/xueyifan)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yifanxue.sde@gmail.com)
