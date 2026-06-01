<template>
  <div>
    <!-- Hero Carousel with Swiper -->
    <SwiperCarousel
      :slides="heroSlides"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :pagination="{ clickable: true, dynamicBullets: true }"
      :navigation="true"
      effect="slide"
      slide-height="600px"
      @change="onSlideChange"
    >
      <template #default="{ slide, active }">
        <div
          class="hero-slide"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" md="8" lg="6">
                  <div
                    class="hero-content"
                    :class="{ 'animate-fadeInUp': active }"
                  >
                    <v-chip color="primary" class="mb-4" size="large">
                      {{ slide.tag }}
                    </v-chip>
                    <h1 class="text-h2 font-weight-bold text-white mb-4">
                      {{ slide.title }}
                    </h1>
                    <p class="text-h6 text-white mb-6 opacity-90">
                      {{ slide.subtitle }}
                    </p>
                    <div class="d-flex gap-4 flex-wrap">
                      <v-btn
                        :to="slide.buttonLink"
                        color="primary"
                        size="x-large"
                        rounded="lg"
                        elevation="4"
                        prepend-icon="mdi-shopping"
                      >
                        {{ slide.buttonText }}
                      </v-btn>
                      <v-btn
                        variant="outlined"
                        color="white"
                        size="x-large"
                        rounded="lg"
                        prepend-icon="mdi-play-circle"
                      >
                        Watch Video
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </template>
    </SwiperCarousel>

    <!-- Categories Carousel -->
    <v-container class="py-12">
      <SwiperCategoryCarousel
        title="Shop by Category"
        :categories="categories"
      />
    </v-container>

    <!-- Featured Products Carousel -->
    <v-sheet color="grey-lighten-4" class="py-12">
      <v-container>
        <SwiperProductCarousel
          title="Trending Now"
          :products="featuredProducts"
        />
      </v-container>
    </v-sheet>

    <!-- New Arrivals -->
    <v-container class="py-12">
      <SwiperProductCarousel title="New Arrivals" :products="newArrivals" />
    </v-container>

    <!-- Testimonials -->
    <v-sheet color="primary" dark class="py-12">
      <v-container>
        <h2 class="text-h4 font-weight-bold text-center text-white mb-8">
          What Our Customers Say
        </h2>
        <SwiperCarousel
          :slides="testimonialSlides"
          :autoplay="{ delay: 5000 }"
          :pagination="{ clickable: true }"
          :navigation="false"
          effect="slide"
          slide-height="auto"
        >
          <template #default="{ slide }">
            <v-card
              class="testimonial-card mx-auto"
              max-width="800"
              flat
              color="transparent"
            >
              <v-card-text class="text-center pa-8">
                <v-icon size="48" color="white" class="mb-4"
                  >mdi-format-quote-open</v-icon
                >
                <p class="text-h6 text-white mb-6 font-italic">
                  "{{ slide.text }}"
                </p>
                <v-avatar size="64" class="mb-2">
                  <v-img :src="slide.avatar" />
                </v-avatar>
                <h4 class="text-subtitle-1 font-weight-bold text-white">
                  {{ slide.name }}
                </h4>
                <p class="text-caption text-white opacity-70">
                  {{ slide.role }}
                </p>
                <v-rating
                  :model-value="slide.rating"
                  color="amber"
                  readonly
                  density="compact"
                  class="mt-2"
                />
              </v-card-text>
            </v-card>
          </template>
        </SwiperCarousel>
      </v-container>
    </v-sheet>

    <!-- Brands -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-8">Trusted Brands</h2>
      <SwiperCarousel
        :slides="brandSlides"
        :autoplay="{ delay: 2000, disableOnInteraction: false }"
        :pagination="false"
        :navigation="false"
        :slides-per-view="5"
        :space-between="30"
        :loop="true"
        effect="slide"
        slide-height="100px"
        :breakpoints="{
          320: { slidesPerView: 2, spaceBetween: 20 },
          480: { slidesPerView: 3, spaceBetween: 20 },
          640: { slidesPerView: 4, spaceBetween: 25 },
          768: { slidesPerView: 5, spaceBetween: 30 },
          1024: { slidesPerView: 6, spaceBetween: 40 },
        }"
      >
        <template #default="{ slide }">
          <v-img :src="slide.image" height="80" contain class="brand-logo" />
        </template>
      </SwiperCarousel>
    </v-container>
  </div>
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
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop",
    tag: "New Collection",
    title: "Summer Sale Up To 50% Off",
    subtitle:
      "Discover the latest trends in fashion, electronics, and home decor with unbeatable prices.",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop",
    tag: "Trending",
    title: "Premium Fashion Collection",
    subtitle:
      "Elevate your style with our curated selection of designer pieces.",
    buttonText: "Explore",
    buttonLink: "/products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop",
    tag: "Limited Time",
    title: "Tech Gadgets Mega Deals",
    subtitle:
      "Get the latest smartphones, laptops, and accessories at amazing prices.",
    buttonText: "View Deals",
    buttonLink: "/products",
  },
]);

const categories = ref([
  {
    slug: "smartphones",
    name: "Smartphones",
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
  {
    slug: "home-decoration",
    name: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  },
]);

const featuredProducts = ref([]);
const newArrivals = ref([]);

const testimonialSlides = ref([
  {
    text: "Amazing products and fast shipping! The quality exceeded my expectations.",
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    text: "Best online shopping experience ever. Customer support is outstanding!",
    name: "Michael Chen",
    role: "Premium Member",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
  },
  {
    text: "Great prices and the return policy is hassle-free. Highly recommended!",
    name: "Emily Davis",
    role: "Regular Customer",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
  },
]);

const brandSlides = ref([
  { image: "https://via.placeholder.com/150x80?text=Apple" },
  { image: "https://via.placeholder.com/150x80?text=Samsung" },
  { image: "https://via.placeholder.com/150x80?text=Nike" },
  { image: "https://via.placeholder.com/150x80?text=Adidas" },
  { image: "https://via.placeholder.com/150x80?text=Sony" },
  { image: "https://via.placeholder.com/150x80?text=LG" },
  { image: "https://via.placeholder.com/150x80?text=Dell" },
  { image: "https://via.placeholder.com/150x80?text=HP" },
]);

const onSlideChange = (index) => {
  console.log("Hero slide changed to:", index);
};

onMounted(async () => {
  await productsStore.fetchProducts({ limit: 20 });
  featuredProducts.value = productsStore.products.slice(0, 10);
  newArrivals.value = productsStore.products.slice(10, 20);
});
</script>

<style scoped>
.hero-slide {
  width: 100%;
  height: 600px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  align-items: center;
}

.hero-content {
  padding: 40px 0;
}

.testimonial-card {
  background: transparent;
}

.brand-logo {
  opacity: 0.6;
  transition:
    opacity 0.3s,
    transform 0.3s;
  filter: grayscale(100%);
}

.brand-logo:hover {
  opacity: 1;
  transform: scale(1.1);
  filter: grayscale(0%);
}

@media (max-width: 768px) {
  .hero-slide {
    height: 400px;
  }

  .hero-content h1 {
    font-size: 1.75rem !important;
  }

  .hero-content p {
    font-size: 1rem !important;
  }
}
</style>
