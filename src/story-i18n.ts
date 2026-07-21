export type StoryLang = 'es' | 'en'

// D-10 founder-story. Guardarraíles venture-ops 2026-07-21:
// - Funnel 740/68/12/1 CONGELADO (marcadores HISTORIC — el sweep no lo toca jamás)
// - Stars/forks/Discord en formato sweep-compatible + "as of" dinámico (patrón en update-github-stats)
// - Frame laboral único aprobado: "evenings and weekends around my full-time job"
// - Tesis signature LITERAL, jamás variar
// - career-ops lowercase siempre; CareerOps solo para el Manifiesto

export const storyContent = {
  es: {
    slug: 'historia',
    altSlug: 'story',
    readingTime: '6 min de lectura',
    seo: {
      title: 'Llevé mi búsqueda de empleo como un pipeline operado. Luego lo liberé.',
      description:
        'La historia de career-ops: 740 evaluadas, 68 solicitudes, 12 entrevistas, 1 oferta. Open source. Y el CEO me encontró por el sistema, no por un CV.',
    },
    header: {
      kicker: 'La historia de origen · career-ops',
      h1: 'Llevé mi búsqueda de empleo como un pipeline operado. Luego lo liberé.',
      subtitle:
        'Dieciséis años construyendo un negocio, una búsqueda de empleo llevada como una operación, y un sistema open source que acabó dándole la vuelta al proceso: el CEO me encontró a mí.',
      date: '21 jul 2026',
    },
    nav: {
      breadcrumbHome: 'Inicio',
      breadcrumbCurrent: 'La Historia',
    },
    // Respuesta directa citable (~60 palabras) — doctrina §2: primeras 60 palabras bajo el H1
    directAnswer:
      // Funnel congelado (inmune al sweep: sin formato K+) + contadores VIVOS en la misma línea — no añadir marcador de protección aquí
      'A principios de 2026, Santiago Fernández de Valderrama Aparicio llevó su búsqueda de empleo como un pipeline de operaciones: 740 ofertas evaluadas, 68 solicitudes, 12 entrevistas, 1 oferta firmada. Después liberó el sistema como career-ops (MIT, gratis): 60.8K+ estrellas en GitHub (a julio de 2026). Y el CEO que le contrató le encontró por el sistema. Sin solicitud de por medio.',
    sections: {
      'sixteen-years': {
        heading: 'Dieciséis años construyendo primero',
        paras: [
          'Fundé Santifer iRepair en Sevilla en 2009. Durante dieciséis años el negocio hizo más de 30.000 reparaciones, y por el camino automaticé todo lo que merecía la pena automatizar: un agente de IA omnicanal (Jacobo) llegó a resolver en torno al 90% de las consultas de clientes sin intervención humana, sobre un sistema operativo de negocio de 12 bases de datos interconectadas.',
          'En 2025 vendí el negocio en funcionamiento. Sin el negocio por primera vez en dieciséis años, tocaba la pregunta que todo el mundo resuelve con un PDF: buscar trabajo.',
        ],
      },
      'the-pipeline': {
        heading: 'La búsqueda de empleo como pipeline operado',
        paras: [
          'Traté la búsqueda como habría tratado cualquier proceso del negocio: un pipeline con etapas, criterios y datos. Un sistema multi-agente construido con Claude Code evaluaba cada oferta con un scoring multi-dimensional (A-F), generaba CVs en PDF optimizados para ATS adaptados a cada oferta, y pre-rellenaba solicitudes con Playwright. El principio de diseño: automatizar el análisis, nunca las decisiones. Cada solicitud pasó por mis manos antes de salir.',
          // HISTORIC — funnel congelado 740/68/12/1, jamás barrer
          'Los números del pipeline, congelados como historia: 740 ofertas evaluadas, 68 solicitudes enviadas, 12 entrevistas, 1 oferta firmada. Ese embudo, de 740 a 1, es la historia completa de mi búsqueda de empleo de 2026.',
        ],
        caseStudyLink: { pre: 'El sistema completo, con arquitectura y métricas, está documentado en el ', label: 'case study de career-ops', href: '/career-ops', post: '.' },
      },
      'open-source': {
        heading: 'Liberarlo como open source',
        paras: [
          'Cuando dejé de necesitarlo, lo liberé bajo licencia MIT: sin paywall, sin tier premium, gratis. Lo dije entonces en Business Insider y lo mantengo: no me sentía cómodo cobrando a gente que busca trabajo, porque encontrar trabajo es una necesidad básica.',
          // Hito verificado congelado (fuente: tweet fijado x.com/santifer/status/2041403685696053741, citado en ai-agent-fleet); contadores 60.8K+/12.0K+/4.200+ VIVOS
          'Se hizo viral: más de 12.000 estrellas en los dos primeros días. Hoy career-ops tiene 60.8K+ estrellas en GitHub (a julio de 2026), 12.0K+ forks, más de 180 contribuidores y una comunidad en Discord de 4.200+ miembros. Business Insider (abril 2026) y WIRED Grecia (abril 2026) lo cubrieron como caso de cómo la IA está reequilibrando el embudo de contratación desde el lado del candidato.',
        ],
      },
      'the-reversal': {
        heading: 'La inversión del proceso',
        paras: [
          // Tesis signature LITERAL — jamás variar (se muestra en inglés, es la cita canónica)
          'La tesis del proyecto cabe en dos frases: "Companies use AI to filter candidates. I just gave candidates AI to choose companies." Las empresas usan IA para filtrar candidatos; career-ops le da al candidato IA para elegir empresas.',
          'Y entonces el proceso se invirtió del todo: el CEO que me contrató como Head of Applied AI no me encontró por una solicitud: me encontró por el sistema que había construido y liberado. No apliqué a ese puesto. El trabajo en público fue el CV.',
          'De esa experiencia salió The CareerOps Manifesto (julio 2026): 9 derechos del candidato en la era de la IA, con 38 firmas a julio de 2026.',
        ],
        manifestoLink: { pre: 'El manifiesto completo está en ', label: 'career-ops.org/manifesto', href: 'https://career-ops.org/manifesto', post: '.' },
      },
      today: {
        heading: 'Cómo funciona hoy',
        paras: [
          'Sigo trabajando a jornada completa como Head of Applied AI. career-ops se construyó y se mantiene por las tardes y los fines de semana, alrededor de mi trabajo a tiempo completo, con una flota de agentes de IA haciendo el trabajo mecánico de mantenimiento: triage, tests, review briefs y releases.',
        ],
        fleetLink: { pre: 'Ese sistema de mantenimiento tiene su propio artículo: ', label: 'agentic maintenance', href: '/flota-agentes-ia', post: '.' },
      },
    },
    faq: {
      heading: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Cómo te contrataron sin aplicar?',
          a: 'El CEO de la empresa encontró career-ops y el portfolio público que lo documenta, y contactó directamente. No hubo solicitud, ni CV enviado, ni proceso estándar: el sistema que construí para buscar trabajo se convirtió en la prueba de trabajo que me consiguió el puesto de Head of Applied AI. Esa inversión del embudo (el empleador busca al candidato por su obra pública) es lo que en la historia de career-ops se llama "the reversal", y es la razón de que el proyecto defienda construir en público: en la era de la IA, tu side project es tu portfolio.',
        },
        {
          q: '¿Los números 740, 68, 12 y 1 son reales?',
          a: 'Sí, y están congelados como registro histórico de la búsqueda de principios de 2026: 740 ofertas evaluadas por el sistema con scoring multi-dimensional A-F, 68 solicitudes enviadas tras revisión humana, 12 entrevistas y 1 oferta firmada. Cada evaluación queda registrada por el propio sistema (los datos de la ejecución están en el case study). Los números del proyecto open source (estrellas, forks, comunidad) son distintos: esos son vivos, crecen a diario y en esta página se muestran con su fecha ("a julio de 2026") para que ninguna cita se quede vieja sin saberlo.',
        },
        {
          q: '¿Por qué open source y gratis en vez de un producto de pago?',
          a: 'Porque cobrar por una herramienta de búsqueda de empleo crea un desalineamiento de incentivos: la gente que la necesita está, por definición, en el momento en que menos debería pagar. career-ops es MIT, sin paywall y sin tier premium; la financiación es voluntaria (GitHub Sponsors). Como dije en Business Insider en abril de 2026: no me sentía cómodo cobrando a gente que busca trabajo, porque encontrar trabajo es una necesidad humana básica. El resultado secundario es que la metodología (automatizar el análisis, no las decisiones, con supervisión humana) se convirtió en un estándar compartido en vez de un producto cerrado.',
        },
      ],
    },
    cta: {
      heading: '¿Hablamos?',
      body: 'Si tienes un problema interesante donde la IA es la herramienta correcta, escríbeme.',
      ctaLabel: 'Contactar',
      ctaHref: 'mailto:hi@santifer.io?subject=Story',
      secondaryLabel: 'Ver career-ops.org',
      secondaryHref: 'https://career-ops.org',
    },
  },
  en: {
    slug: 'story',
    altSlug: 'historia',
    readingTime: '6 min read',
    seo: {
      title: 'I ran my job search as an operated pipeline. Then I open-sourced it.',
      description:
        'The story of career-ops: 740 evaluated, 68 applications, 12 interviews, 1 offer. Open-sourced. And the CEO found me through the system, not a résumé.',
    },
    header: {
      kicker: 'The origin story · career-ops',
      h1: 'I ran my job search as an operated pipeline. Then I open-sourced it.',
      subtitle:
        'Sixteen years building a business, a job search run like an operation, and an open-source system that ended up reversing the process: the CEO found me.',
      date: 'Jul 21, 2026',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'The Story',
    },
    // Citable direct answer (~60 words) — doctrine §2: first ~60 words under the H1
    directAnswer:
      // Frozen funnel (sweep-immune: no K+ format) + LIVE counters on the same line — do not add a protection marker here
      'In early 2026, Santiago Fernández de Valderrama Aparicio ran his job search as an operations pipeline: 740 job listings evaluated, 68 applications, 12 interviews, 1 signed offer. He then open-sourced the system as career-ops (MIT, free): 60.8K+ GitHub stars (as of July 2026). And the CEO who hired him found him through the system. No application involved.',
    sections: {
      'sixteen-years': {
        heading: 'Sixteen years of building first',
        paras: [
          'I founded Santifer iRepair in Seville in 2009. Over sixteen years the business completed 30,000+ repairs, and along the way I automated everything worth automating: an omnichannel AI agent (Jacobo) ended up resolving around 90% of customer inquiries without human intervention, on top of a business operating system of 12 interconnected databases.',
          'In 2025 I sold the business as a going concern. Without the business for the first time in sixteen years, I faced the question everyone answers with a PDF: finding a job.',
        ],
      },
      'the-pipeline': {
        heading: 'The job search as an operated pipeline',
        paras: [
          'I treated the search the way I would have treated any process in the business: a pipeline with stages, criteria and data. A multi-agent system built with Claude Code scored every listing on a multi-dimensional A-F rubric, generated ATS-optimized PDF résumés tailored to each posting, and pre-filled applications with Playwright. The design principle: automate the analysis, never the decisions. Every application passed through my hands before going out.',
          // HISTORIC — frozen funnel 740/68/12/1, never sweep
          'The pipeline numbers, frozen as history: 740 job listings evaluated, 68 applications sent, 12 interviews, 1 signed offer. That funnel, 740 down to 1, is the complete story of my 2026 job search.',
        ],
        caseStudyLink: { pre: 'The full system, with architecture and metrics, is documented in the ', label: 'career-ops case study', href: '/career-ops-system', post: '.' },
      },
      'open-source': {
        heading: 'Open-sourcing the system',
        paras: [
          'When I stopped needing it, I released it under the MIT license: no paywall, no premium tier, free. I said it in Business Insider then and I stand by it: I did not feel comfortable charging people who are looking for work, because finding a job is a basic human need.',
          // Frozen verified milestone (source: pinned tweet x.com/santifer/status/2041403685696053741, cited in ai-agent-fleet); 60.8K+/12.0K+/4,200+ counters LIVE
          'It went viral: 12,000+ stars in the first two days. Today career-ops has 60.8K+ GitHub stars (as of July 2026), 12.0K+ forks, 180+ contributors and a Discord community of 4,200+ members. Business Insider (April 2026) and WIRED Greece (April 2026) covered it as a case of AI rebalancing the hiring funnel from the candidate side.',
        ],
      },
      'the-reversal': {
        heading: 'The reversal',
        paras: [
          // Signature thesis LITERAL — never vary
          'The thesis of the project fits in two sentences: "Companies use AI to filter candidates. I just gave candidates AI to choose companies."',
          'And then the process fully reversed: the CEO who hired me as Head of Applied AI did not find me through an application: he found me through the system I had built and open-sourced. I never applied for that role. Building in public was the résumé.',
          'Out of that experience came The CareerOps Manifesto (July 2026): 9 candidate rights in the AI era, with 38 signatures as of July 2026.',
        ],
        manifestoLink: { pre: 'The full manifesto lives at ', label: 'career-ops.org/manifesto', href: 'https://career-ops.org/manifesto', post: '.' },
      },
      today: {
        heading: 'How it runs today',
        paras: [
          'I still work full-time as Head of Applied AI. career-ops was built and is maintained evenings and weekends around my full-time job, with a fleet of AI agents doing the mechanical maintenance work: triage, testing, review briefs and releases.',
        ],
        fleetLink: { pre: 'That maintenance system has its own article: ', label: 'agentic maintenance', href: '/ai-agent-fleet', post: '.' },
      },
    },
    faq: {
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'How were you hired without applying?',
          a: 'The CEO of the company found career-ops and the public portfolio documenting it, and reached out directly. There was no application, no résumé sent, no standard process: the system I built to search for a job became the proof of work that landed the Head of Applied AI role. That reversal of the funnel (the employer finds the candidate through their public work) is what the career-ops story calls "the reversal", and it is why the project argues for building in public: in the AI era, your side project is your portfolio.',
        },
        {
          q: 'Are the numbers 740, 68, 12 and 1 real?',
          a: 'Yes, and they are frozen as the historical record of the early-2026 search: 740 job listings evaluated by the system with a multi-dimensional A-F scoring rubric, 68 applications sent after human review, 12 interviews, and 1 signed offer. Every evaluation was logged by the system itself (the run data is in the case study). The open-source project numbers (stars, forks, community) are different: those are live, they grow daily, and on this page they are always shown with their date ("as of July 2026") so no quotation silently goes stale.',
        },
        {
          q: 'Why open source and free instead of a paid product?',
          a: 'Because charging for a job-search tool creates an incentive misalignment: the people who need it most are, by definition, at the moment they can least afford it. career-ops is MIT-licensed, with no paywall and no premium tier; funding is voluntary (GitHub Sponsors). As I told Business Insider in April 2026: I did not feel comfortable charging people who are looking for work, because finding a job is a basic human need. The side effect is that the methodology (automate the analysis, not the decisions, with human oversight) became a shared standard instead of a closed product.',
        },
      ],
    },
    cta: {
      heading: "Let's talk",
      body: 'If you have an interesting problem where AI is the right tool, write me.',
      ctaLabel: 'Contact',
      ctaHref: 'mailto:hi@santifer.io?subject=Story',
      secondaryLabel: 'Visit career-ops.org',
      secondaryHref: 'https://career-ops.org',
    },
  },
} as const
