import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ['vue'],
  },
  build: {
    assetsDir: resolve(__dirname, 'src/assets'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-sorrybook',
      fileName: 'sorrybook',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
