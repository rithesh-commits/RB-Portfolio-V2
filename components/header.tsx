"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface HeaderProps {
  language: string
  toggleLanguage: () => void
}

export default function Header({ language, toggleLanguage }: HeaderProps) {
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
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm border-b border-blue-100 hidden md:block sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl font-bold text-[#0056D2] telugu-heading cursor-pointer">
                  {language === "te" ? "రవీందర్ బేజ్జరాపు" : "Ravindar Bejjarapu"}
                </h1>
              </Link>
            </div>

            <div className="flex items-baseline space-x-8">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium transition-colors telugu-nav ${
                  isActive("/") ? "text-[#0056D2] border-b-2 border-[#0056D2]" : "text-gray-700 hover:text-[#0056D2]"
                }`}
              >
                {currentContent.nav.home}
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium transition-colors telugu-nav ${
                  isActive("/about")
                    ? "text-[#0056D2] border-b-2 border-[#0056D2]"
                    : "text-gray-700 hover:text-[#0056D2]"
                }`}
              >
                {currentContent.nav.about}
              </Link>
              <Link
                href="/novels"
                className={`px-3 py-2 text-sm font-medium transition-colors telugu-nav ${
                  isActive("/novels")
                    ? "text-[#0056D2] border-b-2 border-[#0056D2]"
                    : "text-gray-700 hover:text-[#0056D2]"
                }`}
              >
                {currentContent.nav.novels}
              </Link>
              <Link
                href="/stories"
                className={`px-3 py-2 text-sm font-medium transition-colors telugu-nav ${
                  isActive("/stories")
                    ? "text-[#0056D2] border-b-2 border-[#0056D2]"
                    : "text-gray-700 hover:text-[#0056D2]"
                }`}
              >
                {currentContent.nav.stories}
              </Link>
              <Link
                href="/blogs"
                className={`px-3 py-2 text-sm font-medium transition-colors telugu-nav ${
                  isActive("/blogs")
                    ? "text-[#0056D2] border-b-2 border-[#0056D2]"
                    : "text-gray-700 hover:text-[#0056D2]"
                }`}
              >
                {currentContent.nav.blogs}
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium transition-colors telugu-nav ${
                  isActive("/contact")
                    ? "text-[#0056D2] border-b-2 border-[#0056D2]"
                    : "text-gray-700 hover:text-[#0056D2]"
                }`}
              >
                {currentContent.nav.contact}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-[#0056D2] hover:text-blue-800 transition-colors"
              >
                {language === "te" ? "తెలుగు | English" : "Telugu | English"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="bg-white shadow-sm border-b border-blue-100 md:hidden sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-4">
          <Link href="/">
            <h1 className="text-lg font-bold text-[#0056D2] telugu-heading cursor-pointer">
              {language === "te" ? "రవీందర్ బేజ్జరాపు" : "Ravindar Bejjarapu"}
            </h1>
          </Link>
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-[#0056D2] hover:text-blue-800 transition-colors"
          >
            {language === "te" ? "తె | En" : "Te | En"}
          </button>
        </div>
      </div>
    </>
  )
}
