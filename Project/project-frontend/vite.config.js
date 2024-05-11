import { defineConfig, loadEnv } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_SERVER_PORT, 10) || 6001
  },
  preview: {
    port: parseInt(process.env.VITE_PREVIEW_PORT, 10) || 6002
  }
});
