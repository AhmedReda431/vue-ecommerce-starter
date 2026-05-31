<
<template>
  <v-card
    class="glass-card pa-6"
    elevation="12"
    max-width="450"
    width="100%"
    rounded="xl"
  >
    <div class="text-center mb-6">
      <v-icon size="48" color="primary" class="mb-2">mdi-lock-reset</v-icon>
      <v-card-title class="text-h5 font-weight-bold justify-center">
        Reset Password
      </v-card-title>
      <v-card-subtitle>
        Enter your email and we'll send you a reset link
      </v-card-subtitle>
    </div>

    <v-form @submit.prevent="handleSubmit" ref="formRef">
      <v-text-field
        v-model="email"
        label="Email Address"
        type="email"
        prepend-inner-icon="mdi-email"
        variant="outlined"
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ]"
        class="mb-4"
        rounded="lg"
        bg-color="grey-lighten-4"
      />
      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        :loading="loading"
        rounded="lg"
        elevation="2"
      >
        Send Reset Link
      </v-btn>
    </v-form>

    <div class="text-center mt-6">
      <router-link
        to="/login"
        class="text-primary text-decoration-none font-weight-medium"
      >
        <v-icon size="small" class="mr-1">mdi-arrow-left</v-icon>
        Back to Login
      </router-link>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { toast } from "@/plugins/sweetalert";

const email = ref("");
const loading = ref(false);
const formRef = ref(null);

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    toast.fire({ icon: "success", title: "Reset link sent to your email!" });
    email.value = "";
  }, 1500);
};
</script>
