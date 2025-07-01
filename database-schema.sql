-- RB Portfolio V2 - Custom CMS Database Schema
-- This file contains all the database tables needed for the custom CMS

-- Enable Row Level Security (RLS) on all tables
-- This ensures only authenticated admin users can modify content

-- =====================================================
-- 1. PAGES TABLE (Homepage, About, Contact)
-- =====================================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL, -- 'homepage', 'about', 'contact'
    title_en TEXT NOT NULL,
    title_te TEXT NOT NULL,
    content_en TEXT,
    content_te TEXT,
    meta_title_en VARCHAR(255),
    meta_title_te VARCHAR(255),
    meta_description_en TEXT,
    meta_description_te TEXT,
    meta_keywords_en TEXT,
    meta_keywords_te TEXT,
    og_image_url TEXT,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 2. BLOG POSTS TABLE (Migrate from Notion structure)
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_te TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary_en TEXT,
    summary_te TEXT,
    excerpt_en TEXT,
    excerpt_te TEXT,
    content_en TEXT NOT NULL,
    content_te TEXT NOT NULL,
    cover_image_url TEXT,
    category_id UUID REFERENCES categories(id),
    author_en VARCHAR(255) DEFAULT 'Ravindar Bejjarapu',
    author_te VARCHAR(255) DEFAULT 'రవీందర్ బేజ్జరాపు',
    reading_time_minutes INTEGER DEFAULT 5,
    tags TEXT[], -- Array of tag names
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    meta_title_en VARCHAR(255),
    meta_title_te VARCHAR(255),
    meta_description_en TEXT,
    meta_description_te TEXT,
    meta_keywords_en TEXT,
    meta_keywords_te TEXT,
    og_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 3. STORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_te TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary_en TEXT,
    summary_te TEXT,
    content_en TEXT NOT NULL,
    content_te TEXT NOT NULL,
    cover_image_url TEXT,
    category_id UUID REFERENCES categories(id),
    author_en VARCHAR(255) DEFAULT 'Ravindar Bejjarapu',
    author_te VARCHAR(255) DEFAULT 'రవీందర్ బేజ్జరాపు',
    reading_time_minutes INTEGER DEFAULT 10,
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    meta_title_en VARCHAR(255),
    meta_title_te VARCHAR(255),
    meta_description_en TEXT,
    meta_description_te TEXT,
    meta_keywords_en TEXT,
    meta_keywords_te TEXT,
    og_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 4. NOVELS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS novels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_te TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary_en TEXT,
    summary_te TEXT,
    content_en TEXT NOT NULL,
    content_te TEXT NOT NULL,
    cover_image_url TEXT,
    category_id UUID REFERENCES categories(id),
    author_en VARCHAR(255) DEFAULT 'Ravindar Bejjarapu',
    author_te VARCHAR(255) DEFAULT 'రవీందర్ బేజ్జరాపు',
    reading_time_minutes INTEGER DEFAULT 30,
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    meta_title_en VARCHAR(255),
    meta_title_te VARCHAR(255),
    meta_description_en TEXT,
    meta_description_te TEXT,
    meta_keywords_en TEXT,
    meta_keywords_te TEXT,
    og_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 5. POEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS poems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_te TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary_en TEXT,
    summary_te TEXT,
    content_en TEXT NOT NULL,
    content_te TEXT NOT NULL,
    cover_image_url TEXT,
    category_id UUID REFERENCES categories(id),
    author_en VARCHAR(255) DEFAULT 'Ravindar Bejjarapu',
    author_te VARCHAR(255) DEFAULT 'రవీందర్ బేజ్జరాపు',
    reading_time_minutes INTEGER DEFAULT 3,
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    meta_title_en VARCHAR(255),
    meta_title_te VARCHAR(255),
    meta_description_en TEXT,
    meta_description_te TEXT,
    meta_keywords_en TEXT,
    meta_keywords_te TEXT,
    og_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 6. CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_te VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT,
    description_te TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color for UI
    icon VARCHAR(50), -- Icon name for UI
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 7. MEDIA TABLE (File Management)
-- =====================================================
CREATE TABLE IF NOT EXISTS media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    width INTEGER, -- For images
    height INTEGER, -- For images
    alt_text_en VARCHAR(255),
    alt_text_te VARCHAR(255),
    caption_en TEXT,
    caption_te TEXT,
    tags TEXT[],
    usage_count INTEGER DEFAULT 0, -- Track how many times used
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 8. SUBSCRIBERS TABLE (Newsletter)
-- =====================================================
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name_en VARCHAR(255),
    name_te VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'pending')),
    source VARCHAR(50) DEFAULT 'website', -- 'website', 'comment_form', 'admin'
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. COMMENTS TABLE (Enhanced from existing)
-- =====================================================
-- Note: This table already exists, but we'll add admin-specific fields and blog-only support
ALTER TABLE IF EXISTS comments ADD COLUMN IF NOT EXISTS blog_post_id UUID REFERENCES blog_posts(id) NOT NULL;
ALTER TABLE IF EXISTS comments ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected'));
ALTER TABLE IF EXISTS comments ADD COLUMN IF NOT EXISTS parent_comment_id UUID REFERENCES comments(id);
ALTER TABLE IF EXISTS comments ADD COLUMN IF NOT EXISTS is_admin_comment BOOLEAN DEFAULT false;
ALTER TABLE IF EXISTS comments ADD COLUMN IF NOT EXISTS admin_user_id UUID REFERENCES auth.users(id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Stories indexes
CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories(slug);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_published_at ON stories(published_at);
CREATE INDEX IF NOT EXISTS idx_stories_category_id ON stories(category_id);

-- Novels indexes
CREATE INDEX IF NOT EXISTS idx_novels_slug ON novels(slug);
CREATE INDEX IF NOT EXISTS idx_novels_status ON novels(status);
CREATE INDEX IF NOT EXISTS idx_novels_published_at ON novels(published_at);
CREATE INDEX IF NOT EXISTS idx_novels_category_id ON novels(category_id);

-- Poems indexes
CREATE INDEX IF NOT EXISTS idx_poems_slug ON poems(slug);
CREATE INDEX IF NOT EXISTS idx_poems_status ON poems(status);
CREATE INDEX IF NOT EXISTS idx_poems_published_at ON poems(published_at);
CREATE INDEX IF NOT EXISTS idx_poems_category_id ON poems(category_id);

-- Pages indexes
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);

