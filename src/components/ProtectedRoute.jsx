// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom"; // or "next/router" if Next.js
import { useAuth } from "../store/auth";

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Logged in but role not allowed → redirect to unauthorized or home
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // allowed
};

export default ProtectedRoute;
