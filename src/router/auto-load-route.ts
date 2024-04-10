import { DefineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
/**
 * 定义一个类型，用于导入vue模块
 */
export interface ImportVueModule {
  default: DefineComponent<{}, {}, any>;
}

/**
 * import.meta.glob 是vite提供的一个函数，用于动态加载文件
 */
const layouts = import.meta.glob<boolean, string, ImportVueModule>(
  '/src/layouts/*.vue'
);
const views = import.meta.glob<boolean, string, ImportVueModule>(
  '/src/views/**/*.vue'
);

/**
 * 用于匹配「layouts」文件下的父级路由的路由路径
 */
const layoutRegex = /[^\/]\/layouts\/(.+).vue$/;
/**
 * 用于匹配「views」文件下的子路由的路由路径
 */
const viewRegex = /[^\/]\/views\/(.+).vue$/;

/**
 * 获取布局路由的子路由
 */
const getLayoutRouteChildren = (layoutRoute: RouteRecordRaw) => {
  const routes: RouteRecordRaw[] = [];
  Object.entries(views).forEach(([path, module]) => {
    if (!path.includes(String(layoutRoute.name))) return;
    const route = generateRoute(path, module, viewRegex);
    routes.push(route);
  });
  return routes;
};

/**
 * 获取布局路由
 */
const getLayoutRoutes = (layout: typeof layouts): RouteRecordRaw[] => {
  return Object.entries(layout).map(([key, module]) => {
    const route = generateRoute(key, module, layoutRegex);
    route.children = getLayoutRouteChildren(route);
    return route;
  }) satisfies RouteRecordRaw[];
};

/**
 * 根据路径生成路由
 * @param path 路由路径
 * @param module vue模块
 * @param regexp 路由路径匹配正则
 * @returns
 */
const generateRoute = (
  path: string,
  module: () => Promise<ImportVueModule>,
  regexp: RegExp
): RouteRecordRaw => {
  const [, name] = path.match(regexp) ?? [];
  return {
    name: name.replace(/\//g, '.'),
    path: `/${name}`,
    component: module,
  } satisfies RouteRecordRaw;
};

export const autoLoadRoutes: RouteRecordRaw[] = getLayoutRoutes(layouts);
