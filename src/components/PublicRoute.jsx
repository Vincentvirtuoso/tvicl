import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullScreenLoader from "./common/FullScreenLoader";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication status
  if (loading.getCurrentUser) {
    return <FullScreenLoader />;
  }

  // Redirect authenticated users to their intended destination
  if (user && user.verified) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // Render the public page for unauthenticated users
  return <>{children}</>;
};

export default PublicRoute;
