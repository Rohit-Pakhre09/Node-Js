import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { CATEGORY_COLORS } from '../api/constants'

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {blog.image ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          <FileText size={48} />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {blog.description?.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${CATEGORY_COLORS[blog.category] || 'bg-gray-100 text-gray-800'}`}>
            {blog.category}
          </span>
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
