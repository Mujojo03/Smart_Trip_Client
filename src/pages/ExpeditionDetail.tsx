import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { EXPEDITIONS } from '../data/expeditions'
import { DifficultyBadge, TerrainBadge } from '../components/Badges'
import { Clock, Users, MapPin, CheckCircle, AlertCircle, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'

export default function ExpeditionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const exp = EXPEDITIONS.find(e => e.id === id)
  const [selectedDate, setSelectedDate] = useState('')
  const [participants, setParticipants] = useState(1)
  const [openDay, setOpenDay] = useState<number | null>(1)

  if (!exp) return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-400">
      Expedition not found. <Link to="/" className="text-olive underline">Back to catalogue</Link>
    </div>
  )

  const total = exp.priceKes * participants

  function handleBook() {
    if (!selectedDate) return
    navigate(`/book/${exp!.id}`, { state: { date: selectedDate, participants } })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-olive mb-6">
        <ArrowLeft size={14} /> All expeditions
      </button>

      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden h-72 mb-8">
        <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex gap-2 mb-2">
            <DifficultyBadge level={exp.difficulty} />
            <TerrainBadge terrain={exp.terrain} />
          </div>
          <h1 className="text-3xl font-bold">{exp.name}</h1>
          <p className="text-white/80 mt-1">{exp.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="col-span-2 space-y-8">
          {/* Quick stats */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1.5"><Clock size={15} className="text-olive" />{exp.durationDays} days</span>
            <span className="flex items-center gap-1.5"><Users size={15} className="text-olive" />Max {exp.maxParticipants} participants</span>
            <span className="flex items-center gap-1.5"><MapPin size={15} className="text-olive" />{exp.location}</span>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="font-bold text-gray-900 text-lg mb-3">Highlights</h2>
            <ul className="grid grid-cols-2 gap-2">
              {exp.highlights.map(h => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-olive mt-0.5 shrink-0" />{h}
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary */}
          <div>
            <h2 className="font-bold text-gray-900 text-lg mb-3">Itinerary</h2>
            <div className="space-y-2">
              {exp.itinerary.map(day => (
                <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-olive/10 text-olive text-xs font-bold flex items-center justify-center shrink-0">
                        {day.day}
                      </span>
                      <span className="font-medium text-sm text-gray-900">{day.title}</span>
                    </div>
                    {openDay === day.day ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                  </button>
                  {openDay === day.day && (
                    <div className="px-4 pb-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
                      {day.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="font-bold text-gray-900 mb-3">What's included</h2>
              <ul className="space-y-1.5">
                {exp.includes.map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={13} className="text-green-500 shrink-0" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Required documents</h2>
              <ul className="space-y-1.5">
                {exp.requirements.map(r => (
                  <li key={r} className="flex items-center gap-2 text-sm text-gray-700">
                    <AlertCircle size={13} className="text-olive shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: booking widget */}
        <div className="col-span-1">
          <div className="sticky top-20 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">KES {exp.priceKes.toLocaleString()}</span>
              <span className="text-sm text-gray-400 ml-1">/ person</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Start Date</label>
              <div className="space-y-1.5">
                {exp.availableDates.map(d => (
                  <button key={d} onClick={() => setSelectedDate(d)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${selectedDate === d ? 'border-olive bg-olive/5 text-olive font-medium' : 'border-gray-200 text-gray-700 hover:border-olive/50'}`}>
                    {new Date(d).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Participants</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setParticipants(p => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-olive hover:text-olive flex items-center justify-center font-bold">−</button>
                <span className="text-lg font-semibold w-6 text-center">{participants}</span>
                <button onClick={() => setParticipants(p => Math.min(exp.maxParticipants, p + 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-olive hover:text-olive flex items-center justify-center font-bold">+</button>
                <span className="text-xs text-gray-400">max {exp.maxParticipants}</span>
              </div>
            </div>

            {selectedDate && (
              <div className="bg-olive/5 rounded-lg px-3 py-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>KES {exp.priceKes.toLocaleString()} × {participants}</span>
                  <span className="font-semibold text-gray-900">KES {total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button onClick={handleBook} disabled={!selectedDate}
              className="w-full py-3 bg-olive text-white font-semibold rounded-xl hover:bg-olive-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {selectedDate ? 'Book Now' : 'Select a date to continue'}
            </button>

            <p className="text-xs text-gray-400 text-center">No payment charged until confirmed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
