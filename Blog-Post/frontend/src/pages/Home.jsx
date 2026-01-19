import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
import Navbar from '../components/Navbar'
import { Sparkles, FileText } from 'lucide-react'
import { API_URL } from '../api/constants'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`)
      if (Array.isArray(response.data)) {
        setBlogs(response.data)
      } else if (response.data && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>Discover Unique Perspectives</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Welcome to <span className="text-blue-600">BlogSpace</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A place where ideas grow. Read, write, and connect with a community of thinkers and creators.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gray-50 rounded-full">
                <FileText size={32} className="text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No blogs yet</h3>
            <p className="text-gray-500">Be the first to share your story!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
