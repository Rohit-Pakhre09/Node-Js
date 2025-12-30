import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import BlogDetails from './pages/BlogDetails'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/edit-blog/:blogId" element={<EditBlog />} />
      <Route path="/blog/:blogId" element={<BlogDetails />} />
    </Routes>
  )
}

export default App
