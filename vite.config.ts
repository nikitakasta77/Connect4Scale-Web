import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Windows native fs.watch can throw EBUSY when another process (AV,
      // thumbnailer, etc.) briefly locks a watched file, which crashes the
      // whole dev server. Polling avoids taking OS watch handles at all.
      usePolling: true,
    },
  },
})
