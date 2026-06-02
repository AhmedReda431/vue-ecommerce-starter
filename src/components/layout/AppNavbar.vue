<template>
  <v-app-bar
    app
    :color="themeStore.isDark ? 'grey-darken-4' : 'white'"
    dark
    elevate-on-scroll
    scroll-behavior="elevate"
    density="comfortable"
    class="app-bar-modern"
  >
    <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer" class="ms-2" />

    <!-- Logo -->
    <v-toolbar-title
      class="font-weight-bold cursor-pointer d-flex align-center brand-title"
      @click="$router.push('/')"
    >
      <v-icon size="28" class="me-2">mdi-store</v-icon>
      <span class="text-h6 font-weight-bold">{{ $t("A-R Shop") }}</span>
    </v-toolbar-title>

    <!-- Desktop Nav -->
    <template v-if="!mobile">
      <v-btn
        variant="text"
        to="/"
        class="text-none ms-2"
        prepend-icon="mdi-home"
      >
        {{ $t("nav.home") }}
      </v-btn>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            class="text-none"
            prepend-icon="mdi-shopping"
          >
            {{ $t("nav.shop") }}
          </v-btn>
        </template>
        <v-list density="compact" rounded="lg" class="pa-2">
          <v-list-item
            to="/products"
            prepend-icon="mdi-view-grid"
            :title="$t('nav.allProducts')"
            rounded="lg"
          />
          <v-list-item
            to="/products/infinite"
            prepend-icon="mdi-infinity"
            :title="$t('nav.infiniteScroll')"
            rounded="lg"
          />
          <v-list-item
            to="/carousels"
            prepend-icon="mdi-view-carousel"
            :title="$t('nav.carouselExamples')"
            rounded="lg"
          />
        </v-list>
      </v-menu>

      <v-btn
        variant="text"
        to="/about"
        class="text-none"
        prepend-icon="mdi-information"
      >
        {{ $t("nav.about") }}
      </v-btn>
      <v-btn
        variant="text"
        to="/contact"
        class="text-none"
        prepend-icon="mdi-email"
      >
        {{ $t("nav.contact") }}
      </v-btn>
      <v-btn
        variant="text"
        to="/faq"
        class="text-none"
        prepend-icon="mdi-help-circle"
      >
        {{ $t("nav.faq") }}
      </v-btn>
    </template>

    <v-spacer />

    <!-- Search -->
    <v-sheet v-if="!mobile" width="320" class="mx-4">
      <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="tonal"
        :placeholder="$t('Search for products...')"
        prepend-inner-icon="mdi-magnify"
        hide-details
        flat
        rounded="lg"
        class="search-modern"
        @keyup.enter="handleSearch"
        clearable
      />
    </v-sheet>

    <v-spacer v-if="!mobile" />

    <!-- Actions -->
    <div class="d-flex align-center gap-2 me-2">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="text" size="small">
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

      <v-btn
        icon
        @click="themeStore.toggle"
        :title="themeStore.label"
        variant="text"
        size="small"
      >
        <v-icon>{{ themeStore.icon }}</v-icon>
      </v-btn>

      <v-btn icon to="/cart" variant="text">
        <v-badge
          :content="cartStore.totalItems"
          color="error"
          v-if="cartStore.totalItems > 0"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>

      <v-btn
        icon
        to="/favorites"
        variant="text"
        v-if="authStore.isAuthenticated"
      >
        <v-badge
          :content="favoritesStore.totalFavorites"
          color="error"
          v-if="favoritesStore.totalFavorites > 0"
        >
          <v-icon>mdi-heart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>

      <template v-if="!authStore.isAuthenticated">
        <v-btn
          variant="outlined"
          to="/login"
          class="text-none"
          rounded="lg"
          size="small"
        >
          {{ $t("nav.login") }}
        </v-btn>
        <v-btn
          variant="elevated"
          color="white"
          class="text-primary text-none"
          to="/register"
          rounded="lg"
          size="small"
        >
          {{ $t("nav.register") }}
        </v-btn>
      </template>

      <v-menu v-else offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="text">
            <v-avatar size="32" color="white">
              <v-icon color="primary">mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list rounded="lg" density="compact" class="pa-2">
          <v-list-item
            to="/profile"
            prepend-icon="mdi-account-circle"
            :title="$t('profile')"
            rounded="lg"
          />
          <!-- <v-list-item
            to="/favorites"
            prepend-icon="mdi-heart"
            :title="$t('favorites')"
            rounded="lg"
          /> -->
          <!-- <v-divider class="my-2" /> -->
          <!-- <v-list-item
            @click="themeStore.toggle"
            prepend-icon="mdi-theme-light-dark"
            :title="themeStore.label"
            rounded="lg"
          /> -->
          <v-divider class="my-2" />
          <v-list-item
            @click="handleLogout"
            prepend-icon="mdi-logout"
            :title="$t('logout')"
            rounded="lg"
            color="error"
          />
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    v-if="mobile"
    :location="isRtl ? 'right' : 'left'"
    class="mobile-drawer"
  >
    <div class="pa-4">
      <div class="d-flex align-center mb-4">
        <v-icon size="32" color="primary" class="me-3">mdi-store</v-icon>
        <span class="text-h6 font-weight-bold">{{ $t("app.title") }}</span>
      </div>

      <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="outlined"
        :placeholder="$t('app.search')"
        prepend-inner-icon="mdi-magnify"
        hide-details
        rounded="lg"
        class="mb-4"
        @keyup.enter="handleSearch"
        clearable
      />
    </div>

    <v-list density="compact" class="px-2">
      <v-list-item
        to="/"
        prepend-icon="mdi-home"
        :title="$t('nav.home')"
        rounded="lg"
      />
      <v-list-item
        to="/products"
        prepend-icon="mdi-shopping"
        :title="$t('nav.allProducts')"
        rounded="lg"
      />
      <v-list-item
        to="/products/infinite"
        prepend-icon="mdi-infinity"
        :title="$t('nav.infiniteScroll')"
        rounded="lg"
      />
      <v-list-item
        to="/carousels"
        prepend-icon="mdi-view-carousel"
        :title="$t('nav.carouselExamples')"
        rounded="lg"
      />
      <v-divider class="my-2" />
      <v-list-item
        to="/about"
        prepend-icon="mdi-information"
        :title="$t('nav.about')"
        rounded="lg"
      />
      <v-list-item
        to="/contact"
        prepend-icon="mdi-email"
        :title="$t('nav.contact')"
        rounded="lg"
      />
      <v-list-item
        to="/faq"
        prepend-icon="mdi-help-circle"
        :title="$t('nav.faq')"
        rounded="lg"
      />
      <v-divider class="my-2" />
      <v-list-item
        to="/cart"
        prepend-icon="mdi-cart"
        :title="`${$t('nav.cart')} (${cartStore.totalItems})`"
        rounded="lg"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        to="/favorites"
        prepend-icon="mdi-heart"
        :title="$t('nav.favorites')"
        rounded="lg"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        to="/profile"
        prepend-icon="mdi-account"
        :title="$t('nav.profile')"
        rounded="lg"
      />
      <v-divider class="my-2" />
      <v-list-item
        @click="setLocale(locale === 'en' ? 'ar' : 'en')"
        prepend-icon="mdi-translate"
        :title="locale === 'en' ? 'العربية' : 'English'"
        rounded="lg"
      />
      <v-list-item
        @click="themeStore.toggle"
        prepend-icon="mdi-theme-light-dark"
        :title="themeStore.label"
        rounded="lg"
      />
      <v-divider class="my-2" />
      <v-list-item
        v-if="!authStore.isAuthenticated"
        to="/login"
        prepend-icon="mdi-login"
        :title="$t('nav.login')"
        rounded="lg"
      />
      <v-list-item
        v-if="!authStore.isAuthenticated"
        to="/register"
        prepend-icon="mdi-account-plus"
        :title="$t('nav.register')"
        rounded="lg"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        prepend-icon="mdi-logout"
        :title="$t('nav.logout')"
        rounded="lg"
        color="error"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { useThemeStore } from "@/stores/theme";
import { useLocale } from "@/composables/useLocale";
import Swal from "sweetalert2";

const { mobile } = useDisplay();
const router = useRouter();
const { t } = useI18n();
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
    drawer.value = false;
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

<style scoped>
.app-bar-modern {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.gap-2 {
  gap: 8px;
}

.mobile-drawer {
  border-radius: 0 16px 16px 0;
}
html.rtl .mobile-drawer {
  border-radius: 16px 0 0 16px;
}
.brand-title{
  min-inline-size: 150px;
}
</style>
