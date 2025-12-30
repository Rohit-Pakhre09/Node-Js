import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/constants';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/blogs`, 
        { title, content },
        { withCredentials: true }
      );
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" rows="10" onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit" className="cursor-pointer">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;