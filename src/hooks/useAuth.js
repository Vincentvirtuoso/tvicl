import { useState, useEffect, useCallback } from "react";
import axios from "../api/axiosInstance";

export const useAuth = () => {
  // ------------------- State -------------------
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("tvicl_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const setLoadingState = (key, value) =>
    setLoading((prev) => ({ ...prev, [key]: value }));

  // ------------------- Helpers -------------------
  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("tvicl_user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("tvicl_user");
    delete axios.defaults.headers.common["Authorization"];
  };

  // ------------------- REGISTER -------------------
  const register = async (data) => {
    setLoadingState("register", true);
    setError(null);
    try {
      const res = await axios.post("/auth/register", data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoadingState("register", false);
    }
  };

  // ------------------- LOGIN -------------------
  const login = async (data) => {
    setLoadingState("login", true);
    setError(null);
    try {
      const res = await axios.post("/auth/login", data);

      // Save user; token is via HTTP-only cookies
      saveUser(res.data.user);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoadingState("login", false);
    }
  };

  // ------------------- LOGOUT -------------------
  const logout = async () => {
    setLoadingState("logout", true);
    try {
      await axios.post("/auth/logout");
    } catch {
      console.warn("Logout failed, clearing user locally");
    } finally {
      clearUser();
      setLoadingState("logout", false);
    }
  };

  // ------------------- VERIFY EMAIL -------------------
  const verifyEmail = async (token) => {
    setLoadingState("verifyEmail", true);
    try {
      const res = await axios.get(`/auth/verify-email/${token}`);
      saveUser(res.data.user); // update user state if verified
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoadingState("verifyEmail", false);
    }
  };

  const resendVerificationEmail = async (email) => {
    setLoadingState("resendVerification", true);
    try {
      const res = await axios.post("/auth/resend-verification", { email });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoadingState("resendVerification", false);
    }
  };

  // ------------------- REFRESH TOKEN -------------------
  const refreshToken = async () => {
    setLoadingState("refreshToken", true);
    try {
      await axios.post("/auth/refresh-token");
    } catch {
      logout();
    } finally {
      setLoadingState("refreshToken", false);
    }
  };

  // ------------------- CURRENT USER -------------------
  const getCurrentUser = useCallback(async () => {
    setLoadingState("getCurrentUser", true);
    try {
      const res = await axios.get("/auth/me");
      saveUser({ ...res.data.user, isUnauthorized: false });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        saveUser({ isUnauthorized: true, ...user });
        console.warn("Unauthorized: token invalid or expired");
      } else if (!err.response) {
        console.warn("Network error, keeping current user state", err.message);
      } else {
        setTimeout(getCurrentUser, 3000); // retry after delay
        console.warn("Error fetching current user", status, err.message);
      }
    } finally {
      setLoadingState("getCurrentUser", false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("tvicl_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getCurrentUser();
    }
  }, []);

  // ------------------- FORGOT / RESET PASSWORD -------------------
  const forgotPassword = async (email) => {
    setLoadingState("forgotPassword", true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      return res.data;
    } finally {
      setLoadingState("forgotPassword", false);
    }
  };

  const resetPassword = async (token, password) => {
    setLoadingState("resetPassword", true);
    try {
      const res = await axios.post(`/auth/reset-password/${token}`, { password });
      return res.data;
    } finally {
      setLoadingState("resetPassword", false);
    }
  };

  // ------------------- UPDATE PROFILE -------------------
  const updateProfile = async (data) => {
    setLoadingState("updateProfile", true);
    try {
      const res = await axios.put("/auth/profile", data);
      saveUser(res.data.user);
      return res.data;
    } finally {
      setLoadingState("updateProfile", false);
    }
  };

  // ------------------- UPDATE ROLE -------------------
  const updateRole = async ({ role, makeActive }) => {
    if (!user) throw new Error("Not authenticated");
    setLoadingState("updateRole", true);
    try {
      const { data } = await axios.patch("/users/role", { role, makeActive });
      saveUser({ ...user, roles: data.roles, activeRole: data.activeRole });
      return data;
    } finally {
      setLoadingState("updateRole", false);
    }
  };

  // ------------------- CHANGE PASSWORD -------------------
  const changePassword = async (currentPassword, newPassword) => {
    setLoadingState("changePassword", true);
    try {
      const res = await axios.put("/auth/change-password", { currentPassword, newPassword });
      return res.data;
    } finally {
      setLoadingState("changePassword", false);
    }
  };

  // ------------------- Return Hook API -------------------
  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    verifyEmail,
    resendVerificationEmail,
    refreshToken,
    forgotPassword,
    resetPassword,
    updateProfile,
    updateRole,
    changePassword,
    getCurrentUser,
  };
};
