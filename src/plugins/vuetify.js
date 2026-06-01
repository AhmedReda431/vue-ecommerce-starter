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
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background: "#FFFFFF",
          surface: "#FFFFFF",
        },
      },
      dark: {
        colors: {
          primary: "#90CAF9",
          secondary: "#B0BEC5",
          accent: "#448AFF",
          error: "#EF5350",
          info: "#42A5F5",
          success: "#66BB6A",
          warning: "#FFCA28",
          background: "#121212",
          surface: "#1E1E1E",
        },
      },
    },
  },
});
