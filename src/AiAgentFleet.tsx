import { Link } from 'react-router-dom'
import { type AiAgentFleetLang as Lang, aiAgentFleetContent } from './ai-agent-fleet-i18n'
import { buildJsonLdFromRegistry } from './articles/json-ld'
import { useArticleSeo } from './articles/use-article-seo'
import {
  ArticleLayout,
  ArticleHeader,
  ArticleFooter,
  FaqSection,
  LessonsSection,
  CaseStudyCta,
} from './articles/components'
import {
  H2,
  Prose,
  Callout,
  CardStack,
  StepList,
  BulletList,
  DataTable,
  FloatingToc,
} from './articles/content-types'

function buildJsonLd(lang: Lang) {
  return buildJsonLdFromRegistry('ai-agent-fleet', lang, aiAgentFleetContent[lang])
}

export default function AiAgentFleet({ lang = 'en' }: { lang?: Lang }) {
  const t = aiAgentFleetContent[lang]

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    image: 'https://santifer.io/ai-agent-fleet/og-ai-agent-fleet.webp',
    publishedTime: '2026-07-10',
    modifiedTime: '2026-07-21',
    articleTags: 'ai agents,multi-agent,open source,maintainer,Claude Code,sdlc,context engineering',
    jsonLd: buildJsonLd(lang),
    xDefaultSlug: 'flota-agentes-ia',
  })

  const s = t.sections

  return (
    <ArticleLayout lang={lang}>
      <FloatingToc
        ctas={[
          { href: '#cta-block', label: lang === 'es' ? 'Hablemos' : 'Talk to me', variant: 'anchor' },
        ]}
      />
      <ArticleHeader
        lang={lang}
        kicker={t.header.kicker}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        dateISO="2026-07-10"
        readingTime={t.readingTime}
      />

      <img
        src="/ai-agent-fleet/hero-ai-agent-fleet.webp"
        alt={lang === 'es'
          ? 'Ilustración: un director de orquesta dirige un árbol de branches de git poblado de agentes trabajando en pull requests'
          : 'Illustration: a conductor directs a git branch tree populated by agents working on pull requests'}
        width={1200}
        height={630}
        className="w-full rounded-2xl mb-8"
      />

      <Callout className="bg-accent/10 border-accent/40">
        {t.tldr}
        {t.tldrCoin.pre}
        <strong>{t.tldrCoin.term}</strong>
        {t.tldrCoin.post}
      </Callout>

      <article className="prose-custom">
        {/* ================================================================ */}
        {/*  THE WEEK THE REPO OUTGREW ME                                    */}
        {/* ================================================================ */}
        <H2 id="outgrew">{s.outgrew.heading}</H2>
        <Prose>{s.outgrew.paras[0]}</Prose>
        <figure className="my-8 max-w-lg mx-auto">
          <a
            href="https://x.com/santifer/status/2041403685696053741"
            target="_blank"
            rel="noopener"
            aria-label={lang === 'es' ? 'Ver el tweet en X' : 'View the post on X'}
            className="block hover:opacity-90 transition-opacity"
          >
            <img
              src="/ai-agent-fleet/tweet-12k-stars.webp"
              alt={lang === 'es'
                ? 'Tweet fijado de @santifer: "Built this to find my own job. Open sourced it. 12K+ stars in two days." — citando a Garry Tan ("Golden age of open source is here"), con 553K visualizaciones'
                : 'Pinned post by @santifer: "Built this to find my own job. Open sourced it. 12K+ stars in two days." — quote-tweeting Garry Tan ("Golden age of open source is here"), 553K views'}
              width={594}
              height={581}
              loading="lazy"
              className="w-full rounded-2xl border border-border/50"
            />
          </a>
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {lang === 'es' ? 'El anuncio original, aún fijado en X.' : 'The original announcement, still pinned on X.'}
          </figcaption>
        </figure>
        {s.outgrew.paras.slice(1).map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  THE FLEET                                                       */}
        {/* ================================================================ */}
        <H2 id="fleet">{s.fleet.heading}</H2>
        <Prose>{s.fleet.intro}</Prose>
        <img
          src="/ai-agent-fleet/fig-fleet.svg"
          alt={lang === 'es'
            ? 'Arquitectura de la flota de agentes IA: un maintainer humano tomando decisiones estratégicas por las tardes y los fines de semana, un agente maintainer orquestador, agentes de Discord, web y dogfood coordinados por IPC de ficheros, verificadores efímeros de solo lectura en git worktrees aislados, y una memoria compuesta que se carga al arrancar.'
            : 'Architecture of the AI agent fleet: a human maintainer making strategic decisions on evenings and weekends, a maintainer orchestrator agent, Discord, web and dogfood agents coordinated over file-based IPC, read-only ephemeral verifiers in isolated git worktrees, and a compound memory loaded at boot.'}
          width={1200}
          height={675}
          loading="lazy"
          className="w-full rounded-2xl my-8"
        />
        <DataTable headers={s.fleet.table.headers} rows={s.fleet.table.rows} />
        <Prose>{s.fleet.loops}</Prose>
        <Prose>{s.fleet.split}</Prose>
        <Prose>
          {s.fleet.priorArt.pre}
          <Link to={s.fleet.priorArt.href} className="text-primary hover:underline">{s.fleet.priorArt.linkLabel}</Link>
          {s.fleet.priorArt.post}
        </Prose>

        {/* ================================================================ */}
        {/*  THE GATES                                                       */}
        {/* ================================================================ */}
        <H2 id="gates">{s.gates.heading}</H2>
        <Prose>{s.gates.intro}</Prose>
        <img
          src="/ai-agent-fleet/fig-gates.svg"
          alt={lang === 'es'
            ? 'El camino de una PR hasta el merge: ejecución en checkout limpio contra 1.667 aserciones, CI más CodeQL en vivo como gates bloqueantes, review brief con encaje de spec y mapa de colisiones, decisión humana con evidencia adjunta, merge, y solo tras exit 0 el anuncio público. Gates extra para first-timers, plugins y ficheros sensibles.'
            : 'A pull request\'s path to merge: clean-checkout test run against 1,667 assertions, CI plus live CodeQL as blocking gates, review brief with spec-fit and collision map, human decision with evidence attached, then merge, and only after exit 0 the public announcement. Extra gates for first-time contributors, plugins and sensitive files.'}
          width={1200}
          height={675}
          loading="lazy"
          className="w-full rounded-2xl my-8"
        />
        <BulletList items={s.gates.items} />

        {/* ================================================================ */}
        {/*  SECURITY AND ISOLATION                                          */}
        {/* ================================================================ */}
        <H2 id="security">{s.security.heading}</H2>
        {s.security.paras.map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  WHEN THE INFRASTRUCTURE FAILS                                   */}
        {/* ================================================================ */}
        <H2 id="infra-fails">{s.infraFails.heading}</H2>
        {s.infraFails.paras.map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  THE MEMORY THAT COMPOUNDS                                       */}
        {/* ================================================================ */}
        <H2 id="memory">{s.memory.heading}</H2>
        {s.memory.paras.map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  ONE DOCUMENTED DAY                                              */}
        {/* ================================================================ */}
        <H2 id="specimen-day">{s.specimen.heading}</H2>
        <Prose>{s.specimen.opening}</Prose>
        <Prose>{s.specimen.outcomesLead}</Prose>
        <BulletList items={s.specimen.outcomes} />
        <figure className="my-8">
          <img
            src="/ai-agent-fleet/trending-5-2026-07-02.webp"
            alt={lang === 'es'
              ? 'Captura de github.com/trending del 2 de julio de 2026: career-ops en la posición #5 overall con 57,455 estrellas y 322 estrellas ese día'
              : 'Screenshot of github.com/trending on July 2, 2026: career-ops at #5 overall with 57,455 stars and 322 stars that day'}
            width={1474}
            height={1304}
            loading="lazy"
            className="w-full rounded-2xl border border-border/50"
          />
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {lang === 'es' ? 'GitHub Trending, 2 de julio de 2026 — captura real.' : 'GitHub Trending, July 2, 2026 — actual screenshot.'}
          </figcaption>
        </figure>
        <Prose>{s.specimen.involvement}</Prose>
        {s.specimen.closing.map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  WHAT THE FLEET CATCHES                                          */}
        {/* ================================================================ */}
        <H2 id="catches">{s.catches.heading}</H2>
        <CardStack items={s.catches.items.map(c => ({ title: c.title, detail: c.body }))} />

        {/* ================================================================ */}
        {/*  THE NUMBERS                                                     */}
        {/* ================================================================ */}
        <H2 id="numbers">{s.numbers.heading}</H2>
        <figure className="my-8">
          <a
            href="https://warpchart.dev/r/santifer/career-ops?utm_source=santifer.io"
            target="_blank"
            rel="noopener"
            aria-label="The career-ops warp chart on Warpchart"
            className="block hover:opacity-90 transition-opacity"
          >
            {/* theme=dark fixed: site is hardcoded dark, dynamic mode would follow visitor OS */}
            <img
              src="https://warpchart.dev/api/chart?repo=santifer/career-ops&theme=dark&w=800&h=420"
              alt={s.numbers.warpchart.alt}
              width={800}
              height={420}
              loading="lazy"
              className="w-full rounded-2xl border border-border/50"
            />
          </a>
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {s.numbers.warpchart.caption}{' '}
            <a
              href="https://warpchart.dev?utm_source=santifer.io"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline"
            >
              {s.numbers.warpchart.linkLabel}
            </a>
          </figcaption>
        </figure>
        <Prose>{s.numbers.asOf}</Prose>
        <DataTable headers={s.numbers.table.headers} rows={s.numbers.table.rows} />
        <Prose>{s.numbers.closing}</Prose>
        <Prose>
          {s.numbers.dora.pre}
          <a href="https://dora.dev/dora-report-2025/" target="_blank" rel="noopener" className="text-primary hover:underline">{s.numbers.dora.linkLabel}</a>
          {s.numbers.dora.post}
        </Prose>

        {/* ================================================================ */}
        {/*  THE COMMUNITY RUNS ON THE SAME SYSTEM                           */}
        {/* ================================================================ */}
        <H2 id="community">{s.community.heading}</H2>
        {s.community.paras.map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  MAKING YOUR REPO AGENT-FRIENDLY                                 */}
        {/* ================================================================ */}
        <H2 id="playbook">{s.playbook.heading}</H2>
        <Prose>{s.playbook.intro}</Prose>
        <StepList
          items={s.playbook.steps.map((st, i) =>
            i === 0
              ? {
                  label: st.label,
                  detail: (
                    <>
                      {st.detail}
                      <a href="https://agents.md/" target="_blank" rel="noopener" className="text-primary hover:underline">{s.playbook.agentsMd.linkLabel}</a>
                      {s.playbook.agentsMd.post}
                    </>
                  ),
                }
              : st,
          )}
        />
        <Prose>{s.playbook.closing}</Prose>

        {/* ================================================================ */}
        {/*  WHERE THIS BREAKS                                               */}
        {/* ================================================================ */}
        <H2 id="limits">{s.breaks.heading}</H2>
        <BulletList
          items={s.breaks.items.map((it, i) =>
            i === 1
              ? {
                  label: it.label,
                  detail: (
                    <>
                      {it.detail}{' '}
                      {s.breaks.verificationExtra.pre}
                      <a href="https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/" target="_blank" rel="noopener" className="text-primary hover:underline">{s.breaks.verificationExtra.linkLabel}</a>
                      {s.breaks.verificationExtra.post}
                    </>
                  ),
                }
              : it,
          )}
        />

        {/* ================================================================ */}
        {/*  FROM ONE REPO TO AN ENGINEERING ORG                             */}
        {/* ================================================================ */}
        <H2 id="org-bridge">{s.orgBridge.heading}</H2>
        {s.orgBridge.paras.map((p, i) => (
          <Prose key={i}>{p}</Prose>
        ))}

        {/* ================================================================ */}
        {/*  CORE CONCEPTS                                                   */}
        {/* ================================================================ */}
        <H2 id="core-concepts">{s.coreConcepts.heading}</H2>
        <Prose>{s.coreConcepts.intro}</Prose>
        <BulletList items={s.coreConcepts.items} />
        <Prose>{s.coreConcepts.closing}</Prose>

        {/* ================================================================ */}
        {/*  LESSONS                                                         */}
        {/* ================================================================ */}
        <LessonsSection
          heading={s.lessons.heading}
          items={s.lessons.items.map(l => ({ title: l.title, detail: l.detail }))}
        />

        {/* ================================================================ */}
        {/*  FAQ                                                             */}
        {/* ================================================================ */}
        <FaqSection heading={t.faq.heading} items={t.faq.items} />

        {/* ================================================================ */}
        {/*  RELATED WORK                                                    */}
        {/* ================================================================ */}
        <H2 id="related">{s.relatedWork.heading}</H2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {s.relatedWork.items.map(link => (
            <Link key={link.href} to={link.href} className="block p-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors">
              <p className="text-sm font-medium text-primary">{link.text}</p>
            </Link>
          ))}
        </div>

        {/* ================================================================ */}
        {/*  CTA                                                             */}
        {/* ================================================================ */}
        <div id="cta-block">
          <CaseStudyCta
            heading={s.cta.heading}
            body={s.cta.body}
            ctaLabel={s.cta.ctaLabel}
            ctaHref={s.cta.ctaHref}
            external
            secondaryLabel={s.cta.secondaryLabel}
            secondaryHref={s.cta.secondaryHref}
          />
        </div>
      </article>

      <ArticleFooter lang={lang} utmCampaign="ai-agent-fleet" />
    </ArticleLayout>
  )
}
