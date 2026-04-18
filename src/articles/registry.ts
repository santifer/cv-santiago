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
  slugs: { zh: string; en: string }
  titles: { zh: string; en: string }
  seo: { zh: ArticleSeo; en: ArticleSeo }
  sectionLabels: { zh: Record<string, string>; en: Record<string, string> }
  type: 'collab' | 'case-study' | 'bridge'
  /** Absolute OG image URL for prerender (social cards: LinkedIn, Twitter) */
  ogImage?: string
  /** Hero image path for JSON-LD / GEO (what AI search engines see). Falls back to ogImage if not set. */
  heroImage?: string
  component: () => Promise<{ default: ComponentType<{ lang: 'zh' | 'en' }> }>
  /** x-default hreflang slug (defaults to ZH slug) */
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
    id: 'self-healing-chatbot',
    slugs: { zh: 'zi-yu-liao-tian-ji-qi-ren', en: 'self-healing-chatbot' },
    titles: { zh: '自愈聊天机器人', en: 'The Self-Healing Chatbot' },
    seo: {
      zh: {
        title: '自愈聊天机器人：从组件到生产级 LLMOps',
        description: '案例研究：我如何将一个 50 行的聊天机器人演进为具有代理 RAG、6 层防御、71 个评估和自动闭环的 LLMOps 系统。',
      },
      en: {
        title: 'The Self-Healing Chatbot: From Widget to Production LLMOps',
        description: 'Case study: production LLMOps with agentic observability, 6-layer defense, 71 evals, voice mode, and a closed-loop that generates tests from real failures.',
      },
    },
    sectionLabels: {
      zh: {
        'genesis': '起源',
        'evolution': '演进',
        'architecture': '架构',
        'how-it-was-built': '构建过程',
        'rag': '代理 RAG',
        'defense': '防御',
        'agentic-observability': '代理可观测性',
        'evals': '71 个测试',
        'closed-loop': '闭环系统',
        'cost': '真实成本',
        'voice': '语音模式',
        'lessons': '经验教训',
        'faq': '常见问题',
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
    ogImage: 'https://xueyifan.io/chatbot/og-self-healing-chatbot.webp',
    heroImage: 'https://xueyifan.io/chatbot/hero-self-healing-chatbot.webp',
    component: () => import('../SelfHealingChatbot.tsx'),
    seoMeta: {
      datePublished: '2026-03-11',
      dateModified: '2026-03-14',
      keywords: ['LLMOps', 'self-healing chatbot', 'agentic RAG', 'jailbreak defense', 'prompt injection', 'LLM evaluation', 'closed loop LLM', 'Langfuse', 'prompt versioning', 'adversarial testing', 'trace-to-eval', 'hybrid search pgvector', 'AI portfolio', 'chatbot evals', 'CI gate LLM', 'voice mode chatbot', 'OpenAI Realtime API', 'speech-to-speech AI', 'agentic observability', 'developer feedback loop', 'AI maintaining AI'],
      articleType: 'TechArticle',
      articleTags: 'LLMOps,self-healing chatbot,agentic RAG,jailbreak defense,Langfuse,evals,closed-loop,prompt injection',
      images: ['https://xueyifan.io/chatbot/og-self-healing-chatbot.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'Langfuse', url: 'https://langfuse.com', applicationCategory: 'LLM Observability' },
        { '@type': 'SoftwareApplication', name: 'Supabase', url: 'https://supabase.com', applicationCategory: 'Database' },
        { '@type': 'Thing', name: 'LLMOps' },
        { '@type': 'Thing', name: 'Retrieval-Augmented Generation' },
      ],
      extra: { proficiencyLevel: 'Expert', dependencies: 'Claude, Langfuse, Supabase, Vercel, OpenAI, Resend, GitHub Actions' },
      citation: [
        { '@type': 'WebPage', name: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { '@type': 'TechArticle', name: 'Anthropic Tool Use Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
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
    slugs: { zh: 'career-ops', en: 'career-ops-system' },
    titles: { zh: 'Career-Ops', en: 'Career-Ops' },
    seo: {
      zh: {
        title: 'Career-Ops：自动化我求职过程的 AI 智能体',
        description: '案例研究：一个能从 10 个维度评估职位、根据职位生成个性化简历并自动化申请流程的多智能体系统。已有 631 次评估。',
      },
      en: {
        title: 'Career-Ops: How I Built My Own AI Job Search Tool',
        description: 'Case study: AI job search tool built as a multi-agent system. AI resume builder, 10D scoring, automated job application with HITL. 631 evaluations.',
      },
    },
    sectionLabels: {
      zh: {
        'the-problem': '遇到的问题',
        'architecture': '多智能体系统',
        'scoring': '10维评分',
        'pipeline': '业务流程',
        'pdf': 'AI 简历构建器',
        'before-after': '对比',
        'results': '成果',
        'lessons': '经验教训',
        'faq': '常见问题',
        'related': '相关内容',
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
    ogImage: 'https://xueyifan.io/career-ops/og-career-ops.webp',
    heroImage: 'https://xueyifan.io/career-ops/hero-career-ops.webp',
    component: () => import('../CareerOps.tsx'),
    seoMeta: {
      datePublished: '2026-03-17',
      dateModified: '2026-04-17',
      keywords: ['ai job search', 'ai job search tool', 'ai powered job search', 'ai resume builder', 'ai resume', 'multi agent system', 'multi agent orchestration', 'automated job application', 'ATS-optimized resume', 'Claude Code', 'batch processing', 'HITL', 'job search automation', 'career-ops', 'ai auto apply', 'agente ia', 'crear cv con ia', 'automatizacion con ia', 'sistema multiagente', 'busqueda de empleo ia'],
      articleType: 'TechArticle',
      articleTags: 'multi-agent,job search,Claude Code,ATS,batch processing,HITL,automation,Playwright',
      images: ['https://xueyifan.io/career-ops/og-career-ops.webp'],
      about: [
        { '@type': 'SoftwareApplication', name: 'Claude Code', url: 'https://claude.ai', applicationCategory: 'AI Agent' },
        { '@type': 'SoftwareApplication', name: 'Playwright', url: 'https://playwright.dev', applicationCategory: 'Browser Automation' },
        { '@type': 'Thing', name: 'Multi-Agent Orchestration' },
        { '@type': 'Thing', name: 'Job Search Automation' },
      ],
      extra: { proficiencyLevel: 'Expert', dependencies: 'Claude Code, Playwright, Puppeteer, Node.js, tmux' },
      citation: [
        { '@type': 'WebPage', name: 'Anthropic Claude Code Documentation', url: 'https://docs.anthropic.com/en/docs/claude-code' },
        { '@type': 'WebPage', name: 'Playwright Browser Automation Documentation', url: 'https://playwright.dev/docs/intro' },
      ],
      mentions: [
        { '@type': 'SoftwareSourceCode', name: 'career-ops', url: 'https://github.com/xueyifan/career-ops', codeRepository: 'https://github.com/xueyifan/career-ops', programmingLanguage: ['TypeScript', 'Go'], license: 'https://opensource.org/licenses/MIT', sameAs: 'https://www.wikidata.org/wiki/Q139007988', discussionUrl: 'https://discord.gg/8pRpHETxa4', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' } },
        { '@type': 'SoftwareApplication', name: 'Claude Code', url: 'https://claude.ai' },
        { '@type': 'SoftwareApplication', name: 'Playwright', url: 'https://playwright.dev' },
        { '@type': 'SoftwareApplication', name: 'Puppeteer', url: 'https://pptr.dev' },
        { '@type': 'SoftwareApplication', name: 'Node.js', url: 'https://nodejs.org' },
      ],
      discussionUrl: 'https://www.reddit.com/r/SideProject/comments/1rw1lg4/i_automated_my_job_search_with_ai_agents_516/',
      relatedLink: 'https://dev.to/xueyifan/i-built-a-multi-agent-job-search-system-with-claude-code-631-evaluations-12-modes-2cd0',
      communityUrl: 'https://discord.gg/8pRpHETxa4',
    },
  },
]

// Derived maps for GlobalNav and routing
export function getAltPaths(): Record<string, string> {
  const map: Record<string, string> = {
    '/': '/zh',
    '/zh': '/',
    '/guanyu': '/about',
    '/about': '/guanyu',
    '/yinsi': '/privacy',
    '/privacy': '/yinsi',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.zh}`] = `/${article.slugs.en}`
    map[`/${article.slugs.en}`] = `/${article.slugs.zh}`
  }
  return map
}

export function getPageTitles(): Record<string, string> {
  const map: Record<string, string> = {
    '/': "Yifan Xue's Portfolio",
    '/zh': '薛一凡的作品集',
    '/guanyu': '关于我',
    '/about': 'About',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.zh}`] = article.titles.zh
    map[`/${article.slugs.en}`] = article.titles.en
  }
  return map
}

export function getSectionLabels(): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {}
  for (const article of articleRegistry) {
    map[`/${article.slugs.zh}`] = article.sectionLabels.zh
    map[`/${article.slugs.en}`] = article.sectionLabels.en
  }
  return map
}

/** All ZH slugs (for lang detection: if pathname matches a ZH slug → lang is 'zh') */
export function getZhSlugs(): Set<string> {
  const slugs = new Set<string>(['/zh', '/yinsi', '/guanyu'])
  for (const article of articleRegistry) {
    slugs.add(`/${article.slugs.zh}`)
  }
  return slugs
}
