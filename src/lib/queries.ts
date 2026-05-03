import { groq } from 'next-sanity'

// ─── Products ──────────────────────────────────────────────────────────────

export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    series,
    tier,
    tagline,
    description,
    specs,
    heroImage,
    images,
    model3dUrl,
    specSheetUrl,
    trackColors,
  }
`

export const PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product"] { "slug": slug.current }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    series,
    tier,
    tagline,
    description,
    specs,
    heroImage,
    images,
    model3dUrl,
    specSheetUrl,
    trackColors,
    hotspots,
    competitors,
    "accessories": accessories[]->{
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      description,
      image,
      category,
      sku,
      leadTimeDays,
    },
    "relatedCaseStudies": relatedCaseStudies[]->{
      _id,
      title,
      "slug": slug.current,
      client,
      industry,
      heroImage,
      metrics,
    },
  }
`

// ─── Case Studies ──────────────────────────────────────────────────────────

export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    industry,
    country,
    heroImage,
    metrics,
    featured,
    publishedAt,
    "productUsed": productUsed->{ name, "slug": slug.current },
  }
`

export const FEATURED_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    client,
    industry,
    country,
    heroImage,
    metrics,
    "productUsed": productUsed->{ name, "slug": slug.current },
  }
`

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    industry,
    country,
    heroImage,
    challenge,
    solution,
    outcome,
    metrics,
    testimonial,
    publishedAt,
    "productUsed": productUsed->{ name, "slug": slug.current, heroImage },
  }
`

// ─── Industries ────────────────────────────────────────────────────────────

export const INDUSTRIES_QUERY = groq`
  *[_type == "industry"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    heroImage,
    iconSvg,
    challengeStatement,
    challenges,
    solutions,
    "recommendedProduct": recommendedProduct->{ name, "slug": slug.current },
  }
`

// ─── Dealers ───────────────────────────────────────────────────────────────

export const DEALERS_QUERY = groq`
  *[_type == "dealer" && active == true] | order(country asc, city asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    country,
    state,
    city,
    address,
    lat,
    lng,
    phone,
    email,
    website,
    types,
    "products": products[]->{ name, "slug": slug.current },
  }
`

// ─── Site Settings ─────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    metaDescription,
    ogImage,
    ctaPhoneNumber,
    ctaEmail,
    address,
    socialLinks,
    announcementBar,
  }
`
