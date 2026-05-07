import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

function getNodeModulePackageName(id: string): string | null {
  if (!id.includes('node_modules')) return null
  const modulePath = id.split('/node_modules/').pop()
  if (!modulePath) return null
  const [scopeOrName, maybeName] = modulePath.split('/')
  return scopeOrName?.startsWith('@') ? `${scopeOrName}/${maybeName}` : scopeOrName
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const packageName = getNodeModulePackageName(id)
          if (!packageName) return undefined

          if (['react', 'react-dom', 'scheduler'].includes(packageName)) {
            return 'vendor-react'
          }
          if (['react-router', 'react-router-dom', '@remix-run/router'].includes(packageName)) {
            return 'vendor-router'
          }
          if (packageName === 'motion' || packageName === 'framer-motion') {
            return 'vendor-motion'
          }
          if (packageName === 'recharts' || packageName.startsWith('d3-') || ['redux', 'react-redux', '@reduxjs/toolkit', 'reselect'].includes(packageName)) {
            return 'vendor-charts'
          }
          // react-markdown and its deps (remark, rehype, mdast, micromark, unified, unist, hast)
          // are NOT in manualChunks — they bundle with FloatingChat's lazy chunk automatically
          return undefined
        },
      },
    },
  },
})
