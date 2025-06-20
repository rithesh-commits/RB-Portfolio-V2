import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'article' | 'website'
  publishedTime?: string
  author?: string
  tags?: string[]
  readingTime?: number
}

export default function SEOMetaTags({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  author = 'Ravindar Bejjarapu',
  tags = [],
  readingTime
}: SEOProps) {
  // Default image if none provided
  const defaultImage = '/placeholder-logo.png'
  const ogImage = image || defaultImage
  const fullUrl = url ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}${url}` : process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  // Social media handles from environment variables
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@yourtwitterhandle'
  const githubHandle = process.env.NEXT_PUBLIC_GITHUB_HANDLE || 'yourgithubhandle'
  const linkedinHandle = process.env.NEXT_PUBLIC_LINKEDIN_HANDLE || 'yourlinkedinhandle'

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      
      {/* Keywords from tags */}
      {tags.length > 0 && (
        <meta name="keywords" content={tags.join(', ')} />
      )}

      {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ravindar Bejjarapu - Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Reading time for articles */}
      {readingTime && (
        <meta name="article:reading_time" content={readingTime.toString()} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data for Blog Posting */}
      {type === 'article' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": title,
              "description": description,
              "image": ogImage,
              "author": {
                "@type": "Person",
                "name": author,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/about`,
                "sameAs": [
                  `https://twitter.com/${twitterHandle.replace('@', '')}`,
                  `https://github.com/${githubHandle}`,
                  `https://linkedin.com/in/${linkedinHandle}`
                ]
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ravindar Bejjarapu",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/placeholder-logo.png`
                }
              },
              "datePublished": publishedTime,
              "dateModified": publishedTime,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": fullUrl
              },
              "keywords": tags.join(', '),
              "wordCount": description.length,
              "timeRequired": readingTime ? `PT${readingTime}M` : undefined
            })
          }}
        />
      )}

      {/* Structured Data for Website */}
      {type === 'website' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ravindar Bejjarapu - Portfolio",
              "description": "Personal portfolio and blog featuring Telugu content, stories, novels, and technical insights.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
              "author": {
                "@type": "Person",
                "name": author,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/about`,
                "sameAs": [
                  `https://twitter.com/${twitterHandle.replace('@', '')}`,
                  `https://github.com/${githubHandle}`,
                  `https://linkedin.com/in/${linkedinHandle}`
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      )}
    </Head>
  )
} 