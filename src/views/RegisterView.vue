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
                <p class="text-caption opacity-70">Already have an account?</p>
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

                <!-- Register Form Inline -->
                <v-form @submit.prevent="handleSubmit" ref="formRef">
                  <v-text-field
                    v-model="form.name"
                    label="Full Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Name is required']"
                    class="mb-2"
                    rounded="lg"
                    bg-color="grey-lighten-4"
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
                      (v) => v.length >= 6 || 'Min 6 characters',
                    ]"
                    class="mb-2"
                    rounded="lg"
                    bg-color="grey-lighten-4"
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
                    rounded="lg"
                    bg-color="grey-lighten-4"
                  />

                  <v-checkbox
                    v-model="form.agree"
                    :rules="[(v) => !!v || 'You must agree to continue']"
                    class="mb-2"
                  >
                    <template v-slot:label>
                      <span class="text-body-2">
                        I agree to the
                        <a href="#" class="text-primary">Terms of Service</a>
                        and <a href="#" class="text-primary">Privacy Policy</a>
                      </span>
                    </template>
                  </v-checkbox>

                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="authStore.loading"
                    rounded="lg"
                    elevation="2"
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
