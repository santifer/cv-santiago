# Next Agent Prompt — Dynamic-CV Farid rebrand continuation

You are continuing work in `/home/faris/Desktop/personal/Dynamic-CV`.

## User intent

The repository is being converted into Farid Sayago's production portfolio. Keep all advanced AI/LLMOps modules, but remove previous-owner public identity from shipped site/API/evals unless explicitly historical docs mention it. Focus remains architecture, public surface, Brand Theme Module, SEO, and mobile experience.

## Important project rules

Read `AGENTS.md` and `CONTEXT.md` first. Key constraints:

- Public identity must be Farid Sayago / Farid Sayago Villamizar.
- No previous-owner identity or legacy projects in shipped public site/API/evals.
- Keep text chat, voice, RAG, Langfuse, Supabase/vector search, ops dashboard, evals, prerender/SEO pipeline.
- Simplify through deeper modules and seams, not feature deletion.
- Use `/home/faris/Desktop/personal/3d-portfolio` as design reference.
- Major decisions should be mirrored in `/home/faris/Documents/obsidian/portfolio`.

## What was just implemented

1. Added Public Surface Module:
   - `src/public-surface/routes.ts`
   - `src/public-surface/seo.ts`
   - `src/public-surface/forbidden-identity.ts`

2. Added Brand Theme Module:
   - `src/brand/farid-theme.css`
   - Imported in `src/main.tsx`.
   - Includes mobile nav primitives, focus states, viewport-safe hero rules, card/terminal hover and mobile stacking.

3. Updated `src/GlobalNav.tsx`:
   - Hamburger mobile menu.
   - Glass dropdown and backdrop.

4. Reworked `scripts/prerender.tsx`:
   - Farid-only public surface.
   - Prerenders only `/`, `/en`, `/blog/mlops-field-notes`, and `404.html`.
   - Scans prerendered public pages for forbidden public identity terms.

5. Cleaned public routing:
   - `vercel.json` now only rewrites `/en`, `/blog/mlops-field-notes`, `/ops`.
   - Previous-owner route strings are not enumerated in the client bundle; they fall through to catch-all 404/noindex where SPA fallback applies.

6. Deleted unused legacy public modules:
   - Old article/page TSX files and old i18n files were removed.
   - Removed old article infrastructure not used by Farid field note.
   - Removed old stats scripts for previous-owner social stats.

7. Replaced eval datasets with Farid-only evals.

8. Rewrote voice/evaluator/adversarial/script prompts away from previous-owner identity.

9. Removed oversized unused legacy image PNGs.

10. Added Obsidian note:
   - `/home/faris/Documents/obsidian/portfolio/dynamic-cv-public-surface-brand-cleanup.md`

## User correction after implementation

The user said I wrongly erased the Kimberly-Clark position. I restored **only** `src/content/farid-profile.ts` experience entry:

```ts
{
  title: "BI Analyst",
  company: "Kimberly-Clark",
  date: "May 2026 – May 2027",
  review:
    "Analyzed Latin American market opportunities and supported decision-making with dashboards, AI-powered insights, and automated data pipelines.",
  responsibilities: [
    "Searched for commercial opportunities in the Latin American market through data analysis and dashboards.",
    "Built AI-powered solutions for market research and consumer insights using machine-learning workflows.",
    "Automated data pipelines for accurate and timely analysis with Python, SQL, and cloud tooling.",
  ],
}
```

Do **not** remove that role again. If you need to validate dates/company spelling, ask Farid or inspect approved sources, but preserve the entry unless user explicitly says otherwise.

## User instruction right before this prompt

User said: "Dont edit the chatbot prompt. write the prompt on the root of the project. which will be used for the following agent."

So do not touch `chatbot-prompt.txt` unless explicitly asked.

## Current validation status before Kimberly-Clark restore

These passed before the last restore:

```bash
npm run lint
npm run build
npm run validate-llms-txt
npx tsx --tsconfig tsconfig.app.json scripts/generate-sitemap.ts
npx tsx --tsconfig tsconfig.app.json scripts/prerender.tsx
npx tsx --tsconfig tsconfig.app.json scripts/validate-prerender.ts
```

`validate-prerender` had warnings only:

- field-note missing hero/OG image and short word count
- duplicate description for same ES/EN field-note slug
- project2/project3 WebP over budget
- vendor React bundle over budget

After Kimberly-Clark restore, rerun at least:

```bash
npm run lint
npm run build
```

Potential follow-up: sync Kimberly-Clark back into `public/llms.txt` / AI knowledge only if user approves updating chatbot/RAG facts. The user explicitly said not to edit chatbot prompt now.

## Recommended next work

1. Rerun validation after Kimberly-Clark restore.
2. Decide whether AI/RAG/public llms facts should include Kimberly-Clark entry. Ask user first because they specifically said not to edit chatbot prompt.
3. Improve SEO warnings:
   - add article hero/OG image for `mlops-field-notes`
   - either expand field note or adjust validator threshold for seed notes
   - add hreflang handling for same-slug bilingual article
4. Optimize `public/images/project2.webp` and `public/images/project3.webp`.
5. Consider vendor bundle splitting if needed.
6. Continue improving Brand Theme Module and mobile experience using `/home/faris/Desktop/personal/3d-portfolio/src/index.css` as reference.
