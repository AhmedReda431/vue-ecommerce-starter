import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Direct imports for auth pages to prevent white screen
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { guest: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordView,
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
  {
    path: "/carousels",
    name: "carousels",
    component: () => import("@/views/CarouselExamplesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
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

// Fix for white screen - force page refresh on route error
router.onError((error) => {
  console.error("Router error:", error);
  window.location.reload();
});

export default router;
