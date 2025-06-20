import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function getNotionBlogs() {
  const databaseId = process.env.NOTION_DATABASE_ID!
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published"
      }
    },
    sorts: [
      {
        property: "Published Date",
        direction: "descending"
      }
    ]
  })
  return response.results
}

export async function getNotionBlog(blogId: string) {
  try {
    const response = await notion.pages.retrieve({
      page_id: blogId,
    })
    return response
  } catch (error) {
    console.error('Error fetching single blog:', error)
    return null
  }
}

// Fetch blog content blocks
export async function getNotionBlogContent(blogId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: blogId,
    })
    return response.results
  } catch (error) {
    console.error('Error fetching blog content:', error)
    return []
  }
}

// Enhanced blog mapping function with more fields
export function mapNotionBlog(blog: any) {
  const getFileUrl = (fileObject: any) => {
    if (!fileObject || fileObject.length === 0) return null;
    const file = fileObject[0];
    if (file.type === "file") return file.file.url;
    if (file.type === "external") return file.external.url;
    return null;
  };

  return {
    id: blog.id,
    title: blog.properties.Title?.title?.[0]?.plain_text || "Untitled",
    summary: blog.properties.Summary?.rich_text?.[0]?.plain_text || "",
    publishedDate: blog.properties["Published Date"]?.date?.start || "",
    coverImage: getFileUrl(blog.properties["Cover Photo"]?.files),
    category: blog.properties.Category?.select?.name || null,
    author: blog.properties.Author?.rich_text?.[0]?.plain_text || "Ravindar Bejjarapu",
    readingTime: blog.properties["Reading Time"]?.number || 5,
    tags: blog.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    slug: blog.properties.Slug?.rich_text?.[0]?.plain_text || blog.id,
    featured: blog.properties.Featured?.checkbox || false,
    excerpt: blog.properties.Excerpt?.rich_text?.[0]?.plain_text || "",
  }
} 