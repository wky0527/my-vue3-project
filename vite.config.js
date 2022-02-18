import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import {resolve} from "path";

// https://vitejs.dev/config/
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': pathResolve('src') + '/',
      "~": pathResolve('src') + '/',
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://api.bspapp.com/',
        changeOrigin: true,
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "~/common/index.scss" as *;`,
      },
    },
  },
  plugins: [
    uni(),
  ],
})
