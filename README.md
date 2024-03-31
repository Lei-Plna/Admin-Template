# 一、「Alias」配置路径别名

## 1. vite.config.ts

- 需要引入 path 包下的 resolve 方法
- 类型提示需要安装@types/node 包

在`vite`配置文件中需要定义 alias 别名，如下：

```typescript
import { resolve } from 'path'
resolve: {
  alias: {
  '@': resolve(__dirname, 'src'),
  }
}
```

## 2. tsconfig.json

需要 alias 生效，还需要在`tsconfig.json`中配置`baseUrl`和`paths`，如下：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 3. 配置 shims-vue.d.ts

除此之外为了让`*.vue`文件能够被`TypeScript`识别，还需要在项目根目录下创建`shims-vue.d.ts`文件，内容如下：

```typescript
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

# 二、添加路由自动加载

1. 在文件夹下的「layouts」文件夹中定义项目的网站对应的模块父级路由，如有一个「Admin」模块，那么在「layouts」文件中创建一个「Admin.vue」的文件，并且使用「<router-view />」标签来定义子路由的位置。

2. 在文件夹下的「views」文件夹中定义项目的网站对应的模块子级路由，如有一个「Admin」模块，那么在「views」文件中创建一个「Admin」的文件夹，并且在「Admin」文件夹中创建一个「index.vue」的文件，这个文件就是「Admin」模块的首页。

## 1. 自动创建父级路由

同「Tips1」所示，使用`import.meta.glob`函数来动态加载文件，然后通过正则表达式来匹配文件名，最后将文件名作为路由路径，将文件模块作为路由组件，最后返回一个路由数组。
在本小点中并未匹配子路由，所以`children`为空数组。此部分将在下一个小点中实现。
```typescript
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
```
