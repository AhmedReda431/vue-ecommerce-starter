import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(localStorage.getItem("theme") === "dark");

  const icon = computed(() =>
    isDark.value ? "mdi-weather-sunny" : "mdi-weather-night",
  );
  const label = computed(() => (isDark.value ? "Light Mode" : "Dark Mode"));

  const toggle = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  const setDark = (value) => {
    isDark.value = value;
    applyTheme();
  };

  const applyTheme = () => {
    const theme = isDark.value ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  const init = () => {
    applyTheme();
  };

  return {
    isDark,
    icon,
    label,
    toggle,
    setDark,
    init,
  };
});
