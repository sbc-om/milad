import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Builds straight into the repository root so GitHub Pages keeps serving
// index.html from `main` without any settings change.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  base: './',
  publicDir: false,
  build: {
    outDir: path.resolve(__dirname, '..'),
    emptyOutDir: false,
    assetsDir: 'assets',
  },
})
