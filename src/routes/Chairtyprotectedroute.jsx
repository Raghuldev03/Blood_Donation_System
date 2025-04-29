import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CharityProtectedRoute({ children }) {
    const user = useSelector((state) => state.auth.user);
    
  if (user?.isLoggedIn && user?.role === "charity") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default CharityProtectedRoute;
