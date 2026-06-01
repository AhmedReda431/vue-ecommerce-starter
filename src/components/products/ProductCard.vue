<template>
  <v-card
    class="product-card h-100 d-flex flex-column product-hover cursor-pointer"
    elevation="2"
    hover
    @click="goToDetails"
  >
    <div class="position-relative overflow-hidden">
      <v-img
        :src="
          product.image || 'https://via.placeholder.com/300x300?text=No+Image'
        "
        lazy-src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjIwIiB2aWV3Qm94PSIwIDAgMzAwIDIyMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIGZpbGw9IiNlMGVlZmYiLz48L3N2Zz4="
        height="220"
        cover
        class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row align="center" justify="center" class="fill-height">
            <v-progress-circular indeterminate color="grey-lighten-1" />
          </v-row>
        </template>
      </v-img>

      <v-btn
        icon
        size="small"
        class="position-absolute top-0 right-0 ma-2"
        :color="favoritesStore.isFavorite(product.id) ? 'error' : 'white'"
        @click.stop="favoritesStore.toggleFavorite(product)"
      >
        <v-icon>
          {{
            favoritesStore.isFavorite(product.id)
              ? "mdi-heart"
              : "mdi-heart-outline"
          }}
        </v-icon>
      </v-btn>

      <v-chip
        v-if="product.discount"
        color="error"
        size="small"
        class="position-absolute bottom-0 left-0 ma-2"
      >
        -{{ product.discount }}%
      </v-chip>
    </div>

    <v-card-title class="text-subtitle-1 font-weight-bold pt-3 pb-1">
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle class="text-caption text-grey pb-2">
      {{ product.category }}
    </v-card-subtitle>

    <v-card-text class="flex-grow-1">
      <p class="text-body-2 text-grey-darken-1 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="d-flex align-center mt-2">
        <v-rating
          :model-value="product.rating || 0"
          color="amber"
          density="compact"
          size="small"
          readonly
          half-increments
        />
        <span class="text-caption ml-2 text-grey"
          >({{ product.reviews || 0 }})</span
        >
      </div>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0">
      <div class="d-flex flex-column w-100">
        <div class="d-flex align-center mb-2">
          <span class="text-h6 font-weight-bold text-primary">
            ${{ formatPrice(product.price) }}
          </span>
          <span
            v-if="product.oldPrice"
            class="text-body-2 text-decoration-line-through text-grey ml-2"
          >
            ${{ formatPrice(product.oldPrice) }}
          </span>
        </div>

        <!-- NOT IN CART: Add to Cart button -->
        <div v-if="!isInCart" class="animate-fadeIn">
          <v-btn
            color="primary"
            variant="elevated"
            block
            @click.stop="addToCart"
            elevation="2"
            rounded="lg"
            size="small"
            class="text-caption text-sm-body-2 add-to-cart-btn"
          >
            <v-icon start size="small">mdi-cart-plus</v-icon>
            <span class="d-none d-sm-inline">Add to Cart</span>
            <span class="d-sm-none">Add</span>
          </v-btn>
        </div>

        <!-- IN CART: Quantity controls + Remove -->
        <div v-else class="animate-fadeIn">
          <div class="d-flex align-center justify-space-between mb-2">
            <div class="d-flex align-center quantity-box">
              <v-btn
                icon="mdi-minus"
                size="x-small"
                variant="outlined"
                color="primary"
                density="comfortable"
                class="qty-btn increment-btn"
                @click.stop="decrementQty"
              />
              <span class="mx-2 text-body-2 font-weight-bold qty-text">
                {{ cartItemQuantity }}
              </span>
              <v-btn
                icon="mdi-plus"
                size="x-small"
                variant="outlined"
                color="primary"
                density="comfortable"
                class="qty-btn decrement-btn"
                @click.stop="incrementQty"
              />
            </div>
            <v-btn
              icon="mdi-delete"
              size="small"
              color="error"
              variant="text"
              density="comfortable"
              class="delete-btn"
              @click.stop="removeFromCart"
            />
          </div>
          <v-btn
            color="success"
            variant="tonal"
            block
            size="x-small"
            to="/cart"
            prepend-icon="mdi-cart-check"
            rounded="lg"
            class="text-caption"
          >
            <span class="d-none d-sm-inline">In Cart</span>
            <span class="d-sm-none">Cart</span>
          </v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const isInCart = computed(() => cartStore.isInCart(props.product.id));

const cartItemQuantity = computed(() => {
  const item = cartStore.items.find((i) => i.id === props.product.id);
  return item ? item.quantity : 0;
});

const formatPrice = (price) => Number(price).toFixed(2);

const goToDetails = () => {
  router.push(`/products/${props.product.id}`);
};

const addToCart = () => {
  cartStore.addToCart(props.product);
};

const incrementQty = () => {
  cartStore.updateQuantity(props.product.id, cartItemQuantity.value + 1);
};

const decrementQty = () => {
  if (cartItemQuantity.value > 1) {
    cartStore.updateQuantity(props.product.id, cartItemQuantity.value - 1);
  } else {
    removeFromCart();
  }
};

const removeFromCart = () => {
  cartStore.removeFromCart(props.product.id);
};
</script>

<style scoped>
.product-card {
  border-radius: 16px !important;
  overflow: hidden;
}
.cursor-pointer {
  cursor: pointer;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.top-0 {
  top: 0;
}
.right-0 {
  right: 0;
}
.bottom-0 {
  bottom: 0;
}
.left-0 {
  left: 0;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.quantity-box {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 2px 6px;
}
.qty-btn {
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
}
.qty-text {
  min-width: 20px;
  text-align: center;
  font-size: 0.85rem;
}
.delete-btn {
  min-width: 28px !important;
  width: 28px !important;
  height: 28px !important;
}

/* Mobile responsive */
@media (max-width: 360px) {
  .product-card .v-card-title {
    font-size: 0.85rem !important;
  }
  .product-card .v-card-subtitle {
    font-size: 0.7rem !important;
  }
  .qty-btn {
    min-width: 20px !important;
    width: 20px !important;
    height: 20px !important;
  }
  .qty-text {
    font-size: 0.75rem;
    min-width: 16px;
  }
  .delete-btn {
    min-width: 24px !important;
    width: 24px !important;
    height: 24px !important;
  }
}
</style>
