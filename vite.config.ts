import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import string from 'vite-plugin-string';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    string({
      include: ["**/*.html"],  // Include HTML files
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main.ts"), // Path to main Vue app entry
        content: resolve(__dirname, "src/contents/index.ts"), // Path to content script
        index: resolve(__dirname, "index.html"),
      },
      output: {
        // Optional: Clean up the output directory structure
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});
