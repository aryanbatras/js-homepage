import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/js-homepage/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // chunkSizeWarningLimit: 1000,
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       monaco: ['@monaco-editor/react'],
    //       three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier']
    //     }
    //   }
    // }
  },
  server: {
    historyApiFallback: true
  }
})