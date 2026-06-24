import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Guestbook from './pages/Guestbook'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guestbook" element={<Guestbook />} />
    </Routes>
  )
}
