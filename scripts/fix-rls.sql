-- Fix RLS Policies for blog_posts table
-- Run this in your Supabase SQL editor

-- 1. Enable RLS on blog_posts table (if not already enabled)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Admin full access on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public read published blog_posts" ON blog_posts;

-- 3. Create admin policy (full access for authenticated users)
CREATE POLICY "Admin full access on blog_posts" ON blog_posts
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 4. Create public read policy (only published posts for anonymous users)
CREATE POLICY "Public read published blog_posts" ON blog_posts
    FOR SELECT USING (status = 'published');

-- 5. Test the policies
-- This should return published posts for anonymous users
SELECT id, title_en, status, published_at 
FROM blog_posts 
WHERE status = 'published' 
ORDER BY published_at DESC 
LIMIT 5;

-- 6. Check if there are any published posts
SELECT COUNT(*) as total_posts, 
       COUNT(*) FILTER (WHERE status = 'published') as published_posts,
       COUNT(*) FILTER (WHERE status = 'draft') as draft_posts
FROM blog_posts; 