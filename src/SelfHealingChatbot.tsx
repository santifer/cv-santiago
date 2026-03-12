import { type N8nLang as Lang } from './n8n-i18n'
import { buildArticleJsonLd } from './articles/json-ld'
import { useArticleSeo } from './articles/use-article-seo'
import {
  ArticleLayout,
  ArticleHeader,
  ArticleFooter,
  FaqSection,
  LessonsSection,
  MetricsGrid,
  StatusBadge,
  CaseStudyCta,
} from './articles/components'
import {
  H2,
  H3,
  Prose,
  Callout,
  CardStack,
  StepList,
  CodeBlock,
  DataTable,
  Timeline,
  StackGrid,
  FloatingToc,
} from './articles/content-types'
import { chatbotContent } from './chatbot-i18n'

// ---------------------------------------------------------------------------
// Stack icons (inline SVG for each tech)
// ---------------------------------------------------------------------------
const stackIcons: Record<string, React.ReactNode> = {
  'React 19': (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.846.196C4.747 2.293 4.097 4.482 4.52 7.544c.064.463.154.95.27 1.455A17.573 17.573 0 0 0 3.2 9.905C1.06 11.1 0 12.388 0 13.5c0 2.295 3.592 4.165 8.655 4.778a29.442 29.442 0 0 0 3.345.232c1.125 0 2.246-.075 3.345-.232C20.408 17.665 24 15.795 24 13.5c0-1.112-1.06-2.4-3.2-3.595.116-.505.206-.992.27-1.455.423-3.062-.228-5.251-1.74-6.014a1.934 1.934 0 0 0-.846-.196zM16.878 2.43c1.02 0 1.416.792 1.14 2.787-.053.375-.134.791-.24 1.236a18.288 18.288 0 0 0-3.878-.655 18.288 18.288 0 0 0-2.414-2.89c1.514-1.383 2.97-2.173 4.086-2.478.45-.122.842-.17 1.158-.17h.148zm-9.756 0h.148c.316 0 .708.048 1.158.17 1.115.305 2.572 1.095 4.086 2.478a18.289 18.289 0 0 0-2.414 2.89 18.288 18.288 0 0 0-3.878.654c-.106-.444-.187-.86-.24-1.235-.276-1.995.12-2.787 1.14-2.787zM12 8.08c.498 0 .996.02 1.492.06a17.033 17.033 0 0 1 1.86 2.248A16.398 16.398 0 0 1 12 15.552a16.398 16.398 0 0 1-3.352-5.164 17.034 17.034 0 0 1 1.86-2.248c.496-.04.994-.06 1.492-.06zm-5.93 1.096a16.44 16.44 0 0 0-.842 1.68c-.362.862-.67 1.74-.918 2.628-.84-.258-1.624-.565-2.338-.918-1.57-.778-2.552-1.728-2.552-2.566 0-.838.981-1.788 2.552-2.566.713-.353 1.498-.66 2.338-.918.248.888.555 1.766.918 2.628.28.57.557 1.134.842 1.68-.285.546-.562 1.11-.842 1.68a16.44 16.44 0 0 1-.918 2.628c-.84-.258-1.624-.565-2.338-.918C2.561 14.29 1.58 13.339 1.58 12.5c0-.838.981-1.788 2.552-2.566.713-.353 1.498-.66 2.338-.918-.248.888-.555 1.766-.918 2.628z"/></svg>
  ),
  Vite: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#646CFF"><path d="m23.97 3.402-11.58 20.64a.5.5 0 0 1-.87-.006L.031 3.398a.5.5 0 0 1 .55-.723L12 4.963l11.42-2.284a.5.5 0 0 1 .55.723ZM17.19.02 12.2 1.014a.3.3 0 0 0-.238.28l-.662 11.18a.3.3 0 0 0 .377.31l2.86-.724a.3.3 0 0 1 .362.373l-.85 4.215a.3.3 0 0 0 .378.35l1.764-.505a.3.3 0 0 1 .378.35l-1.35 6.553c-.063.306.36.462.53.196l.113-.177 6.23-12.467a.3.3 0 0 0-.292-.44l-2.93.28a.3.3 0 0 1-.316-.36l1.635-8.83A.3.3 0 0 0 19.54.02Z"/></svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M24 22.525H0l12-21.05z"/></svg>
  ),
  'Claude Sonnet': (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#D4A27F"><path d="M17.304 2.016a.864.864 0 0 0-.756.456L7.392 19.44a.864.864 0 0 0 .384 1.164l.864.432a.864.864 0 0 0 1.164-.384L18.96 3.576a.864.864 0 0 0-.384-1.164l-.864-.432a.864.864 0 0 0-.408-.096zM6.72 2.016a.864.864 0 0 0-.756.456l-5.58 10.08a.864.864 0 0 0 0 .864l5.58 10.08a.864.864 0 0 0 1.164.384l.864-.432a.864.864 0 0 0 .384-1.164L3.12 12.96a.864.864 0 0 1 0-.864L8.376 2.772a.864.864 0 0 0-.384-1.164l-.864-.432a.864.864 0 0 0-.408-.096z"/></svg>
  ),
  'Claude Haiku': (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#D4A27F"><path d="M17.304 2.016a.864.864 0 0 0-.756.456L7.392 19.44a.864.864 0 0 0 .384 1.164l.864.432a.864.864 0 0 0 1.164-.384L18.96 3.576a.864.864 0 0 0-.384-1.164l-.864-.432a.864.864 0 0 0-.408-.096zM6.72 2.016a.864.864 0 0 0-.756.456l-5.58 10.08a.864.864 0 0 0 0 .864l5.58 10.08a.864.864 0 0 0 1.164.384l.864-.432a.864.864 0 0 0 .384-1.164L3.12 12.96a.864.864 0 0 1 0-.864L8.376 2.772a.864.864 0 0 0-.384-1.164l-.864-.432a.864.864 0 0 0-.408-.096z"/></svg>
  ),
  OpenAI: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
  ),
  Supabase: (
    <svg viewBox="0 0 24 24" className="w-8 h-8"><defs><linearGradient id="sb-a" x1="20.86%" x2="63.35%" y1="20.17%" y2="44.75%"><stop offset="0%" stopColor="#249361"/><stop offset="100%" stopColor="#3ECF8E"/></linearGradient><linearGradient id="sb-b" x1="1.99%" x2="21.4%" y1="-13.36%" y2="34.24%"><stop offset="0%"/><stop offset="100%" stopOpacity="0"/></linearGradient></defs><path fill="url(#sb-a)" d="M13.983 21.616c-.553.694-1.64.313-1.654-.578l-.21-13.046h9.273c1.68 0 2.604 1.95 1.53 3.231z"/><path fill="url(#sb-b)" fillOpacity=".2" d="M13.983 21.616c-.553.694-1.64.313-1.654-.578l-.21-13.046h9.273c1.68 0 2.604 1.95 1.53 3.231z"/><path fill="#3ECF8E" d="M10.017 2.384c.553-.694 1.64-.313 1.654.578l.071 13.046H2.607c-1.68 0-2.604-1.95-1.53-3.231z"/></svg>
  ),
  Langfuse: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  Resend: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 0 8 5 8-5H4zm16 12V8l-8 5-8-5v10z"/></svg>
  ),
  'GitHub Actions': (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
}

