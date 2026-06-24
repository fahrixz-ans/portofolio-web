import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

function EducationCard({ institution, delay = 0, size = 'normal' }) {
  const isLarge = size === 'large'
  const logoSize = isLarge ? 72 : 64
  const hasLogo = institution.logoPath && !institution.logoPath.includes('placeholder')

  return (
    <ScrollReveal delay={delay} direction={isLarge ? 'left' : 'up'}>
      <div className={`flex flex-col items-center text-center ${isLarge ? 'galaxy-card-alt max-w-xl mx-auto' : ''}`}>
        {/* Logo / Initial */}
        <div
          className="rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden"
          style={{ width: logoSize, height: logoSize }}
        >
          {hasLogo ? (
            <img
              src={institution.logoPath}
              alt={institution.nama}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <span className="text-xl font-bold bg-gradient-to-br from-galaxy-primary to-galaxy-secondary bg-clip-text text-transparent">
              {institution.nama.charAt(0)}
            </span>
          )}
        </div>

        {/* School name */}
        <h3 className="text-galaxy-text font-semibold text-sm md:text-base mb-1">
          {institution.nama}
        </h3>

        {/* City */}
        <p className="text-galaxy-muted text-sm">{institution.kota}</p>

        {/* Year */}
        <p className="text-galaxy-muted text-sm">{institution.tahunLulus}</p>

        {/* Major (for SMK) */}
        {institution.jurusan && (
          <p className="text-galaxy-primary text-sm mt-1 font-medium">
            {institution.jurusan}
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}

export default function Education() {
  const education = data.education

  return (
    <section id="education" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-4">
            Pendidikan
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="w-24 h-1 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary mb-12" />
        </ScrollReveal>

        {/* SD & SMP Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
          <EducationCard institution={education.sd} delay={0} />
          <EducationCard institution={education.smp} delay={0.15} />
        </div>

        {/* Divider */}
        <ScrollReveal>
          <div className="h-px bg-gradient-to-r from-transparent via-galaxy-primary/50 to-transparent mb-12" />
        </ScrollReveal>

        {/* SMK (centered, highlighted) */}
        <EducationCard institution={education.smk} delay={0.2} size="large" />
      </div>
    </section>
  )
}
