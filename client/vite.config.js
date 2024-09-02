import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         "/api": {
            target: process.env.REACT_APP_API_URL,
            changeOrigin: true,
            secure: true,
            ws: true,
         },
      },
   },
});