// ---------------------------------------------------------------------------
// buildJsonLd
// ---------------------------------------------------------------------------
function buildJsonLd(lang: Lang) {
  const t = chatbotContent[lang]
  return buildArticleJsonLd({
    lang,
    url: `https://santifer.io/${t.slug}`,
    altUrl: `https://santifer.io/${t.altSlug}`,
    headline: t.header.h1,
    alternativeHeadline: t.seo.title,
    description: t.seo.description,
    datePublished: '2026-03-11',
    dateModified: '2026-03-11',
    keywords: [
      'LLMOps', 'self-healing chatbot', 'agentic RAG', 'jailbreak defense', 'prompt injection',
      'LLM evaluation', 'closed loop LLM', 'Langfuse', 'prompt versioning', 'adversarial testing',
      'trace-to-eval', 'hybrid search pgvector', 'AI portfolio', 'chatbot evals', 'CI gate LLM',
    ],
    images: ['https://santifer.io/chatbot/og-self-healing-chatbot.png'],
    breadcrumbHome: t.nav.breadcrumbHome,
    breadcrumbCurrent: t.nav.breadcrumbCurrent,
    faq: t.faq.items,
    articleType: 'TechArticle',
    about: [
      { '@type': 'SoftwareApplication', name: 'Langfuse', url: 'https://langfuse.com', applicationCategory: 'LLM Observability' },
      { '@type': 'SoftwareApplication', name: 'Supabase', url: 'https://supabase.com', applicationCategory: 'Database' },
      { '@type': 'Thing', name: 'LLMOps' },
      { '@type': 'Thing', name: 'Retrieval-Augmented Generation' },
    ],
    extra: { proficiencyLevel: 'Expert', dependencies: 'Claude, Langfuse, Supabase, Vercel, OpenAI, Resend, GitHub Actions' },
  })
}

