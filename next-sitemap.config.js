/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bottlecode.app',
  generateRobotsTxt: false, // We have custom robots.txt
  outDir: './public',
  
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  
  // Additional paths
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/en'),
    await config.transform(config, '/ru'),
    await config.transform(config, '/about'),
    await config.transform(config, '/en/about'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/en/pricing'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/en/blog'),
    await config.transform(config, '/docs'),
    await config.transform(config, '/en/docs'),
  ],
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/email-preview', '/_next/', '/admin/', '/private/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bottlecode.app'}/sitemap.xml`,
    ],
  },
  
  exclude: ['/api/*', '/email-preview', '/_next/*', '/admin/*', '/private/*'],
  priority: 0.7,
  changefreq: 'weekly',
  autoLastmod: true,
}
