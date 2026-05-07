import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { faridProfile } from './content/farid-profile'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Field Notes', href: '/#field-notes' },
  { label: 'Contact', href: '/#contact' },
]

export default function GlobalNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  if (pathname.startsWith('/ops')) return null

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`farid-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="farid-navbar-inner">
          <Link to="/" className="farid-logo" aria-label="Farid Sayago home"><span className="farid-logo-mark">FS</span><span>{faridProfile.name}</span></Link>
          <nav aria-label="Primary navigation" className="farid-desktop-nav"><ul>{navLinks.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></nav>
          <div className="farid-nav-meta"><span><span className="farid-dot" /> available</span><a href={faridProfile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={faridProfile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
          <button
            className="farid-menu-toggle"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="farid-mobile-menu"
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </header>

      <div id="farid-mobile-menu" className={`farid-mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <ul>
            {navLinks.map(link => <li key={link.href}><a href={link.href} onClick={closeMenu}>{link.label}</a></li>)}
          </ul>
          <a href="/#contact" className="farid-mobile-contact" onClick={closeMenu}>Available for work</a>
        </nav>
      </div>
      {menuOpen && <button className="farid-menu-backdrop" onClick={closeMenu} aria-label="Close menu" />}
    </>
  )
}
