'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/admin/language-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon, Settings } from 'lucide-react'
import { useToast } from '../../hooks/use-toast'
import { sessionManager } from '../../lib/sessionManager'
import { SessionStatus } from './session-status'

interface AdminHeaderProps {
  user: User;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    setLoading(true)
    try {
      // Use session manager to handle logout
      await sessionManager.forceLogout()
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of the admin panel.",
      })
      
      router.push('/login')
    } catch (error) {
      toast({
        title: "Logout failed",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent telugu-heading group-hover:opacity-80 transition-opacity">
              {user.user_metadata?.brandName || 'Ravindar Bejjarapu'}
            </span>
            <span className="hidden md:inline text-base font-semibold text-gray-500 group-hover:text-[#0056D2] transition-colors">Admin Dashboard</span>
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <SessionStatus />
          <LanguageToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'Admin'} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-medium">
                    {getUserInitials(user.email || 'AD')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                disabled={loading}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{loading ? 'Signing out...' : 'Sign out'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 