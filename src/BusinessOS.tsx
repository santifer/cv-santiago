import {
  ChevronRight, Wrench, Package, Globe, Users, ShieldCheck, Bell, BrainCircuit, Sparkles,
  ClipboardList, Contact, Calculator, Cpu, ShoppingBag, Code, MessageSquareHeart, Star, Search, MapPin, Film, Bot,
} from 'lucide-react'
import { type N8nLang as Lang } from './n8n-i18n'
import { buildJsonLdFromRegistry } from './articles/json-ld'
import { useArticleSeo } from './articles/use-article-seo'

/* ------------------------------------------------------------------ */
/* Shared SVG constants                                                */
/* ------------------------------------------------------------------ */

const STAR_SVG = <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor"><path d="M10 1l2.47 5.01L18 6.94l-4 3.89.94 5.51L10 13.88l-4.94 2.46.94-5.51-4-3.89 5.53-.93L10 1z"/></svg>

const AIRTABLE_SVG = (cls: string) => <svg viewBox="0 0 24 24" className={cls} fill="currentColor"><path d="M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257zM23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z"/></svg>

/* ------------------------------------------------------------------ */
/* ReelCard — Instagram reel embed                                     */
/* ------------------------------------------------------------------ */

function ReelCard({ reelId, caption }: { reelId: string; caption: string }) {
  return (
    <a
      href={`https://www.instagram.com/xueyifan/reel/${reelId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden border border-border bg-card group"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1.5px] shrink-0">
          <img src="/business-os/ig-avatar.jpg" alt="xueyifan" width={100} height={100} className="w-full h-full rounded-full object-cover" />
        </div>
        <p className="text-xs font-semibold text-foreground leading-tight flex-1 min-w-0">xueyifan</p>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
      </div>
      <div className="relative overflow-hidden aspect-[9/16]">
        <img src={`/business-os/reel-${reelId}.jpg`} alt={caption} width={360} height={640} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center -translate-x-[3px] translate-y-[1px]">
          <svg viewBox="0 0 48 48" className="w-[72px] h-[72px] drop-shadow-lg" fill="none">
            <path d="M18 13.5C18 11.8 19.9 10.8 21.3 11.8L36.2 21.8C37.4 22.6 37.4 24.4 36.2 25.2L21.3 34.2C19.9 35.2 18 34.2 18 32.5V13.5Z" fill="white" fillOpacity="0.95" />
          </svg>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-xs text-muted-foreground leading-relaxed">{caption}</p>
      </div>
    </a>
  )
}
import {
  ArticleLayout,
  ArticleHeader,
  ArticleFooter,
  FaqSection,
  ResourcesList,
  MetricsGrid,
  StatusBadge,
  CaseStudyCta,
} from './articles/components'
import {
  H2, H3, Prose, Callout, BulletList, StepList, CardStack, CardGrid, StackGrid,
  Photo1, Photo2, DataTable, Accordion, Timeline, StoryBridge, FloatingToc,
} from './articles/content-types'
import { businessOsContent } from './business-os-i18n'
import ArchitectureDiagram from './ArchitectureDiagram'

function buildJsonLd(lang: Lang) {
  return buildJsonLdFromRegistry('business-os', lang, businessOsContent[lang])
}

export default function BusinessOS({ lang = 'en' }: { lang?: Lang }) {
  const t = businessOsContent[lang]

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    image: 'https://xueyifan.io/business-os/og-business-os.webp',
    publishedTime: '2026-02-25',
    modifiedTime: '2026-03-06',
    articleTags: 'Business OS,Airtable,n8n,ERP,CRM,automation,phone repair',
    jsonLd: buildJsonLd(lang),
    xDefaultSlug: 'business-os-para-airtable',
  })



  return (
    <ArticleLayout lang={lang}>
      <FloatingToc />
      <ArticleHeader
        editorId="hero-header"
        lang={lang}
        kicker={t.header.kicker}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        readingTime={t.readingTime}
      />

      {'badge' in t.header && (
        <StatusBadge editorId="exit-badge" text={(t.header as any).badge} />
      )}
      <MetricsGrid editorId="hero-metrics" items={t.heroMetrics} columns={5} compact />

      {/* Hero images — storefront */}
      <Photo2
        editorId="hero-storefront"
        items={[
          { src: '/business-os/hero-storefront.webp', alt: lang === 'zh' ? 'Fachada de Xueyifan iRepair — tienda de reparación de móviles en Madrid' : 'Xueyifan iRepair storefront — phone repair shop in Madrid', width: 900, height: 1200 },
          { src: '/business-os/hero-storefront-urban.webp', alt: lang === 'zh' ? 'Xueyifan iRepair de noche — vista urbana con la tienda iluminada' : 'Xueyifan iRepair at night — urban view with the shop lit up', width: 800, height: 1067 },
        ]}
        className="mb-8"
      />

      <article className="prose-custom">
        {/* Intro */}
        <Prose variant="hook" editorId="intro-hook">{t.intro.hook}</Prose>
        <Prose editorId="intro-body">{t.intro.body}</Prose>
        <Callout editorId="tldr-callout">{t.tldr}</Callout>

        {/* Day in Life */}
        <H2 id="day-in-life">{t.sections.dayInLife.heading}</H2>
        <Prose editorId="day-body">{t.sections.dayInLife.body}</Prose>
        <StepList
          editorId="day-steps"
          items={t.sections.dayInLife.steps.map((step: { emoji: string; text: string }) => step.text)}
        />
        <Photo2
          editorId="day-counter"
          items={[
            { src: '/business-os/counter-organized-front.webp', alt: lang === 'zh' ? 'Interior de Xueyifan iRepair — lo que ve el cliente al entrar: mostrador con iMac, logo y lámpara esférica' : 'Xueyifan iRepair interior — what the customer sees walking in: counter with iMac, logo and spherical lamp', width: 360, height: 480 },
            { src: '/business-os/after-elevator-lamp.webp', alt: lang === 'zh' ? 'Montacargas de madera junto a lámpara esférica y logo Xueyifan — conexión entre mostrador y taller' : 'Wooden dumbwaiter next to spherical lamp and Xueyifan logo — connection between counter and workshop', width: 360, height: 480 },
          ]}
          caption={lang === 'zh' ? 'Lo que ve el cliente al entrar / El montacargas que conecta mostrador y taller' : 'What the customer sees walking in / The dumbwaiter connecting counter and workshop'}
        />
        <Prose editorId="day-caption" className="text-sm italic mt-4">
          {lang === 'zh'
            ? 'El cliente entra y ve un mostrador limpio. A su lado, el montacargas sube los terminales al taller y los baja reparados — la conexión física entre lo digital y lo real.'
            : 'The customer walks in and sees a clean counter. Next to it, the dumbwaiter takes devices up to the workshop and brings them back repaired — the physical connection between digital and real.'}
        </Prose>
        <CaseStudyCta
          heading={t.sections.dayInLife.jacoboCta.heading}
          body={t.sections.dayInLife.jacoboCta.body}
          ctaLabel={t.sections.dayInLife.jacoboCta.label}
          ctaHref={lang === 'zh' ? '/agente-ia-jacobo' : '/ai-agent-jacobo'}
        />

        {/* Why Not Off-the-Shelf */}
        <H2 id="why-custom">{t.sections.whyCustom.heading}</H2>
        <Prose editorId="why-body">{t.sections.whyCustom.body}</Prose>
        <CardStack
          editorId="why-reasons"
          items={t.sections.whyCustom.reasons.map((r) => ({ title: r.tool, detail: r.issue }))}
        />
        <Callout editorId="why-punchline">{t.sections.whyCustom.punchline}</Callout>
        <Photo2
          editorId="why-before-photos"
          items={[
            { src: '/business-os/before-chaos-desktop.webp', alt: lang === 'zh' ? 'Escritorio con Checkout POS, calendario, notas y cajonera de piezas — julio 2015' : 'Desktop with Checkout POS, calendar, notes and parts drawers — July 2015', width: 1200, height: 900 },
            { src: '/business-os/before-multisystem.webp', alt: lang === 'zh' ? 'Checkout POS, Slack, scripts de facturación y recordatorios — todo abierto a la vez' : 'Checkout POS, Slack, invoicing scripts and reminders — all open at once', width: 1200, height: 838 },
          ]}
          caption={lang === 'zh' ? 'POS + calendario + notas (2015) / POS + Slack + scripts + recordatorios (2019)' : 'POS + calendar + notes (2015) / POS + Slack + scripts + reminders (2019)'}
          className="mb-8"
        />

        {/* Overview */}
        <H2 id="overview">{t.sections.overview.heading}</H2>
        <Prose editorId="overview-body">{t.sections.overview.body}</Prose>
        <MetricsGrid items={t.sections.overview.stats} />

        {/* Architecture Diagram */}
        <ArchitectureDiagram lang={lang} />

        {/* 12 Bases Grid */}
        {(() => {
          const baseIcons = [
            <ClipboardList className="w-5 h-5 text-primary" />,
            <Contact className="w-5 h-5 text-primary" />,
            <Calculator className="w-5 h-5 text-primary" />,
            <Cpu className="w-5 h-5 text-primary" />,
            <ShoppingBag className="w-5 h-5 text-primary" />,
            <Code className="w-5 h-5 text-primary" />,
            <MessageSquareHeart className="w-5 h-5 text-primary" />,
            <Star className="w-5 h-5 text-primary" />,
            <Search className="w-5 h-5 text-primary" />,
            <MapPin className="w-5 h-5 text-primary" />,
            <Film className="w-5 h-5 text-primary" />,
            <Bot className="w-5 h-5 text-primary" />,
          ]
          return (
            <StackGrid
              editorId="overview-bases"
              columns={3}
              align="left"
              items={t.sections.overview.bases.map((base: { name: string; desc: string }, i: number) => ({
                icon: baseIcons[i],
                name: base.name,
                desc: base.desc,
              }))}
            />
          )
        })()}

        {/* End-to-End Flows */}
        <H2 id="e2e-flows">{t.sections.e2eFlows.heading}</H2>
        <Prose editorId="e2e-body">{t.sections.e2eFlows.body}</Prose>
        <div className="space-y-8 mb-8">
          {t.sections.e2eFlows.items.map((flow, idx) => {
            const flowIds = ['repair-lifecycle', 'procurement', 'content-pipeline', 'customer-lifecycle']
            const flowIcons = [
              <Wrench className="w-5 h-5 text-primary" />,
              <Package className="w-5 h-5 text-primary" />,
              <Globe className="w-5 h-5 text-primary" />,
              <Users className="w-5 h-5 text-primary" />,
            ]
            return (
            <div key={flow.name} className="scroll-mt-20">
              <H3 id={flowIds[idx]} icon={flowIcons[idx]}>{flow.name}</H3>
              <Prose editorId={`e2e-${idx}-summary`}>{flow.summary}</Prose>

              {idx === 0 && (
                <Photo2 editorId="repair-counter-watch"
                  items={[
                    { src: '/business-os/after-counter-pov.webp', alt: lang === 'zh' ? 'Mostrador de Xueyifan desde el punto de vista del empleado — iMac con Airtable abierto, citas programadas' : 'Xueyifan counter from employee POV — iMac with Airtable open, appointments scheduled', width: 800, height: 1067 },
                    { src: '/business-os/after-apple-watch-booking.webp', alt: lang === 'zh' ? 'Apple Watch del técnico mostrando la próxima cita' : 'Technician Apple Watch showing next appointment', width: 800, height: 1067 },
                  ]}
                  caption={lang === 'zh' ? 'Planta baja: citas en Airtable / Planta alta: carga de trabajo en la muñeca' : 'Ground floor: appointments in Airtable / Upstairs: workload on the wrist'}
                />
              )}
              {idx === 1 && (
                <Photo2 editorId="proc-accessories"
                  items={[
                    { src: '/business-os/accessories-cases-shelf.webp', alt: lang === 'zh' ? 'Fundas organizadas por modelo' : 'Cases organized by model', width: 1200, height: 900 },
                    { src: '/business-os/accessories-led-shelf.webp', alt: lang === 'zh' ? 'Mueble LED con accesorios' : 'LED display shelf with accessories', width: 1200, height: 900 },
                  ]}
                  caption={lang === 'zh' ? 'Cada SKU sincronizado con Airtable — precio, margen, rotación' : 'Every SKU synced with Airtable — price, margin, rotation'}
                />
              )}
              {idx === 2 && (
                <Photo1 editorId="content-before-after" src="/business-os/web-before-after.webp" alt={lang === 'zh' ? 'Before/after de reparaciones reales' : 'Real repair before/after'} width={1560} height={1040} caption={lang === 'zh' ? 'Before/after reales + reseñas — fotos del ERP, specs de gsmarena-api' : 'Real before/after + reviews — photos from ERP, specs from gsmarena-api'} />
              )}
              {idx === 3 && (
                <Photo1 editorId="lifecycle-automations" src="/business-os/automatizaciones-mensajes.webp" alt={lang === 'zh' ? 'Automatizaciones de mensajes en Airtable' : 'Airtable messaging automations'} width={1560} height={1040} caption={lang === 'zh' ? 'Automatizaciones de comunicación: reseñas por tier, notificaciones, campañas y WhatsApp' : 'Communication automations: tier-based reviews, notifications, campaigns and WhatsApp'} />
              )}

              {/* Trigger line */}
              <div className="flex items-center gap-2 text-sm text-primary mb-3">
                <span>&#9889;</span>
                <span className="font-medium">{flow.trigger}</span>
              </div>

              {/* Bases touched as pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {flow.basesTouched.map((base: string) => (
                  <span key={base} className="bg-primary/10 text-primary text-xs rounded-full px-2.5 py-0.5 font-medium">{base}</span>
                ))}
              </div>

              <BulletList editorId={`e2e-${idx}-details`} items={flow.details as readonly string[]} />

                {/* HP0: Repair Lifecycle */}
                {idx === 0 && (
                  <>
                    <Photo1
                      editorId="repair-automation"
                      src="/business-os/automatizacion.webp"
                      alt={lang === 'zh' ? 'Automatización Airtable — webhook unificado que decide el flujo según stock' : 'Airtable automation — unified webhook that routes the flow based on stock'}
                      width={1560} height={1040}
                      caption={lang === 'zh' ? 'Webhook unificado — si hay stock crea la OT, si no cancela cita y genera pedido' : 'Unified webhook — creates work order if in stock, cancels appointment and auto-orders if not'}
                    />
                    <Photo2
                      editorId="repair-parts"
                      items={[
                        { src: '/business-os/parts-organized-screens.webp', alt: lang === 'zh' ? 'Pantallas de iPhone organizadas por modelo en estantería' : 'iPhone screens organized by model on shelf', width: 1200, height: 900 },
                        { src: '/business-os/parts-pcb-microscope.webp', alt: lang === 'zh' ? 'Técnico trabajando con microscopio en placa PCB' : 'Technician working with microscope on PCB board', width: 1200, height: 900 },
                      ]}
                      caption={lang === 'zh' ? 'Piezas organizadas por Airtable / El técnico se centra en lo que importa' : 'Parts organized by Airtable / The technician focuses on what matters'}
                    />
                    <Photo1
                      editorId="repair-ot"
                      src="/business-os/airtable-ot-repair.webp"
                      alt={lang === 'zh' ? 'Interfaz Airtable — pestaña de reparación con piezas, garantías y accesorios' : 'Airtable interface — repair tab with parts, warranties and accessories'}
                      width={1560} height={1040}
                      caption={lang === 'zh' ? 'OT en Airtable — reparación, garantías y accesorios' : 'Work order in Airtable — repair, warranties and accessories'}
                    />
                    <Photo1
                      editorId="repair-warranties"
                      src="/business-os/airtable-warranties.webp"
                      alt={lang === 'zh' ? 'Interfaz Airtable de garantías' : 'Airtable warranties interface'}
                      width={1560} height={1040}
                      caption={lang === 'zh' ? 'Gestión de garantías: pieza → proveedor → pedido original → estado de reclamación' : 'Warranty management: part → supplier → original order → claim status'}
                    />
                  </>
                )}

                {/* HP1: Procurement */}
                {idx === 1 && (
                  <>
                    <Photo1 editorId="proc-inventory" className="mt-4" src="/business-os/airtable-inventory.webp" alt={lang === 'zh' ? 'Interfaz Airtable de inventario — pieza con foto real, stock, ubicación física' : 'Airtable inventory interface — part with real photo, stock, physical location'} width={1560} height={1040} caption={lang === 'zh' ? 'Ficha de pieza: stock, proveedor, foto real y ubicación física (armario, cajón)' : 'Part record: stock, supplier, real photo and physical location (cabinet, drawer)'} />
                    <Photo1 editorId="proc-inventory-2" src="/business-os/airtable-inventory-2.webp" alt={lang === 'zh' ? 'Segunda vista de inventario — foto de ubicación real' : 'Second inventory view — real shelf location photo'} width={1560} height={1040} caption={lang === 'zh' ? 'Foto de ubicación real: el empleado ve la estantería exacta' : 'Real location photo: the employee sees the exact shelf'} />
                    <Photo1 editorId="proc-orders" src="/business-os/airtable-purchase-orders.webp" alt={lang === 'zh' ? 'Interfaz Airtable de pedidos' : 'Airtable purchase orders interface'} width={1560} height={1040} caption={lang === 'zh' ? 'Stock bajo → pedido automático → recepción → inventario actualizado' : 'Low stock → auto order → reception → inventory updated'} />
                  </>
                )}

                {/* HP2: Content Pipeline */}
                {idx === 2 && (
                  <>
                    <Photo1 editorId="content-catalog" className="mt-4" src="/business-os/airtable-models-catalog.webp" alt={lang === 'zh' ? 'Catálogo de modelos en Airtable' : 'Airtable models catalog'} width={1560} height={1040} caption={lang === 'zh' ? 'Catálogo de modelos: de aquí salen landings, precios y fotos' : 'Models catalog: this feeds landings, prices and photos'} />
                    <Photo1 editorId="content-landing" src="/business-os/web-landing-hero.webp" alt={lang === 'zh' ? 'Landing de reparación generada desde Airtable' : 'Repair landing generated from Airtable'} width={1560} height={1040} caption={lang === 'zh' ? 'Landing 100% generada: precio, reseñas, specs (gsmarena-api) y SEO dinámico' : 'Landing 100% generated: price, reviews, specs (gsmarena-api) and dynamic SEO'} />
                    <Photo1 editorId="content-repairs" src="/business-os/web-repairs-catalog.webp" alt={lang === 'zh' ? 'Catálogo de reparaciones iPhone 11' : 'iPhone 11 repair catalog'} width={1560} height={1040} caption={lang === 'zh' ? 'Catálogo de averías por modelo — generado desde el ERP' : 'Repair catalog by model — generated from the ERP'} />
                  </>
                )}

                {/* HP3: Customer Lifecycle */}
                {idx === 3 && (
                  <>
                    <div className="flex items-center justify-center gap-3 sm:gap-5 mt-4 py-5 bg-background/50 rounded-lg border border-border">
                      {[
                        { tier: 'Bronze', bg: '#CD7F32', shape: 'circle' },
                        { tier: 'Silver', bg: '#A8A8A8', shape: 'circle' },
                        { tier: 'Gold', bg: '#D4A017', shape: 'circle' },
                        { tier: 'Diamond', bg: '#62D4F0', shape: 'diamond' },
                        { tier: 'Platinum', bg: '#E5E4E2', shape: 'star' },
                      ].map((badge, i, arr) => (
                        <div key={badge.tier} className="flex items-center gap-3 sm:gap-5">
                          <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9">
                            {badge.shape === 'circle' && <circle cx="20" cy="20" r="18" fill={badge.bg} />}
                            {badge.shape === 'diamond' && <polygon points="20,2 38,20 20,38 2,20" fill={badge.bg} />}
                            {badge.shape === 'star' && <polygon points="20,2 25,14 38,14 28,23 32,36 20,28 8,36 12,23 2,14 15,14" fill={badge.bg} />}
                            <text x="20" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="Space Grotesk, system-ui" fill="#0c0c10">{badge.tier[0]}</text>
                          </svg>
                          {i < arr.length - 1 && (
                            <svg viewBox="0 0 24 24" className="w-3 h-3 text-muted-foreground/30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Google review cards */}
                    <div className="space-y-3 mt-3">
                      <div className="bg-background/50 rounded-lg border border-border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white shrink-0">J</div>
                          <span className="text-sm font-medium text-foreground">Jose A. Fernández</span>
                          <div className="flex gap-0.5 ml-auto">
                            {[1,2,3,4,5].map(s => <span key={s}>{STAR_SVG}</span>)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-3">
                          {lang === 'zh'
                            ? '"La experiencia ha sido muy positiva. El plazo de reparación es 1 hora y lo cumplieron, el precio es razonable, la calidad de la reparación es muy buena. El contacto y la gestión a través del chatbot que tienen en WhatsApp funciona muy bien."'
                            : '"The experience was very positive. The 1-hour repair time was met, the price is reasonable, and the repair quality is great. The contact and management through their WhatsApp chatbot works really well."'}
                        </p>
                        <div className="bg-primary/5 border-l-2 border-primary/30 pl-3 py-2">
                          <p className="text-xs text-muted-foreground mb-1 font-medium">
                            {lang === 'zh' ? 'Respuesta de Xueyifan iRepair:' : 'Xueyifan iRepair response:'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lang === 'zh'
                              ? '"¡Gracias Jose Antonio! Nos alegra que la reparación de tu iPad cumpliera el plazo y que el chatbot de WhatsApp te resultara cómodo para gestionar la cita y el seguimiento. Aquí nos tienes para lo que necesites."'
                              : '"Thanks Jose Antonio! Glad the iPad repair met the deadline and that the WhatsApp chatbot made booking and tracking easy for you. Here whenever you need us."'}
                          </p>
                          <p className="text-[10px] text-primary/50 mt-1.5 flex items-center gap-1">
                            {AIRTABLE_SVG('w-3 h-3 text-[#18BFFF]')}
                            {lang === 'zh' ? 'Contexto del CRM: iPad, cita gestionada vía Jacobo (chatbot WhatsApp), reparación express 1h' : 'CRM context: iPad, appointment via Jacobo (WhatsApp chatbot), 1h express repair'}
                          </p>
                        </div>
                      </div>
                      <div className="bg-background/50 rounded-lg border border-border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center text-xs font-bold text-white shrink-0">C</div>
                          <span className="text-sm font-medium text-foreground">Cristian</span>
                          <div className="flex gap-0.5 ml-auto">
                            {[1,2,3,4,5].map(s => <span key={s}>{STAR_SVG}</span>)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-3">
                          {lang === 'zh'
                            ? '"(Edito mi reseña anterior): Tras comentar el problema del detalle en el acabado, el responsable del taller me contactó personalmente para ofrecer una solución inmediata. Ofreció cita para esa misma tarde. El resultado ahora es excelente. Errores puede haber en cualquier sitio, pero la profesionalidad se demuestra en cómo se solucionan."'
                            : '"(Editing my previous review): After mentioning the finishing issue, the workshop manager personally contacted me to offer an immediate solution. He offered an appointment that same afternoon. The result is now excellent. Mistakes can happen anywhere, but professionalism shows in how they\'re resolved."'}
                        </p>
                        <div className="bg-primary/5 border-l-2 border-primary/30 pl-3 py-2">
                          <p className="text-xs text-muted-foreground mb-1 font-medium">
                            {lang === 'zh' ? 'Respuesta de Xueyifan iRepair:' : 'Xueyifan iRepair response:'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lang === 'zh'
                              ? '"Gracias por actualizar tu reseña, Cristian. El sistema nos alertó de tu valoración inicial y revisamos tu historial: cristal iPhone con detalle en el acabado. Te contactamos directamente para rectificar esa misma tarde. Para nosotros es fundamental responder cuando algo no queda perfecto a la primera."'
                              : '"Thanks for updating your review, Cristian. Our system flagged your initial rating and we reviewed your history: iPhone glass with a finishing detail. We contacted you directly to fix it that same afternoon. For us, responding when something isn\'t perfect the first time is essential."'}
                          </p>
                          <p className="text-[10px] text-primary/50 mt-1.5 flex items-center gap-1">
                            {AIRTABLE_SVG('w-3 h-3 text-[#18BFFF]')}
                            {lang === 'zh' ? 'Contexto del CRM: alerta reseña negativa, cristal iPhone, ticket reabierto, resolución mismo día' : 'CRM context: negative review alert, iPhone glass, ticket reopened, same-day resolution'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          )})}
        </div>
        <CaseStudyCta
          heading={t.sections.dayInLife.pseoCta.heading}
          body={t.sections.dayInLife.pseoCta.body}
          ctaLabel={t.sections.dayInLife.pseoCta.label}
          ctaHref={lang === 'zh' ? 'mailto:yifanxue.sde@gmail.com?subject=Programmatic SEO' : 'mailto:yifanxue.sde@gmail.com?subject=Programmatic SEO'}
        />

        {/* Cross-Cutting Capabilities */}
        <H2 id="cross-cutting">{t.sections.crossCutting.heading}</H2>
        <Prose editorId="cross-body">{t.sections.crossCutting.body}</Prose>
        <div className="space-y-8 mb-8">
          {t.sections.crossCutting.items.map((cap, idx) => {
            const capIds = ['data-guardrails', 'event-notifications', 'ai-query-layer', 'generative-ai']
            const capIcons = [
              <ShieldCheck className="w-5 h-5 text-primary" />,
              <Bell className="w-5 h-5 text-primary" />,
              <BrainCircuit className="w-5 h-5 text-primary" />,
              <Sparkles className="w-5 h-5 text-primary" />,
            ]
            return (
            <div key={cap.name} className="scroll-mt-20">
              <H3 id={capIds[idx]} icon={capIcons[idx]}>{cap.name}</H3>
              <Prose editorId={`cc-${idx}-summary`}>{cap.summary}</Prose>
              <BulletList editorId={`cc-${idx}-details`} items={cap.details as readonly string[]} />

                {/* CC0: Data Guardrails */}
                {idx === 0 && (
                  <Photo1 editorId="cc-guardrails" className="mt-4" src="/business-os/airtable-ot-terminal.webp" alt={lang === 'zh' ? 'Interfaz Airtable — orden de trabajo con datos del terminal' : 'Airtable interface — work order with device data'} width={1560} height={1040} caption={lang === 'zh' ? 'Formulario de entrada — cada campo validado automáticamente' : 'Intake form — every field automatically validated'} />
                )}

                {/* CC1: Event-Driven Notifications */}
                {idx === 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4 py-6 bg-background/50 rounded-lg border border-border">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#25D366]" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <path d="M8 10h.01M12 10h.01M16 10h.01" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {AIRTABLE_SVG('w-10 h-10 text-[#18BFFF]')}
                  </div>
                )}

                {/* CC2: AI Query Layer */}
                {idx === 2 && (
                  <div className="flex items-center justify-center gap-6 mt-4 py-6 bg-background/50 rounded-lg border border-border">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-muted-foreground" fill="currentColor">
                      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {AIRTABLE_SVG('w-10 h-10 text-[#18BFFF]')}
                  </div>
                )}

                {/* CC3: Generative AI Applied */}
                {idx === 3 && (
                  <>
                    <Photo2
                      editorId="cc-signage"
                      className="mt-4"
                      items={[
                        { src: '/business-os/digital-signage-storefront.webp', alt: lang === 'zh' ? 'Pantalla digital en escaparate — reparación de móviles' : 'Digital signage in storefront — mobile repair', width: 600, height: 800 },
                        { src: '/business-os/digital-signage-storefront-2.webp', alt: lang === 'zh' ? 'Pantalla digital en escaparate — Apple Watch' : 'Digital signage in storefront — Apple Watch', width: 360, height: 480 },
                      ]}
                      caption={lang === 'zh' ? 'Digital signage — imágenes generadas con IA desde el catálogo de Airtable' : 'Digital signage — AI-generated images from the Airtable catalog'}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {[
                        {
                          id: 'DHBkRjoI84t',
                          caption: lang === 'zh'
                            ? 'Dedicado a ti, Carlos ❤️'
                            : 'Dedicated to you, Carlos ❤️',
                        },
                        {
                          id: 'DHI1cROoh41',
                          caption: lang === 'zh'
                            ? '¿La pantalla nos separa… o nos une? Storytelling + Sora.'
                            : 'Does the screen separate us… or bring us together? Storytelling + Sora.',
                        },
                        {
                          id: 'DHMK2UqoC3M',
                          caption: lang === 'zh'
                            ? 'Los "trucos virales" que destruyen tu móvil. Humor + Sora.'
                            : '"Viral tricks" that destroy your phone. Humor + Sora.',
                        },
                        {
                          id: 'DAltoufs6Bx',
                          caption: lang === 'zh'
                            ? 'Canción original generada con Suno (IA). Letra, voz y música 100% sintéticas.'
                            : 'Original song generated with Suno (AI). Lyrics, voice and music 100% synthetic.',
                        },
                      ].map((reel) => (
                        <ReelCard key={reel.id} reelId={reel.id} caption={reel.caption} />
                      ))}
                    </div>
                  </>
                )}
            </div>
          )})}
        </div>

        {/* Impact — 170h/Month Breakdown */}
        <H2 id="impact">{t.sections.impact.heading}</H2>
        <Prose editorId="impact-body">{t.sections.impact.body}</Prose>
        <DataTable
          editorId="impact-table"
          headers={[
            lang === 'zh' ? 'Módulo' : 'Module',
            lang === 'zh' ? 'Antes' : 'Before',
            lang === 'zh' ? 'Después' : 'After',
            lang === 'zh' ? 'Ahorro/mes' : 'Monthly Savings',
          ]}
          rows={[
            ...t.sections.impact.savings.map((row) => [row.module, row.before, row.after, row.monthly] as const),
            ['Total', '', '', t.sections.impact.total],
          ]}
          highlightColumn={3}
          className="mb-4"
        />
        <Callout editorId="impact-punchline" className="mb-8">{t.sections.impact.punchline}</Callout>

        {/* Before vs After */}
        <H2 id="before-after">{t.sections.beforeAfter.heading}</H2>

        {/* Before photos gallery */}
        <Prose editorId="before-label" className="text-sm font-medium">
          {lang === 'zh' ? 'Así se gestionaba antes:' : 'How things were managed before:'}
        </Prose>
        <Photo1 editorId="before-backlog" src="/business-os/before-terminals-backlog.webp" alt={lang === 'zh' ? 'Terminales acumulados pendientes de recoger' : 'Devices piling up waiting for pickup'} width={1200} height={900} caption={lang === 'zh' ? 'Terminales acumulados pendientes de recoger' : 'Devices piling up waiting for pickup'} />
        <Photo2
          editorId="before-notes-pos"
          items={[
            { src: '/business-os/before-icloud-notes.webp', alt: lang === 'zh' ? 'Notas de iCloud como sistema de pedidos' : 'iCloud Notes as order system', width: 800, height: 1422 },
            { src: '/business-os/before-checkout-pos-stock.webp', alt: lang === 'zh' ? 'Checkout POS Manager — inventario manual' : 'Checkout POS Manager — manual inventory', width: 1200, height: 2133 },
          ]}
          caption={lang === 'zh' ? 'Pedidos en Notas de iCloud / Stock en Checkout POS' : 'Orders in iCloud Notes / Stock in Checkout POS'}
        />
        <Photo1 editorId="before-chaos" src="/business-os/before-workshop-chaos.webp" alt={lang === 'zh' ? 'Taller saturado' : 'Overwhelmed workshop'} width={1200} height={522} caption={lang === 'zh' ? 'Taller saturado — sin sistema de prioridades' : 'Overwhelmed workshop — no priority system'} />
        <Photo2
          editorId="before-sketch-founder"
          items={[
            { src: '/business-os/before-notebook-sketch.webp', alt: lang === 'zh' ? 'Boceto en libreta' : 'Notebook sketch', width: 800, height: 1067 },
            { src: '/business-os/before-founder-overwhelmed.webp', alt: lang === 'zh' ? 'Yifan en el taller' : 'Yifan in the workshop', width: 600, height: 800 },
          ]}
          caption={lang === 'zh' ? 'Primer boceto de integración / De este caos nació un Product Builder' : 'First integration sketch / This chaos built a Product Builder'}
          className="mb-6"
        />

        <CardGrid
          editorId="before-after-cards"
          items={t.sections.beforeAfter.items as readonly { area: string; before: string; after: string }[]}
          columns={1}
          className="mb-8"
          renderItem={(item) => (
            <div key={item.area} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-colors">
              <p className="font-display font-semibold text-foreground text-sm mb-3">{item.area}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 text-xs shrink-0">&#10005;</span>
                  <p className="text-sm text-muted-foreground">{item.before}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 text-xs shrink-0">&#10003;</span>
                  <p className="text-sm text-muted-foreground">{item.after}</p>
                </div>
              </div>
            </div>
          )}
        />

        {/* After photos gallery */}
        <Prose editorId="after-label" className="text-sm font-medium">
          {lang === 'zh' ? 'Después — todo en un solo sistema:' : 'After — everything in one system:'}
        </Prose>
        <Photo2
          editorId="after-store-orders"
          items={[
            { src: '/business-os/after-store-interior.webp', alt: lang === 'zh' ? 'Interior de Xueyifan iRepair' : 'Xueyifan iRepair interior', width: 1200, height: 900 },
            { src: '/business-os/after-orders-organized.webp', alt: lang === 'zh' ? 'Órdenes de trabajo organizadas' : 'Organized work orders', width: 1200, height: 900 },
          ]}
          caption={lang === 'zh' ? 'Un iMac, un sistema / Envíos COVID organizados con Airtable' : 'One iMac, one system / COVID shipments organized with Airtable'}
        />
        <Photo2
          editorId="after-workshop-accessories"
          items={[
            { src: '/business-os/after-workshop-organized.webp', alt: lang === 'zh' ? 'Taller organizado' : 'Organized workshop', width: 1200, height: 900 },
            { src: '/business-os/after-accessories-display.webp', alt: lang === 'zh' ? 'Estantería LED con accesorios' : 'LED shelf with accessories', width: 1024, height: 768 },
          ]}
          caption={lang === 'zh' ? 'Taller organizado / Cada accesorio con ubicación y stock en Airtable' : 'Organized workshop / Every accessory with location and stock in Airtable'}
          className="mb-8"
        />

        {/* Architecture Decisions */}
        <H2 id="decisions">{t.sections.decisions.heading}</H2>
        <Prose editorId="decisions-body">{t.sections.decisions.body}</Prose>
        <Accordion editorId="decisions-accordion" items={t.sections.decisions.items} />

        {/* Platform Evolution Timeline */}
        <H2 id="platform-evolution">{t.sections.platformEvolution.heading}</H2>
        <Prose editorId="evolution-tagline" className="italic">{t.sections.platformEvolution.tagline}</Prose>
        <Timeline
          editorId="evolution-timeline"
          items={t.sections.platformEvolution.steps as readonly { year: string; event: string; detail: string; punchline?: string }[]}
        />

        <StoryBridge editorId="evolution-bridge" lines={t.sections.platformEvolution.bridge as readonly string[]} />

        {/* Lessons */}
        <H2 id="lessons">{t.sections.lessons.heading}</H2>
        <StepList
          editorId="lessons-steps"
          items={t.sections.lessons.items.map((l: { title: string; detail: string }) => ({ label: l.title, detail: l.detail }))}
        />

        {/* Replicability */}
        <H2 id="replicability">{t.sections.replicability.heading}</H2>
        <Prose editorId="replicability-body">{t.sections.replicability.body}</Prose>
        <CardStack
          editorId="replicability-cards"
          items={t.sections.replicability.examples.map((ex: { domain: string; detail: string }) => ({ title: ex.domain, detail: ex.detail }))}
        />
        <Prose editorId="replicability-closing" className="mb-8">{t.sections.replicability.closing}</Prose>

        {/* Cross-link: Chatbot uses the same systems thinking */}
        <CaseStudyCta
          editorId="crosslink-chatbot"
          heading={lang === 'zh' ? 'El mismo enfoque de sistemas, aplicado a LLMOps' : 'The same systems thinking, applied to LLMOps'}
          body={lang === 'zh'
            ? 'El chatbot de este portfolio usa los mismos principios: observabilidad agéntica, closed-loop automático y 71 tests. De automatizar un negocio físico a automatizar un pipeline de IA.'
            : 'The chatbot on this portfolio uses the same principles: agentic observability, automatic closed-loop, and 71 tests. From automating a physical business to automating an AI pipeline.'}
          ctaLabel={lang === 'zh' ? 'Ver El Chatbot Que Se Cura Solo →' : 'Read The Self-Healing Chatbot →'}
          ctaHref={lang === 'zh' ? '/chatbot-que-se-cura-solo' : '/self-healing-chatbot'}
        />

        {/* CTA */}
        <CaseStudyCta
          heading={t.cta.heading}
          body={t.cta.body}
          ctaLabel={t.cta.label}
          ctaHref="mailto:yifanxue.sde@gmail.com?subject=Business OS Architecture"
        />

        {/* FAQ */}
        <FaqSection heading={t.faq.heading} items={t.faq.items} />

        {/* Resources */}
        <ResourcesList heading={t.resources.heading} items={t.resources.items} />
      </article>

      <ArticleFooter lang={lang} utmCampaign="business-os" />
    </ArticleLayout>
  )
}
