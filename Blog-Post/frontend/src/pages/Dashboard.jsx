import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { PlusCircle, Edit2, Trash2, FileText } from 'lucide-react'
import { API_URL, CATEGORY_COLORS } from '../api/constants'
import ConfirmationModal from '../components/ConfirmationModal'

const Dashboard = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null)

  useEffect(() => {
    fetchUserBlogs()
  }, [])

  const fetchUserBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/user`, { withCredentials: true })
      setBlogs(response.data.blogs)
    } catch (error) {
      console.error('Error fetching user blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (blogId) => {
    setBlogToDelete(blogId)
    setIsModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsModalOpen(false)
    setBlogToDelete(null)
  }

  const confirmDelete = async () => {
    if (!blogToDelete) return
    try {
      await axios.delete(`${API_URL}/api/blogs/delete/${blogToDelete}`, { withCredentials: true })
      setBlogs(blogs.filter((blog) => blog._id !== blogToDelete))
    } catch (error) {
      console.error('Error deleting blog:', error)
    } finally {
      closeDeleteModal()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your stories and account</p>
          </div>
          <Link
            to="/create-blog"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <PlusCircle size={20} />
            Create New Blog
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading your blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FileText size={24} className="text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No stories yet</h3>
            <p className="text-gray-500 mt-1 mb-6">You haven't published any blogs yet.</p>
            <Link to="/create-blog" className="text-blue-600 font-medium hover:underline">
              Write your first story
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                   {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                   ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FileText size={48} />
                    </div>
                   )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${CATEGORY_COLORS[blog.category] || 'bg-blue-100 text-blue-800'}`}>
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(blog._id)}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  )
}

export default Dashboard
