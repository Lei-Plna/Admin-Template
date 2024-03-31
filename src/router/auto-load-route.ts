import { DefineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
/**
 * 定义一个类型，用于导入vue模块
 */
export interface ImportVueModule {
  default: DefineComponent<{}, {}, any>
}

/**
 * import.meta.glob 是vite提供的一个函数，用于动态加载文件
 */
const layouts = import.meta.glob<boolean, string, ImportVueModule>(
  '/src/layouts/*.vue'
);
/**
 * 用于匹配「layouts」文件下的父级路由的路由路径
 */
const regExp = /[^\/]\/layouts\/(.+).vue$/;

const getLayoutRoutes = (layout: typeof layouts): RouteRecordRaw[] => {
  return Object.entries(layout).map(([key, module]) => {
    const [, name] = key.match(regExp) ?? [];
    return {
      path: `/${name}`,
      component: module,
      children: [],
    } satisfies RouteRecordRaw;
  }) satisfies RouteRecordRaw[];
};

export const autoLoadRoutes: RouteRecordRaw[] = getLayoutRoutes(layouts);
