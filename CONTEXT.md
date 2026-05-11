# Project Context — Farid Portfolio Rebrand

## Product

Dynamic-CV is being refactored into Farid Sayago's production portfolio.

The product combines:

- Farid's existing 3D portfolio design and content foundation from `/home/faris/Desktop/personal/3d-portfolio`
- Additional verified Farid profile information from LinkedIn and Platzi
- The advanced AI/LLMOps modules already present in Dynamic-CV: text chatbot, voice chatbot, RAG, Langfuse tracing, Supabase/vector search, ops dashboard, evals, adversarial tests, SEO/prerender pipeline

## Approved information sources

The portfolio may use Farid information from all of these sources:

1. Existing 3D portfolio
   - `/home/faris/Desktop/personal/3d-portfolio`
   - Primary source for visual design, current public positioning, projects, experience, and section structure.

2. LinkedIn profile PDF
   - `/home/faris/Desktop/personal/work/Media/Profile.pdf`
   - Approved source for Farid's professional headline, summary, skills, certifications, education, and experience details.
   - Do not publish private/sensitive fields such as street address or phone unless Farid explicitly asks.

3. Platzi public profile
   - `https://platzi.com/p/farid-sayago-villamizar/`
   - Approved source for course names, profile stats, and learning/certification context visible on the public profile.

4. Obsidian portfolio vault
   - `/home/faris/Documents/obsidian/portfolio`
   - Human-readable planning and profile documentation for agents.

## Source precedence

When sources conflict:

1. LinkedIn wins for career dates and career details.
2. The 3D portfolio wins for design, selected-project presentation, section structure, and visual brand.
3. Platzi wins for course names and learning profile data.
4. Ask Farid only when the conflict affects a public claim not covered by the rules above.
5. Never invent missing dates, credentials, metrics, or course completions.

Resolved conflict:

- Intcomex date range must use LinkedIn PDF: July 2025 – February 2026.

## Public identity

- Public name: Farid Sayago
- Full name when appropriate: Farid Sayago Villamizar
- Portfolio domain: `sayagos.tech`
- GitHub: `https://github.com/faridsz0605`
- LinkedIn: `https://www.linkedin.com/in/faridsayago/`
- X: `https://x.com/farids0805`
- Instagram: `https://www.instagram.com/farid_sayago7/`

## Positioning

Farid is a Colombia-based Data Scientist / MLOps Engineer / Data Analyst focused on Python, SQL, machine learning, data pipelines, cloud infrastructure, and AI-native workflows.

Brand line from 3D portfolio:

> Building human-made workflows for an AI-powered world.

Supporting positioning:

> MLOps and data engineer from Colombia building reliable pipelines, cloud infrastructure, and AI systems that stay useful after the demo ends.

## Implementation constraints

- Public site, chatbot, voice persona, RAG corpus, evals, SEO, and ops labels must be Farid-only.
- No Santiago/Santifer public identity may remain.
- LinkedIn/Platzi data can be used, but only verified/public-safe fields.
- Private LinkedIn PDF contact data must not be exposed without explicit approval.
- Keep all advanced modules unless a later decision removes them.

## Content architecture decisions

- Platzi courses go into the Skills/Certifications area, not a separate Education page/section.
- Keep the existing article/case-study system as infrastructure.
- Hide/remove Santiago articles from public routing, navigation, RAG, SEO, sitemap, and eval expectations.
- Replace Santiago articles with Farid articles over time.
- First safe Farid article seed: `MLOps Field Notes: Start Small, Stay Reliable` from the 3D portfolio.
- Blog posts are authored in `/home/faris/Documents/obsidian/portfolio/blog` and synced into `src/content/blog/generated.ts` by `scripts/sync-obsidian-blog.ts`; UI, SEO, prerender, sitemap, and RAG consume the Blog Content Module instead of hardcoded article content.
- Contact backend decision: use EmailJS only, matching the existing 3D portfolio. Do not keep Resend for the public contact form unless a later decision changes this.
- Deployment decision: deploy the public portfolio frontend on Hostinger, matching the existing 3D portfolio deployment target.
- Advanced API/LLMOps deployment decision: use a hybrid architecture. Hostinger serves the static frontend; Vercel hosts API/LLMOps modules such as chat, voice token, RAG search, ops APIs, Langfuse/Supabase server calls, and any secret-bearing functionality.
- Frontend must call the Vercel API base URL via configuration. Never expose server secrets in the Hostinger static bundle.
- Target public API base URL: `https://api.sayagos.tech`.
- Implementation should still use an environment seam such as `VITE_API_BASE_URL`, defaulting to same-origin `/api` for local development and `https://api.sayagos.tech` for Hostinger production.
- Supabase/Langfuse decision: create fresh Farid-only Supabase and Langfuse projects. Do not reuse Santiago/Santifer data stores. Seed only Farid-approved RAG documents, prompts, evals, traces, and ops metadata.
