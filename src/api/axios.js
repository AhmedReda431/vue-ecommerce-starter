import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      window.location.href = "/login";
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again",
      });
    }

    if (response?.status >= 500) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    }

    return Promise.reject(error);
  },
);

export default api;
