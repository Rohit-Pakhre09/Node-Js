import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { PenSquare, LogOut, Menu, X, User } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-blue-600 text-white p-1 rounded-lg">BS</span>
              BlogSpace
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link
                  to="/create-blog"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <PenSquare size={18} />
                  Write
                </Link>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {user.name?.charAt(0).toUpperCase() || <User size={16} />}
                    </div>
                    <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                  Sign In
                </Link>
                <Link to="/register" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Dashboard
                </Link>
                <Link to="/create-blog" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Write a Story
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Sign In
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
