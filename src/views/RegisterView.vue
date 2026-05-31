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
                  class="d-none d-md-flex flex-column align-center justify-center bg-success pa-6 text-white"
                >
                  <v-icon size="80" class="mb-6 animate-float"
                    >mdi-account-plus</v-icon
                  >
                  <h2 class="text-h4 font-weight-bold mb-4 text-center">
                    Join Us
                  </h2>
                  <p class="text-body-1 text-center opacity-90">
                    Create an account today and start your shopping journey.
                  </p>
                  <v-divider class="my-6 w-75 opacity-50" />
                  <p class="text-caption opacity-70">
                    Already have an account?
                  </p>
                  <v-btn
                    variant="outlined"
                    color="white"
                    class="mt-2"
                    to="/login"
                    prepend-icon="mdi-login"
                  >
                    Sign In
                  </v-btn>
                </v-col>
                <v-col cols="12" md="7" class="pa-6 pa-md-8">
                  <div class="d-md-none text-center mb-6">
                    <v-icon size="48" color="success" class="mb-2"
                      >mdi-account-plus</v-icon
                    >
                    <h2 class="text-h5 font-weight-bold">Create Account</h2>
                  </div>
                  <RegisterForm />
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
import RegisterForm from "@/components/auth/RegisterForm.vue";
</script>
