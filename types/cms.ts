// RB Portfolio V2 - Custom CMS TypeScript Types

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'scheduled';
  created_at: string;
  updated_at: string;
  published_at?: string;
  author_id?: string;
  tags?: string[];
  category?: string;
}

export interface RecentActivity {
  type: 'blog_post' | 'story' | 'novel' | 'poem' | 'comment';
  title: string;
  action: 'created' | 'updated' | 'published' | 'deleted';
  timestamp: string;
}

export interface DashboardStats {
  total_blog_posts: number;
  total_stories: number;
  total_novels: number;
  total_poems: number;
  draft_posts: number;
  published_posts: number;
  scheduled_posts: number;
  pending_comments: number;
  total_subscribers: number;
  recent_activity: RecentActivity[];
}
