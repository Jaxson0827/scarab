export interface ProductSpecs {
  payload: number        // kg
  width: number          // mm
  weight: number         // kg (machine weight)
  battery: number        // Ah
  speed: number          // km/h
  height: number         // mm (lowered deck height)
  gradient: number       // degrees
  hasWirelessRemote: boolean
}

export interface Hotspot {
  position: [number, number, number]
  label: string
  description: string
}

export interface Accessory {
  id: string
  name: string
  shortDescription: string
  description: string
  imageUrl?: string
  compatibleWith: string[]  // product slugs
}

export interface CompetitorSpec {
  name: string
  payload: number
  width: number
  battery: number
  gradient: number
  hasRotation: boolean
}

export interface Product {
  name: string
  slug: string
  series: string
  tier: 'flagship' | 'mid' | 'entry'
  tagline: string
  description: string
  specs: ProductSpecs
  heroImageUrl?: string
  images: string[]
  model3dUrl?: string
  specSheetUrl?: string
  hotspots?: Hotspot[]
  competitorComparison?: CompetitorSpec
}
