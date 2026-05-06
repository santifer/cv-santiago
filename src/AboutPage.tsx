import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, ExternalLink, Award, GraduationCap, Briefcase, ChevronRight, Clock, Newspaper, HelpCircle, Users } from 'lucide-react'
import { aboutContent, type AboutLang } from './about-i18n'

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/santifer' },
  { name: 'GitHub', url: 'https://github.com/santifer' },
  { name: 'YouTube', url: 'https://www.youtube.com/@santifer_io' },
  { name: 'X / Twitter', url: 'https://x.com/santifer' },
  { name: 'Dev.to', url: 'https://dev.to/santifer' },
  { name: 'Substack', url: 'https://santifer.substack.com' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/32541743' },
  { name: 'ORCID', url: 'https://orcid.org/0009-0006-2192-7210' },
  { name: 'Crunchbase', url: 'https://www.crunchbase.com/person/santiago-fernandez-de-valderrama' },
  { name: 'Wikidata', url: 'https://www.wikidata.org/wiki/Q138710224' },
]

export default function AboutPage({ lang = 'es' }: { lang?: AboutLang }) {
  const t = aboutContent[lang]
  const altSlug = t.altSlug

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.seo.title

    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc) }
    desc.content = t.seo.description

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = `https://santifer.io/${t.slug}`

    const hreflangs = [
      { lang: 'es', href: 'https://santifer.io/sobre-mi' },
      { lang: 'en', href: 'https://santifer.io/about' },
      { lang: 'x-default', href: 'https://santifer.io/sobre-mi' },
    ]
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove())
    for (const hl of hreflangs) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hl.lang
      link.href = hl.href
      document.head.appendChild(link)
    }

    // ProfilePage + FAQPage JSON-LD now SSR'd by prerender (scripts/prerender.tsx → buildAboutJsonLd).
    // No useEffect injection needed for SEO. SPA-navigated visits keep the prerendered HTML's
    // JSON-LD if user lands on /about first; otherwise the homepage's JSON-LD persists which is
    // acceptable since AI crawlers always do fresh fetches (they don't SPA-navigate).

    return () => {
      document.querySelectorAll('link[hreflang]').forEach(el => el.remove())
    }
  }, [lang, t])

  return (
    <div className="min-h-screen bg-background text-foreground bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <img
            src="/foto-avatar-sm.webp"
            srcSet="/foto-avatar-sm.webp 192w, /foto-avatar.webp 384w"
            sizes="96px"
            alt="Santiago Fernández de Valderrama"
            className="w-24 h-24 rounded-full border-2 border-border shadow-lg"
            width={96}
            height={96}
          />
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {t.heading}
            </h1>
            <p className="text-sm text-primary font-medium mb-2">{t.subtitle}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {t.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {t.lastUpdated}
              </span>
            </div>
          </div>
        </header>

        {/* Manifesto */}
        <blockquote cite="https://santifer.io/career-ops" className="mb-10 border-l-4 border-primary pl-6 pr-4 py-3 text-xl md:text-2xl italic font-display leading-snug text-foreground/90">
          {t.manifesto}
        </blockquote>

        {/* Bio */}
        <section className="mb-10">
          {t.bio.map((paragraph, i) => (
            <p key={i} className="text-base text-muted-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Seeking — hidden when empty */}
        {t.seeking && t.roles.length > 0 && (
        <section className="mb-10 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm font-medium text-primary mb-2">{t.seeking}</p>
          <div className="flex flex-wrap gap-2">
            {t.roles.map((role) => (
              <span key={role} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {role}
              </span>
            ))}
          </div>
        </section>
        )}

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            {t.timelineHeading}
          </h2>
          <div className="space-y-3">
            {t.timeline.map((item) => (
              <div key={item.period} className="flex gap-4 p-3 rounded-lg bg-card border border-border">
                <span className="text-xs font-mono text-primary whitespace-nowrap pt-0.5">{item.period}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.role}</p>
                  <p className="text-xs text-muted-foreground">{item.company} — {item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            {t.projectsHeading}
          </h2>
          <div className="space-y-2">
            {t.projects.map((project) => (
              <Link
                key={project.name}
                to={project.href}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div>
                  <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{project.name}</p>
                  <p className="text-xs text-muted-foreground">{project.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            {t.certificationsHeading}
          </h2>
          <div className="space-y-3">
            {t.certifications.map((cert) => (
              <div key={cert.org} className="p-3 rounded-lg bg-card border border-border">
                <p className="font-medium text-foreground text-sm mb-1">{cert.org}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.items.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded text-xs bg-muted/30 text-muted-foreground">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            {t.educationHeading}
          </h2>
          <ul className="space-y-1.5">
            {t.education.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">{item}</li>
            ))}
          </ul>
        </section>

        {/* Press */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-primary" />
            {t.pressHeading}
          </h2>
          {t.press.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
            >
              <div>
                <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.publisher} · {item.date}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </a>
          ))}
        </section>

        {/* Community */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            {t.communityHeading}
          </h2>
          <div className="space-y-2">
            {t.community.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div>
                  <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.platform}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            {t.faqHeading}
          </h2>
          <div className="space-y-4">
            {t.faq.map((item) => (
              <div key={item.q} className="p-4 rounded-lg bg-card border border-border">
                <p className="font-medium text-foreground text-sm mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary" />
            {t.connectHeading}
          </h2>

          <a
            href={`mailto:${t.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors mb-4"
          >
            <Mail className="w-4 h-4" />
            {t.email}
          </a>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                {link.name}
              </a>
            ))}
          </div>
        </section>

        {/* Language toggle */}
        <div className="text-center pt-6 border-t border-border">
          <Link
            to={`/${altSlug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {lang === 'es' ? 'Read in English →' : 'Leer en Español →'}
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Santiago Fernández de Valderrama. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </footer>
      </main>
    </div>
  )
}
