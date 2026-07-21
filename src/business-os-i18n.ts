export const businessOsContent = {
  es: {
    slug: 'business-os-para-airtable',
    altSlug: 'business-os-for-airtable',
    readingTime: '15 min de lectura',
    seo: {
      title: 'Cómo Construí un Business OS Custom para +30.000 Reparaciones con Airtable (170h/Mes Ahorradas) | santifer.io',
      description: 'Case study: cómo construí un Business OS con 12 bases de Airtable, 2.100+ campos y 50+ automatizaciones que ahorra 170h/mes en un negocio de reparación de móviles con +30.000 reparaciones completadas.',
    },
    nav: {
      breadcrumbHome: 'Inicio',
      breadcrumbCurrent: 'Business OS',
    },
    header: {
      kicker: 'Case Study: Santifer iRepair',
      h1: 'Business OS para +30.000 Reparaciones',
      subtitle: 'Cómo construí un sistema operativo de negocio completo con Airtable: 12 bases interconectadas, 2.100+ campos y 50+ automatizaciones que ahorran 170h/mes.',
      badge: 'Sistema vendido con el negocio en 2025. Sigue en producción hoy',
      date: '25 feb 2026',
    },
    heroMetrics: [
      { value: '170h/mes', label: 'Automatizadas' },
      { value: '12', label: 'Bases Airtable' },
      { value: '2.100+', label: 'Campos' },
      { value: '50+', label: 'Automatizaciones' },
      { value: '30K+', label: 'Reparaciones' },
    ],
    tldr: 'Construí un sistema operativo de 12 bases en Airtable que gestionaba un negocio de 16 años: ERP, CRM, citas, agentes IA y web programática, todo desde una única fuente de verdad. 170+ horas/mes automatizadas. Vendí la empresa y el comprador lo mantuvo todo funcionando. Esto es lo que diseñaría para vuestros clientes.',
    intro: {
      hook: '30.000+ reparaciones. 12 bases. 2.100 campos. Cero ERPs comerciales. Todo construido sobre Airtable.',
      body: 'Un negocio de reparación multiservicios no cabe en un ERP genérico. En 2019, evalué RepairDesk (99$/mes), Orderry y RepairShopr: todas existían, pero ninguna cubría el modelo multiservicios (reparaciones + accesorios), ni ofrecía CRM con gamificación, automatizaciones complejas o SEO programático. Necesitaba un sistema que fuera la fuente única de verdad para todo: pedidos, inventario, clientes, reservas, facturación y automatizaciones. Así que lo construí.',
    },
    internalLinks: {
      jacobo: { text: 'Agente IA Jacobo | Case Study', href: '/agente-ia-jacobo' },
      pseo: { text: 'SEO Programático | Case Study', href: '/seo-programatico' },
      n8n: { text: 'n8n para PMs | Artículo', href: '/n8n-para-pms' },
      careerOps: { text: 'career-ops: Agente IA Multi-Agente | Case Study', href: '/career-ops' },
    },
    sections: {
      dayInLife: {
        heading: 'Un Día en la Vida del Sistema',
        body: 'Esto es lo que pasa cuando un cliente escribe "Quiero reparar mi iPhone 14 Pro":',
        steps: [
          { emoji: '1️⃣', text: 'Jacobo (agente IA omnicanal) detecta la intención de reparación, identifica el modelo y consulta stock de pantallas en Airtable en tiempo real.' },
          { emoji: '2️⃣', text: 'Stock disponible → Jacobo responde con precio estimado y pregunta cuándo quiere venir. El cliente dice su preferencia en lenguaje natural, y un subagente de Jacobo consulta la disponibilidad de YouCanBookMe para ofrecer los huecos más cercanos. Cero fricción, sin salir de la conversación.' },
          { emoji: '3️⃣', text: 'Cliente confirma hora → la cita se crea en YouCanBookMe, la orden de trabajo se genera en Airtable y las piezas se auto-reservan del inventario — bloqueadas para esa reparación.' },
          { emoji: '4️⃣', text: 'El técnico ve la orden en su tablet con todo el detalle: modelo, reparación, piezas reservadas y ubicación exacta en el almacén.' },
          { emoji: '5️⃣', text: 'Reparación completada → factura generada automáticamente → puntos de fidelización añadidos al CRM → cliente recibe encuesta de satisfacción por WhatsApp.' },
        ],
        jacoboCta: {
          heading: '¿Quieres saber más sobre Jacobo?',
          body: 'Agente IA omnicanal que atiende clientes por WhatsApp y voz, consulta stock en tiempo real y gestiona citas de forma autónoma.',
          label: 'Leer el case study completo',
        },
        pseoCta: {
          heading: '¿Cómo generamos contenido web para cada modelo y reparación?',
          body: 'El CMS de Airtable alimentaba una web programática con páginas únicas por modelo y tipo de reparación — todo automatizado con keyword research.',
          label: 'Ver case study de SEO Programático',
        },
      },
      whyCustom: {
        heading: '¿Por Qué No Usé RepairDesk ni Odoo?',
        body: 'Antes de construir, investigué las alternativas. Ninguna encajaba:',
        reasons: [
          {
            tool: 'RepairDesk (99$/mes)',
            issue: 'Ya existía en 2019. Cubre ticketing e inventario, pero está diseñado para talleres de reparación puros. No soportaba el modelo multiservicios (reparaciones + accesorios), ni CRM con tiers/gamificación, ni automatizaciones complejas.',
          },
          {
            tool: 'RepairShopr / Orderry',
            issue: 'También disponibles en 2019. RepairShopr tenía email marketing básico ("Marketr") y Zapier, pero flujos rígidos. Orderry, buena base sin capacidad real de automatización. Ninguno ofrecía SEO programático ni integración con agentes IA.',
          },
          {
            tool: 'ERP tradicional (Odoo, SAP B1)',
            issue: 'Sobredimensionado, lento de implementar, y sin la flexibilidad para iterar semanalmente. El coste de personalización superaba con creces el de construir algo propio.',
          },
        ],
        punchline: 'La decisión clave: necesitaba control total sobre los flujos de datos y la capacidad de automatizar cualquier proceso en horas, no en semanas.',
      },
      overview: {
        heading: '12 Bases de Airtable como Business OS No-Code',
        body: 'El Business OS es un ecosistema de 12 bases de Airtable interconectadas. Cada base es dueña de un dominio acotado, y las 50+ automatizaciones nativas orquestan los flujos de datos entre ellas mediante linked records — sin duplicar, solo vinculando lo necesario.',
        stats: [
          { value: '12', label: 'Bases Airtable' },
          { value: '2.100+', label: 'Campos totales' },
          { value: '50+', label: 'Automatizaciones' },
          { value: '170h', label: 'Ahorro mensual' },
        ],
        bases: [
          { name: 'ERP Central', desc: 'Hub operativo del negocio: órdenes de trabajo (496 campos en la tabla OTS), inventario, pedidos, reservas y garantías.' },
          { name: 'CRM', desc: 'Clientes, lead scoring, tiers de fidelización, historial completo y comunicaciones automáticas.' },
          { name: 'Contabilidad', desc: 'Conciliación bancaria automática, generación de facturas, control de gastos y reportes financieros.' },
          { name: 'Catálogo de Piezas', desc: 'Precios y stock de proveedores de piezas de reparación, sincronizado con el inventario del ERP.' },
          { name: 'Catálogo de Accesorios', desc: 'Fundas, protectores, cargadores. Catálogo de proveedores sincronizado con inventario.' },
          { name: 'CMS Web', desc: 'Headless CMS con 1.534 campos y 647 fórmulas que alimenta la web programática por modelo y reparación.' },
          { name: 'Feedback Clientes', desc: 'Encuestas de satisfacción, NPS y seguimiento post-servicio automatizado.' },
          { name: 'Reseñas', desc: 'Reseñas internas y externas (Google) extraídas y agregadas automáticamente.' },
          { name: 'KWR Automatizado', desc: 'Keyword research por modelo y reparación vía DataForSEO para decisiones de SEO programático.' },
          { name: 'Publicaciones GBP', desc: 'Casos de éxito before/after generados para Google Business Profile.' },
          { name: 'Contenido Corto', desc: 'Contenido por tipo de reparación para redes sociales y comunicaciones.' },
          { name: 'Custom GPT', desc: 'Configuración y prompts de los GPTs internos de consultas de stock y precios.' },
        ],
      },
      e2eFlows: {
        heading: 'Flujos End-to-End',
        body: 'Cada flujo traza el happy path — la secuencia ideal desde el trigger hasta la resolución. Las bases involucradas aparecen etiquetadas en cada flujo.',
        items: [
          {
            icon: '🔧',
            name: 'Ciclo de Reparación — De la Consulta a la Entrega',
            trigger: 'Cliente contacta preguntando por una reparación',
            summary: 'El flujo completo desde que un cliente pregunta hasta que recoge su dispositivo reparado — con reserva automática de piezas, citas y facturación.',
            basesTouched: ['ERP', 'Catálogo de Piezas', 'CRM', 'Contabilidad'],
            details: [
              'Intake: Jacobo identifica modelo + tipo de reparación → consulta stock en Airtable en tiempo real (integration contract: AI Agent ↔ Airtable REST API)',
              'Quoting: precio calculado automáticamente considerando coste de pieza + margen configurado + tier del cliente del CRM. Si el margen es bajo, se revisa manualmente',
              'Scheduling: subagente de citas consulta YouCanBookMe → ofrece slots disponibles → crea cita + OT en Airtable + reserva piezas automáticamente. Source of truth: YCBM para disponibilidad temporal, ERP para la OT',
              'Si hay stock de la pieza necesaria, auto-acepta la cita; si no, genera una orden de compra urgente para dar solución rápida',
              'Ejecución: el técnico ve la OT en su tablet con todo el detalle — modelo, reparación, piezas reservadas y ubicación exacta en el almacén (armario, cajón, posición)',
              'Completion: reparación cerrada → factura auto-generada con numeración secuencial y datos fiscales → puntos de fidelización sumados al CRM → encuesta de satisfacción por WhatsApp',
              'La tabla OTS tiene 496 campos — el registro central (source of truth) al que alimentan casi todas las demás bases. Trazabilidad completa: cada pieza queda vinculada a su orden de compra, proveedor y la reparación en la que se usó',
            ],
          },
          {
            icon: '📦',
            name: 'Aprovisionamiento y Cadena de Suministro',
            trigger: 'Stock de una pieza baja del umbral mínimo configurado',
            summary: 'Desde la detección de stock bajo hasta la reposición, consumo y conciliación financiera — con auto-PO y clasificación de inventario.',
            basesTouched: ['ERP', 'Catálogo de Piezas', 'Catálogo de Accesorios', 'Contabilidad'],
            details: [
              'Threshold trigger: stock < mínimo → auto-genera orden de compra al proveedor con mejor precio. Multi-supplier fallback: cada pieza tiene 2-3 proveedores alternativos con precios y tiempos de entrega comparados',
              'Alertas de stock personalizadas por pieza: las pantallas de iPhone se piden con más margen que los modelos menos demandados',
              'Recepción: pieza entra → ubicación asignada automáticamente por Airtable según ocupación (armario, cajón, posición)',
              'Consumo: al cerrar la OT, las piezas se descuentan automáticamente del inventario',
              'Dos ciclos de vida distintos (inventory classification): piezas se consumen en reparaciones, accesorios se venden directamente. Precios de venta de accesorios calculados automáticamente con margen configurable por categoría',
              'Control de rotación: accesorios sin venta en 60+ días → alerta de descuento o retirada',
              'Control de calidad: cada pieza tiene un grade (original, compatible premium, compatible estándar) que impacta precio y garantía',
              'Conciliación: cada orden de compra se empareja automáticamente con el movimiento bancario. Control de gastos integrado — cada gasto vinculado a categoría, proveedor y centro de coste',
              'Reportes financieros mensuales auto-generados con P&L, flujo de caja y comparativa vs. mes anterior',
            ],
          },
          {
            icon: '🌐',
            name: 'Pipeline de Contenido a Ingresos',
            trigger: 'Nuevo modelo o tipo de reparación añadido al catálogo',
            summary: 'De un nuevo modelo en Airtable a una landing page posicionada en Google — con KWR automático, precios dinámicos y contenido original a escala.',
            basesTouched: ['CMS Web', 'KWR', 'GBP', 'Contenido', 'Catálogo de Piezas', 'Catálogo de Accesorios'],
            details: [
              'KWR automático extrae keywords por modelo+reparación (DataForSEO API) → prioriza por volumen y dificultad',
              'CMS genera landing page: precio, disponibilidad, descripción SEO, FAQ, JSON-LD — todo desde fórmulas. 1.534 campos y 647 fórmulas calculan desde URLs canónicas hasta structured data (headless CMS pattern)',
              'Catalog sync contract: si cambia el precio de una pieza → se actualiza en la web sin intervención',
              'GBP posts con fotos reales before/after de reparaciones, extraídas directamente del ERP. Un proceso HITL filtra imágenes con información personal antes de publicar. Con cientos de reparaciones distintas, cada publicación era única — contenido original a escala',
              'Gestión multiidioma (ES/EN) desde la misma base — cada campo tiene su variante traducida',
              'Resultado: presencia orgánica constante sin dedicar horas semanales a crear contenido manualmente. Todo conectado al CMS Web con internal linking automático',
            ],
          },
          {
            icon: '👥',
            name: 'Ciclo de Vida del Cliente y Retención',
            trigger: 'Reparación completada — comienza el ciclo post-servicio',
            summary: 'Lead scoring, tiers de fidelización, reseñas automatizadas y campañas de reactivación — el feedback loop que convierte clientes puntuales en recurrentes.',
            basesTouched: ['CRM', 'Feedback', 'Reseñas', 'Comunicaciones'],
            details: [
              'Lead scoring automático: cada interacción suma puntos → 5 tiers (Bronze → Silver → Gold → Diamond → Platinum) con beneficios progresivos como descuentos, prioridad en citas y garantía extendida',
              '48h post-reparación → solicitud de reseña en Google, solo si el cliente no tiene reclamaciones abiertas (conditional trigger)',
              'Respuesta asistida a reseñas: el CRM cruza automáticamente el nombre del revisor con el historial — modelo reparado, tipo de reparación, técnico asignado y tier. Responder con "gracias por confiar en nosotros para tu iPhone 12 Pro" en vez de un genérico marcaba la diferencia',
              'Encuesta de satisfacción por WhatsApp con 3 preguntas rápidas → los resultados alimentan el lead scoring (feedback loop: survey → scoring → tier → beneficios)',
              'Cliente inactivo +90 días → campaña de reactivación automática con ofertas personalizadas según historial de reparaciones y compras',
              'Reclamaciones estructuradas: cada queja se vincula a la OT original, técnico responsable y resolución aplicada. Dashboard de NPS por período para detectar tendencias',
              'Historial completo por cliente: todas las reparaciones, compras, comunicaciones y reclamaciones en una vista',
            ],
          },
        ],
      },
      crossCutting: {
        heading: 'Capacidades Transversales',
        body: 'Estas capacidades no pertenecen a un flujo — operan a través de todos.',
        items: [
          {
            icon: '✅',
            name: 'Guardrails de Datos — 50+ Reglas de Negocio',
            summary: 'Las guardrails bloquean datos incorrectos en origen — más barato que corregir downstream. El sistema guía al empleado en cada proceso: si se despista, le indica qué falta.',
            details: [
              'No se puede cerrar una reparación sin registrar las piezas usadas',
              'No se puede facturar sin que el cliente haya firmado el presupuesto',
              'No se puede dar de alta un producto sin precio de coste y margen mínimo',
              'Alerta automática si un técnico tiene más de 5 reparaciones abiertas simultáneamente',
              'Validación de IMEI duplicado: si un dispositivo ya está en el sistema, se vincula al historial existente',
              'Control de coherencia: si el presupuesto dice "pantalla" pero las piezas registradas son "batería", se bloquea',
            ],
          },
          {
            icon: '📱',
            name: 'Notificaciones Event-Driven',
            summary: 'Cada evento de negocio (cita confirmada, reparación completada, factura emitida) dispara una notificación por el canal apropiado. La capa de comunicación está desacoplada de la lógica de negocio.',
            details: [
              'Notificaciones automáticas por evento: confirmación de cita, reparación completada, factura emitida',
              'Templates de WhatsApp aprobados por Meta con variables dinámicas (nombre, modelo, precio)',
              'Integración nativa con el sistema de reservas: el cliente recibe confirmación instantánea al reservar',
              'Si la pieza no está en stock, salta una notificación interna de pedido urgente al equipo para darle solución rápida',
            ],
          },
          {
            icon: '🤖',
            name: 'Capa de Consultas con IA',
            summary: 'Dos GPTs internos usan Airtable como source of truth — interfaz de lenguaje natural sobre datos operacionales, sin alucinaciones.',
            details: [
              'GPT de Stock: "¿Tenemos pantallas de iPhone 14 Pro?" → consulta Airtable en tiempo real y responde con stock, proveedor, precio de coste, y exactamente en qué armario y cajonera está la pieza. También indica si hay otras reparaciones en curso que estén usando esa misma pieza',
              'GPT de Precios: "¿A cuánto vendemos la reparación de un Samsung S23?" → calcula precio final considerando coste de pieza + margen configurado + tier del cliente',
              'Ambos GPTs usan Airtable como fuente de verdad, eliminando respuestas inventadas',
            ],
          },
          {
            icon: '🎬',
            name: 'IA Generativa Aplicada',
            summary: 'Airtable como fuente de verdad, GenAI como motor creativo. Desde el catálogo de productos y datos del negocio se generaban piezas visuales para escaparate, redes sociales y campañas, sin intervención manual en el contenido.',
            details: [
              'Digital signage para escaparate generado con IA: imágenes de producto y promociones desplegadas en pantallas en tienda, alimentadas desde el catálogo de Airtable',
              'Reels de Instagram con vídeo generado por Sora (OpenAI) y canciones originales con Suno (IA): storytelling emocional, humor y marca, editados con DaVinci Resolve',
              'Pipeline completo: dato en Airtable → prompt → generación visual → publicación en canal (escaparate, Instagram, WhatsApp)',
            ],
          },
        ],
      },
      impact: {
        heading: 'El Desglose de 170h/Mes',
        body: 'No es un número inventado. Cada ahorro está calculado en base a la frecuencia de la tarea y el tiempo manual que requería antes (medido con registro de tiempos antes/después durante 3 meses):',
        savings: [
          { module: 'Órdenes de compra automáticas', before: '45 min/día', after: '0 (automático)', monthly: '~22h' },
          { module: 'Respuestas a consultas de precio/stock', before: '2h/día', after: '5 min (GPT)', monthly: '~58h' },
          { module: 'Seguimiento de reparaciones', before: '30 min/día', after: 'Automático', monthly: '~15h' },
          { module: 'Gestión de citas y confirmaciones', before: '45 min/día', after: 'Automático', monthly: '~22h' },
          { module: 'Facturación y presupuestos', before: '1h/día', after: '10 min', monthly: '~25h' },
          { module: 'Reactivación de clientes inactivos', before: '3h/semana', after: 'Automático', monthly: '~12h' },
          { module: 'Reportes y KPIs', before: '4h/semana', after: 'Automático', monthly: '~16h' },
        ],
        total: '~170h/mes',
        punchline: 'Son más de un empleado a tiempo completo. Y el sistema no se enferma, no se va de vacaciones, y no comete errores de copia-pega. Este sistema fue parte integral de la venta del negocio en 2025 (going-concern sale) — lo suficientemente robusto para que el comprador lo adquiriera como activo operativo.',
      },
      beforeAfter: {
        heading: 'Antes vs Después',
        items: [
          { area: 'Gestión de datos', before: 'Checkout POS rudimentario, datos fragmentados entre sistemas sin conexión', after: 'Airtable como fuente única de verdad (SSOT) — un dato, un lugar' },
          { area: 'Comunicación con clientes', before: 'Grupos de WhatsApp, mensajes manuales uno a uno', after: 'Triggers automáticos por evento: confirmación, recordatorio, completado' },
          { area: 'Facturación', before: 'Facturas manuales desde Checkout POS, errores frecuentes de datos', after: 'Auto-generadas al completar reparación, con datos fiscales correctos' },
          { area: 'Control de stock', before: 'Revisión visual, "creo que quedan 2"', after: 'Alertas en tiempo real, órdenes de compra automáticas al llegar al mínimo' },
          { area: 'Errores humanos', before: 'Copy-paste entre sistemas, datos inconsistentes', after: '0 errores con 50+ validaciones automáticas que bloquean inconsistencias' },
        ],
      },
      decisions: {
        heading: 'Architecture Decision Records (ADRs)',
        body: 'Cada decisión técnica tiene un porqué. Estas son las más importantes:',
        items: [
          {
            title: '¿Por qué Airtable como SSOT?',
            detail: 'Airtable combina la flexibilidad de una hoja de cálculo con la estructura de una base de datos relacional. Para un negocio que itera semanalmente, la velocidad de cambio es crítica. Añadir un campo o una vista nueva toma minutos, no días de desarrollo.',
          },
          {
            title: '¿Por qué custom en vez de SaaS?',
            detail: 'El SaaS impone su modelo de datos. Cuando tu negocio es multiservicios (reparaciones + accesorios), ningún vertical SaaS cubre todo. El coste de adaptación supera al de construcción.',
          },
          {
            title: '¿Cuándo NO construir custom?',
            detail: 'Si tu negocio encaja en un vertical estándar (solo reparaciones, sin multi-servicio), usa RepairDesk o similar. Construir custom tiene sentido cuando el diferencial de negocio está en los procesos, no en el producto.',
          },
          {
            title: '¿Por qué automatizaciones nativas de Airtable y no Zapier/Make?',
            detail: 'Las automatizaciones de Airtable viven dentro de la misma base, acceden directamente a los datos y no tienen coste por ejecución. Para la lógica de negocio del día a día (50+ automatizaciones), eso es imbatible. Make se usa como pegamento para integraciones específicas: notificaciones de reseñas nuevas en Google My Business (integración oficial), webhooks con proveedores y sincronización con pasarelas de pago. n8n se usa para Jacobo (el agente IA), donde se necesita orquestación compleja con modelos de lenguaje y tool calling.',
          },
          {
            title: '¿Cómo se gestionan 2.100+ campos sin caos?',
            detail: 'Separando responsabilidades: cada base tiene un dominio claro y solo sincroniza con otras bases la información estrictamente necesaria mediante linked records. No se duplica todo — se vincula lo justo. Eso, combinado con vistas filtradas por rol (el técnico ve lo suyo, ventas ve lo suyo), hace que cada usuario interactúe con un subconjunto manejable del sistema.',
          },
          {
            title: 'Logic placement: dónde vive cada regla',
            detail: 'Simple → automatizaciones nativas de Airtable (0 coste/ejecución, pero con techo de 100.000 runs/mes en el plan Business; si lo agotas, se paran en seco). Pegamento entre SaaS → Make, rápido y robusto para integraciones con APIs externas (Google My Business, proveedores, pagos), y con créditos comprables si necesitas más capacidad. Orquestación IA → n8n para agentes con modelos de lenguaje y tool calling. Cálculo pesado → código custom. Regla: push logic as close to the data as possible.',
          },
          {
            title: 'ID strategy: record IDs + códigos secuenciales',
            detail: 'Airtable genera recXXXXX para linking interno. Empleados y clientes usan códigos legibles: OT-2024-04521, FAC-2024-01234. La separación evita errores humanos sin sacrificar la integridad referencial.',
          },
          {
            title: 'Audit trail: revision history + formula timestamps',
            detail: 'LAST_MODIFIED_TIME() en campos críticos crea un audit trail consultable sin logging externo. Cada cambio en una OT, factura o presupuesto queda registrado con fecha y usuario.',
          },
          {
            title: 'Base sync strategy: linked records, no duplicación',
            detail: 'Cada base sincroniza solo los campos necesarios con otras bases. Trade-off conocido: reporting cross-base requiere vistas intermedias, pero la alternativa (duplicar datos) genera inconsistencias que cuestan más que el workaround.',
          },
        ],
      },
      lessons: {
        heading: 'Lecciones Aprendidas',
        items: [
          {
            title: 'Empieza por el cuello de botella, no por el módulo más bonito.',
            detail: 'El inventario era caótico. Empezar por ahí desbloqueó todo lo demás: órdenes de compra, precios, y presupuestos dependen de un inventario fiable.',
          },
          {
            title: 'Las validaciones son más valiosas que las automatizaciones.',
            detail: 'Automatizar tareas ahorra tiempo. Pero las validaciones que impiden errores ahorran dinero. Una pieza mal registrada puede costar más que una hora de trabajo manual.',
          },
          {
            title: 'El CRM no es una lista de contactos — es una máquina de retención.',
            detail: 'La gamificación con tiers multiplicó la tasa de retorno. Los clientes preguntan activamente "¿Cuántos puntos tengo?". Eso no pasa con un CRM básico.',
          },
          {
            title: 'Documenta las reglas de negocio, no el código.',
            detail: 'Las automatizaciones de Airtable son visuales y autoexplicativas. Lo que necesita documentación son las reglas: "¿Por qué el margen mínimo es 30%?" y "¿Cuándo se reactiva un cliente inactivo?".',
          },
        ],
      },
      platformEvolution: {
        heading: 'Evolución de la Plataforma',
        tagline: 'Construir con lo mejor disponible. Refactorizar cuando la plataforma lo permita.',
        bridge: ['Estos sistemas siguen operando bajo la marca Santifer iRepair.', 'Sólo que {sin mí}.', 'Construir este sistema me enseñó hasta dónde podía llegar.', 'Así que vendí el negocio y fui a {por más}.'],
        steps: [
          { year: '2019', event: 'Base única + Zapier', detail: 'OTs, inventario, clientes y facturación en una sola base. Zapier conectaba los flujos externos.' },
          { year: '2021', event: 'Sync entre bases → bounded domains', detail: 'Dominios separados en bases independientes (ERP, CRM, Piezas, CMS). Solo se sincroniza lo necesario.' },
          { year: '2022', event: 'Automatizaciones nativas reemplazan Make', detail: 'Migración de Make a automatizaciones nativas de Airtable. 50+ flujos internos sin dependencias externas.' },
          { year: '2023', event: 'Interface Designer → adiós a las tablas crudas', detail: 'Todo el equipo trabaja con interfaces diseñadas por rol, no con tablas. Más rápido, menos errores.' },
          { year: '2024', event: 'Filtrado dinámico → solo piezas compatibles', detail: 'Al seleccionar un modelo en una OT, el campo de piezas solo muestra las compatibles — no las 1.000+ del catálogo.' },
          { year: '2025', event: 'Jacobo AI Agent → the payoff', detail: 'Agente omnicanal (voz + WhatsApp) que reserva, presupuesta y resuelve. Lanzado en semanas, no meses.', punchline: 'Cinco años de arquitectura limpia lo hicieron {inevitable}.' },
        ],
      },
      replicability: {
        heading: 'Patrones Transferibles',
        body: 'Los patrones de arquitectura detrás de este Business OS — bounded domains, SSOT, notificaciones event-driven, guardrails de reglas de negocio — son transferibles a cualquier negocio de servicios. Los módulos específicos cambian; los principios de diseño no.',
        examples: [
          { domain: 'Clínica / consulta dental', detail: 'El ciclo de reparación se convierte en patient journey. El catálogo de piezas pasa a ser catálogo de tratamientos. La misma lógica de inventario, distinto dominio.' },
          { domain: 'Agencia / consultoría', detail: 'Las órdenes de trabajo se convierten en entregas de proyecto. Los tiers del CRM pasan a ser niveles de cuenta de cliente. El reporting automatizado se mantiene idéntico.' },
          { domain: 'Retail / e-commerce', detail: 'La recepción de reparaciones se convierte en fulfillment de pedidos. La lógica de cadena de suministro se transfiere directamente. Los flujos de ciclo de vida del cliente y retención son plug-and-play.' },
        ],
        closing: 'Cualquier negocio con operaciones complejas puede beneficiarse de este enfoque — ya sea servicios, retail o e-commerce. Los patrones están probados; lo que cambia es el dominio.',
      },
    },
    cta: {
      heading: '¿Tienes un problema operativo que no cabe en un SaaS?',
      body: 'Construí un sistema que gestionó +30.000 reparaciones, automatizó 170h/mes y sobrevivió una venta de empresa — intacto. Ya sea para tu propia empresa, para los clientes de tu plataforma, o para un equipo que necesita a alguien que construya desde dentro — cuéntame el problema.',
      label: 'Hablemos',
    },
    faq: {
      heading: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Airtable escala para +30.000 registros?',
          a: 'Sí, con matices. Con el plan Business (125K registros por base), Airtable maneja bien decenas de miles de registros. La clave es diseñar las bases con vistas filtradas y no cargar todo en una sola vista. Para volúmenes cercanos al límite, hay que considerar archivado periódico o migración a Postgres.',
        },
        {
          q: '¿Cuánto cuesta esto vs. un SaaS como RepairDesk?',
          a: 'Airtable Business (~45$/mes por usuario, plan de 125K registros/base) + integraciones (YouCanBookMe, WATI, Make) ≈ 120-170$/mes. RepairDesk es 99$/mes pero no cubre CRM avanzado, automatizaciones complejas ni el modelo multiservicios. El ahorro real está en las 170h/mes de trabajo manual eliminado.',
        },
        {
          q: '¿Qué pasa si Airtable cambia sus precios o API?',
          a: 'Es un riesgo real. La mitigación: backups periódicos de los datos y, sobre todo, tener el esquema de datos completo documentado. Si hubiera que migrar, la estructura relacional de las 12 bases es el activo — se puede replicar en cualquier plataforma.',
        },
        {
          q: '¿Cuánto tiempo llevó construir todo esto?',
          a: 'Años de prueba y error. Pero con un patrón clave: cada módulo nuevo tardaba la mitad que el anterior, porque el aprendizaje acumulado aceleraba todo. El sistema creció orgánicamente mientras el negocio operaba — nunca hubo un "paramos todo y construimos".',
        },
        {
          q: '¿Quién mantiene el sistema ahora?',
          a: 'El comprador. Vendí el negocio en 2025 como going-concern: marca, sistemas y flujos de trabajo incluidos. Que el comprador lo adquiriera como activo operativo — sin necesidad de reconstruir nada — es la validación definitiva de la arquitectura.',
        },
        {
          q: '¿Se puede replicar para otro negocio?',
          a: 'La arquitectura (Airtable como SSOT con automatizaciones nativas) es replicable para cualquier negocio de servicios: talleres, clínicas, agencias. Lo que cambia son las reglas de negocio específicas y los módulos necesarios.',
        },
        {
          q: '¿Se puede usar Airtable como ERP?',
          a: 'Sí, con disciplina de diseño. Airtable no es un ERP out-of-the-box, pero su flexibilidad relacional permite construir uno a medida. La clave es tratar cada base como un módulo independiente con interfaces claras (linked records) y usar las automatizaciones nativas para orquestar los flujos. Con 12 bases y 2.100+ campos, este Business OS gestiona todo lo que un ERP tradicional haría — pero con iteración semanal en vez de mensual.',
        },
        {
          q: '¿Cuáles son las desventajas de Airtable?',
          a: 'Las principales: límite de 125K registros por base en el plan Business (requiere archivado si creces mucho), pricing que escala rápido con usuarios, y dependencia de vendor. La mitigación: un diseño inteligente de datos con bases separadas por dominio y sincronizando solo la información necesaria entre ellas, no todo de golpe. Para este Business OS, las ventajas (velocidad de iteración, flexibilidad, interfaz amigable) superan con creces las desventajas.',
        },
        {
          q: '¿Por qué las automatizaciones nativas de Airtable en vez de Zapier?',
          a: 'Las automatizaciones de Airtable viven dentro de la propia base, no tienen coste por ejecución y acceden directamente a los datos sin APIs intermedias. Para la lógica de negocio del día a día (50+ automatizaciones), es la opción más eficiente. El límite está en los 100.000 runs/mes del plan Business: si lo agotas, se paran sin opción de comprar más. Por eso las integraciones con sistemas externos (reseñas de Google My Business, webhooks de proveedores) van por Make, donde puedes comprar créditos adicionales si necesitas más capacidad. n8n se usa para Jacobo (el agente IA), donde se necesita orquestación compleja con modelos de lenguaje.',
        },
      ],
    },
    resources: {
      heading: 'Recursos',
      items: [
        { label: 'Airtable — Plataforma de bases de datos', url: 'https://airtable.com' },
        { label: 'n8n — Automatización de workflows', url: 'https://n8n.io' },
        { label: 'YouCanBookMe — Gestión de citas', url: 'https://youcanbook.me' },
        { label: 'WATI — WhatsApp Business API', url: 'https://www.wati.io' },
      ],
    },
    footer: {
      role: 'AI Product Manager · Solutions Architect',
      bio: 'Construyó y vendió un negocio de 16 años en 2025. Ahora aplica el mismo pensamiento de sistemas a AI enterprise — como FDE, Solutions Architect o AI Production Manager.',
      fellowAt: 'Teaching Fellow en',
      fellowLink: 'AI Product Academy',
      copyright: 'Todos los derechos reservados.',
    },
  },
  en: {
    slug: 'business-os-for-airtable',
    altSlug: 'business-os-para-airtable',
    readingTime: '15 min read',
    seo: {
      title: 'How I Built a Custom Business OS for 30,000+ Repairs with Airtable (170h/Month Saved) | santifer.io',
      description: 'Case study: how I built a Business OS with 12 Airtable bases, 2,100+ fields and 50+ automations that saves 170h/month at a phone repair business with 30,000+ repairs completed.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Business OS',
    },
    header: {
      kicker: 'Case Study — Santifer iRepair',
      h1: 'Business OS for 30,000+ Repairs',
      subtitle: 'How I built a complete business operating system with Airtable — 12 interconnected bases, 2,100+ fields and 50+ automations saving 170h/month.',
      badge: 'Sold with the business in 2025. Still running in production today',
      date: 'Feb 25, 2026',
    },
    heroMetrics: [
      { value: '170h/mo', label: 'Automated' },
      { value: '12', label: 'Airtable bases' },
      { value: '2,100+', label: 'Fields' },
      { value: '50+', label: 'Automations' },
      { value: '30K+', label: 'Repairs' },
    ],
    tldr: 'I built a 12-base Airtable operating system that ran a 16-year business: ERP, CRM, appointment scheduling, AI agents, and a programmatic website, all from a single source of truth. 170+ hours/month automated. Then I sold the company and the buyer kept everything running. This is what I\'d design for your customers.',
    intro: {
      hook: '30,000+ repairs. 12 bases. 2,100 fields. Zero off-the-shelf ERPs. All built on Airtable.',
      body: 'A multi-service repair business doesn\'t fit in a generic ERP. In 2019, I evaluated RepairDesk ($99/mo), Orderry and RepairShopr: all existed, but none covered the multi-service model (repairs + accessories), nor offered CRM with gamification, complex automations or programmatic SEO. I needed a system that was the single source of truth for everything: orders, inventory, customers, bookings, billing and automations. So I built it.',
    },
    internalLinks: {
      jacobo: { text: 'AI Agent Jacobo — Case Study', href: '/ai-agent-jacobo' },
      pseo: { text: 'Programmatic SEO — Case Study', href: '/programmatic-seo' },
      n8n: { text: 'n8n for PMs — Article', href: '/n8n-for-pms' },
      careerOps: { text: 'career-ops: AI Job Search Multi-Agent | Case Study', href: '/career-ops-system' },
    },
    sections: {
      dayInLife: {
        heading: 'A Day in the Life of the System',
        body: 'Here\'s what happens when a customer texts "I want to repair my iPhone 14 Pro":',
        steps: [
          { emoji: '1️⃣', text: 'Jacobo (omnichannel AI agent) detects the repair intent, identifies the model and checks screen stock in Airtable in real time.' },
          { emoji: '2️⃣', text: 'Stock available → Jacobo replies with an estimated price and asks when they\'d like to come. The customer states their preference in natural language, and a Jacobo sub-agent checks YouCanBookMe availability to offer the closest slots. Zero friction, without leaving the conversation.' },
          { emoji: '3️⃣', text: 'Customer confirms the time → the appointment is created in YouCanBookMe, the work order is generated in Airtable and the parts are auto-reserved from inventory — locked for that repair.' },
          { emoji: '4️⃣', text: 'The technician sees the work order on their tablet with full detail: model, repair, reserved parts and exact warehouse location.' },
          { emoji: '5️⃣', text: 'Repair completed → invoice auto-generated → loyalty points added to CRM → customer receives a satisfaction survey via WhatsApp.' },
        ],
        jacoboCta: {
          heading: 'Want to know more about Jacobo?',
          body: 'Omnichannel AI agent that handles customers via WhatsApp and voice, checks stock in real time, and manages appointments autonomously.',
          label: 'Read the full case study',
        },
        pseoCta: {
          heading: 'How did we generate web content for every model and repair?',
          body: 'The Airtable CMS powered a programmatic website with unique pages per model and repair type — all automated with keyword research.',
          label: 'Read the Programmatic SEO case study',
        },
      },
      whyCustom: {
        heading: 'Why I Didn\'t Use RepairDesk or Odoo',
        body: 'Before building, I researched the alternatives. None fit:',
        reasons: [
          {
            tool: 'RepairDesk ($99/mo)',
            issue: 'Already existed in 2019. Covers ticketing and inventory, but designed for pure repair shops. Didn\'t support the multi-service model (repairs + accessories), CRM with tiers/gamification, or complex automations.',
          },
          {
            tool: 'RepairShopr / Orderry',
            issue: 'Also available in 2019. RepairShopr had basic email marketing ("Marketr") and Zapier, but rigid flows. Orderry, good foundation but no real automation capability. Neither offered programmatic SEO or AI agent integration.',
          },
          {
            tool: 'Traditional ERP (Odoo, SAP B1)',
            issue: 'Overkill, slow to implement, and without the flexibility to iterate weekly. Customization cost far exceeded building something custom.',
          },
        ],
        punchline: 'The key decision: I needed full control over data flows and the ability to automate any process in hours, not weeks.',
      },
      overview: {
        heading: '12 Airtable Bases as a No-Code Business OS',
        body: 'The Business OS is an ecosystem of 12 interconnected Airtable bases. Each base owns a bounded domain, and 50+ native automations orchestrate data flows between them via linked records — no duplication, just linking what\'s needed.',
        stats: [
          { value: '12', label: 'Airtable Bases' },
          { value: '2,100+', label: 'Total Fields' },
          { value: '50+', label: 'Automations' },
          { value: '170h', label: 'Monthly Savings' },
        ],
        bases: [
          { name: 'Central ERP', desc: 'Business operations hub: work orders (496 fields in the OTS table), inventory, purchasing, bookings and warranties.' },
          { name: 'CRM', desc: 'Customers, lead scoring, loyalty tiers, complete history and automated communications.' },
          { name: 'Accounting', desc: 'Automatic bank reconciliation, invoice generation, expense tracking and financial reports.' },
          { name: 'Parts Catalog', desc: 'Repair parts pricing and stock from suppliers, synced with the ERP inventory.' },
          { name: 'Accessories Catalog', desc: 'Cases, screen protectors, chargers. Supplier catalog synced with inventory.' },
          { name: 'Web CMS', desc: 'Headless CMS with 1,534 fields and 647 formulas powering the programmatic website by model and repair.' },
          { name: 'Customer Feedback', desc: 'Satisfaction surveys, NPS and automated post-service follow-up.' },
          { name: 'Reviews', desc: 'Internal and external (Google) reviews automatically extracted and aggregated.' },
          { name: 'Automated KWR', desc: 'Keyword research per model and repair via DataForSEO for programmatic SEO decisions.' },
          { name: 'GBP Posts', desc: 'Before/after success stories generated for Google Business Profile.' },
          { name: 'Short Content', desc: 'Per-repair-type content for social media and communications.' },
          { name: 'Custom GPT', desc: 'Configuration and prompts for internal stock and pricing query GPTs.' },
        ],
      },
      e2eFlows: {
        heading: 'End-to-End Flows',
        body: 'Each flow traces the happy path — the ideal sequence from trigger to resolution. The bases involved are tagged in each flow.',
        items: [
          {
            icon: '🔧',
            name: 'Repair Lifecycle — Intake to Delivery',
            trigger: 'Customer contacts asking about a repair',
            summary: 'The complete flow from a customer inquiry to picking up their repaired device — with automatic parts reservation, appointments and invoicing.',
            basesTouched: ['ERP', 'Parts Catalog', 'CRM', 'Accounting'],
            details: [
              'Intake: Jacobo identifies model + repair type → checks stock in Airtable in real time (integration contract: AI Agent ↔ Airtable REST API)',
              'Quoting: price auto-calculated considering part cost + configured margin + customer tier from CRM. Low-margin repairs get flagged for manual review',
              'Scheduling: booking sub-agent queries YouCanBookMe → offers available slots → creates appointment + work order in Airtable + auto-reserves parts. Source of truth: YCBM for time slot availability, ERP for the work order',
              'If the needed part is in stock, auto-accepts the appointment; if not, generates an urgent purchase order for quick resolution',
              'Execution: technician sees the work order on their tablet with full detail — model, repair, reserved parts and exact warehouse location (cabinet, drawer, position)',
              'Completion: repair closed → invoice auto-generated with sequential numbering and tax data → loyalty points added to CRM → satisfaction survey sent via WhatsApp',
              'The OTS table has 496 fields — the central record (source of truth) that almost every other base feeds into. Full traceability: each part is linked to its purchase order, supplier and the repair where it was used',
            ],
          },
          {
            icon: '📦',
            name: 'Procurement & Supply Chain',
            trigger: 'A part\'s stock drops below its configured minimum threshold',
            summary: 'From low-stock detection to restocking, consumption and financial reconciliation — with auto-PO and inventory classification.',
            basesTouched: ['ERP', 'Parts Catalog', 'Accessories Catalog', 'Accounting'],
            details: [
              'Threshold trigger: stock < minimum → auto-generates purchase order to best-priced supplier. Multi-supplier fallback: each part has 2-3 alternative suppliers with prices and delivery times compared',
              'Custom stock alerts per part: iPhone screens are ordered with more buffer than less-demanded models',
              'Reception: part arrives → location auto-assigned by Airtable based on occupancy (cabinet, drawer, position)',
              'Consumption: when the work order is closed, parts are automatically deducted from inventory',
              'Two distinct lifecycles (inventory classification): parts are consumed in repairs, accessories are sold directly. Accessory sale prices auto-calculated with configurable margin per category',
              'Rotation control: accessories unsold for 60+ days → discount or removal alert',
              'Quality control: each part has a grade (original, premium compatible, standard compatible) that impacts price and warranty',
              'Reconciliation: each purchase order is automatically matched with its bank transaction. Expense tracking integrated — each expense linked to category, supplier and cost center',
              'Auto-generated monthly financial reports with P&L, cash flow and month-over-month comparison',
            ],
          },
          {
            icon: '🌐',
            name: 'Content-to-Revenue Pipeline',
            trigger: 'New model or repair type added to the catalog',
            summary: 'From a new model in Airtable to a Google-ranked landing page — with automated KWR, dynamic pricing and original content at scale.',
            basesTouched: ['Web CMS', 'KWR', 'GBP', 'Content', 'Parts Catalog', 'Accessories Catalog'],
            details: [
              'Automated KWR extracts keywords per model+repair (DataForSEO API) → prioritizes by volume and difficulty',
              'CMS generates landing page: price, availability, SEO description, FAQ, JSON-LD — all from formulas. 1,534 fields and 647 formulas calculate everything from canonical URLs to structured data (headless CMS pattern)',
              'Catalog sync contract: if a part price changes → it updates on the website with zero intervention',
              'GBP posts with real before/after repair photos, pulled directly from the ERP. A HITL process filters images with personal information before publishing. With hundreds of different repairs, every post was unique — original content at scale',
              'Multi-language management (ES/EN) from the same base — each field has its translated variant',
              'Result: constant organic presence without spending weekly hours manually creating content. Everything connected to the Web CMS with automatic internal linking',
            ],
          },
          {
            icon: '👥',
            name: 'Customer Lifecycle & Retention',
            trigger: 'Repair completed — post-service cycle begins',
            summary: 'Lead scoring, loyalty tiers, automated reviews and reactivation campaigns — the feedback loop that converts one-time customers into regulars.',
            basesTouched: ['CRM', 'Feedback', 'Reviews', 'Communications'],
            details: [
              'Automatic lead scoring: each interaction adds points → 5 tiers (Bronze → Silver → Gold → Diamond → Platinum) with progressive benefits like discounts, appointment priority and extended warranty',
              '48h post-repair → Google review request, only if the customer has no open complaints (conditional trigger)',
              'Assisted review responses: the CRM auto-cross-references the reviewer\'s name with their history — repaired model, repair type, assigned technician and tier. Replying with "thanks for trusting us with your iPhone 12 Pro" instead of a generic message made all the difference',
              'WhatsApp satisfaction survey with 3 quick questions → results feed lead scoring (feedback loop: survey → scoring → tier → benefits)',
              'Customer inactive for 90+ days → automatic reactivation campaign with personalized offers based on repair and purchase history',
              'Structured complaints: each complaint linked to the original work order, responsible technician and resolution applied. NPS dashboard by period to detect trends',
              'Complete customer history: all repairs, purchases, communications and complaints in one view',
            ],
          },
        ],
      },
      crossCutting: {
        heading: 'Cross-Cutting Capabilities',
        body: 'These capabilities don\'t belong to a single flow — they operate across all of them.',
        items: [
          {
            icon: '✅',
            name: 'Data Guardrails — 50+ Business Rules',
            summary: 'Guardrails block incorrect data at the source — cheaper than fixing downstream. The system guides employees through every process: if they miss a step, it tells them what\'s missing.',
            details: [
              'Can\'t close a repair without logging the parts used',
              'Can\'t invoice without customer-signed quote',
              'Can\'t add a product without cost price and minimum margin',
              'Automatic alert if a technician has more than 5 open repairs simultaneously',
              'Duplicate IMEI validation: if a device is already in the system, it links to existing history',
              'Consistency check: if the quote says "screen" but logged parts are "battery", it blocks',
            ],
          },
          {
            icon: '📱',
            name: 'Event-Driven Notifications',
            summary: 'Every business event (appointment confirmed, repair completed, invoice issued) triggers a notification through the appropriate channel. The communication layer is decoupled from business logic.',
            details: [
              'Automated notifications per event: appointment confirmed, repair completed, invoice issued',
              'Meta-approved WhatsApp templates with dynamic variables (name, model, price)',
              'Native integration with the booking system: customer receives instant confirmation upon booking',
              'If the part isn\'t in stock, an internal urgent order notification fires to the team for quick resolution',
            ],
          },
          {
            icon: '🤖',
            name: 'AI-Powered Query Layer',
            summary: 'Two internal GPTs use Airtable as source of truth — natural language interface over operational data, no hallucinations.',
            details: [
              'Stock GPT: "Do we have iPhone 14 Pro screens?" → queries Airtable in real time and responds with stock, supplier, cost price, and exactly which cabinet and drawer the part is in. It also flags if other in-progress repairs are using that same part',
              'Pricing GPT: "How much do we charge for a Samsung S23 repair?" → calculates final price considering part cost + configured margin + customer tier',
              'Both GPTs use Airtable as source of truth, eliminating hallucinated answers',
            ],
          },
          {
            icon: '🎬',
            name: 'Generative AI Applied',
            summary: 'Airtable as source of truth, GenAI as creative engine. From the product catalog and business data, visual assets were generated for storefront displays, social media and campaigns, with no manual content intervention.',
            details: [
              'AI-generated digital signage for storefront: product images and promotions deployed on in-store screens, fed from the Airtable catalog',
              'Instagram Reels with Sora-generated video (OpenAI) and original songs with Suno (AI): emotional storytelling, humor and branding, edited with DaVinci Resolve',
              'Full pipeline: Airtable data → prompt → visual generation → channel deployment (storefront, Instagram, WhatsApp)',
            ],
          },
        ],
      },
      impact: {
        heading: 'The 170h/Month Breakdown',
        body: 'This isn\'t a made-up number. Each saving is calculated based on task frequency and the manual time it used to require (measured with before/after time tracking over 3 months):',
        savings: [
          { module: 'Automatic purchase orders', before: '45 min/day', after: '0 (automatic)', monthly: '~22h' },
          { module: 'Price/stock inquiry responses', before: '2h/day', after: '5 min (GPT)', monthly: '~58h' },
          { module: 'Repair tracking', before: '30 min/day', after: 'Automatic', monthly: '~15h' },
          { module: 'Appointment management & confirmations', before: '45 min/day', after: 'Automatic', monthly: '~22h' },
          { module: 'Billing & quotes', before: '1h/day', after: '10 min', monthly: '~25h' },
          { module: 'Inactive customer reactivation', before: '3h/week', after: 'Automatic', monthly: '~12h' },
          { module: 'Reports & KPIs', before: '4h/week', after: 'Automatic', monthly: '~16h' },
        ],
        total: '~170h/mo',
        punchline: 'That\'s more than one full-time employee. And the system doesn\'t get sick, doesn\'t take vacations, and doesn\'t make copy-paste mistakes. This system was a key asset in the 2025 business sale (going-concern) — robust enough for the buyer to acquire it as a running operation.',
      },
      beforeAfter: {
        heading: 'Before vs After',
        items: [
          { area: 'Data management', before: 'Basic Checkout POS, data fragmented across disconnected systems', after: 'Airtable as single source of truth (SSOT) — one data point, one place' },
          { area: 'Customer communication', before: 'WhatsApp groups, manual one-by-one messages', after: 'Automated triggers per event: confirmation, reminder, completed' },
          { area: 'Billing', before: 'Manual invoices from Checkout POS, frequent data errors', after: 'Auto-generated on repair completion, with correct tax data' },
          { area: 'Stock control', before: 'Visual check, "I think we have 2 left"', after: 'Real-time alerts, automatic purchase orders when minimum is reached' },
          { area: 'Human errors', before: 'Copy-paste between systems, inconsistent data', after: '0 errors with 50+ automatic validations that block inconsistencies' },
        ],
      },
      decisions: {
        heading: 'Architecture Decision Records (ADRs)',
        body: 'Every technical decision has a reason. Here are the most important ones:',
        items: [
          {
            title: 'Why Airtable as SSOT?',
            detail: 'Airtable combines spreadsheet flexibility with relational database structure. For a business that iterates weekly, speed of change is critical. Adding a new field or view takes minutes, not days of development.',
          },
          {
            title: 'Why custom over SaaS?',
            detail: 'SaaS imposes its data model. When your business is multi-service (repairs + accessories), no vertical SaaS covers everything. The adaptation cost exceeds the build cost.',
          },
          {
            title: 'When NOT to build custom?',
            detail: 'If your business fits a standard vertical (repairs only, no multi-service), use RepairDesk or similar. Building custom makes sense when your business differentiator is in the processes, not the product.',
          },
          {
            title: 'Why native Airtable automations over Zapier/Make?',
            detail: 'Airtable automations live inside the base itself, access data directly, and have no per-execution cost. For day-to-day business logic (50+ automations), that\'s unbeatable. Make is used as glue for specific SaaS integrations: new Google My Business review notifications (official integration), supplier webhooks and payment gateway syncs. n8n is used for Jacobo (the AI agent), where complex orchestration with language models and tool calling is needed.',
          },
          {
            title: 'How do you manage 2,100+ fields without chaos?',
            detail: 'By separating concerns: each base owns a clear domain and only syncs strictly necessary data with other bases via linked records. No duplicating everything — just linking what\'s needed. Combined with role-filtered views (technicians see their stuff, sales sees theirs), each user interacts with a manageable subset of the system.',
          },
          {
            title: 'Logic placement: where each rule lives',
            detail: 'Simple → native Airtable automations (zero cost per execution, but capped at 100,000 runs/month on the Business plan; hit the limit and they stop cold). SaaS glue → Make, fast and robust for integrations with external APIs (Google My Business, suppliers, payments), with purchasable credits if you need more capacity. AI orchestration → n8n for agents with LLMs and tool calling. Heavy computation → custom code. Rule: push logic as close to the data as possible.',
          },
          {
            title: 'ID strategy: record IDs + sequential codes',
            detail: 'Airtable generates recXXXXX for internal linking. Employees and customers use readable codes: OT-2024-04521, FAC-2024-01234. The separation prevents human errors without sacrificing referential integrity.',
          },
          {
            title: 'Audit trail: revision history + formula timestamps',
            detail: 'LAST_MODIFIED_TIME() on critical fields creates a queryable audit trail without external logging. Every change to a work order, invoice or quote is recorded with date and user.',
          },
          {
            title: 'Base sync strategy: linked records, no duplication',
            detail: 'Each base syncs only the necessary fields with other bases. Known trade-off: cross-base reporting requires intermediate views, but the alternative (duplicating data) creates inconsistencies that cost more than the workaround.',
          },
        ],
      },
      lessons: {
        heading: 'Lessons Learned',
        items: [
          {
            title: 'Start with the bottleneck, not the shiniest module.',
            detail: 'Inventory was chaotic. Starting there unblocked everything else: purchase orders, pricing, and quotes all depend on reliable inventory.',
          },
          {
            title: 'Validations are more valuable than automations.',
            detail: 'Automating tasks saves time. But validations that prevent errors save money. A wrongly logged part can cost more than an hour of manual work.',
          },
          {
            title: 'The CRM isn\'t a contact list — it\'s a retention machine.',
            detail: 'Tier gamification multiplied the return rate. Customers actively ask "How many points do I have?". That doesn\'t happen with a basic CRM.',
          },
          {
            title: 'Document the business rules, not the code.',
            detail: 'Airtable automations are visual and self-explanatory. What needs documentation are the rules: "Why is the minimum margin 30%?" and "When does an inactive customer get reactivated?".',
          },
        ],
      },
      platformEvolution: {
        heading: 'Platform Evolution',
        tagline: 'Build with the best available tool. Refactor when the platform allows it.',
        bridge: ['These systems still operate under the Santifer iRepair brand.', 'Just {without me}.', 'Building this system showed me what I could do at scale.', 'So I sold the business and went to {find out}.'],
        steps: [
          { year: '2019', event: 'Single base + Zapier', detail: 'Work orders, inventory, customers, and billing in one base. Zapier connected external flows.' },
          { year: '2021', event: 'Base syncing → bounded domains', detail: 'Domains separated into independent bases (ERP, CRM, Parts, CMS). Only sync what\'s needed.' },
          { year: '2022', event: 'Native automations replace Make', detail: 'Migrated from Make to Airtable native automations. 50+ internal flows with zero external dependencies.' },
          { year: '2023', event: 'Interface Designer → goodbye raw tables', detail: 'The whole team works with role-based designed interfaces, not tables. Faster, fewer errors.' },
          { year: '2024', event: 'Dynamic filtering → compatible parts only', detail: 'Selecting a model on a work order filters parts to compatible ones only — not the full 1,000+ catalog.' },
          { year: '2025', event: 'Jacobo AI Agent → the payoff', detail: 'Omnichannel voice + WhatsApp agent. Shipped in weeks, not months.', punchline: 'Five years of clean architecture made it {inevitable}.' },
        ],
      },
      replicability: {
        heading: 'Transferable Patterns',
        body: 'The architecture patterns behind this Business OS — bounded domains, SSOT, event-driven notifications, business rule guardrails — are transferable to any service business. The specific modules change; the design principles don\'t.',
        examples: [
          { domain: 'Clinic / dental practice', detail: 'Replace repair lifecycle with patient journey. Parts catalog becomes treatment catalog. Same inventory logic, different domain.' },
          { domain: 'Agency / consultancy', detail: 'Replace work orders with project delivery. CRM tiers become client account levels. Automated reporting stays identical.' },
          { domain: 'Retail / e-commerce', detail: 'Replace repair intake with order fulfillment. Supply chain logic transfers directly. Customer lifecycle and retention flows are plug-and-play.' },
        ],
        closing: 'Any business with complex operations can benefit from this approach — whether services, retail or e-commerce. The patterns are proven; what changes is the domain.',
      },
    },
    cta: {
      heading: 'Got an operational problem that doesn\'t fit in a SaaS?',
      body: 'I built a system that managed 30,000+ repairs, automated 170h/month, and survived a business sale — intact. Whether it\'s for your own company, your platform\'s customers, or a team that needs someone to build from the inside — tell me the problem.',
      label: 'Get in touch',
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'Does Airtable scale to 30,000+ records?',
          a: 'Yes, with caveats. On the Business plan (125K records per base), Airtable handles tens of thousands of records well. The key is designing bases with filtered views and not loading everything in a single view. As you approach the limit, consider periodic archiving or migration to Postgres.',
        },
        {
          q: 'How much does this cost vs. SaaS like RepairDesk?',
          a: 'Airtable Business (~$45/mo per user, 125K records/base plan) + integrations (YouCanBookMe, WATI, Make) ≈ $120-170/mo. RepairDesk is $99/mo but doesn\'t cover advanced CRM, complex automations, or the multi-service model. The real savings are in the 170h/month of eliminated manual work.',
        },
        {
          q: 'What if Airtable changes its pricing or API?',
          a: 'It\'s a real risk. The mitigation: periodic data backups and, most importantly, having the complete data schema documented. If migration were ever needed, the relational structure of the 12 bases is the real asset — it can be replicated on any platform.',
        },
        {
          q: 'How long did it take to build all of this?',
          a: 'Years of trial and error. But with a key pattern: each new module took half the time of the previous one, because accumulated learning accelerated everything. The system grew organically while the business operated — there was never a "stop everything and build" moment.',
        },
        {
          q: 'Who maintains the system now?',
          a: 'The buyer. I sold the business in 2025 as a going concern: brand, systems, and workflows included. The fact that the buyer acquired it as a running operation — without needing to rebuild anything — is the ultimate validation of the architecture.',
        },
        {
          q: 'Can this be replicated for another business?',
          a: 'The architecture (Airtable as SSOT with native automations) is replicable for any service business: workshops, clinics, agencies. What changes are the specific business rules and required modules.',
        },
        {
          q: 'Can Airtable be used as an ERP?',
          a: 'Yes, with design discipline. Airtable isn\'t an out-of-the-box ERP, but its relational flexibility lets you build a custom one. The key is treating each base as an independent module with clean interfaces (linked records) and using native automations to orchestrate the flows. With 12 bases and 2,100+ fields, this Business OS handles everything a traditional ERP would — but with weekly iteration instead of monthly.',
        },
        {
          q: 'What are the disadvantages of Airtable?',
          a: 'The main ones: 125K record limit per base on the Business plan (requires archiving if you grow significantly), pricing that scales fast with users, and vendor lock-in. The mitigation: intelligent data design with separate bases per domain, syncing only the necessary information between them, not everything at once. For this Business OS, the advantages (iteration speed, flexibility, friendly UI) far outweigh the disadvantages.',
        },
        {
          q: 'Why native Airtable automations instead of Zapier?',
          a: 'Airtable automations live inside the base itself, have no per-execution cost, and access data directly without intermediate APIs. For day-to-day business logic (50+ automations), it\'s the most efficient option. The limit is 100,000 runs/month on the Business plan: hit it and they stop, with no option to buy more. That\'s why external system integrations (Google My Business reviews, supplier webhooks) go through Make, where you can purchase additional credits if you need more capacity. n8n is used for Jacobo (the AI agent), where complex orchestration with language models is needed.',
        },
      ],
    },
    resources: {
      heading: 'Resources',
      items: [
        { label: 'Airtable — Database Platform', url: 'https://airtable.com' },
        { label: 'n8n — Workflow Automation', url: 'https://n8n.io' },
        { label: 'YouCanBookMe — Appointment Scheduling', url: 'https://youcanbook.me' },
        { label: 'WATI — WhatsApp Business API', url: 'https://www.wati.io' },
      ],
    },
    footer: {
      role: 'AI Product Manager · Solutions Architect',
      bio: 'Built and sold a 16-year business in 2025. Now applying the same systems thinking to enterprise AI — as an FDE, Solutions Architect, or AI Production Manager.',
      fellowAt: 'Teaching Fellow at',
      fellowLink: 'AI Product Academy',
      copyright: 'All rights reserved.',
    },
  },
} as const
