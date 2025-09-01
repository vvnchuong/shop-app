// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Chưa đăng nhập -> về login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Có đăng nhập nhưng role không hợp lệ -> về trang 403
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return element; // Cho phép vào
};

export default ProtectedRoute;
