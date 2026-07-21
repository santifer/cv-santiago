import { Link } from 'react-router-dom'
import { type StoryLang as Lang, storyContent } from './story-i18n'
import { buildJsonLdFromRegistry } from './articles/json-ld'
import { useArticleSeo } from './articles/use-article-seo'
import {
  ArticleLayout,
  ArticleHeader,
  ArticleFooter,
  FaqSection,
  CaseStudyCta,
  MetricsGrid,
} from './articles/components'
import { H2, Prose, Callout, FloatingToc } from './articles/content-types'

function buildJsonLd(lang: Lang) {
  return buildJsonLdFromRegistry('story', lang, storyContent[lang])
}

/** Inline prose link segment: {pre}<a>{label}</a>{post} — internal (Link) or external (a) */
function ProseLink({ seg }: { seg: { pre: string; label: string; href: string; post: string } }) {
  const external = seg.href.startsWith('http')
  return (
    <Prose>
      {seg.pre}
      {external ? (
        <a href={seg.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{seg.label}</a>
      ) : (
        <Link to={seg.href} className="text-primary hover:underline">{seg.label}</Link>
      )}
      {seg.post}
    </Prose>
  )
}

export default function Story({ lang = 'en' }: { lang?: Lang }) {
  const t = storyContent[lang]

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    image: 'https://santifer.io/story/og-story.png',
    publishedTime: '2026-07-21',
    modifiedTime: '2026-07-21',
    articleTags: 'career-ops,open source,job search,founder story,building in public',
    jsonLd: buildJsonLd(lang),
    xDefaultSlug: 'historia',
  })

  const s = t.sections

  // Funnel congelado (HISTORIC) — etiquetas canónicas evaluadas/solicitudes/entrevistas/oferta
  const funnel = lang === 'es'
    ? [
        { value: '740', label: 'ofertas evaluadas' },
        { value: '68', label: 'solicitudes' },
        { value: '12', label: 'entrevistas' },
        { value: '1', label: 'oferta firmada' },
      ]
    : [
        { value: '740', label: 'listings evaluated' },
        { value: '68', label: 'applications' },
        { value: '12', label: 'interviews' },
        { value: '1', label: 'signed offer' },
      ]

  return (
    <ArticleLayout lang={lang}>
      <FloatingToc
        ctas={[{ href: '#cta-block', label: lang === 'es' ? 'Hablemos' : 'Talk to me', variant: 'anchor' }]}
      />
      <ArticleHeader
        lang={lang}
        kicker={t.header.kicker}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        dateISO="2026-07-21"
        readingTime={t.readingTime}
        authorName="Santiago Fernández de Valderrama Aparicio"
      />

      {/* Respuesta directa citable — primeras ~60 palabras bajo el H1 (doctrina §2) */}
      <Callout className="bg-accent/10 border-accent/40">{t.directAnswer}</Callout>

      <article className="prose-custom">
        <H2 id="sixteen-years">{s['sixteen-years'].heading}</H2>
        {s['sixteen-years'].paras.map((p, i) => <Prose key={i}>{p}</Prose>)}

        <H2 id="the-pipeline">{s['the-pipeline'].heading}</H2>
        <Prose>{s['the-pipeline'].paras[0]}</Prose>
        <MetricsGrid items={funnel} columns={4} compact />
        <Prose>{s['the-pipeline'].paras[1]}</Prose>
        <ProseLink seg={s['the-pipeline'].caseStudyLink} />

        <H2 id="open-source">{s['open-source'].heading}</H2>
        {s['open-source'].paras.map((p, i) => <Prose key={i}>{p}</Prose>)}

        <H2 id="the-reversal">{s['the-reversal'].heading}</H2>
        {s['the-reversal'].paras.map((p, i) => <Prose key={i}>{p}</Prose>)}
        <ProseLink seg={s['the-reversal'].manifestoLink} />

        <H2 id="today">{s.today.heading}</H2>
        {s.today.paras.map((p, i) => <Prose key={i}>{p}</Prose>)}
        <ProseLink seg={s.today.fleetLink} />

        <FaqSection heading={t.faq.heading} items={t.faq.items} />

        <div id="cta-block">
          <CaseStudyCta
            heading={t.cta.heading}
            body={t.cta.body}
            ctaLabel={t.cta.ctaLabel}
            ctaHref={t.cta.ctaHref}
            secondaryLabel={t.cta.secondaryLabel}
            secondaryHref={t.cta.secondaryHref}
          />
        </div>
      </article>

      <ArticleFooter lang={lang} utmCampaign="story" />
    </ArticleLayout>
  )
}
