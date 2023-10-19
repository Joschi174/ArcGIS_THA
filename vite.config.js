import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  build: {
    chunkSizeWarningLimit: 2000
  },
  server: {
    open: true
  }  
})
