import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-olive text-lg">
          <Compass size={20} className="text-olive" />
          Smart Trip
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-olive transition-colors">Expeditions</Link>
          <a href="#" className="hover:text-olive transition-colors">About</a>
          <a href="#" className="hover:text-olive transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )
}
