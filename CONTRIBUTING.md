# Contributing to cv-santiago

Thanks for your interest in contributing! 

---

## Before You Start

Please **open an issue first** to discuss what you'd like to change.
This avoids duplicate work and ensures your PR gets merged.

---

## Local Setup

```bash
git clone https://github.com/santifer/cv-santiago.git
cd cv-santiago
npm install
cp .env.local.example .env.local  # add your API keys
npm run dev
```

Open [localhost:5173](http://localhost:5173)

### Required Environment Variables

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude chatbot |
| `OPENAI_API_KEY` | Embeddings + Voice |
| `SUPABASE_URL` | RAG database |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase access |
| `LANGFUSE_PUBLIC_KEY` | Tracing |
| `LANGFUSE_SECRET_KEY` | Tracing |
| `RESEND_API_KEY` | Jailbreak email alerts |
| `OPS_DASHBOARD_SECRET` | Dashboard password |

---

## Running Tests & Evals

```bash
npm run evals              # Run 71 automated eval tests
npm run test:contract      # Contract tests (67 assertions)
npm run test:ops           # Dashboard API tests (102 assertions)
npm run adversarial        # Red team attack tests
```

---

## How to Contribute

```bash
# 1. Fork the repo and clone your fork
git clone https://github.com/YOUR_USERNAME/cv-santiago.git

# 2. Create a branch
git checkout -b your-feature-name

# 3. Make your changes

# 4. Commit with a clear message
git commit -m "feat: describe your change"

# 5. Push
git push origin your-feature-name

# 6. Open a Pull Request on GitHub
```

---

## Commit Message Format

| Prefix | When to use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `test:` | Adding or fixing tests |
| `chore:` | Maintenance tasks |

---

## Good First Contributions

- Add eval test cases in `evals/datasets/`
- Improve bilingual content (`src/*-i18n.ts`)
- Fix typos or improve docs
- Add contract test assertions

---

## Questions?

Open an issue or reach out at [hola@santifer.io](mailto:hola@santifer.io)