import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176, // Ensure your frontend runs on this port
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // Your Flask backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" prefix
      },
    },
  },
});
