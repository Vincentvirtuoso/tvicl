import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullScreenLoader from "./common/FullScreenLoader";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1️⃣ Show loading while fetching user data

  if (loading.getCurrentUser) {
    return <FullScreenLoader />;
  }


  // 2️⃣ User not logged in
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 3️⃣ User email not verified
  if (user && !user.verified) {
    return <Navigate to="/auth/verify-notice" replace />;
  }

  // 4️⃣ User role not allowed (if allowedRoles is provided)
  if (allowedRoles && !user.roles?.some( u => allowedRoles.includes(u))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
