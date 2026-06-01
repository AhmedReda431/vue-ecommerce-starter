<
<template>
  <v-app-bar
    app
    :color="themeStore.isDark ? 'grey-darken-4' : 'primary'"
    dark
    elevate-on-scroll
    scroll-behavior="elevate"
  >
    <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer" />

    <v-toolbar-title
      class="font-weight-bold cursor-pointer"
      @click="$router.push('/')"
    >
      <v-icon start class="mr-2">mdi-store</v-icon>
      {{ $t("app.title") }}
    </v-toolbar-title>

    <v-spacer />

    <!-- Desktop Search -->
    <v-sheet v-if="!mobile" width="300" class="mr-4">
      <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="solo"
        :placeholder="$t('app.search')"
        prepend-inner-icon="mdi-magnify"
        hide-details
        bg-color="rgba(255,255,255,0.15)"
        class="search-field"
        @keyup.enter="handleSearch"
        clearable
      />
    </v-sheet>

    <!-- Desktop Nav -->
    <template v-if="!mobile">
      <v-btn variant="text" to="/" prepend-icon="mdi-home">
        {{ $t("nav.home") }}
      </v-btn>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" prepend-icon="mdi-shopping">
            {{ $t("nav.shop") }}
          </v-btn>
        </template>
        <v-list density="compact" rounded="lg">
          <v-list-item
            to="/products"
            prepend-icon="mdi-view-grid"
            :title="$t('nav.allProducts')"
          />
          <v-list-item
            to="/products/infinite"
            prepend-icon="mdi-infinity"
            :title="$t('nav.infiniteScroll')"
          />
          <v-list-item
            to="/carousels"
            prepend-icon="mdi-view-carousel"
            :title="$t('nav.carouselExamples')"
          />
        </v-list>
      </v-menu>
    </template>

    <v-spacer v-if="!mobile" />

    <!-- Language Switcher -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon class="mr-2" v-bind="props">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <v-list density="compact" rounded="lg">
        <v-list-item
          @click="setLocale('en')"
          :active="locale === 'en'"
          title="English"
        />
        <v-list-item
          @click="setLocale('ar')"
          :active="locale === 'ar'"
          title="العربية"
        />
      </v-list>
    </v-menu>

    <!-- Dark Mode Toggle -->
    <v-btn
      icon
      class="mr-2"
      @click="themeStore.toggle"
      :title="themeStore.label"
    >
      <v-icon>{{ themeStore.icon }}</v-icon>
    </v-btn>

    <!-- Cart -->
    <v-btn icon to="/cart" class="mr-2">
      <v-badge
        :content="cartStore.totalItems"
        color="error"
        v-if="cartStore.totalItems > 0"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>

    <!-- Favorites -->
    <v-btn icon to="/favorites" class="mr-2" v-if="authStore.isAuthenticated">
      <v-badge
        :content="favoritesStore.totalFavorites"
        color="error"
        v-if="favoritesStore.totalFavorites > 0"
      >
        <v-icon>mdi-heart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-heart-outline</v-icon>
    </v-btn>

    <!-- Auth -->
    <template v-if="!authStore.isAuthenticated">
      <v-btn variant="outlined" to="/login" class="mr-2" rounded="lg">
        {{ $t("nav.login") }}
      </v-btn>
      <v-btn
        variant="elevated"
        color="white"
        class="text-primary"
        to="/register"
        rounded="lg"
      >
        {{ $t("nav.register") }}
      </v-btn>
    </template>

    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="32" color="white">
            <v-icon color="primary">mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list rounded="lg">
        <v-list-item to="/profile" prepend-icon="mdi-account-circle">
          <v-list-item-title>{{ $t("nav.profile") }}</v-list-item-title>
        </v-list-item>
        <v-list-item to="/favorites" prepend-icon="mdi-heart">
          <v-list-item-title>{{ $t("nav.favorites") }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          @click="themeStore.toggle"
          prepend-icon="mdi-theme-light-dark"
        >
          <v-list-item-title>{{ themeStore.label }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          @click="handleLogout"
          prepend-icon="mdi-logout"
          color="error"
        >
          <v-list-item-title>{{ $t("nav.logout") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    v-if="mobile"
    :location="isRtl ? 'right' : 'left'"
  >
    <v-list>
      <v-list-item to="/" prepend-icon="mdi-home" :title="$t('nav.home')" />
      <v-list-item
        to="/products"
        prepend-icon="mdi-shopping"
        :title="$t('nav.allProducts')"
      />
      <v-list-item
        to="/products/infinite"
        prepend-icon="mdi-infinity"
        :title="$t('nav.infiniteScroll')"
      />
      <v-list-item
        to="/carousels"
        prepend-icon="mdi-view-carousel"
        :title="$t('nav.carouselExamples')"
      />
      <v-list-item
        to="/cart"
        prepend-icon="mdi-cart"
        :title="`${$t('nav.cart')} (${cartStore.totalItems})`"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        to="/favorites"
        prepend-icon="mdi-heart"
        :title="$t('nav.favorites')"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        to="/profile"
        prepend-icon="mdi-account"
        :title="$t('nav.profile')"
      />
      <v-divider />
      <v-list-item
        @click="setLocale(locale === 'en' ? 'ar' : 'en')"
        prepend-icon="mdi-translate"
        :title="locale === 'en' ? 'العربية' : 'English'"
      />
      <v-divider />
      <v-list-item
        @click="themeStore.toggle"
        prepend-icon="mdi-theme-light-dark"
        :title="themeStore.label"
      />
      <v-divider />
      <v-list-item
        v-if="!authStore.isAuthenticated"
        to="/login"
        prepend-icon="mdi-login"
        :title="$t('nav.login')"
      />
      <v-list-item
        v-if="!authStore.isAuthenticated"
        to="/register"
        prepend-icon="mdi-account-plus"
        :title="$t('nav.register')"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        prepend-icon="mdi-logout"
        :title="$t('nav.logout')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { useThemeStore } from "@/stores/theme";
import { useLocale } from "@/composables/useLocale";
import Swal from "sweetalert2";

const { mobile } = useDisplay();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const themeStore = useThemeStore();
const { locale, isRtl, setLocale } = useLocale();

const drawer = ref(false);
const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/products", query: { search: searchQuery.value } });
  }
};

const handleLogout = async () => {
  const result = await Swal.fire({
    title: t("auth.logoutConfirmTitle"),
    text: t("auth.logoutConfirmText"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: t("auth.logoutConfirmButton"),
  });

  if (result.isConfirmed) {
    await authStore.logout();
    router.push("/");
  }
};
</script>
