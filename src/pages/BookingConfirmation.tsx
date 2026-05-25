import { useParams, useLocation, Link } from 'react-router-dom'
import { EXPEDITIONS } from '../data/expeditions'
import { CheckCircle, Calendar, Users, MapPin, Smartphone, Bitcoin, Download } from 'lucide-react'

interface ConfirmationState {
  date: string
  participants: number
  participant: { name: string; email: string; phone: string }
  paymentMethod: 'mpesa' | 'bitcoin'
  total: number
  bookingRef: string
}

export default function BookingConfirmation() {
  const { id } = useParams()
  const location = useLocation()
  const exp = EXPEDITIONS.find(e => e.id === id)
  const state = location.state as ConfirmationState | null

  if (!exp || !state) return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center text-gray-400">
      No booking found. <Link to="/" className="text-olive underline">Browse expeditions</Link>
    </div>
  )

  const { date, participants, participant, paymentMethod, total, bookingRef } = state

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-500 mt-2">
          Your adventure is locked in. A confirmation has been sent to <span className="font-medium text-gray-700">{participant.email}</span>.
        </p>
      </div>

      {/* Booking reference */}
      <div className="bg-olive/5 border border-olive/20 rounded-2xl p-5 mb-6 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Booking Reference</p>
        <p className="text-3xl font-bold text-olive tracking-widest">{bookingRef}</p>
        <p className="text-xs text-gray-400 mt-1">Keep this reference for check-in and any queries</p>
      </div>

      {/* Booking summary */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
        {/* Expedition image strip */}
        <div className="relative h-32 overflow-hidden">
          <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-white">
            <p className="font-bold text-base">{exp.name}</p>
            <p className="text-white/70 text-xs">{exp.location}</p>
          </div>
        </div>

        <div className="p-5 space-y-3 text-sm">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar size={15} className="text-olive shrink-0" />
            <span>
              <span className="font-medium">Departure: </span>
              {new Date(date).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Users size={15} className="text-olive shrink-0" />
            <span><span className="font-medium">Participants: </span>{participants}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin size={15} className="text-olive shrink-0" />
            <span><span className="font-medium">Meeting point: </span>Nairobi CBD — exact location in confirmation email</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            {paymentMethod === 'mpesa'
              ? <Smartphone size={15} className="text-green-600 shrink-0" />
              : <Bitcoin size={15} className="text-orange-500 shrink-0" />}
            <span>
              <span className="font-medium">Paid via </span>
              {paymentMethod === 'mpesa' ? 'M-Pesa' : 'Bitcoin'}
              <span className="font-bold text-gray-900 ml-2">KES {total.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* What to bring */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">What to bring on the day</h2>
        <ul className="space-y-1.5">
          {exp.requirements.map(r => (
            <li key={r} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle size={13} className="text-olive shrink-0" />{r}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-sm rounded-xl text-gray-600 hover:border-olive hover:text-olive transition-colors">
          <Download size={14} /> Download Receipt
        </button>
        <Link to="/" className="flex-1 py-3 bg-olive text-white font-semibold rounded-xl hover:bg-olive-dark transition-colors text-center text-sm">
          Browse More Expeditions
        </Link>
      </div>
    </div>
  )
}
