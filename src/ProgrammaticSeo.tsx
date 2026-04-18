import { useState, useEffect, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { type N8nLang as Lang } from './n8n-i18n'
import { buildJsonLdFromRegistry } from './articles/json-ld'
import { useArticleSeo } from './articles/use-article-seo'
import {
  Database, Wrench, BarChart3, Zap,
  List, DollarSign, Clock, Camera, Star, Code,
  MapPin, Globe, Layers, Image,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import {
  AnchorHeading,
  ArticleLayout,
  ArticleHeader,
  ArticleFooter,
  FaqSection,
  ResourcesList,
  LessonsSection,
  MetricsGrid,
  CaseStudyCta,
} from './articles/components'
import {
  H3,
  Prose,
  Callout,
  BulletList,
  CardStack,
  CardGrid,
  StackGrid,
  Photo1,
  DiagramZoom,
  Photo2,
  Photo3,
  DataTable,
  StepList,
  DetailCard,
  FloatingToc,
  CodeBlock,
  ScreenshotGrid,
  ScreenshotCaption,
} from './articles/content-types'
import { pseoContent } from './pseo-i18n'

/* ------------------------------------------------------------------ */
/* Icon resolver — maps i18n icon strings to Lucide components         */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, ReactNode> = {
  'database': <Database className="w-5 h-5 text-primary" />,
  'wrench': <Wrench className="w-5 h-5 text-primary" />,
  'bar-chart': <BarChart3 className="w-5 h-5 text-primary" />,
  'zap': <Zap className="w-5 h-5 text-primary" />,
  'list': <List className="w-5 h-5 text-primary" />,
  'dollar-sign': <DollarSign className="w-5 h-5 text-primary" />,
  'clock': <Clock className="w-5 h-5 text-primary" />,
  'camera': <Camera className="w-5 h-5 text-primary" />,
  'star': <Star className="w-5 h-5 text-primary" />,
  'code': <Code className="w-5 h-5 text-primary" />,
  'image': <Image className="w-5 h-5 text-primary" />,
}

function resolveIcon(key: string): ReactNode {
  return ICON_MAP[key] ?? <Layers className="w-5 h-5 text-primary" />
}

/* ------------------------------------------------------------------ */
/* Stack icons — Simple Icons brand SVGs + Lucide fallbacks            */
/* ------------------------------------------------------------------ */
const stackIcons: Record<string, ReactNode> = {
  Astro: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#BC52EE"><path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z"/></svg>
  ),
  Airtable: (
    <svg viewBox="0 0 24 24" className="w-8 h-8"><path fill="#18BFFF" d="M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257z"/><path fill="#FCB400" d="M23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596z"/><path fill="#18BFFF" d="M.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z"/></svg>
  ),
  DataForSEO: (
    <img src="https://avatars.githubusercontent.com/u/29703714?s=200&v=4" alt="DataForSEO" width={200} height={200} className="w-8 h-8 rounded" />
  ),
  'ERP propio': (
    <Database className="w-8 h-8 text-[#F59E0B]" />
  ),
  'Custom ERP': (
    <Database className="w-8 h-8 text-[#F59E0B]" />
  ),
  Cloudflare: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F38020"><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>
  ),
  'JSON-LD': (
    <Code className="w-8 h-8 text-[#0B7886]" />
  ),
}

/* ------------------------------------------------------------------ */
/* Overlay hover — shows composite on hover to demo the pipeline      */
/* ------------------------------------------------------------------ */

const OVERLAY_HOVER: { overlay: string; hover: string; model: string }[] = [
  { overlay: 'pantalla.png', hover: 'hover-pantalla.webp', model: 'iPhone 14 Pro' },
  { overlay: 'bateria-tablet.png', hover: 'hover-bateria-ipad.webp', model: 'iPad Air 5' },
  { overlay: 'camara-trasera.png', hover: 'hover-camara-trasera.webp', model: 'Pixel 7a' },
  { overlay: 'puerto-carga.png', hover: 'hover-puerto-carga.webp', model: 'Huawei P30 Pro' },
  { overlay: 'tapa-trasera.png', hover: 'hover-tapa-trasera.webp', model: 'OnePlus 11' },
  { overlay: 'cristal-watch.png', hover: 'hover-cristal-watch.webp', model: 'Apple Watch Series 7' },
]

