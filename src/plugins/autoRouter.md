# @onoxm/vite-plugin-auto-router

一个用于自动生成 React 或 Vue 路由文件的 Vite 插件。

[English](https://www.npmjs.com/package/@onoxm/vite-plugin-auto-router) | 中文

## ✨ 特性

- 自动生成路由配置，无需手动维护
- 支持 React 和 Vue 双框架
- 约定式路由，按目录结构自动映射
- 支持动态路由 `[id]` 语法
- `home` 页面路径自动转换为 `/`（可配置）
- `__root__` 页面作为根路由容器（可配置）
- 可配置懒加载和热更新
- 支持页面级配置文件
- TypeScript 类型安全

## 🚀 安装

::: code-group
```bash [npm]
npm install -D @onoxm/vite-plugin-auto-router
```
```bash [yarn]
yarn add -D @onoxm/vite-plugin-auto-router
```
```bash [pnpm]
pnpm add -D @onoxm/vite-plugin-auto-router
```
```bash [bun]
bun add -D @onoxm/vite-plugin-auto-router
```
:::

## 📖 使用指南

### 页面组件判定规则

插件根据以下规则判定哪些组件是页面组件：

#### React 项目

- **页面组件**：在页面文件夹中使用默认导出（`export default`）的组件
- **普通组件**：在页面文件夹中使用具名导出（`export const`）的组件

#### Vue 项目

- **页面组件**：
  - 页面文件夹的直接子组件（如 `src/views/about.vue`）
  - 嵌套文件夹中必须是 `index.vue` 才会被视为页面（如 `src/views/a/b/index.vue`）
- **普通组件**：嵌套文件夹中非 `index.vue` 的文件（如 `src/views/a/b.vue`）

### React 项目

#### 安装依赖

```bash
npm install react-router
```

#### 配置 Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoRouter from '@onoxm/vite-plugin-auto-router'

export default defineConfig({
  plugins: [react(), autoRouter()]
})
```

#### 目录结构

```
src/
├── pages/
│   ├── index.tsx
│   ├── __root__.tsx
│   ├── 404.tsx
│   └── user/
│       ├── index.tsx
│       ├── index.config.ts
│       ├── [id].tsx
│       └── [id].config.ts
```

#### 特殊页面

- **`home` 页面**：路径会自动转换为 `/`，作为首页路由
- **`__root__` 页面**：作为根路由容器，包裹所有其他路由
- **`404` 或 `notfound` 页面**：路径会自动转换为 `/*`，作为 404 路由

#### 页面配置

继承自 [React Router RouteObject](https://reactrouter.com/start/data/route-object)，并进行以下修改：

- **移除**: `path`, `Component`, `element`, `children`
- **新增**: `type?: 'single' | 'wrap'`

##### type: 'single'

当 `type` 配置为 `single` 时，该页面组件会作为独立路由生成：

```typescript
// src/pages/user/index.config.ts
import { defineConfig } from '../../router/autoRouter'

export default defineConfig({
  type: 'single'
})
```

生成的路由结构：

```typescript
// src/router/autoRouter.tsx
import type { RouteObject } from 'react-router'
import Pages404 from './../pages/404.tsx'
import Pages from './../pages/index.tsx'
import PagesRoot from './../pages/__root__.tsx'
import PagesUser from './../pages/user/index.tsx'
import PagesUserId from './../pages/user/[id]/index.tsx'

type PageConfig = Partial<
  Omit<RouteObject, 'path' | 'Component' | 'element' | 'children'> & {
    type?: 'single' | 'wrap'
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PagesRoot />,
    children: [
      {
        path: '/',
        element: <Pages />
      },
      {
        path: '/user',
        children: [
          {
            path: '',
            index: true,
            element: <PagesUser />
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                index: true,
                action: async () => {},
                loader: async ({ params }) => await { params },
                element: <PagesUserId />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/*',
    element: <Pages404 />
  }
]
```

##### type: 'wrap'

当 `type` 配置为 `wrap` 时，该页面组件会作为父路由容器包裹其下的子路由：

```typescript
// src/pages/user/index.config.ts
import { defineConfig } from '../../router/autoRouter'

export default defineConfig({
  type: 'wrap'
})
```

生成的路由结构：

```typescript
// src/router/autoRouter.tsx
import type { RouteObject } from 'react-router'
import Pages404 from './../pages/404.tsx'
import Pages from './../pages/index.tsx'
import PagesRoot from './../pages/__root__.tsx'
import PagesUser from './../pages/user/index.tsx'
import PagesUserId from './../pages/user/[id]/index.tsx'

type PageConfig = Partial<
  Omit<RouteObject, 'path' | 'Component' | 'element' | 'children'> & {
    type?: 'single' | 'wrap'
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PagesRoot />,
    children: [
      {
        path: '/',
        element: <Pages />
      },
      {
        path: '/user',
        element: <PagesUser />,
        children: [
          {
            path: ':id',
            children: [
              {
                path: '',
                index: true,
                action: async () => {},
                loader: async ({ params }) => await { params },
                element: <PagesUserId />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/*',
    element: <Pages404 />
  }
]
```

### Vue 项目

#### 安装依赖

```bash
npm install vue-router
```

#### 配置 Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoRouter from '@onoxm/vite-plugin-auto-router'

export default defineConfig({
  plugins: [
    vue(),
    autoRouter({
      framework: 'vue',
      pagesDir: './src/views'
    })
  ]
})
```

#### 目录结构

```
src/
├── views/
│   ├── 404.vue
│   ├── home/
│   │   ├── index.vue
│   │   └── index.config.ts
│   └── user/
│       ├── index.vue
│       ├── index.config.ts
│       ├── [id].vue
│       └── [id].config.ts
```

#### 特殊页面

- **`home` 页面**：路径会自动转换为 `/`，作为首页路由
- **`__root__` 页面**：作为根路由容器，包裹所有其他路由
- **`404` 或 `notfound` 页面**：路径会自动转换为 `/:pathMatch(.*)*`，作为 404 路由

#### 页面配置

继承自 [Vue Router RouteRecordRaw](https://router.vuejs.org/api/#routerecordraw)，并进行以下修改：

- **移除**: `path`, `component`, `children`
- **新增**: `type?: 'single' | 'wrap'`

##### type: 'single'

当 `type` 配置为 `single` 时，该页面组件会作为独立路由生成：

```typescript
// src/views/user/index.config.ts
import { defineConfig } from '../../router/autoRouter'

export default defineConfig({
  type: 'single'
})
```

生成的路由结构：

```typescript
// src/router/autoRouter.ts
import type { RouteRecordRaw } from 'vue-router'
import Views404 from './../views/404.vue'
import ViewsHome from './../views/home/index.vue'
import ViewsUser from './../views/user/index.vue'
import ViewsUserId from './../views/user/[id]/index.vue'

type PageConfig = Partial<
  Omit<RouteRecordRaw, 'path' | 'component' | 'children'> & {
    type?: 'single' | 'wrap'
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: ViewsHome
      }
    ]
  },
  {
    path: '/user',
    children: [
      {
        path: '',
        component: ViewsUser
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: ViewsUserId
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    children: [
      {
        path: '',
        component: Views404
      }
    ]
  }
]
```

##### type: 'wrap'

当 `type` 配置为 `wrap` 时，该页面组件会作为父路由容器包裹其下的子路由：

```typescript
// src/views/user/index.config.ts
import { defineConfig } from '../../router/autoRouter'

export default defineConfig({
  type: 'wrap'
})
```

生成的路由结构：

```typescript
// src/router/autoRouter.ts
import type { RouteRecordRaw } from 'vue-router'
import ViewsHome from './../views/home/index.vue'
import ViewsUser from './../views/user/index.vue'
import ViewsUserId from './../views/user/[id]/index.vue'

type PageConfig = Partial<
  Omit<RouteRecordRaw, 'path' | 'component' | 'children'> & {
    type?: 'single' | 'wrap'
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: ViewsHome
      }
    ]
  },
  {
    path: '/user',
    component: ViewsUser,
    children: [
      {
        path: ':id',
        children: [
          {
            path: '',
            component: ViewsUserId
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    children: [
      {
        path: '',
        component: Views404
      }
    ]
  }
]
```

## ⚙️ 配置选项

### 插件配置

| 选项         | 类型               | 默认值          | 说明                     |
| ------------ | ------------------ | --------------- | ------------------------ |
| `framework`  | `'react' \| 'vue'` | `'react'`       | 框架类型                 |
| `pagesDir`   | `string`           | `'./src/pages'` | 页面目录                 |
| `routesFile` | `string`           | `undefined`     | 生成的路由文件路径       |
| `keepHome`   | `boolean`          | `false`         | 是否保留 `home` 页面     |
| `keepRoot`   | `boolean`          | `false`         | 是否保留 `__root__` 页面 |
| `lazy`       | `boolean`          | `true`          | 是否启用懒加载           |
| `hmr`        | `boolean`          | `false`         | 是否启用热更新           |

### 页面配置

| 选项   | 类型                 | 默认值     | 说明           |
| ------ | -------------------- | ---------- | -------------- |
| `type` | `'single' \| 'wrap'` | `'single'` | 路由类型       |
| `*`    | `any`                | `any`      | 继承自路由配置 |

## 📄 License

MIT