// ===========================================================================
// MAIN COMPONENT
// ===========================================================================
export default function SelfHealingChatbot({ lang = 'en' }: { lang?: Lang }) {
  const t = chatbotContent[lang]

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    image: 'https://santifer.io/chatbot/og-self-healing-chatbot.png',
    publishedTime: '2026-03-11',
    modifiedTime: '2026-03-11',
    articleTags: 'LLMOps,self-healing chatbot,agentic RAG,jailbreak defense,Langfuse,evals,closed-loop,prompt injection',
    jsonLd: buildJsonLd(lang),
    xDefaultSlug: 'chatbot-que-se-cura-solo',
  })

  const s = t.sections

  return (
    <ArticleLayout lang={lang}>
      <FloatingToc />
      <ArticleHeader
        kicker={t.header.kicker}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        readingTime={t.readingTime}
      />

      <img
        src="/chatbot/hero-self-healing-chatbot.webp"
        alt={t.header.h1}
        className="w-full rounded-2xl mb-8"
        width={1400}
        height={782}
        fetchPriority="high"
      />

      <StatusBadge text={t.header.badge} />
      <MetricsGrid items={t.heroMetrics} columns={4} compact />
      <Callout className="bg-accent/10 border-accent/40">{t.tldr}</Callout>
      <Callout>{t.metaCallout}</Callout>

      <article className="prose-custom">
        {/* ================================================================ */}
        {/*  GENESIS                                                         */}
        {/* ================================================================ */}
        <H2 id="genesis">{s.genesis.heading}</H2>
        <Prose variant="hook">{s.genesis.hook}</Prose>
        <Prose>{s.genesis.firstCommit}</Prose>
        <Prose className="text-sm text-muted-foreground mb-2">{s.genesis.codeCaption}</Prose>
        <CodeBlock>
          {s.genesis.code}
        </CodeBlock>
        <Callout>{s.genesis.punchline}</Callout>

        {/* ================================================================ */}
        {/*  EVOLUTION                                                       */}
        {/* ================================================================ */}
        <H2 id="evolution">{s.evolution.heading}</H2>
        <Timeline items={s.evolution.timeline.map(item => ({
          year: item.date,
          event: item.title,
          detail: item.detail,
        }))} />
        <Callout>{s.evolution.callout}</Callout>

        <H3>{s.evolution.beforeAfter.heading}</H3>
        <DataTable
          headers={[...s.evolution.beforeAfter.headers]}
          rows={s.evolution.beforeAfter.rows.map(r => [...r])}
        />

        {/* ================================================================ */}
        {/*  ARCHITECTURE                                                    */}
        {/* ================================================================ */}
        <H2 id="architecture">{s.architecture.heading}</H2>
        <Prose>{s.architecture.body}</Prose>
        <img
          src="/chatbot/diagram-architecture.webp"
          alt={lang === 'es' ? 'Diagrama de arquitectura: User → Edge Function → Langfuse → Trace-to-Eval, Red Team, CI Gate' : 'Architecture diagram: User → Edge Function → Langfuse → Trace-to-Eval, Red Team, CI Gate'}
          className="w-full max-w-lg mx-auto rounded-xl my-8"
          width={1400}
          height={1875}
          loading="lazy"
        />
        <CardStack items={s.architecture.layers.map(l => ({
          title: l.title,
          detail: l.detail,
        }))} />

        <H3>{s.architecture.lifecycleHeading}</H3>
        <DataTable
          headers={[...s.architecture.lifecycle.headers]}
          rows={s.architecture.lifecycle.rows.map(r => [...r])}
        />

        {/* ================================================================ */}
        {/*  HOW IT WAS BUILT                                                */}
        {/* ================================================================ */}
        <H2 id="how-it-was-built">{s.howItWasBuilt.heading}</H2>
        <Prose variant="hook">{s.howItWasBuilt.intro}</Prose>
        <Prose>{s.howItWasBuilt.narrative}</Prose>
        <img
          src="/chatbot/diagram-mma-phases.webp"
          alt={lang === 'es' ? 'The MMA Loop: Measure (Cost, Score, CI Gate) → Manage (Prompt Registry, Regression Test) → Automate (Red Team, Trace-to-Eval)' : 'The MMA Loop: Measure (Cost, Score, CI Gate) → Manage (Prompt Registry, Regression Test) → Automate (Red Team, Trace-to-Eval)'}
          className="w-full rounded-xl my-8"
          width={1400}
          height={782}
          loading="lazy"
        />
        {s.howItWasBuilt.phases.map((phase, i) => (
          <div key={i}>
            <H3>{`${phase.title} — ${phase.subtitle}`}</H3>
            <StepList items={phase.items.map(item => ({
              label: item.label,
              detail: item.detail,
            }))} />
          </div>
        ))}

        {/* ================================================================ */}
        {/*  RAG                                                             */}
        {/* ================================================================ */}
        <H2 id="rag">{s.rag.heading}</H2>

        <H3>{s.rag.whyAgentic.heading}</H3>
        <Prose>{s.rag.whyAgentic.body}</Prose>

        <H3>{s.rag.hybridSearch.heading}</H3>
        <Prose>{s.rag.hybridSearch.body}</Prose>

        <H3>{s.rag.reranking.heading}</H3>
        <Prose>{s.rag.reranking.body}</Prose>

        <H3>{s.rag.gracefulDegradation.heading}</H3>
        <StepList items={s.rag.gracefulDegradation.steps.map(s => ({
          label: s.label,
          detail: s.detail,
        }))} />
        <Callout>{s.rag.callout}</Callout>
        <Callout className="bg-accent/10 border-accent/40">{s.rag.recursivityCallout}</Callout>
        <Prose>{s.rag.indexedArticles}</Prose>

        {/* ================================================================ */}
        {/*  DEFENSE                                                         */}
        {/* ================================================================ */}
        <H2 id="defense">{s.defense.heading}</H2>
        <CardStack items={s.defense.layers.map(l => ({
          title: l.title,
          detail: l.detail,
        }))} />
        <a href={s.defense.linkedInPostUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
          <Callout className="bg-accent/10 border-accent/40 hover:border-accent/60 transition-colors cursor-pointer">{s.defense.linkedInCallout}</Callout>
        </a>
        <Callout>{s.defense.callout}</Callout>

        {/* ================================================================ */}
        {/*  EVALS                                                           */}
        {/* ================================================================ */}
        <H2 id="evals">{s.evals.heading}</H2>
        <MetricsGrid items={s.evals.metricsItems.map(m => ({
          value: m.value,
          label: m.label,
        }))} columns={4} compact />

        <H3>{s.evals.tableHeading}</H3>
        <DataTable
          headers={[...s.evals.table.headers]}
          rows={s.evals.table.rows.map(r => [...r])}
        />

        <H3>{s.evals.assertionTypes.heading}</H3>
        <Prose>{s.evals.assertionTypes.body}</Prose>

        {/* ================================================================ */}
        {/*  CLOSED LOOP                                                     */}
        {/* ================================================================ */}
        <H2 id="closed-loop">{s.closedLoop.heading}</H2>
        <Prose variant="hook">{s.closedLoop.hook}</Prose>

        <H3>{s.closedLoop.stagesHeading}</H3>
        <StepList items={s.closedLoop.stages.map(st => ({
          label: st.label,
          detail: st.detail,
        }))} />
        <Callout>{s.closedLoop.keyCallout}</Callout>

        <img
          src="/chatbot/diagram-closed-loop.webp"
          alt={lang === 'es' ? 'Closed-loop: Deploy → Score → Detect → Generate Test → CI Gate → Push → Deploy' : 'Closed-loop: Deploy → Score → Detect → Generate Test → CI Gate → Push → Deploy'}
          className="w-full rounded-xl my-8"
          width={1400}
          height={782}
          loading="lazy"
        />
        <Prose className="text-sm text-muted-foreground mt-2">{s.closedLoop.diagramCaption}</Prose>

        <H3>{s.closedLoop.promptVersioning.heading}</H3>
        <Prose>{s.closedLoop.promptVersioning.body}</Prose>

        {/* ================================================================ */}
        {/*  COST                                                            */}
        {/* ================================================================ */}
        <H2 id="cost">{s.cost.heading}</H2>
        <MetricsGrid items={s.cost.metricsItems} columns={4} />

        <H3>{s.cost.tableHeading}</H3>
        <DataTable
          headers={[...s.cost.table.headers]}
          rows={s.cost.table.rows.map(r => [...r])}
        />
        <Callout>{s.cost.callout}</Callout>

        {/* ================================================================ */}
        {/*  STACK                                                           */}
        {/* ================================================================ */}
        <H2 id="stack">{s.stack.heading}</H2>
        <StackGrid items={s.stack.items.map(item => ({
          icon: stackIcons[item.name] ?? <span className="w-8 h-8 flex items-center justify-center text-lg font-bold text-primary">{item.name[0]}</span>,
          name: item.name,
          desc: item.role,
        }))} />

        {/* ================================================================ */}
        {/*  LESSONS                                                         */}
        {/* ================================================================ */}
        <Callout className="bg-accent/10 border-accent/40">{s.lessons.saveTrigger}</Callout>
        <LessonsSection heading={s.lessons.heading} items={s.lessons.items} />

        {/* ================================================================ */}
        {/*  FAQ                                                             */}
        {/* ================================================================ */}
        <FaqSection heading={t.faq.heading} items={t.faq.items} />

        {/* ================================================================ */}
        {/*  CTA                                                             */}
        {/* ================================================================ */}
        <CaseStudyCta
          heading={t.cta.heading}
          body={t.cta.body}
          ctaLabel={t.cta.label}
          ctaHref="https://linkedin.com/in/santifer"
          external
          secondaryLabel={t.cta.labelSecondary}
          secondaryHref="mailto:hola@santifer.io"
        />
      </article>

      <ArticleFooter lang={lang} utmCampaign="self-healing-chatbot" />
    </ArticleLayout>
  )
}
