// RB Portfolio V2 - Custom CMS Database Utilities

import { supabase } from '@/lib/supabaseClient'
import type { BlogPost, DashboardStats, RecentActivity } from '@/types/cms'

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get blog posts count
    const { count: totalBlogPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    // Get published and draft counts
    const { count: publishedPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    const { count: draftPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft')

    const { count: scheduledPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'scheduled')

    // Get stories count
    const { count: totalStories } = await supabase
      .from('stories')
      .select('*', { count: 'exact', head: true })

    // Get novels count
    const { count: totalNovels } = await supabase
      .from('novels')
      .select('*', { count: 'exact', head: true })

    // Get poems count (assuming they're in blog_posts with a category)
    const { count: totalPoems } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'poem')

    // Get pending comments count
    const { count: pendingComments } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // Get recent activity (last 5 blog posts and comments)
    const { data: recentBlogPosts } = await supabase
      .from('blog_posts')
      .select('id, title, status, created_at, updated_at')
      .order('updated_at', { ascending: false })
      .limit(3)

    const { data: recentComments } = await supabase
      .from('comments')
      .select('id, content, status, created_at, blog_post_id')
      .order('created_at', { ascending: false })
      .limit(2)

    // Transform recent activity
    const recentActivity: RecentActivity[] = []

    // Add recent blog posts
    recentBlogPosts?.forEach(post => {
      recentActivity.push({
        type: 'blog_post',
        title: post.title,
        action: post.status === 'published' ? 'published' : 'updated',
        timestamp: post.updated_at
      })
    })

    // Add recent comments
    recentComments?.forEach(comment => {
      recentActivity.push({
        type: 'comment',
        title: `Comment: ${comment.content.substring(0, 50)}...`,
        action: 'created',
        timestamp: comment.created_at
      })
    })

    // Sort by timestamp
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Mock subscriber count for now (can be replaced with real newsletter subscribers)
    const totalSubscribers = 150

    return {
      total_blog_posts: totalBlogPosts || 0,
      total_stories: totalStories || 0,
      total_novels: totalNovels || 0,
      total_poems: totalPoems || 0,
      draft_posts: draftPosts || 0,
      published_posts: publishedPosts || 0,
      scheduled_posts: scheduledPosts || 0,
      pending_comments: pendingComments || 0,
      total_subscribers: totalSubscribers,
      recent_activity: recentActivity.slice(0, 5) // Limit to 5 most recent
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Return default values if there's an error
    return {
      total_blog_posts: 0,
      total_stories: 0,
      total_novels: 0,
      total_poems: 0,
      draft_posts: 0,
      published_posts: 0,
      scheduled_posts: 0,
      pending_comments: 0,
      total_subscribers: 0,
      recent_activity: []
    }
  }
} 