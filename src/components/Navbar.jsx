import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { data } from '../data/portfolioData'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Pendidikan', href: '#education' },
  { label: 'PKL', href: '#pkl' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Skill', href: '#skills' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Hubungi', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const isGuestbook = location.pathname === '/guestbook'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section detection with IntersectionObserver
  useEffect(() => {
    if (isGuestbook) return

    const sections = NAV_ITEMS.map((item) => item.href.replace('#', '')).filter(Boolean)
    const observers = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isGuestbook])

  const scrollToSection = (href) => {
    setMobileOpen(false)
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) {
      const navHeight = 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-galaxy-bg/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-lg tracking-wide text-galaxy-text hover:text-galaxy-primary transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {data.personal.namaPanggilan}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {!isGuestbook ? (
            <>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-galaxy-primary font-medium'
                      : 'text-galaxy-muted hover:text-galaxy-text'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                to="/guestbook"
                className="text-sm text-galaxy-muted hover:text-galaxy-primary transition-colors"
              >
                Guestbook
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-sm text-galaxy-muted hover:text-galaxy-text transition-colors"
              >
                Home
              </Link>
              <span className="text-sm text-galaxy-primary font-medium">Guestbook</span>
            </>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button
          className="lg:hidden flex flex-col gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-current"
          />
          <motion.div
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-current"
          />
          <motion.div
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-0.5 bg-current"
          />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-galaxy-bg border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {!isGuestbook ? (
                <>
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left text-sm py-1 ${
                        activeSection === item.href.replace('#', '')
                          ? 'text-galaxy-primary font-medium'
                          : 'text-galaxy-muted'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Link
                    to="/guestbook"
                    className="block text-sm text-galaxy-muted py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    Guestbook
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="block text-sm text-galaxy-muted py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    Home
                  </Link>
                  <span className="block text-sm text-galaxy-primary font-medium py-1">
                    Guestbook
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
