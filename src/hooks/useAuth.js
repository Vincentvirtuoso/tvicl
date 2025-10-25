import { useState, useEffect, useCallback } from "react";
import axios from "../api/axiosInstance";

export const useAuth = () => {
  // ✅ Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("tvicl_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState({
    register: false,
    login: false,
    logout: false,
    verifyEmail: false,
    resendVerification: false,
    refreshToken: false,
    forgotPassword: false,
    resetPassword: false,
    getCurrentUser: false,
    updateProfile: false,
    changePassword: false,
  });

  const [error, setError] = useState(null);

  const setLoadingState = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Helpers
  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("tvicl_user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("tvicl_user");
    localStorage.removeItem("tvicl_token"); // ✅ remove token on logout
    delete axios.defaults.headers.common["Authorization"]; // ✅ detach token
  };


  // ==================== REGISTER ====================
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

  // ==================== LOGIN ====================
  const login = async (data) => {
  setLoadingState("login", true);
  setError(null);
  try {
    const res = await axios.post("/auth/login", data);

    // ✅ save both user + token
    saveUser(res.data.user);
    localStorage.setItem("tvicl_token", res.data.token);

    // ✅ attach token to axios by default
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || err.message);
    throw err;
  } finally {
    setLoadingState("login", false);
  }
};


  // ==================== LOGOUT ====================
  const logout = async () => {
    setLoadingState("logout", true);
    try {
      await axios.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed, clearing user locally anyway...");
    } finally {
      clearUser(); // ✅ Always remove from localStorage and state
      setLoadingState("logout", false);
    }
  };

  // ==================== VERIFY EMAIL ====================
  const verifyEmail = async (token) => {
    setLoadingState("verifyEmail", true);
    try {
      const res = await axios.get(`/auth/verify-email/${token}`);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoadingState("verifyEmail", false);
    }
  };

  // ==================== RESEND VERIFICATION ====================
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

  // ==================== REFRESH TOKEN ====================
  const refreshToken = async () => {
    setLoadingState("refreshToken", true);
    try {
      const res = await axios.post("/auth/refresh-token");
      return res.data;
    } catch (err) {
      logout();
    } finally {
      setLoadingState("refreshToken", false);
    }
  };

  // ==================== CURRENT USER ====================
  const getCurrentUser = useCallback(async () => {
    setLoadingState("getCurrentUser", true);
    try {
      const res = await axios.get("/auth/me");
      saveUser(res.data.user);
    } catch (err) {
      console.warn("Session expired or invalid token", err?.response?.status);
      // clearUser();
    } finally {
      setLoadingState("getCurrentUser", false);
    }
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("tvicl_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getCurrentUser(); // ✅ Now backend will accept /auth/me
    }
  }, []);



  // ==================== FORGOT PASSWORD ====================
  const forgotPassword = async (email) => {
    setLoadingState("forgotPassword", true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    } finally {
      setLoadingState("forgotPassword", false);
    }
  };

  // ==================== RESET PASSWORD ====================
  const resetPassword = async (token, password) => {
    setLoadingState("resetPassword", true);
    try {
      const res = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    } finally {
      setLoadingState("resetPassword", false);
    }
  };

  // ==================== UPDATE PROFILE ====================
  const updateProfile = async (data) => {
    setLoadingState("updateProfile", true);
    try {
      const res = await axios.put("/auth/profile", data);
      saveUser(res.data.user); // ✅ Update local copy
      return res.data;
    } finally {
      setLoadingState("updateProfile", false);
    }
  };

  // ==================== CHANGE PASSWORD ====================
  const changePassword = async (currentPassword, newPassword) => {
    setLoadingState("changePassword", true);
    try {
      const res = await axios.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return res.data;
    } finally {
      setLoadingState("changePassword", false);
    }
  };

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
    changePassword,
    getCurrentUser,
  };
};
