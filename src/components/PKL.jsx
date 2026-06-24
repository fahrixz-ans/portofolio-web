import { useState } from 'react'
import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import Lightbox from './Lightbox'

export default function PKL() {
  const pkl = data.pkl
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const allImages = pkl.foto.map((f) => f.path)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="pkl" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-4">
                Pengalaman Magang
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="w-24 h-1 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary mb-8" />
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 className="text-xl font-bold text-galaxy-text mb-2">
                {pkl.namaPerusahaan}
              </h3>
              <p className="text-galaxy-muted text-sm mb-4">
                {pkl.lokasi} • {pkl.periode}
              </p>
              <span className="inline-block px-4 py-1.5 bg-galaxy-primary text-galaxy-bg text-sm font-semibold rounded-full mb-6">
                {pkl.role}
              </span>
              <p className="text-galaxy-muted leading-relaxed mb-6">
                {pkl.ringkasan}
              </p>
              <a
                href={pkl.sertifikatLink}
                className="btn-outline text-sm"
                onClick={(e) => {
                  if (pkl.sertifikatLink === '#') e.preventDefault()
                }}
              >
                Lihat Sertifikat
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column - Photos */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.2}>
              {/* Main photo */}
              <div
                className="aspect-video rounded-xl overflow-hidden mb-4 cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <img
                  src={pkl.foto[0]?.path}
                  alt={pkl.foto[0]?.caption}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03]"
                  style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                />
              </div>
            </ScrollReveal>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-4">
              {pkl.foto.slice(1).map((foto, i) => (
                <ScrollReveal key={i} delay={0.25 + i * 0.1}>
                  <div
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(i + 1)}
                  >
                    <img
                      src={foto.path}
                      alt={foto.caption}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03]"
                      style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Caption */}
            <ScrollReveal delay={0.35}>
              <p className="text-sm text-galaxy-muted italic mt-4">
                {pkl.foto[lightboxIndex]?.caption}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}
