export interface IndustryChallenge {
  pain: string
  solution: string
}

export interface Industry {
  slug: string
  name: string
  shortDescription: string
  challengeStatement: string
  heroGradient: string // CSS gradient string for placeholder hero
  iconColor: string
  challenges: string[]
  traxonSolutions: IndustryChallenge[]
  recommendedProduct: string // product slug
  keyStat: { value: string; label: string }
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'construction',
    name: 'Construction & Civil',
    shortDescription: 'Move structural steel, precast panels, and heavy equipment through active job sites.',
    challengeStatement: 'Tight corridors. Structural loads. Zero tolerance for delay.',
    heroGradient: 'linear-gradient(135deg, #0e1218 0%, #1a2030 100%)',
    iconColor: '#f59e0b',
    challenges: [
      'Moving 4,000 lbs precast stairwells through 900mm doorways',
      'Relocating plant and generators across uneven concrete slabs',
      'Working around active trades with no lay-down space',
      'Meeting programme with only nights and weekends for moves',
      'No forklift or crane access in finished interior spaces',
    ],
    traxonSolutions: [
      {
        pain: 'Narrow corridor access',
        solution: 'At 980mm wide, the Scarab X5 clears 1-metre doorways loaded to full 4,000 lbs — no disassembly required.',
      },
      {
        pain: 'Uneven and ramped surfaces',
        solution: 'Rubber track system and 10° gradient rating handle construction-site surfaces including ramps, thresholds, and cable covers.',
      },
      {
        pain: 'Night-shift operations',
        solution: 'Battery-electric operation — zero fumes, low noise. IP54 rated for dusty concrete environments.',
      },
      {
        pain: 'Single-operator requirement',
        solution: '100m wireless remote means one operator controls the full move from the safest vantage point.',
      },
    ],
    recommendedProduct: 'scarab-x5',
    keyStat: { value: '4,000 lbs', label: 'through 1m openings' },
  },
  {
    slug: 'mining',
    name: 'Mining & Quarrying',
    shortDescription: 'Heavy-duty relocation of mining plant, conveyor sections, and underground equipment.',
    challengeStatement: 'Underground constraints meet surface-level payloads.',
    heroGradient: 'linear-gradient(135deg, #0a0d10 0%, #1a1510 100%)',
    iconColor: '#6b7280',
    challenges: [
      'Moving mining equipment through 900mm–1.2m tunnel access ways',
      'Replacing worn conveyor drives and pulleys without partial demolition',
      'Operating in classified hazardous zones',
      'Relocation of pump stations and electrical substations',
      'Minimal head height and no overhead crane coverage',
    ],
    traxonSolutions: [
      {
        pain: 'Tunnel and adit access',
        solution: 'Compact footprint and rubber tracks allow operation in tunnels and underground drives where wheeled equipment cannot enter.',
      },
      {
        pain: 'Conveyor maintenance moves',
        solution: 'The Scarab X5 handles full-weight conveyor head drive assemblies, eliminating the need for temporary structures.',
      },
      {
        pain: 'No overhead lift points',
        solution: 'Self-loading with platform height of 160mm loaded — pairs with existing ground-level jacking and skidding processes.',
      },
      {
        pain: 'Remote operation safety',
        solution: '100m wireless remote keeps operators clear of pinch points and hazardous material paths during the entire move.',
      },
    ],
    recommendedProduct: 'scarab-x5',
    keyStat: { value: '4,000 lbs', label: 'underground' },
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Facilities',
    shortDescription: 'Precision repositioning of CNC machines, presses, and production equipment.',
    challengeStatement: 'Production equipment moves with zero floor damage and zero downtime.',
    heroGradient: 'linear-gradient(135deg, #0e1218 0%, #102030 100%)',
    iconColor: '#3b82f6',
    challenges: [
      'Moving 3-tonne CNC machining centres across polished epoxy floors',
      'Repositioning production lines for new model changeover',
      'Installing new presses and plant without disrupting adjacent cells',
      'Working within live facilities with active workforce',
      'Meeting ISO cleanliness requirements during equipment moves',
    ],
    traxonSolutions: [
      {
        pain: 'Floor protection',
        solution: 'Rubber track system distributes load across the full track contact area — maximum ground pressure lower than a standing person.',
      },
      {
        pain: 'Precision placement',
        solution: 'Proportional wireless remote provides millimetre-level creep control for landing heavy machinery on anchor bolt patterns.',
      },
      {
        pain: 'Low ceiling environments',
        solution: '160mm platform height — lowest in class — means clearance remains available for most factory mezzanine structures.',
      },
      {
        pain: 'Clean room and food-grade facilities',
        solution: 'Battery electric, zero-emission. Optional drip tray kit for moves near food production lines or clean-room environments.',
      },
    ],
    recommendedProduct: 'scarab-x5',
    keyStat: { value: '25 min', label: 'average CNC relocation' },
  },
  {
    slug: 'utilities',
    name: 'Utilities & Energy',
    shortDescription: 'Transformer and switchgear installations where cranes and forklifts cannot reach.',
    challengeStatement: 'Critical infrastructure moves — no margin for error.',
    heroGradient: 'linear-gradient(135deg, #0e1218 0%, #0a1a12 100%)',
    iconColor: '#10b981',
    challenges: [
      'Moving 5,000 lbs transformers into existing electrical substations',
      'Installing switchgear in fully energised rooms with no shutdown window',
      'Moving equipment across cable-strewn network operations centres',
      'Precision placement onto transformer pads and cable boxes',
      'Night and weekend moves to minimise supply disruption',
    ],
    traxonSolutions: [
      {
        pain: 'Energised environment restrictions',
        solution: 'Battery-electric — no exhaust, no spark risk. Safe to operate adjacent to live switchgear and transformer bays.',
      },
      {
        pain: 'Sub-station narrow-access bays',
        solution: 'At 980mm, the Scarab X5 enters standard sub-station access doors loaded with 4,000 lbs of transformers.',
      },
      {
        pain: 'Cable floor crossing',
        solution: 'Low track ground pressure and slow creep speed prevent damage to cable trays and protection mat systems.',
      },
      {
        pain: 'Night-shift safety',
        solution: 'LED work lighting kit and reflective safety-yellow track option. Single-operator 100m remote reduces personnel exposure.',
      },
    ],
    recommendedProduct: 'scarab-x5',
    keyStat: { value: '4,000 lbs', label: 'transformer ready' },
  },
  {
    slug: 'events',
    name: 'Events & Production',
    shortDescription: 'Stage equipment, broadcast rigs, and exhibition structures moved fast and clean.',
    challengeStatement: 'Load-in at 2 AM. Showtime at 8 PM. No excuses.',
    heroGradient: 'linear-gradient(135deg, #0e1218 0%, #1a0e20 100%)',
    iconColor: '#a855f7',
    challenges: [
      'Moving 2-tonne LED screen towers through convention centre service corridors',
      'Relocating stage decking systems across polished exhibition floors',
      'Working within strict noise curfews in city-centre venues',
      'Fast turnarounds — multiple venue moves in a single day',
      'Moving rigging and production carts with no forklift access inside halls',
    ],
    traxonSolutions: [
      {
        pain: 'Noise restrictions',
        solution: 'Battery-electric with near-silent operation — safe to use during live broadcast and in early-morning venue access windows.',
      },
      {
        pain: 'Floor protection in finished venues',
        solution: 'Rubber tracks with optional floor protection kit — approved for use on polished concrete, hardwood, and exhibition carpet.',
      },
      {
        pain: 'Narrow service corridors',
        solution: 'Scarab X5 fits service corridors from 700mm wide, covering LED panels, audio equipment, and production carts.',
      },
      {
        pain: 'Fast setup turnaround',
        solution: 'Wireless remote, no setup rigging, and a 2-minute load time means stage moves happen on the crew\'s schedule, not the machine\'s.',
      },
    ],
    recommendedProduct: 'scarab-x5',
    keyStat: { value: '700mm', label: 'minimum corridor' },
  },
  {
    slug: 'shipbuilding',
    name: 'Shipbuilding & Marine',
    shortDescription: 'Engine blocks, shaft assemblies, and hull equipment moved inside vessel sections.',
    challengeStatement: 'Inside a hull, every millimetre matters.',
    heroGradient: 'linear-gradient(135deg, #080a12 0%, #0a1218 100%)',
    iconColor: '#06b6d4',
    challenges: [
      'Moving 5,500 lbs main engine blocks through hull openings before deck closure',
      'Operating on rough steel plate floors with weld seams and drainage camber',
      'Moving shaft and propulsion components through tank-top corridors',
      'Working in confined spaces with low overhead clearance',
      'Coordinating with riggers and crane teams for the final pick-and-place',
    ],
    traxonSolutions: [
      {
        pain: 'Hull access apertures',
        solution: 'The Scarab X5 is designed around the typical engine-room access aperture — 980mm wide, carrying 4,000 lbs through the opening without modification.',
      },
      {
        pain: 'Steel deck surfaces',
        solution: 'Rubber track system grips and traverses steel plate, drip-catching bilge structures, and welded doubler plates without derailing.',
      },
      {
        pain: 'Confined space operations',
        solution: 'Battery electric eliminates CO buildup risk in enclosed hull sections. 160mm platform height preserves headroom.',
      },
      {
        pain: 'Crane handover',
        solution: 'Precise proportional control allows final positioning of engine mounts onto studs within +/-2mm — eliminating secondary jacking.',
      },
    ],
    recommendedProduct: 'scarab-x5',
    keyStat: { value: '4,000 lbs', label: 'engine blocks' },
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
