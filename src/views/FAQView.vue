<template>
  <v-container class="py-12">
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-4">{{ $t("faq.title") }}</h1>
        <p class="text-body-1 text-medium-emphasis mb-6">
          {{ $t("faq.subtitle") }}
        </p>
        <v-text-field
          v-model="search"
          :placeholder="$t('faq.search')"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          rounded="lg"
          hide-details
          clearable
          class="mx-auto"
          max-width="500"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-expansion-panels variant="accordion" rounded="xl">
          <v-expansion-panel
            v-for="(item, i) in filteredItems"
            :key="i"
            :title="item.q"
            :text="item.a"
            class="mb-2"
            rounded="lg"
          />
        </v-expansion-panels>

        <v-alert
          v-if="filteredItems.length === 0"
          type="info"
          variant="tonal"
          rounded="lg"
          class="mt-4"
        >
          {{ $t("faq.noResults") }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-12">
      <v-col cols="12" md="8">
        <v-card rounded="xl" color="primary" class="pa-8 text-center">
          <v-icon size="48" class="mb-4">mdi-headset</v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">
            {{ $t("faq.ctaTitle") }}
          </h3>
          <p class="text-body-1 mb-4 opacity-90">
            {{ $t("faq.ctaText") }}
          </p>
          <v-btn
            to="/contact"
            variant="elevated"
            color="white"
            class="text-primary"
            rounded="lg"
            size="large"
          >
            {{ $t("faq.ctaButton") }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const search = ref("");

const items = computed(() => [
  { q: t("faq.q1"), a: t("faq.a1") },
  { q: t("faq.q2"), a: t("faq.a2") },
  { q: t("faq.q3"), a: t("faq.a3") },
  { q: t("faq.q4"), a: t("faq.a4") },
  { q: t("faq.q5"), a: t("faq.a5") },
  { q: t("faq.q6"), a: t("faq.a6") },
]);

const filteredItems = computed(() => {
  if (!search.value) return items.value;
  const q = search.value.toLowerCase();
  return items.value.filter(
    (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q),
  );
});
</script>
