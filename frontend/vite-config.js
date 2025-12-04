import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // ⭐ Set your fixed port here
    strictPort: true // ⭐ If port 5173 is busy, Vite will ERROR instead of switching ports
  }
})
