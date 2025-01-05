import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'Frontend_codebase/dist', // Explicitly set the output directory to 'dist' inside Frontend_codebase
    chunkSizeWarningLimit: 1000,
  }
})
