import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/js-homepage/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})