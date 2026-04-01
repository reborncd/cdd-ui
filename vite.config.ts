/*
 * @Author: 杨亚茹
 * @Date: 2025-02-17 17:33:58
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-03-07 10:50:22
 * @FilePath: /iflorens-web-ui/vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite';
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

let url = 'https://iflorensextuat.florens.com'; // 测试
// https://iflorens-test.florens.com.cn
url = 'https://iflorens-test.florens.com.cn';

const resolve = path.resolve;

export default defineConfig({
  base: '/',
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  server: {
    port: 2021,
    host: '0.0.0.0',
    proxy: {
      '/iflorens-vendor': {
        target: url,
        changeOrigin: true
      },
      '/iflorens-new-contract': {
        target: url,
        changeOrigin: true
      },
      '/iflorens-order': {
        target: url,
        changeOrigin: true
      },
      '/auth': {
        target: url,
        changeOrigin: true
      },
      '/iflorens-ram': {
        target: url,
        changeOrigin: true
      },
      '/sone-ctm': {
        target: url,
        changeOrigin: true
      },
      '/iflorens-contract': {
        target: url,
        changeOrigin: true
      },
      '/iflorens-file': {
        target: url,
        changeOrigin: true
      },
      '/iflorens-mdm': {
        target: url,
        changeOrigin: true
      },
      '/api': {
        target: 'http://10.18.13.31:31312/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: '@zy-ui', replacement: resolve(__dirname, './src') }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        // additionalData: `@import "@/packages/styles/variables.scss";@import "@/sites/assets/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'ie > 11', 'iOS >= 10', 'Android >= 5']
        })
      ]
    }
  },
  plugins: [
    vitePluginVuedoc({}),
    vue({
      include: [/\.vue$/, /\.md$/, ...vueDocFiles]
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});