-- Media indexes
CREATE INDEX IF NOT EXISTS idx_media_filename ON media(filename);
CREATE INDEX IF NOT EXISTS idx_media_mime_type ON media(mime_type);
CREATE INDEX IF NOT EXISTS idx_media_created_by ON media(created_by);

-- Subscribers indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Admin policies (full access for authenticated admin users)
CREATE POLICY "Admin full access on pages" ON pages
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on blog_posts" ON blog_posts
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on stories" ON stories
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on novels" ON novels
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on poems" ON poems
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on categories" ON categories
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on media" ON media
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access on subscribers" ON subscribers
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Public read policies (only published content)
CREATE POLICY "Public read published pages" ON pages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published blog_posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published stories" ON stories
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published novels" ON novels
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published poems" ON poems
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Public read media" ON media
    FOR SELECT USING (true);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_novels_updated_at BEFORE UPDATE ON novels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_poems_updated_at BEFORE UPDATE ON poems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA (Default categories)
-- =====================================================

-- Insert default categories
INSERT INTO categories (name_en, name_te, slug, description_en, description_te, color, icon, sort_order) VALUES
('Technology', 'టెక్నాలజీ', 'technology', 'Technology related posts', 'టెక్నాలజీ సంబంధిత పోస్ట్లు', '#3B82F6', 'laptop', 1),
('Government', 'ప్రభుత్వం', 'government', 'Government and public service', 'ప్రభుత్వం మరియు పబ్లిక్ సర్వీస్', '#10B981', 'building', 2),
('Literature', 'సాహిత్యం', 'literature', 'Literature and writing', 'సాహిత్యం మరియు రచన', '#F59E0B', 'book-open', 3),
('Poetry', 'కవిత్వం', 'poetry', 'Poetry and verses', 'కవిత్వం మరియు పద్యాలు', '#8B5CF6', 'feather', 4),
('Personal', 'వ్యక్తిగతం', 'personal', 'Personal thoughts and experiences', 'వ్యక్తిగత ఆలోచనలు మరియు అనుభవాలు', '#EC4899', 'user', 5),
('Telugu Culture', 'తెలుగు సంస్కృతి', 'telugu-culture', 'Telugu culture and traditions', 'తెలుగు సంస్కృతి మరియు సంప్రదాయాలు', '#EF4444', 'heart', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert default pages
INSERT INTO pages (slug, title_en, title_te, content_en, content_te, status) VALUES
('homepage', 'Welcome to RB Portfolio', 'ఆర్బి పోర్ట్ఫోలియోకి స్వాగతం', 'Welcome content in English', 'తెలుగులో స్వాగత కంటెంట్', 'published'),
('about', 'About Ravindar Bejjarapu', 'రవీందర్ బేజ్జరాపు గురించి', 'About content in English', 'తెలుగులో గురించి కంటెంట్', 'published'),
('contact', 'Contact Us', 'మమ్మల్ని సంప్రదించండి', 'Contact content in English', 'తెలుగులో సంప్రదించండి కంటెంట్', 'published')
ON CONFLICT (slug) DO NOTHING; 