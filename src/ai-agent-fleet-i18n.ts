export type AiAgentFleetLang = 'es' | 'en'

export const aiAgentFleetContent = {
  es: {
    slug: 'flota-agentes-ia',
    altSlug: 'ai-agent-fleet',
    readingTime: '14 min de lectura',
    seo: {
      title: 'Agentic maintenance: un repo de 60.000 estrellas con agentes IA',
      description: 'Una flota de agentes Claude Code mantiene career-ops: triage, tests, review briefs y releases en ~4h/semana. El sistema, un día documentado y cómo replicarlo.',
    },
    nav: {
      breadcrumbHome: 'Inicio',
      breadcrumbCurrent: 'Flota de Agentes IA',
    },
    header: {
      kicker: 'Cómo se opera · Open Source',
      h1: 'Agentic maintenance: cómo dirijo un repo open source de 60.000 estrellas con una flota de agentes IA',
      subtitle: 'Los agentes hacen el trabajo mecánico: triage, tests, review briefs, releases. Las decisiones son mías. Esto es el sistema, un día completo documentado, y lo que hace falta para montarlo en tu propio repo.',
      date: '10 jul 2026',
    },
    tldr: 'career-ops es mi sistema open source de búsqueda de empleo: 60.797 estrellas en GitHub, 187 contribuidores y 625 PRs fusionadas a fecha de hoy. Lo mantengo en unas 4 horas a la semana. Una flota de agentes Claude Code hace el trabajo mecánico — triage, testing, review briefs, mecánica de releases, métricas de comunidad. Gates duros los mantienen honestos, y cada fallo real se destila en una regla que cargan al arrancar.',
    tldrCoin: {
      pre: ' ',
      term: 'Agentic maintenance',
      post: ' es el mantenimiento con gates y basado en evidencia de un codebase vivo, sostenido por una flota de agentes bajo dirección humana.',
    },
    internalLinks: {
      careerOps: {
        text: 'career-ops | Case Study',
        href: '/career-ops',
      },
    },
    sections: {
      outgrew: {
        heading: 'La semana en que el repo me superó',
        paras: [
          'career-ops salió a producción este año. En abril despegó: más de 12.000 estrellas en 2 días.',
          'Con las estrellas llegó la carga de trabajo. En una sola noche documentada: 9 PRs y 11 issues nuevas antes de desayunar.',
          'Mientras tuve un trabajo a jornada completa como Head of Applied AI en una empresa de software, mi presupuesto realista para open source era de unas 4 horas a la semana. Un repo de este tamaño pide un maintainer a tiempo completo. Hoy career-ops es mi foco principal — pero la disciplina de las 4 horas es la que dio forma al sistema, y la flota sigue haciendo el trabajo mecánico.',
          'Así que reconstruí cómo se mantiene el repo. Mi trabajo cambió de forma: yo opero el sistema que hace el trabajo, y me quedo con las decisiones.',
        ],
      },
      fleet: {
        heading: 'La flota',
        intro: 'Cada agente es una sesión persistente de Claude Code en su propia ventana de tmux, con su propia memoria. Se coordinan mediante IPC basado en ficheros: JSON de request/response en un directorio compartido, con polling. La capa de coordinación son ficheros: una máquina de estados desacoplada donde cada mensaje es un artefacto legible y cada decisión deja una traza reproducible. Escala a un repo de 60.000 estrellas y se sigue debuggeando con cat.',
        table: {
          headers: ['Agente', 'Qué hace'],
          rows: [
            ['Agente maintainer', 'El orquestador: triage, review briefs de PRs, mecánica de merges, releases, ciclo de vida de issues'],
            ['Agente Discord', 'Anuncios a la comunidad y gestión de canales, entregados como digests con los borradores incluidos'],
            ['Agente web', 'Posee la capa web first-party; las PRs de web se etiquetan y se le enrutan'],
            ['Agente dogfood', 'Usa la herramienta como un usuario real en un clone limpio y presenta informes de fricción estructurados'],
            ['Verificadores efímeros', 'Fan-outs de solo lectura en git worktrees aislados: testers de PRs en paralelo, reviewers adversariales, verificadores de claims. Aportan evidencia y ahí se paran.'],
          ],
        },
        loops: 'Dos loops corren desatendidos y sobreviven a reinicios. Un triage-prep de madrugada pre-clasifica el flujo nocturno, con borradores incluidos. Un delivery-watch horario detecta cuándo un contribuidor de verdad ha pusheado tras una petición: vigila el cambio del head de la rama, porque el timestamp de "updated" también se mueve con los comentarios y produce falsos positivos.',
        split: 'El reparto es estricto. Los agentes clasifican, testean, vigilan, miden y redactan borradores. Yo decido qué entra en el core, el orden de merge, la gobernanza y las releases. Los agentes proponen con la evidencia adjunta. La última palabra es mía.',
        priorArt: {
          pre: 'Esta forma de orquestador con subagentes especializados no es nueva para mí. La llevé a producción de cara al cliente en ',
          linkLabel: 'Jacobo',
          href: '/agente-ia-jacobo',
          post: ', un sistema multi-agente con router, subagentes especializados, tool calling y traspaso a humano.',
        },
      },
      gates: {
        heading: 'Los gates',
        intro: 'Dejar que la IA fusione sin supervisión sería negligencia. Cada gate de abajo existe porque antes algo real se rompió:',
        items: [
          { label: 'Testear antes de decidir, en un checkout limpio.', detail: 'Cada PR corre contra la suite completa en local antes de cualquier decisión. Y para código dependiente del entorno, el CI de entorno limpio es el árbitro: una ejecución local pasó una vez mientras el CI fallaba, porque mi working copy poblada nunca ejercitaba el camino de "faltan los ficheros del usuario".' },
          { label: 'El gate de first-timers.', detail: 'Las ejecuciones de CI de contribuidores nuevos se aprueban explícitamente y se espera a que estén en verde. Nunca se salta con admin. Una PR pasó por el gate dos veces en un mismo día porque actualizar la rama reseteó la aprobación. Esperamos las dos veces.' },
          { label: 'CodeQL en vivo para todo lo que parsea texto.', detail: 'Un fan-out de seguridad aprobó una vez una PR de parser; el check de CodeQL en vivo la bloqueó después con un hallazgo high-severity de doble escapado que los agentes estructuralmente no podían ver. CodeQL caza clases de bugs que la suite de tests nunca ejercita.' },
          { label: 'Review adversarial para plugins.', detail: 'Los plugins de la comunidad los revisan varios agentes independientes con la instrucción de romperlos: egress de red, path traversal, postura ante ToS. El registry pinea cada plugin a una SHA revisada, así que los usuarios solo instalan código que una review aprobó.' },
          { label: 'Anuncios condicionados al exit code.', detail: 'Un "Merged! 🚀" público solo se publica después de que el comando de merge devuelva éxito. Un anuncio prematuro nos quemó dos veces antes de que esto fuera ley.' },
          { label: 'Claims verificados antes de cualquier acción pública.', detail: 'Cualquier cosa que dispararía un request-changes, un cierre o la edición de un fichero sensible se reproduce primero contra el diff real — venga el claim de un agente, de un contribuidor o de mi propio grep.' },
          { label: 'Tiers de ficheros sensibles y un contrato de datos escrito.', detail: 'Los ficheros están clasificados por radio de explosión; los cambios en ficheros críticos sin discusión previa se cierran por política. Las PRs que tocan datos de usuario se rechazan de plano.' },
        ],
      },
      security: {
        heading: 'Seguridad y aislamiento',
        paras: [
          'Los agentes ejecutan código de terceros a velocidad de máquina, así que los límites tienen que ser explícitos. Los git worktrees aíslan el sistema de ficheros. No aíslan el runtime: cuando un agente testea la PR de un contribuidor, ese código corre en mi máquina — el mismo trade-off que cualquier maintainer de OSS acepta en el momento en que hace checkout de la rama de un desconocido.',
          'Las defensas están escalonadas por confianza. El código pasa GitHub Actions y CodeQL en vivo en el sandbox del propio GitHub antes de que ningún agente lo toque en local, y el CI de un contribuidor nuevo ni siquiera corre sin aprobación humana explícita. Un gate pre-merge lista cada fichero sensible que toca un diff antes de que empiece el testing profundo. Y los propios agentes de test van desnudos: read-only por contrato, con todas las herramientas externas quitadas (integraciones de chat y servidores MCP incluidos), lo que mantiene pequeño el radio de explosión.',
          'Lo que falta, dicho claramente: las cuentas de servicio least-privilege están en el roadmap, no en producción. Ese hueco es real, y es lo siguiente en la lista de hardening.',
        ],
      },
      infraFails: {
        heading: 'Cuando la infraestructura falla',
        paras: [
          'El principio de diseño que lo sostiene todo: GitHub es el estado canónico. Todo lo local (ficheros de sesión, briefings, los logs) es una caché re-derivable más un registro append-only. Una sesión que muere se reconstruye, y la primera fase del orquestador re-comprueba cada ítem contra GitHub antes de actuar, porque una PR puede fusionarse o cerrarse mientras nadie miraba.',
          'Una regla de aquí costó un incidente real. Un flag no soportado más un stderr silenciado hicieron que un watcher se tragara su propio error y reportara "no hay entregas de contribuidores" como éxito, durante horas, en una tarde activa. Se cazó porque el resultado contradecía lo que el día parecía. La regla desde entonces: el comando que alimenta una decisión nunca silencia sus errores, y un check fallido reporta "no se pudo verificar" en vez de "no se encontró nada".',
        ],
      },
      memory: {
        heading: 'La memoria que compone',
        paras: [
          'Tres artefactos hacen a cada sesión más lista que la anterior.',
          'Un decision log append-only: más de 700 filas, cada acción registrada con fecha, razón y contribuidor. Un fichero de lecciones: 31 reglas, cada una un fallo real destilado en un check que se carga al arrancar. Y dossiers de contribuidores: un ledger de confianza con tiers explícitos (Participant → Contributor → Triager → Trusted), conteos de merges y notas.',
          'Algunas lecciones, parafraseadas. Anuncia solo tras el éxito (#10). Vuelve a hacer fetch del head actual de un contribuidor antes de pushear a su fork; un push rechazado significa parar (#16). Para parsers, el gate de análisis estático en vivo es obligatorio (#18). Nunca menciones con @ un handle que no hayas leído de un tool result en la sesión actual (#24: el agente se inventó uno una vez, y lo corrigió en un minuto).',
          'Mi fallo favorito: los git worktrees aíslan el working tree pero comparten .git/FETCH_HEAD. En un fan-out paralelo, fetches concurrentes lo sobreescribieron y un agente analizó la PR equivocada de principio a fin. El paso de verificación adversarial cazó el veredicto cruzado antes de que nada saliera a público. La regla (cada agente hace fetch a un ref nombrado por PR y contrasta la SHA pineada) entró en el fichero de lecciones y no ha vuelto a ocurrir.',
          'Los agentes fallan. El sistema está construido para que sus fallos sean baratos de cazar y no se repitan nunca.',
          'La propia flota está versionada de la misma manera. Prompts, skills y reglas son ficheros de texto en git, así que un cambio de comportamiento es un commit legible, y las skills se cargan al invocarse, así que los cambios aterrizan en caliente con cero downtime. Merece admitirlo: las skills aún no tienen una suite de tests formal. Su mecanismo de calidad es el propio loop de aprendizaje, y hasta ahora ha aguantado, porque un fallo real se convierte en regla escrita y la regla en contexto de arranque.',
        ],
      },
      specimen: {
        heading: 'Un día documentado: 2 de julio de 2026',
        opening: 'Estado de apertura a las 09:05: 53 PRs abiertas, 74 issues abiertas, +9 PRs y +11 issues durante la noche, main en verde.',
        outcomesLead: 'Al final del día:',
        outcomes: [
          { label: 'v1.16.0 cortada y en producción:', detail: '13 features, 7 fixes. El agente dogfood había encontrado un fallo user-facing en la release publicada; ese informe se convirtió en el argumento para cortar ya.' },
          { label: '16 PRs fusionadas.', detail: 'Entre ellas: 3 plugins de la comunidad registrados a la vez tras 3 aprobaciones adversariales independientes; una feature de analítica construida con un paper de FAccT 2026 como spec; y un reshape de human-in-the-loop auditado línea a línea (cero llamadas de red, allowlist exacta de dominios).' },
          { label: '~25 issues triadas,', detail: '~8 cierres cálidos con crédito, 6+ request-changes precisos. Cada PR e issue nueva recibió una primera respuesta sustantiva el mismo día. Cero ghosting.' },
          { label: 'GitHub Trending, #5 overall.', detail: 'La tarjeta de Trending marcaba "322 stars today"; a mediodía el conteo iba por ~408 contra una baseline de ~190/día.' },
        ],
        involvement: 'Mi implicación total: una sentada, más o menos una hora, 8 decisiones. Cortar la release. Promocionar al primer co-maintainer con acceso de escritura (anunciado solo después de que la llamada del grant devolviera éxito; ver lección #10). Rechazar una reorganización del root — porque la estabilidad de paths es una feature cuando más de 11.000 forks dependen de tus rutas — y cosechar la parte buena (un ARCHITECTURE.md) con crédito al proponente. Cerrar una espina dorsal arquitectónica de 7 PRs de un contribuidor de alto volumen, con calidez y RFC-first: la velocidad no compra autoría arquitectónica. Dos de las ocho decisiones del día se convirtieron en doctrina escrita en ARCHITECTURE.md esa misma tarde.',
        closing: [
          'Todo lo que quedó en mi plato al final del día: dos clicks en Discord, con los borradores pre-escritos por la flota.',
          'El loop de dogfood también se cerró el mismo día. Un informe de campo, 13 hallazgos. 1 fix directo, 11 issues abiertas con scope preciso. 3 de esas issues volvieron como PRs de la comunidad y se fusionaron antes de medianoche.',
        ],
      },
      catches: {
        heading: 'Lo que la flota caza y yo pasaría por alto',
        items: [
          { title: 'El bug de macOS que el CI no podía ver.', body: 'Un test crasheaba solo en macOS: mkdtempSync devuelve una ruta bajo /var, que es un symlink a /private/var, y un guard fallaba en silencio. El CI de Ubuntu estuvo en verde todo el tiempo. El gate de suite completa en local lo cazó, el contribuidor recibió el diagnóstico con el fix exacto, y volvió con una PR añadiendo una matriz de CI de 3 sistemas operativos (#1719 → #1762).' },
          { title: '10 merges, 3 colisiones, 0 roturas.', body: 'Una mañana de esta semana había 10 PRs por aterrizar, y 3 clusters tocaban los mismos ficheros. El mapa de colisiones del briefing fijó el orden seguro de merge y re-validó el CI tras cada aterrizaje.' },
          { title: 'El loop de auditoría.', body: 'Un miembro de la comunidad reportó drift de formato en los CV. El fix salió en v1.18 (#1388). El usuario volvió con una auditoría pineada a commit de lo que quedaba (#1736). El agente re-verificó cada hallazgo contra el main de esa mañana y encontró uno ya resuelto por un merge que el auditor no podía conocer. Otro contribuidor envió "Closes #1736" en horas (#1759). El trabajo del agente ahí fue enrutar, para que nadie duplicara trabajo.' },
          { title: 'La salvada humana.', body: 'Una historia de éxito llegó una vez con un título tan genérico que parecía spam. La regla de leer el cuerpo antes de clasificar la salvó. Acabó celebrada en el canal de historias de éxito de la comunidad.' },
        ],
      },
      numbers: {
        heading: 'Los números',
        warpchart: {
          alt: 'Telemetría de estrellas en vivo de santifer/career-ops',
          caption: 'La telemetría en vivo de career-ops — por',
          linkLabel: 'Warpchart',
        },
        asOf: 'A 21 de julio de 2026:',
        table: {
          headers: ['Métrica', 'Valor'],
          rows: [
            ['Estrellas en GitHub', '60.797'],
            ['Forks', '11.983'],
            ['Contribuidores', '187'],
            ['PRs fusionadas', '625'],
            ['Releases desde el despegue de abril', '21 (última: v1.18.0, 7 de julio)'],
            ['Suite de tests', '1.667 aserciones, 0 fallando (jul 2026)'],
            ['Miembros de Discord', '4.200'],
            ['Tráfico semanal', '26.831 visitantes únicos · 8.680 cloners únicos — 32% view→clone (jul 2026)'],
            ['Ranking mundial', 'uno de los ~350 repos con más estrellas de GitHub (warpchart, jul 2026)'],
            ['Presupuesto de atención humana', '~4 horas/semana'],
          ],
        },
        closing: 'Ese ratio view→clone es el número que yo vigilo. Las estrellas miden aplauso; los clones miden uso.',
        dora: {
          pre: 'El ',
          linkLabel: 'State of AI-assisted Software Development 2025 de DORA',
          post: ' midió lo que la mayoría de los equipos de ingeniería ya siente: la IA dispara el output individual (un 98% más de PRs fusionadas) mientras las métricas de delivery organizacional se quedan planas. Su hallazgo principal es que la IA amplifica el sistema en el que aterriza. El hueco entre esos dos números vive en todo lo que describe este artículo: review, confianza, memoria, gates. Este repo es ese hueco cerrado en público, a escala de 60.000 estrellas, con 4 horas a la semana.',
        },
      },
      community: {
        heading: 'La comunidad corre sobre los mismos principios',
        paras: [
          'El Discord de 4.200 miembros recibe la misma disciplina que el codebase, con gates más ligeros. Un agente community-brain barre los canales y destila el chat en un ledger consultable: dolores recurrentes, feature requests, promesas hechas. Las peticiones nuevas se deduplican contra las issues existentes, y lo que sobrevive se convierte en issues etiquetadas y RFCs en el roadmap público. Un bot de FAQ grounded responde las preguntas de setup desde la propia documentación del repo — cero respuestas alucinadas observadas hasta ahora — y deriva a un humano cuando la documentación no llega.',
          'Los gates aquí son más ligeros porque el error budget es mayor: una respuesta errónea del FAQ recibe una corrección humana, donde un merge erróneo recibiría un revert y un post-mortem.',
          'Este año la comunidad reportó a su primer miembro consiguiendo trabajo con la herramienta. La adopción es un sistema, y este cierra su loop en público.',
        ],
      },
      playbook: {
        heading: 'Cómo hacer tu repo agent-friendly',
        intro: 'La flota tardó meses en endurecerse. Los cimientos de debajo se transfieren a cualquier repo, y la mayoría son context engineering:',
        steps: [
          { label: 'Ficheros de reglas', detail: 'que briefean a un agente como briefearías a un ingeniero senior que se incorpora al proyecto: convenciones, arquitectura, gotchas, comandos, límites. En la práctica: CLAUDE.md y ' },
          { label: 'Una suite de tests que el agente pueda tratar como ground truth.', detail: 'Si tus tests mienten, los agentes amplifican la mentira a velocidad de máquina.' },
          { label: 'Contratos escritos en vez de conocimiento tribal:', detail: 'un contrato de datos, tiers de ficheros sensibles, una checklist de review documentada. El "no" funciona mejor como política que como estado de ánimo.' },
          { label: 'Logs que componen:', detail: 'un decision log append-only y un fichero de lecciones. Un fallo o se convierte en regla escrita o se repite.' },
          { label: 'Aislamiento para el paralelismo:', detail: 'git worktrees más refs nombrados por tarea. El estado compartido es como los agentes se contaminan entre sí.' },
          { label: 'Gates donde la confianza es fina:', detail: 'first-timers, parsers, cualquier cosa que actúe en público.' },
        ],
        agentsMd: {
          linkLabel: 'AGENTS.md',
          post: ', hoy un estándar abierto usado por más de 60.000 proyectos.',
        },
        closing: 'Empieza con los dos primeros y un único agente de triage. La flota es aquello en lo que eso crece.',
      },
      breaks: {
        heading: 'Dónde se rompe',
        items: [
          { label: 'Ambigüedad.', detail: 'Los agentes malinterpretan la intención cuando un diff y su issue no coinciden. Exactamente por eso ellos proponen y yo decido.' },
          { label: 'Verificación.', detail: 'Mi unidad de review pasó de diffs a evidencia: output de tests, audit trails, veredictos adversariales. Construir el hábito de exigir evidencia costó más que construir los agentes.' },
          { label: 'Voz.', detail: 'Todo lo que va con mi nombre (anuncios, agradecimientos, juicios públicos) sigue siendo humano. Los lectores lo notan, y deberían poder notarlo.' },
          { label: 'Tiempo.', detail: 'Este sistema tiene 31 fallos destilados de antigüedad. El día uno no se parecerá a esto, y fingir lo contrario sería venderte algo.' },
        ],
        verificationExtra: {
          pre: 'La industria empieza a llamarlo el verification bottleneck: ',
          linkLabel: 'los datos de 2025 sobre cientos de organizaciones',
          post: ' muestran que las PRs fusionadas casi se duplican mientras el tiempo de review sube un 91%. Los gates de arriba son ese problema resuelto para un repo.',
        },
      },
      orgBridge: {
        heading: 'De un repo a una organización de ingeniería',
        paras: [
          'Todo lo de arriba tiene un gemelo organizacional. Los ficheros de reglas son un golden path: el paved road del equipo de plataforma, aplicado a agentes. El mapa de colisiones es la lógica de CODEOWNERS escalada más allá de la paciencia humana. Los gates son una política de confianza, escrita y barata de auditar. El fichero de lecciones es una cultura de postmortems que compone. Y el reparto proponer-decidir es la misma división que un VP de ingeniería ya ejerce entre staff engineers y sus equipos, con la capa mecánica sustituida.',
          'Donde los equipos se atascan es en el sistema alrededor de las herramientas. Esa es la parte que se transfiere, y transferirla es trabajo forward-deployed: te embebes con un equipo, recableas cómo shippea, y dejas la capacidad instalada.',
        ],
      },
      coreConcepts: {
        heading: 'Los conceptos clave del agentic maintenance',
        intro: 'Seis patrones, con nombre para que puedas reutilizarlos:',
        items: [
          { label: 'The orchestrator agent:', detail: 'un nodo central de enrutado que delega trabajo especializado y agrega la evidencia en briefs sobre los que un humano puede decidir.' },
          { label: 'The ephemeral verifier:', detail: 'un agente efímero de solo lectura, lanzado en un git worktree aislado para validar una sola cosa, reportar evidencia y desaparecer.' },
          { label: 'The grounded watcher:', detail: 'un loop persistente en segundo plano que vigila eventos de source-control o telemetría y dispara trabajo de forma asíncrona, bajo la regla de que un check fallido reporta "no se pudo verificar" en vez de "no se encontró nada".' },
          { label: 'The compound memory ledger:', detail: 'un log append-only de decisiones y fallos destilados que se carga en cada sesión nueva, de modo que cada sesión arranca más lista que la anterior.' },
          { label: 'The tool-stripped actor:', detail: 'un agente de ejecución al que se le niegan deliberadamente todas las herramientas externas (integraciones de chat y servidores MCP incluidos) para encoger el radio de explosión mientras ejecuta código no confiable.' },
          { label: 'The sequential quality gate:', detail: 'un checkpoint bloqueante (CI en verde, análisis estático en vivo, aprobación humana para first-timers) que detiene el pipeline hasta que se cumple una condición de confianza.' },
        ],
        closing: 'Juntos componen el agentic maintenance tal como lo practica este repo.',
      },
      lessons: {
        heading: 'Lecciones',
        items: [
          { title: 'Diseña desde las autopsias', detail: 'Cada gate existe porque antes algo real se rompió. El sistema no nació de un whitepaper: nació de fallos con fecha y número de issue.' },
          { title: 'Los agentes proponen con evidencia. El no es humano', detail: 'La flota convierte un flujo ilimitado de trabajo mecánico en un menú acotado de decisiones. Quitarle al humano la última palabra no es automatizar: es renunciar.' },
          { title: 'Un fallo o se convierte en regla escrita o se repite', detail: 'El fichero de lecciones se carga en cada arranque. La memoria que no se escribe no compone.' },
          { title: 'Los contratos aburridos hacen segura la velocidad', detail: 'SHAs pineadas, estabilidad de paths, límites de datos. Lo aburrido es lo que permite que los agentes vayan rápido sin romper a nadie.' },
          { title: 'El repo se convirtió en el currículum', detail: 'La forma en que se mantiene un proyecto demuestra más que cualquier entrevista. Este artículo es la prueba.' },
        ],
      },
      cta: {
        heading: 'Este modelo operativo, aplicado a tu equipo de ingeniería',
        body: 'Diseño y opero sistemas multi-agente en producción: flotas que convierten volumen mecánico en decisiones acotadas, con gates, memoria y evidencia. Despliego este modelo operativo embebido con equipos de ingeniería (forward-deployed). Si tu equipo se está ahogando en volumen, hablemos.',
        ctaLabel: 'Escríbeme',
        ctaHref: 'mailto:hi@santifer.io',
        secondaryLabel: 'Lee el case study de career-ops',
        secondaryHref: '/career-ops',
      },
      relatedWork: {
        heading: 'Trabajo relacionado',
        items: [
          { text: 'Jacobo: agente IA multi-agente en producción | Case study', href: '/agente-ia-jacobo' },
          { text: 'Business OS: ERP a medida + automatización | Case study', href: '/business-os-para-airtable' },
        ],
      },
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: '¿Qué es agentic maintenance?',
          a: 'Agentic maintenance es la práctica de mantener sano un codebase vivo mediante una flota de agentes IA que hacen el trabajo mecánico — triage, testing, review briefs, mecánica de releases, métricas de comunidad — bajo dirección humana explícita. Tres propiedades lo separan de simplemente apuntar un agente de código a un repositorio. Primera, los gates: cada acción con consecuencias pasa un checkpoint bloqueante (tests en checkout limpio, análisis estático en vivo, aprobación humana donde la confianza es fina), y todo lo público se verifica antes de que ocurra. Segunda, la evidencia: los agentes nunca piden confianza; adjuntan output de tests, audit trails y veredictos adversariales, y un humano decide sobre el brief. Tercera, la memoria compuesta: cada fallo real se destila en una regla escrita que se carga en cada sesión futura, de modo que el sistema se vuelve más seguro a medida que envejece. En la implementación de referencia que describe este artículo, el agentic maintenance opera un repositorio open source de 60.000 estrellas con unas 4 horas de atención humana a la semana.',
        },
        {
          q: '¿Pueden los agentes IA mantener un codebase por sí solos?',
          a: 'No, y este sistema está diseñado sobre la premisa de que no deberían. Los agentes absorben el volumen: clasifican el flujo nocturno, corren suites de tests contra checkouts limpios, redactan review briefs, vigilan entregas de contribuidores, miden la salud de la comunidad. Cada acción con consecuencias pasa por gates, y todo lo estratégico (qué entra en el core, orden de merge, gobernanza, releases, juicios públicos) aterriza en un menú de decisiones humanas con la evidencia adjunta. Es división del trabajo: los agentes convierten un flujo ilimitado de trabajo mecánico en un conjunto acotado de decisiones. En mi caso ese límite son unas 4 horas a la semana para un repo con 60.797 estrellas en GitHub y 187 contribuidores. Quita al humano y lo que queda es autoridad sin revisar sobre el código de otras personas.',
        },
        {
          q: '¿Cuánto cuesta operar una flota de agentes IA así?',
          a: 'Menos de lo que la expresión "flota de agentes" sugiere. El sistema entero corre sobre una suscripción de Claude Code más herramientas commodity: tmux para las sesiones, git worktrees para el aislamiento, ficheros JSON para la comunicación entre agentes, GitHub Actions para el CI. Todo vive en el portátil en el que corre, sin GPUs, sin base de datos vectorial y sin plataforma de orquestación. El recurso genuinamente escaso es la atención humana, que es justo el punto: el objetivo de diseño era que un repo viral cupiera en unas 4 horas semanales de mi tiempo. Si lo estás evaluando para tu propio proyecto, presupuesta más para escribir ficheros de reglas y endurecer tests que para cómputo, porque la calidad del contexto ha sido la restricción vinculante en cada etapa.',
        },
        {
          q: '¿Los agentes IA reemplazan a los maintainers de open source?',
          a: 'Reemplazan el toil del maintainer. El triage, los rebases, las ejecuciones de tests, los checks de duplicados y la persecución de estados dejan de consumir la semana. Lo que queda es juicio: la visión del proyecto, la confianza en los contribuidores, la autoría arquitectónica y la capacidad de decir que no con calidez. En mi día especimen documentado, la flota procesó 16 merges, ~25 issues triadas y una release, mientras mi contribución fueron 8 decisiones en más o menos una hora. Una de esas decisiones cerró 7 PRs de uno de los contribuidores más prolíficos del proyecto, RFC-first, porque la arquitectura sin dueño se convierte en deuda. Ningún agente debería tomar esa decisión, y ninguno la tomó. El maintainer conserva el rol y pierde el backlog.',
        },
        {
          q: '¿Cómo revisas pull requests humanas y generadas por IA a esta escala?',
          a: 'Tres ejes en paralelo. La review automática de código se encarga de los nits tácticos. El CI corre la suite completa (1.667 aserciones a día de hoy) más CodeQL, dependency review y un guard de privacidad que rechaza datos de usuario en las PRs. Después el agente maintainer construye un brief por PR: encaje con la issue de origen, historial del contribuidor, mapa de colisiones contra las otras PRs abiertas y una ejecución local de tests en checkout limpio. Yo leo briefs y evidencia, y leo diffs solo donde el brief dice que la confianza es fina: first-timers, parsers, ficheros sensibles. El orden de merge sale del grafo de colisiones, y el CI re-valida tras cada aterrizaje. El día que ese sistema gestionó 10 merges con 3 colisiones a nivel de fichero, main no se rompió ni una vez.',
        },
        {
          q: '¿Qué es lo primero que se rompe al intentar esto en tu propio repo?',
          a: 'El contexto, casi siempre. Un agente soltado en un repo sin ficheros de reglas, docs actualizadas y tests fiables produce sinsentidos con mucha confianza, y la tentación es culpar al modelo. En mis logs, los fallos tempranos se agrupan en dos familias: contexto que falta (el agente no conocía una convención que a cualquier humano senior le habrían contado) y gates que faltan (el agente anunció, fusionó o afirmó algo antes de verificar). Ambas tienen el mismo fix: escribe el contexto, y condiciona la acción a la evidencia. Los fallos más sutiles llegan después, del paralelismo: estado compartido de git hizo que un agente analizara la PR equivocada de principio a fin. Aísla todo y pinea cada ref. Asume que cualquier claim puede estar cruzado hasta que se verifique.',
        },
        {
          q: '¿Este enfoque funciona para un proyecto pequeño, o solo a escala?',
          a: 'La economía mejora con la escala, pero el punto de entrada es pequeño. Un repo con 10 issues al mes necesita un fichero de reglas, una suite de tests en la que confiar, y quizá un agente que hace triage y redacta respuestas. La flota puede esperar. Eso es un fin de semana de setup. Lo que la escala cambia es qué partes se vuelven estructurales: pasado cierto volumen, el mapa de colisiones, el delivery-watch y el fichero de lecciones que compone son la diferencia entre shippear cada semana y ahogarse. Yo empezaría cualquier repo, del tamaño que sea, con los mismos dos artefactos: un fichero de reglas que briefea al agente como a un senior recién contratado, y tests que digan la verdad.',
        },
      ],
    },
  },
  en: {
    slug: 'ai-agent-fleet',
    altSlug: 'flota-agentes-ia',
    readingTime: '14 min read',
    seo: {
      title: 'Agentic Maintenance: How I Run a 60,000-Star Repo with AI Agents',
      description: 'A fleet of Claude Code agents maintains career-ops: triage, tests, review briefs and releases in ~4h/week. The system, one documented day, and the playbook.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'AI Agent Fleet',
    },
    header: {
      kicker: 'How it is operated · Open Source',
      h1: 'Agentic maintenance: how I run a 60,000-star open source repo with a fleet of AI agents',
      subtitle: 'Agents do the mechanical work: triage, tests, review briefs, releases. The decisions are mine. This is the system, one fully documented day of it, and what it takes to run it on your own repo.',
      date: 'Jul 10, 2026',
    },
    tldr: 'career-ops is my open source job-search system: 60,797 GitHub stars, 187 contributors and 625 merged PRs as of today. I maintain it in about 4 hours a week. A fleet of Claude Code agents does the mechanical work — triage, testing, review briefs, release mechanics, community metrics. Hard gates keep them honest, and every real failure gets distilled into a rule they load on boot.',
    tldrCoin: {
      pre: ' ',
      term: 'Agentic maintenance',
      post: ' is the gated, evidence-based upkeep of a living codebase, sustained by a fleet of agents under human direction.',
    },
    internalLinks: {
      careerOps: {
        text: 'career-ops | Case Study',
        href: '/career-ops-system',
      },
    },
    sections: {
      outgrew: {
        heading: 'The week the repo outgrew me',
        paras: [
          'career-ops went live earlier this year. In April it took off: 12,000+ stars in 2 days.',
          'With the stars came the workload. On one documented night alone: 9 new PRs and 11 new issues before breakfast.',
          'While I held a full-time job as Head of Applied AI at a software company, my realistic budget for open source was about 4 hours a week. A repo this size wants a full-time maintainer. Career-ops is now my primary focus — but the 4-hour discipline is what shaped the system, and the fleet still does the mechanical work.',
          'So I rebuilt how the repo gets maintained. My job changed shape: I run the system that does the work, and I keep the decisions.',
        ],
      },
      fleet: {
        heading: 'The fleet',
        intro: 'Each agent is a persistent Claude Code session in its own tmux window, with its own memory. They coordinate through file-based IPC: JSON request/response files in a shared directory, with polling. The coordination layer is files: a decoupled state machine where every message is a readable artifact and every decision leaves a trace you can replay. It scales to a 60,000-star repo and still debugs with cat.',
        table: {
          headers: ['Agent', 'What it does'],
          rows: [
            ['Maintainer agent', 'The orchestrator: triage, PR review briefs, merge mechanics, releases, issue lifecycle'],
            ['Discord agent', 'Community announcements and channel management, handed off as digests with drafts included'],
            ['Web agent', 'Owns the first-party web layer; web PRs get labeled and routed to it'],
            ['Dogfood agent', 'Runs the tool as a real user in a clean clone and files structured friction reports'],
            ['Ephemeral verifiers', 'Read-only fan-outs in isolated git worktrees: parallel PR testers, adversarial reviewers, claim checkers. They report evidence and stop there.'],
          ],
        },
        loops: 'Two loops run unattended and survive reboots. An early-morning triage-prep pre-classifies the overnight flow, drafts included. An hourly delivery-watch detects when a contributor actually pushed after an ask: it watches the branch head change, because the "updated" timestamp also moves on comments and produces false positives.',
        split: 'The split is strict. Agents classify, test, watch, measure and draft. I decide what enters the core, merge order, governance and releases. Agents propose with evidence attached. The last word is mine.',
        priorArt: {
          pre: 'This orchestrator-plus-specialized-subagents shape is not new to me. I shipped it customer-facing in ',
          linkLabel: 'Jacobo',
          href: '/ai-agent-jacobo',
          post: ', a production multi-agent system with a router, specialized sub-agents, tool calling and human handoff.',
        },
      },
      gates: {
        heading: 'The gates',
        intro: 'Letting AI merge unsupervised would be negligence. Every gate below exists because something real broke first:',
        items: [
          { label: 'Test before deciding, on a clean checkout.', detail: 'Every PR runs against the full suite locally before any decision. And for environment-dependent code, clean-environment CI is the arbiter: a local run once passed while CI failed, because my populated working copy never exercised the "user files missing" path.' },
          { label: 'The first-timer gate.', detail: 'First-time contributors\' CI runs get explicitly approved and waited on until green. Never admin-bypassed. One PR went through the gate twice in a single day because updating the branch reset the approval. We waited twice.' },
          { label: 'Live CodeQL for anything that parses text.', detail: 'A security fan-out once approved a parser PR; the live CodeQL check then blocked it with a high-severity double-escaping finding the agents structurally could not see. CodeQL catches classes of bugs the test suite never exercises.' },
          { label: 'Adversarial review for plugins.', detail: 'Community plugins get reviewed by multiple independent agents instructed to break them: network egress, path traversal, ToS posture. The registry pins each plugin to a reviewed SHA, so users only ever install code a review approved.' },
          { label: 'Announcements gated on exit code.', detail: 'A public "Merged! 🚀" posts only after the merge command returns success. A premature announce burned us twice before this became law.' },
          { label: 'Claims verified before public action.', detail: 'Anything that would trigger a request-changes, a close, or an edit to a sensitive file gets reproduced against the real diff first, whether the claim came from an agent, a contributor, or my own grep.' },
          { label: 'Sensitive-file tiers and a written data contract.', detail: 'Files are classified by blast radius; critical-file changes without prior discussion get closed by policy. PRs that touch user data are rejected outright.' },
        ],
      },
      security: {
        heading: 'Security and isolation',
        paras: [
          'Agents run third-party code at machine speed, so the boundaries have to be explicit. Git worktrees isolate the file system. They do not isolate the runtime: when an agent tests a contributor\'s PR, that code runs on my machine, the same trade-off every OSS maintainer accepts the moment they check out a stranger\'s branch.',
          'The defenses are layered by trust. Code passes GitHub Actions and live CodeQL in GitHub\'s own sandbox before any agent touches it locally, and a first-time contributor\'s CI won\'t even run without explicit human approval. A pre-merge gate lists every sensitive file a diff touches before deep testing starts. And the test agents themselves are stripped down: read-only by contract, with every external tool stripped out (chat integrations, MCP servers included), which keeps the blast radius small.',
          'What\'s missing, said plainly: least-privilege service accounts are on the roadmap, not in place. That gap is real, and it\'s next on the hardening list.',
        ],
      },
      infraFails: {
        heading: 'When the infrastructure fails',
        paras: [
          'The design principle that holds everything together: GitHub is the canonical state. Everything local (session files, briefings, the logs) is a re-derivable cache plus an append-only record. A session that dies gets rebuilt, and the orchestrator\'s first phase re-checks every item against GitHub before acting, because a PR can merge or close while nobody was looking.',
          'One rule here took a real incident to learn. An unsupported flag plus a silenced stderr made a watcher swallow its own error, and it reported "no contributor deliveries" as a success, for hours, on an active afternoon. It got caught because the result contradicted what the day felt like. The rule since: the command that feeds a decision never silences its errors, and a failed check reports "could not verify" rather than "nothing found".',
        ],
      },
      memory: {
        heading: 'The memory that compounds',
        paras: [
          'Three artifacts make each session smarter than the last.',
          'An append-only decision log: 700+ rows, every action recorded with date, reason and contributor. A lessons file: 31 rules, each one a real failure distilled into a check that loads at boot. And contributor dossiers: a trust ledger with explicit tiers (Participant → Contributor → Triager → Trusted), merge counts and notes.',
          'Some lessons, paraphrased. Announce only after success (#10). Re-fetch a contributor\'s current head before pushing to their fork; a rejected push means stop (#16). For parsers, the live static-analysis gate is required (#18). Never @-mention a handle you didn\'t read from a tool result in the current session (#24: the agent once invented one, and fixed it within a minute).',
          'My favorite failure: git worktrees isolate the working tree but share .git/FETCH_HEAD. In one parallel fan-out, concurrent fetches overwrote it and an agent analyzed the wrong PR entirely. The adversarial verify step caught the cross-wired verdict before anything went public. The rule (each agent fetches to an isolated, per-PR named ref and cross-checks the pinned SHA) went into the lessons file and hasn\'t recurred.',
          'Agents fail. The system is built so their failures are cheap to catch and never repeated.',
          'The fleet itself is versioned the same way. Prompts, skills and rules are text files in git, so a behavior change is a readable commit, and skills load at invocation time, so changes land hot with zero downtime. Worth admitting: the skills have no formal test suite yet. Their quality mechanism is the learning loop itself, and so far it has held, because a real failure becomes a written rule and the rule becomes boot-time context.',
        ],
      },
      specimen: {
        heading: 'One documented day: July 2, 2026',
        opening: 'Opening state at 09:05: 53 open PRs, 74 open issues, +9 PRs and +11 issues overnight, main green.',
        outcomesLead: 'By the end of the day:',
        outcomes: [
          { label: 'v1.16.0 cut and live:', detail: '13 features, 7 fixes. The dogfood agent had found a user-facing break in the published release; that report became the argument to cut now.' },
          { label: '16 PRs merged.', detail: 'Among them: 3 community plugins registered at once after 3 independent adversarial approvals; an analytics feature built with a FAccT 2026 research paper as the spec; and a human-in-the-loop reshape audited line by line (zero network calls, exact domain allowlist).' },
          { label: '~25 issues triaged,', detail: '~8 warm closes with credit, 6+ precise request-changes. Every new PR and issue received a substantive first response the same day. Zero ghosting.' },
          { label: 'GitHub Trending, #5 overall.', detail: 'The Trending card read "322 stars today"; by midday the count was at ~408 against a ~190/day baseline.' },
        ],
        involvement: 'My total involvement: one sitting, about an hour, 8 decisions. Cut the release. Promote the first co-maintainer to write access (announced only after the grant call succeeded; see lesson #10). Decline a root-folder reorg, because path stability is a feature when 11,000+ forks depend on your paths, and harvest the good part (an ARCHITECTURE.md) with credit to the proposer. Close a 7-PR architecture spine from a high-volume contributor, warmly and RFC-first: velocity doesn\'t buy architectural authorship. Two of the day\'s eight decisions became written doctrine in ARCHITECTURE.md the same evening.',
        closing: [
          'Everything left on my plate at day\'s end: two Discord clicks, drafts pre-written by the fleet.',
          'The dogfood loop closed the same day too. One field report, 13 findings. 1 direct fix, 11 precisely scoped issues filed. 3 of those issues came back as community PRs and merged before midnight.',
        ],
      },
      catches: {
        heading: 'What the fleet catches that I would miss',
        items: [
          { title: 'The macOS bug CI couldn\'t see.', body: 'A test crashed only on macOS: mkdtempSync returns a path under /var, which is a symlink to /private/var, and a guard failed silently. Ubuntu CI was green the whole time. The local full-suite gate caught it, the contributor got the diagnosis with the exact fix, and came back with a PR adding a 3-OS CI matrix (#1719 → #1762).' },
          { title: '10 merges, 3 collisions, 0 breakages.', body: 'One morning this week had 10 PRs to land, and 3 clusters of them touched the same files. The briefing\'s collision map set the safe merge order and re-validated CI after each landing.' },
          { title: 'The audit loop.', body: 'A community member reported CV formatting drift. The fix shipped in v1.18 (#1388). The user came back with a commit-pinned audit of what remained (#1736). The agent re-verified each finding against that morning\'s main and found one already resolved by a merge the auditor couldn\'t have known about. Another contributor shipped "Closes #1736" within hours (#1759). The agent\'s job there was routing, so no one duplicated work.' },
          { title: 'The human save.', body: 'A success story once arrived with a title so generic it looked like spam. The read-the-body-before-classifying rule saved it. It ended up celebrated in the community\'s success-stories channel.' },
        ],
      },
      numbers: {
        heading: 'The numbers',
        warpchart: {
          alt: 'Live star telemetry of santifer/career-ops',
          caption: 'Live career-ops telemetry — by',
          linkLabel: 'Warpchart',
        },
        asOf: 'As of July 21, 2026:',
        table: {
          headers: ['Metric', 'Value'],
          rows: [
            ['GitHub stars', '60,797'],
            ['Forks', '11,983'],
            ['Contributors', '187'],
            ['Merged PRs', '625'],
            ['Releases since the April launch', '21 (latest: v1.18.0, July 7)'],
            ['Test suite', '1,667 assertions, 0 failing (Jul 2026)'],
            ['Discord members', '4,200'],
            ['Weekly traffic', '26,831 unique visitors · 8,680 unique cloners — 32% view→clone (Jul 2026)'],
            ['Worldwide rank', 'one of the ~350 most-starred repositories on GitHub (warpchart, Jul 2026)'],
            ['Human attention budget', '~4 hours/week'],
          ],
        },
        closing: 'That view→clone rate is the number I watch. Stars measure applause; clones measure use.',
        dora: {
          pre: '',
          linkLabel: 'DORA\'s 2025 State of AI-assisted Software Development',
          post: ' measured what most engineering teams now feel: AI lifts individual output (98% more merged PRs) while organizational delivery metrics stay flat. Their headline finding is that AI amplifies the system it lands in. The gap between those two numbers lives in everything this article describes: review, trust, memory, gates. This repo is that gap closed in public, at 60,000-star scale, on 4 hours a week.',
        },
      },
      community: {
        heading: 'The community runs on the same principles',
        paras: [
          'The 4,200-member Discord gets the same discipline as the codebase, with lighter gates. A community-brain agent sweeps the channels and distills chat into a queryable ledger: recurring pains, feature requests, promises made. New requests get deduped against existing issues, and what survives becomes labeled issues and RFCs on the public roadmap. A grounded FAQ bot answers setup questions from the repo\'s own docs, with zero hallucinated answers observed so far, and hands off to a human when the docs don\'t cover it.',
          'The gates are lighter here because the error budget is bigger: a wrong FAQ answer gets a human correction, where a wrong merge would get a revert and a post-mortem.',
          'This year the community reported its first member landing a job with the tool. Adoption is a system, and this one closes its loop in public.',
        ],
      },
      playbook: {
        heading: 'Making your repo agent-friendly',
        intro: 'The fleet took months to harden. The foundations underneath it transfer to any repo, and most of them are context engineering:',
        steps: [
          { label: 'Rules files', detail: 'that brief an agent the way you\'d brief a senior engineer joining the project: conventions, architecture, gotchas, commands, boundaries. In practice: CLAUDE.md and ' },
          { label: 'A test suite the agent can treat as ground truth.', detail: 'If your tests lie, agents amplify the lie at machine speed.' },
          { label: 'Written contracts instead of tribal knowledge:', detail: 'a data contract, sensitive-file tiers, a documented review checklist. "No" works better as policy than as mood.' },
          { label: 'Logs that compound:', detail: 'an append-only decision log and a lessons file. A failure either becomes a written rule or it repeats.' },
          { label: 'Isolation for parallelism:', detail: 'git worktrees plus per-task named refs. Shared state is how agents cross-contaminate.' },
          { label: 'Gates where trust is thin:', detail: 'first-timers, parsers, anything that acts in public.' },
        ],
        agentsMd: {
          linkLabel: 'AGENTS.md',
          post: ', now an open standard used by 60,000+ projects.',
        },
        closing: 'Start with the first two and a single triage agent. The fleet is what that grows into.',
      },
      breaks: {
        heading: 'Where this breaks',
        items: [
          { label: 'Ambiguity.', detail: 'Agents misread intent when a diff and its issue disagree. That\'s exactly why they propose and I decide.' },
          { label: 'Verification.', detail: 'My unit of review shifted from diffs to evidence: test output, audit trails, adversarial verdicts. Building the habit of demanding evidence took longer than building the agents.' },
          { label: 'Voice.', detail: 'Anything in my own name (announcements, thanks, public judgment calls) stays human. Readers can tell, and they should be able to.' },
          { label: 'Time.', detail: 'This system is 31 distilled failures old. Day one will not look like this, and pretending otherwise would be selling you something.' },
        ],
        verificationExtra: {
          pre: 'The industry is starting to call this the verification bottleneck: ',
          linkLabel: '2025 data across hundreds of orgs',
          post: ' shows merged PRs nearly doubling while review time climbs 91%. The gates above are what that problem looks like solved for one repo.',
        },
      },
      orgBridge: {
        heading: 'From one repo to an engineering org',
        paras: [
          'Everything above has an organizational twin. Rules files are a golden path: the platform team\'s paved road, applied to agents. The collision map is CODEOWNERS logic that scales past human patience. The gates are a trust policy, written down and cheap to audit. The lessons file is a postmortem culture that compounds. And the propose-decide split is the same division a VP of engineering already runs between staff engineers and their teams, with the mechanical layer swapped out.',
          'Where teams struggle is the system around the tools. That\'s the part that transfers, and transferring it is forward-deployed work: embed with a team, rewire how it ships, leave the capability behind.',
        ],
      },
      coreConcepts: {
        heading: 'The core concepts of agentic maintenance',
        intro: 'Six patterns, named so you can reuse them:',
        items: [
          { label: 'The orchestrator agent:', detail: 'a central routing node that delegates specialized work and aggregates evidence into briefs a human can decide on.' },
          { label: 'The ephemeral verifier:', detail: 'a short-lived, read-only agent spawned in an isolated git worktree to validate one thing, report evidence, and disappear.' },
          { label: 'The grounded watcher:', detail: 'a persistent background loop that watches source-control or telemetry events and triggers work asynchronously, under the rule that a failed check reports "could not verify" rather than "nothing found".' },
          { label: 'The compound memory ledger:', detail: 'an append-only log of decisions and distilled failures that loads into every new session, so each session starts smarter than the last.' },
          { label: 'The tool-stripped actor:', detail: 'an execution agent deliberately denied every external tool (chat integrations, MCP servers included) to shrink the blast radius while it runs untrusted code.' },
          { label: 'The sequential quality gate:', detail: 'a blocking checkpoint (CI green, live static analysis, human approval for first-timers) that halts the pipeline until a trust condition is met.' },
        ],
        closing: 'Together they make up agentic maintenance as this repo practices it.',
      },
      lessons: {
        heading: 'Lessons',
        items: [
          { title: 'Design from autopsies', detail: 'Every gate exists because something real broke first. The system did not come from a whitepaper: it came from failures with dates and issue numbers.' },
          { title: 'Agents propose with evidence. Humans own the no', detail: 'The fleet converts an unbounded stream of mechanical work into a bounded menu of decisions. Taking the last word away from the human is not automation: it is abdication.' },
          { title: 'A failure either becomes a written rule or it repeats', detail: 'The lessons file loads on every boot. Memory that is not written down does not compound.' },
          { title: 'Boring contracts make agent speed safe', detail: 'Pinned SHAs, path stability, data boundaries. The boring parts are what let agents move fast without breaking anyone.' },
          { title: 'The repo became the résumé', detail: 'How a project is maintained demonstrates more than any interview could. This article is the receipt.' },
        ],
      },
      cta: {
        heading: 'This operating model, applied to your engineering team',
        body: 'I design and operate multi-agent systems in production: fleets that turn mechanical volume into bounded decisions, with gates, memory and evidence. I deploy this operating model embedded with engineering teams (forward-deployed). If your team is drowning in volume, let\'s talk.',
        ctaLabel: 'Email me',
        ctaHref: 'mailto:hi@santifer.io',
        secondaryLabel: 'Read the career-ops case study',
        secondaryHref: '/career-ops-system',
      },
      relatedWork: {
        heading: 'Related work',
        items: [
          { text: 'Jacobo: production multi-agent AI | Case study', href: '/ai-agent-jacobo' },
          { text: 'Business OS: custom ERP + automation | Case study', href: '/business-os-for-airtable' },
        ],
      },
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'What is agentic maintenance?',
          a: 'Agentic maintenance is the practice of keeping a living codebase healthy through a fleet of AI agents that do the mechanical work — triage, testing, review briefs, release mechanics, community metrics — under explicit human direction. Three properties separate it from simply pointing a coding agent at a repository. First, gates: every consequential action passes a blocking checkpoint (clean-checkout tests, live static analysis, human approval where trust is thin), and anything public is verified before it happens. Second, evidence: agents never ask for trust; they attach test output, audit trails and adversarial verdicts, and a human decides on the brief. Third, compound memory: every real failure is distilled into a written rule that loads into every future session, so the system gets safer as it ages. In the reference implementation described in this article, agentic maintenance runs a 60,000-star open source repository on roughly 4 hours of human attention a week.',
        },
        {
          q: 'Can AI agents maintain a codebase by themselves?',
          a: 'No, and this system is designed on the assumption that they shouldn\'t. The agents handle volume: classifying the overnight flow, running test suites against clean checkouts, drafting review briefs, watching for contributor deliveries, measuring community health. Every consequential action passes through gates, and anything strategic (what enters the core, merge order, governance, releases, public judgment calls) lands on a human decision menu with evidence attached. It\'s division of labor: agents convert an unbounded stream of mechanical work into a bounded set of decisions. In my case that bound is about 4 hours a week for a repo with 60,797 GitHub stars and 187 contributors. Remove the human and what\'s left is unreviewed authority over other people\'s code.',
        },
        {
          q: 'How much does it cost to run an AI agent fleet like this?',
          a: 'Less than the phrase "agent fleet" suggests. The whole system runs on a Claude Code subscription plus commodity tooling: tmux for sessions, git worktrees for isolation, JSON files for inter-agent communication, GitHub Actions for CI. Everything lives on the laptop it runs on, without GPUs, a vector database or an orchestration platform. The genuinely scarce resource is human attention, which is the point: the design target was fitting a viral repo into roughly 4 hours a week of my time. If you\'re evaluating this for your own project, budget more for writing rules files and hardening tests than for compute, because context quality has been the binding constraint at every stage. Cost figures: subscription-based, as of July 2026.',
        },
        {
          q: 'Do AI agents replace open source maintainers?',
          a: 'They replace maintainer toil. Triage, rebases, test runs, dedup checks and status chasing stop consuming the week. What remains is judgment: project vision, contributor trust, architectural authorship, and the ability to say no warmly. On my documented specimen day, the fleet processed 16 merges, ~25 triaged issues and a release, while my contribution was 8 decisions in about an hour. One of those decisions closed 7 PRs from one of the project\'s most prolific contributors, RFC-first, because unowned architecture becomes debt. No agent should make that call, and none did. The maintainer keeps the role and loses the backlog.',
        },
        {
          q: 'How do you review AI-generated and human pull requests at this scale?',
          a: 'Three parallel axes. Automated code review handles tactical nits. CI runs the full suite (1,667 assertions today) plus CodeQL, dependency review and a privacy guard that rejects user data in PRs. The maintainer agent then builds a brief per PR: spec-fit against the originating issue, contributor history, collision map against other open PRs, and a local clean-checkout test run. I read briefs and evidence, and I read diffs only where the brief says trust is thin: first-time contributors, parsers, sensitive files. Merge order comes from the collision graph, and CI re-validates after each landing. The day that system handled 10 merges with 3 file-level collisions, main never broke.',
        },
        {
          q: 'What breaks first when you try this on your own repo?',
          a: 'Context, almost always. An agent dropped into a repo without rules files, current docs and trustworthy tests produces confident nonsense, and the temptation is to blame the model. In my logs, the early failures cluster into two families: missing context (the agent didn\'t know a convention any senior human would have been told) and missing gates (the agent announced, merged or claimed something before verification). Both have the same fix: write the context down, and gate the action on evidence. The subtler failures come later, from parallelism: shared git state let one agent analyze the wrong PR entirely. Isolate everything and pin every ref. Assume any claim can be cross-wired until verified.',
        },
        {
          q: 'Does this approach work for a small project, or only at scale?',
          a: 'The economics get better with scale, but the entry point is small. A repo with 10 issues a month needs a rules file, a test suite it can trust, and maybe one agent that triages and drafts replies. The fleet can wait. That\'s a weekend of setup. What scale changes is which parts become load-bearing: past a certain volume, the collision map, the delivery-watch and the compounding lessons file become the difference between shipping weekly and drowning. I\'d start any repo, whatever its size, with the same two artifacts: a rules file that briefs the agent like a new senior hire, and tests that tell the truth.',
        },
      ],
    },
  },
} as const
