<
<template>
  <div class="auth-bg fill-height d-flex align-center justify-center">
    <div class="floating-shape shape-1 animate-float" />
    <div class="floating-shape shape-2 animate-float-delayed" />

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <transition appear name="page">
            <ForgotPasswordForm />
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm.vue";
</script>
