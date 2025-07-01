"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  PenTool,
  LogOut,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/admin',
    description: 'Overview and analytics'
  },
  {
    label: 'Blogs',
    icon: FileText,
    href: '/admin/blogs',
    description: 'Manage blog posts'
  },
  {
    label: 'Stories',
    icon: BookOpen,
    href: '/admin/stories',
    description: 'Manage Telugu stories'
  },
  {
    label: 'Novels',
    icon: PenTool,
    href: '/admin/novels',
    description: 'Manage novels'
  },
  {
    label: 'Comments',
    icon: MessageSquare,
    href: '/admin/comments',
    description: 'Moderate comments'
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
    description: 'View site analytics'
  },
  {
    label: 'Users',
    icon: Users,
    href: '/admin/users',
    description: 'Manage users'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    description: 'Site configuration'
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-blue-50 border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0056D2] to-blue-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-500">Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "group flex items-center p-3 w-full text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-md",
              pathname === route.href 
                ? "bg-gradient-to-r from-[#0056D2] to-blue-600 text-white shadow-lg" 
                : "text-gray-700 hover:bg-white/80 hover:text-[#0056D2]"
            )}
          >
            <div className="flex items-center w-full">
              <route.icon className={cn(
                "h-5 w-5 mr-3 transition-colors",
                pathname === route.href ? "text-white" : "text-gray-500 group-hover:text-[#0056D2]"
              )} />
              <div className="flex-1">
                <div className="font-medium">{route.label}</div>
                <div className={cn(
                  "text-xs transition-colors",
                  pathname === route.href ? "text-blue-100" : "text-gray-400 group-hover:text-gray-600"
                )}>
                  {route.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
} 