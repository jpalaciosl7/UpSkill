/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias '@' -> 'src' para imports limpios en todo el proyecto
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    // tmp/ y .dwp/ son áreas locales (gitignored) que pueden traer repos o
    // scripts ajenos con sus propias pruebas: nunca forman parte de la suite.
    exclude: [...configDefaults.exclude, 'tmp/**', '.dwp/**'],
  },
})
