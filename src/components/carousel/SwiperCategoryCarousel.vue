<template>
  <div class="category-carousel-wrapper">
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
      :modules="[Navigation, Autoplay]"
      :slides-per-view="slidesPerView"
      :space-between="16"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :grab-cursor="true"
      :touch-ratio="1"
      :simulate-touch="true"
      :allow-touch-move="true"
      :breakpoints="breakpoints"
      @swiper="onSwiper"
      class="category-swiper"
    >
      <swiper-slide
        v-for="category in categories"
        :key="category.slug"
        class="category-slide"
      >
        <v-card
          class="category-card h-100"
          :to="`/products?category=${category.slug}`"
          hover
        >
          <v-img
            :src="
              category.image ||
              `https://via.placeholder.com/300x200?text=${encodeURIComponent(category.name)}`
            "
            height="160"
            cover
            class="bg-grey-lighten-2"
          />
          <v-card-title
            class="text-center text-subtitle-1 font-weight-bold py-3"
          >
            {{ category.name }}
          </v-card-title>
        </v-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";

const props = defineProps({
  title: {
    type: String,
    default: "Shop by Category",
  },
  categories: {
    type: Array,
    required: true,
  },
});

const { mobile, sm, md } = useDisplay();
const swiperRef = ref(null);

const slidesPerView = computed(() => {
  if (mobile.value) return 2.2;
  if (sm.value) return 3.2;
  if (md.value) return 4;
  return 5;
});

const breakpoints = computed(() => ({
  320: { slidesPerView: 2.2, spaceBetween: 10 },
  480: { slidesPerView: 2.5, spaceBetween: 12 },
  640: { slidesPerView: 3.2, spaceBetween: 14 },
  768: { slidesPerView: 4, spaceBetween: 16 },
  1024: { slidesPerView: 5, spaceBetween: 16 },
  1280: { slidesPerView: 6, spaceBetween: 20 },
}));

const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};
</script>

<style scoped>
.category-swiper {
  padding: 8px 4px;
  margin: -8px -4px;
}

.category-slide {
  height: auto;
}

.category-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-8px);
}

:deep(.swiper-slide) {
  height: auto;
}

/* Hide default navigation */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none;
}
</style>
