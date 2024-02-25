import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/components/layouts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utilities": path.resolve(__dirname, "src/utilities"),
      "@atoms": path.resolve(__dirname, "src/atoms"),
      "@sharedComponents": path.resolve(__dirname, "src/sharedComponents"),
      "@type": path.resolve(__dirname, "src/type")
    },
  },
});
