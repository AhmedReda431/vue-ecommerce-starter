import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authApi } from "@/api/auth";
import { toast } from "@/plugins/sweetalert";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  const setAuth = (userData, accessToken) => {
    user.value = userData;
    token.value = accessToken;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const login = async (credentials) => {
    loading.value = true;
    try {
      const { data } = await authApi.login(credentials);
      const userData = {
        ...data,
        name:
          `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
          data.username,
      };
      setAuth(userData, data.token);
      toast.fire({ icon: "success", title: "Welcome back!" });
      return true;
    } catch (error) {
      toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Login failed",
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
      // Auto-login after register
      const loginRes = await authApi.login({
        email: userData.email,
        password: userData.password,
      });
      const newUser = {
        ...loginRes.data,
        name:
          `${loginRes.data.firstName || ""} ${loginRes.data.lastName || ""}`.trim() ||
          loginRes.data.username,
      };
      setAuth(newUser, loginRes.data.token);
      toast.fire({ icon: "success", title: "Account created!" });
      return true;
    } catch (error) {
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.fire({ icon: "info", title: "Logged out" });
    }
  };

  const initAuth = () => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser);
      token.value = savedToken;
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
