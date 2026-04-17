export type AboutLang = 'es' | 'en'

const content = {
  slug: 'about',
  altSlug: 'about',
  seo: {
    title: 'Vijay Panwar | Senior Product Manager · AI/ML Product Leader',
    description: 'Senior Product Manager with 8+ years scaling consumer & business platforms to millions of users. Expert in 0-to-1 product development, AI/ML products, and payment systems.',
  },
  heading: 'Vijay Panwar',
  subtitle: 'Senior Product Manager · AI/ML Product Leader · Payments & Fintech',
  location: 'Mumbai, India',
  lastUpdated: 'April 2026',
  bio: [
    'Product leader with 8+ years scaling consumer-facing and business-facing platforms to millions of users. Expert in 0-to-1 product development and growth optimization, with a proven track record of driving user engagement through data-driven experimentation.',
    'Specialized in building AI/ML-powered products and cross-platform experiences in high-growth environments. Currently architecting an AI-powered payment infrastructure-as-a-service at Zrika, and previously led UPI Lite strategy at NPCI (BHIM) — the world\'s largest digital payment ecosystem with 350M+ users.',
    'Certified in AI/ML (Purdue University) and passionate about applying agentic AI systems, LLM infrastructure, and responsible AI to real-world product challenges.',
  ],
  seeking: 'Open to opportunities in',
  roles: ['AI Product Management', 'Fintech & Payments', 'Platform Scaling'],
  timelineHeading: 'Experience',
  timeline: [
    { period: 'Dec 2024–Now', role: 'Senior Product Manager', company: 'Zrika (NexNebula Technologies)', desc: 'AI-powered payment infrastructure-as-a-service' },
    { period: 'Dec 2023–Nov 2024', role: 'Senior PM, BHIM', company: 'NPCI', desc: 'UPI Lite — world\'s largest digital payment ecosystem' },
    { period: 'Feb 2022–Sep 2023', role: 'Product Manager, CICO', company: 'Rapipay Fintech', desc: 'Merchant acquisition, lending APIs, fraud detection' },
    { period: 'Apr 2019–Jan 2022', role: 'Co-Founder & Head of Product', company: 'Burgon Technologies', desc: 'Martech platform for Tier 4-5 markets' },
    { period: 'Feb 2015–Oct 2018', role: 'Deputy Manager', company: 'ICICI Bank Ltd', desc: 'Customer activation and onboarding optimization' },
  ],
  projectsHeading: 'Projects',
  projects: [
    { name: 'Local RAG System', desc: 'Document Q&A with LLMs, vector embeddings & semantic search', href: 'https://github.com/Voldy75/localRAG' },
    { name: 'Data Dashboard On-the-Go', desc: 'Auto-generates one-pager critical metrics report from uploaded data', href: 'https://github.com/Voldy75/insight-compass-reports' },
    { name: 'Create, Shop & Crave', desc: 'AI-powered food assistant with personalized recipes & grocery ordering', href: 'https://create-shop-crave.vercel.app' },
  ],
  certificationsHeading: 'Certifications',
  certifications: [
    { org: 'Anthropic', items: ['Claude Code in Action'] },
    { org: 'Product School', items: ['Product Analytics Certification (PAC)', 'Product-Led Growth (PLG) Certification'] },
    { org: 'Google', items: ['Prompt Design in Vertex AI'] },
    { org: 'Hugging Face', items: ['Agents Course'] },
    { org: 'McKinsey & Company', items: ['McKinsey.org Forward Program'] },
    { org: 'IBM / Coursera', items: ['Python for Data Science', 'Agile with Atlassian Jira'] },
  ],
  educationHeading: 'Education',
  education: [
    'Purdue University — Post Graduate Program in Artificial Intelligence & Machine Learning',
    'Manipal University — Post Graduate Diploma in Banking | 2014–15 | GPA: 7.28/10',
    'Amity University Rajasthan — Bachelor of Technology | 2008–12 | GPA: 6.96/10',
  ],
  pressHeading: 'Press',
  press: [] as { title: string; publisher: string; date: string; href: string }[],
  communityHeading: 'Community',
  community: [
    { title: 'Local RAG System for internal productivity', platform: 'GitHub', href: 'https://github.com/Voldy75/localRAG' },
    { title: 'Create, Shop & Crave — AI food assistant', platform: 'Vercel', href: 'https://create-shop-crave.vercel.app' },
  ],
  faqHeading: 'Frequently Asked Questions',
  faq: [
    {
      q: 'Who is Vijay Panwar?',
      a: 'Vijay Panwar is a Senior Product Manager with 8+ years of experience scaling consumer-facing and business-facing platforms to millions of users. Based in Mumbai, India, he specializes in AI/ML-powered products, payment infrastructure, and 0-to-1 product development. He currently leads product at Zrika (NexNebula Technologies), architecting an AI-powered payment infrastructure-as-a-service. Previously, he led UPI Lite strategy at NPCI (BHIM), the world\'s largest digital payment ecosystem with 350M+ users, achieving 4x adoption growth.',
    },
    {
      q: "What are Vijay's key achievements?",
      a: 'At NPCI, Vijay drove a 4x adoption growth for UPI Lite, scaled infrastructure to 400K+ daily transactions with 99.9% uptime, and achieved 30% DAU increase through product optimizations. At Rapipay, he automated merchant onboarding activating 600+ users/day and reducing onboarding time by 60%. He also built AI copilots with RAG architecture and led the development of an enterprise-grade UPI payment switch with sub-50ms latency at Zrika.',
    },
    {
      q: "What are Vijay's technical skills?",
      a: 'Vijay combines strong product instincts with technical fluency. He works with AI/ML systems including RAG pipelines, LLM infrastructure, agentic AI, multi-agent orchestration, and LLM observability (LangSmith). He is proficient in Python (Pandas, NumPy, Scikit-learn, PyTorch), SQL, FastAPI, Supabase, and GitHub. He uses product tools like Mixpanel, JIRA, Confluence, Figma, and Notion. In payments, he has deep expertise in UPI, digital wallets, payment gateways, and PCI-DSS compliance.',
    },
    {
      q: 'How can I contact Vijay?',
      a: 'You can reach Vijay at vijaypanwar333@gmail.com. Connect on LinkedIn at linkedin.com/in/vijay-panwar-835bb13a, or explore his projects on GitHub at github.com/Voldy75.',
    },
  ],
  connectHeading: 'Connect',
  email: 'vijaypanwar333@gmail.com',
}

export const aboutContent = {
  es: content,
  en: content,
} as const
