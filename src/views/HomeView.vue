<
<template>
  <div>
    <!-- Hero Section -->
    <v-sheet color="primary" dark class="hero-section py-16">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">
              Welcome to ShopStarter
            </h1>
            <p class="text-h6 mb-8 opacity-80">
              Discover amazing products at unbeatable prices. Your next favorite
              item is just a click away.
            </p>
            <v-btn
              to="/products"
              size="x-large"
              color="white"
              class="text-primary font-weight-bold"
              prepend-icon="mdi-shopping"
            >
              Shop Now
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Featured Categories -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-8">
        Shop by Category
      </h2>
      <v-row>
        <v-col
          v-for="category in categories"
          :key="category.name"
          cols="6"
          md="3"
        >
          <v-card
            :to="`/products?category=${category.name}`"
            hover
            height="160"
            class="d-flex align-center justify-center category-card"
            image="https://via.placeholder.com/300x160"
          >
            <v-card-title class="text-white font-weight-bold bg-black-opacity">
              {{ category.name }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Featured Products -->
    <v-container class="py-12">
      <div class="d-flex justify-space-between align-center mb-8">
        <h2 class="text-h4 font-weight-bold">Featured Products</h2>
        <v-btn variant="text" color="primary" to="/products">
          View All <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <ProductGrid :products="featuredProducts" />
    </v-container>

    <!-- Features -->
    <v-sheet color="grey-lighten-4" class="py-12">
      <v-container>
        <v-row>
          <v-col
            v-for="feature in features"
            :key="feature.title"
            cols="12"
            sm="6"
            md="3"
            class="text-center"
          >
            <v-icon size="48" color="primary" class="mb-4">{{
              feature.icon
            }}</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
            <p class="text-body-2 text-grey">{{ feature.description }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductGrid from "@/components/products/ProductGrid.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const categories = ref([
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Home" },
  { name: "Sports" },
]);

const features = ref([
  {
    icon: "mdi-truck-fast",
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: "mdi-shield-check",
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: "mdi-refresh",
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: "mdi-headset",
    title: "24/7 Support",
    description: "Dedicated support team",
  },
]);

const featuredProducts = ref([]);

onMounted(async () => {
  await productsStore.fetchProducts({ limit: 8 });
  featuredProducts.value = productsStore.products;
});
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
}
.category-card {
  position: relative;
}
.bg-black-opacity {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: center;
}
</style>
