"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, BookOpen, Users, Heart, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/components/language-provider"
import { useAboutContent } from "@/hooks/use-content"

export default function AboutPage() {
  const { language } = useLanguage()
  const { content: staticContent, loading, error } = useAboutContent()

  const content = {
    te: {
      hero: {
        title: "నా గురించి",
        subtitle: "నా జీవిత ప్రయాణం మరియు రచనా ప్రపంచం",
        cta: "నా రచనలు చూడండి",
      },
      intro: {
        title: "నా పరిచయం",
      },
      journey: {
        title: "నా ప్రయాణం",
        subtitle: "జీవితంలో ముఖ్యమైన మైలురాళ్లు",
      },
      achievements: {
        title: "విజయాలు మరియు గుర్తింపులు",
      },
      philosophy: {
        title: "నా రచనా తత్వం",
        subtitle: "నేను ఎందుకు రాస్తాను",
      },
      stats: {
        experience: "అనుభవం",
        years: "సంవత్సరాలు",
        stories: "కథలు",
        published: "ప్రచురితం",
        readers: "పాఠకులు",
        thousands: "వేలు",
        awards: "అవార్డులు",
        received: "అందుకున్నాను",
      },
      contact: {
        title: "నాతో మాట్లాడండి",
        subtitle: "మీ అభిప్రాయాలు మరియు సూచనలు నాకు చాలా ముఖ్యం",
        cta: "సంప్రదించండి",
      },
    },
    en: {
      hero: {
        title: "About Me",
        subtitle: "My Life Journey and Literary World",
        cta: "View My Writings",
      },
      intro: {
        title: "My Introduction",
      },
      journey: {
        title: "My Journey",
        subtitle: "Important milestones in life",
      },
      achievements: {
        title: "Achievements and Recognition",
      },
      philosophy: {
        title: "My Writing Philosophy",
        subtitle: "Why I Write",
      },
      stats: {
        experience: "Experience",
        years: "Years",
        stories: "Stories",
        published: "Published",
        readers: "Readers",
        thousands: "Thousands",
        awards: "Awards",
        received: "Received",
      },
      contact: {
        title: "Connect With Me",
        subtitle: "Your feedback and suggestions are very important to me",
        cta: "Get in Touch",
      },
    },
  }

  const currentContent = content[language as keyof typeof content]

  const getTimelineIcon = (iconType: string) => {
    switch (iconType) {
      case "birth":
        return <Heart className="w-5 h-5" />
      case "book":
        return <BookOpen className="w-5 h-5" />
      case "award":
      case "trophy":
        return <Award className="w-5 h-5" />
      case "digital":
      case "website":
        return <Users className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 px-4 text-center">
          <div className="text-xl text-gray-600 telugu-body">Loading...</div>
        </div>
      </PageLayout>
    )
  }

  if (error || !staticContent) {
    return (
      <PageLayout>
        <div className="py-20 px-4 text-center">
          <div className="text-xl text-red-600 telugu-body">Error loading content: {error}</div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Hero Image */}
            <div className="flex-shrink-0 order-1 lg:order-1">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="రవీందర్ బేజ్జరాపు"
                  width={400}
                  height={500}
                  className="w-80 h-96 md:w-96 md:h-[500px] rounded-2xl object-cover shadow-2xl border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#0056D2] text-white p-4 rounded-full shadow-lg">
                  <Quote className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight telugu-heading">
                {currentContent.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed telugu-body">
                {currentContent.hero.subtitle}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0056D2] mb-2">15+</div>
                  <div className="text-sm text-gray-600 telugu-nav">
                    {currentContent.stats.years} {currentContent.stats.experience}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0056D2] mb-2">50+</div>
                  <div className="text-sm text-gray-600 telugu-nav">
                    {currentContent.stats.stories} {currentContent.stats.published}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0056D2] mb-2">10K+</div>
                  <div className="text-sm text-gray-600 telugu-nav">{currentContent.stats.readers}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0056D2] mb-2">5+</div>
                  <div className="text-sm text-gray-600 telugu-nav">
                    {currentContent.stats.awards} {currentContent.stats.received}
                  </div>
                </div>
              </div>

              <Link href="/stories">
                <Button className="bg-[#0056D2] hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors telugu-nav">
                  {currentContent.hero.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center telugu-heading">
            {currentContent.intro.title}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed telugu-body">{staticContent.intro.text1}</p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed telugu-body">{staticContent.intro.text2}</p>
            <p className="text-lg text-gray-700 leading-relaxed telugu-body">{staticContent.intro.text3}</p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 telugu-heading">
              {currentContent.journey.title}
            </h2>
            <p className="text-xl text-gray-600 telugu-body">{currentContent.journey.subtitle}</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-[#0056D2]"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {staticContent.timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#0056D2] rounded-full flex items-center justify-center text-white z-10">
                    {getTimelineIcon(item.icon)}
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Badge variant="secondary" className="bg-[#0056D2] text-white">
                            {item.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 telugu-heading">
                          {item.title[language as keyof typeof item.title]}
                        </h3>
                        <p className="text-gray-600 telugu-body">
                          {item.description[language as keyof typeof item.description]}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center telugu-heading">
            {currentContent.achievements.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {staticContent.achievements.map((achievement, index) => (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-[#0056D2] border-[#0056D2]">
                        {achievement.year}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 telugu-heading">
                    {achievement.title[language as keyof typeof achievement.title]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 telugu-body">
                    {achievement.description[language as keyof typeof achievement.description]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Philosophy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0056D2] to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 telugu-heading">
            {currentContent.philosophy.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 telugu-body">{currentContent.philosophy.subtitle}</p>

          <Card className="bg-white/10 backdrop-blur-sm border-0 mb-8">
            <CardContent className="p-8">
              <Quote className="w-12 h-12 text-blue-200 mx-auto mb-4" />
              <blockquote className="text-lg md:text-xl text-white leading-relaxed telugu-body">
                "{staticContent.philosophy.quote}"
              </blockquote>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {staticContent.philosophy.points.map((point, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-white telugu-body">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 telugu-heading">
            {currentContent.contact.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 telugu-body">{currentContent.contact.subtitle}</p>
          <Link href="/contact">
            <Button className="bg-[#0056D2] hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors telugu-nav">
              {currentContent.contact.cta}
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
