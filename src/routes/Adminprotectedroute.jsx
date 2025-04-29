import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const role = useSelector((state) => state.auth.user.role);

  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminProtectedRoute;
