<template>
  <v-form @submit.prevent="handleSubmit" ref="formRef" class="mt-2">
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
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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

    <div class="d-flex justify-space-between align-center mb-6">
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
  </v-form>
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
