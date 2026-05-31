import api from "./axios";

export const productApi = {
  // Single endpoint: /products with ALL params as query params
  getAll: (params = {}) => {
    return api.get("/products", { params });
  },

  getById: (id) => api.get(`/products/${id}`),

  getCategories: () => api.get("/products/categories"),

  search: (query, params = {}) =>
    api.get(`/products/search`, {
      params: { q: query, ...params },
    }),
};
