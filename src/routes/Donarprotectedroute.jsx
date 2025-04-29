import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DonarProtectedRoute({ children }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth.user);

  if (isLoggedIn && role === "donor") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default DonarProtectedRoute;
