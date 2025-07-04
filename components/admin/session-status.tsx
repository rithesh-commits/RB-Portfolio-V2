'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { sessionManager } from '@/lib/sessionManager'
import { Session } from '@supabase/supabase-js'
import { Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function SessionStatus() {
  const [session, setSession] = useState<Session | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      setSession(currentSession)
      
      if (currentSession) {
        updateTimeRemaining(currentSession)
      }
    }

    checkSession()

    // Update time remaining every minute
    const interval = setInterval(() => {
      if (session) {
        updateTimeRemaining(session)
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [session])

  const updateTimeRemaining = (currentSession: Session) => {
    const remaining = sessionManager.getTimeUntilExpiry(currentSession)
    setTimeRemaining(remaining)
  }

  const handleRefreshSession = async () => {
    setLoading(true)
    try {
      const result = await sessionManager.refreshSession()
      if (result.success) {
        toast({
          title: "Session refreshed",
          description: "Your session has been extended successfully.",
        })
        // Update session state
        const { data: { session: newSession } } = await supabase.auth.getSession()
        setSession(newSession)
      } else {
        toast({
          title: "Refresh failed",
          description: result.error || "Failed to refresh session",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (minutes: number): string => {
    if (minutes <= 0) return 'Expired'
    
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getStatusColor = (minutes: number): string => {
    if (minutes <= 0) return 'destructive'
    if (minutes <= 30) return 'destructive'
    if (minutes <= 60) return 'secondary'
    return 'default'
  }

  const getStatusIcon = (minutes: number) => {
    if (minutes <= 0) return <AlertCircle className="w-4 h-4" />
    if (minutes <= 30) return <AlertCircle className="w-4 h-4" />
    return <CheckCircle className="w-4 h-4" />
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Clock className="w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-600">Session:</span>
      <Badge variant={getStatusColor(timeRemaining) as any} className="text-xs">
        {getStatusIcon(timeRemaining)}
        <span className="ml-1">{formatTime(timeRemaining)}</span>
      </Badge>
      
      {timeRemaining <= 60 && timeRemaining > 0 && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleRefreshSession}
          disabled={loading}
          className="h-6 px-2 text-xs"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      )}
    </div>
  )
} 