// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // Admin + teacher only for upload
  if (window.location.pathname === "/upload" && role !== "admin" && role !== "teacher") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
