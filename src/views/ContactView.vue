<template>
  <v-container class="py-12">
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-4">{{ $t("contact.title") }}</h1>
        <p class="text-body-1 text-medium-emphasis">
          {{ $t("contact.subtitle") }}
        </p>
      </v-col>
    </v-row>

    <v-row>
      <!-- Info Cards -->
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card rounded="xl" class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar color="primary" class="me-4">
                  <v-icon color="white">mdi-map-marker</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    {{ $t("contact.addressTitle") }}
                  </div>
                  <div class="text-body-2 text-medium-emphasis">
                    {{ $t("contact.addressText") }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card rounded="xl" class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar color="primary" class="me-4">
                  <v-icon color="white">mdi-phone</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    {{ $t("contact.phoneTitle") }}
                  </div>
                  <div class="text-body-2 text-medium-emphasis">
                    {{ $t("contact.phoneText") }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card rounded="xl" class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar color="primary" class="me-4">
                  <v-icon color="white">mdi-email</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    {{ $t("contact.emailTitle") }}
                  </div>
                  <div class="text-body-2 text-medium-emphasis">
                    {{ $t("contact.emailText") }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Form -->
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="2" class="pa-6 pa-md-8">
          <v-form @submit.prevent="handleSubmit" ref="formRef">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  :label="$t('contact.formName')"
                  variant="outlined"
                  rounded="lg"
                  :rules="[required]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  :label="$t('contact.formEmail')"
                  variant="outlined"
                  rounded="lg"
                  type="email"
                  :rules="[required, emailRule]"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.subject"
                  :label="$t('contact.formSubject')"
                  variant="outlined"
                  rounded="lg"
                  :rules="[required]"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  :label="$t('contact.formMessage')"
                  variant="outlined"
                  rounded="lg"
                  rows="5"
                  :rules="[required]"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  rounded="lg"
                  block
                  :loading="loading"
                >
                  {{ $t("contact.formSubmit") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { t } = useI18n();
const formRef = ref(null);
const loading = ref(false);

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const required = (v) => !!v || t("contact.required");
const emailRule = (v) => /.+@.+\..+/.test(v) || t("contact.invalidEmail");

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  loading.value = false;

  Swal.fire({
    icon: "success",
    title: t("contact.successTitle"),
    text: t("contact.successText"),
    confirmButtonColor: "#1976D2",
  });

  form.value = { name: "", email: "", subject: "", message: "" };
  formRef.value.reset();
};
</script>
