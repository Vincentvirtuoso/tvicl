import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_TVICL_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- Global handlers (connected by useAuth) ----
let onUnauthorizedLogout = null;
let onTryRefresh = null;

export const setUnauthorizedLogoutHandler = (cb) => {
  onUnauthorizedLogout = cb;
};

export const setRefreshHandler = (cb) => {
  onTryRefresh = cb;
};

// ---- 401 Interceptor ----
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // No response → network error
    if (!err.response) {
      console.warn("Network offline or server unreachable");
      return Promise.reject(err);
    }

    // Handle 401 Unauthorized
    if (err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh to finish
        return new Promise((resolve) => {
          refreshSubscribers.push(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (onTryRefresh) {
          await onTryRefresh(); // call useAuth's refreshToken()
        }
        onRefreshed();
        return api(originalRequest); // retry failed request
      } catch (refreshErr) {
        console.warn("Token refresh failed, logging out...");
        if (onUnauthorizedLogout) onUnauthorizedLogout();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
