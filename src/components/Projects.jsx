import { useState } from 'react'
import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import Modal from './Modal'

function ProjectCard({ project, index, onSelect }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="galaxy-card overflow-hidden group cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <img
            src={project.thumbnail}
            alt={project.nama}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-galaxy-bg/85 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center justify-center gap-3 p-4">
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect(project)
              }}
              className="btn-primary text-sm"
            >
              Pelajari Selengkapnya
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <h3 className="text-galaxy-text font-semibold truncate mt-4">
            {project.nama}
          </h3>
          <p className="text-galaxy-muted text-sm line-clamp-2 mt-1">
            {project.deskripsi}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-galaxy-card-alt rounded text-xs text-galaxy-muted border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Projects() {
  const projects = data.projects
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSelect = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <section id="projects" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-4">
            Proyek Saya
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="w-24 h-1 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary mb-12" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
