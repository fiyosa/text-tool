import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: '/text-tool/', // optional

    server: {
      port: 3000,
      host: 'localhost',
    },

    preview: {
      port: 3001,
      host: 'localhost',
    },

    esbuild: {
      legalComments: 'none',
      drop: command === 'serve' ? [] : ['console'],
    },

    build: {
      outDir: 'docs',
      emptyOutDir: true,
      manifest: false,
      rollupOptions: {
        output: {
          entryFileNames: 'main.js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'index.css') return 'main.css'
            return 'assets/[name]-[hash].[ext]'
          },
        },
      },
    },
  }
})
