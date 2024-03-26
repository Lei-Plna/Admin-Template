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
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```
