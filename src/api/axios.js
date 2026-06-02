import axios from "axios";
import Swal from "sweetalert2";
import { session } from "@/utils/session";
const Language = localStorage.getItem("locale") || "en";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
    "Accept-lang": Language,
  },
});

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/users/add",
  "/products", // GET /products, /products/search, /products/categories
  "/products/search",
  "/products/categories",
  "/products/category",
  "/category", // if your store uses /category-list or similar
];

api.interceptors.request.use(
  (config) => {
    const url = String(config.url || "");
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));

    if (!isPublic && !session.isValid()) {
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    const saved = session.get();
    if (saved?.token) {
      config.headers.Authorization = `Bearer ${saved.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response?.status === 401) {
      session.remove();
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
