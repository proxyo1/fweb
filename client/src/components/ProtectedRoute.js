import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // User is not logged in and will be redirected to the login page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
