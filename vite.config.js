import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Auto-injected into every SCSS file
        additionalData: `
          @use "@styles/variables" as *;
          @use "@styles/mixins" as *;
        `,
        // Required for modern Sass module syntax (@use)
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "pinia",
      "vuetify",
      "axios",
      "sweetalert2",
      "swiper",
    ],
  },
});
