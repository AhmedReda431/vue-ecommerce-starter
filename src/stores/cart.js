import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toast } from "@/plugins/sweetalert";

export const useCartStore = defineStore("cart", () => {
  const items = ref(JSON.parse(localStorage.getItem("cart") || "[]"));

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(items.value));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = items.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ ...product, quantity });
    }
    saveCart();
    toast.fire({ icon: "success", title: "Added to cart" });
  };

  const removeFromCart = (productId) => {
    items.value = items.value.filter((item) => item.id !== productId);
    saveCart();
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCart();
      }
    }
  };

  const clearCart = () => {
    items.value = [];
    saveCart();
  };

  const isInCart = (productId) => {
    return items.value.some((item) => item.id === productId);
  };

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };
});
