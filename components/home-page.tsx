"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/components/language-provider"
import { homeContent } from "@/lib/home-content"
import Link from "next/link"
import { subscribeToNewsletter, type ContactFormResult } from "@/app/actions/contact"
import { useState } from "react"

export default function HomePage() {
  const { language } = useLanguage()
  const staticContent = homeContent

  const content = {
    te: {
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
        success: "విజయవంతంగా న్యూస్‌లెటర్‌కు సబ్‌స్క్రయిబ్ అయ్యారు!",
        error: "సబ్‌స్క్రిప్షన్‌లో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.",
      },
    },
    en: {
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
        success: "Successfully subscribed to newsletter!",
        error: "Subscription error. Please try again.",
      },
    },
  }

  const currentContent = content[language as keyof typeof content]

  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [newsletterResult, setNewsletterResult] = useState<ContactFormResult | null>(null)

  const handleNewsletterSubmit = async (formData: FormData) => {
    setNewsletterStatus("sending")
    setNewsletterResult(null)

    try {
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setNewsletterStatus("success")
        setNewsletterResult({
          success: true,
          message: currentContent.subscription.success,
        })
        // Reset form on success
        const form = document.getElementById("newsletter-form") as HTMLFormElement
        if (form) form.reset()
      } else {
        setNewsletterStatus("error")
        setNewsletterResult({
          success: false,
          message: currentContent.subscription.error,
        })
      }
    } catch (error) {
      console.error("Newsletter submission error:", error)
      setNewsletterStatus("error")
      setNewsletterResult({
        success: false,
        message: currentContent.subscription.error,
      })
    }
  }

  return (
    <PageLayout>
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
                {staticContent.hero.title[language as keyof typeof staticContent.hero.title]}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed telugu-body">
                {staticContent.hero?.subtitle?.[language as keyof typeof staticContent.hero.subtitle] || ""}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/about">
                  <Button className="bg-[#0056D2] hover:bg-blue-700 text-white px-6 md:px-8 py-3 text-base md:text-lg font-medium rounded-lg transition-colors telugu-nav w-full">
                    {currentContent.hero.cta}
                  </Button>
                </Link>
                <Link href="/stories">
                  <Button
                    variant="outline"
                    className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white px-6 md:px-8 py-3 text-base md:text-lg font-medium rounded-lg transition-colors telugu-nav w-full"
                  >
                    {currentContent.hero.secondaryCta}
                  </Button>
                </Link>
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
                  <span>{staticContent.featured?.date?.[language as keyof typeof staticContent.featured.date] || ""}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight telugu-heading">
                  {staticContent.featured?.blogTitle || ""}
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base telugu-body">
                  {staticContent.featured?.excerpt || ""}
                </p>
                <Link href="/blogs">
                  <Button
                    variant="outline"
                    className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors w-full sm:w-auto telugu-nav"
                  >
                    {currentContent.featured.readMore}
                  </Button>
                </Link>
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
                    {staticContent.profile?.intro1 || ""}
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed telugu-body">
                    {staticContent.profile?.intro2 || ""}
                  </p>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors w-full sm:w-auto telugu-nav"
                    >
                      {currentContent.profile.readMore}
                    </Button>
                  </Link>
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
            {staticContent.recent?.posts?.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2 telugu-body">
                    <Calendar size={16} className="mr-2" />
                    <span>{post.date?.[language as keyof typeof post.date] || ""}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight telugu-heading">
                    {post.title || ""}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed telugu-body">
                    {post.preview || ""}
                  </p>
                </CardHeader>
              </Card>
            )) || null}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0056D2] to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 telugu-heading">{currentContent.subscription.title}</h2>
          <p className="text-xl text-blue-100 mb-8 telugu-body">{currentContent.subscription.subtitle}</p>
          <div className="max-w-sm md:max-w-md mx-auto">
            <form id="newsletter-form" action={handleNewsletterSubmit} className="space-y-3 md:space-y-4">
              <Input
                type="text"
                name="name"
                placeholder={currentContent.subscription.namePlaceholder}
                className="bg-white border-0 text-gray-900 placeholder-gray-500 h-12 telugu-body"
                required
              />
              <Input
                type="email"
                name="email"
                placeholder={currentContent.subscription.emailPlaceholder}
                className="bg-white border-0 text-gray-900 placeholder-gray-500 h-12 telugu-body"
                required
              />

              {/* Newsletter Status Messages */}
              {newsletterResult && newsletterStatus === "success" && (
                <div className="text-green-100 bg-green-600/20 p-3 rounded-lg text-center">
                  <span className="telugu-body">{newsletterResult.message}</span>
                </div>
              )}

              {newsletterResult && newsletterStatus === "error" && (
                <div className="text-red-100 bg-red-600/20 p-3 rounded-lg text-center">
                  <span className="telugu-body">{newsletterResult.message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={newsletterStatus === "sending"}
                className="w-full bg-white text-[#0056D2] hover:bg-gray-100 font-medium py-3 h-12 transition-colors telugu-nav"
              >
                {newsletterStatus === "sending" ? "Subscribing..." : currentContent.subscription.button}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
