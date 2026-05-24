import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['validaciones.onrender.com'],
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173
  }
})