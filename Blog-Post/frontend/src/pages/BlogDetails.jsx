import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { User, Tag } from 'lucide-react'
import { API_URL, CATEGORY_COLORS } from '../api/constants'

const BlogDetails = () => {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const { blogId } = useParams()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/blogs/${blogId}`)
                // Handle potential response structures (direct object or wrapped in 'blog' key)
                if (response.data.blog) {
                    setBlog(response.data.blog)
                } else {
                    setBlog(response.data)
                }
            } catch (error) {
                console.error('Error fetching blog:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
    }, [blogId])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-12 flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Blog not found</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {blog.image && (
                        <div className="w-full h-64 md:h-96 overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 md:p-10">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${CATEGORY_COLORS[blog.category] || 'bg-blue-50 text-blue-700'}`}>
                            <Tag size={14} />
                            {blog.category}
                        </div>
                        <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{blog.author?.name || 'Unknown Author'}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {blog.description.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
                </article>
            </div>
        </div>
  )
}

export default BlogDetails
