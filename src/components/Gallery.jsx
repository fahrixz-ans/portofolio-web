import { useState } from 'react'
import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import Lightbox from './Lightbox'

export default function Gallery() {
  const gallery = data.gallery
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="gallery" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-4">
            Dokumentasi & Aktivitas
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="w-24 h-1 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary mb-12" />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className="aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03]"
                  style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={gallery}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}
