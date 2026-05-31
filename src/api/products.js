import api from "./axios";

export const productApi = {
  getAll: (params = {}) => {
    if (params.category) {
      return api.get(
        `/products/category/${encodeURIComponent(params.category)}`,
      );
    }
    return api.get("/products", { params });
  },
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get("/products/categories"),
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`),
};
