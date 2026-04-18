import { StrictMode, lazy, Suspense, useState, useEffect, useRef, Component, type ReactNode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Link, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Globe,
  Briefcase,
  Mail,
  ExternalLink,
  ChevronRight,
  Zap,
  Star,
  GitFork,
  MessageSquare,
  Search,
  Bot,
  Layout,
  Database,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  Repeat,
  RefreshCcw,
  ShieldCheck,
  Cpu,
  BarChart3,
  Network,
  Calendar,
  Percent,
  Package,
  UserCheck,
  Timer,
  FileText,
  Image,
  TrendingUp,
  GitBranch,
  Github,
  GraduationCap,
  FolderGit2
} from 'lucide-react'

import './index.css'
import { translations } from './i18n'
import GlobalNav from './GlobalNav'

// UI Components
const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const AnimatedSection = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

const BeamPill = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 overflow-hidden group">
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:animate-beam" />
  </span>
)

const StorySection = ({ t }: { t: any }) => {
  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-6 border border-accent/20">
                <Sparkles className="w-3.5 h-3.5" />
                {t.summary.title}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t.summary.p1} <span className="text-primary">{t.summary.p1Highlight}</span> {t.summary.p1End}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
                {t.story.hookParagraphs.map((paras: string[], i: number) => (
                  <p key={i}>
                    {paras.map((text, j) => {
                      if (text.startsWith('*') && text.endsWith('*')) return <strong key={j} className="text-foreground">{text.slice(1, -1)}</strong>
                      if (text.startsWith('+') && text.endsWith('+')) return <span key={j} className="text-primary font-medium">{text.slice(1, -1)}</span>
                      return text
                    })}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              {t.summary.cards.map((card: any, i: number) => (
                <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                  <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group">
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const App = ({ lang = 'en' }: { lang?: 'zh' | 'en' }) => {
  const t = translations[lang]
  const [hydrated, setHydrated] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    setHydrated(true)
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % t.greetingRoles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [t.greetingRoles.length])

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      <GlobalNav />

      {/* Hero */}
      <header className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl aspect-square bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] aspect-square bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.05)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative w-32 h-32 md:w-48 md:h-48 shrink-0"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full border-2 border-border overflow-hidden bg-muted p-1">
                <img src="/foto-avatar.png" alt="Yifan Xue" className="w-full h-full rounded-full object-cover" />
              </div>
            </motion.div>

            {/* Title & Roles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-left flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                {t.location}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-4">
                {lang === 'zh' ? '我是' : "I'm"} <span className="text-primary">Yifan Xue</span>
                <br />
                <span className="text-muted-foreground">{t.greeting}</span>
                <br />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-foreground"
                  >
                    {t.greetingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {t.pillLabels.map((label) => (
                  <span key={label} className="px-4 py-2 rounded-full border border-border bg-muted/50 text-sm font-medium">
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <StorySection t={t} />

      {/* Experience */}
      <section id="experience" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-12 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              {t.experience.title}
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {/* Sagent */}
            <AnimatedSection delay={0.1}>
              <div className="relative pl-8 md:pl-12 border-l-2 border-border pb-12">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{t.experience.sagent.company}</h3>
                    <p className="text-primary font-medium">{t.experience.sagent.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{t.experience.sagent.period}</p>
                    <p className="text-xs text-muted-foreground">{t.experience.sagent.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{t.experience.sagent.desc}</p>
                <ul className="space-y-2">
                  {t.experience.sagent.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Walmart */}
            <AnimatedSection delay={0.2}>
              <div className="relative pl-8 md:pl-12 border-l-2 border-border pb-4">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-border ring-4 ring-background" />
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{t.experience.walmart.company}</h3>
                    <p className="text-primary font-medium">{t.experience.walmart.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{t.experience.walmart.period}</p>
                    <p className="text-xs text-muted-foreground">{t.experience.walmart.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{t.experience.walmart.desc}</p>
                <ul className="space-y-2">
                  {t.experience.walmart.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects section hidden
      <section id="projects" className="py-16 md:py-24">
        ...
      </section>
      */}

      {/* Education */}
      <section id="education" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-12 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              {t.education.title}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {t.education.items.map((edu: any, i: number) => (
              <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                <div className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <GraduationCap className="w-24 h-24" />
                  </div>
                  <p className="text-sm font-mono text-primary font-bold mb-2">{edu.year}</p>
                  <h3 className="text-lg font-bold mb-1">{edu.title}</h3>
                  <p className="font-medium text-foreground/80 mb-2">{edu.org}</p>
                  <p className="text-sm text-muted-foreground">{edu.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-12 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              {t.techStack.title}
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.techStack.categories.map((cat: any, i: number) => (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="p-6 rounded-2xl bg-card border border-border h-full">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item: string) => (
                      <span key={item} className="px-3 py-1 rounded-lg bg-muted text-sm font-medium text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 md:py-24 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-4">
              {lang === 'zh' ? '对合作感兴趣吗？' : 'Interested in working together?'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {lang === 'zh' ? '我一直对新的机会和有趣的项目持开放态度。' : "I'm always open to new opportunities and interesting projects."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`mailto:${t.email}`} className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all flex items-center gap-2">
                <Mail className="w-5 h-5" /> {lang === 'zh' ? '打个招呼' : 'Say Hello'}
              </a>
              <a href="https://linkedin.com/in/xueyifan" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border border-border font-bold hover:bg-muted transition-all flex items-center gap-2">
                <LinkedInLogo className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </AnimatedSection>
          <p className="mt-20 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Yifan Xue. {lang === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