function OverlayCard({ overlay, hover, model, alt }: { overlay: string; hover: string; model: string; alt: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <figure
      className="bg-card border border-border rounded-lg overflow-hidden relative cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(h => !h)}
    >
      <div className="relative aspect-[3/2]">
        <img
          src={`/pseo/overlays/${overlay}`}
          alt={alt}
          width={384} height={256}
          className="absolute inset-0 w-full h-full object-contain bg-card transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
          loading="lazy"
          decoding="async"
        />
        <img
          src={`/pseo/overlays/${hover}`}
          alt={`${alt} — ${model}`}
          width={384} height={256}
          className="absolute inset-0 w-full h-full object-contain bg-card transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          decoding="async"
        />
      </div>
      <figcaption className="px-2 py-1.5 text-center border-t border-border">
        <span className={`text-xs transition-colors duration-200 ${hovered ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
          {hovered ? model : alt}
        </span>
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* ReviewCarousel — screenshot carousel of the real CRO reviews        */
/* ------------------------------------------------------------------ */

const CAROUSEL_SLIDES = [
  '/pseo/carousel-review-1.webp',
  '/pseo/carousel-review-2.webp',
  '/pseo/carousel-review-3.webp',
  '/pseo/carousel-review-4.webp',
  '/pseo/carousel-review-5.webp',
]

function ReviewCarousel({ alt }: { alt: string }) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = CAROUSEL_SLIDES.length

  const go = useCallback((dir: 1 | -1) => {
    setIdx(prev => (prev + dir + total) % total)
  }, [total])

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 9000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [go])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => go(1), 9000)
  }, [go])

  const prev = () => { go(-1); resetTimer() }
  const next = () => { go(1); resetTimer() }

  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { prev(); e.preventDefault() }
      if (e.key === 'ArrowRight') { next(); e.preventDefault() }
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  })

  const touchStartX = useRef(0)

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative my-6 outline-none group"
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 50) { dx > 0 ? prev() : next() }
      }}
    >
      {/* Screenshot */}
      <div className="rounded-xl overflow-hidden border border-border bg-card">
        <img
          src={CAROUSEL_SLIDES[idx]}
          alt={`${alt} ${idx + 1}/${total}`}
          width={1286} height={533}
          className="w-full h-auto"
          decoding="async"
        />
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 p-1.5 rounded-full bg-card/80 border border-border text-primary/60 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 p-1.5 rounded-full bg-card/80 border border-border text-primary/60 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Counter */}
      <p className="text-center text-xs text-muted-foreground mt-2">{idx + 1} / {total}</p>
    </div>
  )
}

function buildJsonLd(lang: Lang) {
  return buildJsonLdFromRegistry('programmatic-seo', lang, pseoContent[lang])
}

export default function ProgrammaticSeo({ lang = 'en' }: { lang?: Lang }) {
  const t = pseoContent[lang]

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    image: 'https://xueyifan.io/pseo/og-programmatic-seo.png',
    publishedTime: '2026-02-25',
    modifiedTime: '2026-03-10',
    articleTags: 'programmatic SEO,Airtable,Astro,DataForSEO,crawl budget,phone repair,ERP,local SEO',
    jsonLd: buildJsonLd(lang),
    xDefaultSlug: 'seo-programatico',
  })

  return (
    <ArticleLayout lang={lang}>
      <FloatingToc />
      <ArticleHeader
        editorId="hero-header"
        lang={lang}
        kicker={t.header.kicker}
        kickerLink={(t.header as any).kickerLink}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        readingTime={t.readingTime}
      />

      <article className="prose-custom">
        {/* Intro */}
        <Prose variant="hook">{t.intro.hook}</Prose>
        <Prose>{t.intro.body}</Prose>
        <Prose>{(t.intro as any).context}</Prose>

        {/* TL;DR ejecutivo */}
        <Callout>
          <span className="block font-semibold text-primary mb-2">{(t.intro as any).tldr.heading}</span>
          <ul className="space-y-1.5 list-none pl-0 m-0">
            {(t.intro as any).tldr.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="text-primary shrink-0 mt-0.5">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Callout>

        {/* The Opportunity */}
        <AnchorHeading id="opportunity">{t.sections.opportunity.heading}</AnchorHeading>
        <Prose>{t.sections.opportunity.body}</Prose>
        <BulletList items={t.sections.opportunity.points} />

        {/* Query examples */}
        <H3 id="query-examples">{lang === 'zh' ? '真实的 GSC 查询' : 'Real GSC queries'}</H3>
        <DataTable
          headers={['Query', 'Clicks', lang === 'zh' ? '展示' : '展示', 'CTR', 'Pos.']}
          rows={t.sections.opportunity.queryExamples.map(q => [
            q.query,
            String(q.clicks),
            q.impressions.toLocaleString(),
            q.ctr,
            q.position,
          ])}
          highlightColumn={3}
        />

        {/* The Numbers */}
        <AnchorHeading id="the-numbers">{t.sections.theNumbers.heading}</AnchorHeading>
        <MetricsGrid items={t.sections.theNumbers.metrics} columns={3} compact />
        <Callout>{(t.sections.theNumbers as any).timeline}</Callout>

        {/* Homepage screenshot */}
        <Photo1
          src="/pseo/ss-homepage.webp"
          alt={lang === 'zh' ? 'Homepage de xueyifanirepair.es' : 'xueyifanirepair.es homepage'}
          width={1406} height={1345}
          caption={lang === 'zh' ? 'xueyifanirepair.es: homepage generada con Astro SSG. Buscador de dispositivos, categorías y marcas.' : 'xueyifanirepair.es: homepage generated with Astro SSG. Device search, categories and brands.'}
        />

        {/* Two Strategies */}
        <AnchorHeading id="two-strategies">{t.sections.twoTypes.heading}</AnchorHeading>
        <Prose>{t.sections.twoTypes.body}</Prose>

        <CardGrid
          items={[t.sections.twoTypes.local, t.sections.twoTypes.national]}
          columns={2}
          className="mb-8"
          renderItem={(strategy) => (
            <DetailCard
              key={strategy.title}
              icon={strategy === t.sections.twoTypes.local ? <MapPin className="w-5 h-5 text-primary" /> : <Globe className="w-5 h-5 text-primary" />}
              title={strategy.title}
              description={strategy.description}
            >
              <div className="space-y-1.5 mt-3">
                {strategy.examples.map((ex) => (
                  <div key={ex.url} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground truncate mr-2">{ex.url}</span>
                    <span className="shrink-0 text-primary">{ex.clicks} clicks · {ex.ctr}</span>
                  </div>
                ))}
              </div>
            </DetailCard>
          )}
        />

        {/* Architecture */}
        <AnchorHeading id="architecture">{t.sections.architecture.heading}</AnchorHeading>
        <Prose>{t.sections.architecture.body}</Prose>

        <StackGrid
          items={t.sections.architecture.layers.map(layer => ({
            icon: resolveIcon(layer.icon),
            name: layer.name,
            desc: layer.desc,
          }))}
          columns={2}
          align="left"
        />

        {/* URL Taxonomy */}
        <AnchorHeading id="url-taxonomy">{t.sections.urlTaxonomy.heading}</AnchorHeading>
        <Prose>{t.sections.urlTaxonomy.body}</Prose>

        <CardStack
          items={t.sections.urlTaxonomy.patterns.map(p => ({
            title: <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{p.pattern}</code>,
            detail: <><span className="font-mono text-xs text-muted-foreground">{p.example}</span><span className="text-muted-foreground"> · {p.description}</span></>,
          }))}
        />

        {/* Premium Apple Routes */}
        <H3 id="apple-premium-routes">{(t.sections.urlTaxonomy as any).appleRoutes.heading}</H3>
        <Prose>{(t.sections.urlTaxonomy as any).appleRoutes.prose}</Prose>
        <CodeBlock segments={(t.sections.urlTaxonomy as any).appleRoutes.segments} highlight="code" />

        {/* CMS Deep Dive */}
        <AnchorHeading id="cms-deep-dive">{t.sections.cmsDeepDive.heading}</AnchorHeading>
        <Prose>{t.sections.cmsDeepDive.body}</Prose>

        <DataTable
          headers={[
            lang === 'zh' ? '表格' : 'Table',
            lang === 'zh' ? '用途' : 'Purpose',
            lang === 'zh' ? '关键字段' : 'Key Fields',
          ]}
          rows={t.sections.cmsDeepDive.tables.map(table => [
            table.name,
            table.purpose,
            table.keyFields,
          ])}
        />

        {/* Airtable taxonomy screenshot */}
        <DiagramZoom
          src="/pseo/ss-airtable-taxonomy.webp"
          hdSrc="/pseo/ss-airtable-taxonomy-hd.webp"
          alt={lang === 'zh' ? 'Jerarquía de tablas en Airtable — CMS del SEO programático' : 'Airtable table hierarchy — programmatic SEO CMS'}
          width={800} height={418} hdWidth={2512} hdHeight={1312}
          caption={lang === 'zh' ? 'Las 14 tablas del CMS conectadas al Business OS de 12 bases. Jerarquía de 6 niveles desde tipo de dispositivo hasta variante local.' : 'The 14 CMS tables connected to the 12-base Business OS. 6-level hierarchy from device type to local variant.'}
        />

        {/* Business OS interlink */}
        <Callout>
          <span dangerouslySetInnerHTML={{ __html: (t.sections.cmsDeepDive as any).businessOsCallout }} />
        </Callout>

        <H3 id="cms-highlights">{lang === 'zh' ? 'Patrones clave del CMS' : 'Key CMS patterns'}</H3>
        <CardStack
          items={t.sections.cmsDeepDive.highlights.map(h => ({
            title: h.title,
            detail: h.detail,
          }))}
        />

        {/* Category page screenshot */}
        <Photo1
          src="/pseo/ss-category-samsung.webp"
          alt={lang === 'zh' ? 'Página de categoría Samsung en xueyifanirepair.es' : 'Samsung category page on xueyifanirepair.es'}
          width={1440} height={900}
          caption={lang === 'zh' ? 'Página de categoría generada automáticamente. Cada marca tiene su landing con modelos, precios y reseñas.' : 'Auto-generated category page. Each brand gets its own landing with models, pricing, and reviews.'}
        />

        {/* Page Anatomy */}
        <AnchorHeading id="page-anatomy">{t.sections.pageAnatomy.heading}</AnchorHeading>
        <Prose>{t.sections.pageAnatomy.body}</Prose>

        <StackGrid
          items={t.sections.pageAnatomy.components.map(c => ({
            icon: resolveIcon(c.icon),
            name: c.name,
            desc: c.desc,
          }))}
          columns={2}
          align="left"
        />

        {/* Airtable repair fields */}
        <DiagramZoom
          src="/pseo/ss-airtable-repair-fields.webp"
          hdSrc="/pseo/ss-airtable-repair-fields-hd.webp"
          alt={lang === 'zh' ? 'Campos de una reparación en Airtable' : 'Repair record fields in Airtable'}
          width={800} height={418} hdWidth={2512} hdHeight={1312}
          caption={lang === 'zh' ? 'Cada reparación tiene ~60 campos: precios duales, flag indexable, specs del modelo que alimentan el copy dinámico.' : 'Each repair has ~60 fields: dual pricing, indexable flag, model specs that feed the dynamic copy.'}
        />

        {/* Repair page screenshot */}
        <Photo1
          src={t.sections.pageAnatomy.screenshot.src}
          alt={t.sections.pageAnatomy.screenshot.alt}
          width={1425} height={5277}
          caption={t.sections.pageAnatomy.screenshot.caption}
        />

        {/* Repair page hero screenshot */}
        <Photo1
          src="/pseo/ss-repair-page-hero.webp"
          alt={lang === 'zh' ? 'Hero de una página de reparación en xueyifanirepair.es' : 'Repair page hero on xueyifanirepair.es'}
          width={1440} height={900}
          caption={lang === 'zh' ? 'Hero de página de reparación: precio dual (original/compatible), CTA de cita, y breadcrumb semántico.' : 'Repair page hero: dual pricing (original/compatible), booking CTA, and semantic breadcrumb.'}
        />

        {/* Storytelling / Conversion flow */}
        <H3 id="page-storytelling">{t.sections.pageAnatomy.storytelling.heading}</H3>
        <Prose>{t.sections.pageAnatomy.storytelling.body}</Prose>
        <BulletList items={t.sections.pageAnatomy.storytelling.steps as unknown as string[]} />
        <Prose>{(t.sections.pageAnatomy.storytelling as any).example}</Prose>

        {/* Dynamic per-model copy */}
        <H3 id="dynamic-copy">{t.sections.pageAnatomy.dynamicCopy.heading}</H3>
        <Prose>{t.sections.pageAnatomy.dynamicCopy.body}</Prose>

        <DiagramZoom
          src={(t.sections.pageAnatomy.dynamicCopy as any).screenshotCopy.src}
          hdSrc={(t.sections.pageAnatomy.dynamicCopy as any).screenshotCopy.src.replace('.webp', '-hd.webp')}
          alt={(t.sections.pageAnatomy.dynamicCopy as any).screenshotCopy.alt}
          width={703} height={673} hdWidth={1406} hdHeight={1345}
          caption={(t.sections.pageAnatomy.dynamicCopy as any).screenshotCopy.caption}
        />

        {/* Live pricing from ERP */}
        <H3 id="erp-pricing">{(t.sections.pageAnatomy.dynamicCopy as any).pricingHeading}</H3>
        <Prose>{(t.sections.pageAnatomy.dynamicCopy as any).pricingProse}</Prose>

        <DiagramZoom
          src={(t.sections.pageAnatomy.dynamicCopy as any).screenshotPricing.src}
          hdSrc={(t.sections.pageAnatomy.dynamicCopy as any).screenshotPricing.src.replace('.webp', '-hd.webp')}
          alt={(t.sections.pageAnatomy.dynamicCopy as any).screenshotPricing.alt}
          width={703} height={673} hdWidth={1406} hdHeight={1345}
          caption={(t.sections.pageAnatomy.dynamicCopy as any).screenshotPricing.caption}
        />

        <CodeBlock segments={(t.sections.pageAnatomy.dynamicCopy as any).pricingSegments} highlight="code" />

        {/* Context-aware search */}
        <H3 id="context-search">{(t.sections.pageAnatomy as any).contextSearch.heading}</H3>
        <Prose>{(t.sections.pageAnatomy as any).contextSearch.body}</Prose>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <DiagramZoom
            src="/pseo/ss-buscador.webp"
            hdSrc="/pseo/ss-buscador-hd.webp"
            alt={lang === 'zh' ? 'Buscador en homepage: "12 pro" muestra resultados de todas las marcas' : 'Homepage search: "12 pro" shows results across all brands'}
            width={600} height={574} hdWidth={1406} hdHeight={1345}
            caption={lang === 'zh' ? 'Home: "12 pro" → Xiaomi, Apple, Xiaomi...' : 'Home: "12 pro" → Xiaomi, Apple, Xiaomi...'}
          />
          <DiagramZoom
            src="/pseo/ss-buscador-iphone.webp"
            hdSrc="/pseo/ss-buscador-iphone-hd.webp"
            alt={lang === 'zh' ? 'Buscador en página iPhone: "13" solo muestra modelos iPhone' : 'iPhone page search: "13" only shows iPhone models'}
            width={600} height={574} hdWidth={1406} hdHeight={1345}
            caption={lang === 'zh' ? 'Página iPhone: "13" → solo iPhones' : 'iPhone page: "13" → iPhones only'}
          />
        </div>
        <Prose>{(t.sections.pageAnatomy as any).contextSearch.detail}</Prose>
        <Prose>{(t.sections.pageAnatomy as any).contextSearch.codeProse}</Prose>
        <CodeBlock segments={(t.sections.pageAnatomy as any).contextSearch.codeSegments} highlight="code" />

        {/* Decision Engine */}
        <AnchorHeading id="decision-engine">{t.sections.decisionEngine.heading}</AnchorHeading>
        <Prose><span dangerouslySetInnerHTML={{ __html: t.sections.decisionEngine.body }} /></Prose>

        <StepList
          items={t.sections.decisionEngine.rules.map(rule => ({
            label: `${rule.condition} → ${rule.action}`,
            detail: rule.detail,
          }))}
        />
        <Callout>{t.sections.decisionEngine.stats}</Callout>

        {/* Airtable indexable field */}
        <DiagramZoom
          src="/pseo/ss-airtable-indexable.webp"
          hdSrc="/pseo/ss-airtable-indexable-hd.webp"
          alt={lang === 'zh' ? 'Campo indexable en Airtable alimentado por DataForSEO' : 'Indexable field in Airtable driven by DataForSEO'}
          width={800} height={418} hdWidth={2512} hdHeight={1312}
          caption={lang === 'zh' ? 'Motor de decisiones: DataForSEO alimenta el campo indexable. Sin volumen → noindex.' : 'Decision engine: DataForSEO feeds the indexable field. No volume → noindex.'}
        />

        {/* Crawl Budget Optimization */}
        <AnchorHeading id="crawl-budget">{t.sections.crawlBudget.heading}</AnchorHeading>
        <Prose>{t.sections.crawlBudget.body}</Prose>
        <CardStack
          items={t.sections.crawlBudget.strategies.map(s => ({
            title: s.title,
            detail: s.detail,
          }))}
        />

        {/* Safe Noindex Pattern */}
        <H3 id="safe-noindex">{(t.sections.crawlBudget as any).safeNoindex.heading}</H3>
        <Prose>{(t.sections.crawlBudget as any).safeNoindex.prose}</Prose>
        <CodeBlock segments={(t.sections.crawlBudget as any).safeNoindex.segments} highlight="code" />
        <Callout>{(t.sections.crawlBudget as any).safeNoindex.callout}</Callout>

        {/* Build Pipeline */}
        <AnchorHeading id="pipeline">{t.sections.pipeline.heading}</AnchorHeading>
        <Prose>{t.sections.pipeline.body}</Prose>

        <StepList
          items={t.sections.pipeline.steps.map(step => ({
            label: step.label,
            detail: step.desc,
          }))}
        />

        {/* Data Pipeline Code */}
        <H3 id="data-pipeline-code">{(t.sections.pipeline as any).dataPipeline.heading}</H3>
        <Prose>{(t.sections.pipeline as any).dataPipeline.prose}</Prose>
        <CodeBlock segments={(t.sections.pipeline as any).dataPipeline.segments} highlight="code" />

        {/* Review Cache Pattern */}
        <H3 id="review-cache-pattern">{(t.sections.pipeline as any).reviewCache.heading}</H3>
        <Prose>{(t.sections.pipeline as any).reviewCache.prose}</Prose>
        <CodeBlock segments={(t.sections.pipeline as any).reviewCache.segments} highlight="code" />

        {/* Content Automation Pipeline */}
        <AnchorHeading id="content-automation">{t.sections.contentAutomation.heading}</AnchorHeading>
        <Prose>{t.sections.contentAutomation.body}</Prose>

        <StackGrid
          items={t.sections.contentAutomation.pipelines.map((p: any) => ({
            icon: resolveIcon(p.icon),
            name: p.name,
            desc: p.desc,
          }))}
          columns={2}
          align="left"
        />

        {/* EXIF Injection Code */}
        <Prose>{(t.sections.contentAutomation as any).exifCode.prose}</Prose>
        <CodeBlock segments={(t.sections.contentAutomation as any).exifCode.segments} highlight="code" />

        {/* Airtable image pipeline */}
        <DiagramZoom
          src="/pseo/ss-airtable-image-pipeline.webp"
          hdSrc="/pseo/ss-airtable-image-pipeline-hd.webp"
          alt={lang === 'zh' ? 'Pipeline de imágenes en Airtable' : 'Image pipeline in Airtable'}
          width={800} height={418} hdWidth={2512} hdHeight={1312}
          caption={lang === 'zh' ? 'Pipeline de imágenes: 1 foto de GSM Arena → 18 composiciones automáticas con overlays de reparación. Todo sincronizado con el Business OS.' : 'Image pipeline: 1 GSM Arena photo → 18 auto-composited repair overlays. All synced with the Business OS.'}
        />

        {/* Content Cascade */}
        <H3 id="content-cascade">{(t.sections.contentAutomation as any).cascade.heading}</H3>
        <Prose>{(t.sections.contentAutomation as any).cascade.body}</Prose>
        <DataTable
          headers={[lang === 'zh' ? '页面' : 'Page', lang === 'zh' ? '层级' : 'Level']}
          rows={(t.sections.contentAutomation as any).cascade.example.map((e: any) => [
            e.page,
            e.label,
          ])}
          highlightColumn={0}
        />
        <Prose>{(t.sections.contentAutomation as any).cascade.detail}</Prose>

        <Callout>{t.sections.contentAutomation.stats}</Callout>
        <p className="text-sm mt-2" dangerouslySetInnerHTML={{ __html: (t.sections.contentAutomation as any).repoLink }} />

        {/* Image Pipeline Deep Dive */}
        <AnchorHeading id="image-pipeline">{t.sections.imagePipeline.heading}</AnchorHeading>
        <Prose>{t.sections.imagePipeline.intro}</Prose>

        {/* Overlay showcase with hover-to-composite */}
        <H3 id="overlay-templates">{t.sections.imagePipeline.overlayShowcase.heading}</H3>
        <Prose>{t.sections.imagePipeline.overlayShowcase.body}</Prose>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {OVERLAY_HOVER.map((item, i) => (
            <OverlayCard
              key={item.overlay}
              overlay={item.overlay}
              hover={item.hover}
              model={item.model}
              alt={lang === 'zh'
                ? t.sections.imagePipeline.overlayShowcase.items[i].altEs
                : t.sections.imagePipeline.overlayShowcase.items[i].altEn}
            />
          ))}
        </div>

        {/* Composition process */}
        <H3 id="composition-process">{t.sections.imagePipeline.compositionProcess.heading}</H3>
        <Prose>{t.sections.imagePipeline.compositionProcess.body}</Prose>
        <StepList
          items={t.sections.imagePipeline.compositionProcess.steps.map(step => ({
            label: step.label,
            detail: step.detail,
          }))}
        />

        {/* Code snippet */}
        <H3 id="sharp-code">{t.sections.imagePipeline.codeSnippet.heading}</H3>
        <Prose><span dangerouslySetInnerHTML={{ __html: t.sections.imagePipeline.codeSnippet.body }} /></Prose>
        <CodeBlock segments={t.sections.imagePipeline.codeSnippet.segments} highlight="code" />

        {/* 1 photo → 18 variants demo */}
        <H3 id="one-photo-demo">{t.sections.imagePipeline.onePhotoDemo.heading}</H3>
        <Prose>{t.sections.imagePipeline.onePhotoDemo.body}</Prose>
        <Photo1
          src={t.sections.imagePipeline.onePhotoDemo.hero.src}
          alt={t.sections.imagePipeline.onePhotoDemo.hero.alt}
          width={256} height={256}
          caption={t.sections.imagePipeline.onePhotoDemo.hero.caption}
        />
        <ScreenshotGrid
          items={t.sections.imagePipeline.onePhotoDemo.variants}
          lang={lang}
          basePath="/pseo/demo/apple-iphone-14-pro"
        />
        <ScreenshotCaption
          es={t.sections.imagePipeline.onePhotoDemo.caption.es}
          en={t.sections.imagePipeline.onePhotoDemo.caption.en}
          lang={lang}
        />

        {/* Cross-device demo */}
        <H3 id="cross-device">{t.sections.imagePipeline.crossDeviceDemo.heading}</H3>
        <Prose>{t.sections.imagePipeline.crossDeviceDemo.body}</Prose>
        <Photo3
          items={t.sections.imagePipeline.crossDeviceDemo.heroes as unknown as readonly [any, any, any]}
        />
        <Photo2
          items={t.sections.imagePipeline.crossDeviceDemo.comparison as unknown as readonly [any, any]}
          caption={lang === 'zh'
            ? t.sections.imagePipeline.crossDeviceDemo.comparisonCaption.es
            : t.sections.imagePipeline.crossDeviceDemo.comparisonCaption.en}
        />

        {/* Scale metrics */}
        <H3 id="pipeline-scale">{t.sections.imagePipeline.scale.heading}</H3>
        <MetricsGrid items={t.sections.imagePipeline.scale.metrics} columns={4} compact />

        {/* Reviews Pipeline */}
        <AnchorHeading id="reviews-pipeline">{t.sections.reviewsPipeline.heading}</AnchorHeading>
        <Prose>{t.sections.reviewsPipeline.intro}</Prose>

        <H3 id="review-source-sync">{t.sections.reviewsPipeline.sourceSync.heading}</H3>
        <Prose>{t.sections.reviewsPipeline.sourceSync.body}</Prose>
        <DataTable
          headers={t.sections.reviewsPipeline.sourceSync.table.headers}
          rows={t.sections.reviewsPipeline.sourceSync.table.rows}
        />

        <H3 id="review-image-processing">{t.sections.reviewsPipeline.imageProcessing.heading}</H3>
        <Prose>{t.sections.reviewsPipeline.imageProcessing.body}</Prose>
        <StepList
          items={t.sections.reviewsPipeline.imageProcessing.steps.map(step => ({
            label: step.label,
            detail: step.detail,
          }))}
        />

        <H3 id="review-code">{t.sections.reviewsPipeline.codeSnippet.heading}</H3>
        <Prose>{t.sections.reviewsPipeline.codeSnippet.body}</Prose>
        <CodeBlock segments={t.sections.reviewsPipeline.codeSnippet.segments} highlight="code" />

        <H3 id="review-cascade">{t.sections.reviewsPipeline.cascade.heading}</H3>
        <Prose>{t.sections.reviewsPipeline.cascade.body}</Prose>
        <BulletList items={t.sections.reviewsPipeline.cascade.points} />

        <H3 id="review-profiles">{t.sections.reviewsPipeline.profileDemo.heading}</H3>
        <Prose>{t.sections.reviewsPipeline.profileDemo.body}</Prose>
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {t.sections.reviewsPipeline.profileDemo.items.map(item => (
            <figure key={item.src} className="flex flex-col items-center gap-1.5">
              <img
                src={`/pseo/reviews/${item.src}`}
                alt={lang === 'zh' ? item.altEs : item.altEn}
                width={79} height={79}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-border"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
        <ScreenshotCaption
          es={t.sections.reviewsPipeline.profileDemo.caption.es}
          en={t.sections.reviewsPipeline.profileDemo.caption.en}
          lang={lang}
        />

        <H3 id="review-carousel">{t.sections.reviewsPipeline.carouselCro.heading}</H3>
        <Prose>{t.sections.reviewsPipeline.carouselCro.body}</Prose>
        <ReviewCarousel alt={lang === 'zh' ? 'Carrusel CRO de reseñas reales' : 'CRO carousel with real reviews'} />
        <Callout>{t.sections.reviewsPipeline.carouselCro.callout}</Callout>

        <H3 id="review-scale">{t.sections.reviewsPipeline.scale.heading}</H3>
        <MetricsGrid items={t.sections.reviewsPipeline.scale.metrics} columns={4} compact />

        {/* Before/After Pipeline */}
        <AnchorHeading id="before-after-pipeline">{t.sections.repairedDevicesPipeline.heading}</AnchorHeading>
        <Prose>{t.sections.repairedDevicesPipeline.intro}</Prose>

        <H3 id="capture-protocol">{t.sections.repairedDevicesPipeline.captureProtocol.heading}</H3>
        <Prose>{t.sections.repairedDevicesPipeline.captureProtocol.body}</Prose>
        <StepList
          items={t.sections.repairedDevicesPipeline.captureProtocol.steps.map(step => ({
            label: step.label,
            detail: step.detail,
          }))}
        />
        <Callout>{t.sections.repairedDevicesPipeline.captureProtocol.privacyNote}</Callout>

        <H3 id="ba-processing">{t.sections.repairedDevicesPipeline.imageProcessing.heading}</H3>
        <Prose>{t.sections.repairedDevicesPipeline.imageProcessing.body}</Prose>
        <StepList
          items={t.sections.repairedDevicesPipeline.imageProcessing.steps.map(step => ({
            label: step.label,
            detail: step.detail,
          }))}
        />

        <H3 id="ba-code">{t.sections.repairedDevicesPipeline.codeSnippet.heading}</H3>
        <Prose><span dangerouslySetInnerHTML={{ __html: t.sections.repairedDevicesPipeline.codeSnippet.body }} /></Prose>
        <CodeBlock segments={t.sections.repairedDevicesPipeline.codeSnippet.segments} highlight="code" />

        <H3 id="ba-demo">{t.sections.repairedDevicesPipeline.demo.heading}</H3>
        <Prose>{t.sections.repairedDevicesPipeline.demo.body}</Prose>
        <Photo2
          items={t.sections.repairedDevicesPipeline.demo.frontal as unknown as readonly [any, any]}
          caption={t.sections.repairedDevicesPipeline.demo.frontalCaption}
        />
        <Photo2
          items={t.sections.repairedDevicesPipeline.demo.trasera as unknown as readonly [any, any]}
          caption={t.sections.repairedDevicesPipeline.demo.traseraCaption}
        />

        <H3 id="ba-cross-device">{t.sections.repairedDevicesPipeline.crossDeviceDemo.heading}</H3>
        <Prose>{t.sections.repairedDevicesPipeline.crossDeviceDemo.body}</Prose>
        <Photo2
          items={t.sections.repairedDevicesPipeline.crossDeviceDemo.samsung as unknown as readonly [any, any]}
          caption={t.sections.repairedDevicesPipeline.crossDeviceDemo.samsungCaption}
        />
        <Photo2
          items={t.sections.repairedDevicesPipeline.crossDeviceDemo.xiaomi as unknown as readonly [any, any]}
          caption={t.sections.repairedDevicesPipeline.crossDeviceDemo.xiaomiCaption}
        />
        <ScreenshotCaption
          es={t.sections.repairedDevicesPipeline.crossDeviceDemo.caption.es}
          en={t.sections.repairedDevicesPipeline.crossDeviceDemo.caption.en}
          lang={lang}
        />

        <H3 id="ba-scale">{t.sections.repairedDevicesPipeline.scale.heading}</H3>
        <MetricsGrid items={t.sections.repairedDevicesPipeline.scale.metrics} columns={4} compact />

        {/* Growth Curve */}
        <AnchorHeading id="growth">{t.sections.growth.heading}</AnchorHeading>
        <Prose>{t.sections.growth.body}</Prose>

        <Photo1
          src="/pseo/ss-gsc-growth.webp"
          alt={lang === 'zh' ? 'Curva de crecimiento en Google Search Console — clicks e impresiones' : 'Growth curve in Google Search Console — clicks and impressions'}
          width={1178} height={294}
          caption={lang === 'zh' ? 'Google Search Console: clicks (azul) e impresiones (violeta) desde noviembre 2024 hasta septiembre 2025.' : 'Google Search Console: clicks (blue) and impressions (purple) from November 2024 through September 2025.'}
        />

        <DataTable
          headers={[
            lang === 'zh' ? '月份' : 'Month',
            'Clicks',
            lang === 'zh' ? '展示次数' : 'Impressions',
            '',
          ]}
          rows={t.sections.growth.monthly.map(m => [
            m.month,
            m.clicks.toLocaleString(),
            m.impressions.toLocaleString(),
            (m as any).note || '',
          ])}
          highlightColumn={1}
        />
        <Callout>{t.sections.growth.insight}</Callout>

        {/* GSC Milestones */}
        <H3 id="gsc-milestones">{(t.sections.growth as any).milestones.heading}</H3>
        <Prose>{(t.sections.growth as any).milestones.body}</Prose>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(t.sections.growth as any).milestones.items.map((item: any) => (
            <figure key={item.src} className="flex flex-col items-center gap-2">
              <img
                src={item.src}
                alt={item.label}
                width={330} height={643}
                className="w-full rounded-xl border border-border shadow-sm"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="text-center">
                <span className="block text-sm font-semibold text-primary">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Results */}
        <AnchorHeading id="results">{t.sections.results.heading}</AnchorHeading>
        <Prose>{t.sections.results.body}</Prose>
        <MetricsGrid items={t.sections.results.metrics} columns={4} compact />

        {/* Transition: Results → Starting Point */}
        <Prose>{(t.sections.results as any).transition}</Prose>

        {/* The Starting Point — Migration from Squarespace */}
        <AnchorHeading id="starting-point">{(t.sections as any).migration.heading}</AnchorHeading>
        <Prose>{(t.sections as any).migration.intro}</Prose>

        <Photo2
          items={[
            { src: '/pseo/ss-squarespace-mobile.webp', alt: lang === 'zh' ? 'xueyifan.me en Squarespace: homepage móvil' : 'xueyifan.me on Squarespace: mobile homepage', width: 800, height: 1422 },
            { src: '/pseo/ss-squarespace-pricing.webp', alt: lang === 'zh' ? 'xueyifan.me en Squarespace: página de precios con iconos genéricos' : 'xueyifan.me on Squarespace: pricing page with generic icons', width: 800, height: 1422 },
          ]}
          caption={lang === 'zh' ? 'xueyifan.me en Squarespace. Homepage y página de precios: iconos genéricos, sin fotos reales, sin datos del ERP.' : 'xueyifan.me on Squarespace. Homepage and pricing page: generic icons, no real photos, no ERP data.'}
        />

        <Callout>{(t.sections as any).migration.duplicateCallout}</Callout>

        {/* Technical Audit */}
        <H3 id="technical-audit">{(t.sections as any).migration.audit.heading}</H3>
        <Prose>{(t.sections as any).migration.audit.prose}</Prose>
        <MetricsGrid items={(t.sections as any).migration.audit.baseline} columns={4} compact />

        <Photo1
          src="/pseo/ss-audit-sistrix.webp"
          alt={lang === 'zh' ? 'SISTRIX: visibilidad orgánica de xueyifan.me en declive constante desde 2019 hasta 2024' : 'SISTRIX: organic visibility of xueyifan.me in constant decline from 2019 to 2024'}
          width={2000} height={1125}
          caption={lang === 'zh' ? 'Índice de visibilidad SISTRIX (2019-2024). Tendencia decreciente durante 5 años, de 0.036 a 0.003.' : 'SISTRIX visibility index (2019-2024). 5-year declining trend, from 0.036 to 0.003.'}
        />

        <Photo2
          items={[
            { src: '/pseo/ss-audit-gsc-clicks.webp', alt: lang === 'zh' ? 'Google Search Console: clics orgánicos reduciéndose a la mitad en 12 meses' : 'Google Search Console: organic clicks halving over 12 months', width: 2000, height: 1125 },
            { src: '/pseo/ss-audit-sector.webp', alt: lang === 'zh' ? 'SISTRIX: comparativa de visibilidad del sector en España — xueyifan.me invisible frente a competidores' : 'SISTRIX: sector visibility comparison in Spain — xueyifan.me invisible vs competitors', width: 2000, height: 1125 },
          ]}
          caption={lang === 'zh' ? 'Izquierda: GSC muestra los clics reduciéndose a la mitad (17,3K clics, posición media 23,1). Derecha: comparativa del sector — xueyifan.me es la línea roja pegada al eje X.' : 'Left: GSC shows clicks halving (17.3K clicks, avg position 23.1). Right: sector comparison — xueyifan.me is the red line stuck to the X axis.'}
        />

        <CardStack
          items={(t.sections as any).migration.audit.findings.map((item: any) => ({
            title: item.title,
            detail: item.detail,
          }))}
        />
        <Callout>{(t.sections as any).migration.audit.callout}</Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DiagramZoom
            src="/pseo/ss-audit-h1s.webp"
            hdSrc="/pseo/ss-audit-h1s-hd.webp"
            alt={lang === 'zh' ? 'Screaming Frog: 838 páginas con H1s múltiples, 118 duplicados, 255 sin H2' : 'Screaming Frog: 838 pages with multiple H1s, 118 duplicates, 255 without H2'}
            width={2000} height={1125} hdWidth={3000} hdHeight={1688}
            caption={lang === 'zh' ? 'Screaming Frog: 838 páginas con H1s múltiples' : 'Screaming Frog: 838 pages with multiple H1s'}
          />
          <DiagramZoom
            src="/pseo/ss-audit-images.webp"
            hdSrc="/pseo/ss-audit-images-hd.webp"
            alt={lang === 'zh' ? 'Screaming Frog: 8.000+ imágenes sin atributos de tamaño, 497 demasiado pesadas, 164 sin alt text' : 'Screaming Frog: 8,000+ images without size attributes, 497 too heavy, 164 without alt text'}
            width={2000} height={1125} hdWidth={3000} hdHeight={1688}
            caption={lang === 'zh' ? 'Screaming Frog: 8.000+ imágenes sin dimensiones' : 'Screaming Frog: 8,000+ images without dimensions'}
          />
        </div>

        <H3 id="technical-debt">{(t.sections as any).migration.technicalDebt.heading}</H3>
        <CardStack
          items={(t.sections as any).migration.technicalDebt.items.map((item: any) => ({
            title: item.title,
            detail: item.detail,
          }))}
        />

        <Photo1
          src="/pseo/ss-squarespace-repair.webp"
          alt={lang === 'zh' ? 'Página de reparación en Squarespace: iconos genéricos y precios sin estructura' : 'Repair page on Squarespace: generic icons and unstructured pricing'}
          width={1200} height={815}
          caption={lang === 'zh' ? 'Página de reparación típica en Squarespace. Iconos genéricos, sin fotos reales, sin JSON-LD, sin datos del ERP.' : 'Typical repair page on Squarespace. Generic icons, no real photos, no JSON-LD, no ERP data.'}
        />

        <DiagramZoom
          src="/pseo/ss-audit-lighthouse.webp"
          hdSrc="/pseo/ss-audit-lighthouse-hd.webp"
          alt={lang === 'zh' ? 'PageSpeed Insights: Lighthouse 21 en móvil, 51 en escritorio. Core Web Vitals: No superada en todas las tipologías' : 'PageSpeed Insights: Lighthouse 21 on mobile, 51 on desktop. Core Web Vitals: Not passed across all page types'}
          width={2000} height={1125} hdWidth={3000} hdHeight={1688}
          caption={lang === 'zh' ? 'Antes: Squarespace. Lighthouse 21/100 móvil. CWV no superada.' : 'Before: Squarespace. Lighthouse 21/100 mobile. CWV not passed.'}
        />
        <DiagramZoom
          src="/pseo/ss-audit-lighthouse-after.webp"
          hdSrc="/pseo/ss-audit-lighthouse-after-hd.webp"
          alt={lang === 'zh' ? 'PageSpeed Insights: Lighthouse 97 en móvil, Accesibilidad 100, SEO 100. Core Web Vitals: Superada' : 'PageSpeed Insights: Lighthouse 97 on mobile, Accessibility 100, SEO 100. Core Web Vitals: Passed'}
          width={2512} height={1312} hdWidth={2512} hdHeight={1312}
          caption={lang === 'zh'
            ? <>Después: Astro + Cloudflare. Lighthouse 97/100 móvil. CWV superada. <a href="https://pagespeed.web.dev/analysis/https-xueyifanirepair-es/rynn9cjrrs?form_factor=mobile" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Compruébalo tú mismo →</a></>
            : <>After: Astro + Cloudflare. Lighthouse 97/100 mobile. CWV passed. <a href="https://pagespeed.web.dev/analysis/https-xueyifanirepair-es/rynn9cjrrs?form_factor=mobile" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Check it yourself →</a></>}
        />

        <H3 id="migration">{(t.sections as any).migration.migrationSteps.heading}</H3>
        <StepList
          items={(t.sections as any).migration.migrationSteps.steps.map((step: any) => ({
            label: step.label,
            detail: step.detail,
          }))}
        />

        {/* Redirect Server */}
        <H3 id="redirect-server">{(t.sections as any).migration.redirectServer.heading}</H3>
        <Prose>{(t.sections as any).migration.redirectServer.prose}</Prose>
        <MetricsGrid items={(t.sections as any).migration.redirectServer.metrics} columns={4} compact />
        <CardStack
          items={(t.sections as any).migration.redirectServer.tiers.map((item: any) => ({
            title: item.title,
            detail: item.detail,
          }))}
        />
        <Callout>{(t.sections as any).migration.redirectServer.callout}</Callout>

        <Callout>{(t.sections as any).migration.orderCallout}</Callout>

        <H3 id="migration-cost">{(t.sections as any).migration.migrationCost.heading}</H3>
        <Prose>{(t.sections as any).migration.migrationCost.body}</Prose>
        <MetricsGrid items={(t.sections as any).migration.migrationCost.lighthouse} columns={4} compact />

        <DiagramZoom
          src="/pseo/ss-audit-competitors.webp"
          hdSrc="/pseo/ss-audit-competitors-hd.webp"
          alt={lang === 'zh' ? 'Comparativa AHREFs del sector: xueyifan.me con DR 0.1 y 23 backlinks vs competidores con miles' : 'AHREFs sector comparison: xueyifan.me with DR 0.1 and 23 backlinks vs competitors with thousands'}
          width={2000} height={1125} hdWidth={3000} hdHeight={1688}
          caption={lang === 'zh' ? 'Comparativa de fuerza de dominio (AHREFs). xueyifan.me: DR 0.1, 23 backlinks. El líder (iriparo.com): DR 44, 21.430 backlinks.' : 'Domain strength comparison (AHREFs). xueyifan.me: DR 0.1, 23 backlinks. Sector leader (iriparo.com): DR 44, 21,430 backlinks.'}
        />

        <Prose>{(t.sections as any).migration.migrationCost.closing}</Prose>

        {/* Stack */}
        <AnchorHeading id="stack">{t.sections.stack.heading}</AnchorHeading>
        <Prose>{(t.sections.stack as any).body}</Prose>
        <StackGrid
          items={t.sections.stack.items.map(item => ({
            icon: stackIcons[item.name] ?? <Layers className="w-8 h-8 text-primary" />,
            name: item.name,
            desc: item.role,
          }))}
          columns={2}
          align="left"
        />

        {/* Lessons */}
        <LessonsSection heading={t.sections.lessons.heading} items={t.sections.lessons.items} />

        {/* What This Demonstrates */}
        <H3 id="what-this-demonstrates">{(t.sections as any).whatThisDemonstrates.heading}</H3>
        <CardStack
          items={(t.sections as any).whatThisDemonstrates.items.map((item: any) => ({
            title: item.title,
            detail: item.detail,
          }))}
        />

        {/* Cross-link: Jacobo uses the same Airtable data */}
        <CaseStudyCta
          heading={lang === 'zh' ? 'El mismo ERP alimenta un agente IA' : 'The same ERP powers an AI agent'}
          body={lang === 'zh'
            ? 'Los datos de Airtable que generan estas 4.700+ páginas también los consulta Jacobo, un agente IA omnicanal que atiende por WhatsApp y teléfono. Misma fuente de verdad, dos canales de adquisición.'
            : 'The Airtable data that generates these 4,700+ pages is also queried by Jacobo, an omnichannel AI agent that handles WhatsApp and phone. Same source of truth, two acquisition channels.'}
          ctaLabel={lang === 'zh' ? '查看 Jacobo 案例研究 →' : 'Read Jacobo case study →'}
          ctaHref={lang === 'zh' ? '/agente-ia-jacobo' : '/ai-agent-jacobo'}
        />

        {/* CTA */}
        <CaseStudyCta
          heading={t.cta.heading}
          body={t.cta.body}
          ctaLabel={t.cta.label}
          ctaHref="mailto:yifanxue.sde@gmail.com?subject=Programmatic SEO"
        />

        {/* FAQ */}
        <FaqSection heading={t.faq.heading} items={t.faq.items} />

        {/* Resources */}
        <ResourcesList heading={t.resources.heading} items={t.resources.items} />
      </article>

      <ArticleFooter lang={lang} utmCampaign="pseo" />
    </ArticleLayout>
  )
}
