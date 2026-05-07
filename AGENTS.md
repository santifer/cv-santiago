# AGENTS.md — Dynamic-CV Farid Rebrand

## Project intent

This repository is being refactored into Farid Sayago's production portfolio. Treat it as a full Farid rebrand, not a visual skin.

The target product combines:

- Farid's existing portfolio design language from `/home/faris/Desktop/personal/3d-portfolio`
- The advanced AI/LLMOps functionality currently present in this repository
- Farid-only content, projects, links, persona, SEO, RAG knowledge, evals, and API behavior

## Non-negotiable rules

1. **No Santiago/Santifer public identity may remain** in the shipped site.
   - Remove/replace names, emails, social links, SEO metadata, prompt text, project descriptions, article copy, images, and console easter eggs.
   - Existing infrastructure may remain only when reauthored for Farid.

2. **API integrations must be Farid-only.**
   - Chatbot persona must answer as Farid Sayago.
   - RAG corpus must describe Farid's projects, experience, skills, and writing.
   - Voice mode, ops dashboard, evals, Langfuse metadata, Supabase data, alerts, and prompts must not reference Santiago/Santifer.

3. **Keep all advanced modules unless explicitly removed later.**
   - Text chatbot
   - Voice chatbot
   - RAG pipeline
   - Langfuse tracing
   - Supabase/vector search
   - Ops dashboard
   - Evals and adversarial tests
   - Build/prerender/SEO pipeline

4. **Simplify by deepening modules, not by scattering edits.**
   - Prefer a small number of high-leverage modules with clear interfaces.
   - Create seams around portfolio content, brand/theme, chatbot knowledge, case studies, and API contracts.
   - Avoid hardcoding Farid facts inside presentation modules.

## Architecture vocabulary

Use these terms when discussing refactors:

- **Module** — anything with an interface and implementation.
- **Interface** — everything callers need to know to use the module.
- **Implementation** — code hidden behind the interface.
- **Depth** — leverage at the interface; deep modules hide meaningful behavior.
- **Seam** — where an interface lives and behavior can change without editing callers.
- **Adapter** — concrete implementation satisfying an interface at a seam.
- **Locality** — changes stay concentrated in one place.
- **Leverage** — what callers get from a simple interface.

## Planned deepening seams

### 1. Portfolio Content Module

Owns Farid's canonical facts:

- bio and positioning
- projects
- experience
- skills
- certifications/papers
- social links
- contact details
- SEO metadata
- chatbot/RAG source facts

UI modules should consume this module instead of embedding copy.

### 2. Brand Theme Module

Owns Farid's visual identity from the 3D portfolio:

- dark blue terminal aesthetic
- glass panels
- typography tokens
- section rhythm
- button/card styles
- 3D/GSAP motion rules

### 3. Home Composition Module

Replaces the current monolithic home page with section modules inspired by `/3d-portfolio/src/sections`:

- Hero
- Selected Work
- Experience
- Skills/Tech Stack
- Blog/Field Notes if retained
- Contact

### 4. AI Knowledge Module

Owns all Farid-specific AI behavior:

- system prompt
- RAG documents/chunks
- eval datasets
- allowed/blocked topics
- source badges
- voice function context

### 5. Ops/Evals Contract Module

Keeps advanced functionality understandable and testable:

- trace metadata schema
- cost model
- eval categories
- dashboard tab contracts
- security/jailbreak event semantics

## Source repositories

- Current target repo: `/home/faris/Desktop/personal/Dynamic-CV`
- Design/content reference: `/home/faris/Desktop/personal/3d-portfolio`
- Obsidian documentation vault: `/home/faris/Documents/obsidian/portfolio`

## Documentation rules

- Major decisions must be mirrored in the Obsidian vault.
- If a future agent changes architecture, update this file and the relevant Obsidian note.
- If a decision rejects an obvious alternative for a durable reason, create an ADR in `docs/adr/`.

## Current locked decisions

1. Full Farid rebrand.
2. Keep all advanced modules for now.
3. Use `/3d-portfolio` as the design and selected-project reference.
4. LinkedIn wins for career dates/details; Platzi wins for course/profile data.
5. Do not invent certifications, courses, dates, metrics, or credentials.
6. Platzi courses live in Skills/Certifications, not a separate page.
7. Public frontend deploys on Hostinger; Vercel hosts API/LLMOps at `https://api.sayagos.tech`.
8. Public contact form uses EmailJS only.
9. Use fresh Farid-only Supabase and Langfuse projects.
10. Simplification happens through deeper modules and clearer seams, not feature deletion.
