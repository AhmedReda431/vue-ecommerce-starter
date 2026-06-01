<template>
  <div class="product-carousel-wrapper">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h5 font-weight-bold">{{ title }}</h2>
      <div class="d-flex gap-2">
        <v-btn
          icon="mdi-chevron-left"
          variant="tonal"
          size="small"
          @click="swiperRef?.slidePrev()"
        />
        <v-btn
          icon="mdi-chevron-right"
          variant="tonal"
          size="small"
          @click="swiperRef?.slideNext()"
        />
      </div>
    </div>

    <swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="slidesPerView"
      :space-between="16"
      :loop="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :grab-cursor="true"
      :touch-ratio="1"
      :simulate-touch="true"
      :allow-touch-move="true"
      :breakpoints="breakpoints"
      @swiper="onSwiper"
      class="product-swiper"
    >
      <swiper-slide
        v-for="product in products"
        :key="product.id"
        class="product-slide"
      >
        <ProductCard :product="product" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "@/components/products/ProductCard.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Featured Products",
  },
  products: {
    type: Array,
    required: true,
  },
});

const { mobile, sm, md, lg } = useDisplay();
const swiperRef = ref(null);

const slidesPerView = computed(() => {
  if (mobile.value) return 1.2;
  if (sm.value) return 2.2;
  if (md.value) return 3;
  if (lg.value) return 4;
  return 4;
});

const breakpoints = computed(() => ({
  320: { slidesPerView: 1.2, spaceBetween: 10 },
  480: { slidesPerView: 1.5, spaceBetween: 12 },
  640: { slidesPerView: 2.2, spaceBetween: 14 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 4, spaceBetween: 16 },
  1280: { slidesPerView: 4, spaceBetween: 20 },
}));

const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};
</script>

<style scoped>
.product-swiper {
  padding: 8px 4px;
  margin: -8px -4px;
}

.product-slide {
  height: auto;
}

:deep(.swiper-slide) {
  height: auto;
}

/* Hide default navigation, we use custom buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none;
}

/* Pagination dots */
:deep(.swiper-pagination) {
  position: relative;
  margin-top: 16px;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: #ccc;
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--v-theme-primary);
  width: 20px;
  border-radius: 5px;
}
</style>
