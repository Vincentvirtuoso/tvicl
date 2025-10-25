import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useProtectedRoute = () => {
  const { user, loading, refreshToken, getCurrentUser, logout } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        try {
          await refreshToken();
          await getCurrentUser();
        } catch (err) {
          console.log(err);

          logout();
          navigate("/login");
        }
      }
      setAuthChecked(true);
    };

    if (!loading) {
      checkAuth();
    }
  }, [user, loading, refreshToken, getCurrentUser, logout, navigate]);

  return { user, loading, authChecked };
};
