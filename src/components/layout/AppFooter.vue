<template>
  <v-footer class="bg-grey-darken-4 text-white pt-8">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-4">
            <v-icon start class="mr-2">mdi-store</v-icon>
            SHOPSTARTER
          </h3>
          <p class="text-grey-lighten-1">
            Your one-stop e-commerce solution. Built with Vue 3, Vuetify, and
            modern web technologies.
          </p>
          <div class="mt-4">
            <v-btn icon variant="text" color="white" class="mr-2">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" class="mr-2">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" class="mr-2">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="6" md="2" class="mb-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-4">Shop</h4>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item to="/products" class="px-0 text-grey-lighten-1"
              >All Products</v-list-item
            >
            <v-list-item to="/products" class="px-0 text-grey-lighten-1"
              >New Arrivals</v-list-item
            >
            <v-list-item to="/products" class="px-0 text-grey-lighten-1"
              >Featured</v-list-item
            >
          </v-list>
        </v-col>

        <v-col cols="6" md="2" class="mb-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-4">Company</h4>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item class="px-0 text-grey-lighten-1">About Us</v-list-item>
            <v-list-item class="px-0 text-grey-lighten-1">Careers</v-list-item>
            <v-list-item class="px-0 text-grey-lighten-1">Contact</v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="4">
          <h4 class="text-subtitle-1 font-weight-bold mb-4">Newsletter</h4>
          <p class="text-grey-lighten-1 mb-4">
            Subscribe to get special offers and updates.
          </p>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="email"
                density="compact"
                variant="outlined"
                placeholder="Your email"
                bg-color="grey-darken-3"
                hide-details
              />
            </v-col>
            <v-col cols="4">
              <v-btn color="primary" block height="40" @click="subscribe">
                Subscribe
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="my-6 bg-grey-darken-2" />

      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6" class="text-center text-sm-left">
          <span class="text-grey-lighten-1 text-body-2">
            © {{ new Date().getFullYear() }} ShopStarter. All rights reserved.
          </span>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-right">
          <v-btn variant="text" size="small" class="text-grey-lighten-1"
            >Privacy Policy</v-btn
          >
          <v-btn variant="text" size="small" class="text-grey-lighten-1"
            >Terms of Service</v-btn
          >
        </v-col>
      </v-row>
      <div
        class="scroll-to-top-button background-primary white cursor-pointer"
        @click="scrollToTop"
        v-show="isVisible"
      >
        <v-icon>mdi-arrow-up-bold</v-icon>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { toast } from "@/plugins/sweetalert";

const email = ref("");
const isVisible = ref(false);
const subscribe = () => {
  if (email.value) {
    toast.fire({ icon: "success", title: "Subscribed successfully!" });
    email.value = "";
  }
};
const scrollToTop = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
// Check scroll position
const handleScroll = () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  isVisible.value = currentScroll > 500;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style lang="scss" scoped>
.scroll-to-top-button i{
  position: fixed;
  inset-inline-end: 40px;
  inset-block-end: 40px;
  z-index: 99999;
  background: rgb(var(--v-theme-primary));
  border-radius: 50%;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
