import axios from "axios";

const BASE_URL = import.meta.env.VITE_TVICL_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!err.response) {
      console.warn("Network offline or server unreachable");
    } else {
      if (err.response.status === 401) {
        // alert("unauthorized");
      }
    }
    return Promise.reject(err);
  }
);

export default api;
