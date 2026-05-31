<
<template>
  <v-container class="py-8">
    <v-row>
      <!-- Sidebar Filters - Desktop -->
      <v-col cols="12" md="3" v-if="!mobile">
        <v-card class="pa-4 sticky-sidebar" rounded="xl" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-4 d-flex align-center">
            <v-icon class="mr-2">mdi-filter-variant</v-icon>
            Filters
          </h3>

          <v-select
            v-model="filters.category"
            :items="productsStore.categories"
            label="Category"
            variant="outlined"
            density="compact"
            clearable
            class="mb-3"
            rounded="lg"
            hide-details
          />

          <v-select
            v-model="filters.rating"
            :items="ratingOptions"
            item-title="text"
            item-value="value"
            label="Minimum Rating"
            variant="outlined"
            density="compact"
            clearable
            class="mb-3"
            rounded="lg"
            hide-details
          />

          <v-select
            v-model="filters.brand"
            :items="availableBrands"
            label="Brand"
            variant="outlined"
            density="compact"
            clearable
            class="mb-3"
            rounded="lg"
            hide-details
          />

          <!-- Price Range - Desktop Only -->
          <v-label class="mb-2 text-subtitle-2 font-weight-medium"
            >Price Range</v-label
          >
          <v-range-slider
            v-model="priceRange"
            :max="2000"
            :step="10"
            thumb-label
            class="mb-2"
            color="primary"
          />
          <div class="d-flex justify-space-between text-caption mb-4 text-grey">
            <span>${{ priceRange[0] }}</span>
            <span>${{ priceRange[1] }}</span>
          </div>

          <v-select
            v-model="filters.sort"
            :items="sortOptions"
            item-title="text"
            item-value="value"
            label="Sort By"
            variant="outlined"
            density="compact"
            rounded="lg"
            hide-details
          />

          <v-btn
            color="primary"
            block
            class="mt-4"
            @click="applyFilters"
            rounded="lg"
            size="large"
          >
            <v-icon start>mdi-filter-check</v-icon>
            Apply Filters
          </v-btn>

          <v-btn
            variant="text"
            block
            class="mt-2"
            @click="resetFilters"
            color="grey"
          >
            Reset All
          </v-btn>
        </v-card>
      </v-col>

      <!-- Mobile Filters -->
      <v-col cols="12" v-if="mobile" class="mb-4">
        <v-btn
          block
          color="primary"
          prepend-icon="mdi-filter-variant"
          @click="showMobileFilters = true"
          rounded="lg"
        >
          Filters & Sort
        </v-btn>

        <v-bottom-sheet v-model="showMobileFilters">
          <v-card class="pa-4 rounded-t-xl">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3 class="text-h6 font-weight-bold">Filters</h3>
              <v-btn
                icon="mdi-close"
                variant="text"
                @click="showMobileFilters = false"
              />
            </div>

            <v-select
              v-model="filters.category"
              :items="productsStore.categories"
              label="Category"
              variant="outlined"
              clearable
              class="mb-3"
            />
            <v-select
              v-model="filters.rating"
              :items="ratingOptions"
              item-title="text"
              item-value="value"
              label="Minimum Rating"
              variant="outlined"
              clearable
              class="mb-3"
            />
            <v-select
              v-model="filters.brand"
              :items="availableBrands"
              label="Brand"
              variant="outlined"
              clearable
              class="mb-3"
            />
            <v-select
              v-model="filters.sort"
              :items="sortOptions"
              item-title="text"
              item-value="value"
              label="Sort By"
              variant="outlined"
              class="mb-4"
            />

            <v-btn
              color="primary"
              block
              @click="applyFiltersMobile"
              rounded="lg"
            >
              Apply Filters
            </v-btn>
          </v-card>
        </v-bottom-sheet>
      </v-col>

      <!-- Products -->
      <v-col cols="12" md="9">
        <div class="d-flex justify-space-between align-center mb-6 flex-wrap">
          <h1 class="text-h4 font-weight-bold">All Products</h1>
          <div class="d-flex align-center gap-2">
            <v-chip color="primary" variant="tonal"
              >{{ filteredProducts.length }} items</v-chip
            >
            <v-btn
              to="/products/infinite"
              variant="text"
              color="secondary"
              prepend-icon="mdi-infinity"
              class="ml-2"
            >
              Infinite
            </v-btn>
          </div>
        </div>

        <v-progress-linear
          v-if="productsStore.loading"
          indeterminate
          color="primary"
          class="mb-4"
        />

        <v-row v-if="paginatedProducts.length > 0">
          <v-col
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            class="animate-fadeInUp"
            :style="{ animationDelay: `${index * 0.08}s` }"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>

        <v-sheet
          v-else-if="!productsStore.loading"
          class="pa-12 text-center rounded-xl"
        >
          <v-icon size="80" color="grey-lighten-2" class="mb-4"
            >mdi-package-variant</v-icon
          >
          <h3 class="text-h5 text-grey mb-2">No products found</h3>
          <p class="text-body-1 text-grey mb-6">Try adjusting your filters</p>
          <v-btn
            color="primary"
            size="large"
            @click="resetFilters"
            prepend-icon="mdi-refresh"
          >
            Reset Filters
          </v-btn>
        </v-sheet>

        <!-- Button Pagination -->
        <div
          v-if="totalPages > 1"
          class="d-flex justify-center align-center mt-8 gap-2"
        >
          <v-btn
            variant="tonal"
            :disabled="currentPage === 1"
            @click="currentPage--"
            icon="mdi-chevron-left"
          />
          <v-btn
            v-for="page in visiblePages"
            :key="page"
            :variant="page === currentPage ? 'flat' : 'tonal'"
            :color="page === currentPage ? 'primary' : undefined"
            @click="currentPage = page"
            class="font-weight-bold"
            min-width="40"
          >
            {{ page }}
          </v-btn>
          <v-btn
            variant="tonal"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            icon="mdi-chevron-right"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import ProductCard from "@/components/products/ProductCard.vue";

