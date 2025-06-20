import { NextResponse } from 'next/server'
import { getNotionBlogs, mapNotionBlog } from '@/lib/notion'

export async function GET() {
  try {
    const notionBlogsRaw = await getNotionBlogs()
    const mappedBlogs = notionBlogsRaw.map(mapNotionBlog)
    
    // Generate sitemap XML
    const sitemapXml = generateSitemap(mappedBlogs)
    
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    )
  }
}

function generateSitemap(blogs: any[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const currentDate = new Date().toISOString()
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/blogs', priority: '0.9', changefreq: 'daily' },
    { url: '/stories', priority: '0.8', changefreq: 'weekly' },
    { url: '/novels', priority: '0.8', changefreq: 'weekly' },
  ]
  
  const staticUrls = staticPages.map(page => `
    <url>
      <loc>${siteUrl}${page.url}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')
  
  // Blog post URLs
  const blogUrls = blogs.map(blog => {
    const pubDate = new Date(blog.publishedDate).toISOString()
    return `
    <url>
      <loc>${siteUrl}/blogs/${blog.id}</loc>
      <lastmod>${pubDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `
  }).join('')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${blogUrls}
</urlset>`
} 