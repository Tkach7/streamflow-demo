import { defineConfig } from "vite";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch",
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      process: "process/browser",
    },
  },
  define: {
    global: "window",
    "process.env": process.env,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  base: "./",
  build: {
    outDir: "./docs",
  },
});
