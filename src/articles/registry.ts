import type { ComponentType } from 'react'

export interface ArticleSeo {
  title: string
  description: string
}

export interface ArticleSeoMeta {
  datePublished: string
  dateModified: string
  keywords: string[]
  articleType: 'Article' | 'TechArticle'
  articleTags: string
  images: string[]
  about: Array<Record<string, string>>
  extra?: Record<string, string>
  citation?: Array<{ '@type': string; name: string; url: string }>
  isBasedOn?: Record<string, unknown>
  mentions?: Array<Record<string, string | string[] | Record<string, string>>>
  discussionUrl?: string
  relatedLink?: string
  communityUrl?: string
  video?: Record<string, unknown>
  subjectOf?: Record<string, unknown>
}

export interface ArticleConfig {
  id: string
  slugs: { es: string; en: string }
  titles: { es: string; en: string }
  seo: { es: ArticleSeo; en: ArticleSeo }
  sectionLabels: { es: Record<string, string>; en: Record<string, string> }
  type: 'collab' | 'case-study' | 'bridge'
  /** Absolute OG image URL for prerender (social cards: LinkedIn, Twitter) */
  ogImage?: string
  /** Hero image path for JSON-LD / GEO (what AI search engines see). Falls back to ogImage if not set. */
  heroImage?: string
  component: () => Promise<{ default: ComponentType<{ lang: 'es' | 'en' }> }>
  /** x-default hreflang slug (defaults to ES slug) */
  xDefaultSlug?: string
  /** Whether this article is ready for RAG indexing (default: false) */
  ragReady?: boolean
  /** Path to i18n content file relative to project root (required when ragReady=true) */
  i18nFile?: string
  /** SEO metadata for prerender JSON-LD + article meta tags */
  seoMeta?: ArticleSeoMeta
}

