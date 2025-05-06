import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://www.brightparagon.me/',
    sitemap: 'https://www.brightparagon.me/sitemap.xml',
  }
}
