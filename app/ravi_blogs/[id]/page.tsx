"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageLayout from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import SEOMetaTags from '@/components/seo-meta-tags'
import { supabase } from '@/lib/supabaseClient'
import CommentSection from '@/components/comment-section'

const content = {
  en: {
    back: 'Back to Blogs',
    notFound: 'Blog post not found.',
    loading: 'Loading blog post...',
    author: 'Author',
    readingTime: 'min read',
  },
  te: {
    back: 'బ్లాగ్స్‌కు తిరిగి వెళ్ళండి',
    notFound: 'బ్లాగ్ పోస్ట్ కనుగొనబడలేదు.',
    loading: 'బ్లాగ్ పోస్ట్ లోడ్ అవుతోంది...',
    author: 'రచయిత',
    readingTime: 'నిమిషాల చదవడం',
  },
}

export default function RaviBlogDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { language } = useLanguage()
  const t = content[language as keyof typeof content]

  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()
      if (error || !data) {
        setError(t.notFound)
        setBlog(null)
      } else {
        setBlog(data)
      }
      setLoading(false)
    }
    if (id) fetchBlog()
  }, [id, t.notFound])

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <p>{t.loading}</p>
        </div>
      </PageLayout>
    )
  }

  if (error || !blog) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-600 font-semibold">{error || t.notFound}</p>
          <Button onClick={() => router.push('/ravi_blogs')} className="mt-6">
            {t.back}
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Use language-specific fields
  const title = language === 'te' ? blog.title_te : blog.title_en
  const summary = language === 'te' ? blog.summary_te : blog.summary_en
  const author = language === 'te' ? blog.author_te : blog.author_en
  const contentText = language === 'te' ? blog.content_te : blog.content_en

  return (
    <>
      <SEOMetaTags
        title={title}
        description={summary}
        type="article"
        url={`/ravi_blogs/${id}`}
        image={blog.cover_image_url || undefined}
        author={author}
        readingTime={blog.reading_time_minutes}
      />
      <PageLayout>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Button variant="ghost" onClick={() => router.push('/ravi_blogs')} className="mb-8 text-[#0056D2] hover:text-[#0056D2]/80 hover:bg-[#0056D2]/10">
            {t.back}
          </Button>
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {blog.cover_image_url && (
              <div className="relative w-full aspect-[16/9] rounded-t-lg overflow-hidden">
                <Image
                  src={blog.cover_image_url}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            )}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {title}
              </h1>
              {summary && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {summary}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                {author && (
                  <span>{t.author}: {author}</span>
                )}
                {blog.reading_time_minutes && (
                  <span>{blog.reading_time_minutes} {t.readingTime}</span>
                )}
              </div>
              <div className="prose dark:prose-invert max-w-none mb-8">
                {/* For now, just render as plain text. You can replace with a rich text renderer if needed. */}
                {contentText}
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </article>
          {/* Comments Section */}
          <CommentSection blogPostId={blog.id} blogTitle={title} />
        </div>
      </PageLayout>
    </>
  )
} 