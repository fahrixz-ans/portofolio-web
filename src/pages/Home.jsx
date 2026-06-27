import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Certificates from '../components/Certificates'
import Gallery from '../components/Gallery'
import PKL from '../components/PKL'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'

export default function Home() {
  return (
    <>
      <SEO 
        title="Portofolio Fahri Andrian Saputra — Web Developer"
        description="Portofolio Fahri Andrian Saputra - Web Developer dari Tanggamus, Lampung. Spesialisasi React, JavaScript, TypeScript, dan pengembangan web modern."
        url="https://fahriandriansaputra-portofolio.vercel.app/"
        keywords="web developer, react developer, frontend developer, tanggamus, lampung, fahrixz, tiktok fahri, sukabanjar, kang preset, fahrixz old, fahrixz preset, pkl, talang padang, ambarawa, pringsewu, berita, update, expo, LinkedIn, fahri andrian saputra, alight motion, template capcut, @fahriandriamsaputraa, @fhrandrnsptra, trending, topik, tiktok, x, Facebook, Instagram, capcut, YouTube, video, editor, creator, marketing, karyawan, retail, tanggamus, pihabung, girang, javascript, typescript"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-galaxy-bg overflow-x-hidden"
      >
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certificates />
          <Gallery />
          <PKL />
          <Contact />
        </main>
        
        <Footer />
        <BackToTop />
      </motion.div>
    </>
  )
}
