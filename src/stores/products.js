import { defineStore } from "pinia";
import { ref } from "vue";
import { productApi } from "@/api/products";

const normalizeProduct = (p) => ({
  id: p.id,
  name: p.title,
  price: p.price,
  oldPrice: p.discountPercentage
    ? Math.round(p.price / (1 - p.discountPercentage / 100))
    : null,
  discount: Math.round(p.discountPercentage || 0),
  description: p.description,
  category: p.category,
  image: p.thumbnail,
  images: p.images || [p.thumbnail],
  rating: p.rating || 0,
  reviews: Math.floor(Math.random() * 200) + 5,
  stock: p.stock,
  brand: p.brand,
});

export const useProductsStore = defineStore("products", () => {
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const currentProduct = ref(null);
  const filters = ref({
    category: null,
    minPrice: null,
    maxPrice: null,
    sort: "newest",
  });

  const fetchProducts = async (params = {}) => {
    loading.value = true;
    try {
      const { data } = await productApi.getAll(params);
      const rawProducts = data.products || [];
      products.value = rawProducts.map(normalizeProduct);
      return products.value;
    } catch (err) {
      console.error("Failed to fetch products:", err);
      products.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchPaginated = async (limit = 12, skip = 0) => {
    loading.value = true;
    try {
      const { data } = await productApi.getAll({ limit, skip });
      const rawProducts = data.products || [];
      return rawProducts.map(normalizeProduct);
    } catch (err) {
      console.error("Failed to fetch paginated:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (id) => {
    loading.value = true;
    try {
      const { data } = await productApi.getById(id);
      currentProduct.value = normalizeProduct(data);
      return currentProduct.value;
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    const { data } = await productApi.getCategories();
    categories.value = Array.isArray(data)
      ? data.map((c) => {
          if (typeof c === "string") return { slug: c, name: c };
          return { slug: c.slug || c, name: c.name || c.slug || c };
        })
      : [];
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  return {
    products,
    categories,
    loading,
    currentProduct,
    filters,
    fetchProducts,
    fetchPaginated,
    fetchProductById,
    fetchCategories,
    setFilters,
  };
});
