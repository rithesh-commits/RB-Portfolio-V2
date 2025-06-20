"use client"

import React from 'react'
import Image from 'next/image'

type NotionBlock = {
  id: string
  type: string
  [key: string]: any
}

interface NotionContentProps {
  blocks: NotionBlock[]
}

const getYouTubeVideoId = (url: string) => {
  let videoId = '';
  const patterns = [
    /(?:https)?:?\/?\/?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
  ];
  patterns.forEach((pattern) => {
    const match = url.match(pattern);
    if (match && match[1]) {
      videoId = match[1];
    }
  });
  return videoId.split('&')[0];
};

// Helper function to render rich text
const renderRichText = (richText: any[]) => {
  if (!richText || richText.length === 0) return null

  return richText.map((text, index) => {
    const content = text.plain_text
    let element = content

    if (text.annotations.bold) {
      element = <strong key={index}>{element}</strong>
    }
    if (text.annotations.italic) {
      element = <em key={index}>{element}</em>
    }
    if (text.annotations.strikethrough) {
      element = <del key={index}>{element}</del>
    }
    if (text.annotations.underline) {
      element = <u key={index}>{element}</u>
    }
    if (text.annotations.code) {
      element = <code key={index} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">{element}</code>
    }
    if (text.href) {
      element = <a key={index} href={text.href} className="text-[#0056D2] hover:underline" target="_blank" rel="noopener noreferrer">{element}</a>
    }

    return element
  })
}

// Helper function to get image URL
const getImageUrl = (block: any) => {
  if (block.type === 'image') {
    if (block.image.type === 'file') {
      return block.image.file.url
    } else if (block.image.type === 'external') {
      return block.image.external.url
    }
  }
  return null
}

