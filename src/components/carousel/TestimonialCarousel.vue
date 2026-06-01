<template>
  <div class="testimonial-carousel-wrapper">
    <BaseCarousel
      :slides="testimonialSlides"
      :autoplay="true"
      :interval="6000"
      :showArrows="true"
      :showDots="true"
      :showThumbnails="false"
      height="auto"
      arrowColor="primary"
    >
      <template #default="{ slide, active }">
        <v-card class="testimonial-card mx-auto" max-width="800" flat>
          <v-card-text class="text-center pa-8">
            <v-icon size="48" color="primary" class="mb-4"
              >mdi-format-quote-open</v-icon
            >
            <p class="text-h6 text-grey-darken-1 mb-6 font-italic">
              "{{ slide.text }}"
            </p>
            <v-avatar size="64" class="mb-2">
              <v-img :src="slide.avatar" />
            </v-avatar>
            <h4 class="text-subtitle-1 font-weight-bold">{{ slide.name }}</h4>
            <p class="text-caption text-grey">{{ slide.role }}</p>
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
    </BaseCarousel>
  </div>
</template>

<script setup>
import BaseCarousel from "./SwiperCarousel.vue";

const props = defineProps({
  testimonials: {
    type: Array,
    default: () => [
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
    ],
  },
});

const testimonialSlides = props.testimonials;
</script>

<style scoped>
.testimonial-carousel-wrapper {
  padding: 40px 0;
}

.testimonial-card {
  background: transparent;
}
</style>
