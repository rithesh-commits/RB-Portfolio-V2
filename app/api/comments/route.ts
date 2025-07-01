import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// GET: Fetch comments for a blog post (optionally filter by status)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const blog_post_id = searchParams.get('blog_post_id')
  const status = searchParams.get('status') || 'approved'
  if (!blog_post_id) {
    return NextResponse.json({ error: 'Missing blog_post_id' }, { status: 400 })
  }

  const query = supabase
    .from('comments')
    .select('*')
    .eq('blog_post_id', blog_post_id)
    .eq('status', status)
    .order('created_at', { ascending: true })

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comments: data })
}

// POST: Submit a new comment
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { blog_post_id, author_name, author_email, comment_text, subscribes_to_newsletter, parent_comment_id } = body

  if (!blog_post_id || !author_name || !author_email || !comment_text) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        blog_post_id,
        author_name,
        author_email,
        comment_text,
        subscribes_to_newsletter: !!subscribes_to_newsletter,
        parent_comment_id: parent_comment_id || null,
        status: 'approved', // Default as per your request
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comment: data })
}

// PATCH: Admin moderation (approve/reject/edit comment)
export async function PATCH(req: NextRequest) {
  // TODO: Add admin authentication/authorization check here
  const body = await req.json()
  const { id, status, comment_text } = body
  if (!id) {
    return NextResponse.json({ error: 'Missing comment id' }, { status: 400 })
  }
  const updateFields: any = {}
  if (status) updateFields.status = status
  if (comment_text) updateFields.comment_text = comment_text

  const { data, error } = await supabase
    .from('comments')
    .update(updateFields)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comment: data })
}

// DELETE: Admin delete comment
export async function DELETE(req: NextRequest) {
  // TODO: Add admin authentication/authorization check here
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Missing comment id' }, { status: 400 })
  }
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
} 