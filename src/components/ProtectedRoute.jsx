import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullScreenLoader from "./common/FullScreenLoader";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1️⃣ Still loading user info
  if (loading.getCurrentUser) {
    return <FullScreenLoader />;
  }

  // 2️⃣ User not logged in
  if (!user) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location, action: "login" }}
        replace
      />
    );
  }

  // 3️⃣ User email not verified
  if (!user.verified) {
    return <Navigate to="/auth/verify-notice" replace />;
  }

  // 4️⃣ Role mismatch protection
  if (allowedRoles) {
    const hasAllowedRole = user.roles?.some((r) => allowedRoles.includes(r));

    // User does not have the required role
    if (!hasAllowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    // User has the role, but activeRole doesn't match
    if (user?.activeRole && !allowedRoles.includes(user.activeRole)) {
      return (
        <Navigate
          to="/unauthorized"
          state={{
            reason:
              "Active role mismatch — please switch your active role to access this section.",
          }}
          replace
        />
      );
    }
  }

  return children;
};

export default ProtectedRoute;
