"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, User, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'

const content = {
  en: {
    title: 'Comments',
    subtitle: 'Join the discussion and share your thoughts!',
    name: 'Name',
    email: 'Email',
    comment: 'Comment',
    newsletter: 'Sign up for newsletter',
    submit: 'Post Comment',
    submitting: 'Posting...',
    success: 'Your comment has been submitted and is awaiting approval.',
    error: 'Something went wrong. Please try again.',
    empty: 'No comments yet. Be the first to comment!',
    owner: 'Owner',
    required: 'Required',
  },
  te: {
    title: 'వ్యాఖ్యలు',
    subtitle: 'చర్చలో చేరండి మరియు మీ ఆలోచనలను పంచుకోండి!',
    name: 'పేరు',
    email: 'ఇమెయిల్',
    comment: 'వ్యాఖ్య',
    newsletter: 'న్యూస్‌లెటర్‌కు సైన్ అప్ చేయండి',
    submit: 'వ్యాఖ్యను పోస్ట్ చేయండి',
    submitting: 'పోస్ట్ అవుతోంది...',
    success: 'మీ వ్యాఖ్య సమర్పించబడింది మరియు ఆమోదం కోసం వేచి ఉంది.',
    error: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    empty: 'ఇంకా వ్యాఖ్యలు లేవు. మొదట వ్యాఖ్యానించేది మీరే!',
    owner: 'యజమాని',
    required: 'అవసరం',
  },
}

interface CommentSectionProps {
  blogSlug: string
  blogTitle: string
}

type Comment = {
  id: number
  created_at: string
  author_name: string
  author_email: string
  comment_text: string
  author_role?: string | null
}

export default function CommentSection({ blogSlug, blogTitle }: CommentSectionProps) {
  const { language } = useLanguage()
  const t = content[language as keyof typeof content]

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Comments state
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      setLoading(true)
      setFetchError('')
      const res = await fetch(`/api/comments?blog_slug=${encodeURIComponent(blogSlug)}`)
      if (!res.ok) {
        setFetchError(t.error)
        setLoading(false)
        return
      }
      const data = await res.json()
      setComments(data.comments || [])
      setLoading(false)
    }
    fetchComments()
  }, [blogSlug, t.error])

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)
    // Basic validation
    if (!name || !email || !comment) {
      setSubmitError(t.required)
      setSubmitting(false)
      return
    }
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blog_slug: blogSlug,
        author_name: name,
        author_email: email,
        comment_text: comment,
        subscribes_to_newsletter: newsletter,
      }),
    })
    if (res.ok) {
      setSubmitSuccess(true)
      setName('')
      setEmail('')
      setComment('')
      setNewsletter(false)
    } else {
      setSubmitError(t.error)
    }
    setSubmitting(false)
  }

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
                {t.title}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {t.subtitle}
              </p>
            </div>
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="pt-0">
          {/* Comment Form */}
          <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
            <div>
              <Input
                placeholder={t.name}
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder={t.email}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <div>
              <Textarea
                placeholder={t.comment}
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                rows={3}
                disabled={submitting}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="newsletter"
                type="checkbox"
                checked={newsletter}
                onChange={e => setNewsletter(e.target.checked)}
                disabled={submitting}
                className="accent-[#0056D2] w-4 h-4"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                {t.newsletter}
              </label>
            </div>
            {submitError && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4" />
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                {t.success}
              </div>
            )}
            <Button type="submit" className="bg-[#0056D2] hover:bg-[#0056D2]/90" disabled={submitting}>
              {submitting ? (
                <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t.submitting}</span>
              ) : t.submit}
            </Button>
          </form>

          {/* Comments List */}
          <div>
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>
            ) : fetchError ? (
              <div className="flex items-center gap-2 text-red-600"><AlertTriangle className="w-4 h-4" /> {fetchError}</div>
            ) : comments.length === 0 ? (
              <div className="text-gray-500 text-sm italic">{t.empty}</div>
            ) : (
              <ul className="space-y-6">
                {comments.map((c) => (
                  <li key={c.id} className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{c.author_name}</span>
                      {c.author_role === 'owner' && (
                        <Badge className="ml-2 bg-[#0056D2] text-white px-2 py-0.5 text-xs font-semibold">{t.owner}</Badge>
                      )}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line mb-1">{c.comment_text}</div>
                    <div className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
} 