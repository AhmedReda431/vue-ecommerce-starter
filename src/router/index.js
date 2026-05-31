import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
    meta: { guest: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/ForgotPasswordView.vue"),
    meta: { guest: true },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/views/ProductsView.vue"),
  },
  {
    path: "/products/infinite",
    name: "infinite-products",
    component: () => import("@/views/InfiniteProductsView.vue"),
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: () => import("@/views/ProductDetailsView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView.vue"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("@/views/FavoritesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("@/views/CheckoutView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
