import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'docs' },
  base: '/portfolio-v2/',
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
