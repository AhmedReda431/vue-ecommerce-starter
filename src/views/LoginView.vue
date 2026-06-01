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
                <v-icon size="80" class="mb-6 animate-float">mdi-store</v-icon>
                <h2 class="text-h4 font-weight-bold mb-4 text-center">
                  {{ $t('auth.welcome_back') }}
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

                <!-- Login Form Inline -->
                <v-form
                  @submit.prevent="handleSubmit"
                  ref="formRef"
                  class="mt-2"
                >
                  <v-text-field
                    v-model="form.email"
                    label="Username or Email"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Username is required']"
                    hint="Try: emilys"
                    persistent-hint
                    class="mb-4"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                  />

                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="showPassword = !showPassword"
                    variant="outlined"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) => v.length >= 4 || 'Min 4 characters',
                    ]"
                    hint="Try: emilyspass"
                    persistent-hint
                    class="mb-2"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                  />

                  <div class="d-flex justify-space-between align-center mb-4">
                    <v-checkbox
                      v-model="form.remember"
                      label="Remember me"
                      hide-details
                      density="compact"
                      color="primary"
                    />
                    <router-link
                      to="/forgot-password"
                      class="text-primary text-decoration-none text-body-2 font-weight-medium"
                    >
                      Forgot password?
                    </router-link>
                  </div>

                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="authStore.loading"
                    rounded="lg"
                    elevation="2"
                  >
                    Sign In
                  </v-btn>
                </v-form>

                <v-divider class="my-6" />

                <div class="text-center">
                  <span class="text-grey">Don't have an account?</span>
                  <router-link
                    to="/register"
                    class="text-primary font-weight-bold text-decoration-none ml-1"
                  >
                    Sign Up
                  </router-link>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const formRef = ref(null);
const showPassword = ref(false);

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  const success = await authStore.login({
    email: form.email,
    password: form.password,
  });

  if (success) {
    const redirectPath = route.query.redirect || "/";
    router.push(redirectPath);
  }
};
</script>
