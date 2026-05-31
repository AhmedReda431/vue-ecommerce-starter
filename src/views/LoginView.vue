<
<template>
  <div class="auth-bg fill-height d-flex align-center justify-center">
    <div class="floating-shape shape-1 animate-float" />
    <div class="floating-shape shape-2 animate-float-delayed" />
    <div
      class="floating-shape shape-3 animate-float"
      style="animation-delay: 4s"
    />

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="11" md="10" lg="8" xl="5">
          <transition appear name="page">
            <v-card
              class="glass-card overflow-hidden"
              elevation="12"
              rounded="xl"
            >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="5"
                  class="d-none d-md-flex flex-column align-center justify-center bg-primary pa-6 text-white"
                >
                  <v-icon size="80" class="mb-6 animate-float"
                    >mdi-store</v-icon
                  >
                  <h2 class="text-h4 font-weight-bold mb-4 text-center">
                    Welcome Back
                  </h2>
                  <p class="text-body-1 text-center opacity-90">
                    Sign in to access your account and explore amazing products.
                  </p>
                  <v-divider class="my-6 w-75 opacity-50" />
                  <p class="text-caption opacity-70">Don't have an account?</p>
                  <v-btn
                    variant="outlined"
                    color="white"
                    class="mt-2"
                    to="/register"
                    prepend-icon="mdi-account-plus"
                  >
                    Create Account
                  </v-btn>
                </v-col>
                <v-col cols="12" md="7" class="pa-6 pa-md-8">
                  <div class="d-md-none text-center mb-6">
                    <v-icon size="48" color="primary" class="mb-2"
                      >mdi-store</v-icon
                    >
                    <h2 class="text-h5 font-weight-bold">Welcome Back</h2>
                  </div>
                  <LoginForm />
                </v-col>
              </v-row>
            </v-card>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import LoginForm from "@/components/auth/LoginForm.vue";
</script>
