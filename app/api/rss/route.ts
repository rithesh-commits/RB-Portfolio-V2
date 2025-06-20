import { NextResponse } from 'next/server'
import { getNotionBlogs, mapNotionBlog } from '@/lib/notion'

export async function GET() {
  try {
    const notionBlogsRaw = await getNotionBlogs()
    const mappedBlogs = notionBlogsRaw.map(mapNotionBlog)
    
    // Generate RSS XML
    const rssXml = generateRSSFeed(mappedBlogs)
    
    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return NextResponse.json(
      { error: 'Failed to generate RSS feed' },
      { status: 500 }
    )
  }
}

function generateRSSFeed(blogs: any[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const currentDate = new Date().toUTCString()
  
  const rssItems = blogs.map(blog => {
    const pubDate = new Date(blog.publishedDate).toUTCString()
    const link = `${siteUrl}/blogs/${blog.id}`
    
    return `
      <item>
        <title><![CDATA[${blog.title}]]></title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${blog.summary || blog.excerpt || ''}]]></description>
        <author>${blog.author}</author>
        <category>${blog.category || 'General'}</category>
        ${blog.tags.map((tag: string) => `<category>${tag}</category>`).join('')}
        ${blog.coverImage ? `<enclosure url="${blog.coverImage}" type="image/jpeg" />` : ''}
      </item>
    `
  }).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Ravindar Bejjarapu - Blog</title>
    <link>${siteUrl}/blogs</link>
    <description>Latest thoughts, insights, and learnings from my Notion workspace. Articles on technology, personal development, and more.</description>
    <language>en</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/placeholder-logo.png</url>
      <title>Ravindar Bejjarapu - Blog</title>
      <link>${siteUrl}/blogs</link>
    </image>
    ${rssItems}
  </channel>
</rss>`
} 