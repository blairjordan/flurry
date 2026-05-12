import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import graphql from "vite-plugin-graphql-loader"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), graphql(), nodePolyfills()],
  server: {
    port: 8080,
  },
})