export default function NotionContent({ blocks }: NotionContentProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No content available for this blog post.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {blocks.map((block) => {
        const { id, type } = block

        switch (type) {
          case 'paragraph': {
            const isLinkOnly =
              block.paragraph.rich_text.length === 1 &&
              block.paragraph.rich_text[0].href;

            if (!isLinkOnly) {
              return (
                <p key={id} className="mb-4 leading-relaxed">
                  {renderRichText(block.paragraph?.rich_text)}
                </p>
              );
            }

            const url = block.paragraph.rich_text[0].href;
            const hasGoodPreview = block.preview && block.preview.images && block.preview.images.length > 0;
            
            if (hasGoodPreview) {
              const { images, title, description, siteName, favicons } = block.preview;
              return (
                <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="group my-6 block shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row gap-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
                      <Image src={images[0]} alt={title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#0056D2]">{title}</div>
                      {description && (<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>)}
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-500">
                        {favicons && favicons.length > 0 && (<Image src={favicons[0]} alt={`${siteName} favicon`} width={14} height={14} className="object-contain" />)}
                        <span>{siteName || new URL(url).hostname}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }

            // Fallback for links without a good preview
            return (
              <div key={id} className="my-4">
                <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-px">
                  <div className="text-sm text-[#0056D2] truncate flex items-center gap-2">
                    <Image src={`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`} alt="favicon" width={16} height={16} />
                    {url}
                  </div>
                </a>
              </div>
            );
          }

          case 'heading_1':
            return (
              <h1 key={id} className="text-3xl font-bold mb-6 mt-8 text-gray-900 dark:text-white">
                {renderRichText(block.heading_1?.rich_text)}
              </h1>
            )

          case 'heading_2':
            return (
              <h2 key={id} className="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-white">
                {renderRichText(block.heading_2?.rich_text)}
              </h2>
            )

          case 'heading_3':
            return (
              <h3 key={id} className="text-xl font-bold mb-3 mt-5 text-gray-900 dark:text-white">
                {renderRichText(block.heading_3?.rich_text)}
              </h3>
            )

          case 'bulleted_list_item':
            return (
              <ul key={id} className="list-disc list-inside mb-4 space-y-1">
                <li className="text-gray-700 dark:text-gray-300">
                  {renderRichText(block.bulleted_list_item?.rich_text)}
                </li>
              </ul>
            )

          case 'numbered_list_item':
            return (
              <ol key={id} className="list-decimal list-inside mb-4 space-y-1">
                <li className="text-gray-700 dark:text-gray-300">
                  {renderRichText(block.numbered_list_item?.rich_text)}
                </li>
              </ol>
            )

          case 'quote':
            return (
              <blockquote key={id} className="border-l-4 border-[#0056D2] pl-4 py-2 my-6 bg-gray-50 dark:bg-gray-800 rounded-r">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {renderRichText(block.quote?.rich_text)}
                </p>
              </blockquote>
            )

          case 'code':
            return (
              <pre key={id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {block.code?.rich_text?.[0]?.plain_text || ''}
                </code>
              </pre>
            )

          case 'video':
            const videoUrl = block.video?.type === 'external' ? block.video.external.url : null
            if (videoUrl) {
              // Specifically for YouTube
              if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
                const videoId = videoIdMatch ? videoIdMatch[1] : null

                if (videoId) {
                  return (
                    <div key={id} className="my-6">
                      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full"
                          title="YouTube video player"
                        />
                      </div>
                    </div>
                  )
                }
              }
            }
            // Fallback for other video types or if parsing fails
            return block.video?.external?.url ? (
              <a href={block.video.external.url} target="_blank" rel="noopener noreferrer">{block.video.external.url}</a>
            ) : null
          
          case 'embed': {
            const url = block.embed?.url;
            if (!url) return null;

            // Specific handling for YouTube to make it responsive
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
              return (
                <div key={id} className="my-6 aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      url
                    )}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              );
            }

            const hasGoodPreview =
              block.preview &&
              block.preview.images &&
              block.preview.images.length > 0;

            if (hasGoodPreview) {
              const { images, title, description, siteName, favicons } =
                block.preview;
              return (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group my-6 block shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row gap-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
                      <Image
                        src={images[0]}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#0056D2]">
                        {title}
                      </div>
                      {description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-500">
                        {favicons && favicons.length > 0 && (
                          <Image
                            src={favicons[0]}
                            alt={`${siteName} favicon`}
                            width={14}
                            height={14}
                            className="object-contain"
                          />
                        )}
                        <span>{siteName || new URL(url).hostname}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }

            // Fallback for embeds that are not youtube or have no good preview
            return (
              <div key={id} className="my-4">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-px"
                >
                  <div className="text-sm text-[#0056D2] truncate flex items-center gap-2">
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(url).hostname
                      }`}
                      alt="favicon"
                      width={16}
                      height={16}
                    />
                    {url}
                  </div>
                </a>
              </div>
            );
          }

          case 'image':
            const imageUrl = getImageUrl(block)
            if (imageUrl) {
              return (
                <div key={id} className="my-6">
                  <div className="relative max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md">
                    <Image
                      src={imageUrl}
                      alt={block.image?.caption?.[0]?.plain_text || 'Blog image'}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 90vw, 768px"
                    />
                  </div>
                  {block.image?.caption && block.image.caption.length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                      {block.image.caption[0].plain_text}
                    </p>
                  )}
                </div>
              )
            }
            return null

          case 'callout':
            return (
              <div key={id} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    {renderRichText(block.callout?.rich_text)}
                  </div>
                </div>
              </div>
            )

          case 'divider':
            return <hr key={id} className="my-8 border-gray-200 dark:border-gray-700" />

          case 'bookmark': {
            const url = block.bookmark?.url;
            if (!url) return null;

            const hasGoodPreview = block.preview && block.preview.images && block.preview.images.length > 0;

            if (hasGoodPreview) {
              const { images, title, description, siteName, favicons } = block.preview;
              return (
                <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="group my-6 block shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row gap-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
                      <Image src={images[0]} alt={title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#0056D2]">{title}</div>
                      {description && (<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>)}
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-500">
                        {favicons && favicons.length > 0 && (<Image src={favicons[0]} alt={`${siteName} favicon`} width={14} height={14} className="object-contain" />)}
                        <span>{siteName || new URL(url).hostname}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }
            
            // Fallback to the simple bookmark style
            return (
              <div key={id} className="my-4">
                <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-px">
                  <div className="text-sm text-[#0056D2] truncate flex items-center gap-2">
                    <Image src={`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`} alt="favicon" width={16} height={16} />
                    {url}
                  </div>
                </a>
              </div>
            );
          }

          default:
            return null
        }
      })}
    </div>
  )
} 