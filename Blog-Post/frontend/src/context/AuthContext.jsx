import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/constants';
import { AuthContext } from './auth'; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/checkauth`, { withCredentials: true });
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/login`, { email, password }, { withCredentials: true });
    setUser(response.data.user);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
    return response.data;
  };

  const logout = async () => {
    await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
