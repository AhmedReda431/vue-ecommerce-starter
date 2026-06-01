<template>
  <div class="swiper-carousel-wrapper">
    <!-- Main Swiper -->
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :autoplay="autoplayConfig"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      :effect="effect"
      :grab-cursor="true"
      :touch-ratio="1"
      :simulate-touch="true"
      :allow-touch-move="true"
      :thumbs="{ swiper: thumbsSwiper }"
      @swiper="setMainSwiper"
      @slideChange="onSlideChange"
      class="main-swiper"
      :loop="true"
      :dir="swiperDir"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="index"
        class="main-slide"
      >
        <slot :slide="slide" :index="index" :active="index === activeIndex">
          <div
            class="default-slide"
            :style="{
              backgroundImage: `url(${slide.image})`,
              height: slideHeight,
            }"
          >
            <div class="slide-overlay" v-if="slide.title || slide.subtitle">
              <div class="slide-content">
                <v-chip color="primary" class="mb-4" v-if="slide.tag">{{
                  slide.tag
                }}</v-chip>
                <h2 class="slide-title" v-if="slide.title">
                  {{ slide.title }}
                </h2>
                <p class="slide-subtitle" v-if="slide.subtitle">
                  {{ slide.subtitle }}
                </p>
                <v-btn
                  v-if="slide.buttonText"
                  :to="slide.buttonLink || '#'"
                  color="primary"
                  size="large"
                  class="mt-4"
                  rounded="lg"
                  elevation="4"
                >
                  {{ slide.buttonText }}
                </v-btn>
              </div>
            </div>
          </div>
        </slot>
      </swiper-slide>
    </swiper>

    <!-- Thumbnails Swiper -->
    <div v-if="showThumbs" class="thumbs-wrapper">
      <swiper
        :modules="[Thumbs]"
        :slides-per-view="4"
        :space-between="10"
        :watch-slides-progress="true"
        :allow-touch-move="true"
        :slide-to-clicked-slide="true"
        @swiper="setThumbsSwiper"
        class="thumbs-swiper"
        :breakpoints="{
          320: { slidesPerView: 3, spaceBetween: 8 },
          480: { slidesPerView: 4, spaceBetween: 10 },
          640: { slidesPerView: 5, spaceBetween: 10 },
          768: { slidesPerView: 6, spaceBetween: 12 },
        }"
      >
        <swiper-slide
          v-for="(slide, index) in slides"
          :key="index"
          class="thumb-slide"
          :class="{ active: index === activeIndex }"
        >
          <v-img
            :src="slide.thumbnail || slide.image"
            height="70"
            cover
            class="rounded-lg thumb-image"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Thumbs,
} from "swiper/modules";

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  autoplay: {
    type: [Boolean, Object],
    default: false,
  },
  pagination: {
    type: [Boolean, Object],
    default: () => ({ clickable: true }),
  },
  navigation: {
    type: [Boolean, Object],
    default: () => true,
  },
  effect: {
    type: String,
    default: "slide",
  },
  showThumbs: {
    type: Boolean,
    default: false,
  },
  slideHeight: {
    type: String,
    default: "400px",
  },
});

const emit = defineEmits(["change"]);

const activeIndex = ref(0);
const mainSwiper = ref(null);
const thumbsSwiper = ref(null);

const modules = computed(() => {
  const mods = [Navigation, Pagination, Autoplay, Thumbs];
  if (props.effect === "fade") mods.push(EffectFade);
  return mods;
});

const autoplayConfig = computed(() => {
  if (props.autoplay === false) return false;
  return typeof props.autoplay === "object" ? props.autoplay : { delay: 5000 };
});

const paginationConfig = computed(() => {
  if (props.pagination === false) return false;
  return typeof props.pagination === "object"
    ? props.pagination
    : { clickable: true };
});

const navigationConfig = computed(() => {
  if (props.navigation === false) return false;
  return typeof props.navigation === "object" ? props.navigation : true;
});

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex;
  emit("change", swiper.activeIndex);
};

watch(
  () => props.slides,
  () => {
    activeIndex.value = 0;
    if (mainSwiper.value) {
      mainSwiper.value.slideTo(0);
    }
  },
  { deep: true },
);
const swiperDir = computed(() => document.documentElement.dir || "ltr");
</script>

<style scoped>
.swiper-carousel-wrapper {
  position: relative;
  width: 100%;
}

.main-swiper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.main-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-slide {
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 40px;
}

.slide-content {
  color: white;
  max-width: 600px;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.slide-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

/* Thumbnails */
.thumbs-wrapper {
  margin-top: 16px;
  padding: 0 4px;
}

.thumbs-swiper {
  padding: 8px 0;
}

.thumb-slide {
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid transparent;
}

.thumb-slide.active {
  opacity: 1;
  border-color: var(--v-theme-primary);
  transform: scale(1.05);
}

.thumb-image {
  transition: transform 0.3s;
}

.thumb-slide:hover .thumb-image {
  transform: scale(1.1);
}

/* Swiper navigation */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transition: all 0.3s;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 18px;
  font-weight: bold;
}

/* Pagination */
:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  transition: all 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--v-theme-primary);
  width: 24px;
  border-radius: 5px;
}

/* Responsive */
@media (max-width: 768px) {
  .slide-title {
    font-size: 1.5rem;
  }

  .slide-subtitle {
    font-size: 0.9rem;
  }

  .slide-overlay {
    padding: 20px;
  }

  .default-slide {
    height: 250px !important;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 36px;
    height: 36px;
  }

  .thumb-slide {
    opacity: 0.8;
  }
}
</style>
