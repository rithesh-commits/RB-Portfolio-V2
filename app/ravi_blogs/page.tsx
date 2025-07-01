"use client"

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import PageLayout from '@/components/page-layout'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/components/language-provider'
import SEOMetaTags from '@/components/seo-meta-tags'
import { supabase } from '@/lib/supabaseClient'

const content = {
  en: {
    title: 'Ravi Blogs (Supabase CMS)',
    subtitle: 'All blogs below are loaded from the new custom CMS (Supabase).',
    searchPlaceholder: 'Search posts...',
    sortNewest: 'Sort by Newest',
    sortOldest: 'Sort by Oldest',
    loadingError: 'Error loading blog posts.',
    noImage: 'No Image',
    readMore: 'Read More',
    readingTime: 'min read',
  },
  te: {
    title: 'రవీ బ్లాగ్స్ (సుపాబేస్ CMS)',
    subtitle: 'ఈ బ్లాగ్‌లు కొత్త కస్టమ్ CMS (Supabase) నుండి లోడ్ అవుతున్నాయి.',
    searchPlaceholder: 'పోస్ట్‌లను శోధించండి...',
    sortNewest: 'కొత్తవి ద్వారా క్రమబద్ధీకరించు',
    sortOldest: 'పాతవి ద్వారా క్రమబద్ధీకరించు',
    loadingError: 'బ్లాగ్ పోస్ట్‌లను లోడ్ చేయడంలో లోపం.',
    noImage: 'చిత్రం లేదు',
    readMore: 'మరింత చదవండి',
    readingTime: 'నిమిషాల చదవడం',
  },
}

type Blog = {
  id: string
  title_en: string
  title_te: string
  summary_en?: string
  summary_te?: string
  published_at?: string
  cover_image_url?: string | null
  category_id?: string | null
  author_en?: string
  author_te?: string
  reading_time_minutes?: number
  tags?: string[]
  featured?: boolean
}

const generateSlug = (id: string, title: string): string => {
  const shortId = id.replace(/-/g, '').substring(0, 8);
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 30);
  return `${shortId}-${titleSlug}`;
}

export default function RaviBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const { language } = useLanguage()

  const currentContent = content[language as keyof typeof content]

  // Fetch blogs from Supabase
  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })
      if (error) {
        setError(error.message)
      } else {
        setBlogs(data || [])
      }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const term = searchTerm.toLowerCase()
        // Use both English and Telugu titles/summaries for search
        return (
          (blog.title_en && blog.title_en.toLowerCase().includes(term)) ||
          (blog.title_te && blog.title_te.toLowerCase().includes(term)) ||
          (blog.summary_en && blog.summary_en.toLowerCase().includes(term)) ||
          (blog.summary_te && blog.summary_te.toLowerCase().includes(term))
        )
      })
      .sort((a, b) => {
        const dateA = new Date(a.published_at || '').getTime()
        const dateB = new Date(b.published_at || '').getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [blogs, searchTerm, sortOrder])

  return (
    <>
      <SEOMetaTags
        title={currentContent.title}
        description={currentContent.subtitle}
        type="website"
        url="/ravi_blogs"
        tags={['blog', 'articles', 'supabase', 'telugu content']}
      />
      <PageLayout>
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-gray-900 dark:to-gray-800 min-h-screen">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent mb-4">
                {currentContent.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {currentContent.subtitle}
              </p>
            </header>

            <div className="max-w-4xl mx-auto">
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder={currentContent.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 dark:bg-gray-800/80 dark:border-gray-700"
                    />
                  </div>
                  <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}>
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{currentContent.sortNewest}</SelectItem>
                      <SelectItem value="oldest">{currentContent.sortOldest}</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              {loading ? (
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-6 animate-pulse">
                      <div className="flex-1 space-y-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="w-48 h-32 md:w-56 md:h-36 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-10 px-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg">
                  <p className="text-red-600 font-semibold">{currentContent.loadingError}</p>
                  <p className="text-red-500 mt-2">{error}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredAndSortedBlogs.map((post, index) => {
                    // Use English or Telugu title based on language
                    const title = language === 'te' ? post.title_te : post.title_en
                    const summary = language === 'te' ? post.summary_te : post.summary_en
                    const slug = generateSlug(post.id, title)
                    return (
                      <div key={post.id} className="flex flex-col md:flex-row gap-6 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-3">{summary}</p>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {post.tags && post.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4">
                            <Link href={`/ravi_blogs/${post.id}`} legacyBehavior>
                              <Button variant="outline" className="text-[#0056D2] border-[#0056D2] hover:bg-[#0056D2] hover:text-white">
                                {currentContent.readMore}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                            {post.reading_time_minutes && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.reading_time_minutes} {currentContent.readingTime}
                              </span>
                            )}
                          </div>
                        </div>
                        {post.cover_image_url ? (
                          <div className="relative w-full md:w-64 h-40 md:h-auto">
                            <Image
                              src={post.cover_image_url}
                              alt={title}
                              fill
                              className="object-cover rounded-b-lg md:rounded-b-none md:rounded-r-lg"
                              sizes="(max-width: 768px) 100vw, 256px"
                            />
                          </div>
                        ) : (
                          <div className="w-full md:w-64 h-40 md:h-auto flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm">
                            {currentContent.noImage}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  )
} 