import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, House, ChevronRight } from 'lucide-react'
import { getPageTitles, getSectionLabels } from './articles/registry'

/**
 * GlobalNav — unified navigation across all pages.
 *
 * The translucent bar is a "contextual message container" that appears
 * when there's something to communicate:
 * - Inner pages: permanent "← santifer.io" back link
 * - Any page: temporary language suggestion when browser lang ≠ page lang
 *
 * Language suggestion is right-aligned, next to the lang pill, reinforcing
 * the connection. Controls always live inside the bar when it's visible;
 * when there's no bar (home, no banner), controls float fixed at top-6 right-6.
 */

const PAGE_TITLE = getPageTitles()
const SECTION_LABELS = getSectionLabels()
/** Observes h2[id] elements and returns the currently visible section ID */
function useActiveSection(pathname: string, enabled: boolean) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setActiveId(null)
    if (!enabled) return

    let io: IntersectionObserver | null = null
    let mo: MutationObserver | null = null

    function setup() {
      const h1 = document.querySelector('h1')
      const headings = Array.from(document.querySelectorAll('h2[id]'))
      if (headings.length === 0) return false

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (entry.target.tagName === 'H1') {
                setActiveId(null)
                return
              }
              setActiveId(entry.target.id)
              return
            }
          }
        },
        { rootMargin: '-64px 0px -75% 0px' }
      )

      if (h1) io.observe(h1)
      headings.forEach((h) => io!.observe(h))
      return true
    }

    // Try immediately (component may already be rendered)
    if (!setup()) {
      // Lazy component not mounted yet — watch for h2[id] to appear
      mo = new MutationObserver(() => {
        if (setup()) mo!.disconnect()
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      io?.disconnect()
      mo?.disconnect()
    }
  }, [pathname, enabled])

  return activeId
}

function useLang() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const pageTitle = PAGE_TITLE[pathname] ?? null
  return { pathname, isHome, pageTitle }
}

function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('theme')) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
      document.documentElement.classList.toggle('dark', e.matches)
      document.documentElement.classList.toggle('light', !e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleTheme = useCallback(() => {
    // Kill all transitions for instant theme switch
    document.documentElement.style.setProperty('--theme-transition', 'none')
    document.querySelectorAll('*').forEach(el => {
      (el as HTMLElement).style.transition = 'none'
    })

    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')

    // Re-enable transitions after repaint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.removeProperty('--theme-transition')
        document.querySelectorAll('*').forEach(el => {
          (el as HTMLElement).style.transition = ''
        })
      })
    })
  }, [isDark])

  return { isDark, toggleTheme }
}

/** Shared controls: theme toggle */
function NavControls({ isDark, toggleTheme }: {
  isDark: boolean; toggleTheme: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-lg hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
      </button>
    </div>
  )
}

export default function GlobalNav() {
  const { pathname, isHome, pageTitle } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const activeSection = useActiveSection(pathname, !isHome)

  const hasBar = !isHome

  // Breadcrumb: show active section label or fall back to page title
  const sectionLabels = SECTION_LABELS[pathname]
  const activeSectionLabel = activeSection && sectionLabels?.[activeSection]

  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  // Animation tracking — bar and back link animate only on first appearance
  const barShown = useRef(false)
  const animateBar = hasBar && !barShown.current
  if (hasBar) barShown.current = true

  const backLinkShown = useRef(false)
  const animateBackLink = !isHome && !backLinkShown.current
  if (!isHome) backLinkShown.current = true

  const controls = <NavControls isDark={isDark} toggleTheme={toggleTheme} />

  const fade = (duration: string) => ({ animation: `nav-fade-in ${duration} ease-out` })

  // Bar visible: controls inside it
  if (hasBar) {
    return (
      <nav className="sticky top-0 z-50 relative">
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border"
          style={animateBar ? fade('0.35s') : undefined}
        />
        <div className="relative pt-4 pb-3 px-6 pl-14 xl:pl-6 flex items-center justify-between">
          {/* Left: back link on inner pages (pl-14 leaves room for ToC hamburger on mobile) */}
          <div className="min-w-0 flex items-center">
            {!isHome && (
              <nav
                aria-label="Breadcrumb"
                className="inline-flex items-center gap-1.5 text-sm"
                style={animateBackLink ? fade('0.4s') : undefined}
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <House className="w-4 h-4" />
                  <span className="hidden sm:inline">vijaypanwar.io</span>
                </Link>
                {pageTitle && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className={`hover:text-foreground transition-colors cursor-pointer truncate ${activeSectionLabel ? 'text-muted-foreground' : 'text-foreground font-medium'}`}
                    >
                      {pageTitle}
                    </button>
                  </>
                )}
                {activeSectionLabel && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 hidden sm:block" />
                    <span className="text-foreground font-medium truncate max-w-[140px] sm:max-w-none hidden sm:inline">
                      {activeSectionLabel}
                    </span>
                  </>
                )}
              </nav>
            )}
          </div>
          {/* Right: controls */}
          <div className="flex items-center gap-3 shrink-0">
            {controls}
          </div>
        </div>
      </nav>
    )
  }

  // Home: controls fixed top-right
  if (!hydrated) return null

  return (
    <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
      {controls}
    </div>
  )
}
