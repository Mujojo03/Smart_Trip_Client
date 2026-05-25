import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EXPEDITIONS, DIFFICULTY_OPTIONS, TERRAIN_OPTIONS } from '../data/expeditions'
import type { Difficulty, Terrain } from '../data/expeditions'
import { DifficultyBadge, TerrainBadge } from '../components/Badges'
import { Clock, Users, MapPin, SlidersHorizontal, X } from 'lucide-react'

export default function Catalogue() {
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [terrain, setTerrain] = useState<Terrain | ''>('')
  const [maxDays, setMaxDays] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = EXPEDITIONS.filter(e => {
    if (difficulty && e.difficulty !== difficulty) return false
    if (terrain && e.terrain !== terrain) return false
    if (maxDays && e.durationDays > maxDays) return false
    return true
  })

  const activeFilters = [difficulty, terrain, maxDays ? `≤${maxDays} days` : ''].filter(Boolean)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-olive-dark overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1400&q=80"
          alt="Kenya landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-white">
          <p className="text-olive-light text-sm font-medium tracking-widest uppercase mb-3">Kenya & East Africa</p>
          <h1 className="text-4xl font-bold leading-tight max-w-xl">
            Expeditions built for those who go further
          </h1>
          <p className="mt-4 text-white/70 max-w-lg text-base">
            Professionally guided field expeditions across Kenya's most extraordinary landscapes. Every trip is safety-assessed and fully managed.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setShowFilters(v => !v)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-olive hover:text-olive transition-colors bg-white">
            <SlidersHorizontal size={14} />
            Filters
            {activeFilters.length > 0 && (
              <span className="bg-olive text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{activeFilters.length}</span>
            )}
          </button>

          {/* Active filter pills */}
          {difficulty && (
            <span className="flex items-center gap-1 px-3 py-1 bg-olive/10 text-olive text-xs rounded-full">
              {difficulty} <button onClick={() => setDifficulty('')}><X size={11} /></button>
            </span>
          )}
          {terrain && (
            <span className="flex items-center gap-1 px-3 py-1 bg-olive/10 text-olive text-xs rounded-full">
              {terrain} <button onClick={() => setTerrain('')}><X size={11} /></button>
            </span>
          )}
          {maxDays > 0 && (
            <span className="flex items-center gap-1 px-3 py-1 bg-olive/10 text-olive text-xs rounded-full">
              ≤{maxDays} days <button onClick={() => setMaxDays(0)}><X size={11} /></button>
            </span>
          )}

          <span className="ml-auto text-sm text-gray-400">{filtered.length} expedition{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTY_OPTIONS.map(d => (
                  <button key={d} onClick={() => setDifficulty(difficulty === d ? '' : d)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${difficulty === d ? 'bg-olive text-white border-olive' : 'border-gray-200 text-gray-600 hover:border-olive'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Terrain</label>
              <div className="flex flex-wrap gap-2">
                {TERRAIN_OPTIONS.map(t => (
                  <button key={t} onClick={() => setTerrain(terrain === t ? '' : t)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${terrain === t ? 'bg-olive text-white border-olive' : 'border-gray-200 text-gray-600 hover:border-olive'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Max Duration: {maxDays > 0 ? `${maxDays} days` : 'Any'}
              </label>
              <input type="range" min={0} max={10} value={maxDays}
                onChange={e => setMaxDays(Number(e.target.value))}
                className="w-full accent-olive" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Any</span><span>10 days</span></div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(exp => (
            <Link key={exp.id} to={`/expedition/${exp.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <div className="relative h-48 overflow-hidden">
                <img src={exp.image} alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <DifficultyBadge level={exp.difficulty} />
                </div>
                <div className="absolute top-3 right-3">
                  <TerrainBadge terrain={exp.terrain} />
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-olive font-medium">{exp.region}</p>
                <h2 className="font-bold text-gray-900 mt-0.5 text-base leading-snug">{exp.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{exp.tagline}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={12} />{exp.durationDays} day{exp.durationDays > 1 ? 's' : ''}</span>
                  <span className="flex items-center gap-1"><Users size={12} />Max {exp.maxParticipants}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{exp.location.split(',')[0]}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <div>
                    <span className="text-lg font-bold text-gray-900">KES {exp.priceKes.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">/ person</span>
                  </div>
                  <span className="text-xs text-olive font-medium group-hover:underline">View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No expeditions match your filters.</p>
            <button onClick={() => { setDifficulty(''); setTerrain(''); setMaxDays(0) }}
              className="mt-3 text-sm text-olive hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
