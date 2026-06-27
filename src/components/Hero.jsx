import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { data } from '../data/portfolioData'
import SolarSystem from './solar-system/SolarSystem'

// Text Scramble Effect Component
function TextScramble({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

  useEffect(() => {
    let iteration = 0
    const totalIterations = text.length * 3
    let frame = 0

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration / 3) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )

        iteration++
        frame++

        if (iteration > totalIterations) {
          setDisplayText(text)
          setIsComplete(true)
          clearInterval(interval)
        }
      }, 30)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <span style={{ filter: isComplete ? 'none' : 'blur(0.5px)' }}>
      {displayText || '\u00A0'}
    </span>
  )
}

export default function Hero({ scrollPhase }) {
  const hero = data.hero
  const personal = data.personal
  const [solarSystemProps, setSolarSystemProps] = useState({
    size: typeof window !== 'undefined' && window.innerWidth < 1024 ? 250 : 400,
    opacity: 1,
    interactive: true,
  })

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024
      setSolarSystemProps((prev) => ({
        ...prev,
        size: isMobile ? 250 : 400,
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll-driven solar system changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      if (scrollY < vh) {
        // Hero phase
        setSolarSystemProps((prev) => ({
          ...prev,
          opacity: 1,
          interactive: true,
        }))
      } else if (scrollY < vh * 1.5) {
        // Transition phase
        const progress = (scrollY - vh) / (vh * 0.5)
        setSolarSystemProps((prev) => ({
          ...prev,
          opacity: 1 - progress * 0.2,
          interactive: true,
        }))
      } else {
        // Lock phase - gradually reduce opacity
        const lockProgress = Math.min((scrollY - vh * 1.5) / (vh * 3.5), 1)
        setSolarSystemProps((prev) => ({
          ...prev,
          opacity: Math.max(0.1, 0.8 - lockProgress * 0.7),
          interactive: false,
        }))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) {
      const navHeight = 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Welcome text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-galaxy-muted text-lg mb-2"
            >
              {hero.salam}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-galaxy-muted text-lg mb-4"
            >
              {hero.subSalam}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-galaxy-text"
            >
              {hero.nama}
            </motion.h1>

            {/* Role with text scramble */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-xl md:text-2xl font-mono text-galaxy-primary mb-6 tracking-widest"
            >
              <TextScramble text={hero.role} delay={0.9} />
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-galaxy-muted text-base md:text-lg max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0"
            >
              {hero.deskripsi}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex gap-4 justify-center lg:justify-start mb-8"
            >
              <button onClick={() => scrollToSection('#projects')} className="btn-primary">
                {hero.cta1}
              </button>
              <button onClick={() => scrollToSection('#contact')} className="btn-outline">
                {hero.cta2}
              </button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex gap-6 justify-center lg:justify-start"
            >
              {[
                { href: personal.tiktokUrl, icon: 'tiktok', label: 'Tiktok' },
                { href: personal.linkedinUrl, icon: 'linkedin', label: 'LinkedIn' },
                { href: `mailto:${personal.email}`, icon: 'email', label: 'Email' },
                { href: personal.instagramUrl, icon: 'instagram', label: 'Instagram' },
              ].map((social, i) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  target={social.icon === 'email' ? '_self' : '_blank'}
                  rel={social.icon === 'email' ? '' : 'noopener noreferrer'}
                  className="text-galaxy-muted hover:text-galaxy-primary transition-colors"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                >
                  <SocialIcon name={social.icon} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Solar System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center items-center z-10"
          >
            <SolarSystem
              size={solarSystemProps.size}
              opacity={solarSystemProps.opacity}
              interactive={solarSystemProps.interactive}
              showDetails={true}
              scrollPhase={scrollPhase}
            />
          </motion.div>
        </div>
      </div>

      {/* Solar System Background for scroll (visible on right side when scrolled) */}
      <div
        className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"
        style={{
          opacity: solarSystemProps.opacity * 0.6,
        }}
      >
        <SolarSystem
          size={550}
          opacity={solarSystemProps.opacity * 0.6}
          interactive={false}
          showDetails={true}
          scrollPhase="lock"
        />
      </div>
    </section>
  )
}

// Social Icon SVGs
function SocialIcon({ name }) {
  const icons = {
    tiktok: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.216h-3.118v12.33a2.89 2.89 0 1 1-2.89-2.89c.285 0 .56.041.822.118V8.865a6.01 6.01 0 0 0-.822-.057A6.008 6.008 0 1 0 15.82 14.82V8.542a7.902 7.902 0 0 0 4.769 1.601V6.686z"/>
</svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  }

  return icons[name] || null
}
