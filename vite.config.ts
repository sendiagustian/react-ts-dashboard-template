import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        outDir: "dist",
        chunkSizeWarningLimit: 1600,
    },
});
