<
<template>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-bold mb-6">My Favorites</h1>

    <v-row v-if="favoritesStore.items.length > 0">
      <v-col
        v-for="product in favoritesStore.items"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>

    <v-sheet v-else class="pa-12 text-center">
      <v-icon size="100" color="grey-lighten-2">mdi-heart-off</v-icon>
      <h2 class="text-h5 mt-4 text-grey">No favorites yet</h2>
      <p class="text-body-1 text-grey mt-2 mb-6">
        Save items you love to find them easily later.
      </p>
      <v-btn
        color="primary"
        size="large"
        to="/products"
        prepend-icon="mdi-shopping"
      >
        Explore Products
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { useFavoritesStore } from "@/stores/favorites";
import ProductCard from "@/components/products/ProductCard.vue";

const favoritesStore = useFavoritesStore();
</script>
