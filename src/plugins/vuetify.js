import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { en, ar } from "vuetify/locale";

const savedLocale = localStorage.getItem("locale") || "en";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  locale: {
    locale: savedLocale,
    fallback: "en",
    messages: { en, ar },
  },
  theme: {
  defaultTheme: localStorage.getItem("theme") || "light",
  themes: {
    light: {
      dark: false,
      colors: {
        primary: "#2563EB",     // Modern blue
        secondary: "#64748B",   // Slate
        accent: "#3B82F6",
        success: "#22C55E",
        info: "#0EA5E9",
        warning: "#F59E0B",
        error: "#EF4444",

        background: "#F8FAFC",
        surface: "#FFFFFF",
        "surface-variant": "#F1F5F9",

        "on-primary": "#FFFFFF",
        "on-surface": "#0F172A",
        "on-background": "#0F172A",
      },
    },

    dark: {
      dark: true,
      colors: {
        primary: "#60A5FA",
        secondary: "#94A3B8",
        accent: "#3B82F6",
        success: "#4ADE80",
        info: "#38BDF8",
        warning: "#FBBF24",
        error: "#F87171",

        background: "#0F172A",
        surface: "#1E293B",
        "surface-variant": "#334155",

        "on-primary": "#FFFFFF",
        "on-surface": "#F8FAFC",
        "on-background": "#F8FAFC",
      },
    },
  },
}
});
