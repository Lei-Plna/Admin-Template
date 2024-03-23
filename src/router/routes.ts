import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: import('@/layouts/admin.vue'),
    children: [
      {
        path: 'admin',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
];
