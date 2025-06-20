import { PortableText, type PortableTextComponents } from "@portabletext/react"
import Image from "next/image"

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={value?.asset?._ref ? value.asset.url : "/placeholder.svg"}
            alt={value.alt || "Image"}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.caption && <p className="text-sm text-gray-600 text-center mt-2">{value.caption}</p>}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 telugu-heading">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 telugu-heading">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-3 telugu-heading">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mb-2 telugu-heading">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed telugu-body">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#0056D2] pl-4 my-6 italic text-gray-700 telugu-body">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-[#0056D2] hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="telugu-body">{children}</li>,
    number: ({ children }) => <li className="telugu-body">{children}</li>,
  },
}

interface PortableTextRendererProps {
  content: any[]
  className?: string
}

export default function PortableTextRenderer({ content, className = "" }: PortableTextRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  )
}
