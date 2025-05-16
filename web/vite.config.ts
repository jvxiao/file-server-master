import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { requestFilter } from './src/plugins/requestFilter';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    //  requestFilter()
  ] ,
  server: {
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      // '/api': {
      //   // target: 'http://127.0.0.1:8000/api',
      //   target: 'http://127.0.0.1:8080/api',
      //   changeOrigin: true,
      //   ws: true,
      //   rewrite: (path) => {
      //     console.log(path,'***********')
      //     console.log(path.replace(/^\/api/, ''))
      //     return  path.replace(/^\/api/, '')
      //   },
      // },
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
