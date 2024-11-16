import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import  {useNavigate} from "react-router-dom"

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const navigate=useNavigate();

  // If the user is not authenticated and is not on login or register page, redirect to login
  if (
    !isAuthenticated &&
    !(location.pathname.includes('/login') || location.pathname.includes('/'))
  ) {
    console.log("active");
    
     navigate("/");
  }

  // If the user is authenticated and on login or register page, redirect based on role
  if (
    isAuthenticated &&
    (location.pathname.includes('/login') || location.pathname.includes('/'))
  ) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If a non-admin user tries to access an admin page, redirect to unauthorized page
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
    return <Navigate to="/unauthpage" />;
  }

  // If an admin user tries to access a shop page, redirect to admin dashboard
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Render children if none of the above conditions match
  return <>{children}</>;
};

export default CheckAuth;
