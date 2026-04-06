import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const workspaceRoot = path.resolve(__dirname, "../..");

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    fs: {
      allow: [workspaceRoot],
    },
  },
});
