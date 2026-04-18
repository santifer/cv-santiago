# ADR-001: Tech Stack Selection

**Date:** 2025-01-15
**Status:** Accepted
**Decision makers:** Yifan Fernández

## Context

Building a portfolio/CV site that doubles as a technical showcase. The site needs to demonstrate engineering maturity while remaining maintainable by a single developer. Key requirements: interactive AI chatbot, case study articles with rich content, bilingual (ES/EN), pre-rendered for SEO, fast time-to-interactive.

## Decision

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 | Concurrent features, streaming SSR compatibility, ecosystem maturity |
| Language | TypeScript (strict) | Type safety at scale, self-documenting APIs, IDE support |
| Build | Vite + SWC | Sub-second HMR, native ESM, 20x faster than Babel |
| Styling | Tailwind CSS v4 | Utility-first with CSS-native config, zero runtime, semantic tokens via CSS custom properties |
| Animations | Motion (framer-motion) | Declarative API, IntersectionObserver integration, layout animations |
| Icons | Lucide | Tree-shakeable, consistent stroke width, small bundle per icon |
| Routing | React Router v7 | File-based conventions, lazy route support, SSR-ready |
| Chat | Anthropic SDK (claude-sonnet-4-5) | Streaming SSE, low latency, strong persona adherence |
| Deploy | Vercel (Edge Runtime) | Zero-config, edge functions for chat API, automatic preview deploys |
| Observability | Langfuse | Open-source LLM tracing, LLM-as-Judge scoring, cost tracking |

## Alternatives Considered

| Alternative | Why rejected |
|-------------|-------------|
| Next.js | Over-engineered for a portfolio; RSC complexity not justified for static + 1 API route |
| Astro | Better for pure content sites, but React interactivity (chat, animations) is core to the showcase |
| Vue/Svelte | Smaller ecosystem for the specific libraries needed (Motion, Radix) |
| OpenAI API | Anthropic models showed better persona consistency and safety guardrails in testing |
| Cloudflare Workers | Vercel's DX and preview deploys outweighed Workers' edge advantage for a solo project |

## Consequences

- Single-page app requires a prerender script for SEO (implemented via `scripts/prerender.ts`)
- Edge runtime limits Node.js APIs in `api/chat.js` (no `fs`, `path`, etc.)
- Tailwind v4's CSS-native approach means `dark:` prefix uses `@media (prefers-color-scheme)` — manual `.dark` class requires CSS custom properties
- Motion adds ~30KB to bundle but is isolated via `manualChunks` splitting
