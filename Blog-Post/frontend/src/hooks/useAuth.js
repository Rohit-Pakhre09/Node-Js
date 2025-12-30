import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.context';

export const useAuth = () => useContext(AuthContext);
