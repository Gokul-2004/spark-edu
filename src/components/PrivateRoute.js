// src/components/PrivateRoute.js
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
