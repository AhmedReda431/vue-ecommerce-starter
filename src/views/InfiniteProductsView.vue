<
<template>
  <v-container class="py-8">
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold animate-fadeInUp">
          Infinite Scroll
        </h1>
        <p class="text-grey">Keep scrolling to load more products</p>
      </div>
      <v-btn
        to="/products"
        variant="text"
        color="primary"
        prepend-icon="mdi-format-list-bulleted"
      >
        Button Pagination
      </v-btn>
    </div>

    <v-row>
      <v-col
        v-for="(product, index) in infiniteProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="animate-fadeInUp"
        :style="{ animationDelay: `${(index % 12) * 0.05}s` }"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>

    <div v-if="loadingMore" class="text-center py-8 animate-fadeIn">
      <v-progress-circular indeterminate color="primary" size="48" width="4" />
      <p class="mt-4 text-grey font-weight-medium">
        Loading more amazing products...
      </p>
    </div>

    <v-sheet
      v-if="!hasMore && infiniteProducts.length > 0"
      class="pa-8 text-center mt-4 rounded-xl bg-grey-lighten-4"
    >
      <v-icon size="48" color="success" class="mb-2">mdi-check-circle</v-icon>
      <h3 class="text-h6 text-grey-darken-1">You've reached the end!</h3>
      <p class="text-body-2 text-grey">
        {{ infiniteProducts.length }} products loaded
      </p>
    </v-sheet>

    <v-sheet
      v-if="!loadingMore && infiniteProducts.length === 0"
      class="pa-12 text-center"
    >
      <v-icon size="64" color="grey-lighten-1">mdi-package-variant</v-icon>
      <h3 class="text-h6 mt-4 text-grey">No products found</h3>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useProductsStore } from "@/stores/products";
import ProductCard from "@/components/products/ProductCard.vue";

const productsStore = useProductsStore();
const infiniteProducts = ref([]);
const loadingMore = ref(false);
const hasMore = ref(true);
const skip = ref(0);
const limit = 12;

const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return;
  loadingMore.value = true;
  try {
    const newProducts = await productsStore.fetchPaginated(limit, skip.value);
    if (newProducts.length === 0) {
      hasMore.value = false;
    } else {
      infiniteProducts.value.push(...newProducts);
      skip.value += limit;
    }
  } catch (err) {
    console.error("Infinite scroll error:", err);
    hasMore.value = false;
  } finally {
    loadingMore.value = false;
  }
};

const handleScroll = () => {
  const scrollBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 300;
  if (scrollBottom) {
    loadMore();
  }
};

onMounted(() => {
  loadMore();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
