<script setup>
import { onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { session } from "@/utils/session";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
let timer = null;

const check = () => {
  if (authStore.isAuthenticated && !session.isValid()) {
    authStore.logout();
    router.push("/login?session=expired");
  }
};

onMounted(() => {
  timer = setInterval(check, 30000); // check every 30s
});
onUnmounted(() => clearInterval(timer));
</script>

<
<template>
  <div style="display: none" />
</template>