const { mobile } = useDisplay();
const route = useRoute();
const productsStore = useProductsStore();

const showMobileFilters = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(9);
const priceRange = ref([0, 2000]);

const filters = reactive({
  category: null,
  rating: null,
  brand: null,
  sort: "newest",
});

const ratingOptions = [
  { text: "4 Stars & Up", value: 4 },
  { text: "3 Stars & Up", value: 3 },
  { text: "2 Stars & Up", value: 2 },
  { text: "1 Star & Up", value: 1 },
];

const sortOptions = [
  { text: "Newest", value: "newest" },
  { text: "Price: Low to High", value: "price_asc" },
  { text: "Price: High to Low", value: "price_desc" },
  { text: "Top Rated", value: "rating" },
  { text: "Most Popular", value: "popular" },
];

const availableBrands = computed(() => {
  const brands = new Set(
    productsStore.products.map((p) => p.brand).filter(Boolean),
  );
  return [...brands].sort();
});

const filteredProducts = computed(() => {
  let result = [...productsStore.products];

  // Price filter
  result = result.filter(
    (p) => p.price >= priceRange.value[0] && p.price <= priceRange.value[1],
  );

  // Rating filter
  if (filters.rating) {
    result = result.filter((p) => p.rating >= filters.rating);
  }

  // Brand filter
  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }

  // Sort
  if (filters.sort === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (filters.sort === "popular") {
    result.sort((a, b) => b.reviews - a.reviews);
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Reset brand when category changes
watch(
  () => filters.category,
  () => {
    filters.brand = null;
    currentPage.value = 1;
  },
);

const applyFilters = () => {
  currentPage.value = 1;
  if (filters.category) {
    productsStore.fetchProducts({ category: filters.category, limit: 100 });
  } else {
    productsStore.fetchProducts({ limit: 100 });
  }
};

const applyFiltersMobile = () => {
  applyFilters();
  showMobileFilters.value = false;
};

const resetFilters = () => {
  filters.category = null;
  filters.rating = null;
  filters.brand = null;
  filters.sort = "newest";
  priceRange.value = [0, 2000];
  currentPage.value = 1;
  applyFilters();
};

// Search from navbar
watch(
  () => route.query.search,
  (newQuery) => {
    if (newQuery) {
      productsStore.fetchProducts({ q: newQuery, limit: 100 });
    }
  },
  { immediate: true },
);

onMounted(() => {
  productsStore.fetchCategories();
  if (!route.query.search) {
    productsStore.fetchProducts({ limit: 100 });
  }
});
</script>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 88px;
}
.gap-2 {
  gap: 8px;
}
</style>
