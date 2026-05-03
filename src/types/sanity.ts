// ─── Shared ────────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// ─── Product ───────────────────────────────────────────────────────────────

export interface SanityProductSpecs {
  payload?: number
  width?: number
  weight?: number
  battery?: number
  speed?: number
  height?: number
  gradient?: number
  hasWirelessRemote?: boolean
}

export interface SanityTrackColor {
  name: string
  hex: string
}

export interface SanityHotspot {
  id: string
  label: string
  description: string
  x: number
  y: number
}

export interface SanityCompetitor {
  name: string
  payload?: number
  width?: number
  speed?: number
  gradient?: number
  price?: string
}

export interface SanityAccessoryReference {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  description?: string
  image?: SanityImage
  category?: string
  sku?: string
  leadTimeDays?: number
}

export interface SanityCaseStudyReference {
  _id: string
  title: string
  slug: string
  client?: string
  industry?: string
  heroImage?: SanityImage
  metrics?: Array<{ value: string; unit?: string; label: string }>
}

export interface SanityProduct {
  _id: string
  name: string
  slug: string
  series?: string
  tier?: 'flagship' | 'mid' | 'entry'
  tagline?: string
  description?: string
  specs?: SanityProductSpecs
  heroImage?: SanityImage
  images?: SanityImage[]
  model3dUrl?: string
  specSheetUrl?: string
  trackColors?: SanityTrackColor[]
  hotspots?: SanityHotspot[]
  competitors?: SanityCompetitor[]
  accessories?: SanityAccessoryReference[]
  relatedCaseStudies?: SanityCaseStudyReference[]
}

// ─── Case Study ────────────────────────────────────────────────────────────

export interface SanityCaseStudy {
  _id: string
  title: string
  slug: string
  client?: string
  industry?: string
  country?: string
  heroImage?: SanityImage
  challenge?: string
  solution?: string
  outcome?: string
  metrics?: Array<{ value: string; unit?: string; label: string }>
  testimonial?: {
    quote?: string
    name?: string
    title?: string
    company?: string
  }
  publishedAt?: string
  featured?: boolean
  productUsed?: { name: string; slug: string }
}

// ─── Industry ──────────────────────────────────────────────────────────────

export interface SanityIndustry {
  _id: string
  name: string
  slug: string
  heroImage?: SanityImage
  iconSvg?: string
  challengeStatement?: string
  challenges?: string[]
  solutions?: string[]
  recommendedProduct?: { name: string; slug: string }
}

// ─── Dealer ────────────────────────────────────────────────────────────────

export interface SanityDealer {
  _id: string
  name: string
  slug: string
  logo?: SanityImage
  country?: string
  state?: string
  city?: string
  address?: string
  lat?: number
  lng?: number
  phone?: string
  email?: string
  website?: string
  types?: {
    isDistributor?: boolean
    isService?: boolean
    isRental?: boolean
  }
  products?: Array<{ name: string; slug: string }>
}

// ─── Site Settings ─────────────────────────────────────────────────────────

export interface SanitySiteSettings {
  siteTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  ctaPhoneNumber?: string
  ctaEmail?: string
  address?: string
  socialLinks?: {
    linkedin?: string
    youtube?: string
    instagram?: string
  }
  announcementBar?: {
    enabled?: boolean
    message?: string
    linkText?: string
    linkUrl?: string
  }
}
