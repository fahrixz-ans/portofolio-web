import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

// Import only needed icons
import {
  SiReact, SiJavascript, SiTailwindcss, SiNodedotjs,
  SiPostgresql, SiGit, SiTypescript, SiNextdotjs,
} from 'react-icons/si'

const iconMap = {
  SiReact, SiJavascript, SiTailwindcss, SiNodedotjs,
  SiPostgresql, SiGit, SiTypescript, SiNextdotjs,
}

function SkillBar({ skill, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const IconComponent = iconMap[skill.icon]

  return (
    <ScrollReveal delay={index * 0.12}>
      <div ref={ref} className="galaxy-card">
        <div className="flex items-center gap-3 mb-3">
          {IconComponent && <IconComponent className="w-6 h-6 text-galaxy-primary" />}
          <h3 className="font-bold" style={{ fontSize: '1.1rem' }}>
            {skill.nama}
          </h3>
          <span className="ml-auto text-galaxy-muted" style={{ fontSize: '0.9rem' }}>
            {skill.level}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #38bdf8, #a855f7)',
            }}
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${skill.level}%` : 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>

        <p className="text-galaxy-muted" style={{ fontSize: '0.85rem' }}>
          {skill.deskripsi}
        </p>
      </div>
    </ScrollReveal>
  )
}

export default function Skills() {
  const skills = data.skills

  return (
    <section id="skills" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-2">
            Keahlian
          </h2>
          <p className="text-galaxy-muted mb-12">
            Kemampuan teknis yang saya miliki.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <SkillBar key={skill.nama} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
