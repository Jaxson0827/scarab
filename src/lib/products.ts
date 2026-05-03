import type { Product, Accessory } from '@/types/product'

export const ACCESSORIES: Accessory[] = [
  {
    id: 'extended-remote',
    name: 'Extended Range Remote',
    shortDescription: '100m wireless range',
    description:
      'Extended wireless remote with 100m operating range. Full proportional control with display feedback. Ideal for long-run corridor moves and multi-operator sites.',
    compatibleWith: ['scarab-x5'],
  },
  {
    id: 'low-profile-deck',
    name: 'Low-Profile Deck Insert',
    shortDescription: 'Reduces deck height by 65mm',
    description:
      'Drop-in deck insert reduces overall machine height by 65mm for moves in environments with extremely tight vertical clearance.',
    compatibleWith: ['scarab-x5'],
  },
  {
    id: 'side-guide-rails',
    name: 'Side Guide Rail Kit',
    shortDescription: 'Adjustable load containment rails',
    description:
      'Bolt-on adjustable side guide rails for secure load containment on loose or irregular loads. Adjustable from 200–900mm. Removes without tools.',
    compatibleWith: ['scarab-x5'],
  },
  {
    id: 'hydraulic-ramps',
    name: 'Hydraulic Loading Ramps',
    shortDescription: 'Self-levelling approach ramps',
    description:
      'Hydraulic self-levelling approach ramps for loading the carrier onto truck beds and loading docks. Rated to full machine payload. Includes storage brackets.',
    compatibleWith: ['scarab-x5'],
  },
  {
    id: 'rotation-motor',
    name: 'Platform Rotation Motor',
    shortDescription: '360° powered platform rotation',
    description:
      '360° powered platform rotation controlled from the main remote. Allows precise load positioning without secondary lifting equipment. Included standard on Scarab X5.',
    compatibleWith: ['scarab-x5'],
  },
  {
    id: 'aux-power-cable',
    name: '48V Auxiliary Power Kit',
    shortDescription: 'Powers external tools from the machine',
    description:
      '48V auxiliary power output kit. Powers external tools, hoists, and powered attachments directly from the Scarab X5 battery system. Includes 5m cable and connector set.',
    compatibleWith: ['scarab-x5'],
  },
]

export const PRODUCTS: Product[] = [
  {
    name: 'Scarab X5',
    slug: 'scarab-x5',
    series: 'SCARAB',
    tier: 'flagship',
    tagline: 'The highest-payload tracked carrier in its class.',
    description:
      'The Scarab X5 redefines what is possible in confined-space heavy transport. 4,000 lbs payload through a 1,000mm corridor. 50% more than the nearest competitor. 45° max gradient, 280Ah full-shift battery, full-display proportional remote with real-time gradient and load monitoring. Platform rotation standard. Built in the USA.',
    specs: {
      payload: 4000,
      width: 1000,
      weight: 970,
      battery: 280,
      speed: 2.0,
      height: 245,
      gradient: 45,
      hasWirelessRemote: true,
    },
    images: [],
    hotspots: [
      {
        position: [0, 1.6, 1.2],
        label: 'Battery Pack',
        description: '280Ah Li-Ion — engineered for 8+ hour continuous operation. 40% more capacity than the Aconda 4000 PRO.',
      },
      {
        position: [-1.5, 0.4, 0],
        label: 'Track System',
        description: '1,000mm precision rubber tracks. Non-marking grey option available. Full-width load distribution.',
      },
      {
        position: [1.2, 1.2, 0.8],
        label: 'Remote Receiver',
        description: 'Quad-antenna 2.4GHz receiver. 100m operating range with full-duplex telemetry feedback.',
      },
      {
        position: [0, 0.2, 1.5],
        label: 'Gradient Sensor',
        description: 'Real-time 3-axis gradient monitoring. Audible and visual alert at 80% of rated max gradient.',
      },
      {
        position: [0.8, 0.5, -1],
        label: 'Platform Rotation Motor',
        description: '360° powered rotation — standard on all Scarab X5 units. Remote-controlled. 0.5 RPM continuous.',
      },
    ],
    competitorComparison: {
      name: 'Aconda 4000 PRO',
      payload: 4000,
      width: 1000,
      battery: 200,
      gradient: 45,
      hasRotation: false,
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getAccessoriesForProduct(slug: string): Accessory[] {
  return ACCESSORIES.filter((a) => a.compatibleWith.includes(slug))
}
