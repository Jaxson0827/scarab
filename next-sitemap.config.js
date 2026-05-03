/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://traxon.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
    ],
    additionalSitemaps: ['https://traxon.com/sitemap.xml'],
  },

  // Exclude Sanity Studio and API routes
  exclude: ['/studio', '/studio/*', '/api/*'],

  // Per-page priority overrides
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/products': 0.9,
      '/contact': 0.9,
      '/why-traxon': 0.8,
      '/industries': 0.8,
      '/case-studies': 0.75,
      '/dealers': 0.7,
    }

    // Boost individual product pages
    if (path.startsWith('/products/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.85, lastmod: new Date().toISOString() }
    }

    // Boost individual industry pages
    if (path.startsWith('/industries/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.75, lastmod: new Date().toISOString() }
    }

    // Boost case study pages
    if (path.startsWith('/case-studies/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() }
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
