import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      // Forward /api requests to backend in dev
      // "/api": {
      //   target: "http://backend:5000",
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV !== "production",
  },
});
