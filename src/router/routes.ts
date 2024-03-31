import { RouteRecordRaw } from 'vue-router';

/**
 * 我们不需要在此处配置所有的路由，只需要配置需要自动加载的路由即可
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: import('@/views/Home.vue'),
  },
];
