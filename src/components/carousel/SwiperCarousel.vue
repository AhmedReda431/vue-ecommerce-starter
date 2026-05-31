<
<template>
  <div class="swiper-carousel-wrapper">
    <swiper
      :modules="modules"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      :loop="loop"
      :autoplay="autoplayConfig"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      :effect="effect"
      :coverflow-effect="coverflowEffect"
      :thumbs="thumbsConfig"
      :breakpoints="breakpoints"
      :grab-cursor="true"
      :touch-ratio="1"
      :simulate-touch="true"
      :allow-touch-move="true"
      :direction="direction"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="my-swiper"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="index"
        class="swiper-slide"
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

    <!-- Thumbnails (if enabled) -->
    <div v-if="showThumbs" class="swiper-thumbs">
      <swiper
        :modules="[Thumbs]"
        :slides-per-view="4"
        :space-between="10"
        :watch-slides-progress="true"
        :allow-touch-move="true"
        @swiper="setThumbsSwiper"
        class="my-thumbs"
      >
        <swiper-slide
          v-for="(slide, index) in slides"
          :key="index"
          class="thumb-slide"
          :class="{ active: index === activeIndex }"
        >
          <v-img
            :src="slide.thumbnail || slide.image"
            height="60"
            cover
            class="rounded-lg"
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
  EffectCoverflow,
  Thumbs,
} from "swiper/modules";

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  slidesPerView: {
    type: [Number, String],
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 0,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: [Boolean, Object],
    default: () => ({
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }),
  },
  pagination: {
    type: [Boolean, Object],
    default: () => ({ clickable: true, dynamicBullets: true }),
  },
  navigation: {
    type: [Boolean, Object],
    default: () => true,
  },
  effect: {
    type: String,
    default: "slide", // slide, fade, coverflow
  },
  coverflowEffect: {
    type: Object,
    default: () => ({
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }),
  },
  showThumbs: {
    type: Boolean,
    default: false,
  },
  breakpoints: {
    type: Object,
    default: () => ({
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 1, spaceBetween: 30 },
      1024: { slidesPerView: 1, spaceBetween: 40 },
    }),
  },
  slideHeight: {
    type: String,
    default: "500px",
  },
  direction: {
    type: String,
    default: "horizontal",
  },
});

const emit = defineEmits(["change", "swiper"]);

const activeIndex = ref(0);
const thumbsSwiper = ref(null);

const modules = computed(() => {
  const mods = [Navigation, Pagination, Autoplay];
  if (props.effect === "fade") mods.push(EffectFade);
  if (props.effect === "coverflow") mods.push(EffectCoverflow);
  if (props.showThumbs) mods.push(Thumbs);
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

const thumbsConfig = computed(() => {
  if (!props.showThumbs || !thumbsSwiper.value) return undefined;
  return { swiper: thumbsSwiper.value };
});

const onSwiper = (swiper) => {
  emit("swiper", swiper);
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex;
  emit("change", swiper.activeIndex);
};

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

watch(
  () => props.slides,
  () => {
    activeIndex.value = 0;
  },
  { deep: true },
);
</script>

<style scoped>
.swiper-carousel-wrapper {
  position: relative;
  width: 100%;
}

.my-swiper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.swiper-slide {
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
.swiper-thumbs {
  margin-top: 16px;
}

.my-thumbs .swiper-slide {
  opacity: 0.6;
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.my-thumbs .swiper-slide.active,
.my-thumbs .swiper-slide-thumb-active {
  opacity: 1;
  transform: scale(1.05);
}

.my-thumbs .swiper-slide img {
  border-radius: 8px;
}

/* Swiper navigation buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 48px;
  height: 48px;
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
  font-size: 20px;
  font-weight: bold;
}

/* Swiper pagination */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  transition: all 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--v-theme-primary);
  width: 24px;
  border-radius: 6px;
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

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }

  .default-slide {
    height: 300px !important;
  }
}
</style>
