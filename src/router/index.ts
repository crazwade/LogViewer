import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Layout.vue';
import { RouteName } from './types';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Main,
      component: Layout,
      redirect: { name: RouteName.Log },
      children: [
        {
          path: 'Home',
          name: RouteName.Home,
          component: () => import('@/views/Home/Home.vue'),
        },
        {
          path: 'Log',
          name: RouteName.Log,
          component: () => import('@/views/NlogViewer/NlogView.vue'),
        },
        {
          path: 'StopwatchRealtimeDataHtml',
          name: RouteName.StopwatchRealtimeData,
          component: () => import('@/views/StopwatchRealtimeDataHtml/StopwatchRealtimeDataHtml.vue'),
        },
        {
          path: 'test',
          name: RouteName.TestPage,
          component: () => import('@/views/TestView.vue'),
        },
      ],
    },
  ],
});

export default router;
