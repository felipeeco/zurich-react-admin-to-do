import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "React Admin ToDo",
        short_name: "ToDo",
        description: "A ToDo application implemented with React Admin",
        theme_color: "#ffffff",
        icons: [
          {
            src: "180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshot-desktop.png",
            form_factor: "wide",
            sizes: "2560X1600",
          },
          {
            src: "screenshot-mobile.png",
            form_factor: "narrow",
            sizes: "750X1334",
          },
        ],
      },
    }),
    react(),
  ],
  server: {
    host: true,
  },
  base: "./",
  build: {
    sourcemap: mode === "developement",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
}));
