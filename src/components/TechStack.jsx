import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

// Import only needed icons
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiGithub, SiVercel, SiNodedotjs,
} from 'react-icons/si'

const iconMap = {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiGithub, SiVercel, SiNodedotjs,
}

function TechItem({ tech, index }) {
  const IconComponent = iconMap[tech.icon]

  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="flex flex-col items-center gap-2 group cursor-pointer">
        {IconComponent && (
          <IconComponent
            className="w-12 h-12 text-galaxy-muted transition-all duration-300"
            style={{
              filter: 'grayscale(60%)',
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%)'
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.color = '#38bdf8'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(60%)'
              e.currentTarget.style.opacity = '0.7'
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        )}
        <span className="text-sm text-galaxy-muted group-hover:text-galaxy-text transition-colors">
          {tech.nama}
        </span>
      </div>
    </ScrollReveal>
  )
}

export default function TechStack() {
  const techStack = data.techStack

  return (
    <section id="techstack" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-2">
            Teknologi yang Digunakan
          </h2>
          <p className="text-galaxy-muted mb-12">
            Website ini dibangun menggunakan:
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-8">
          {techStack.map((tech, i) => (
            <TechItem key={tech.nama} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
