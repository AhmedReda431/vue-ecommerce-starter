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
            v-model="localFilters.category"
            :items="categoryItems"
            item-title="name"
            item-value="slug"
            label="Category"
            variant="outlined"
            density="compact"
            clearable
            class="mb-3"
            rounded="lg"
            hide-details
            return-object
          />

          <v-select
            v-model="localFilters.rating"
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
            v-model="localFilters.brand"
            :items="availableBrands"
            label="Brand"
            variant="outlined"
            density="compact"
            clearable
            class="mb-3"
            rounded="lg"
            hide-details
          />

          <v-label class="mb-2 text-subtitle-2 font-weight-medium"
            >Price Range</v-label
          >
          <v-range-slider
            v-model="localFilters.priceRange"
            :max="2000"
            :step="10"
            thumb-label
            class="mb-2"
            color="primary"
          />
          <div class="d-flex justify-space-between text-caption mb-4 text-grey">
            <span>${{ localFilters.priceRange[0] }}</span>
            <span>${{ localFilters.priceRange[1] }}</span>
          </div>

          <v-select
            v-model="localFilters.sort"
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
          <v-card
            class="pa-4 rounded-t-xl"
            max-height="80vh"
            style="overflow-y: auto"
          >
            <div class="d-flex justify-space-between align-center mb-4">
              <h3 class="text-h6 font-weight-bold">Filters</h3>
              <v-btn
                icon="mdi-close"
                variant="text"
                @click="showMobileFilters = false"
              />
            </div>

            <v-select
              v-model="localFilters.category"
              :items="categoryItems"
              item-title="name"
              item-value="slug"
              label="Category"
              variant="outlined"
              clearable
              class="mb-3"
              return-object
              hide-details
            />

            <v-select
              v-model="localFilters.rating"
              :items="ratingOptions"
              item-title="text"
              item-value="value"
              label="Minimum Rating"
              variant="outlined"
              clearable
              class="mb-3"
              hide-details
            />

            <v-select
              v-model="localFilters.brand"
              :items="availableBrands"
              label="Brand"
              variant="outlined"
              clearable
              class="mb-3"
              hide-details
            />

            <v-label class="mb-2 text-subtitle-2 font-weight-medium"
              >Price Range</v-label
            >
            <v-range-slider
              v-model="localFilters.priceRange"
              :max="2000"
              :step="10"
              thumb-label
              class="mb-2"
              color="primary"
            />
            <div
              class="d-flex justify-space-between text-caption mb-4 text-grey"
            >
              <span>${{ localFilters.priceRange[0] }}</span>
              <span>${{ localFilters.priceRange[1] }}</span>
            </div>

            <v-select
              v-model="localFilters.sort"
              :items="sortOptions"
              item-title="text"
              item-value="value"
              label="Sort By"
              variant="outlined"
              class="mb-4"
              hide-details
            />

            <v-btn
              color="primary"
              block
              @click="applyFiltersMobile"
              rounded="lg"
              size="large"
            >
              <v-icon start>mdi-filter-check</v-icon>
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
            <v-chip color="primary" variant="tonal">
              {{ filteredProducts.length }} of
              {{ productsStore.products.length }}
            </v-chip>
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

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="d-flex flex-wrap gap-2 mb-4">
          <v-chip
            v-if="appliedFilters.category"
            closable
            color="primary"
            variant="tonal"
            @click:close="removeFilter('category')"
          >
            {{ appliedFilters.category.name }}
          </v-chip>
          <v-chip
            v-if="appliedFilters.rating"
            closable
            color="primary"
            variant="tonal"
            @click:close="removeFilter('rating')"
          >
            {{ appliedFilters.rating }}+ Stars
          </v-chip>
          <v-chip
            v-if="appliedFilters.brand"
            closable
            color="primary"
            variant="tonal"
            @click:close="removeFilter('brand')"
          >
            {{ appliedFilters.brand }}
          </v-chip>
          <v-chip
            v-if="
              appliedFilters.priceRange[0] > 0 ||
              appliedFilters.priceRange[1] < 2000
            "
            closable
            color="primary"
            variant="tonal"
            @click:close="removeFilter('priceRange')"
          >
            ${{ appliedFilters.priceRange[0] }} - ${{
              appliedFilters.priceRange[1]
            }}
          </v-chip>
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
          <h3 class="text-h5 text-grey mb-2">No products match your filters</h3>
          <p class="text-body-1 text-grey mb-6">
            API returned {{ productsStore.products.length }} items, but none
            match all your criteria.
          </p>
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

