import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toast } from "@/plugins/sweetalert";

export const useFavoritesStore = defineStore("favorites", () => {
  const items = ref(JSON.parse(localStorage.getItem("favorites") || "[]"));

  const totalFavorites = computed(() => items.value.length);

  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(items.value));
  };

  const toggleFavorite = (product) => {
    const index = items.value.findIndex((item) => item.id === product.id);
    if (index > -1) {
      items.value.splice(index, 1);
      toast.fire({ icon: "info", title: "Removed from favorites" });
    } else {
      items.value.push(product);
      toast.fire({ icon: "success", title: "Added to favorites" });
    }
    saveFavorites();
  };

  const isFavorite = (productId) => {
    return items.value.some((item) => item.id === productId);
  };

  const removeFavorite = (productId) => {
    items.value = items.value.filter((item) => item.id !== productId);
    saveFavorites();
  };

  return {
    items,
    totalFavorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  };
});
