<
<template>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-bold mb-6">Shopping Cart</h1>

    <v-row v-if="cartStore.items.length > 0">
      <v-col cols="12" lg="8">
        <v-card class="pa-4">
          <v-list>
            <template v-for="(item, index) in cartStore.items" :key="item.id">
              <CartItem :item="item" />
              <v-divider v-if="index < cartStore.items.length - 1" />
            </template>
          </v-list>
        </v-card>

        <div class="d-flex justify-space-between mt-4">
          <v-btn variant="text" prepend-icon="mdi-arrow-left" to="/products">
            Continue Shopping
          </v-btn>
          <v-btn
            color="error"
            variant="text"
            prepend-icon="mdi-delete"
            @click="clearCart"
          >
            Clear Cart
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="pa-4 sticky-sidebar">
          <h3 class="text-h6 font-weight-bold mb-4">Order Summary</h3>

          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey">Subtotal</span>
            <span class="font-weight-bold"
              >${{ formatPrice(cartStore.totalPrice) }}</span
            >
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey">Shipping</span>
            <span class="font-weight-bold">{{
              cartStore.totalPrice > 50 ? "FREE" : "$5.00"
            }}</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey">Tax</span>
            <span class="font-weight-bold">${{ formatPrice(tax) }}</span>
          </div>

          <v-divider class="my-4" />

          <div class="d-flex justify-space-between mb-6">
            <span class="text-h6 font-weight-bold">Total</span>
            <span class="text-h6 font-weight-bold text-primary"
              >${{ formatPrice(total) }}</span
            >
          </div>

          <v-btn
            color="primary"
            size="large"
            block
            to="/checkout"
            :disabled="cartStore.items.length === 0"
          >
            Proceed to Checkout
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-sheet v-else class="pa-12 text-center">
      <v-icon size="100" color="grey-lighten-2">mdi-cart-off</v-icon>
      <h2 class="text-h5 mt-4 text-grey">Your cart is empty</h2>
      <p class="text-body-1 text-grey mt-2 mb-6">
        Looks like you haven't added anything yet.
      </p>
      <v-btn
        color="primary"
        size="large"
        to="/products"
        prepend-icon="mdi-shopping"
      >
        Start Shopping
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/cart/CartItem.vue";
import Swal from "sweetalert2";

const cartStore = useCartStore();

const tax = computed(() => cartStore.totalPrice * 0.1);
const shipping = computed(() => (cartStore.totalPrice > 50 ? 0 : 5));
const total = computed(() => cartStore.totalPrice + tax.value + shipping.value);

const formatPrice = (price) => Number(price).toFixed(2);

const clearCart = async () => {
  const result = await Swal.fire({
    title: "Clear Cart?",
    text: "Remove all items from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, clear it",
  });
  if (result.isConfirmed) {
    cartStore.clearCart();
  }
};
</script>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 88px;
}
</style>
