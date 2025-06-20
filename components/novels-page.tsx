"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Star, Award, ShoppingCart, ExternalLink, Eye } from "lucide-react"
import Image from "next/image"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/components/language-provider"
import { useNovelsContent } from "@/hooks/use-content"

export default function NovelsPage() {
  const { language } = useLanguage()
  const { novels: allNovels, stats, loading, error } = useNovelsContent()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedNovel, setSelectedNovel] = useState<string | null>(null)

  const content = {
    te: {
      hero: {
        title: "నవలలు",
        subtitle: "నా ప్రచురితమైన నవలలు మరియు కృతులు",
        totalNovels: "మొత్తం నవలలు",
        totalPages: "మొత్తం పేజీలు",
        totalReaders: "పాఠకులు",
        averageRating: "సగటు రేటింగ్",
      },
      filters: {
        search: "నవలలు వెతకండి...",
        genre: "వర్గం",
        sortBy: "క్రమం",
        all: "అన్నీ",
        latest: "కొత్తవి",
        popular: "ప్రసిద్ధ",
        oldest: "పాతవి",
        rating: "రేటింగ్",
      },
      genres: {
        all: "అన్నీ",
        social: "సామాజిక నవల",
        family: "కుటుంబ నవల",
        rural: "గ్రామీణ కథలు",
        youth: "యువత",
      },
      bookDetails: {
        pages: "పేజీలు",
        publisher: "ప్రచురణకర్త",
        published: "ప్రచురణ తేదీ",
        isbn: "ISBN",
        genre: "వర్గం",
        language: "భాష",
        rating: "రేటింగ్",
        reviews: "సమీక్షలు",
        awards: "అవార్డులు",
        price: "ధర",
        paperback: "కాగిత పుస్తకం",
        ebook: "ఇ-బుక్",
        rupees: "రూపాయలు",
      },
      actions: {
        readMore: "మరింత చదవండి",
        readLess: "తక్కువ చూపించు",
        buyNow: "ఇప్పుడే కొనండి",
        preview: "మునుపటి వీక్షణ",
        addToCart: "కార్ట్‌కు జోడించు",
        viewDetails: "వివరాలు చూడండి",
        backToList: "జాబితాకు తిరిగి వెళ్లు",
      },
      noResults: "ఫలితాలు లేవు",
      noResultsDesc: "మీ వెతుకుట కోసం నవలలు కనుగొనబడలేదు. వేరే పదాలతో ప్రయత్నించండి.",
      loading: "లోడ్ అవుతోంది...",
      error: "నవలలు లోడ్ చేయడంలో లోపం:",
      featured: "ఫీచర్డ్",
      available: "అందుబాటులో ఉంది",
      unavailable: "అందుబాటులో లేదు",
    },
    en: {
      hero: {
        title: "Novels",
        subtitle: "My published novels and literary works",
        totalNovels: "Total Novels",
        totalPages: "Total Pages",
        totalReaders: "Readers",
        averageRating: "Average Rating",
      },
      filters: {
        search: "Search novels...",
        genre: "Genre",
        sortBy: "Sort By",
        all: "All",
        latest: "Latest",
        popular: "Popular",
        oldest: "Oldest",
        rating: "Rating",
      },
      genres: {
        all: "All",
        social: "Social Novel",
        family: "Family Novel",
        rural: "Rural Stories",
        youth: "Youth",
      },
      bookDetails: {
        pages: "Pages",
        publisher: "Publisher",
        published: "Published",
        isbn: "ISBN",
        genre: "Genre",
        language: "Language",
        rating: "Rating",
        reviews: "Reviews",
        awards: "Awards",
        price: "Price",
        paperback: "Paperback",
        ebook: "E-book",
        rupees: "Rupees",
      },
      actions: {
        readMore: "Read More",
        readLess: "Read Less",
        buyNow: "Buy Now",
        preview: "Preview",
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        backToList: "Back to List",
      },
      noResults: "No Results",
      noResultsDesc: "No novels found for your search. Try different keywords.",
      loading: "Loading...",
      error: "Error loading novels:",
      featured: "Featured",
      available: "Available",
      unavailable: "Unavailable",
    },
  }

  const currentContent = content[language as keyof typeof content]

  // Filter and sort novels
  const filteredNovels = allNovels
    .filter((novel) => {
      const matchesSearch =
        novel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        novel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        novel.genre.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === "all" || novel.genre.includes(selectedGenre)
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        case "oldest":
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        case "popular":
          return b.reviews - a.reviews
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const featuredNovels = allNovels.filter((novel) => novel.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (language === "te") {
      const months = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"]
      return `${months[date.getMonth()]} ${date.getFullYear()}`
    }
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
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

  // Individual novel view
  if (selectedNovel) {
    const novel = allNovels.find((n) => n.id === selectedNovel)
    if (!novel) return null

    return (
      <PageLayout>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setSelectedNovel(null)}
              className="mb-8 border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white telugu-nav"
            >
              ← {currentContent.actions.backToList}
            </Button>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Book Cover */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <Image
                    src={novel.coverImage || "/placeholder.svg"}
                    alt={novel.title}
                    width={400}
                    height={600}
                    className="w-80 h-auto rounded-lg shadow-2xl border-4 border-white"
                  />
                  {novel.featured && (
                    <Badge className="absolute -top-2 -right-2 bg-[#0056D2] text-white">
                      <Star className="w-4 h-4 mr-1" />
                      {currentContent.featured}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 telugu-heading">{novel.title}</h1>
                  <p className="text-xl text-gray-600 mb-6 telugu-body">{novel.subtitle}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex">{renderStars(novel.rating)}</div>
                    <span className="text-lg font-semibold text-gray-900">{novel.rating}</span>
                    <span className="text-gray-600 telugu-nav">
                      ({novel.reviews} {currentContent.bookDetails.reviews})
                    </span>
                  </div>
                </div>

                {/* Book Info Grid */}
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700 telugu-nav">
                        {currentContent.bookDetails.pages}:
                      </span>
                      <span className="ml-2 text-gray-600">{novel.pages}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 telugu-nav">
                        {currentContent.bookDetails.published}:
                      </span>
                      <span className="ml-2 text-gray-600 telugu-body">{formatDate(novel.publishedDate)}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 telugu-nav">
                        {currentContent.bookDetails.genre}:
                      </span>
                      <span className="ml-2 text-gray-600 telugu-body">{novel.genre}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700 telugu-nav">
                        {currentContent.bookDetails.publisher}:
                      </span>
                      <span className="ml-2 text-gray-600 telugu-body">{novel.publisher}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">ISBN:</span>
                      <span className="ml-2 text-gray-600">{novel.isbn}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 telugu-nav">
                        {currentContent.bookDetails.language}:
                      </span>
                      <span className="ml-2 text-gray-600 telugu-body">{novel.language}</span>
                    </div>
                  </div>
                </div>

                {/* Awards */}
                {novel.awards.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 telugu-heading">
                      {currentContent.bookDetails.awards}
                    </h3>
                    <div className="space-y-2">
                      {novel.awards.map((award, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Award className="w-5 h-5 text-yellow-500" />
                          <span className="text-gray-700 telugu-body">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 telugu-heading">
                    {currentContent.bookDetails.price}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0056D2]">₹{novel.price.paperback}</div>
                      <div className="text-sm text-gray-600 telugu-nav">{currentContent.bookDetails.paperback}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0056D2]">₹{novel.price.ebook}</div>
                      <div className="text-sm text-gray-600 telugu-nav">{currentContent.bookDetails.ebook}</div>
                    </div>
                  </div>
                </div>

                {/* Purchase Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button
                      className="bg-[#0056D2] hover:bg-blue-700 text-white telugu-nav"
                      onClick={() => window.open(novel.purchaseLinks.amazon, "_blank")}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Amazon
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white telugu-nav"
                      onClick={() => window.open(novel.purchaseLinks.flipkart, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Flipkart
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white telugu-nav"
                      onClick={() => window.open(novel.purchaseLinks.publisher, "_blank")}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Publisher
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 telugu-heading">పుస్తకం గురించి</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed telugu-body mb-6">{novel.fullDescription}</p>

                {/* Excerpt */}
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#0056D2]">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 telugu-heading">నమూనా</h3>
                  <blockquote className="text-gray-700 italic telugu-body leading-relaxed">
                    "{novel.excerpt}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  // Main novels listing view
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0056D2] mb-2">{stats.totalNovels}</div>
              <div className="text-sm text-gray-600 telugu-nav">{currentContent.hero.totalNovels}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0056D2] mb-2">{stats.totalPages.toLocaleString()}</div>
              <div className="text-sm text-gray-600 telugu-nav">{currentContent.hero.totalPages}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0056D2] mb-2">{stats.totalReaders.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 telugu-nav">{currentContent.hero.totalReaders}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0056D2] mb-2">{stats.averageRating}</div>
              <div className="text-sm text-gray-600 telugu-nav">{currentContent.hero.averageRating}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Novels */}
      {featuredNovels.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center telugu-heading">
              {currentContent.featured} {currentContent.hero.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredNovels.map((novel) => (
                <Card key={novel.id} className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <div className="flex">
                    <div className="w-1/3 relative">
                      <Image
                        src={novel.coverImage || "/placeholder.svg"}
                        alt={novel.title}
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-[#0056D2] text-white">{currentContent.featured}</Badge>
                    </div>
                    <div className="w-2/3 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 telugu-heading">{novel.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 telugu-body">{novel.subtitle}</p>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">{renderStars(novel.rating)}</div>
                        <span className="text-sm text-gray-600">({novel.reviews})</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 telugu-body line-clamp-3">{novel.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-[#0056D2]">₹{novel.price.paperback}</div>
                        <Button
                          size="sm"
                          onClick={() => setSelectedNovel(novel.id)}
                          className="bg-[#0056D2] hover:bg-blue-700 text-white telugu-nav"
                        >
                          {currentContent.actions.viewDetails}
                        </Button>
                      </div>
                    </div>
                  </div>
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
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-40 telugu-nav">
                    <SelectValue placeholder={currentContent.filters.genre} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="telugu-nav">
                      {currentContent.genres.all}
                    </SelectItem>
                    <SelectItem value="social" className="telugu-nav">
                      {currentContent.genres.social}
                    </SelectItem>
                    <SelectItem value="family" className="telugu-nav">
                      {currentContent.genres.family}
                    </SelectItem>
                    <SelectItem value="rural" className="telugu-nav">
                      {currentContent.genres.rural}
                    </SelectItem>
                    <SelectItem value="youth" className="telugu-nav">
                      {currentContent.genres.youth}
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
                  <SelectItem value="rating" className="telugu-nav">
                    {currentContent.filters.rating}
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

      {/* All Novels */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {filteredNovels.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNovels.map((novel) => (
                <Card key={novel.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                  <div className="relative">
                    <Image
                      src={novel.coverImage || "/placeholder.svg"}
                      alt={novel.title}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    {novel.featured && (
                      <Badge className="absolute top-2 right-2 bg-[#0056D2] text-white">
                        <Star size={12} className="mr-1" />
                        {currentContent.featured}
                      </Badge>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge variant={novel.available ? "default" : "secondary"} className="bg-white text-gray-800">
                        {novel.available ? currentContent.available : currentContent.unavailable}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 leading-tight telugu-heading line-clamp-2">
                      {novel.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 telugu-body">{novel.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex">{renderStars(novel.rating)}</div>
                      <span className="text-sm text-gray-600">({novel.reviews})</span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed telugu-body line-clamp-3 text-sm">
                      {novel.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-lg font-bold text-[#0056D2]">₹{novel.price.paperback}</div>
                        <div className="text-xs text-gray-500 telugu-nav">{currentContent.bookDetails.paperback}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {novel.pages} {currentContent.bookDetails.pages}
                        </div>
                        <div className="text-xs text-gray-500 telugu-body">{formatDate(novel.publishedDate)}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedNovel(novel.id)}
                        className="flex-1 bg-[#0056D2] hover:bg-blue-700 text-white telugu-nav"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {currentContent.actions.viewDetails}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white"
                        onClick={() => window.open(novel.purchaseLinks.amazon, "_blank")}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
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
