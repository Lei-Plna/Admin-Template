import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { autoLoadRoutes } from './auto-load-route'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes,
    ...autoLoadRoutes,
  ],
});

export function createRouterPlugin(app: App) {
  app.use(router);
}
