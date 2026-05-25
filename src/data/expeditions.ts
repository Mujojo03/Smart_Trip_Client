export type Difficulty = 'Easy' | 'Moderate' | 'Hard' | 'Extreme'
export type Terrain = 'Alpine' | 'Savannah' | 'Forest' | 'Desert' | 'Coastal' | 'Grassland'

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Expedition {
  id: string
  name: string
  tagline: string
  location: string
  region: string
  terrain: Terrain
  difficulty: Difficulty
  durationDays: number
  priceKes: number
  maxParticipants: number
  image: string // unsplash URL
  highlights: string[]
  itinerary: ItineraryDay[]
  includes: string[]
  requirements: string[]
  availableDates: string[] // ISO start dates
}

export const EXPEDITIONS: Expedition[] = [
  {
    id: 'e1',
    name: 'Mt Kenya Summit Trek',
    tagline: 'Conquer the roof of Kenya',
    location: 'Mt Kenya National Park',
    region: 'Central Kenya',
    terrain: 'Alpine',
    difficulty: 'Hard',
    durationDays: 6,
    priceKes: 45000,
    maxParticipants: 12,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80',
    highlights: ['Point Lenana summit (4,985m)', 'Glacial lakes', 'Unique Afro-alpine flora', 'Panoramic Rift Valley views'],
    itinerary: [
      { day: 1, title: 'Nairobi → Sirimon Gate', description: 'Transfer to park gate, briefing, camp setup at Old Moses (3,300m).' },
      { day: 2, title: 'Old Moses → Shipton\'s Camp', description: 'Ascend through moorland to Shipton\'s Camp (4,200m). Acclimatisation hike.' },
      { day: 3, title: 'Acclimatisation Day', description: 'Rest and short hike to Hausberg Tarn. Prepare gear for summit push.' },
      { day: 4, title: 'Summit Push — Point Lenana', description: 'Pre-dawn start (2am). Summit at sunrise. Descend to Mackinder\'s Camp.' },
      { day: 5, title: 'Mackinder\'s → Chogoria Gate', description: 'Descend through the scenic Gorges Valley and Hall Tarns.' },
      { day: 6, title: 'Chogoria → Nairobi', description: 'Final descent, certificates awarded, transfer back to Nairobi.' },
    ],
    includes: ['Park fees', 'Camping equipment', 'Meals (full board)', 'Certified assessor', 'First aid kit', 'Transfer from Nairobi'],
    requirements: ['Medical clearance form', 'ID/Passport', 'Emergency contact', 'Signed waiver'],
    availableDates: ['2026-06-01', '2026-06-15', '2026-07-01', '2026-07-20', '2026-08-03'],
  },
  {
    id: 'e2',
    name: 'Maasai Mara Migration Safari',
    tagline: 'Witness the greatest show on Earth',
    location: 'Maasai Mara National Reserve',
    region: 'Rift Valley',
    terrain: 'Grassland',
    difficulty: 'Easy',
    durationDays: 4,
    priceKes: 38000,
    maxParticipants: 20,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    highlights: ['Great Wildebeest Migration', 'Big Five game drives', 'Maasai cultural visit', 'Hot air balloon option'],
    itinerary: [
      { day: 1, title: 'Nairobi → Mara', description: 'Morning drive or flight to the Mara. Afternoon game drive. Sundowner at camp.' },
      { day: 2, title: 'Full Day Game Drives', description: 'Dawn and dusk game drives. River crossing viewing during migration season.' },
      { day: 3, title: 'Maasai Village & Bush Walk', description: 'Morning guided bush walk with Maasai guide. Afternoon village cultural visit.' },
      { day: 4, title: 'Final Game Drive → Nairobi', description: 'Early morning drive, breakfast at camp, transfer back to Nairobi.' },
    ],
    includes: ['Park fees', 'Tented camp accommodation', 'All meals', 'Game drives', 'Certified assessor', 'Transfer'],
    requirements: ['ID/Passport', 'Emergency contact', 'Signed waiver'],
    availableDates: ['2026-06-05', '2026-06-19', '2026-07-03', '2026-07-17', '2026-08-07'],
  },
  {
    id: 'e3',
    name: 'Tsavo East Wildlife Safari',
    tagline: 'Red elephants and endless plains',
    location: 'Tsavo East National Park',
    region: 'Coast Province',
    terrain: 'Savannah',
    difficulty: 'Easy',
    durationDays: 3,
    priceKes: 28000,
    maxParticipants: 16,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    highlights: ['Red dust elephants', 'Mudanda Rock', 'Galana River', 'Yatta Plateau — world\'s longest lava flow'],
    itinerary: [
      { day: 1, title: 'Nairobi → Tsavo East', description: 'Drive to Voi Gate. Afternoon game drive to camp.' },
      { day: 2, title: 'Full Day Tsavo', description: 'Full day game drives. Visit Mudanda Rock and Galana River.' },
      { day: 3, title: 'Morning Drive → Nairobi', description: 'Final morning game drive, lunch at lodge, return to Nairobi.' },
    ],
    includes: ['Park fees', 'Lodge accommodation', 'All meals', 'Game drives', 'Certified assessor'],
    requirements: ['ID/Passport', 'Emergency contact', 'Signed waiver'],
    availableDates: ['2026-06-08', '2026-06-22', '2026-07-06', '2026-07-27'],
  },
  {
    id: 'e4',
    name: 'Aberdare Forest Hike',
    tagline: 'Ancient forest, hidden waterfalls',
    location: 'Aberdare National Park',
    region: 'Central Kenya',
    terrain: 'Forest',
    difficulty: 'Moderate',
    durationDays: 3,
    priceKes: 22000,
    maxParticipants: 10,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    highlights: ['Karuru Falls (273m)', 'Elephant and buffalo sightings', 'Bamboo forest', 'Trout fishing'],
    itinerary: [
      { day: 1, title: 'Nairobi → Aberdare', description: 'Drive to park. Afternoon hike to Karuru Falls viewpoint.' },
      { day: 2, title: 'Forest Trail', description: 'Full day guided hike through bamboo and podocarpus forest. Wildlife tracking.' },
      { day: 3, title: 'Morning Hike → Nairobi', description: 'Short morning trail, breakfast, return to Nairobi.' },
    ],
    includes: ['Park fees', 'Bandas accommodation', 'All meals', 'Certified assessor', 'Transfer'],
    requirements: ['Medical form', 'ID/Passport', 'Emergency contact', 'Signed waiver'],
    availableDates: ['2026-06-10', '2026-06-24', '2026-07-08', '2026-08-05'],
  },
  {
    id: 'e5',
    name: "Hell's Gate Cycling & Hiking",
    tagline: 'Cycle through a living Rift Valley',
    location: "Hell's Gate National Park",
    region: 'Rift Valley',
    terrain: 'Savannah',
    difficulty: 'Easy',
    durationDays: 1,
    priceKes: 8500,
    maxParticipants: 25,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    highlights: ['Cycling among wildlife', 'Fischer\'s Tower rock climb', 'Gorge walk', 'Geothermal spa option'],
    itinerary: [
      { day: 1, title: 'Full Day Hell\'s Gate', description: 'Morning cycle through the park. Gorge walk after lunch. Optional geothermal spa. Return to Nairobi by evening.' },
    ],
    includes: ['Park fees', 'Bicycle hire', 'Certified assessor', 'Packed lunch'],
    requirements: ['ID/Passport', 'Emergency contact', 'Signed waiver'],
    availableDates: ['2026-06-06', '2026-06-13', '2026-06-20', '2026-06-27', '2026-07-04', '2026-07-11'],
  },
  {
    id: 'e6',
    name: 'Lake Turkana Expedition',
    tagline: 'The Jade Sea — Kenya\'s last frontier',
    location: 'Lake Turkana, Loiyangalani',
    region: 'Northern Kenya',
    terrain: 'Desert',
    difficulty: 'Extreme',
    durationDays: 8,
    priceKes: 95000,
    maxParticipants: 8,
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    highlights: ['World\'s largest desert lake', 'El Molo tribe visit', 'Central Island volcano', 'Nile crocodile sightings'],
    itinerary: [
      { day: 1, title: 'Nairobi → Marsabit', description: 'Long drive north. Overnight at Marsabit.' },
      { day: 2, title: 'Marsabit → Loiyangalani', description: 'Arrive at Lake Turkana. Camp setup. First views of the Jade Sea.' },
      { day: 3, title: 'Central Island Boat Trip', description: 'Boat to Central Island volcanic crater lakes. Crocodile nesting grounds.' },
      { day: 4, title: 'El Molo Village', description: 'Visit Kenya\'s smallest tribe. Cultural exchange and fishing demonstration.' },
      { day: 5, title: 'North Shore Exploration', description: 'Drive along the northern shore. Fossil sites and desert landscapes.' },
      { day: 6, title: 'Rest & Acclimatisation', description: 'Free day at camp. Swimming, fishing, birdwatching.' },
      { day: 7, title: 'South Island', description: 'Boat trip to South Island NP. Hippo and flamingo sightings.' },
      { day: 8, title: 'Return to Nairobi', description: 'Long drive south. Arrive Nairobi by evening.' },
    ],
    includes: ['All transport', 'Camping equipment', 'All meals', '2 certified assessors', 'Boat trips', 'Park fees'],
    requirements: ['Medical clearance form', 'ID/Passport', 'Emergency contact', 'Signed waiver', 'Travel insurance proof'],
    availableDates: ['2026-07-01', '2026-08-01', '2026-09-01'],
  },
]

export const TERRAIN_OPTIONS: Terrain[] = ['Alpine', 'Savannah', 'Forest', 'Desert', 'Coastal', 'Grassland']
export const DIFFICULTY_OPTIONS: Difficulty[] = ['Easy', 'Moderate', 'Hard', 'Extreme']
