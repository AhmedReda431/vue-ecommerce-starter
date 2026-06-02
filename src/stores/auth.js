import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authApi } from "@/api/auth";
import { toast } from "@/plugins/sweetalert";
import { session } from "@/utils/session";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value && session.isValid());
  const isAdmin = computed(() => user.value?.role === "admin");

  const setAuth = (userData, accessToken) => {
    user.value = userData;
    token.value = accessToken;
    try {
      // Store under both keys for maximum compatibility
      session.set({
        token: accessToken,
        accessToken: accessToken,
        user: userData,
      });
      console.log(
        "[authStore] setAuth OK, token:",
        accessToken?.slice(0, 15) + "...",
      );
    } catch (e) {
      console.error("[authStore] session.set() failed:", e);
    }
  };

  const login = async (credentials) => {
    loading.value = true;
    try {
      const { data } = await authApi.login(credentials);
      console.log("[authStore] API response keys:", Object.keys(data));

      // DummyJSON returns `token`, some APIs return `accessToken`
      const accessToken = data.token || data.accessToken;
      if (!accessToken) {
        console.error("[authStore] No token in API response!", data);
        throw new Error("No authentication token received");
      }

      const userData = {
        ...data,
        name:
          `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
          data.username,
      };

      setAuth(userData, accessToken);
      toast.fire({ icon: "success", title: "Welcome back!" });
      return true;
    } catch (error) {
      console.error("[authStore] login error:", error);
      toast.fire({
        icon: "error",
        title: error.response?.data?.message || error.message || "Login failed",
      });
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (userData) => {
    loading.value = true;
    try {
      await authApi.register(userData);
      const loginRes = await authApi.login({
        email: userData.email,
        password: userData.password,
      });
      const accessToken = loginRes.data.token || loginRes.data.accessToken;
      const newUser = {
        ...loginRes.data,
        name:
          `${loginRes.data.firstName || ""} ${loginRes.data.lastName || ""}`.trim() ||
          loginRes.data.username,
      };
      setAuth(newUser, accessToken);
      toast.fire({ icon: "success", title: "Account created!" });
      return true;
    } catch (error) {
      console.error("[authStore] register error:", error);
      toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Registration failed",
      });
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      user.value = null;
      token.value = null;
      session.remove();
      toast.fire({ icon: "info", title: "Logged out" });
    }
  };

  const initAuth = () => {
    console.log("[authStore] initAuth starting...");
    const saved = session.get();
    if (saved) {
      // Handle both token naming conventions
      const restoredToken = saved.token || saved.accessToken;
      token.value = restoredToken || null;
      user.value = saved.user || null;

      console.log("[authStore] initAuth restored:", {
        user: user.value?.username,
        hasToken: !!token.value,
      });
    } else {
      console.log("[authStore] initAuth: no session found");
    }
  };

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    initAuth,
  };
});

// Debug helper — type in browser console after refresh
window.debugAuth = () => {
  const store = useAuthStore();
  console.log({
    isAuthenticated: store.isAuthenticated,
    token: store.token?.slice(0, 15) + "...",
    user: store.user,
  });
};
