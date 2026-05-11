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

## Agent execution rules

These rules replace the old private `CLAUDE.md` guidance and apply to every coding agent in this repo.

### Think before coding

- State assumptions before changing code. If a requirement can mean two different things, ask or document the tradeoff.
- Push back when a simpler approach solves the problem.
- Do not hide uncertainty. Name the confusing part and stop before guessing.

### Simplicity first

- Write the minimum code that solves the requested problem.
- Do not add speculative features, one-off abstractions, or configurability that was not requested.
- If a solution can be much shorter without losing behavior, simplify it before shipping.

### Surgical changes

- Touch only files tied to the request.
- Match the existing style unless the task is explicitly a style refactor.
- Remove imports, variables, and files made unused by your own change.
- Mention unrelated dead code instead of deleting it.

### Goal-driven execution

- Convert work into verifiable goals before editing.
- For multi-step tasks, keep a short plan with a verification check for each step.
- Loop until the requested behavior is verified by commands, tests, generated output, or direct file inspection.

## Blog sync workflow

- Public blog posts are written in `/home/faris/Documents/obsidian/portfolio/blog`.
- `scripts/sync-obsidian-blog.ts` syncs only notes with `published: true` into `src/content/blog/generated.ts`.
- The Blog Content Module is the seam for UI, routes, SEO, prerendering, sitemap generation, and RAG chunk export.
- The GitHub workflow `.github/workflows/sync-obsidian-blog.yml` runs daily and on `repository_dispatch` from the Obsidian vault.
- Supabase remains the RAG/vector and ops database for now. Do not introduce a blog database unless a later decision needs runtime CMS behavior.

## Skills used

- `/humanizer` — every text written for humans to read must get a humanizer pass before it ships.
- `/create-readme` — use this for README structure, GitHub presentation, shields, screenshots, and project onboarding copy.
- `/caveman` — use this for terse terminal-output summaries when Farid wants quick checks without prose.

## Current locked decisions

0. `src/content/farid-profile.ts` is the canonical truth source for Farid's public portfolio facts in this repo. Keep `public/llms.txt`, RAG chunks, eval fact expectations, SEO/person JSON-LD, and presentation copy synchronized from that module. If another approved source conflicts with the file, ask Farid before changing shipped facts.
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
11. Blog post bodies and blog frontmatter come from the Obsidian `portfolio/blog` folder. Profile facts still come from `src/content/farid-profile.ts` unless Farid explicitly changes that source order.
