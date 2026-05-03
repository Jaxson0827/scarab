export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  slug: string
  title: string
  client: string
  industry: 'construction' | 'mining' | 'manufacturing' | 'utilities' | 'events' | 'shipbuilding'
  country: string
  headline: string
  challenge: string
  solution: string
  outcome: string
  metrics: CaseStudyMetric[]
  testimonial: {
    quote: string
    name: string
    title: string
    company: string
  }
  productSlug: string
  featured: boolean
  publishedAt: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'transformer-substation-houston',
    title: '5,800 kg Transformer Installation — Houston Substation',
    client: 'Enertek Grid Services',
    industry: 'utilities',
    country: 'USA',
    headline: 'A transformer that took 6 weeks to plan took 4 hours to move.',
    challenge:
      'A major Houston transmission substation required replacement of a failed 5,800 kg power transformer. The transformer bay access was 990mm wide — too narrow for any conventional wheeled solution. The work had to be completed during a 6-hour maintenance window to avoid extended supply outages to 40,000 customers.',
    solution:
      'Traxon deployed a Scarab X5 with the extended-range wireless remote. The transformer was lifted onto the carrier deck via gantry outside the sub-station, then moved through the access door and positioned onto the transformer pad in a single continuous operation. No secondary jacking or temporary works were required.',
    outcome:
      'The transformer was installed and energised within the 6-hour maintenance window. The client saved an estimated $220,000 in temporary supply costs by avoiding a 3-day outage. Full crew of 2 operators — down from the 8-person crew originally planned for a hydraulic skidding solution.',
    metrics: [
      { value: '4 hrs', label: 'total move time' },
      { value: '5,800 lbs', label: 'transformer weight' },
      { value: '2', label: 'crew required' },
    ],
    testimonial: {
      quote:
        "We'd planned a 3-day outage window. Traxon cut it to 4 hours. I genuinely didn't believe it was possible until I watched it happen.",
      name: 'Marcus Webb',
      title: 'Senior Project Engineer',
      company: 'Enertek Grid Services',
    },
    productSlug: 'scarab-x5',
    featured: true,
    publishedAt: '2024-09-15',
  },
  {
    slug: 'cnc-machining-centre-toronto',
    title: '3,400 lbs CNC Relocation — Toronto Aerospace Facility',
    client: 'Apex Precision Manufacturing',
    industry: 'manufacturing',
    country: 'Canada',
    headline: 'Production line reconfiguration completed over a single weekend.',
    challenge:
      'An aerospace precision machining facility in Toronto needed to relocate 12 CNC machining centres — ranging from 800 lbs to 3,400 lbs — to a new production cell layout. The facility had polished epoxy floors, active manufacturing in adjacent cells, and a 54-hour weekend window to complete the entire move without damaging any machines or flooring.',
    solution:
      'Two Scarab X5 units operated simultaneously by a 4-person crew. The precision wireless remote was used for final positioning, landing each machine within 2mm of anchor bolt patterns. Floor protection matting was used at the single threshold crossing point.',
    outcome:
      'All 12 machines relocated and re-anchored in 48 hours. Production resumed Monday morning as scheduled. Zero floor damage. Zero machine damage. The client avoided a 3-week conventional relocation timeline and $180,000 in specialist rigging contractor costs.',
    metrics: [
      { value: '12', label: 'machines relocated' },
      { value: '48 hrs', label: 'total elapsed time' },
      { value: '0', label: 'floor damage incidents' },
    ],
    testimonial: {
      quote:
        "Our rigging contractor quoted us 3 weeks and $180k. Traxon did the whole thing in a weekend. The floor is immaculate.",
      name: 'Jennifer Park',
      title: 'Facilities Manager',
      company: 'Apex Precision Manufacturing',
    },
    productSlug: 'scarab-x5',
    featured: true,
    publishedAt: '2024-07-22',
  },
  {
    slug: 'engine-block-gdansk-shipyard',
    title: '5,200 lbs Main Engine Installation — Gdańsk Shipyard',
    client: 'Baltic Marine Works',
    industry: 'shipbuilding',
    country: 'Poland',
    headline: 'Engine installed before hull closure. Schedule held.',
    challenge:
      'Baltic Marine Works was constructing a series of research vessels and needed to install 5,200 lbs main engine assemblies before upper deck sections were welded in place. The engine room access aperture measured 1,010mm — standard for the vessel class. Conventional hydraulic skidding would have required 4 days per vessel, creating a critical path constraint.',
    solution:
      'The Scarab X5 was used to transport each engine assembly from the build hall to the access aperture, then through the hull opening and onto the engine mounts. The entire move was done in one continuous pass with no secondary handling. The proportional remote allowed millimetre-accurate final placement onto mounting studs.',
    outcome:
      'Engine installation time reduced from 4 days to 6 hours per vessel. The client completed the 4-vessel series on schedule, avoiding $340,000 in delay penalties. The approach has now been adopted as standard procedure for the next build series.',
    metrics: [
      { value: '6 hrs', label: 'per engine install' },
      { value: '4×', label: 'faster than skidding' },
      { value: '$340k', label: 'delay penalties avoided' },
    ],
    testimonial: {
      quote:
        'Every hour inside a hull is expensive. Traxon turned a 4-day critical-path item into a morning\'s work.',
      name: 'Tomasz Kowalski',
      title: 'Head of Mechanical Installation',
      company: 'Baltic Marine Works',
    },
    productSlug: 'scarab-x5',
    featured: true,
    publishedAt: '2024-05-10',
  },
  {
    slug: 'underground-conveyor-kalgoorlie',
    title: 'Underground Conveyor Drive Replacement — Kalgoorlie',
    client: 'Goldfields Resource Partners',
    industry: 'mining',
    country: 'Australia',
    headline: 'Conveyor drive replaced without partial excavation. First time ever.',
    challenge:
      'A major gold mine near Kalgoorlie needed to replace a 2,800 lbs underground conveyor head-drive assembly on a level 340 metres below surface. The drive access road was 1.1m wide. Previously, this type of replacement required partial re-excavation of the access road — a 6-week programme — because no equipment could reach the drive in its installed position.',
    solution:
      'A Scarab X5 was lowered to the underground level in components and assembled on-site. The drive assembly was lifted onto the carrier using a portable A-frame gantry and transported through the access road in a single pass. The return journey was made with the failed drive for surface refurbishment.',
    outcome:
      'The replacement was completed in 11 hours from start to energisation — versus the 6-week re-excavation alternative. The mine maintained production through the replacement, saving an estimated 22,000 oz gold production. The Scarab X5 remains on-site for ongoing maintenance.',
    metrics: [
      { value: '11 hrs', label: 'vs 6-week alternative' },
      { value: '340m', label: 'below surface' },
      { value: '22,000oz', label: 'production maintained' },
    ],
    testimonial: {
      quote:
        "We\'ve been trying to solve this access problem for 8 years. Traxon solved it in one afternoon.",
      name: 'Dean Stafford',
      title: 'Underground Maintenance Superintendent',
      company: 'Goldfields Resource Partners',
    },
    productSlug: 'scarab-x5',
    featured: false,
    publishedAt: '2024-03-18',
  },
  {
    slug: 'led-wall-o2-arena',
    title: 'LED Wall Deployment — The O2 Arena, London',
    client: 'Luminex Production Services',
    industry: 'events',
    country: 'UK',
    headline: 'Full arena load-in. One night. One operator.',
    challenge:
      "A headline concert tour needed to move 24 LED screen tower sections — each weighing 900 lbs — from the O2's service bays through the venue's 850mm backstage corridors to the arena floor. Load-in window: 11 PM to 7 AM. The venue's strict noise policy meant no diesel equipment inside the building after midnight.",
    solution:
      'Two Scarab X5 units operated by a single crew of 3. The quiet battery-electric operation meant moves continued through the entire night window without noise violation. Each tower section was moved from the loading bay to its pre-marked arena position in a single pass.',
    outcome:
      "All 24 sections in position by 5:30 AM — 90 minutes ahead of the crew's schedule. The tour production manager has since specified the Scarab X5 as the preferred equipment for all 34 arena dates on the tour.",
    metrics: [
      { value: '24', label: 'sections moved' },
      { value: '5:30 AM', label: 'done — 1.5hrs early' },
      { value: '34', label: 'arena dates specified' },
    ],
    testimonial: {
      quote:
        'Silent, fast, and it fits in the corridors. The Scarab X5 is now in our rider for every arena date.',
      name: 'Sarah Llewellyn',
      title: 'Tour Production Manager',
      company: 'Luminex Production Services',
    },
    productSlug: 'scarab-x5',
    featured: false,
    publishedAt: '2024-01-30',
  },
  {
    slug: 'precast-stairwells-sydney',
    title: 'Precast Stairwell Installation — Sydney CBD High-Rise',
    client: 'Meridian Construction Group',
    industry: 'construction',
    country: 'Australia',
    headline: 'Precast stairwells installed on floors 12–18. No crane modifications required.',
    challenge:
      'A 32-floor residential tower in Sydney CBD required installation of precast concrete stairwell sections on floors 12–18. Each section weighed 4,200 lbs. Tower crane reach was insufficient and the floor plates were fully poured — no crane access ports. The stairwell openings measured 920mm.',
    solution:
      'The Scarab X5 transported each precast section from the tower crane landing point at the building perimeter, through the floor plate via the stairwell opening, to the installation position. The 360° platform rotation motor was used to orient each section before final lowering.',
    outcome:
      'All 18 stairwell sections installed over 6 working days. The crane programme was shortened by 4 days as sections were removed from the crane lift path immediately on landing. Client reported zero concrete chipping incidents during moves.',
    metrics: [
      { value: '4,200 lbs', label: 'precast sections' },
      { value: '18', label: 'sections installed' },
      { value: '4 days', label: 'crane programme saved' },
    ],
    testimonial: {
      quote:
        "This would have been a major programme risk without Traxon. The 920mm openings were the constraint and the Scarab X5 solved it exactly.",
      name: 'Chris Nkrumah',
      title: 'Project Manager',
      company: 'Meridian Construction Group',
    },
    productSlug: 'scarab-x5',
    featured: false,
    publishedAt: '2023-11-05',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.featured)
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.industry === industry)
}
