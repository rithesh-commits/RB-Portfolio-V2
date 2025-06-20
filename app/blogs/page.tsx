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

const content = {
  en: {
    title: 'From My Notion',
    subtitle: 'Welcome to my digital garden. Here are some thoughts and learnings from my Notion workspace.',
    searchPlaceholder: 'Search posts...',
    sortNewest: 'Sort by Newest',
    sortOldest: 'Sort by Oldest',
    loadingError: 'Error loading blog posts.',
    noImage: 'No Image',
    readMore: 'Read More',
    readingTime: 'min read',
  },
  te: {
    title: 'నా నోషన్ నుండి',
    subtitle: 'నా డిజిటల్ గార్డెన్‌కు స్వాగతం. నా నోషన్ వర్క్‌స్పేస్ నుండి కొన్ని ఆలోచనలు మరియు అభ్యాసాలు ఇక్కడ ఉన్నాయి.',
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
  title: string
  summary: string
  publishedDate: string
  coverImage: string | null
  category: string | null
  author: string
  readingTime: number
  tags: string[]
  featured: boolean
}

// Auto-generate slug from ID + title for better SEO and uniqueness
const generateSlug = (id: string, title: string): string => {
  const shortId = id.replace(/-/g, '').substring(0, 8);
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 30); // Limit title part length
  return `${shortId}-${titleSlug}`;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const { language } = useLanguage()

  const currentContent = content[language as keyof typeof content]

  // Bilingual author name
  const authorName = language === 'te' ? 'రవీందర్ బేజ్జరాపు' : 'Ravindar Bejjarapu'

  // SEO content based on language
  const seoContent = {
    en: {
      title: 'Blog Posts - Ravindar Bejjarapu',
      description: 'Explore my latest thoughts, insights, and learnings from my Notion workspace. Discover articles on technology, personal development, and more.',
    },
    te: {
      title: 'బ్లాగ్ పోస్ట్‌లు - రవీందర్ బేజ్జరాపు',
      description: 'నా నోషన్ వర్క్‌స్పేస్ నుండి నా తాజా ఆలోచనలు, అంతర్దృష్టులు మరియు అభ్యాసాలను అన్వేషించండి. టెక్నాలజీ, వ్యక్తిగత అభివృద్ధి మరియు మరిన్ని గురించి వ్యాసాలను కనుగొనండి.',
    }
  }

  const currentSEO = seoContent[language as keyof typeof seoContent]

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs')
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        const data: Blog[] = await response.json()
        setBlogs(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const term = searchTerm.toLowerCase()
        return (
          blog.title.toLowerCase().includes(term) ||
          (blog.summary && blog.summary.toLowerCase().includes(term))
        )
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedDate).getTime()
        const dateB = new Date(b.publishedDate).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [blogs, searchTerm, sortOrder])

  return (
    <>
      <SEOMetaTags
        title={currentSEO.title}
        description={currentSEO.description}
        type="website"
        url="/blogs"
        tags={['blog', 'articles', 'technology', 'personal development', 'telugu content']}
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
                    // Generate slug from ID + title
                    const slug = generateSlug(post.id, post.title)
                    
                    return (
                      <Link key={post.id} href={`/blogs/${slug}`} passHref>
                        <div className="group grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-[#0056D2]/30 dark:hover:border-[#0056D2]/30 hover:-translate-y-1">
                          {/* Cover Image - Consistent size on desktop and mobile */}
                          <div className="relative w-full h-56 md:h-40 rounded-lg overflow-hidden md:order-2">
                            {post.coverImage ? (
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                priority={index < 3} // Priority loading for first 3 images
                                loading={index < 3 ? "eager" : "lazy"}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center rounded-lg">
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                                    <span className="text-gray-500 dark:text-gray-400 text-lg">📝</span>
                                  </div>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{currentContent.noImage}</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Featured Badge */}
                            {post.featured && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-yellow-400 text-yellow-900 border-0 text-xs font-semibold">
                                  ⭐ Featured
                                </Badge>
                              </div>
                            )}
                            
                            {/* Category Badge */}
                            {post.category && (
                              <div className="absolute top-3 right-3">
                                <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-[#0056D2] border-0 text-xs">
                                  {post.category}
                                </Badge>
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="md:col-span-2 md:order-1">
                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <span className="text-lg">📅</span>
                                <span>{new Date(post.publishedDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-lg">⏱️</span>
                                <span>{post.readingTime} {currentContent.readingTime}</span>
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-[#0056D2] transition-colors mb-3">
                              {post.title}
                            </h2>
                            
                            {/* Summary */}
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {post.summary}
                            </p>
                            
                            {/* Tags */}
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Read More Button */}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-[#0056D2] border-[#0056D2] hover:bg-[#0056D2] hover:text-white group-hover:bg-[#0056D2] group-hover:text-white transition-colors"
                            >
                              {currentContent.readMore}
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      </Link>
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