import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Guestbook from './pages/Guestbook'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
