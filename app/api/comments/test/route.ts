import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// Test route to check comments table structure
export async function GET(req: NextRequest) {
  try {
    // First, let's see what columns exist in the comments table
    const { data: columns, error: columnsError } = await supabase
      .from('comments')
      .select('*')
      .limit(1)

    if (columnsError) {
      return NextResponse.json({ 
        error: 'Database connection error', 
        details: columnsError.message 
      }, { status: 500 })
    }

    // Let's also try to get the table structure (this might not work, but worth trying)
    let tableInfo = null
    let tableError = null
    try {
      const { data, error } = await supabase
        .rpc('get_table_columns', { table_name: 'comments' })
      tableInfo = data
      tableError = error
    } catch (rpcError) {
      tableError = 'RPC not available'
    }

    return NextResponse.json({
      message: 'Comments table structure check',
      sampleData: columns,
      tableInfo: tableInfo,
      tableError: tableError,
      note: 'If you see blog_slug instead of blog_post_id, the schema needs to be updated'
    })

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error.message 
    }, { status: 500 })
  }
} 