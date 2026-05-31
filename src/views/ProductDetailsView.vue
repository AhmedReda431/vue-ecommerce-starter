<
<template>
  <v-container class="py-8 animate-fadeIn">
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      to="/products"
      class="mb-4 hover-btn"
    >
      Back to Products
    </v-btn>

    <v-progress-linear
      v-if="productsStore.loading"
      indeterminate
      color="primary"
    />

    <v-row v-else-if="productsStore.currentProduct" class="animate-fadeInUp">
      <!-- Images -->
      <v-col cols="12" md="6">
        <v-card class="overflow-hidden rounded-xl">
          <v-img
            :src="
              productsStore.currentProduct.image ||
              'https://via.placeholder.com/600'
            "
            lazy-src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNjAwIDUwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNlMGVlZmYiLz48L3N2Zz4="
            height="500"
            cover
            class="bg-grey-lighten-2"
          />
        </v-card>
        <v-row
          class="mt-4"
          v-if="
            productsStore.currentProduct.images &&
            productsStore.currentProduct.images.length > 1
          "
        >
          <v-col
            v-for="(img, idx) in productsStore.currentProduct.images.slice(
              0,
              4,
            )"
            :key="idx"
            cols="3"
          >
            <v-img
              :src="img"
              height="80"
              cover
              class="rounded-lg cursor-pointer hover-img"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Details -->
      <v-col cols="12" md="6">
        <div class="d-flex align-start justify-space-between">
          <div>
            <v-chip color="primary" size="small" class="mb-2">{{
              productsStore.currentProduct.category
            }}</v-chip>
            <h1 class="text-h4 font-weight-bold mb-2">
              {{ productsStore.currentProduct.name }}
            </h1>
            <div class="d-flex align-center mb-4">
              <v-rating
                :model-value="productsStore.currentProduct.rating || 0"
                color="amber"
                density="compact"
                readonly
                half-increments
              />
              <span class="text-caption ml-2"
                >({{ productsStore.currentProduct.reviews || 0 }} reviews)</span
              >
            </div>
          </div>
          <v-btn
            icon
            size="large"
            :color="
              favoritesStore.isFavorite(productsStore.currentProduct.id)
                ? 'error'
                : 'grey-lighten-1'
            "
            variant="tonal"
            @click="favoritesStore.toggleFavorite(productsStore.currentProduct)"
          >
            <v-icon size="28">
              {{
                favoritesStore.isFavorite(productsStore.currentProduct.id)
                  ? "mdi-heart"
                  : "mdi-heart-outline"
              }}
            </v-icon>
          </v-btn>
        </div>

        <div class="d-flex align-baseline mb-6">
          <span class="text-h3 font-weight-bold text-primary"
            >${{ formatPrice(productsStore.currentProduct.price) }}</span
          >
          <span
            v-if="productsStore.currentProduct.oldPrice"
            class="text-h6 text-decoration-line-through text-grey ml-4"
          >
            ${{ formatPrice(productsStore.currentProduct.oldPrice) }}
          </span>
          <v-chip
            v-if="productsStore.currentProduct.discount"
            color="error"
            class="ml-4"
            size="large"
          >
            Save {{ productsStore.currentProduct.discount }}%
          </v-chip>
        </div>

        <p class="text-body-1 text-grey-darken-1 mb-6">
          {{ productsStore.currentProduct.description }}
        </p>

        <v-divider class="mb-6" />

        <!-- Quantity / Cart Controls -->
        <div class="d-flex align-center mb-6 flex-wrap">
          <span class="text-subtitle-1 font-weight-bold mr-4">Quantity:</span>

          <template v-if="isInCart">
            <div class="d-flex align-center quantity-box">
              <v-btn
                icon="mdi-minus"
                size="small"
                variant="outlined"
                color="primary"
                @click="decrementQty"
              />
              <span
                class="mx-4 text-h6 font-weight-bold"
                style="min-width: 40px; text-align: center"
              >
                {{ cartItemQuantity }}
              </span>
              <v-btn
                icon="mdi-plus"
                size="small"
                variant="outlined"
                color="primary"
                @click="incrementQty"
              />
            </div>
            <v-btn
              color="error"
              variant="text"
              class="ml-4"
              prepend-icon="mdi-delete"
              @click="removeFromCart"
            >
              Remove
            </v-btn>
          </template>

          <template v-else>
            <div class="d-flex align-center quantity-box">
              <v-btn
                icon="mdi-minus"
                size="small"
                variant="outlined"
                color="primary"
                @click="quantity > 1 ? quantity-- : null"
              />
              <span
                class="mx-4 text-h6 font-weight-bold"
                style="min-width: 40px; text-align: center"
              >
                {{ quantity }}
              </span>
              <v-btn
                icon="mdi-plus"
                size="small"
                variant="outlined"
                color="primary"
                @click="quantity++"
              />
            </div>
          </template>
        </div>

        <div class="d-flex gap-4">
          <v-btn
            v-if="!isInCart"
            color="primary"
            size="x-large"
            prepend-icon="mdi-cart-plus"
            @click="addToCart"
            class="flex-grow-1"
            elevation="4"
          >
            Add to Cart
          </v-btn>
          <v-btn
            v-else
            color="success"
            size="x-large"
            prepend-icon="mdi-check-circle"
            to="/cart"
            class="flex-grow-1"
            elevation="4"
          >
            View in Cart
          </v-btn>
        </div>

        <v-list class="mt-6 bg-transparent" lines="two">
          <v-list-item
            prepend-icon="mdi-truck-check"
            title="Free Shipping"
            subtitle="On orders over $50"
          />
          <v-list-item
            prepend-icon="mdi-refresh"
            title="30-Day Returns"
            subtitle="Easy return policy"
          />
          <v-list-item
            prepend-icon="mdi-shield-check"
            title="Secure Checkout"
            subtitle="SSL encrypted payment"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const quantity = ref(1);

const isInCart = computed(() =>
  cartStore.isInCart(productsStore.currentProduct?.id),
);
const cartItemQuantity = computed(() => {
  const item = cartStore.items.find(
    (i) => i.id === productsStore.currentProduct?.id,
  );
  return item ? item.quantity : 0;
});

const formatPrice = (price) => Number(price).toFixed(2);

const addToCart = () => {
  cartStore.addToCart(productsStore.currentProduct, quantity.value);
};

const incrementQty = () => {
  cartStore.updateQuantity(
    productsStore.currentProduct.id,
    cartItemQuantity.value + 1,
  );
};

const decrementQty = () => {
  if (cartItemQuantity.value > 1) {
    cartStore.updateQuantity(
      productsStore.currentProduct.id,
      cartItemQuantity.value - 1,
    );
  } else {
    removeFromCart();
  }
};

const removeFromCart = () => {
  cartStore.removeFromCart(productsStore.currentProduct.id);
};

onMounted(() => {
  productsStore.fetchProductById(route.params.id);
});
</script>

<style scoped>
.quantity-box {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 4px 8px;
}
.hover-btn {
  transition: all 0.2s;
}
.hover-btn:hover {
  transform: translateX(-4px);
}
.hover-img {
  transition: transform 0.3s;
  opacity: 0.8;
}
.hover-img:hover {
  transform: scale(1.05);
  opacity: 1;
}
</style>
