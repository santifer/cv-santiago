import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArticleLayout } from './articles/components'

const content = {
  es: {
    title: 'Politica de Privacidad',
    lastUpdated: 'Ultima actualizacion: 21 de abril de 2026',
    intro: 'Esta politica describe como se recopilan y utilizan los datos cuando visitas el portfolio de Vijay Panwar.',
    sections: [
      {
        heading: 'Que datos se recopilan',
        items: [
          'Analiticas de uso: se recopilan datos anonimos de navegacion (paginas visitadas, duracion, dispositivo) para mejorar el sitio.',
        ],
      },
      {
        heading: 'Como se utilizan los datos',
        items: [
          'Los datos de analiticas se utilizan para entender patrones de uso y mejorar el rendimiento del sitio.',
        ],
      },
      {
        heading: 'Terceros',
        items: [
          'Vercel: aloja el sitio web y recopila analiticas anonimas de uso.',
        ],
      },
      {
        heading: 'Cookies y almacenamiento local',
        body: 'Este sitio no utiliza cookies de seguimiento ni de terceros. Solo se utiliza localStorage del navegador para preferencias de interfaz (tema visual). No se almacena informacion personal.',
      },
      {
        heading: 'No hay cuentas de usuario',
        body: 'Este sitio no requiere registro ni inicio de sesion. No se recopilan nombres, emails ni contrasenas a traves del sitio web.',
      },
      {
        heading: 'Contacto',
        body: 'Para cualquier consulta sobre privacidad, puedes escribir a:',
        email: 'vijaypanwar333@gmail.com',
      },
    ],
    backHome: 'Volver al inicio',
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: April 21, 2026',
    intro: 'This policy describes how data is collected and used when you visit Vijay Panwar\'s portfolio.',
    sections: [
      {
        heading: 'What data is collected',
        items: [
          'Usage analytics: anonymous browsing data (pages visited, duration, device) is collected to improve the site.',
        ],
      },
      {
        heading: 'How data is used',
        items: [
          'Analytics data is used to understand usage patterns and improve site performance.',
        ],
      },
      {
        heading: 'Third parties',
        items: [
          'Vercel: hosts the website and collects anonymous usage analytics.',
        ],
      },
      {
        heading: 'Cookies and local storage',
        body: 'This site does not use tracking cookies or third-party cookies. Only browser localStorage is used for interface preferences (visual theme). No personal information is stored.',
      },
      {
        heading: 'No user accounts',
        body: 'This site does not require registration or login. No names, emails, or passwords are collected through the website.',
      },
      {
        heading: 'Contact',
        body: 'For any privacy-related inquiries, you can write to:',
        email: 'vijaypanwar333@gmail.com',
      },
    ],
    backHome: 'Back to home',
  },
} as const

interface PrivacySection {
  heading: string
  items?: readonly string[]
  body?: string
  email?: string
}

export default function PrivacyPolicy({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const t = content[lang]

  useEffect(() => {
    document.title = `${t.title} | vijaypanwar.io`

    // noindex
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'

    // Fix canonical (SPA fallback serves homepage canonical — override it)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) canonical.href = `https://vijaypanwar.io/${lang === 'es' ? 'privacidad' : 'privacy'}`

    // Fix meta description
    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (desc) desc.content = lang === 'es'
      ? 'Politica de privacidad del portfolio de Vijay Panwar. Como se recopilan y utilizan los datos de la web.'
      : 'Privacy policy for Vijay Panwar\'s portfolio. How website data is collected and used.'

    return () => {
      robots.content = 'index, follow'
    }
  }, [lang, t.title])

  return (
    <ArticleLayout lang={lang}>
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
      </header>

      <article className="prose-custom">
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
          {t.intro}
        </p>

        {(t.sections as readonly PrivacySection[]).map((section, i) => (
          <section key={i} className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {section.heading}
            </h2>

            {section.items && (
              <ul className="space-y-2 mb-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base text-muted-foreground">
                    <span className="text-primary font-bold shrink-0 mt-0.5">{'●'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.body && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            )}

            {section.email && (
              <p className="mt-2">
                <a
                  href={`mailto:${section.email}`}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {section.email}
                </a>
              </p>
            )}
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to={lang === 'es' ? '/' : '/en'}
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {'← '}{t.backHome}
          </Link>
        </div>
      </article>
    </ArticleLayout>
  )
}