export const articleRegistry: ArticleConfig[] = [
  {
    id: 'n8n-for-pms',
    slugs: { es: 'n8n-para-pms', en: 'n8n-for-pms' },
    titles: { es: 'n8n para PMs', en: 'n8n for PMs' },
    seo: {
      es: {
        title: 'n8n para PMs: Cheat Sheet + Templates IA Gratis | santifer.io',
        description: 'Cheat sheet de n8n para Product Managers: automatiza sprint reports y clasifica feedback con IA. 2 templates importables gratis. Tutorial paso a paso.',
      },
      en: {
        title: 'n8n for PMs: Cheat Sheet + Free AI Templates | santifer.io',
        description: 'n8n cheat sheet for Product Managers: automate sprint reports and classify feedback with AI. 2 free importable workflow templates. Step-by-step tutorial.',
      },
    },
    sectionLabels: {
      es: {
        'time-sinks': 'Tareas que Roban Tiempo',
        'workflow-1': 'Workflow 1',
        'workflow-2': 'Workflow 2',
        'the-pattern': 'El Patrón',
        'get-started': 'Empieza',
        'lessons': 'Lecciones',
        'faq': 'FAQ',
        'import': 'Importar',
        'resources': 'Recursos',
      },
      en: {
        'time-sinks': 'Time Sinks',
        'workflow-1': 'Workflow 1',
        'workflow-2': 'Workflow 2',
        'the-pattern': 'The Pattern',
        'get-started': 'Get Started',
        'lessons': 'Lessons',
        'faq': 'FAQ',
        'import': 'Import',
        'resources': 'Resources',
      },
    },
    type: 'collab',
    ragReady: true,
    i18nFile: 'src/n8n-i18n.ts',
    ogImage: 'https://santifer.io/workflows/n8n-ai-feedback-classification-workflow.webp',
    heroImage: 'https://santifer.io/workflows/n8n-sprint-report-automation-workflow.webp',
    component: () => import('../N8nForPMs.tsx'),
    seoMeta: {
      datePublished: '2026-02-24',
      dateModified: '2026-03-06',
      keywords: ['n8n', 'n8n tutorial', 'n8n templates', 'n8n AI', 'n8n workflow', 'n8n automation', 'n8n cheat sheet', 'product manager', 'AI workflow automation', 'sprint report automation', 'feedback classification AI', 'no-code automation', 'n8n for product managers', 'workflow templates free'],
      articleType: 'TechArticle',
      articleTags: 'n8n,product manager,automation,AI,workflow,no-code',
      images: ['https://santifer.io/workflows/n8n-sprint-report-automation-workflow.webp', 'https://santifer.io/workflows/n8n-ai-feedback-classification-workflow.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io', applicationCategory: 'Workflow Automation' },
        { '@type': 'Thing', name: 'Product Management Automation' },
      ],
      extra: { proficiencyLevel: 'Beginner', dependencies: 'n8n Cloud (free tier), Airtable, Slack' },
      isBasedOn: {
        '@type': 'Course',
        name: 'Masterclass: n8n for PMs',
        provider: { '@type': 'Organization', name: 'AI Product Academy', url: 'https://maven.com/marily-nika' },
        instructor: { '@type': 'Person', name: 'Dr. Marily Nika', sameAs: 'https://www.wikidata.org/wiki/Q107463356', jobTitle: 'Gen AI Product Lead', worksFor: { '@type': 'Organization', name: 'Google' } },
        url: 'https://maven.com/p/52fc7d/masterclass-n8n-for-p-ms',
      },
      citation: [
        { '@type': 'WebPage', name: 'Asana Anatomy of Work Index 2025', url: 'https://asana.com/work-index' },
        { '@type': 'WebPage', name: 'n8n Documentation', url: 'https://docs.n8n.io' },
      ],
      mentions: [
        { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io' },
        { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com' },
      ],
      video: {
        '@type': 'VideoObject',
        name: 'Masterclass: n8n for PMs — Lightning Session',
        description: 'Live 60-minute session teaching Product Managers how to automate workflows with n8n and AI. 201 students enrolled.',
        contentUrl: 'https://maven.com/p/52fc7d/masterclass-n8n-for-p-ms',
        uploadDate: '2026-03-10',
        duration: 'PT60M',
        performer: { '@id': 'https://santifer.io/#person' },
        publisher: { '@type': 'Organization', name: 'AI Product Academy', url: 'https://maven.com/marily-nika' },
      },
      subjectOf: {
        '@type': 'EducationEvent',
        name: 'Masterclass: n8n for PMs',
        description: 'Lightning session on workflow automation for Product Managers with n8n and AI.',
        startDate: '2026-03-10',
        location: { '@type': 'VirtualLocation', url: 'https://maven.com/p/52fc7d/masterclass-n8n-for-p-ms' },
        organizer: { '@type': 'Organization', name: 'AI Product Academy', url: 'https://maven.com/marily-nika', founder: { '@type': 'Person', name: 'Dr. Marily Nika', sameAs: 'https://www.wikidata.org/wiki/Q107463356' } },
        performer: { '@id': 'https://santifer.io/#person' },
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
      },
    },
  },
  {
    id: 'jacobo',
    slugs: { es: 'agente-ia-jacobo', en: 'ai-agent-jacobo' },
    titles: { es: 'Agente IA Jacobo', en: 'AI Agent Jacobo' },
    seo: {
      es: {
        title: 'Jacobo: Agente IA Omnicanal — 90% Autoservicio',
        description: 'Case study: agente IA omnicanal con sub-agentes, tool calling y orquestación multi-modelo (n8n + ElevenLabs). 90% autoservicio.',
      },
      en: {
        title: 'Jacobo: Multi-Agent AI — 90% Self-Service',
        description: 'Case study: omnichannel AI agent with sub-agents, tool calling & multi-model orchestration (n8n + ElevenLabs). 90% self-service.',
      },
    },
    sectionLabels: {
      es: {
        'the-problem': 'El Problema',
        'architecture': 'Arquitectura',
        'e2e-flows': 'Flujos E2E',
        'main-router': 'Los Dos Cerebros',
        'natural-language-booking': 'Deep Dive: Citas',
        'deep-dive-quotes': 'Deep Dive: Presupuestos',
        'deep-dive-others': 'Deep Dive: Tools',
        'results': 'Resultados',
        'decisions': 'ADRs',
        'platform-evolution': 'Evolución',
        'what-id-do-differently': 'Lecciones',
        'enterprise-patterns': 'Patrones',
        'run-it-yourself': 'Workflows',
        'faq': 'FAQ',
        'resources': 'Recursos',
      },
      en: {
        'the-problem': 'The Problem',
        'architecture': 'Architecture',
        'e2e-flows': 'E2E Flows',
        'main-router': 'The Two Brains',
        'natural-language-booking': 'Deep Dive: Booking',
        'deep-dive-quotes': 'Deep Dive: Quotes',
        'deep-dive-others': 'Deep Dive: Tools',
        'results': 'Results',
        'decisions': 'ADRs',
        'platform-evolution': 'Evolution',
        'what-id-do-differently': 'Lessons',
        'enterprise-patterns': 'Patterns',
        'run-it-yourself': 'Workflows',
        'faq': 'FAQ',
        'resources': 'Resources',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/jacobo-i18n.ts',
    ogImage: 'https://santifer.io/jacobo/og-jacobo-agent.webp',
    heroImage: 'https://santifer.io/jacobo/santiago-headphones-thinking.webp',
    component: () => import('../JacoboAgent.tsx'),
    seoMeta: {
      datePublished: '2026-02-25',
      dateModified: '2026-03-07',
      keywords: ['multi-agent AI', 'multi agent orchestration', 'AI agent', 'sub-agent architecture', 'tool calling production', 'n8n workflows', 'n8n ai agent', 'ai agent case study', 'customer service AI', 'WhatsApp AI agent', 'ElevenLabs voice agent', 'voice AI', 'HITL', 'human in the loop', 'ia para pymes', 'agente ia whatsapp', 'multi-model orchestration', 'OpenRouter', 'FDE portfolio', 'solutions architect AI', 'AI production manager', 'enterprise AI patterns', 'voice AI platform', 'conversational AI case study', 'agentic workflows'],
      articleType: 'TechArticle',
      articleTags: 'AI agent,multi-agent,n8n,ElevenLabs,HITL,tool calling,WhatsApp,voice AI',
      images: ['https://santifer.io/jacobo/og-jacobo-agent.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io', applicationCategory: 'Workflow Automation' },
        { '@type': 'SoftwareApplication', name: 'ElevenLabs', url: 'https://elevenlabs.io', applicationCategory: 'Voice AI' },
        { '@type': 'Thing', name: 'Multi-Agent Orchestration' },
        { '@type': 'Thing', name: 'AI Customer Service' },
      ],
      extra: { proficiencyLevel: 'Expert', dependencies: 'n8n, OpenRouter, ElevenLabs, WATI, Airtable, Aircall, YouCanBookMe' },
      citation: [
        { '@type': 'WebPage', name: 'n8n Documentation', url: 'https://docs.n8n.io' },
        { '@type': 'WebPage', name: 'ElevenLabs Voice AI Documentation', url: 'https://elevenlabs.io/docs' },
        { '@type': 'WebPage', name: 'OpenRouter API Documentation', url: 'https://openrouter.ai/docs' },
      ],
      mentions: [
        { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io' },
        { '@type': 'SoftwareApplication', name: 'ElevenLabs', url: 'https://elevenlabs.io' },
        { '@type': 'SoftwareApplication', name: 'OpenRouter', url: 'https://openrouter.ai' },
        { '@type': 'SoftwareApplication', name: 'WATI', url: 'https://www.wati.io' },
        { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com' },
      ],
      discussionUrl: 'https://www.reddit.com/r/n8n/comments/1sc3i30/i_built_a_whatsapp_voice_ai_agent_in_n8n_that/',
    },
  },
  {
    id: 'business-os',
    slugs: { es: 'business-os-para-airtable', en: 'business-os-for-airtable' },
    titles: { es: 'Business OS', en: 'Business OS' },
    seo: {
      es: {
        title: 'Business OS Custom: Airtable + n8n — 170h/Mes',
        description: 'Case study: Business OS custom con 12 bases Airtable, 2100 campos y n8n que ahorra 170h/mes en reparación de móviles.',
      },
      en: {
        title: 'Custom Business OS: Airtable + n8n — 170h/Mo',
        description: 'Case study: custom Business OS with 12 Airtable bases, 2100 fields, and n8n saving 170h/month at a phone repair business.',
      },
    },
    sectionLabels: {
      es: {
        'why-custom': '¿Por Qué Custom?',
        'overview': 'Vista General',
        'e2e-flows': 'Flujos E2E',
        'cross-cutting': 'Transversales',
        'day-in-life': 'Un Día',
        'before-after': 'Antes/Después',
        'impact': 'Impacto',
        'decisions': 'ADRs',
        'platform-evolution': 'Evolución',
        'lessons': 'Lecciones',
        'replicability': 'Patrones',
        'faq': 'FAQ',
        'resources': 'Recursos',
      },
      en: {
        'why-custom': 'Why Custom?',
        'overview': 'Overview',
        'e2e-flows': 'E2E Flows',
        'cross-cutting': 'Cross-Cutting',
        'day-in-life': 'A Day',
        'before-after': 'Before/After',
        'impact': 'Impact',
        'decisions': 'ADRs',
        'platform-evolution': 'Evolution',
        'lessons': 'Lessons',
        'replicability': 'Patterns',
        'faq': 'FAQ',
        'resources': 'Resources',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/business-os-i18n.ts',
    ogImage: 'https://santifer.io/business-os/og-business-os.webp',
    heroImage: 'https://santifer.io/business-os/web-landing-hero.webp',
    component: () => import('../BusinessOS.tsx'),
    seoMeta: {
      datePublished: '2026-02-25',
      dateModified: '2026-03-06',
      keywords: ['Business OS', 'Airtable ERP', 'Airtable as ERP', 'no-code ERP', 'Airtable automation', 'CRM gamification', 'phone repair', 'inventory management', 'custom ERP case study', 'repair shop management', 'programmatic SEO', 'Airtable CRM', 'single source of truth', 'business operating system', 'multi-base architecture'],
      articleType: 'TechArticle',
      articleTags: 'Business OS,Airtable,n8n,ERP,CRM,automation,phone repair',
      images: ['https://santifer.io/business-os/og-business-os.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com', applicationCategory: 'Database Platform' },
        { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io', applicationCategory: 'Workflow Automation' },
        { '@type': 'Thing', name: 'Enterprise Resource Planning' },
        { '@type': 'Thing', name: 'Business Process Automation' },
      ],
      extra: { proficiencyLevel: 'Advanced', dependencies: 'Airtable Pro, n8n, YouCanBookMe, WATI (WhatsApp API), DataForSEO' },
      citation: [
        { '@type': 'WebPage', name: 'Airtable Enterprise Platform', url: 'https://airtable.com/platform' },
        { '@type': 'TechArticle', name: 'Airtable Web API Reference', url: 'https://airtable.com/developers/web/api/introduction' },
        { '@type': 'TechArticle', name: 'n8n Documentation', url: 'https://docs.n8n.io' },
        { '@type': 'TechArticle', name: 'Anthropic Claude API Documentation', url: 'https://docs.anthropic.com' },
        { '@type': 'WebPage', name: 'Make.com Automation Platform', url: 'https://www.make.com' },
      ],
      mentions: [
        { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com' },
        { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io' },
      ],
    },
  },
  {
    id: 'programmatic-seo',
    slugs: { es: 'seo-programatico', en: 'programmatic-seo' },
    titles: { es: 'SEO Programático', en: 'Programmatic SEO' },
    seo: {
      es: {
        title: 'SEO Programático: 4.000+ Páginas desde un ERP | santifer.io',
        description: 'Case study: cómo generé 4.730 landing pages estáticas con Airtable, DataForSEO y crawl budget optimization. 2M+ impresiones, 19K+ clicks.',
      },
      en: {
        title: 'Programmatic SEO: 4,000+ Pages from an ERP | santifer.io',
        description: 'Case study: 4,730 static landing pages from Airtable as headless CMS with DataForSEO crawl budget optimization and Astro SSG. 2M+ impressions, 19K+ clicks.',
      },
    },
    sectionLabels: {
      es: {
        'opportunity': 'La Oportunidad',
        'the-numbers': 'Los Números',
        'two-strategies': 'Dos Estrategias',
        'architecture': 'La Arquitectura',
        'url-taxonomy': 'Taxonomía URLs',
        'cms-deep-dive': 'El CMS',
        'page-anatomy': 'Anatomía de Página',
        'decision-engine': 'Motor de Decisión',
        'crawl-budget': 'Crawl Budget',
        'pipeline': 'Pipeline',
        'content-automation': 'Automatización',
        'image-pipeline': 'Pipeline de Imágenes',
        'reviews-pipeline': 'Pipeline de Reseñas',
        'before-after-pipeline': 'Pipeline Antes/Después',
        'growth': 'Crecimiento',
        'results': 'Resultados',
        'starting-point': 'El Punto de Partida',
        'stack': 'Stack',
        'lessons': 'Lecciones',
        'faq': 'FAQ',
        'resources': 'Recursos',
      },
      en: {
        'opportunity': 'The Opportunity',
        'the-numbers': 'The Numbers',
        'two-strategies': 'Two Strategies',
        'architecture': 'The Architecture',
        'url-taxonomy': 'URL Taxonomy',
        'cms-deep-dive': 'The CMS',
        'page-anatomy': 'Page Anatomy',
        'decision-engine': 'Decision Engine',
        'crawl-budget': 'Crawl Budget',
        'pipeline': 'Pipeline',
        'content-automation': 'Automation',
        'image-pipeline': 'Image Pipeline',
        'reviews-pipeline': 'Reviews Pipeline',
        'before-after-pipeline': 'Before/After Pipeline',
        'growth': 'Growth',
        'results': 'Results',
        'starting-point': 'The Starting Point',
        'stack': 'Stack',
        'lessons': 'Lessons',
        'faq': 'FAQ',
        'resources': 'Resources',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/pseo-i18n.ts',
    ogImage: 'https://santifer.io/pseo/og-programmatic-seo.webp',
    heroImage: 'https://santifer.io/pseo/ss-repair-page-hero.webp',
    component: () => import('../ProgrammaticSeo.tsx'),
    seoMeta: {
      datePublished: '2026-02-25',
      dateModified: '2026-03-10',
      keywords: ['programmatic SEO', 'Airtable', 'headless CMS', 'Astro', 'DataForSEO', 'crawl budget', 'phone repair', 'static site generation', 'local SEO', 'ERP'],
      articleType: 'TechArticle',
      articleTags: 'programmatic SEO,Airtable,Astro,DataForSEO,crawl budget,phone repair,ERP,local SEO',
      images: ['https://santifer.io/pseo/og-programmatic-seo.png'],
      about: [
        { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com', applicationCategory: 'Database Platform' },
        { '@type': 'SoftwareApplication', name: 'Astro', url: 'https://astro.build', applicationCategory: 'Static Site Generator' },
        { '@type': 'SoftwareApplication', name: 'DataForSEO', url: 'https://dataforseo.com', applicationCategory: 'SEO Data API' },
      ],
      extra: { proficiencyLevel: 'Intermediate', dependencies: 'Airtable, Astro, DataForSEO API, Node.js' },
      citation: [
        { '@type': 'WebPage', name: 'Google Search Central: Crawl Budget', url: 'https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget' },
        { '@type': 'TechArticle', name: 'DataForSEO API Documentation', url: 'https://docs.dataforseo.com' },
        { '@type': 'TechArticle', name: 'Astro Content Collections', url: 'https://docs.astro.build/en/guides/content-collections/' },
        { '@type': 'WebPage', name: 'Google Search Central: Programmatic Content', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' },
        { '@type': 'TechArticle', name: 'Airtable Web API Reference', url: 'https://airtable.com/developers/web/api/introduction' },
      ],
      mentions: [
        { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com' },
        { '@type': 'SoftwareApplication', name: 'Astro', url: 'https://astro.build' },
        { '@type': 'SoftwareApplication', name: 'DataForSEO', url: 'https://dataforseo.com' },
      ],
    },
  },
  {
    id: 'self-healing-chatbot',
    slugs: { es: 'chatbot-que-se-cura-solo', en: 'self-healing-chatbot' },
    titles: { es: 'El Chatbot Que Se Cura Solo', en: 'The Self-Healing Chatbot' },
    seo: {
      es: {
        title: 'El Chatbot Que Se Cura Solo: De Widget a LLMOps en Producción',
        description: 'Case study: cómo evolucioné un chatbot de 50 líneas a un sistema LLMOps con RAG agéntico, defensa de jailbreak en 6 capas, 71 evals y closed-loop automático.',
      },
      en: {
        title: 'The Self-Healing Chatbot: From Widget to Production LLMOps',
        description: 'Case study: production LLMOps with agentic observability, 6-layer defense, 71 evals, voice mode, and a closed-loop that generates tests from real failures.',
      },
    },
    sectionLabels: {
      es: {
        'genesis': 'La Génesis',
        'evolution': 'La Evolución',
        'architecture': 'Arquitectura',
        'how-it-was-built': 'Cómo Se Construyó',
        'rag': 'RAG Agéntico',
        'defense': 'Defensa',
        'agentic-observability': 'Observabilidad Agéntica',
        'evals': 'Los 71 Tests',
        'closed-loop': 'El Loop Cerrado',
        'cost': 'Coste Real',
        'voice': 'Modo Voz',
        'lessons': 'Lecciones',
        'faq': 'FAQ',
      },
      en: {
        'genesis': 'The Genesis',
        'evolution': 'The Evolution',
        'architecture': 'Architecture',
        'how-it-was-built': 'How It Was Built',
        'rag': 'Agentic RAG',
        'defense': 'Defense',
        'agentic-observability': 'Agentic Observability',
        'evals': 'The 71 Tests',
        'closed-loop': 'The Closed Loop',
        'cost': 'Real Cost',
        'voice': 'Voice Mode',
        'lessons': 'Lessons',
        'faq': 'FAQ',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/chatbot-i18n.ts',
    ogImage: 'https://santifer.io/chatbot/og-self-healing-chatbot.webp',
    heroImage: 'https://santifer.io/chatbot/hero-self-healing-chatbot.webp',
    component: () => import('../SelfHealingChatbot.tsx'),
    seoMeta: {
      datePublished: '2026-03-11',
      dateModified: '2026-03-14',
      keywords: ['LLMOps', 'self-healing chatbot', 'agentic RAG', 'jailbreak defense', 'prompt injection', 'LLM evaluation', 'closed loop LLM', 'Langfuse', 'prompt versioning', 'adversarial testing', 'trace-to-eval', 'hybrid search pgvector', 'AI portfolio', 'chatbot evals', 'CI gate LLM', 'voice mode chatbot', 'OpenAI Realtime API', 'speech-to-speech AI', 'agentic observability', 'developer feedback loop', 'AI maintaining AI'],
      articleType: 'TechArticle',
      articleTags: 'LLMOps,self-healing chatbot,agentic RAG,jailbreak defense,Langfuse,evals,closed-loop,prompt injection',
      images: ['https://santifer.io/chatbot/og-self-healing-chatbot.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'Langfuse', url: 'https://langfuse.com', applicationCategory: 'LLM Observability' },
        { '@type': 'SoftwareApplication', name: 'Supabase', url: 'https://supabase.com', applicationCategory: 'Database' },
        { '@type': 'Thing', name: 'LLMOps' },
        { '@type': 'Thing', name: 'Retrieval-Augmented Generation' },
      ],
      extra: { proficiencyLevel: 'Expert', dependencies: 'Claude, Langfuse, Supabase, Vercel, OpenAI, Resend, GitHub Actions' },
      citation: [
        { '@type': 'SocialMediaPosting', name: 'Han hackeado a mi chatbot — LinkedIn post (300+ reactions)', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7421984735024816128/' },
        { '@type': 'WebPage', name: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { '@type': 'TechArticle', name: 'Anthropic Tool Use Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
        { '@type': 'TechArticle', name: 'Langfuse — Open Source LLM Engineering Platform', url: 'https://langfuse.com/docs' },
        { '@type': 'TechArticle', name: 'Supabase pgvector — Vector Embeddings Documentation', url: 'https://supabase.com/docs/guides/ai/vector-embeddings' },
        { '@type': 'TechArticle', name: 'Anthropic — Defending Against Prompt Injection', url: 'https://www.anthropic.com/news/prompt-injections' },
        { '@type': 'WebPage', name: 'Prompt Injection (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Prompt_injection' },
      ],
      mentions: [
        { '@type': 'SoftwareApplication', name: 'Langfuse', url: 'https://langfuse.com' },
        { '@type': 'SoftwareApplication', name: 'Supabase', url: 'https://supabase.com' },
        { '@type': 'SoftwareApplication', name: 'OpenAI Realtime API', url: 'https://platform.openai.com' },
        { '@type': 'SoftwareApplication', name: 'Claude Code', url: 'https://claude.ai' },
        { '@type': 'SoftwareApplication', name: 'Vercel', url: 'https://vercel.com' },
      ],
    },
  },
  {
    id: 'career-ops',
    slugs: { es: 'career-ops', en: 'career-ops-system' },
    titles: { es: 'Career-Ops', en: 'Career-Ops' },
    seo: {
      es: {
        title: 'Career-Ops: Agente IA que Automatiza Mi Búsqueda de Empleo',
        description: 'Case study: agente IA multi-agente que evalúa ofertas en 10 dimensiones, crea CV con IA personalizados por oferta y automatiza aplicaciones. 631 evaluaciones.',
      },
      en: {
        title: 'Career-Ops: How I Built My Own AI Job Search Tool',
        description: 'Case study: AI job search tool built as a multi-agent system. AI resume builder, 10D scoring, automated job application with HITL. 631 evaluations.',
      },
    },
    sectionLabels: {
      es: {
        'the-problem': 'El Problema',
        'architecture': 'Multi-Agent System',
        'scoring': 'Scoring 10D',
        'pipeline': 'El Pipeline',
        'pdf': 'AI Resume Builder',
        'before-after': 'Antes/Después',
        'results': 'Resultados',
        'lessons': 'Lecciones',
        'faq': 'FAQ',
        'related': 'Relacionados',
      },
      en: {
        'the-problem': 'The Problem',
        'architecture': 'Multi-Agent System',
        'scoring': '10D Scoring',
        'pipeline': 'The Pipeline',
        'pdf': 'AI Resume Builder',
        'before-after': 'Before/After',
        'results': 'Results',
        'lessons': 'Lessons',
        'faq': 'FAQ',
        'related': 'Related',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/career-ops-i18n.ts',
    ogImage: 'https://santifer.io/career-ops/og-career-ops.webp',
    heroImage: 'https://santifer.io/career-ops/hero-career-ops.webp',
    component: () => import('../CareerOps.tsx'),
    seoMeta: {
      datePublished: '2026-03-17',
      dateModified: '2026-04-17',
      keywords: ['ai job search', 'ai job search tool', 'ai powered job search', 'ai resume builder', 'ai resume', 'multi agent system', 'multi agent orchestration', 'automated job application', 'ATS-optimized resume', 'Claude Code', 'batch processing', 'HITL', 'job search automation', 'career-ops', 'ai auto apply', 'agente ia', 'crear cv con ia', 'automatizacion con ia', 'sistema multiagente', 'busqueda de empleo ia'],
      articleType: 'TechArticle',
      articleTags: 'multi-agent,job search,Claude Code,ATS,batch processing,HITL,automation,Playwright',
      images: ['https://santifer.io/career-ops/og-career-ops.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'Claude Code', url: 'https://claude.ai', applicationCategory: 'AI Agent' },
        { '@type': 'SoftwareApplication', name: 'Playwright', url: 'https://playwright.dev', applicationCategory: 'Browser Automation' },
        { '@type': 'Thing', name: 'Multi-Agent Orchestration' },
        { '@type': 'Thing', name: 'Job Search Automation' },
      ],
      extra: { proficiencyLevel: 'Expert', dependencies: 'Claude Code, Playwright, Puppeteer, Node.js, tmux' },
      citation: [
        { '@type': 'NewsArticle', name: 'I built a tool to filter 700 listings for my job search. It got me a position as head of AI. — Business Insider', url: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4' },
        { '@type': 'NewsArticle', name: 'Mein KI-Tool scannt 700 Job-Anzeigen — so half es mir, Karriere zu machen — Business Insider Deutschland', url: 'https://www.businessinsider.de/karriere/bewerbung/mein-ki-tool-scannt-700-job-anzeigen-so-half-es-mir-karriere-zu-machen/' },
        { '@type': 'VideoObject', name: 'Building Career-Ops to Automate the Job Hunt — Create OS Lounge with Santifer', url: 'https://www.youtube.com/watch?v=pDkAe5JbREk' },
        { '@type': 'WebPage', name: 'Anthropic Claude Code Documentation', url: 'https://docs.anthropic.com/en/docs/claude-code' },
        { '@type': 'WebPage', name: 'Playwright Browser Automation Documentation', url: 'https://playwright.dev/docs/intro' },
        { '@type': 'DiscussionForumPosting', name: 'I built an AI job search system with Claude Code — r/ClaudeAI (2600+ upvotes)', url: 'https://www.reddit.com/r/ClaudeAI/comments/1sd2f37/i_built_an_ai_job_search_system_with_claude_code/' },
        { '@type': 'BlogPosting', name: 'Career-Ops : emploi automatisé par IA — Claude Code (HDVMA.fr)', url: 'https://hdvma.fr/career-ops-recherche-emploi-automatisee-claude-code-agents-ia-2026-2/' },
        { '@type': 'BlogPosting', name: 'Comment créer un agent IA ? — Romain Delfosse', url: 'https://www.romaindelfosse.fr/blog/comment-creer-agent-ia/' },
        { '@type': 'BlogPosting', name: 'santifer/career-ops — Claude Code, Playwright, Chromium (CSDN)', url: 'https://blog.csdn.net/Dontla/article/details/159930707' },
        { '@type': 'WebPage', name: 'GitHub Trending Weekly 2026-04-08 — Shareuhack', url: 'https://www.shareuhack.com/en/posts/github-trending-weekly-2026-04-08' },
        { '@type': 'WebPage', name: 'Career-Ops — AI Job Search CLI Tool (EveryDev.ai)', url: 'https://www.everydev.ai/tools/career-ops' },
        { '@type': 'WebPage', name: 'HN Top Links — Popular Stories from Hacker News', url: 'http://hntoplinks.com/week?page=216&sort=upvotes' },
        { '@type': 'TechArticle', name: 'Anthropic Claude Code — Agentic Coding', url: 'https://www.anthropic.com/claude-code' },
        { '@type': 'WebPage', name: 'Multi-agent system (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Multi-agent_system' },
        { '@type': 'TechArticle', name: 'Anthropic Building Effective Agents (engineering guide)', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      ],
      mentions: [
        { '@type': 'SoftwareSourceCode', name: 'career-ops', url: 'https://career-ops.org', codeRepository: 'https://github.com/santifer/career-ops', programmingLanguage: ['TypeScript', 'Go'], license: 'https://opensource.org/licenses/MIT', sameAs: ['https://career-ops.org', 'https://github.com/santifer/career-ops', 'https://www.wikidata.org/wiki/Q139007988'], discussionUrl: 'https://discord.gg/8pRpHETxa4', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' } },
        { '@type': 'SoftwareApplication', name: 'Claude Code', url: 'https://claude.ai' },
        { '@type': 'SoftwareApplication', name: 'Playwright', url: 'https://playwright.dev' },
        { '@type': 'SoftwareApplication', name: 'Puppeteer', url: 'https://pptr.dev' },
        { '@type': 'SoftwareApplication', name: 'Node.js', url: 'https://nodejs.org' },
      ],
      discussionUrl: 'https://www.reddit.com/r/SideProject/comments/1rw1lg4/i_automated_my_job_search_with_ai_agents_516/',
      relatedLink: 'https://dev.to/santifer/i-built-a-multi-agent-job-search-system-with-claude-code-631-evaluations-12-modes-2cd0',
      communityUrl: 'https://discord.gg/8pRpHETxa4',
    },
  },
  {
    id: 'santifer-irepair',
    slugs: { es: 'santifer-irepair', en: 'santifer-irepair-founder' },
    titles: { es: 'Santifer iRepair', en: 'Santifer iRepair' },
    seo: {
      es: {
        title: 'Santifer iRepair Sevilla | Reparación de Móviles desde 2009',
        description: 'La tienda de reparación de móviles fundada por Santiago en 2009 sigue abierta en Sevilla. 30.000+ reparaciones. Encuentra la tienda o conoce al fundador.',
      },
      en: {
        title: 'Santifer iRepair Seville | Phone Repair since 2009',
        description: 'The phone repair shop founded by Santiago in 2009 is still open in Seville, Spain. 30,000+ repairs. Find the shop or meet the founder.',
      },
    },
    sectionLabels: { es: {}, en: {} },
    type: 'bridge',
    component: () => import('../SantiferIRepair.tsx'),
    xDefaultSlug: 'santifer-irepair',
  },
]

// Derived maps for GlobalNav and routing
export function getAltPaths(): Record<string, string> {
  const map: Record<string, string> = {
    '/': '/en',
    '/en': '/',
    '/sobre-mi': '/about',
    '/about': '/sobre-mi',
    '/privacidad': '/privacy',
    '/privacy': '/privacidad',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.es}`] = `/${article.slugs.en}`
    map[`/${article.slugs.en}`] = `/${article.slugs.es}`
  }
  return map
}

export function getPageTitles(): Record<string, string> {
  const map: Record<string, string> = {
    '/': 'Portfolio de Santiago',
    '/en': "Santiago's Portfolio",
    '/sobre-mi': 'Sobre Mí',
    '/about': 'About',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.es}`] = article.titles.es
    map[`/${article.slugs.en}`] = article.titles.en
  }
  return map
}

export function getSectionLabels(): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {}
  for (const article of articleRegistry) {
    map[`/${article.slugs.es}`] = article.sectionLabels.es
    map[`/${article.slugs.en}`] = article.sectionLabels.en
  }
  return map
}

/** All ES slugs (for lang detection: if pathname matches an ES slug → lang is 'es') */
export function getEsSlugs(): Set<string> {
  const slugs = new Set<string>(['/', '/privacidad', '/sobre-mi'])
  for (const article of articleRegistry) {
    slugs.add(`/${article.slugs.es}`)
  }
  return slugs
}
