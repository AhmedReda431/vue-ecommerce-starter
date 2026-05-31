<
<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import AppNavbar from "@/components/layout/AppNavbar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initAuth();
});
</script>
  