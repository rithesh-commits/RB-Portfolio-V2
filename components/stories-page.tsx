"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, BookOpen, Search, Filter, Heart, Star } from "lucide-react"
import Image from "next/image"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/components/language-provider"
import { useStoriesContent } from "@/hooks/use-content"

export default function StoriesPage() {
  const { language } = useLanguage()
  const { stories: allStories, loading, error } = useStoriesContent()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  const content = {
    te: {
      hero: {
        title: "కథలు",
        subtitle: "జీవితం నుండి తీసుకున్న కథలు",
        totalStories: "మొత్తం కథలు",
      },
      filters: {
        search: "కథలు వెతకండి...",
        category: "వర్గం",
        sortBy: "క్రమం",
        all: "అన్నీ",
        latest: "కొత్తవి",
        popular: "ప్రసిద్ధ",
        oldest: "పాతవి",
      },
      categories: {
        all: "అన్నీ",
        social: "సామాజిక",
        family: "కుటుంబ",
        village: "గ్రామీణ",
        culture: "సంస్కృతి",
        youth: "యువత",
        relationships: "సంబంధాలు",
      },
      readMore: "పూర్తిగా చదవండి",
      readingTime: "నిమిషాలు చదవడానికి",
      likes: "ఇష్టాలు",
      featured: "ఫీచర్డ్",
      noResults: "ఫలితాలు లేవు",
      noResultsDesc: "మీ వెతుకుట కోసం కథలు కనుగొనబడలేదు. వేరే పదాలతో ప్రయత్నించండి.",
      loading: "లోడ్ అవుతోంది...",
      error: "కథలు లోడ్ చేయడంలో లోపం:",
    },
    en: {
      hero: {
        title: "Stories",
        subtitle: "Stories drawn from life",
        totalStories: "Total Stories",
      },
      filters: {
        search: "Search stories...",
        category: "Category",
        sortBy: "Sort By",
        all: "All",
        latest: "Latest",
        popular: "Popular",
        oldest: "Oldest",
      },
      categories: {
        all: "All",
        social: "Social",
        family: "Family",
        village: "Village",
        culture: "Culture",
        youth: "Youth",
        relationships: "Relationships",
      },
      readMore: "Read Full Story",
      readingTime: "min read",
      likes: "likes",
      featured: "Featured",
      noResults: "No Results",
      noResultsDesc: "No stories found for your search. Try different keywords.",
      loading: "Loading...",
      error: "Error loading stories:",
    },
  }

  const currentContent = content[language as keyof typeof content]

  // Filter and sort stories
  const filteredStories = allStories
    .filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || story.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        case "oldest":
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        case "popular":
          return b.likes - a.likes
        default:
          return 0
      }
    })

  const featuredStories = allStories.filter((story) => story.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (language === "te") {
      const months = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"]
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 px-4 text-center">
          <div className="text-xl text-gray-600 telugu-body">{currentContent.loading}</div>
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout>
        <div className="py-20 px-4 text-center">
          <div className="text-xl text-red-600 telugu-body">
            {currentContent.error} {error}
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight telugu-heading">
            {currentContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed telugu-body max-w-3xl mx-auto">
            {currentContent.hero.subtitle}
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0056D2] mb-2">{allStories.length}</div>
              <div className="text-sm text-gray-600 telugu-nav">{currentContent.hero.totalStories}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0056D2] mb-2">{featuredStories.length}</div>
              <div className="text-sm text-gray-600 telugu-nav">{currentContent.featured}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center telugu-heading">
              {currentContent.featured} {currentContent.hero.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredStories.map((story) => (
                <Card key={story.id} className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#0056D2] text-white">{currentContent.featured}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span className="telugu-body">{formatDate(story.publishedDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span className="telugu-nav">
                            {story.readingTime} {currentContent.readingTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Heart size={16} className="mr-1 text-red-500" />
                        <span className="telugu-nav">
                          {story.likes} {currentContent.likes}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight telugu-heading">{story.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed telugu-body line-clamp-3">{story.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {story.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs telugu-nav">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors telugu-nav"
                      >
                        {currentContent.readMore}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder={currentContent.filters.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 telugu-body"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 telugu-nav">
                    <SelectValue placeholder={currentContent.filters.category} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="telugu-nav">
                      {currentContent.categories.all}
                    </SelectItem>
                    <SelectItem value="social" className="telugu-nav">
                      {currentContent.categories.social}
                    </SelectItem>
                    <SelectItem value="family" className="telugu-nav">
                      {currentContent.categories.family}
                    </SelectItem>
                    <SelectItem value="village" className="telugu-nav">
                      {currentContent.categories.village}
                    </SelectItem>
                    <SelectItem value="culture" className="telugu-nav">
                      {currentContent.categories.culture}
                    </SelectItem>
                    <SelectItem value="youth" className="telugu-nav">
                      {currentContent.categories.youth}
                    </SelectItem>
                    <SelectItem value="relationships" className="telugu-nav">
                      {currentContent.categories.relationships}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 telugu-nav">
                  <SelectValue placeholder={currentContent.filters.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest" className="telugu-nav">
                    {currentContent.filters.latest}
                  </SelectItem>
                  <SelectItem value="popular" className="telugu-nav">
                    {currentContent.filters.popular}
                  </SelectItem>
                  <SelectItem value="oldest" className="telugu-nav">
                    {currentContent.filters.oldest}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* All Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {filteredStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                  <div className="relative">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    {story.featured && (
                      <Badge className="absolute top-2 right-2 bg-[#0056D2] text-white">
                        <Star size={12} className="mr-1" />
                        {currentContent.featured}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span className="telugu-body">{formatDate(story.publishedDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span className="telugu-nav">
                          {story.readingTime} {currentContent.readingTime}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 leading-tight telugu-heading line-clamp-2">
                      {story.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed telugu-body line-clamp-3 text-sm">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Heart size={14} className="mr-1 text-red-500" />
                        <span className="telugu-nav">{story.likes}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors telugu-nav"
                      >
                        {currentContent.readMore}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {story.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs telugu-nav">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 telugu-heading">{currentContent.noResults}</h3>
              <p className="text-gray-600 telugu-body">{currentContent.noResultsDesc}</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
