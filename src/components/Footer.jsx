import { data } from '../data/portfolioData'

export default function Footer() {
  const personal = data.personal
  const updateDate = `27 Juni ${personal.tahunUpdate}`

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-bold text-galaxy-text">{personal.namaPanggilan}</p>
            <p className="text-sm text-galaxy-muted">{personal.tagline}</p>
          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-sm text-galaxy-muted flex items-center gap-1">
              Dibuat Oleh Fahri, menggunakan React & Tailwind
            </p>
            <p className="text-sm text-galaxy-muted">
              &copy; {personal.tahunUpdate} {personal.namaPanggilan}.
            </p>
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <p className="text-sm text-galaxy-muted">
              Terakhir diupdate: {updateDate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
