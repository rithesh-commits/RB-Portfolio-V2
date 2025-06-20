export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
}

export interface Slug {
  _type: "slug"
  current: string
}

export interface HomePage {
  _id: string
  hero: {
    title: {
      te: string
      en: string
    }
    subtitle: {
      te: string
      en: string
    }
    image: SanityImage
  }
  featured: {
    blogTitle: string
    excerpt: string
    date: {
      te: string
      en: string
    }
    image: SanityImage
  }
  profile: {
    intro1: string
    intro2: string
    image: SanityImage
  }
  recent: BlogPost[]
}

export interface AboutPage {
  _id: string
  intro: {
    text1: string
    text2: string
    text3: string
  }
  timeline: Array<{
    year: string
    title: {
      te: string
      en: string
    }
    description: {
      te: string
      en: string
    }
    icon: string
  }>
  achievements: Array<{
    title: {
      te: string
      en: string
    }
    year: string
    description: {
      te: string
      en: string
    }
  }>
  philosophy: {
    quote: string
    points: string[]
  }
  heroImage: SanityImage
}

export interface Story {
  _id: string
  title: string
  excerpt: string
  content: any[] // Portable Text
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  featured: boolean
  image: SanityImage
  likes: number
  slug: Slug
}

export interface Novel {
  _id: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  coverImage: SanityImage
  publishedAt: string
  pages: number
  publisher: string
  isbn: string
  price: {
    paperback: number
    ebook: number
  }
  genre: string
  language: string
  awards: string[]
  rating: number
  reviews: number
  featured: boolean
  available: boolean
  purchaseLinks: {
    amazon: string
    flipkart: string
    publisher: string
  }
  excerpt: string
  slug: Slug
}

export interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: any[] // Portable Text
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  featured: boolean
  image: SanityImage
  author: string
  slug: Slug
}

export interface ContactPage {
  _id: string
  hero: {
    title: {
      te: string
      en: string
    }
    subtitle: {
      te: string
      en: string
    }
  }
  form: {
    title: {
      te: string
      en: string
    }
    subtitle: {
      te: string
      en: string
    }
  }
  info: {
    email: string
    phone: string
    location: {
      te: string
      en: string
    }
    availability: {
      te: string
      en: string
    }
  }
  social: Array<{
    name: string
    url: string
    icon: string
    description: {
      te: string
      en: string
    }
  }>
  collaboration: {
    title: {
      te: string
      en: string
    }
    subtitle: {
      te: string
      en: string
    }
    areas: Array<{
      title: {
        te: string
        en: string
      }
      description: {
        te: string
        en: string
      }
    }>
  }
}
