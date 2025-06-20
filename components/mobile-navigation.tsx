"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, FileText, User, MoreHorizontal, X, Phone } from "lucide-react"

interface MobileNavigationProps {
  language: string
  toggleLanguage: () => void
}

export default function MobileNavigation({ language, toggleLanguage }: MobileNavigationProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const pathname = usePathname()

  const content = {
    te: {
      nav: {
        home: "హోం",
        about: "నా గురించి",
        novels: "నవలలు",
        stories: "కథలు",
        blogs: "బ్లాగులు",
        contact: "సంప్రదింపు",
        more: "మరిన్ని",
      },
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        novels: "Novels",
        stories: "Stories",
        blogs: "Blogs",
        contact: "Contact",
        more: "More",
      },
    },
  }

  const currentContent = content[language as keyof typeof content]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="flex justify-around items-center py-2 relative">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <Home size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.home}</span>
          </Link>

          {/* Blogs */}
          <Link
            href="/blogs"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/blogs") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/blogs") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <FileText size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.blogs}</span>
          </Link>

          {/* Stories */}
          <Link
            href="/stories"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/stories") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/stories") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <BookOpen size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.stories}</span>
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              isActive("/about") ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {isActive("/about") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <User size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.about}</span>
          </Link>

          {/* More */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative text-gray-500 hover:text-[#0056D2]"
          >
            <MoreHorizontal size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.more}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 telugu-heading">{currentContent.nav.more}</h3>
              <button onClick={() => setShowMoreMenu(false)} className="text-gray-500 hover:text-gray-700 p-2">
                <X size={24} />
              </button>
            </div>

            <div className="py-4">
              <Link
                href="/novels"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors telugu-nav"
                onClick={() => setShowMoreMenu(false)}
              >
                <BookOpen size={20} className="mr-3" />
                {currentContent.nav.novels}
              </Link>
              <Link
                href="/contact"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors telugu-nav"
                onClick={() => setShowMoreMenu(false)}
              >
                <Phone size={20} className="mr-3" />
                {currentContent.nav.contact}
              </Link>

              <div className="border-t border-gray-200 mt-4 pt-4 px-6">
                <button
                  onClick={() => {
                    toggleLanguage()
                    setShowMoreMenu(false)
                  }}
                  className="text-sm font-medium text-[#0056D2] hover:text-blue-800 transition-colors"
                >
                  {language === "te" ? "Switch to English" : "తెలుగులోకి మార్చండి"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
