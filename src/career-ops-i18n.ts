export type CareerOpsLang = 'es' | 'en'

export const careerOpsContent = {
  es: {
    slug: 'career-ops',
    altSlug: 'career-ops-system',
    readingTime: '18 min de lectura',
    seo: {
      title: 'Career-Ops: Agente IA que Automatiza Mi Búsqueda de Empleo',
      description: 'Case study: agente IA multi-agente que evalúa ofertas en 10 dimensiones, crea CV con IA personalizados por oferta y automatiza aplicaciones. 631 evaluaciones.',
    },
    nav: {
      breadcrumbHome: 'Inicio',
      breadcrumbCurrent: 'Career-Ops',
    },
    header: {
      kicker: 'Case Study: De proyecto personal a 37.6K+ stars',
      h1: 'Career-Ops: Cómo un Agente IA Automatizó Mi Búsqueda de Empleo',
      subtitle: 'Construí un sistema multi-agente para automatizar mi búsqueda de empleo. Funcionó: ahora soy Head of Applied AI. Luego lo abrí como open source y se hizo viral — 37.6K+ estrellas en GitHub.',
      badge: 'Misión cumplida',
      date: '17 mar 2026',
    },
    heroMetrics: [
      { value: '631', label: 'Evaluaciones' },
      { value: '302', label: 'Apps procesadas' },
      { value: '12', label: 'Modos' },
      { value: '10', label: 'Dimensiones' },
      { value: '680', label: 'URLs dedup' },
    ],
    tldr: 'Un sistema multi-agente construido con Claude Code que automatiza la búsqueda de empleo: evalúa ofertas con scoring de 10 dimensiones (A-F), genera PDFs ATS-optimized personalizados, rellena formularios vía Playwright y procesa en batch con workers paralelos. HITL: la IA analiza, yo decido. Open source bajo MIT — 37.6K+ estrellas, 1.600+ en Discord.',
    manifesto: 'Companies use AI to filter candidates. I just gave candidates AI to choose companies.',
    metaCallout: 'La ironía: construí un sistema multi-agente para buscar trabajo en multi-agente. El sistema demostró las competencias que los puestos pedían — mejor que cualquier entrevista. Y no, no es hacer trampa: Career-Ops automatiza el análisis, no la decisión.',
    closingCallback: 'El sistema demostró lo que cualquier entrevista no podía: en la era IA, lo que construyes con IA es el CV que te contrata.',
    internalLinks: {
      chatbot: {
        text: 'El Chatbot Que Se Cura Solo | Case Study',
        href: '/chatbot-que-se-cura-solo',
      },
      jacobo: {
        text: 'Agente IA Jacobo | Case Study',
        href: '/agente-ia-jacobo',
      },
      businessOs: {
        text: 'Business OS | Case Study',
        href: '/business-os-para-airtable',
      },
      pseo: {
        text: 'SEO Programático | Case Study',
        href: '/seo-programatico',
      },
    },
    sections: {
      intro: {
        hook: 'Construí un sistema de IA para buscar trabajo. Funcionó — ahora soy Head of Applied AI. Luego lo publiqué en GitHub y explotó: 37.6K+ estrellas, viral, artículos en Francia, China y Corea. La primera semana buscando trabajo en IA lo hice todo manual. La segunda semana ya no aplicaba — estaba construyendo Career-Ops.',
        body: '631 evaluaciones después, Career-Ops filtraba mejor que yo. Un AI job search tool construido como multi-agent system: lee ofertas, las puntúa en 10 dimensiones, genera CV personalizados y prepara aplicaciones. Yo revisaba y decidía. La IA hacía el trabajo analítico. El sistema demostró exactamente las competencias que los puestos pedían — y eso no pasó desapercibido.',
      },
      theProblem: {
        heading: '¿Por Qué Necesité Automatizar Mi Búsqueda de Empleo?',
        body: 'Buscar trabajo como ingeniero senior en IA es un trabajo a jornada completa. Cada oferta exige leer la JD, mapear tus skills contra los requisitos, adaptar el CV, escribir respuestas personalizadas y rellenar formularios de 15 campos. Multiplica eso por 10 ofertas al día.',
        painPoints: [
          { label: 'Lectura repetitiva.', detail: 'El 70% de las ofertas no encajan. Lo descubres después de leer 800 palabras de JD.' },
          { label: 'CVs genéricos.', detail: 'Un PDF estático no puede destacar los proof points relevantes para cada oferta.' },
          { label: 'Formularios manuales.', detail: 'Cada plataforma pide lo mismo en formatos distintos. Copiar y pegar 15 veces por aplicación.' },
          { label: 'Tracking inexistente.', detail: 'Sin sistema, olvidas dónde aplicaste. Duplicas esfuerzo o pierdes el seguimiento.' },
          { label: 'Feedback zero.', detail: 'Aplicas, esperas, y no sabes si el problema era el fit, el CV o el timing.' },
          { label: 'Mercado global.', detail: 'El sector AI se mueve a nivel internacional. Los referrals locales no escalan cuando aplicas a empresas en 6 países distintos.' },
        ],
        punchline: 'No es que sea difícil. Es que es repetitivo. Y lo repetitivo se automatiza.',
      },
      architecture: {
        heading: '¿Cómo Funciona el Sistema Multi-Agente?',
        body: 'Career-Ops no es un script ni un bot de auto-apply. Es un sistema multi-agente con 12 modos operativos, cada uno un skill file de Claude Code con su propio contexto, reglas y herramientas. Un agente IA que razona sobre el dominio del problema y ejecuta la acción correcta.',
        whyModes: {
          heading: 'Por Qué Modos, No Un Prompt',
          items: [
            { label: 'Contexto preciso.', detail: 'Cada modo carga solo la información que necesita. auto-pipeline no carga reglas de contacto. apply no carga lógica de scoring.' },
            { label: 'Testabilidad.', detail: 'Un modo se prueba de forma aislada. Cambiar la lógica de PDFs no toca la evaluación.' },
            { label: 'Evolución independiente.', detail: 'Añadir un modo nuevo no rompe los existentes. Training se añadió 3 semanas después del primer deploy.' },
          ],
        },
        modes: [
          { name: 'auto-pipeline', desc: 'Pipeline completo: extraer JD, evaluar A-F, generar report, PDF y tracker.' },
          { name: 'oferta', desc: 'Evaluación individual con 6 bloques: resumen, CV match, nivel, compensación, personalización, entrevista.' },
          { name: 'ofertas', desc: 'Comparación y ranking de múltiples ofertas.' },
          { name: 'pdf', desc: 'PDF ATS-optimized personalizado por oferta con proof points y keywords.' },
          { name: 'pipeline', desc: 'Procesamiento batch de URLs desde inbox.' },
          { name: 'scan', desc: 'Descubrimiento de ofertas: navega portales de empleo y páginas de careers de empresas target. Muchas ofertas no aparecen en agregadores.' },
          { name: 'batch', desc: 'Processing paralelo con conductor + workers. 122 URLs en cola simultánea.' },
          { name: 'apply', desc: 'Form-filling interactivo con Playwright. Lee la página, recupera evaluación y genera respuestas.' },
          { name: 'contacto', desc: 'Helper de outreach para LinkedIn.' },
          { name: 'deep', desc: 'Research profundo de empresas.' },
          { name: 'tracker', desc: 'Dashboard de estado de aplicaciones.' },
          { name: 'training', desc: 'Evalúa cursos y certificaciones contra el North Star.' },
        ],
      },
      scoring: {
        heading: '¿Cómo Evalúa Career-Ops Cada Oferta?',
        body: 'Cada oferta pasa por un framework de evaluación con 10 dimensiones ponderadas. El resultado es un score numérico (1-5) y un grade A-F. No todas las dimensiones pesan igual — Role Match y Skills Alignment son gate-pass: si fallan, el score final cae.',
        dimensions: {
          headers: ['Dimensión', 'Qué Mide', 'Peso'],
          rows: [
            ['Role Match', 'Alineación entre requisitos y proof points del CV', 'Gate-pass'],
            ['Skills Alignment', 'Overlap de stack técnico', 'Gate-pass'],
            ['Seniority', 'Nivel de stretch y negociabilidad', 'Alto'],
            ['Compensation', 'Market rate vs target', 'Alto'],
            ['Geographic', 'Remote/hybrid/onsite factibilidad', 'Medio'],
            ['Company Stage', 'Startup/growth/enterprise fit', 'Medio'],
            ['Product-Market Fit', 'Resonancia del dominio del problema', 'Medio'],
            ['Growth Trajectory', 'Visibilidad de carrera', 'Medio'],
            ['Interview Likelihood', 'Probabilidad de callback', 'Alto'],
            ['Timeline', 'Velocidad de cierre y urgencia', 'Bajo'],
          ],
        },
        distribution: {
          heading: 'Distribución de Scores',
          items: [
            { value: '21', label: 'Score >= 4.5 (A)' },
            { value: '52', label: 'Score 4.0-4.4 (B)' },
            { value: '71', label: 'Score 3.0-3.9 (C)' },
            { value: '51', label: 'Score < 3.0 (D-F)' },
          ],
        },
        callout: 'El 74% de las ofertas evaluadas no pasan del score 4.0. Sin el sistema, habría invertido horas leyendo JDs que no encajan.',
      },
      pipeline: {
        heading: '¿Qué Pasa Desde que Entra una URL Hasta que Sale el CV?',
        body: 'auto-pipeline es el modo estrella. Una URL entra, y sale un report de evaluación, un PDF personalizado y una línea en el tracker. Zero intervención manual hasta la revisión final.',
        steps: [
          { label: 'Extraer JD.', detail: 'Playwright navega a la URL, extrae el contenido estructurado de la oferta.' },
          { label: 'Evaluar 10D.', detail: 'Claude lee JD + CV + portfolio y genera scoring en las 10 dimensiones.' },
          { label: 'Generar report.', detail: 'Markdown con 6 bloques: resumen ejecutivo, CV match, nivel, compensación, personalización y probabilidad de entrevista.' },
          { label: 'Generar PDF.', detail: 'HTML template + keyword injection + adaptive framing. Puppeteer renderiza a PDF.' },
          { label: 'Registrar tracker.', detail: 'TSV con company, role, score, grade, URL. Auto-merge vía script Node.js.' },
          { label: 'Dedup.', detail: 'Comprueba scan-history.tsv (680 URLs) y applications.md. Zero re-evaluaciones.' },
        ],
        batch: {
          heading: 'Batch Processing',
          body: 'Para volumen alto, el modo batch lanza un conductor que orquesta workers paralelos. Cada worker es un proceso Claude Code independiente con 200K de contexto. El conductor gestiona la cola, trackea progreso y fusiona resultados.',
          metrics: [
            { value: '122', label: 'URLs en cola' },
            { value: '200K', label: 'Contexto/worker' },
            { value: '2x', label: 'Retries por fallo' },
          ],
          details: 'Fault-tolerant: un fallo en un worker no bloquea el resto. Lock file previene doble ejecución. Batch resumible — lee el estado y salta los completados.',
        },
      },
      pdf: {
        heading: '¿Cómo Genera Career-Ops un CV Personalizado por Oferta?',
        body: 'Un CV genérico pierde. Career-Ops crea CV con IA: genera un PDF distinto para cada oferta, inyectando keywords de la JD y reordenando la experiencia por relevancia. No es un template: es un CV optimizado para ATS construido desde los proof points del CV real.',
        steps: [
          { label: 'Extraer 15-20 keywords de la JD.', detail: 'Las keywords aterrizan en el summary, primera bullet de cada rol y sección de skills.' },
          { label: 'Detectar idioma.', detail: 'JD en inglés genera CV en inglés. JD en español genera CV en español.' },
          { label: 'Detectar región.', detail: 'Empresa en EEUU genera formato Letter. Europa genera A4.' },
          { label: 'Detectar arquetipo.', detail: '6 archetypes del North Star. El summary cambia según el perfil.' },
          { label: 'Seleccionar proyectos.', detail: 'Top 3-4 por relevancia. Jacobo para roles de agentes. Business OS para ERP/automation.' },
          { label: 'Reordenar bullets.', detail: 'La experiencia más relevante sube. El resto baja, no desaparece.' },
          { label: 'Renderizar PDF.', detail: 'Puppeteer convierte HTML a PDF. Fonts self-hosted, single-column ATS-safe.' },
        ],
        archetypes: {
          heading: '6 Arquetipos',
          headers: ['Arquetipo', 'Proof Point Principal'],
          rows: [
            ['AI Platform / LLMOps', 'Self-Healing Chatbot (71 evals, closed-loop)', '/chatbot-que-se-cura-solo'],
            ['Agentic Workflows', 'Jacobo (4 agentes, 80h/mes automatizadas)', '/agente-ia-jacobo'],
            ['Technical AI PM', 'Business OS (2,100 campos, 50 automations)', '/business-os-para-airtable'],
            ['AI Solutions Architect', 'pSEO (4,730 páginas, 10.8x tráfico)', '/seo-programatico'],
            ['AI FDE', 'Jacobo (vendido, operando en producción)', '/agente-ia-jacobo'],
            ['AI Transformation Lead', 'Exit 2025 (16 años, comprador mantiene sistemas)', ''],
          ],
        },
        callout: 'El mismo CV. 6 framings distintos. Todo real — las keywords se reformulan, nunca se inventan.',
      },
      beforeAfter: {
        heading: 'Antes y Después',
        headers: ['Dimensión', 'Manual', 'Career-Ops'],
        rows: [
          ['Evaluación', 'Leer JD, mapeo mental', '10D scoring automático, grade A-F'],
          ['CV', 'PDF genérico', 'PDF personalizado, ATS-optimized'],
          ['Aplicación', 'Formulario manual', 'Playwright auto-fill'],
          ['Tracking', 'Spreadsheet o nada', 'TSV + dedup automático'],
          ['Discovery', 'LinkedIn alerts', 'Scanner: portales + careers pages de empresas target'],
          ['Batch', 'Una a una', '122 URLs en paralelo'],
          ['Dedup', 'Memoria humana', '680 URLs deduplicadas'],
        ],
      },
      results: {
        heading: '¿Qué Resultados Ha Conseguido Career-Ops?',
        body: 'El resultado más importante: conseguí el trabajo. Ahora soy Head of Applied AI. Career-Ops evaluó 631 ofertas, generó 354 PDFs personalizados y filtró el ruido para que yo pudiera centrarme en las oportunidades que realmente encajaban.',
        metrics: [
          { value: '631', label: 'Reports generados' },
          { value: '35K+', label: 'GitHub stars' },
          { value: '354', label: 'PDFs generados' },
          { value: '2,600+', label: 'Upvotes r/ClaudeAI' },
        ],
        aftermath: {
          heading: '¿Qué Pasó Después?',
          body: 'Cuando dejé de necesitar Career-Ops, lo publiqué en GitHub. En una semana pasó de repositorio privado a viral — 37.6K+ estrellas, 5K+ forks, y artículos en blogs de Francia, China y Corea que no me conocían de nada. Se formó una comunidad de más de 1.600 personas en Discord que se ayudan entre ellas a configurar y adaptar el sistema. El proyecto acabó demostrando más competencias que cualquier proceso de selección.',
          highlights: [
            { value: '35K+', label: 'GitHub stars en 1 semana' },
            { value: '5K+', label: 'Forks' },
            { value: '4', label: 'Idiomas (EN, FR, ZH, KO)' },
            { value: '6', label: 'Países con cobertura' },
          ],
        },
      },
      stack: {
        heading: 'Stack',
        items: [
          { name: 'Claude Code', role: 'Agente LLM: razonamiento, evaluación, generación de contenido' },
          { name: 'Playwright', role: 'Browser automation: scan de portales y form-filling' },
          { name: 'Puppeteer', role: 'Renderizado PDF desde HTML templates' },
          { name: 'Node.js', role: 'Scripts auxiliares: merge-tracker, cv-sync-check, generate-pdf' },
          { name: 'tmux', role: 'Sesiones paralelas: conductor + workers en batch' },
        ],
      },
      lessons: {
        heading: 'Lecciones',
        items: [
          {
            title: 'Automatiza el análisis, no la decisión',
            detail: 'Career-Ops evalúa 631 ofertas. Yo decido en cuáles invertir tiempo. El HITL no es una limitación — es el diseño. La IA descarta el ruido, el humano aporta el criterio.',
          },
          {
            title: 'Los modos son mejores que un prompt largo',
            detail: '12 modos con contexto preciso funcionan mejor que un sistema prompt de 10,000 tokens. Cada modo carga solo lo que necesita. Menos contexto = mejores decisiones.',
          },
          {
            title: 'El dedup es más valioso que el scoring',
            detail: '680 URLs deduplicadas significan 680 evaluaciones que no tuve que repetir. El dedup ahorra más tiempo que cualquier optimización de scoring.',
          },
          {
            title: 'El CV es un argumento, no un documento',
            detail: 'Un PDF genérico no convence a nadie. Un CV que reorganiza los proof points por relevancia, inyecta las keywords correctas y adapta el framing al arquetipo — ese CV sí convierte.',
          },
          {
            title: 'Batch > secuencial, siempre',
            detail: 'El modo batch con workers paralelos procesa 122 URLs mientras yo hago otra cosa. La inversión en orquestación paralela se paga en la primera ejecución.',
          },
          {
            title: 'El sistema ES el portfolio',
            detail: 'Construir un sistema multi-agente para buscar trabajo en multi-agente es la prueba más directa de competencia. No necesito explicar que sé hacer esto — lo estoy usando.',
          },
          {
            title: 'Abre el código cuando ya no lo necesites',
            detail: 'Career-Ops fue privado mientras lo usaba. Cuando conseguí el trabajo, lo publiqué. En una semana tenía 37.6K estrellas. La lección: el mejor momento para abrir un proyecto es cuando ya demostró su valor en producción real.',
          },
          {
            title: 'Por qué lo mantengo MIT',
            detail: 'MIT license. Sin dark patterns, sin upsell dentro del CLI, sin feature gating. Si funciona para ti, funciona. Si quieres apoyar el mantenimiento o entrar en la comunidad, puedes. Pero el tool no depende de eso.',
          },
        ],
      },
      cta: {
        sidebarLabel: 'Pruébalo',
        heading: 'Aquí lo tienes',
        body: 'Career-Ops es open source bajo MIT. Clónalo, adáptalo, haz lo que necesites — es tuyo.',
        ctaLabel: 'Prueba career-ops',
        ctaHref: 'https://career-ops.org?utm_source=santifer.io&utm_medium=case-study&utm_campaign=career-ops-deep-dive',
        ctaSecondaryLabel: 'Ver el código en GitHub',
        ctaSecondaryHref: 'https://github.com/santifer/career-ops',
        communityHeading: '¿Dudas? Pregunta a la comunidad',
        communityBody: '1.600+ builders ya usan Career-Ops y comparten tips, plantillas y configuraciones en Discord.',
        communityLabel: 'Únete al Discord',
        communityHref: 'https://discord.gg/8pRpHETxa4',
      },
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'Esto no es hacer trampa?',
          a: 'Career-Ops automatiza el análisis, no la decisión. Leo cada report antes de aplicar. Reviso cada PDF antes de enviarlo. Es la misma filosofía que un CRM: el sistema organiza, yo decido.',
        },
        {
          q: 'Por qué Claude Code y no un pipeline de scripts?',
          a: 'Un script no razona. Career-Ops adapta el scoring según el contexto de la empresa, reformula keywords sin inventar y genera reports narrativos — no templates rellenados.',
        },
        {
          q: 'Cuanto cuesta ejecutar esto?',
          a: 'Cero coste marginal por evaluación. Career-Ops corre sobre mi plan Claude Max 20x ($200/mes), que uso para todo: portfolio, chatbot, artículos y Career-Ops. 631 evaluaciones sin un solo invoice extra.',
        },
        {
          q: 'El modo apply rellena formularios automáticamente?',
          a: 'Lee la página con Playwright, recupera la evaluación cacheada y genera respuestas coherentes con el scoring. Yo reviso antes de enviar — siempre.',
        },
        {
          q: 'Qué pasa cuando el scanner encuentra una oferta duplicada?',
          a: 'scan-history.tsv almacena 680 URLs vistas. Dedup por URL exacta + match normalizado de company+role en applications.md. Zero re-evaluaciones.',
        },
        {
          q: 'Es replicable?',
          a: 'Sí — es open source. La landing oficial es career-ops.org (docs, AI chat y guías) y el código vive en github.com/santifer/career-ops. Requiere Claude Code con acceso a Playwright. Los skill files definen la lógica de cada modo. 37K+ personas ya lo han visto, forkeado o adaptado.',
        },
        {
          q: 'Cómo se usa Career-Ops?',
          a: 'Career-Ops es una herramienta local que se ejecuta desde tu terminal con Claude Code. Clonas el repositorio, configuras tu CV y preferencias, y lanzas modos según lo que necesites: auto-pipeline para evaluar una oferta de principio a fin, scan para descubrir ofertas en portales, batch para procesar muchas URLs en paralelo, o pdf para generar un CV personalizado. Todo se ejecuta en tu máquina — tu CV y datos personales nunca salen de tu ordenador. Si necesitas ayuda, la comunidad de 1.000+ personas está en Discord: discord.gg/8pRpHETxa4',
        },
        {
          q: 'Qué necesito para ejecutar Career-Ops?',
          a: 'Claude Code con un plan que incluya acceso a herramientas (Claude Max o Claude Pro). Playwright para navegación web. Node.js para scripts auxiliares como merge de tracker y generación de PDFs con Puppeteer. Un directorio de trabajo con tu CV en markdown y tus preferencias. No necesitas servidores, bases de datos ni APIs externas — todo corre en local. La comunidad en Discord (discord.gg/8pRpHETxa4) puede ayudarte con la configuración.',
        },
        {
          q: 'Qué tipo de IA usa Career-Ops?',
          a: 'Career-Ops no es un chatbot ni un wrapper de API. Es un sistema multi-agente donde Claude Code actúa como cerebro: razona sobre cada oferta, evalúa el fit contra tu perfil en 10 dimensiones, y toma decisiones de filtrado. Cada uno de los 12 modos es un skill file con su propio contexto y reglas. Para navegación web usa Playwright. Para PDFs usa Puppeteer. El procesamiento batch lanza workers paralelos en tmux. No hay fine-tuning ni modelos custom — es Claude estándar con contexto muy preciso.',
        },
        {
          q: 'Quién creó Career-Ops?',
          a: 'Lo creé yo, Santiago Fernández de Valderrama (santifer). Lo construí para mi propia búsqueda de empleo en IA — después de 16 años fundando y vendiendo un negocio de reparación de móviles. El sistema evaluó 631 ofertas y me ayudó a conseguir mi rol actual como Head of Applied AI. Cuando dejé de necesitarlo, lo publiqué como open source. En una semana llegó a 37.6K+ estrellas en GitHub. La comunidad en Discord ya supera las 1.600 personas: discord.gg/8pRpHETxa4',
        },
      ],
    },
  },
  en: {
    slug: 'career-ops-system',
    altSlug: 'career-ops',
    readingTime: '18 min read',
    seo: {
      title: 'Career-Ops: How I Built My Own AI Job Search Tool',
      description: 'Case study: AI job search tool built as a multi-agent system. AI resume builder, 10D scoring, automated job application with HITL. 631 evaluations.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Career-Ops',
    },
    header: {
      kicker: 'Case Study: From side project to 37.6K+ stars',
      h1: 'Career-Ops: How I Built an AI Job Search System That Got Me Hired',
      subtitle: 'I built a multi-agent system to automate my job search. It worked — I am now Head of Applied AI. Then I open-sourced it and it went viral — 37.6K+ GitHub stars.',
      badge: 'Mission accomplished',
      date: 'Mar 17, 2026',
    },
    heroMetrics: [
      { value: '631', label: 'Evaluations' },
      { value: '302', label: 'Apps processed' },
      { value: '12', label: 'Modes' },
      { value: '10', label: 'Dimensions' },
      { value: '680', label: 'URLs deduped' },
    ],
    tldr: 'A multi-agent system built with Claude Code that automates the job search: scores offers across 10 dimensions (A-F), generates ATS-optimized PDFs per offer, fills forms via Playwright, and batch-processes with parallel workers. HITL design: AI analyzes, I decide. Open source under MIT — 37.6K+ stars, 1,600+ on Discord.',
    manifesto: 'Companies use AI to filter candidates. I just gave candidates AI to choose companies.',
    metaCallout: 'The irony: I built a multi-agent system to search for multi-agent roles. The system demonstrated the competencies better than any interview could. And no, it is not gaming the system: Career-Ops automates analysis, not decisions.',
    closingCallback: 'The system proved what no interview could: in the AI era, what you build with AI is the resume that gets you hired.',
    internalLinks: {
      chatbot: {
        text: 'The Self-Healing Chatbot | Case Study',
        href: '/self-healing-chatbot',
      },
      jacobo: {
        text: 'AI Agent Jacobo | Case Study',
        href: '/ai-agent-jacobo',
      },
      businessOs: {
        text: 'Business OS | Case Study',
        href: '/business-os-for-airtable',
      },
      pseo: {
        text: 'Programmatic SEO | Case Study',
        href: '/programmatic-seo',
      },
    },
    sections: {
      intro: {
        hook: 'I built an AI system to search for a job. It worked — I am now Head of Applied AI. Then I published it on GitHub and it exploded: 37.6K+ stars, viral, articles in France, China, and Korea. Week one of my AI job search was all manual. By week two I had stopped applying — I was building Career-Ops.',
        body: '631 evaluations later, Career-Ops was filtering better than I was. An AI-powered job search tool built as a multi-agent system: reads job descriptions, scores them across 10 dimensions, generates personalized resumes, and prepares applications. I reviewed and decided. The AI did the analytical work. The system demonstrated exactly the competencies the target roles required — and that did not go unnoticed.',
      },
      theProblem: {
        heading: 'Why Did I Need to Automate My Job Search?',
        body: 'Searching for senior AI engineering roles is a full-time job in itself. Each offer requires reading the JD, mapping your skills against requirements, adapting the CV, writing personalized responses, and filling 15-field forms. Multiply that by 10 offers per day.',
        painPoints: [
          { label: 'Repetitive reading.', detail: '70% of offers are a poor fit. You find out after reading 800 words of JD.' },
          { label: 'Generic CVs.', detail: 'A static PDF cannot highlight the proof points relevant to each specific offer.' },
          { label: 'Manual forms.', detail: 'Every platform asks the same questions in different formats. Copy-paste 15 times per application.' },
          { label: 'No tracking.', detail: 'Without a system, you forget where you applied. Duplicate effort or lose follow-up entirely.' },
          { label: 'Zero feedback.', detail: 'Apply, wait, and never know if the problem was fit, the CV, or timing.' },
          { label: 'Global market.', detail: 'The AI sector moves internationally. Local referrals do not scale when you apply to companies across 6 different countries.' },
        ],
        punchline: 'The work is not hard. It is repetitive. And repetitive work gets automated.',
      },
      architecture: {
        heading: 'How Does the Multi-Agent System Work?',
        body: 'Career-Ops is not a script or an auto-apply bot. It is a multi-agent system with 12 operational modes, each a Claude Code skill file with its own context, rules, and tools. An agent that reasons about the problem domain and executes the right action.',
        whyModes: {
          heading: 'Why Modes, Not One Prompt',
          items: [
            { label: 'Precise context.', detail: 'Each mode loads only the information it needs. auto-pipeline skips contact rules. apply skips scoring logic.' },
            { label: 'Testability.', detail: 'One mode gets tested in isolation. Changing PDF logic never touches evaluation.' },
            { label: 'Independent evolution.', detail: 'Adding a new mode never breaks existing ones. Training mode shipped 3 weeks after first deploy.' },
          ],
        },
        modes: [
          { name: 'auto-pipeline', desc: 'Full pipeline: extract JD, evaluate A-F, generate report, PDF, and tracker entry.' },
          { name: 'oferta', desc: 'Single-offer evaluation with 6 blocks: summary, CV match, level, compensation, personalization, interview.' },
          { name: 'ofertas', desc: 'Multi-offer comparison and ranking.' },
          { name: 'pdf', desc: 'ATS-optimized PDF personalized per offer with proof points and keywords.' },
          { name: 'pipeline', desc: 'Batch URL processing from inbox.' },
          { name: 'scan', desc: 'Offer discovery: navigates job boards and careers pages of target companies. Many offers never appear on aggregators.' },
          { name: 'batch', desc: 'Parallel processing with conductor + workers. 122 simultaneous URLs in queue.' },
          { name: 'apply', desc: 'Interactive form-filling with Playwright. Reads the page, retrieves cached evaluation, generates responses.' },
          { name: 'contacto', desc: 'LinkedIn outreach helper.' },
          { name: 'deep', desc: 'Deep company research.' },
          { name: 'tracker', desc: 'Application status dashboard.' },
          { name: 'training', desc: 'Evaluates courses and certifications against the North Star.' },
        ],
      },
      scoring: {
        heading: 'How Does Career-Ops Evaluate Each Job Offer?',
        body: 'Every offer runs through an evaluation framework with 10 weighted dimensions. The output: a numeric score (1-5) and an A-F grade. Not all dimensions carry equal weight — Role Match and Skills Alignment are gate-pass: if they fail, the final score drops.',
        dimensions: {
          headers: ['Dimension', 'What It Measures', 'Weight'],
          rows: [
            ['Role Match', 'Alignment between requirements and CV proof points', 'Gate-pass'],
            ['Skills Alignment', 'Tech stack overlap', 'Gate-pass'],
            ['Seniority', 'Stretch level and negotiability', 'High'],
            ['Compensation', 'Market rate vs target', 'High'],
            ['Geographic', 'Remote/hybrid/onsite feasibility', 'Medium'],
            ['Company Stage', 'Startup/growth/enterprise fit', 'Medium'],
            ['Product-Market Fit', 'Problem domain resonance', 'Medium'],
            ['Growth Trajectory', 'Career ladder visibility', 'Medium'],
            ['Interview Likelihood', 'Callback probability', 'High'],
            ['Timeline', 'Closing speed and hiring urgency', 'Low'],
          ],
        },
        distribution: {
          heading: 'Score Distribution',
          items: [
            { value: '21', label: 'Score >= 4.5 (A)' },
            { value: '52', label: 'Score 4.0-4.4 (B)' },
            { value: '71', label: 'Score 3.0-3.9 (C)' },
            { value: '51', label: 'Score < 3.0 (D-F)' },
          ],
        },
        callout: '74% of evaluated offers score below 4.0. Without the system, I would have spent hours reading JDs that never fit.',
      },
      pipeline: {
        heading: 'What Happens From URL Input to Generated Resume?',
        body: 'auto-pipeline is the flagship mode. A URL goes in, and out comes an evaluation report, a personalized PDF, and a tracker entry. Zero manual intervention until final review.',
        steps: [
          { label: 'Extract JD.', detail: 'Playwright navigates to the URL, extracts structured content from the offer.' },
          { label: 'Evaluate 10D.', detail: 'Claude reads JD + CV + portfolio and generates scoring across all 10 dimensions.' },
          { label: 'Generate report.', detail: 'Markdown with 6 blocks: executive summary, CV match, level, compensation, personalization, and interview probability.' },
          { label: 'Generate PDF.', detail: 'HTML template + keyword injection + adaptive framing. Puppeteer renders to PDF.' },
          { label: 'Register tracker.', detail: 'TSV with company, role, score, grade, URL. Auto-merge via Node.js script.' },
          { label: 'Dedup.', detail: 'Checks scan-history.tsv (680 URLs) and applications.md. Zero re-evaluations.' },
        ],
        batch: {
          heading: 'Batch Processing',
          body: 'For high volume, batch mode launches a conductor that orchestrates parallel workers. Each worker is an independent Claude Code process with 200K context. The conductor manages the queue, tracks progress, and merges results.',
          metrics: [
            { value: '122', label: 'URLs in queue' },
            { value: '200K', label: 'Context/worker' },
            { value: '2x', label: 'Retries per failure' },
          ],
          details: 'Fault-tolerant: a worker failure never blocks the rest. Lock file prevents double execution. Batch is resumable — reads state and skips completed items.',
        },
      },
      pdf: {
        heading: 'How Does Career-Ops Generate a Personalized Resume?',
        body: 'A generic CV loses. Career-Ops works as an AI resume builder that generates a different ATS-optimized resume for each offer, injecting JD keywords and reordering experience by relevance. Not a template: a resume built from real CV proof points.',
        steps: [
          { label: 'Extract 15-20 keywords from the JD.', detail: 'Keywords land in the summary, first bullet of each role, and skills section.' },
          { label: 'Detect language.', detail: 'English JD generates English CV. Spanish JD generates Spanish CV.' },
          { label: 'Detect region.', detail: 'US company generates Letter format. Europe generates A4.' },
          { label: 'Detect archetype.', detail: '6 North Star archetypes. The summary shifts based on the profile.' },
          { label: 'Select projects.', detail: 'Top 3-4 by relevance. Jacobo for agent roles. Business OS for ERP/automation.' },
          { label: 'Reorder bullets.', detail: 'The most relevant experience moves up. The rest moves down — nothing disappears.' },
          { label: 'Render PDF.', detail: 'Puppeteer converts HTML to PDF. Self-hosted fonts, single-column ATS-safe.' },
        ],
        archetypes: {
          heading: '6 Archetypes',
          headers: ['Archetype', 'Primary Proof Point'],
          rows: [
            ['AI Platform / LLMOps', 'Self-Healing Chatbot (71 evals, closed-loop)', '/self-healing-chatbot'],
            ['Agentic Workflows', 'Jacobo (4 agents, 80h/mo automated)', '/ai-agent-jacobo'],
            ['Technical AI PM', 'Business OS (2,100 fields, 50 automations)', '/business-os-for-airtable'],
            ['AI Solutions Architect', 'pSEO (4,730 pages, 10.8x traffic)', '/programmatic-seo'],
            ['AI FDE', 'Jacobo (sold, running in production)', '/ai-agent-jacobo'],
            ['AI Transformation Lead', 'Exit 2025 (16 years, buyer kept all systems)', ''],
          ],
        },
        callout: 'Same CV. 6 different framings. All real — keywords get reformulated, never fabricated.',
      },
      beforeAfter: {
        heading: 'Before and After',
        headers: ['Dimension', 'Manual', 'Career-Ops'],
        rows: [
          ['Evaluation', 'Read JD, mental mapping', '10D automated scoring, A-F grade'],
          ['CV', 'Generic PDF', 'Personalized PDF, ATS-optimized'],
          ['Application', 'Manual form', 'Playwright auto-fill'],
          ['Tracking', 'Spreadsheet or nothing', 'TSV + automated dedup'],
          ['Discovery', 'LinkedIn alerts', 'Scanner: job boards + target company careers pages'],
          ['Batch', 'One at a time', '122 URLs in parallel'],
          ['Dedup', 'Human memory', '680 URLs deduplicated'],
        ],
      },
      results: {
        heading: 'What Results Has Career-Ops Achieved?',
        body: 'The most important result: I got the job. I am now Head of Applied AI. Career-Ops evaluated 631 offers, generated 354 personalized PDFs, and filtered the noise so I could focus on the opportunities that truly fit.',
        metrics: [
          { value: '631', label: 'Reports generated' },
          { value: '35K+', label: 'GitHub stars' },
          { value: '354', label: 'PDFs generated' },
          { value: '2,600+', label: 'Upvotes r/ClaudeAI' },
        ],
        aftermath: {
          heading: 'What Happened Next?',
          body: 'When I no longer needed Career-Ops, I published it on GitHub. In one week it went from private repo to viral — 37.6K+ stars, 5K+ forks, and articles in blogs from France, China, and Korea by people who had never heard of me. A community of 1,600+ people formed on Discord, helping each other configure and adapt the system. The project ended up demonstrating more competencies than any hiring process could.',
          highlights: [
            { value: '35K+', label: 'GitHub stars in 1 week' },
            { value: '5K+', label: 'Forks' },
            { value: '4', label: 'Languages (EN, FR, ZH, KO)' },
            { value: '6', label: 'Countries with coverage' },
          ],
        },
      },
      stack: {
        heading: 'Stack',
        items: [
          { name: 'Claude Code', role: 'LLM agent: reasoning, evaluation, content generation' },
          { name: 'Playwright', role: 'Browser automation: portal scanning and form-filling' },
          { name: 'Puppeteer', role: 'PDF rendering from HTML templates' },
          { name: 'Node.js', role: 'Utility scripts: merge-tracker, cv-sync-check, generate-pdf' },
          { name: 'tmux', role: 'Parallel sessions: conductor + workers in batch' },
        ],
      },
      lessons: {
        heading: 'Lessons',
        items: [
          {
            title: 'Automate analysis, not decisions',
            detail: 'Career-Ops evaluates 631 offers. I decide which ones get my time. HITL is not a limitation — it is the design. AI filters noise, humans provide judgment.',
          },
          {
            title: 'Modes beat a long prompt',
            detail: '12 modes with precise context outperform a 10,000-token system prompt. Each mode loads only what it needs. Less context means better decisions.',
          },
          {
            title: 'Dedup is more valuable than scoring',
            detail: '680 deduplicated URLs mean 680 evaluations I never had to repeat. Dedup saves more time than any scoring optimization.',
          },
          {
            title: 'A CV is an argument, not a document',
            detail: 'A generic PDF convinces nobody. A CV that reorganizes proof points by relevance, injects the right keywords, and adapts framing to the archetype — that CV converts.',
          },
          {
            title: 'Batch over sequential, always',
            detail: 'Batch mode with parallel workers processes 122 URLs while I do something else. The investment in parallel orchestration pays off on the first run.',
          },
          {
            title: 'The system IS the portfolio',
            detail: 'Building a multi-agent system to search for multi-agent roles is the most direct proof of competence. I do not need to explain that I can do this — I am using it.',
          },
          {
            title: 'Open-source it when you no longer need it',
            detail: 'Career-Ops was private while I was using it. When I got the job, I published it. One week later it had 37.6K stars. The lesson: the best time to open-source a project is when it has already proven its value in real production.',
          },
          {
            title: 'Why I keep it MIT',
            detail: 'MIT license. No dark patterns, no upsell inside the CLI, no feature gating. If it works for you, it works. If you want to support the maintenance or join the community, you can. But the tool does not depend on it.',
          },
        ],
      },
      cta: {
        sidebarLabel: 'Try it',
        heading: 'Here it is',
        body: 'Career-Ops is open source under MIT. Clone it, fork it, adapt it — it is yours.',
        ctaLabel: 'Try career-ops',
        ctaHref: 'https://career-ops.org?utm_source=santifer.io&utm_medium=case-study&utm_campaign=career-ops-deep-dive',
        ctaSecondaryLabel: 'View source on GitHub',
        ctaSecondaryHref: 'https://github.com/santifer/career-ops',
        communityHeading: 'Got questions? Ask the community',
        communityBody: '1,600+ builders already use Career-Ops and share tips, templates, and setups on Discord.',
        communityLabel: 'Join Discord',
        communityHref: 'https://discord.gg/8pRpHETxa4',
      },
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'Is this gaming the system?',
          a: 'Career-Ops automates analysis, not decisions. I read every report before applying. I review every PDF before sending. Same philosophy as a CRM: the system organizes, I decide.',
        },
        {
          q: 'Why Claude Code and not a script pipeline?',
          a: 'A script cannot reason. Career-Ops adapts scoring based on company context, reformulates keywords without fabricating, and generates narrative reports — not filled templates.',
        },
        {
          q: 'What does it cost to run?',
          a: 'Zero marginal cost per evaluation. Career-Ops runs on my Claude Max 20x plan ($200/mo), which I use for everything: portfolio, chatbot, articles, and Career-Ops. 631 evaluations without a single extra invoice.',
        },
        {
          q: 'Does the apply mode fill forms automatically?',
          a: 'It reads the page with Playwright, retrieves the cached evaluation, and generates coherent responses matching the scoring. I review before submitting — always.',
        },
        {
          q: 'What happens when the scanner finds a duplicate?',
          a: 'scan-history.tsv stores 680 seen URLs. Dedup by exact URL match plus normalized company+role match against applications.md. Zero re-evaluations.',
        },
        {
          q: 'Is it replicable?',
          a: 'Yes — it is open source. The official landing is career-ops.org (docs, AI chat and guides) and the code lives at github.com/santifer/career-ops. Requires Claude Code with Playwright access. Skill files define the logic for each mode. 37K+ people have already seen, forked, or adapted it.',
        },
        {
          q: 'How do I use Career-Ops?',
          a: 'Career-Ops is a local tool that runs from your terminal with Claude Code. Clone the repository, configure your resume and preferences, and launch modes as needed: auto-pipeline to evaluate an offer end-to-end, scan to discover offers on job boards, batch to process many URLs in parallel, or pdf to generate a personalized resume. Everything runs on your machine — your resume and personal data never leave your computer. If you need help, a community of 1,000+ people is on Discord: discord.gg/8pRpHETxa4',
        },
        {
          q: 'What do I need to run Career-Ops?',
          a: 'Claude Code with a plan that includes tool access (Claude Max or Claude Pro). Playwright for web navigation. Node.js for utility scripts like tracker merging and PDF generation with Puppeteer. A working directory with your resume in markdown and your search preferences. No servers, databases, or external APIs needed — everything runs locally. The Discord community (discord.gg/8pRpHETxa4) can help with setup.',
        },
        {
          q: 'What kind of AI does Career-Ops use?',
          a: 'Career-Ops is not a chatbot or an API wrapper. It is a multi-agent system where Claude Code acts as the brain: it reasons about each offer, evaluates fit against your profile across 10 dimensions, and makes filtering decisions. Each of the 12 modes is a skill file with its own context and rules. Web navigation uses Playwright. PDFs use Puppeteer. Batch processing launches parallel workers in tmux. No fine-tuning or custom models — standard Claude with very precise context.',
        },
        {
          q: 'Who created Career-Ops?',
          a: 'I did — Santiago Fernández de Valderrama (santifer). I built it for my own AI job search after spending 16 years founding and selling a phone repair business. The system evaluated 631 offers and helped me land my current role as Head of Applied AI. When I no longer needed it, I published it as open source. In one week it reached 37.6K+ GitHub stars. The Discord community is now 1,600+ people: discord.gg/8pRpHETxa4',
        },
      ],
    },
  },
} as const
