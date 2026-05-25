import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Catalogue from './pages/Catalogue'
import ExpeditionDetail from './pages/ExpeditionDetail'
import BookingFlow from './pages/BookingFlow'
import BookingConfirmation from './pages/BookingConfirmation'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/expedition/:id" element={<ExpeditionDetail />} />
        <Route path="/book/:id" element={<BookingFlow />} />
        <Route path="/confirmation/:id" element={<BookingConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}
