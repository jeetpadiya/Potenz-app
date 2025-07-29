// src/components/ProtectedRoute.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginScreen from './LoginScreen';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return children;
};

export default ProtectedRoute;