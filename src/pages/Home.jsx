import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Education from '../components/Education'
import PKL from '../components/PKL'
import Projects from '../components/Projects'
import Certificates from '../components/Certificates'
import Gallery from '../components/Gallery'
import Skills from '../components/Skills'
import TechStack from '../components/TechStack'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'

export default function Home() {
  const [scrollPhase, setScrollPhase] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      if (scrollY < vh) {
        setScrollPhase('hero')
      } else if (scrollY < vh * 1.5) {
        setScrollPhase('transition')
      } else if (scrollY < vh * 5) {
        setScrollPhase('lock')
      } else {
        setScrollPhase('footer')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <main>
        <Hero scrollPhase={scrollPhase} />
        <About />
        <Education />
        <PKL />
        <Projects />
        <Certificates />
        <Gallery />
        <Skills />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </motion.div>
  )
}
