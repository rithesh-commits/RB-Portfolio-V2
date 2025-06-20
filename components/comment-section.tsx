"use client"

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MessageCircle, Loader2 } from 'lucide-react'

const content = {
  en: {
    title: 'Comments',
    subtitle: 'Share your thoughts and join the discussion',
    loading: 'Loading comments...',
    error: 'Unable to load comments',
    noComments: 'No comments yet. Be the first to comment!',
  },
  te: {
    title: 'వ్యాఖ్యలు',
    subtitle: 'మీ ఆలోచనలను పంచుకోండి మరియు చర్చలో చేరండి',
    loading: 'వ్యాఖ్యలు లోడ్ అవుతున్నాయి...',
    error: 'వ్యాఖ్యలను లోడ్ చేయలేకపోయాము',
    noComments: 'ఇంకా వ్యాఖ్యలు లేవు. మొదట వ్యాఖ్యానించేది మీరే!',
  },
}

interface CommentSectionProps {
  blogSlug: string
  blogTitle: string
}

export default function CommentSection({ blogSlug, blogTitle }: CommentSectionProps) {
  const { language } = useLanguage()
  const currentContent = content[language as keyof typeof content]
  const commentRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Giscus configuration
    const giscusConfig = {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'your-username/your-repo',
      repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Comments',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: 'light',
      darkTheme: 'dark',
      lang: language === 'te' ? 'en' : 'en', // Giscus doesn't support Telugu, so we'll use English
    }

    // Load Giscus script
    const loadGiscus = () => {
      if (typeof window !== 'undefined' && commentRef.current) {
        const script = document.createElement('script')
        script.src = 'https://giscus.app/client.js'
        script.setAttribute('data-repo', giscusConfig.repo)
        script.setAttribute('data-repo-id', giscusConfig.repoId)
        script.setAttribute('data-category', giscusConfig.category)
        script.setAttribute('data-category-id', giscusConfig.categoryId)
        script.setAttribute('data-mapping', giscusConfig.mapping)
        script.setAttribute('data-strict', giscusConfig.strict)
        script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
        script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
        script.setAttribute('data-input-position', giscusConfig.inputPosition)
        script.setAttribute('data-theme', giscusConfig.theme)
        script.setAttribute('data-dark-theme', giscusConfig.darkTheme)
        script.setAttribute('data-lang', giscusConfig.lang)
        script.crossOrigin = 'anonymous'
        script.async = true

        script.onload = () => {
          setIsLoading(false)
        }

        script.onerror = () => {
          setHasError(true)
          setIsLoading(false)
        }

        commentRef.current.appendChild(script)
      }
    }

    // Clear previous comments and load new ones
    if (commentRef.current) {
      commentRef.current.innerHTML = ''
      setIsLoading(true)
      setHasError(false)
      
      // Small delay to ensure DOM is ready
      setTimeout(loadGiscus, 100)
    }

    return () => {
      // Cleanup
      if (commentRef.current) {
        commentRef.current.innerHTML = ''
      }
    }
  }, [blogSlug, language])

  return (
    <section className="mt-12">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0056D2]/10 rounded-lg">
              <MessageCircle className="w-5 h-5 text-[#0056D2]" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {currentContent.title}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {currentContent.subtitle}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <Separator className="mb-6" />
        
        <CardContent className="pt-0">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#0056D2] mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                {currentContent.loading}
              </span>
            </div>
          )}

          {hasError && (
            <div className="text-center py-8">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  {currentContent.error}
                </p>
                <p className="text-sm text-red-500 dark:text-red-300 mt-1">
                  Please refresh the page to try again.
                </p>
              </div>
            </div>
          )}

          {/* Giscus comments will be loaded here */}
          <div ref={commentRef} className="min-h-[200px]" />
        </CardContent>
      </Card>
    </section>
  )
} 