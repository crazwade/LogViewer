import { createApp } from 'vue';
// import ElementPlus from 'element-plus';
import './style/style.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import VueJsonPretty from 'vue-json-pretty';
import { createRequester } from '@/api/requester/index';
import router from './router/index';
import App from './App.vue';

createRequester({
  timeoutSeconds: 1,
  baseURL: (() => {
    const proxyTarget = import.meta.env.VITE_APP_PROXY_PATH as string || '';
    const apiPath = import.meta.env.VITE_APP_API_URL as string || '';

    return window.API_PATH ?? `${proxyTarget}${apiPath}`;
  })(),
  beforeRequest: (requestConfig) => requestConfig,
  afterResponseParsed: (transformedResponse) => {
    if (transformedResponse.axiosResponse?.data.type === 'text/csv') {
      return transformedResponse;
    }

    return transformedResponse;
  },
});

// init pinia
const pinia = createPinia();

const app = createApp(App);
app.use(router);
// app.use(ElementPlus);
// 使用 vue-axios
app.use(VueAxios, axios);
// 使用 pinia
app.use(pinia);
// 使用 VueJsonPretty
app.use(VueJsonPretty);
app.mount('#app');
