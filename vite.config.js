import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

export default defineConfig({  
  plugins: [
    react()
  ],
  build: {
    lib: {
      name: 'conjoined',
      target: 'esnext',
      entry: path.resolve(__dirname, 'src/index.js'),      
      fileName: (format) => `index.${format}.js`,
      sourcemap: true
    },
    rollupOptions: {
      external: [
        'next/router',
        'react',
        'react-dom',
        'axios',
      ]
    },
  }
})
