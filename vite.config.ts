/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const {
    VITE_APP_PROXY_PATH,
    VITE_APP_PROXY_TARGET,
    VITE_APP_API_URL,
  } = env;

  return {
    base: './',
    server: {
      host: true,
      proxy: {
        [`${VITE_APP_PROXY_PATH}/${VITE_APP_API_URL}`]: {
          target: VITE_APP_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (url) => url.replace(VITE_APP_PROXY_PATH, ''),
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
        ],
        dts: './auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          // globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
