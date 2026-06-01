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
      A.R Shope
    </v-toolbar-title>

    <v-spacer />

    <!-- Desktop Search -->
    <v-sheet v-if="!mobile" width="300" class="mr-4">
      <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="solo"
        placeholder="Search products..."
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
      <v-btn variant="text" to="/" prepend-icon="mdi-home">Home</v-btn>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" prepend-icon="mdi-shopping"
            >Shop</v-btn
          >
        </template>
        <v-list density="compact" rounded="lg">
          <v-list-item
            to="/products"
            prepend-icon="mdi-view-grid"
            title="All Products"
          />
          <v-list-item
            to="/products/infinite"
            prepend-icon="mdi-infinity"
            title="Infinite Scroll"
          />
          <v-list-item
            to="/carousels"
            prepend-icon="mdi-view-carousel"
            title="Carousel Examples"
          />
        </v-list>
      </v-menu>
    </template>

    <v-spacer v-if="!mobile" />

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
      <v-btn variant="outlined" to="/login" class="mr-2" rounded="lg"
        >Login</v-btn
      >
      <v-btn
        variant="elevated"
        color="white"
        class="text-primary"
        to="/register"
        rounded="lg"
        >Sign Up</v-btn
      >
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
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/favorites" prepend-icon="mdi-heart">
          <v-list-item-title>Favorites</v-list-item-title>
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
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary v-if="mobile" location="left">
    <v-list>
      <v-list-item to="/" prepend-icon="mdi-home" title="Home" />
      <v-list-item
        to="/products"
        prepend-icon="mdi-shopping"
        title="All Products"
      />
      <v-list-item
        to="/products/infinite"
        prepend-icon="mdi-infinity"
        title="Infinite Scroll"
      />
      <v-list-item
        to="/carousels"
        prepend-icon="mdi-view-carousel"
        title="Carousel Examples"
      />
      <v-list-item
        to="/cart"
        prepend-icon="mdi-cart"
        :title="`Cart (${cartStore.totalItems})`"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        to="/favorites"
        prepend-icon="mdi-heart"
        title="Favorites"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        to="/profile"
        prepend-icon="mdi-account"
        title="Profile"
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
        title="Login"
      />
      <v-list-item
        v-if="!authStore.isAuthenticated"
        to="/register"
        prepend-icon="mdi-account-plus"
        title="Register"
      />
      <v-list-item
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        prepend-icon="mdi-logout"
        title="Logout"
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
import Swal from "sweetalert2";

const { mobile } = useDisplay();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const themeStore = useThemeStore();

const drawer = ref(false);
const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/products", query: { search: searchQuery.value } });
  }
};

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, logout",
  });

  if (result.isConfirmed) {
    await authStore.logout();
    router.push("/");
  }
};
</script>
