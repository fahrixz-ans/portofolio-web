import { data } from '../data/portfolioData'

export default function Footer() {
  const personal = data.personal
  const updateDate = `24 Juni ${personal.tahunUpdate}`

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
              Dibuat dengan
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              menggunakan React & Tailwind
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
