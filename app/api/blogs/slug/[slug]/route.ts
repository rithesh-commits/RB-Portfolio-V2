import { NextResponse } from 'next/server'
import { getNotionBlogs, mapNotionBlog, getNotionBlogContent } from '@/lib/notion'
import { getLinkPreview } from 'link-preview-js'

// Auto-generate slug from ID + title (same function as in frontend)
const generateSlug = (id: string, title: string): string => {
  const shortId = id.replace(/-/g, '').substring(0, 8);
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 30); // Limit title part length
  return `${shortId}-${titleSlug}`;
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const requestedSlug = params.slug
    
    // Get all blogs and find the one with matching generated slug
    const notionBlogsRaw = await getNotionBlogs()
    const mappedBlogs = notionBlogsRaw.map(mapNotionBlog)
    
    // Find blog by matching generated slug with title
    const blog = mappedBlogs.find(b => {
      const generatedSlug = generateSlug(b.id, b.title)
      return generatedSlug === requestedSlug
    })
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // Fetch the blog content blocks
    const contentBlocks = await getNotionBlogContent(blog.id)
    
    // Enhance bookmark blocks with link previews
    const contentWithPreviews = await Promise.all(
      contentBlocks.map(async (block: any) => {
        const isParagraphLink =
          block.type === 'paragraph' &&
          block.paragraph.rich_text.length === 1 &&
          block.paragraph.rich_text[0]?.href;

        let urlToPreview: string | null = null;
        if (block.type === 'bookmark') {
          urlToPreview = block.bookmark.url;
        } else if (isParagraphLink) {
          urlToPreview = block.paragraph.rich_text[0].href;
        } else if (block.type === 'embed') {
          urlToPreview = block.embed.url;
        }

        if (urlToPreview) {
          try {
            const preview = await getLinkPreview(urlToPreview, {
              headers: {
                'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
              },
              timeout: 5000,
            });
            return { ...block, preview };
          } catch (e) {
            const error = e as Error;
            console.error(
              `Could not get preview for ${urlToPreview}:`,
              error.message
            );
            return { ...block, preview: { error: error.message, url: urlToPreview } };
          }
        }
        return block;
      })
    );
    
    // Return blog with content
    return NextResponse.json({
      ...blog,
      content: contentWithPreviews
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=600', // Cache for 5 minutes client-side, 10 minutes CDN
        'ETag': `"${blog.id}-${Date.now()}"`, // ETag based on blog ID and timestamp
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching Notion blog by slug:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
} 