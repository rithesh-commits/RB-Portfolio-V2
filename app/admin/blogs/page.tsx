"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2 } from 'lucide-react'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/ravi_blogs')
      if (!res.ok) {
        setError('Failed to fetch blogs')
        setLoading(false)
        return
      }
      const data = await res.json()
      setBlogs(data)
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  function handleEdit(id: string) {
    // TODO: Implement edit functionality (open edit form or page)
    alert('Edit blog: ' + id)
  }

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this blog?')) return
    fetch(`/api/ravi_blogs/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => setBlogs(blogs.filter(b => b.id !== id)))
      .catch(() => alert('Failed to delete blog'))
  }

  function handleAdd() {
    // TODO: Implement add new blog functionality (open form or page)
    alert('Add new blog (form coming soon)')
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 py-4 md:py-12 md:max-w-5xl pb-24 md:pb-24">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h1 className="text-lg md:text-2xl font-bold">Admin: Manage Blogs</h1>
        <Button onClick={handleAdd} className="bg-[#0056D2] text-white w-full sm:w-auto text-xs md:text-base px-3 py-2 md:px-4 md:py-2 h-8 md:h-10">+ Add New Blog</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          {/* Mobile: Card/List layout */}
          <div className="flex flex-col gap-2 md:hidden">
            {blogs.map(blog => (
              <div key={blog.id} className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs truncate max-w-[120px]">{blog.title_en} <span className="text-gray-400">/ {blog.title_te}</span></div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-[10px] px-2 py-0.5 ${blog.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`}>{blog.status}</Badge>
                    {blog.published_at && <span className="text-[10px] text-gray-500">{new Date(blog.published_at).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button size="icon" variant="outline" className="h-7 w-7 p-0" onClick={() => handleEdit(blog.id)} title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleDelete(blog.id)} title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {blogs.length === 0 && <div className="text-xs text-gray-400 text-center py-8">No blogs found.</div>}
          </div>
          {/* Desktop: Table layout */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:bg-gray-900 w-full hidden md:block">
            <table className="w-full min-w-0 text-xs md:text-base">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">Title</th>
                  <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">Status</th>
                  <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">Published</th>
                  <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="px-2 py-2 font-medium whitespace-nowrap max-w-[120px] truncate">{blog.title_en} <span className="text-gray-400">/ {blog.title_te}</span></td>
                    <td className="px-2 py-2">
                      <Badge className={`text-[10px] md:text-xs px-2 py-1 ${blog.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`}>{blog.status}</Badge>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : <span className="text-gray-400">(draft)</span>}</td>
                    <td className="px-2 py-2 flex gap-1 flex-wrap">
                      <Button size="icon" variant="outline" className="h-7 w-7 p-0" onClick={() => handleEdit(blog.id)} title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleDelete(blog.id)} title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
} 