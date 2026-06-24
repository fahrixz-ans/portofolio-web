import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ project, isOpen, onClose }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) setCurrentImage(0)
  }, [isOpen])

  if (!project) return null

  const carouselImages = [project.thumbnail, project.thumbnail, project.thumbnail] // Repeat for carousel effect

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-galaxy-card rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              aria-label="Tutup modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Image carousel */}
            <div className="relative aspect-video bg-galaxy-bg">
              <img
                src={carouselImages[currentImage]}
                alt={project.nama}
                className="w-full h-full object-cover"
              />
              {carouselImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImage ? 'bg-galaxy-primary' : 'bg-white/40'
                      }`}
                      aria-label={`Gambar ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-galaxy-text mb-2">{project.nama}</h3>
              <p className="text-galaxy-muted mb-4">{project.deskripsi}</p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-galaxy-text mb-2">Fitur:</h4>
                <ul className="list-disc list-inside text-galaxy-muted text-sm space-y-1">
                  {project.fitur?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-galaxy-text mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-galaxy-card-alt rounded-full text-xs text-galaxy-primary border border-galaxy-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm"
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
