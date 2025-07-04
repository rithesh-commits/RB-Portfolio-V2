'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'
import AdminFooter from '@/components/admin/footer'
import AdminMobileNavigation from '@/components/admin/mobile-navigation'
import { sessionManager } from '../../lib/sessionManager'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Initialize session management
    const initializeSession = async () => {
      try {
        // Initialize session manager
        await sessionManager.initialize()
        
        // Check current session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Validate session using session manager
          if (sessionManager.isSessionValid(session)) {
            setUser(session.user)
            // Setup refresh timer for this session
            sessionManager.setupRefreshTimer(session)
          } else {
            // Session is invalid, force logout
            await sessionManager.forceLogout()
            router.push('/login')
            return
          }
        } else {
          // No session, redirect to login
          router.push('/login')
          return
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Session initialization error:', error)
        router.push('/login')
      }
    }

    initializeSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          if (sessionManager.isSessionValid(session)) {
            setUser(session.user)
            sessionManager.setupRefreshTimer(session)
            setLoading(false)
          } else {
            await sessionManager.forceLogout()
            router.push('/login')
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          sessionManager.cleanup()
          router.push('/login')
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Session was refreshed, update user state
          setUser(session.user)
          sessionManager.setupRefreshTimer(session)
        }
      }
    )

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe()
      sessionManager.cleanup()
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <AdminHeader user={user} />
          <main className="flex-1 p-6 pb-20 md:pb-6">
            {children}
          </main>
        </div>
      </div>
      <AdminFooter />
      <AdminMobileNavigation />
    </div>
  )
} 