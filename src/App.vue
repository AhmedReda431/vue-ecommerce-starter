<template>
  <v-app :theme="themeStore.isDark ? 'dark' : 'light'">
    <AppNavbar />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import AppNavbar from "@/components/layout/AppNavbar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const authStore = useAuthStore();
const themeStore = useThemeStore();

onMounted(() => {
  authStore.initAuth();
  themeStore.init();
});
</script>
