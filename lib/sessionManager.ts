import { supabase } from './supabaseClient'
import { Session } from '@supabase/supabase-js'

// Session configuration
const SESSION_TIMEOUT_HOURS = 24 // 24 hours
const REFRESH_THRESHOLD_MINUTES = 30 // Refresh session 30 minutes before expiry

export class SessionManager {
  private static instance: SessionManager
  private refreshTimer: NodeJS.Timeout | null = null

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  /**
   * Helper to decode JWT and get issued at (iat) timestamp
   */
  private getIssuedAtFromJWT(token: string): number {
    try {
      const payload = token.split('.')[1]
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
      return decoded.iat || 0
    } catch {
      return 0
    }
  }

  /**
   * Check if a session is valid and not expired
   */
  isSessionValid(session: Session | null): boolean {
    if (!session) return false

    const now = Math.floor(Date.now() / 1000)
    const expiresAt = session.expires_at

    // Check if session has expired
    if (expiresAt && now >= expiresAt) {
      return false
    }

    // Check if session is within our custom timeout
    const sessionStart = session.access_token ? this.getIssuedAtFromJWT(session.access_token) : 0
    const sessionAge = now - sessionStart
    const maxAge = SESSION_TIMEOUT_HOURS * 60 * 60 // Convert hours to seconds

    return sessionAge < maxAge
  }

  /**
   * Get time until session expires in minutes
   */
  getTimeUntilExpiry(session: Session | null): number {
    if (!session) return 0

    const now = Math.floor(Date.now() / 1000)
    const expiresAt = session.expires_at || 0

    if (expiresAt <= now) return 0

    return Math.floor((expiresAt - now) / 60) // Return minutes
  }

  /**
   * Check if session needs refresh
   */
  shouldRefreshSession(session: Session | null): boolean {
    if (!session) return false

    const timeUntilExpiry = this.getTimeUntilExpiry(session)
    return timeUntilExpiry <= REFRESH_THRESHOLD_MINUTES
  }

  /**
   * Refresh the current session
   */
  async refreshSession(): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.auth.refreshSession()
      
      if (error) {
        console.error('Session refresh failed:', error)
        return { success: false, error: error.message }
      }

      if (data.session) {
        console.log('Session refreshed successfully')
        this.setupRefreshTimer(data.session)
        return { success: true }
      }

      return { success: false, error: 'No session returned from refresh' }
    } catch (error) {
      console.error('Session refresh error:', error)
      return { success: false, error: (error as Error).message }
    }
  }

  /**
   * Setup automatic session refresh timer
   */
  setupRefreshTimer(session: Session): void {
    // Clear existing timer
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
    }

    const timeUntilRefresh = this.getTimeUntilExpiry(session) - REFRESH_THRESHOLD_MINUTES

    if (timeUntilRefresh > 0) {
      this.refreshTimer = setTimeout(async () => {
        const result = await this.refreshSession()
        if (!result.success) {
          // If refresh fails, force logout
          await this.forceLogout()
        }
      }, timeUntilRefresh * 60 * 1000) // Convert minutes to milliseconds
    }
  }

  /**
   * Force logout and clear session
   */
  async forceLogout(): Promise<void> {
    try {
      // Clear refresh timer
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer)
        this.refreshTimer = null
      }

      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Clear any local storage or cookies
      if (typeof window !== 'undefined') {
        localStorage.removeItem('supabase.auth.token')
        sessionStorage.clear()
      }

      console.log('Forced logout completed')
    } catch (error) {
      console.error('Force logout error:', error)
    }
  }

  /**
   * Initialize session management
   */
  async initialize(): Promise<void> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        if (this.isSessionValid(session)) {
          this.setupRefreshTimer(session)
        } else {
          // Session is invalid, force logout
          await this.forceLogout()
        }
      }
    } catch (error) {
      console.error('Session initialization error:', error)
    }
  }

  /**
   * Cleanup session management
   */
  cleanup(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
      this.refreshTimer = null
    }
  }
}

// Export singleton instance
export const sessionManager = SessionManager.getInstance() 