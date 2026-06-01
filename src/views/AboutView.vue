<template>
  <v-container class="py-12">
    <!-- Hero -->
    <v-row justify="center" class="mb-12">
      <v-col cols="12" md="8" class="text-center">
        <v-chip color="primary" variant="tonal" class="mb-4" size="large">
          {{ $t("about.tagline") }}
        </v-chip>
        <h1 class="text-h3 font-weight-bold mb-4">{{ $t("about.title") }}</h1>
        <p class="text-body-1 text-medium-emphasis">
          {{ $t("about.subtitle") }}
        </p>
      </v-col>
    </v-row>

    <!-- Mission / Vision -->
    <v-row class="mb-12">
      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="2" class="h-100 pa-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-rocket</v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">
            {{ $t("about.missionTitle") }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t("about.missionText") }}
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="2" class="h-100 pa-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-eye</v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">
            {{ $t("about.visionTitle") }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t("about.visionText") }}
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="2" class="h-100 pa-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-heart</v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">
            {{ $t("about.valuesTitle") }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t("about.valuesText") }}
          </p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Stats -->
    <v-row justify="center" class="mb-12">
      <v-col cols="12" md="10">
        <v-card rounded="xl" color="primary" class="pa-8 text-center">
          <v-row>
            <v-col cols="6" md="3">
              <div class="text-h3 font-weight-bold">10K+</div>
              <div class="text-body-2 opacity-80">
                {{ $t("about.products") }}
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="text-h3 font-weight-bold">50K+</div>
              <div class="text-body-2 opacity-80">
                {{ $t("about.customers") }}
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="text-h3 font-weight-bold">99%</div>
              <div class="text-body-2 opacity-80">
                {{ $t("about.satisfaction") }}
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="text-h3 font-weight-bold">24/7</div>
              <div class="text-body-2 opacity-80">
                {{ $t("about.support") }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Team -->
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold">{{ $t("about.teamTitle") }}</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-for="i in 4" :key="i">
        <v-card rounded="xl" class="text-center pa-6">
          <v-avatar size="100" color="primary" class="mb-4">
            <v-icon size="48">mdi-account</v-icon>
          </v-avatar>
          <h4 class="text-h6 font-weight-bold">
            {{ $t(`about.member${i}Name`) }}
          </h4>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t(`about.member${i}Role`) }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
