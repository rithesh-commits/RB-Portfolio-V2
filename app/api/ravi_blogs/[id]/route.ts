import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// GET: Fetch a single blog by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Blog not found' }, { status: 404 })
  }
  return NextResponse.json(data)
}

// PATCH: Update a blog (admin only)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Add admin authentication/authorization check
  const { id } = params
  const body = await req.json()
  const { data, error } = await supabase
    .from('blog_posts')
    .update(body)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

// DELETE: Delete a blog (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Add admin authentication/authorization check
  const { id } = params
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
} 