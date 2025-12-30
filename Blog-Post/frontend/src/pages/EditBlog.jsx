import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { API_URL, CATEGORIES } from '../api/constants'

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  })
  const [currentImage, setCurrentImage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const { blogId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs/${blogId}`, { withCredentials: true })
        const blog = response.data.blog || response.data
        setFormData({
          title: blog.title,
          description: blog.description,
          category: blog.category,
          image: null
        })
        setCurrentImage(blog.image)
      } catch (error) {
        console.error('Error fetching blog:', error)
        setError('Failed to load blog')
      } finally {
        setFetchLoading(false)
      }
    }
    fetchBlog()
  }, [blogId])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('category', formData.category)
    if (formData.image) {
      data.append('image', formData.image)
    }

    try {
      await axios.put(`${API_URL}/api/blogs/update/${blogId}`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update blog')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading blog...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Blog</h1>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Current Image
              </label>
              {currentImage && (
                <img
                  src={currentImage}
                  alt="Current blog image"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Update Image (optional)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Updating Blog...' : 'Update Blog'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBlog
