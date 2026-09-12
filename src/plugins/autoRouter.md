# @onoxm/vite-plugin-auto-router

一个用于自动生成 React 或 Vue 路由文件的 Vite 插件。

[English](https://www.npmjs.com/package/@onoxm/vite-plugin-auto-router) | 中文

## ✨ 特性

- 自动生成路由配置，无需手动维护
- 支持 React 和 Vue 双框架
- 约定式路由，按目录结构自动映射
- 支持动态路由 `[id]` 语法
- `home` 页面路径自动转换为 `/`（可配置）
- `__root__` 页面作为根路由容器，包裹所有其他路由（可配置）
- 零配置热更新
- 支持页面级配置文件
- **强制虚拟模块**：路由代码**始终**通过 `virtual:onoxm-auto-router/{react|vue}` 在内存中提供，项目中不会残留任何生成产物
- 自动注入 `vite-env.d.ts` 类型声明，TypeScript 类型安全开箱即用
- 完整的 IDE 智能提示：所有插件选项附带英文 JSDoc 注释（含默认值），随发布的类型声明一起输出，悬停即可查看
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

## 🔄 从 v0.9.x 迁移

v0.10.0 是一次清理版本，以下选项已移除，请直接从 `vite.config.ts` 中删除：

| 移除选项        | 迁移方式                                     |
| --------------- | -------------------------------------------- |
| `virtualModule` | 不再需要，虚拟模块现在是唯一模式             |
| `routesFile`    | 不再需要，路由不再写入磁盘                   |
| `hmr`           | 不再需要，HMR 默认启用                       |
| `hmrDebounceMs` | 不再需要                                     |
| `dryRun`        | 使用 `log: 'tree'` 或 `log: 'json'` 预览替代 |
| `onGenerated`   | 不再需要                                     |

**v0.9.x 之前：**

```typescript
autoRouter({
  virtualModule: true,
  hmr: true,
  dryRun: false
})
```

**v0.10.0 之后：**

```typescript
autoRouter() // 如果不需要其他选项
// 或
autoRouter({ log: 'tree' }) // 如果需要预览
```

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
import autoRouter from '@onoxm/vite-plugin-auto-router/react'

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
- **`404` 或 `notfound` 页面**：路径会自动转换为 `/*`，作为 404 路由；当 `__root__` 生效为根容器时（默认），它嵌套为根路由的最后一个子路由，404 页因此复用根布局；其余情况（无 `__root__` 页面或 `keepRoot: true`），它独立位于路由表顶层，不嵌套于任何父路由

#### 页面配置

继承自 [React Router RouteObject](https://reactrouter.com/start/data/route-object)，并进行以下修改：

- **移除**: `Component`, `element`, `children`
- **新增**: `type?: 'single' | 'wrap'`

> **⚠️ 重要提示**
>
> 配置文件**不能**使用具名导出（`export const`、`export function` 等）。仅允许使用 `export default`。如果配置文件包含具名导出，插件将跳过该文件并在控制台显示警告信息。

##### type: 'single'

当 `type` 配置为 `single` 时，该页面组件会作为独立路由生成：

```typescript
// src/pages/user/index.config.ts
import { defineConfig } from 'virtual:onoxm-auto-router/react'

export default defineConfig({
  type: 'single'
})
```

生成的路由结构：

```typescript
// virtual:onoxm-auto-router/react
import type { RouteObject } from 'react-router'
import Pages404 from './pages/404.tsx'
import Pages from './pages/index.tsx'
import PagesRoot from './pages/__root__.tsx'
import PagesUser from './pages/user/index.tsx'
import PagesUserId from './pages/user/[id]/index.tsx'

type PageConfig = Partial<
  Omit<RouteObject, 'Component' | 'element' | 'children'> & {
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
      },
      {
        path: '/*',
        element: <Pages404 />
      }
    ]
  }
]
```

##### type: 'wrap'

当 `type` 配置为 `wrap` 时，该页面组件会作为父路由容器包裹其下的子路由：

```typescript
// src/pages/user/index.config.ts
import { defineConfig } from 'virtual:onoxm-auto-router/react'

export default defineConfig({
  type: 'wrap'
})
```

生成的路由结构：

```typescript
// virtual:onoxm-auto-router/react
import type { RouteObject } from 'react-router'
import Pages404 from './pages/404.tsx'
import Pages from './pages/index.tsx'
import PagesRoot from './pages/__root__.tsx'
import PagesUser from './pages/user/index.tsx'
import PagesUserId from './pages/user/[id]/index.tsx'

type PageConfig = Partial<
  Omit<RouteObject, 'Component' | 'element' | 'children'> & {
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
      },
      {
        path: '/*',
        element: <Pages404 />
      }
    ]
  }
]
```

##### hydrateFallbackElement / HydrateFallback（React Router lazy 模式）

当页面配置中包含 `hydrateFallbackElement` 或 `HydrateFallback` 字段时，插件会自动将该页面切换为 [React Router 的 `lazy` 模式](https://reactrouter.com/start/data/lazy)：

- **不再生成** `element` 字段和同步 `import` 语句
- **改为生成** `lazy` 属性，动态导入组件模块并返回 `Component`
- 保留原 hydrate 字段，用于 SSR hydration 阶段的占位渲染

React Router v7 中这两个是**并行字段**，可任选其一或同时使用：

| 字段                     | 类型                  | 接收值                 |
| ------------------------ | --------------------- | ---------------------- |
| `hydrateFallbackElement` | `React.ReactNode`     | JSX 元素 `<Loading />` |
| `HydrateFallback`        | `React.ComponentType` | 组件引用 `Loading`     |

**用法 1：hydrateFallbackElement（JSX 元素）**

配置文件扩展名需使用 `.config.tsx` 或 `.config.jsx`：

```tsx
// src/pages/index.config.tsx
import Loading from '../components/Loading'

export default defineConfig({
  hydrateFallbackElement: <Loading />
})
```

**用法 2：HydrateFallback（组件引用）**

```tsx
// src/pages/index.config.tsx
import Loading from '../components/Loading'

export default defineConfig({
  HydrateFallback: Loading
})
```

生成的路由结构（两种用法生成结果相同，仅 hydrate 字段不同）：

```typescript
// virtual:onoxm-auto-router/react
import type { RouteObject } from 'react-router'
import Loading from './components/Loading.tsx'

type PageConfig = Partial<
  Omit<RouteObject, 'Component' | 'element' | 'children' | 'lazy'> & {
    type?: 'single' | 'wrap'
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        index: true,
        hydrateFallbackElement: <Loading />,  // 或 HydrateFallback: Loading
        lazy: () => import('./pages/index.tsx').then(m => ({ Component: m.default }))
      }
    ]
  }
]
```

**lazy 模式优先级**

| 页面配置                                         | 插件 `lazy` 选项 | 该页面的生成模式                                  |
| ------------------------------------------------ | ---------------- | ------------------------------------------------- |
| 含 `hydrateFallbackElement` 或 `HydrateFallback` | 任意值           | React Router `lazy`（最高优先级，页面级覆盖全局） |
| 无 hydrate 配置                                  | `true`           | `React.lazy()` + `<Suspense>`                     |
| 无 hydrate 配置                                  | `false`          | 同步 `import` + `element`                         |

**混合场景**

同一项目中，配置了 hydrate 的路由走 React Router `lazy`，未配置的路由按全局 `lazy` 选项走 `React.lazy` 或同步 import。插件会智能判断是否需要引入 `import { lazy, Suspense } from 'react'`——当所有路由都走 React Router `lazy` 时不会引入。

> **注意**
>
> - 使用 `hydrateFallbackElement` + JSX 元素时，扩展名必须为 `.config.tsx` 或 `.config.jsx`；使用 `HydrateFallback` + 组件引用时，扩展名可为 `.config.ts` 或 `.config.js`
> - fallback 组件（如 `Loading`）的 import 会自动收集并去重后注入到生成的路由代码
> - 不要使用小写 `hydrateFallback`（React Router v7 中不存在此字段名，只识别大写 `HydrateFallback` 和 `hydrateFallbackElement`）

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
import autoRouter from '@onoxm/vite-plugin-auto-router/vue'

export default defineConfig({
  plugins: [
    vue(),
    autoRouter({
      pagesDir: './src/views',
      configPattern: '/**/*.meta.ts'
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
│   │   └── index.meta.ts
│   └── user/
│       ├── index.vue
│       ├── index.meta.ts
│       ├── [id].vue
│       └── [id].meta.ts
```

#### 特殊页面

- **`home` 页面**：路径会自动转换为 `/`，作为首页路由
- **`__root__` 页面**：作为根路由容器，包裹所有其他路由
- **`404` 或 `notfound` 页面**：路径会自动转换为 `/:pathMatch(.*)*`，作为 404 路由；当 `__root__` 生效为根容器时（默认），它嵌套为根路由的最后一个子路由，404 页因此复用根布局；其余情况（无 `__root__` 页面或 `keepRoot: true`），它独立位于路由表顶层，不嵌套于任何父路由

#### 页面配置

继承自 [Vue Router RouteRecordRaw](https://router.vuejs.org/api/#routerecordraw)，并进行以下修改：

- **移除**: `component`, `children`
- **新增**: `type?: 'single' | 'wrap'`

> **⚠️ 重要提示**
>
> 配置文件**不能**使用具名导出（`export const`、`export function` 等）。仅允许使用 `export default`。如果配置文件包含具名导出，插件将跳过该文件并在控制台显示警告信息。

##### type: 'single'

当 `type` 配置为 `single` 时，该页面组件会作为独立路由生成：

```typescript
// src/views/user/index.meta.ts
import { defineConfig } from 'virtual:onoxm-auto-router/vue'

export default defineConfig({
  type: 'single'
})
```

生成的路由结构：

```typescript
// virtual:onoxm-auto-router/vue
import type { RouteRecordRaw } from 'vue-router'
import Views404 from './views/404.vue'
import ViewsHome from './views/home/index.vue'
import ViewsUser from './views/user/index.vue'
import ViewsUserId from './views/user/[id]/index.vue'

type PageConfig = Partial<
  Omit<RouteRecordRaw, 'component' | 'children'> & {
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
// src/views/user/index.meta.ts
import { defineConfig } from 'virtual:onoxm-auto-router/vue'

export default defineConfig({
  type: 'wrap'
})
```

生成的路由结构：

```typescript
// virtual:onoxm-auto-router/vue
import type { RouteRecordRaw } from 'vue-router'
import Views404 from './views/404.vue'
import ViewsHome from './views/home/index.vue'
import ViewsUser from './views/user/index.vue'
import ViewsUserId from './views/user/[id]/index.vue'

type PageConfig = Partial<
  Omit<RouteRecordRaw, 'component' | 'children'> & {
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

| 选项            | 类型                        | 默认值                         | 说明                                                                                    |
| --------------- | --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| `framework`     | `'react' \| 'vue'`          | `'react'`                      | 框架类型（通常由导入路径自动确定，无需手动配置）                                        |
| `pagesDir`      | `string`                    | `'./src/pages'`                | 页面目录                                                                                |
| `keepHome`      | `boolean`                   | `false`                        | 是否保留 `home` 页面                                                                    |
| `keepRoot`      | `boolean`                   | `false`                        | 是否保留 `__root__` 页面                                                                |
| `lazy`          | `boolean`                   | `true`                         | 是否启用懒加载                                                                          |
| `configPattern` | `string`                    | `/**/*.config.{js,ts,jsx,tsx}` | 配置文件模式                                                                            |
| `log`           | `false \| 'tree' \| 'json'` | `false`                        | 控制台输出路由预览：`'tree'` 输出可读树形结构，`'json'` 输出格式化（2 空格缩进）的 JSON |

#### log 使用示例

`log` 参数仅负责是否在控制台输出路由预览。支持三个值：

- `false`（默认）：不输出
- `'tree'`：输出可读的路由树形结构、组件列表、配置导入及目标文件路径
- `'json'`：输出格式化（2 空格缩进）的 JSON（包含解析后的组件名、路由树、配置导入、框架、路由文件路径），控制台直接可读，也可被工具解析或管道传输

```typescript
autoRouter({
  log: 'tree' // 打印可读的路由树到控制台
})

// 或
autoRouter({
  log: 'json' // 以 JSON 格式打印路由信息（可管道至文件或其他工具）
})
```

### 虚拟模块

路由代码**始终**通过 Vite 虚拟模块 `virtual:onoxm-auto-router/react`（或 `/vue`）在内存中提供，**不会写入磁盘**，项目中不会残留任何生成产物。

> 🚨 **首次使用必读**
>
> 插件会在 Vite 启动后的 `configResolved` 钩子中，自动将 `/// <reference types="@onoxm/vite-plugin-auto-router/virtual" />` 注入到 `vite-env.d.ts`。如果你的构建脚本先跑 `tsc` 再跑 `vite build`（如 `tsc -b && vite build`），**第一次**构建可能会因为 `tsc` 无法解析 `virtual:onoxm-auto-router/*` 而失败。
>
> **解决方法：**先单独运行一次 `vite dev` 或 `vite build`，插件会自动创建 `vite-env.d.ts`，之后将该文件提交到版本控制。后续所有构建都能正常通过。

在应用代码中直接从虚拟模块导入：

```typescript
// src/router/index.ts
import { createBrowserRouter } from 'react-router'
import { routes } from 'virtual:onoxm-auto-router/react'

export const router = createBrowserRouter(routes)
```

页面配置文件同样从虚拟模块导入 `defineConfig`：

```typescript
// src/pages/user/index.config.ts
import { defineConfig } from 'virtual:onoxm-auto-router/react'

export default defineConfig({
  type: 'single'
})
```

**构建与 SSR 兼容性**

虚拟模块同时支持 `vite dev` 和 `vite build`（含 SSR 构建）。虚拟模块在构建阶段与普通源文件一样被解析处理。生成的路由代码是纯数据（不依赖浏览器 API），因此兼容服务端渲染环境。但插件不提供 SSR 专用入口——React SSR 场景下，用户需要在 server entry 中使用 `createStaticRouter` 而非 `createBrowserRouter`。

**TypeScript 类型声明自动注入**

虚拟模块 `virtual:onoxm-auto-router/{react|vue}` 是内存模块，磁盘上没有实体文件，TypeScript 默认无法识别其命名导出（`routes`、`defineConfig`）。为了让 TS 类型检查通过，需要在项目的 `vite-env.d.ts` 里声明该模块的类型。

插件包通过 `./virtual` 子路径暴露了类型声明（`@onoxm/vite-plugin-auto-router/virtual`）。当项目为 TypeScript 项目（存在 `tsconfig.json`）时，插件会在 Vite 的 `configResolved` 钩子（dev 和 build 均会触发）**静默自动注入**以下内容到 `vite-env.d.ts`：

```typescript
/// <reference types="@onoxm/vite-plugin-auto-router/virtual" />
```

注入规则：

| 场景                                      | 行为                                             |
| ----------------------------------------- | ------------------------------------------------ |
| `src/vite-env.d.ts` 存在且已含 reference  | 跳过，内容不变（幂等）                           |
| `src/vite-env.d.ts` 存在但无 reference    | 末尾空一行后追加 reference                       |
| 根目录 `vite-env.d.ts` 存在但 `src/` 下无 | 在根目录文件追加                                 |
| `src/vite-env.d.ts` 和根目录都有          | 优先处理 `src/` 下那个，根目录文件不碰           |
| 都不存在                                  | 在 `src/` 下创建 `vite-env.d.ts`，写入 reference |
| 任何异常                                  | 仅 warn，不抛错，不阻塞 Vite 启动                |

### 页面配置

| 选项   | 类型                 | 默认值      | 说明                                                  |
| ------ | -------------------- | ----------- | ----------------------------------------------------- |
| `type` | `'single' \| 'wrap'` | `'single'`  | 路由类型                                              |
| `path` | `string`             | `undefined` | 路由路径，支持使用 `[currentPath]` 占位符引用当前路径 |
| `*`    | `any`                | `any`       | 继承自路由配置                                        |

#### path 使用示例

使用 `[currentPath]` 占位符可以在替换路径时引用当前路径：

```typescript
// src/pages/user/index.config.ts
import { defineConfig } from 'virtual:onoxm-auto-router/react'

export default defineConfig({
  // 将 /user 替换为 /users/v2
  path: '/users/v2'
})

// 或者使用占位符，在当前路径后添加后缀
export default defineConfig({
  // 将 /user 替换为 /user/v2
  path: '[currentPath]/v2'
})
```

## 📄 License

[MIT](./LICENSE) © 2026 onoxm
