"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, BookOpen, FileText, User, MoreHorizontal, X, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  const [activeTab, setActiveTab] = useState<"home" | "blogs" | "stories" | "about">("home")
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [language, setLanguage] = useState("te") // 'te' for Telugu, 'en' for English

  const toggleLanguage = () => {
    setLanguage(language === "te" ? "en" : "te")
  }

  const content = {
    te: {
      nav: {
        home: "హోం",
        about: "నా గురించి",
        novels: "నవలలు",
        stories: "కథలు",
        blogs: "బ్లాగులు",
        subscribe: "సబ్‌స్క్రయిబ్",
        more: "మరిన్ని",
      },
      hero: {
        cta: "పరిచయం చూడండి",
        secondaryCta: "రచనలు చూడండి",
      },
      featured: {
        title: "ఫీచర్డ్ బ్లాగ్ పోస్ట్",
        readMore: "పూర్తిగా చదవండి",
      },
      profile: {
        title: "రచయిత గురించి",
        readMore: "మరింత చదవండి",
      },
      recent: {
        title: "ఇటీవలి బ్లాగ్ పోస్ట్‌లు",
      },
      subscription: {
        title: "నా రచనలను పొందండి",
        subtitle: "కొత్త బ్లాగ్ పోస్ట్‌లు మరియు రచనల గురించి తెలుసుకోండి",
        namePlaceholder: "మీ పేరు",
        emailPlaceholder: "మీ ఇమెయిల్",
        button: "సబ్‌స్క్రయిబ్ చేయండి",
      },
      footer: {
        about: "గురించి",
        privacy: "గోప్యత",
        contact: "సంప్రదింపు",
        copyright: "© 2024 రవీందర్ బేజ్జరాపు. అన్ని హక్కులు రక్షించబడ్డాయి.",
      },
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        novels: "Novels",
        stories: "Stories",
        blogs: "Blogs",
        subscribe: "Subscribe",
        more: "More",
      },
      hero: {
        cta: "See Introduction",
        secondaryCta: "View Writings",
      },
      featured: {
        title: "Featured Blog Post",
        readMore: "Read Full Article",
      },
      profile: {
        title: "About the Author",
        readMore: "Read More",
      },
      recent: {
        title: "Recent Blog Posts",
      },
      subscription: {
        title: "Get My Writings",
        subtitle: "Stay updated about new blog posts and writings",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        button: "Subscribe",
      },
      footer: {
        about: "About",
        privacy: "Privacy",
        contact: "Contact",
        copyright: "© 2024 Ravindar Bejjarapu. All rights reserved.",
      },
    },
  }

  // Static content that doesn't change with language toggle
  const staticContent = {
    hero: {
      title: "రవీందర్ బేజ్జరాపు – నా రచనలు",
      subtitle: "తెలంగాణ నేలమీద పుట్టిన కథలు, భావాలు మరియు అనుభవాలు",
    },
    featured: {
      blogTitle: "తెలంగాణ సంస్కృతిలో భాషా వైవిధ్యం",
      excerpt: "మన తెలంగాణ రాష్ట్రంలో భాషా వైవిధ్యం ఎంత గొప్పదో, అది మన సంస్కృతిని ఎలా సమృద్ధం చేస్తుందో ఈ వ్యాసంలో చర్చిస్తున్నాను...",
    },
    profile: {
      intro1: "తెలంగాణ నేలమీద పుట్టి పెరిగిన రచయిత రవీందర్ బేజ్జరాపు.",
      intro2: "సాహిత్యం, సంస్కృతి మరియు సమాజ విషయాలపై రాస్తూ ఉంటాను.",
    },
    recent: {
      posts: [
        {
          title: "గ్రామీణ జీవితంలో మార్పులు",
          date: "డిసెంబర్ 15, 2024",
          preview: "మన గ్రామాలలో జరుగుతున్న మార్పులను గమనిస్తూ...",
        },
        {
          title: "తెలుగు సాహిత్యంలో ఆధునికత",
          date: "డిసెంబర్ 10, 2024",
          preview: "సాంప్రదాయకత మరియు ఆధునికత మధ్య సమతుల్యత...",
        },
        {
          title: "యువతకు సందేశం",
          date: "డిసెంబర్ 5, 2024",
          preview: "మన యువత తమ మూలాలను మరచిపోకుండా...",
        },
      ],
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <div className="min-h-screen bg-[#F5FBFF] pb-20 md:pb-0">
      {/* Top Navigation - Desktop Only */}
      <nav className="bg-white shadow-sm border-b border-blue-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-[#0056D2] telugu-heading">
                {language === "te" ? "రవీందర్ బేజ్జరాపు" : "Ravindar Bejjarapu"}
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-baseline space-x-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors telugu-nav"
              >
                {currentContent.nav.home}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors telugu-nav"
              >
                {currentContent.nav.about}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors telugu-nav"
              >
                {currentContent.nav.novels}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors telugu-nav"
              >
                {currentContent.nav.stories}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors telugu-nav"
              >
                {currentContent.nav.blogs}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors telugu-nav"
              >
                {currentContent.nav.subscribe}
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
      <div className="bg-white shadow-sm border-b border-blue-100 md:hidden">
        <div className="flex justify-between items-center h-16 px-4">
          <h1 className="text-lg font-bold text-[#0056D2] telugu-heading">
            {language === "te" ? "రవీందర్ బేజ్జరాపు" : "Ravindar Bejjarapu"}
          </h1>
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-[#0056D2] hover:text-blue-800 transition-colors"
          >
            {language === "te" ? "తె | En" : "Te | En"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Hero Image */}
            <div className="flex-shrink-0 order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="రవీందర్ బేజ్జరాపు"
                  width={400}
                  height={400}
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl object-cover shadow-2xl border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#0056D2] text-white p-3 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight telugu-heading">
                {staticContent.hero.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed telugu-body">
                {staticContent.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-[#0056D2] hover:bg-blue-700 text-white px-6 md:px-8 py-3 text-base md:text-lg font-medium rounded-lg transition-colors telugu-nav">
                  {currentContent.hero.cta}
                </Button>
                <Button
                  variant="outline"
                  className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white px-6 md:px-8 py-3 text-base md:text-lg font-medium rounded-lg transition-colors telugu-nav"
                >
                  {currentContent.hero.secondaryCta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center telugu-heading">
            {currentContent.featured.title}
          </h2>
          <Card className="overflow-hidden shadow-lg border-0">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Featured blog post"
                  width={600}
                  height={300}
                  className="w-full h-48 md:h-64 lg:h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <div className="flex items-center text-sm text-gray-500 mb-3 md:mb-4 telugu-body">
                  <Calendar size={16} className="mr-2" />
                  <span>డిసెంబర్ 20, 2024</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight telugu-heading">
                  {staticContent.featured.blogTitle}
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base telugu-body">
                  {staticContent.featured.excerpt}
                </p>
                <Button
                  variant="outline"
                  className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors w-full sm:w-auto telugu-nav"
                >
                  {currentContent.featured.readMore}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Profile Card */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Ravindar Bejjarapu"
                    width={150}
                    height={150}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-[#0056D2]"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 telugu-heading">
                    {currentContent.profile.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 mb-2 leading-relaxed telugu-body">
                    {staticContent.profile.intro1}
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed telugu-body">
                    {staticContent.profile.intro2}
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors w-full sm:w-auto telugu-nav"
                  >
                    {currentContent.profile.readMore}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center telugu-heading">
            {currentContent.recent.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticContent.recent.posts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2 telugu-body">
                    <Calendar size={16} className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight telugu-heading">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed telugu-body">{post.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0056D2] to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 telugu-heading">{currentContent.subscription.title}</h2>
          <p className="text-xl text-blue-100 mb-8 telugu-body">{currentContent.subscription.subtitle}</p>
          <div className="max-w-sm md:max-w-md mx-auto">
            <form className="space-y-3 md:space-y-4">
              <Input
                type="text"
                placeholder={currentContent.subscription.namePlaceholder}
                className="bg-white border-0 text-gray-900 placeholder-gray-500 h-12 telugu-body"
              />
              <Input
                type="email"
                placeholder={currentContent.subscription.emailPlaceholder}
                className="bg-white border-0 text-gray-900 placeholder-gray-500 h-12 telugu-body"
              />
              <Button className="w-full bg-white text-[#0056D2] hover:bg-gray-100 font-medium py-3 h-12 transition-colors telugu-nav">
                {currentContent.subscription.button}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 telugu-heading">రవీందర్ బేజ్జరాపు</h3>
              <p className="text-gray-400 telugu-body">{currentContent.footer.copyright}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors telugu-nav">
                  {currentContent.footer.about}
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors telugu-nav">
                  {currentContent.footer.privacy}
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors telugu-nav">
                  {currentContent.footer.contact}
                </Link>
              </div>
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors hidden md:block"
              >
                {language === "te" ? "తెలుగు | English" : "Telugu | English"}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="flex justify-around items-center py-2 relative">
          {/* Home */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              activeTab === "home" ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {activeTab === "home" && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <Home size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.home}</span>
          </button>

          {/* Blogs */}
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              activeTab === "blogs" ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {activeTab === "blogs" && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <FileText size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.blogs}</span>
          </button>

          {/* Stories */}
          <button
            onClick={() => setActiveTab("stories")}
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              activeTab === "stories" ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {activeTab === "stories" && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <BookOpen size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.stories}</span>
          </button>

          {/* About */}
          <button
            onClick={() => setActiveTab("about")}
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors relative ${
              activeTab === "about" ? "text-[#0056D2]" : "text-gray-500 hover:text-[#0056D2]"
            }`}
          >
            {activeTab === "about" && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0056D2] rounded-b-full" />
            )}
            <User size={20} className="mb-1" />
            <span className="text-xs font-medium truncate telugu-nav">{currentContent.nav.about}</span>
          </button>

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
                href="#"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors telugu-nav"
                onClick={() => setShowMoreMenu(false)}
              >
                <BookOpen size={20} className="mr-3" />
                {currentContent.nav.novels}
              </Link>
              <Link
                href="#"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 transition-colors telugu-nav"
                onClick={() => setShowMoreMenu(false)}
              >
                <FileText size={20} className="mr-3" />
                {currentContent.nav.subscribe}
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
    </div>
  )
}
