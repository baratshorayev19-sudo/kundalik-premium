import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Kundalik Premium',
        short_name: 'Kundalik',
        description: 'Luxury productivity planner for premium daily flow, rituals, and insights.',
        theme_color: '#7c3aed',
        background_color: '#09070f',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
})
