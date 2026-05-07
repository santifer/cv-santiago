import { faridProfile } from './content/farid-profile'

export type Lang = 'es' | 'en'

export const seo = {
  es: {
    title: 'Farid Sayago — MLOps Engineer · Data Pipelines · AI Systems',
    description: faridProfile.hero.description,
  },
  en: {
    title: 'Farid Sayago — MLOps Engineer · Data Pipelines · AI Systems',
    description: faridProfile.hero.description,
  },
}

const chat = {
  title: 'Farid AI',
  subtitle: 'Ask about my work, projects, and systems',
  greeting: "Hi — I'm Farid's AI portfolio assistant. Ask me about his MLOps work, projects, skills, or how to collaborate.",
  placeholder: 'Ask about Farid...',
  error: 'Sorry, something went wrong. Try again or reach out through the contact form.',
  offline: 'You appear to be offline. Try again when your connection is back.',
  send: 'Send',
  prompts: [
    { label: 'Experience', query: "Summarize Farid's experience", icon: 'briefcase' },
    { label: 'Projects', query: 'What projects has Farid built?', icon: 'rocket' },
    { label: 'Why Farid?', query: 'Why should a team work with Farid?', icon: 'help' },
    { label: 'Contact', query: 'How can I contact Farid?', icon: 'mail' },
  ],
  suggestedQuestions: ['What is Wiener Tickets?', 'What is Farid strongest at?', 'What does Farid know about MLOps?'],
  contactCtaTitle: 'Want to build something useful?',
  cta: {
    title: 'Want to build something useful?',
    text: 'Use the contact form or connect with Farid on LinkedIn.',
    button: 'Contact Farid',
  },
  voice: {
    start: 'Voice',
    stop: 'Stop',
    switchToText: 'Text',
    connecting: 'Connecting...',
    listening: 'Listening',
    thinking: 'Thinking',
    searching: 'Searching portfolio',
    speaking: 'Speaking',
    connection: 'Voice connection error',
    unsupported: 'Voice mode is not supported in this browser',
    microphone: 'Microphone permission denied',
  },
}

export const translations = {
  es: {
    email: faridProfile.email,
    ui: { typingIndicator: 'Farid AI está escribiendo...' },
    chat: {
      ...chat,
      subtitle: 'Pregunta sobre mi trabajo, proyectos y sistemas',
      greeting: 'Hola — soy el asistente IA del portfolio de Farid. Pregúntame por su trabajo en MLOps, proyectos, skills o colaboración.',
      placeholder: 'Pregunta sobre Farid...',
      error: 'Lo siento, algo ha fallado. Inténtalo de nuevo o usa el formulario de contacto.',
      offline: 'Parece que estás sin conexión. Inténtalo de nuevo cuando vuelva internet.',
      send: 'Enviar',
      prompts: [
        { label: 'Experiencia', query: 'Resume la experiencia de Farid', icon: 'briefcase' },
        { label: 'Proyectos', query: '¿Qué proyectos ha construido Farid?', icon: 'rocket' },
        { label: 'Por qué Farid', query: '¿Por qué debería trabajar un equipo con Farid?', icon: 'help' },
        { label: 'Contacto', query: '¿Cómo puedo contactar a Farid?', icon: 'mail' },
      ],
      suggestedQuestions: ['¿Qué es Wiener Tickets?', '¿Cuál es la fortaleza principal de Farid?', '¿Qué sabe Farid de MLOps?'],
      contactCtaTitle: '¿Construimos algo útil?',
      cta: { title: '¿Construimos algo útil?', text: 'Usa el formulario o conecta con Farid en LinkedIn.', button: 'Contactar a Farid' },
      voice: { ...chat.voice, start: 'Voz', stop: 'Parar', switchToText: 'Texto', connecting: 'Conectando...', listening: 'Escuchando', thinking: 'Pensando', searching: 'Buscando en el portfolio', speaking: 'Hablando', connection: 'Error de conexión de voz', unsupported: 'El modo voz no está soportado en este navegador', microphone: 'Permiso de micrófono denegado' },
    },
  },
  en: {
    email: faridProfile.email,
    ui: { typingIndicator: 'Farid AI is typing...' },
    chat,
  },
} as const
