# Farid Sayago — Dynamic AI Portfolio

Production portfolio for **Farid Sayago Villamizar**.

This repo is Farid Sayago's production portfolio. It combines Farid's dark-blue terminal/glass design language with advanced AI/LLMOps modules: text chat, voice mode, RAG, Langfuse tracing, Supabase search, evals, and an ops dashboard.

## Product decisions

- Public frontend deploys on **Hostinger** (my hosting service).
- API/LLMOps backend deploys on **Vercel** at `https://api.sayagos.tech`.
- Public contact form uses **EmailJS only**.
- Text chat, voice mode, RAG, Langfuse tracing, Supabase, ops dashboard, and eval infrastructure remain.
- Supabase/Langfuse must be fresh Farid-only projects.

## Commands

```bash
npm run dev      # local frontend
npm run build    # Hostinger/static frontend build
npm run lint     # eslint
npm run preview  # preview built frontend
```

RAG/API operations:

```bash
npm run rag:export
npm run rag:ingest
npm run prompt:sync
npm run evals
npm run test:ops
```

## Environment

See `.env.local.example`.

Frontend:

```env
VITE_API_BASE_URL=https://api.sayagos.tech
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

Backend:

```env
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
OPS_DASHBOARD_SECRET=
CORS_ORIGIN=https://sayagos.tech
```
