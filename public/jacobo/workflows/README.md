# Jacobo AI Agent — Production n8n Workflows

**[:gb: English](#the-system)** | **[:es: Español](#es-versión-en-español)**

> 7 real production workflows from a multi-agent AI system that handled ~90% of customer interactions for a phone repair business. Open source by default.

## The System

Jacobo is an omnichannel AI agent (WhatsApp + phone) built with n8n, orchestrating specialized sub-agents via tool calling. These workflows ran in production for 2 years at [Xueyifan iRepair](https://xueyifan.io/ai-agent-jacobo).

## Workflows

| File | Original Name (ES) | Description | Nodes | LLM |
|------|-------------------|-------------|-------|-----|
| `jacobo-chatbot-v2.json` | Jacobo Chatbot V2 | Central router — classifies intent, selects sub-agent, maintains 20-message memory window | 37 | GPT-4.1 |
| `subagente-citas.json` | subagenteCitas | Appointment booking — parses natural language time preferences into calendar slots via YouCanBookMe | 18 | MiniMax M2.5 |
| `presupuesto-modelo.json` | Presupuesto Modelo | Quote agent — looks up exact model + repair in Airtable, returns real price with stock status | 11 | GPT-4.1 mini |
| `hacer-pedido.json` | hacerPedido | Order creation — creates repair orders in Airtable when parts are out of stock | 3 | No LLM |
| `calculadora-xueyifan.json` | CalculadoraXueyifan | Discount calculator — pure business logic for combo repair pricing | 3 | No LLM |
| `contactar-agente-humano.json` | contactarAgenteHumano | HITL handoff — escalates to human via Slack with conversation summary and deep-link | 5 | No LLM |
| `enviar-mensaje-wati.json` | EnviarMensajeWati | WhatsApp sender — cross-channel bridge so the voice agent can send WhatsApp messages | 3 | No LLM |

## Key Metrics

- **~90% self-service** — most interactions resolved without human intervention
- **~80h/month automated** — equivalent to a part-time employee
- **<30s response time** — from customer message to resolution
- **<€200/month** — total infrastructure cost

## How to Import into n8n

1. Open your n8n instance and go to **Workflows**
2. Click **"..."** → **"Import from file"**
3. Select any `.json` file from this folder
4. Update credentials (API keys, webhooks) with your own values

> **Note:** These workflows are sanitized — all API keys, webhook URLs, and personal data have been removed. You'll need to configure your own credentials after importing.

## Full Case Study

Read the complete architecture breakdown, prompt engineering techniques, and production learnings:

- [Jacobo AI Agent — Case Study (EN)](https://xueyifan.io/ai-agent-jacobo)
- [Agente IA Jacobo — Case Study (ES)](https://xueyifan.io/agente-ia-jacobo)

---

# :es: Versión en Español

> 7 workflows reales de producción de un sistema multi-agente IA que gestionó ~90% de las interacciones de clientes en un negocio de reparación de móviles. Open source by default.

## El Sistema

Jacobo es un agente IA omnicanal (WhatsApp + teléfono) construido con n8n, que orquesta sub-agentes especializados vía tool calling. Estos workflows corrieron en producción durante 2 años en [Xueyifan iRepair](https://xueyifan.io/agente-ia-jacobo).

## Workflows

| Archivo | Nombre Original | Descripción | Nodos | LLM |
|---------|----------------|-------------|-------|-----|
| `jacobo-chatbot-v2.json` | Jacobo Chatbot V2 | Router central — clasifica intent, elige sub-agente, mantiene ventana de memoria de 20 mensajes | 37 | GPT-4.1 |
| `subagente-citas.json` | subagenteCitas | Reserva de citas — parsea preferencias temporales en lenguaje natural a slots de calendario vía YouCanBookMe | 18 | MiniMax M2.5 |
| `presupuesto-modelo.json` | Presupuesto Modelo | Agente de presupuestos — busca modelo + reparación en Airtable, devuelve precio real con estado de stock | 11 | GPT-4.1 mini |
| `hacer-pedido.json` | hacerPedido | Creación de pedidos — crea órdenes de reparación en Airtable cuando no hay stock | 3 | Sin LLM |
| `calculadora-xueyifan.json` | CalculadoraXueyifan | Calculadora de descuentos — lógica de negocio pura para precios combo de multi-reparación | 3 | Sin LLM |
| `contactar-agente-humano.json` | contactarAgenteHumano | HITL handoff — escala a humano vía Slack con resumen de conversación y deep-link | 5 | Sin LLM |
| `enviar-mensaje-wati.json` | EnviarMensajeWati | Envío WhatsApp — puente cross-channel para que el agente de voz envíe mensajes por WhatsApp | 3 | Sin LLM |

## Métricas Clave

- **~90% autoservicio** — la mayoría de interacciones resueltas sin intervención humana
- **~80h/mes automatizadas** — equivalente a un empleado a media jornada
- **<30s tiempo de respuesta** — del mensaje del cliente a la resolución
- **<200€/mes** — coste total de infraestructura

## Cómo Importar en n8n

1. Abre tu instancia de n8n y ve a **Workflows**
2. Haz click en **"..."** → **"Import from file"**
3. Selecciona cualquier archivo `.json` de esta carpeta
4. Actualiza las credenciales (API keys, webhooks) con tus propios valores

> **Nota:** Estos workflows están sanitizados — todas las API keys, URLs de webhooks y datos personales han sido eliminados. Necesitarás configurar tus propias credenciales después de importar.

## Case Study Completo

Lee el desglose completo de arquitectura, técnicas de prompt engineering y aprendizajes de producción:

- [Agente IA Jacobo — Case Study (ES)](https://xueyifan.io/agente-ia-jacobo)
- [Jacobo AI Agent — Case Study (EN)](https://xueyifan.io/ai-agent-jacobo)

---

## Let's Connect

[![Website](https://img.shields.io/badge/xueyifan.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://xueyifan.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/xueyifan)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yifanxue.sde@gmail.com)
