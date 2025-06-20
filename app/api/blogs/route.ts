import { NextResponse } from 'next/server'
import { getNotionBlogs, mapNotionBlog } from '@/lib/notion'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const exclude = searchParams.get('exclude')
    
    const notionBlogsRaw = await getNotionBlogs()
    let mappedBlogs = notionBlogsRaw.map(mapNotionBlog)
    
    // Filter by category if specified
    if (category) {
      mappedBlogs = mappedBlogs.filter(blog => blog.category === category)
    }
    
    // Exclude specific blog if specified
    if (exclude) {
      mappedBlogs = mappedBlogs.filter(blog => blog.id !== exclude)
    }
    
    return NextResponse.json(mappedBlogs, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=600', // Cache for 5 minutes client-side, 10 minutes CDN
        'ETag': `"${Date.now()}"`, // Simple ETag for cache validation
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching Notion blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
} 