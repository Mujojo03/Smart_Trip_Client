import type { Difficulty, Terrain } from '../data/expeditions'

const difficultyStyle: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-orange-100 text-orange-700',
  Extreme: 'bg-red-100 text-red-700',
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyStyle[level]}`}>{level}</span>
}

export function TerrainBadge({ terrain }: { terrain: Terrain }) {
  return <span className="text-xs px-2 py-0.5 rounded-full bg-olive/10 text-olive font-medium">{terrain}</span>
}
