import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/clima1/',
  build: {
    outDir: 'dist'
  }
}) 