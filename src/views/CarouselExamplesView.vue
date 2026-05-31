<
<template>
  <v-container class="py-8">
    <h1 class="text-h3 font-weight-bold text-center mb-2">
      Swiper Carousel Examples
    </h1>
    <p class="text-body-1 text-grey text-center mb-12">
      Production-ready touch carousels using Swiper. Just import and use!
    </p>

    <!-- Example 1: Hero Carousel -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">
        1. Hero Carousel (Full Touch)
      </h2>
      <p class="text-grey mb-4">
        Swipe, drag, or use arrows. Autoplay with pause on hover.
      </p>
      <SwiperCarousel
        :slides="heroSlides"
        :autoplay="{ delay: 5000 }"
        :pagination="{ clickable: true }"
        :navigation="true"
        slide-height="400px"
      />
    </section>

    <!-- Example 2: Product Carousel -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">2. Product Carousel</h2>
      <p class="text-grey mb-4">
        Touch swipe through products. Responsive items per view.
      </p>
      <SwiperProductCarousel title="Featured Products" :products="products" />
    </section>

    <!-- Example 3: Category Carousel -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">3. Category Carousel</h2>
      <p class="text-grey mb-4">Smooth category browsing with snap points.</p>
      <SwiperCategoryCarousel
        title="Browse Categories"
        :categories="categories"
      />
    </section>

    <!-- Example 4: Fade Effect -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">4. Fade Effect Carousel</h2>
      <p class="text-grey mb-4">Elegant fade transitions between slides.</p>
      <SwiperCarousel
        :slides="fadeSlides"
        effect="fade"
        :autoplay="{ delay: 4000 }"
        slide-height="350px"
      />
    </section>

    <!-- Example 5: Coverflow Effect -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">5. Coverflow Effect</h2>
      <p class="text-grey mb-4">3D coverflow carousel for visual impact.</p>
      <SwiperCarousel
        :slides="coverflowSlides"
        effect="coverflow"
        :slides-per-view="3"
        :coverflow-effect="{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :autoplay="{ delay: 3000 }"
        slide-height="300px"
      />
    </section>

    <!-- Example 6: Thumbnail Gallery -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">
        6. Product Gallery with Thumbnails
      </h2>
      <p class="text-grey mb-4">
        Click thumbnails or swipe to navigate. Fully responsive.
      </p>

      <v-row>
        <v-col cols="12" md="12" lg="12" class="mx-auto">
          <SwiperCarousel
            :slides="gallerySlides"
            :show-thumbs="true"
            :autoplay="false"
            :pagination="false"
            slide-height="400px"
          />
        </v-col>
      </v-row>
    </section>

    <!-- Example 7: Auto-scrolling Brands -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">
        7. Brand Logos (Auto-scroll)
      </h2>
      <p class="text-grey mb-4">Continuous auto-scrolling brand showcase.</p>
      <SwiperCarousel
        :slides="brandSlides"
        :autoplay="{ delay: 1500, disableOnInteraction: false }"
        :pagination="false"
        :navigation="false"
        :slides-per-view="5"
        :loop="true"
        slide-height="80px"
        :breakpoints="{
          320: { slidesPerView: 2, spaceBetween: 20 },
          480: { slidesPerView: 3, spaceBetween: 20 },
          640: { slidesPerView: 4, spaceBetween: 25 },
          768: { slidesPerView: 5, spaceBetween: 30 },
        }"
      >
        <template #default="{ slide }">
          <v-img :src="slide.image" height="60" contain class="brand-item" />
        </template>
      </SwiperCarousel>
    </section>

    <!-- Example 8: Vertical Carousel -->
    <section class="mb-16">
      <h2 class="text-h4 font-weight-bold mb-4">8. Vertical Carousel</h2>
      <p class="text-grey mb-4">Swipe up/down to navigate.</p>
      <SwiperCarousel
        :slides="verticalSlides"
        direction="vertical"
        :pagination="{ clickable: true }"
        :navigation="false"
        slide-height="300px"
        :autoplay="{ delay: 3000 }"
      />
    </section>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SwiperCarousel from "@/components/carousel/SwiperCarousel.vue";
import SwiperProductCarousel from "@/components/carousel/SwiperProductCarousel.vue";
import SwiperCategoryCarousel from "@/components/carousel/SwiperCategoryCarousel.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const heroSlides = ref([
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    title: "Slide 1",
    subtitle: "Swipe me!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
    title: "Slide 2",
    subtitle: "Touch enabled",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop",
    title: "Slide 3",
    subtitle: "Works on all devices",
  },
]);

const products = ref([]);
const categories = ref([
  {
    slug: "phones",
    name: "Phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
  },
  {
    slug: "laptops",
    name: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
  },
  {
    slug: "fragrances",
    name: "Fragrances",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
  },
  {
    slug: "skincare",
    name: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
  },
  {
    slug: "groceries",
    name: "Groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
  },
]);

const fadeSlides = ref([
  {
    image:
      "https://images.unsplash.com/photo-1484100356142-db6ab6244067?w=1200&h=350&fit=crop",
    title: "Fade 1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=1200&h=350&fit=crop",
    title: "Fade 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&h=350&fit=crop",
    title: "Fade 3",
  },
]);

const coverflowSlides = ref([
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=300&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
  },
]);

const gallerySlides = ref([
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=100&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=500&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=100&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=500&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=100&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=500&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&h=100&fit=crop",
  },
]);
const brandSlides = ref([
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop" },
]);

const verticalSlides = ref([
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    title: "Vertical 1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=300&fit=crop",
    title: "Vertical 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=300&fit=crop",
    title: "Vertical 3",
  },
]);

onMounted(async () => {
  await productsStore.fetchProducts({ limit: 10 });
  products.value = productsStore.products;
});
</script>

<style scoped>
section {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 48px;
}

section:last-child {
  border-bottom: none;
}

.brand-item {
  opacity: 0.6;
  transition: opacity 0.3s;
  filter: grayscale(100%);
}

.brand-item:hover {
  opacity: 1;
  filter: grayscale(0%);
}
</style>
