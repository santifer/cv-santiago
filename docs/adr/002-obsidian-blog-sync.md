# ADR-002: Obsidian blog sync workflow

**Date:** 2026-05-08
**Status:** Accepted
**Decision makers:** Farid Sayago, coding agent

## Context

Farid writes public blog notes in the Obsidian vault at `/home/faris/Documents/obsidian/portfolio/blog`. The portfolio runs as a static Hostinger frontend, while the API and LLMOps pieces live on Vercel.

The blog needs two sync paths:

- run automatically once per day
- run when the Obsidian blog folder changes

The sync also has to keep SEO, prerendering, sitemap generation, and RAG export on the same content source.

## Decision

Use a Git-backed Markdown sync workflow.

- Obsidian remains the writing source.
- `scripts/sync-obsidian-blog.ts` reads published Markdown notes and generates `src/content/blog/generated.ts`.
- The Blog Content Module exposes blog posts to UI routes, SEO, prerendering, sitemap generation, and RAG export.
- `.github/workflows/sync-obsidian-blog.yml` runs daily, manually, and on `repository_dispatch`.
- The Obsidian vault has a small workflow that dispatches the Dynamic-CV sync when files under `portfolio/blog/**/*.md` change.

## Alternatives considered

| Alternative | Why rejected for now |
| --- | --- |
| Supabase `blog_posts` table | Adds a CMS layer before the static site needs one. It also complicates prerendering and local writing. |
| Supabase Storage for Markdown | Useful later for images or remote authoring, but too much infrastructure for one writer today. |
| Local watcher only | Good for development, but it does not solve scheduled sync or CI deployment. |
| Manual copy script only | Already proven in the 3D portfolio, but Farid asked for automatic sync. |

## Consequences

- Published Markdown is committed as generated TypeScript before deployment.
- Drafts stay private because the sync requires `published: true`.
- Obsidian-only syntax is blocked until a converter exists.
- Supabase stays focused on RAG/vector search and ops data.
- GitHub secrets are required for cross-repo automation: `OBSIDIAN_REPO_TOKEN` in Dynamic-CV and `PORTFOLIO_DISPATCH_TOKEN` in the Obsidian repo.
