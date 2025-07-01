import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// GET: List all blogs
export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

// POST: Create a new blog (admin only)
export async function POST(req: NextRequest) {
  // TODO: Add admin authentication/authorization check
  const body = await req.json()
  // You may want to validate fields here
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([body])
    .select()
    .single()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
} 