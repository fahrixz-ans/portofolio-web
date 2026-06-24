import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Navbar from '../components/Navbar'
import GuestbookForm from '../components/GuestbookForm'
import GuestbookList from '../components/GuestbookList'
import SolarSystem from '../components/solar-system/SolarSystem'
import Footer from '../components/Footer'

// Mock Supabase client for demo (replace with actual Supabase config)
const mockComments = [
  { id: 1, name: 'Ahmad', message: 'Website portofolionya keren banget! Tata suryanya mantap.', created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, name: 'Budi', message: 'Sangat inspiratif! Semangat terus belajar web developmentnya.', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, name: 'Citra', message: 'Desainnya bagus dan interaktif. Sukses selalu!', created_at: new Date(Date.now() - 172800000).toISOString() },
]

export default function Guestbook() {
  const [comments, setComments] = useState(mockComments)
  const [loading, setLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(10)
  const [toastVisible, setToastVisible] = useState(false)

  const handleSubmit = async ({ name, message }) => {
    // Simulate Supabase insert
    const newComment = {
      id: Date.now(),
      name,
      message,
      created_at: new Date().toISOString(),
    }

    setComments((prev) => [newComment, ...prev])

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#ffffff'],
    })

    // Show toast
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10)
  }

  const visibleComments = comments.slice(0, visibleCount)
  const hasMore = visibleCount < comments.length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-galaxy-bg"
    >
      <Navbar />

      <main className="pt-24 pb-12 relative">
        {/* Solar system background decoration */}
        <div className="absolute right-0 top-1/3 pointer-events-none opacity-40 hidden lg:block">
          <SolarSystem size={500} opacity={0.4} interactive={false} showDetails={false} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center text-galaxy-text mb-4">
              Guestbook
            </h1>
            <p className="text-galaxy-muted text-center mb-12">
              Tinggalkan pesan atau komentar Anda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GuestbookForm onSubmit={handleSubmit} />
          </motion.div>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-galaxy-primary/50 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GuestbookList
              comments={visibleComments}
              loading={loading}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </motion.div>
        </div>

        {/* Toast notification */}
        {toastVisible && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-galaxy-card-alt border border-galaxy-primary/30 text-galaxy-primary px-6 py-3 rounded-lg text-sm z-50 shadow-lg">
            Pesan terkirim!
          </div>
        )}
      </main>

      <Footer />
    </motion.div>
  )
}