const localFilters = reactive({
  category: null,
  rating: null,
  brand: null,
  sort: "newest",
  priceRange: [0, 2000],
});

const appliedFilters = reactive({
  category: null,
  rating: null,
  brand: null,
  sort: "newest",
  priceRange: [0, 2000],
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

const categoryItems = computed(() => productsStore.categories);

const availableBrands = computed(() => {
  const brands = new Set(
    productsStore.products.map((p) => p.brand).filter(Boolean),
  );
  return [...brands].sort();
});

const hasActiveFilters = computed(() => {
  return (
    appliedFilters.category ||
    appliedFilters.rating ||
    appliedFilters.brand ||
    appliedFilters.priceRange[0] > 0 ||
    appliedFilters.priceRange[1] < 2000
  );
});

// Client-side filtering (fallback for DummyJSON)
const filteredProducts = computed(() => {
  let result = [...productsStore.products];

  result = result.filter(
    (p) =>
      p.price >= appliedFilters.priceRange[0] &&
      p.price <= appliedFilters.priceRange[1],
  );

  if (appliedFilters.rating) {
    result = result.filter((p) => p.rating >= appliedFilters.rating);
  }

  if (appliedFilters.brand) {
    result = result.filter((p) => p.brand === appliedFilters.brand);
  }

  if (appliedFilters.sort === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (appliedFilters.sort === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (appliedFilters.sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (appliedFilters.sort === "popular") {
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

// BUILD API PARAMS — sends EVERYTHING to the API (ready for real backend)
const buildApiParams = () => {
  const params = {
    limit: 100,
  };

  // Category — MUST be top-level so productApi.getAll can extract it
  if (appliedFilters.category && appliedFilters.category.slug) {
    params.category = appliedFilters.category.slug;
  }

  // Sort — mapped to backend format
  if (appliedFilters.sort) {
    const sortMap = {
      price_asc: { sortBy: "price", order: "asc" },
      price_desc: { sortBy: "price", order: "desc" },
      rating: { sortBy: "rating", order: "desc" },
      newest: { sortBy: "id", order: "desc" },
      popular: { sortBy: "rating", order: "desc" },
    };
    const mapped = sortMap[appliedFilters.sort];
    if (mapped) {
      params.sortBy = mapped.sortBy;
      params.order = mapped.order;
    }
  }

  // Price range
  params.minPrice = appliedFilters.priceRange[0];
  params.maxPrice = appliedFilters.priceRange[1];

  // Rating
  if (appliedFilters.rating) {
    params.minRating = appliedFilters.rating;
  }

  // Brand
  if (appliedFilters.brand) {
    params.brand = appliedFilters.brand;
  }

  console.log("buildApiParams result:", params); // DEBUG
  return params;
};

// Apply filters — sends ALL params to API
const applyFilters = async () => {
  currentPage.value = 1;

  // Copy local to applied
  appliedFilters.category = localFilters.category;
  appliedFilters.rating = localFilters.rating;
  appliedFilters.brand = localFilters.brand;
  appliedFilters.sort = localFilters.sort;
  appliedFilters.priceRange = [...localFilters.priceRange];

  // Build and send ALL params to API
  const apiParams = buildApiParams();

  console.log("applyFilters sending:", JSON.stringify(apiParams, null, 2)); // DEBUG

  await productsStore.fetchProducts(apiParams);
};
const applyFiltersMobile = () => {
  applyFilters();
  showMobileFilters.value = false;
};

const removeFilter = (key) => {
  if (key === "priceRange") {
    localFilters.priceRange = [0, 2000];
  } else {
    localFilters[key] = null;
  }
  applyFilters();
};

const resetFilters = () => {
  localFilters.category = null;
  localFilters.rating = null;
  localFilters.brand = null;
  localFilters.sort = "newest";
  localFilters.priceRange = [0, 2000];
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
