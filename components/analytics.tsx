"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface AnalyticsProps {
  measurementId?: string
}

export default function Analytics({ measurementId }: AnalyticsProps) {
  const pathname = usePathname()
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return

    // Initialize Google Analytics
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
    })

    // Track page views
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    })

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [gaId, pathname])

  // Simple analytics without Google Analytics
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track page views with a simple API call
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            title: document.title,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        })
      } catch (error) {
        console.error('Analytics error:', error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
} 