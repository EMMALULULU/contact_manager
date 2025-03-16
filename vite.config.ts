import { defineConfig, loadEnv } from "vite";

import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    // base: process.env.VITE_BASE_URL + process.env.VITE_BASE_NAME,
    plugins: [
      react(),
    ],
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  });
};
