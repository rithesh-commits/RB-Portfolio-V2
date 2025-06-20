import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// GET: Fetch approved comments for a blog post
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const blog_slug = searchParams.get('blog_slug')
  if (!blog_slug) {
    return NextResponse.json({ error: 'Missing blog_slug' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('blog_slug', blog_slug)
    .eq('is_approved', true)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comments: data })
}

// POST: Submit a new comment
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { blog_slug, author_name, author_email, comment_text, subscribes_to_newsletter, parent_id } = body

  if (!blog_slug || !author_name || !author_email || !comment_text) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        blog_slug,
        author_name,
        author_email,
        comment_text,
        subscribes_to_newsletter: !!subscribes_to_newsletter,
        parent_id: parent_id || null,
        is_approved: true, // All new comments are approved by default
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comment: data })
} 