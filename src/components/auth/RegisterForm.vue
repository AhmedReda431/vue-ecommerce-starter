<
<template>
  <v-card class="pa-4" max-width="450" width="100%">
    <v-card-title class="text-h5 font-weight-bold text-center mb-2">
      Create Account
    </v-card-title>
    <v-card-subtitle class="text-center mb-6">
      Join us today and start shopping
    </v-card-subtitle>

    <v-form @submit.prevent="handleSubmit" ref="formRef">
      <v-text-field
        v-model="form.name"
        label="Full Name"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[(v) => !!v || 'Name is required']"
        class="mb-2"
      />

      <v-text-field
        v-model="form.email"
        label="Email"
        type="email"
        prepend-inner-icon="mdi-email"
        variant="outlined"
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ]"
        class="mb-2"
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
          (v) => v.length >= 6 || 'Min 6 characters',
        ]"
        class="mb-2"
      />

      <v-text-field
        v-model="form.confirmPassword"
        label="Confirm Password"
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-check"
        variant="outlined"
        :rules="[
          (v) => !!v || 'Confirm password is required',
          (v) => v === form.password || 'Passwords must match',
        ]"
        class="mb-4"
      />

      <v-checkbox
        v-model="form.agree"
        :rules="[(v) => !!v || 'You must agree to continue']"
        class="mb-2"
      >
        <template v-slot:label>
          <span class="text-body-2">
            I agree to the
            <a href="#" class="text-primary">Terms of Service</a> and
            <a href="#" class="text-primary">Privacy Policy</a>
          </span>
        </template>
      </v-checkbox>

      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        :loading="authStore.loading"
      >
        Create Account
      </v-btn>
    </v-form>

    <v-divider class="my-6" />

    <div class="text-center">
      <span class="text-grey">Already have an account?</span>
      <router-link
        to="/login"
        class="text-primary font-weight-bold text-decoration-none ml-1"
      >
        Sign In
      </router-link>
    </div>
  </v-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const formRef = ref(null);
const showPassword = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
});

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  const success = await authStore.register({
    name: form.name,
    email: form.email,
    password: form.password,
  });

  if (success) {
    router.push("/");
  }
};
</script>
