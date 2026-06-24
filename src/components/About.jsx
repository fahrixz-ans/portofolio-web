import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

export default function About() {
  const about = data.about

  return (
    <section id="about" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-4">
            Tentang Saya
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="w-24 h-1 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-galaxy-muted text-lg leading-relaxed max-w-3xl mb-8">
            {about.paragraf}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <a
            href={about.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-block"
          >
            {about.ctaLabel}
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
