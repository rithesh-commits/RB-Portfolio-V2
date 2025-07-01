"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, BookOpen, MessageSquare, Settings, MoreHorizontal, X, LogOut, BarChart3, Users } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AdminMobileNavigation() {
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
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
    }
  }

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true
    if (path !== "/admin" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="flex justify-around items-center py-2 relative">
          {/* Dashboard */}
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/admin") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/admin") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <Home size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">Dashboard</span>
          </Link>

          {/* Blogs */}
          <Link
            href="/admin/blogs"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/admin/blogs") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/admin/blogs") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <FileText size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">Blogs</span>
          </Link>

          {/* Comments */}
          <Link
            href="/admin/comments"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/admin/comments") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/admin/comments") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <MessageSquare size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">Comments</span>
          </Link>

          {/* More */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative text-gray-500 hover:text-[#0056D2]"
          >
            <MoreHorizontal size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">More</span>
          </button>
        </div>
      </nav>

      {/* More Menu Modal - Mobile Only */}
      {showMoreMenu && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowMoreMenu(false)} />

          {/* More Menu */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Admin Menu</h3>
              <button onClick={() => setShowMoreMenu(false)} className="text-gray-500 hover:text-gray-700 p-2">
                <X size={24} />
              </button>
            </div>

            <div className="py-4">
              <Link
                href="/admin/stories"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors"
                onClick={() => setShowMoreMenu(false)}
              >
                <BookOpen size={20} className="mr-3" />
                Stories
              </Link>
              <Link
                href="/admin/novels"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors"
                onClick={() => setShowMoreMenu(false)}
              >
                <BookOpen size={20} className="mr-3" />
                Novels
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors"
                onClick={() => setShowMoreMenu(false)}
              >
                <BarChart3 size={20} className="mr-3" />
                Analytics
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors"
                onClick={() => setShowMoreMenu(false)}
              >
                <Settings size={20} className="mr-3" />
                Settings
              </Link>

              <div className="border-t border-gray-200 mt-4 pt-4 px-6">
                <Link
                  href="/"
                  className="flex items-center py-2 text-sm font-medium text-gray-600 hover:text-[#0056D2] transition-colors"
                  onClick={() => setShowMoreMenu(false)}
                >
                  ← Back to Main Site
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setShowMoreMenu(false)
                  }}
                  className="flex items-center py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
} 