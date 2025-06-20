"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import PageLayout from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Share2 } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import NotionContent from '@/components/notion-content'
import SEOMetaTags from '@/components/seo-meta-tags'
import CommentSection from '@/components/comment-section'

const content = {
  en: {
    backToBlogs: 'Back to Blogs',
    readingTime: 'min read',
    share: 'Share',
    loading: 'Loading blog post...',
    error: 'Error loading blog post.',
    notFound: 'Blog post not found.',
    backHome: 'Back to Home',
    tags: 'Tags',
    category: 'Category',
    relatedPosts: 'Related Posts',
    noRelatedPosts: 'No related posts found.',
  },
  te: {
    backToBlogs: 'బ్లాగ్‌లకు తిరిగి వెళ్లండి',
    readingTime: 'నిమిషాల చదవడం',
    share: 'షేర్ చేయండి',
    loading: 'బ్లాగ్ పోస్ట్ లోడ్ అవుతోంది...',
    error: 'బ్లాగ్ పోస్ట్ లోడ్ చేయడంలో లోపం.',
    notFound: 'బ్లాగ్ పోస్ట్ కనుగొనబడలేదు.',
    backHome: 'హోమ్‌కు తిరిగి వెళ్లండి',
    tags: 'ట్యాగ్‌లు',
    category: 'వర్గం',
    relatedPosts: 'సంబంధిత పోస్ట్‌లు',
    noRelatedPosts: 'సంబంధిత పోస్ట్‌లు కనుగొనబడలేదు.',
  },
}

type BlogPost = {
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
  excerpt: string
  content: any[]
}

// Generate slug function (same as in main blogs page)
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

export default function BlogPostPage() {
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()

  const currentContent = content[language as keyof typeof content]

  // Bilingual author name
  const authorName = language === 'te' ? 'రవీందర్ బేజ్జరాపు' : 'Ravindar Bejjarapu'

  useEffect(() => {
    async function fetchBlog() {
      try {
        const slug = params.slug as string
        
        // Fetch by slug - Updated to use /api/blogs
        let response = await fetch(`/api/blogs/slug/${slug}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('notFound')
          } else {
            throw new Error('Failed to fetch blog')
          }
          return
        }
        
        const data: BlogPost = await response.json()
        setBlog(data)
        
        // Fetch related blogs if category exists - Updated to use /api/blogs
        if (data.category) {
          try {
            const relatedResponse = await fetch(`/api/blogs?category=${encodeURIComponent(data.category)}&exclude=${data.id}`)
            
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json()
              
              // Filter out the current post and limit to 3
              const filteredRelated = relatedData
                .filter((post: BlogPost) => post.id !== data.id)
                .slice(0, 3)
              
              setRelatedBlogs(filteredRelated)
            }
          } catch (err) {
            console.log('Error fetching related posts:', err)
          }
        } else {
          // Fallback: fetch all posts if no category
          try {
            const relatedResponse = await fetch(`/api/blogs?exclude=${data.id}`)
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json()
              const filteredRelated = relatedData.slice(0, 3)
              setRelatedBlogs(filteredRelated)
            }
          } catch (err) {
            console.log('Error fetching fallback related posts:', err)
          }
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchBlog()
    }
  }, [params.slug])

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.summary,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <>
        <SEOMetaTags
          title="Loading... - Ravindar Bejjarapu"
          description="Loading blog post..."
          type="website"
        />
        <PageLayout>
          <div className="bg-gray-50 dark:bg-black min-h-screen">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-4xl mx-auto">
                <div className="animate-pulse space-y-8">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageLayout>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEOMetaTags
          title="Blog Post Not Found - Ravindar Bejjarapu"
          description="The blog post you are looking for could not be found."
          type="website"
        />
        <PageLayout>
          <div className="bg-gray-50 dark:bg-black min-h-screen">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {error === 'notFound' ? currentContent.notFound : currentContent.error}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {error === 'notFound' ? 'The blog post you are looking for does not exist.' : 'Something went wrong while loading the blog post.'}
                  </p>
                  <div className="space-x-4">
                    <Button 
                      onClick={() => router.push('/blogs')}
                      className="bg-[#0056D2] hover:bg-[#0056D2]/90"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {currentContent.backToBlogs}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => router.push('/')}
                    >
                      {currentContent.backHome}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageLayout>
      </>
    )
  }

  if (!blog) return null

  return (
    <>
      <SEOMetaTags
        title={`${blog.title} - Ravindar Bejjarapu`}
        description={blog.summary || blog.excerpt || `Read ${blog.title} by ${authorName}. ${blog.readingTime} min read.`}
        image={blog.coverImage || undefined}
        url={`/blogs/${params.slug}`}
        type="article"
        publishedTime={blog.publishedDate}
        author={authorName}
        tags={blog.tags}
        readingTime={blog.readingTime}
      />
      <PageLayout>
        <div className="bg-gray-50 dark:bg-black min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                onClick={() => router.push('/blogs')}
                className="mb-8 text-[#0056D2] hover:text-[#0056D2]/80 hover:bg-[#0056D2]/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentContent.backToBlogs}
              </Button>

              {/* Blog Content */}
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                {/* Cover Image */}
                {blog.coverImage && (
                  <div className="relative w-full aspect-[16/9] rounded-t-lg overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <span>{new Date(blog.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⏱️</span>
                      <span>{blog.readingTime} {currentContent.readingTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {blog.title}
                  </h1>

                  {/* Summary */}
                  {blog.summary && (
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {blog.summary}
                    </p>
                  )}

                  {/* Tags and Category */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {blog.category && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {currentContent.category}:
                        </span>
                        <Badge variant="secondary" className="bg-[#0056D2]/10 text-[#0056D2] border-[#0056D2]/20">
                          {blog.category}
                        </Badge>
                      </div>
                    )}
                    {blog.tags.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {currentContent.tags}:
                        </span>
                        <div className="flex gap-2">
                          {blog.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="my-6" />

                  {/* Share Button */}
                  <div className="flex justify-end mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="text-[#0056D2] border-[#0056D2] hover:bg-[#0056D2] hover:text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {currentContent.share}
                    </Button>
                  </div>

                  {/* Blog Content */}
                  <NotionContent blocks={blog.content || []} />
                </div>
              </article>

              {/* Related Posts */}
              {relatedBlogs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {currentContent.relatedPosts}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedBlogs.map((relatedBlog) => (
                      <div
                        key={relatedBlog.id}
                        onClick={() => router.push(`/blogs/${generateSlug(relatedBlog.id, relatedBlog.title)}`)}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                      >
                        {relatedBlog.coverImage && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={relatedBlog.coverImage}
                              alt={relatedBlog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0056D2] transition-colors line-clamp-2">
                            {relatedBlog.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                            {relatedBlog.excerpt || relatedBlog.summary}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>📅</span>
                            <time dateTime={relatedBlog.publishedDate}>
                              {new Date(relatedBlog.publishedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                            {relatedBlog.readingTime && (
                              <>
                                <span>•</span>
                                <span>⏱️</span>
                                <span>{relatedBlog.readingTime} min</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Comment Section */}
              <CommentSection blogSlug={params.slug as string} blogTitle={blog.title} />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  )
} 