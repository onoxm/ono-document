# @onoxm/vite-plugin-auto-router

一个用于自动生成 React 或 Vue 路由文件的 Vite 插件。

[English](./README.md) | 中文

## ✨ 特性

- 自动生成路由配置，无需手动维护
- 支持 React 和 Vue 双框架
- 约定式路由，按目录结构自动映射
- 支持动态路由 `[id]` 语法
- 路由分组：目录名用括号包裹即可组织页面，且不占用 URL 段
- 目录布局：`__layout__` 文件把目录变为包裹其子树的壳组件，同时**保留 index 层**（推荐替代 `type: 'wrap'`）
- `home` 页面路径自动转换为 `/`（可配置）
- `__root__` 页面作为根路由容器，包裹所有其他路由（可配置）—— **已废弃**，推荐改用根目录 `__layout__`
- 零配置热更新
- 支持页面级配置文件
- **仅虚拟模块**：路由代码**始终**通过 `virtual:onoxm-auto-router/{react|vue}` 在内存中提供，**不会写入磁盘**，项目中不会残留任何生成产物
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

### 被忽略的目录

扫描 `pagesDir` 时会跳过下面这些目录名（以及所有以 `.` 开头的目录），**其中的页面不会生成路由**：

| 类别            | 目录名                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| 依赖 / 版本控制 | `node_modules`、`.git`、`.hg`、`.svn`、`.github`、`.vscode`、`.idea`                                            |
| 构建产物 / 测试 | `dist`、`build`、`out`、`.next`、`.nuxt`、`.cache`、`.turbo`、`.vite`、`test`、`tests`、`__tests__`、`__test__` |

第二类目录名与「页面」语义无关，因此**被跳过时会输出一条 warn 提示**（列出被跳过的目录，同一目录只提示一次）；`node_modules` 这类跳过是显然的，不提示。

> 目录名规则不可关闭。若确实需要把页面放在名为 `test` / `build` 的目录下，请改用别的名字（如 `views/acceptance/`）。

### 路由分组 `(group)`

用括号包起来的目录名是一个**路由分组**。它只用于组织文件，**不占用 URL 段**，因此可以把页面归到一组而完全不改变最终路径：

```
src/pages/
├── (marketing)/
│   ├── pricing.tsx        → /pricing
│   └── contact.tsx        → /contact
└── order/
    └── (detail)/
        └── [id].tsx       → /order/:id
```

- `(marketing)/pricing.tsx` 与放在顶层的 `pricing.tsx` 结果**完全一致** —— 最终路径与树形位置都相同。
- 分组可以嵌套，也可以出现在任意层级：先剥掉路径中的分组段，剩下的段才组成 URL。
- 正因为会被剥掉，分组对「重复路径检测」是透明的：`(a)/x` 与 `(b)/x` 都会解析为 `/x`，两者会**冲突**（插件抛出重复路径错误）。

> **⚠️ 分组内不能放 404 / notfound**
>
> `(marketing)/404.tsx` 会和顶层的 `404.tsx` 一样解析到 404 路径，但把 404 页面放进分组几乎总是误写。插件会**直接报错**，而不是静默当成全局 404（或与已有的 404 撞成一条难懂的重复路径错误）。请把它移到 pages 根目录。该约束只针对分组目录 —— `pages/user/404.tsx` 这类普通子目录行为不变。

> 分组归属只会体现在预览里（`log: 'tree'` 追加 `[group: marketing]`；`log: 'json'` 增加 `group` 字段）。它属于内部元数据，**不会**写进生成的 `routes` 数组。

分组目录同样可以放置 `__layout__.tsx`（或 `.vue`）。该布局会成为分组子树的容器，但与分组本身一样**不占用 URL 段**——React 生成**无 path 的布局路由**（路由对象中不含 `path` 键），Vue 生成 `path: ''`。若要为它指定 URL 段，可在其配置里显式写入 `path`（逃生舱）。详见[目录布局 `__layout__`](#目录布局-__layout__)。

### 目录布局 `__layout__`

在目录中放置 `__layout__.tsx`（React）或 `__layout__.vue`（Vue）文件，即可把该目录变为**布局容器**——一个包裹该目录整棵子树的壳组件。只需添加布局文件；配套的配置文件是**可选**的：

| 框架  | 布局文件         | 配置文件               |
| ----- | ---------------- | ---------------------- |
| React | `__layout__.tsx` | `__layout__.config.ts` |
| Vue   | `__layout__.vue` | `__layout__.meta.ts`   |

配置文件由 `configPattern` 匹配——默认值为 `/**/*.config.{js,ts,jsx,tsx}`。下面的 Vue 示例将其覆盖为 `/**/*.meta.ts`。

> **⚠️ 扩展名注意**
>
> React 布局配置**必须**使用被 glob 匹配的扩展名——`.config.ts` 或 `.config.js`，**而不是** `.config.tsx`。`__layout__.config.tsx` 不会被识别。

`__layout__` 文件**不会生成自己的路由**，而是把布局组件 + 布局配置挂载到目录的容器节点上。

**保留 index 层（与 `type: 'wrap'` 的区别）**

`__layout__` 让壳与页面成为**两个独立文件**：

- 壳组件（`__layout__.tsx`）与子树级配置（`__layout__.config.ts`）落在**容器节点**上。
- 页面自身组件（`index.tsx`）与其 `index.config.ts` 落在 **index 子路由**上。

而 `type: 'wrap'` 会把页面的额外属性上提到父级、并吞掉 index 层，因此壳与页面无法拆分。

**URL 段**

- 普通目录**继承其 URL 段**：`user/__layout__.tsx` → 容器 `path: 'user'`。
- **分组目录**（如 `(marketing)/__layout__.tsx`）没有从目录派生的段，因此 React 生成**无 path 的布局路由**（不含 `path` 键），Vue 生成 `path: ''`。
- **逃生舱：** 在分组目录内，于布局配置中显式写入 `path` 即可指定 URL 段——例如 `(user)/__layout__.config.ts` 写入 `path: '/user'`，行为与 `user/__layout__` 相同。这里必须写字面量：**写空串会报错**——「不占段」本就是分组目录的默认行为，配置里没有「声明不占段」这件事。

嵌套分组会产生嵌套容器。`path` 字段（含 `[currentPath]` 占位符）作用于容器节点，与今天的 `wrap` 完全一致。

**目录结构**

```
src/pages/
├── __root__.tsx
├── (marketing)/
│   ├── __layout__.tsx
│   ├── pricing.tsx               # → /pricing
│   └── (legal)/
│       ├── __layout__.tsx
│       └── terms.tsx             # → /terms
├── user/
│   ├── __layout__.tsx            # → /user
│   ├── __layout__.config.ts      # 子树级配置（loader / handle / path）
│   ├── index.tsx                 # → /user（可选）
│   └── settings.tsx              # → /user/settings
└── 404.tsx
```

**生成的路由树 —— React**

```tsx
// segment directory: user/__layout__.tsx
{ path: 'user', element: <UserLayout />, /* layout config */,
  children: [ { index: true, element: <UserIndex />, /* page config */ }, { path: 'settings' } ] }
// group directory: (marketing)/__layout__.tsx → pathless
{ element: <MarketingLayout />,
  children: [ { path: 'pricing' }, { element: <LegalLayout />, children: [{ path: 'terms' }] } ] }
```

**生成的路由树 —— Vue**

```ts
// segment directory
{ path: 'user', component: UserLayout, children: [ { path: '', component: UserIndex }, { path: 'settings' } ] }
// group directory → empty path
{ path: '', component: MarketingLayout, children: [ { path: 'pricing' } ] }
```

> **Vue 注意：** vue-router 没有 `index` 概念；对 `/user` 的精确匹配通过一个 `path` 为空的默认子路由来表达。

**根 `__layout__`**

pages 根目录下的 `__layout__` 会成为**根容器并取代 `__root__`**（顶层 `404`/`notfound` 会嵌套其中，与 `__root__` 时完全一致）。根 `__layout__` 与 `__root__` **不能共存**——插件会抛错。设置 `keepRoot: true` 后，`__root__` 会作为普通路由保留，因此不冲突。

> **⚠️ 错误**
>
> 插件会在以下情况抛错：
>
> - 多个布局文件解析到**同一目录**。
> - 布局配置文件中出现 **`type` 字段**——布局始终是壳组件，请移除该字段。
> - 路由分组内的布局配置中使用了 **`[currentPath]`**——分组目录没有派生路径，请改用字面量路径。

**从 `type: 'wrap'` 迁移**

迁移对照表：

| 维度       | `type: 'wrap'`                 | `__layout__`                                              |
| ---------- | ------------------------------ | --------------------------------------------------------- |
| URL 段     | 继承页面所在目录（上提）       | 继承目录；分组 → 无 path                                  |
| 壳 vs 页面 | 一个文件——页面同时充当壳       | 两个文件——`__layout__` 壳与页面分离                       |
| index 层   | 被吞掉（index 层被移除）       | **被保留**（index 子路由保留）                            |
| 配置文件   | `index.config.ts` 同时承载两者 | `__layout__.config.ts`（子树）+ `index.config.ts`（页面） |
| 状态       | 已废弃——可用，但新代码不推荐   | 推荐                                                      |

迁移步骤：

1. 把 `index.tsx` 中的壳标记移到 `__layout__.tsx`。
2. 把子树级字段（`loader` / `handle` / `path` 等）从 `index.config.ts` 移到 `__layout__.config.ts`，并去掉 `type: 'wrap'`。
3. 若想在该目录路径上保留精确页面，新增一个 `index.tsx`。
4. 若目录只有子页面（自身没有页面），则无需新增 `index.tsx`。

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
- **`__root__` 页面**：作为根路由容器，包裹所有其他路由。**已废弃**——由根目录 `__layout__` 文件（`pages/__layout__.tsx` / `pages/__layout__.vue`）取代，它会成为根容器。`__root__` 与 `keepRoot` 计划在 0.12.0 之后移除。
- **`404` 或 `notfound` 页面**：路径会自动转换为 `/*`，作为 404 路由。
  - 当 `__root__` 生效为根容器时（默认），404 路由会嵌套为根路由的**最后一个子路由**，404 页因此复用根布局。
  - 其余情况（无 `__root__` 页面或 `keepRoot: true`），它独立位于路由表顶层，不嵌套于任何父路由。
- **pages 根目录的 `__layout__.tsx`**：根目录下的 `__layout__` 作为**根容器并取代 `__root__`**；二者**不能共存**（插件会抛错）。详见[目录布局 `__layout__`](#目录布局-__layout__)

#### 页面配置

继承自 [React Router RouteObject](https://reactrouter.com/start/data/route-object)，并进行以下修改：

- **移除**：`Component`, `element`, `children`, `index`
- **新增**：`type?: 'single' | 'wrap'`（已废弃）、`asIndex?: boolean`

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
import Pages404 from '../pages/404.tsx'
import Pages from '../pages/index.tsx'
import PagesRoot from '../pages/__root__.tsx'
import PagesUser from '../pages/user/index.tsx'
import PagesUserId from '../pages/user/[id]/index.tsx'

type PageConfig = Partial<
  Omit<
    RouteObject,
    'Component' | 'element' | 'children' | 'lazy' | 'index'
  > & {
    type?: 'single' | 'wrap'
    asIndex?: boolean
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
            index: true,
            element: <PagesUser />
          },
          {
            path: ':id',
            action: async () => {},
            loader: async ({ params }) => await { params },
            element: <PagesUserId />
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

> **⚠️ 新代码已不推荐。** `type: 'wrap'` 在 0.11.x–0.12.x 中行为不变（无警告、无行为变更），但新代码请优先使用[目录布局 `__layout__`](#目录布局-__layout__)——它会保留 index 层。计划在 0.12.0 之后移除。

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
import Pages404 from '../pages/404.tsx'
import Pages from '../pages/index.tsx'
import PagesRoot from '../pages/__root__.tsx'
import PagesUser from '../pages/user/index.tsx'
import PagesUserId from '../pages/user/[id]/index.tsx'

type PageConfig = Partial<
  Omit<
    RouteObject,
    'Component' | 'element' | 'children' | 'lazy' | 'index'
  > & {
    type?: 'single' | 'wrap'
    asIndex?: boolean
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
            action: async () => {},
            loader: async ({ params }) => await { params },
            element: <PagesUserId />
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
// src/pages/index.config.ts（组件引用可用 .ts/.js）
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
  Omit<
    RouteObject,
    'Component' | 'element' | 'children' | 'lazy' | 'index'
  > & {
    type?: 'single' | 'wrap'
    asIndex?: boolean
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteObject[] = [
  {
    path: '/',
    hydrateFallbackElement: <Loading />,  // 或 HydrateFallback: Loading
    lazy: () => import('./pages/index.tsx').then(m => ({ Component: m.default }))
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
- **`__root__` 页面**：作为根路由容器，包裹所有其他路由。**已废弃**——由根目录 `__layout__` 文件（`pages/__layout__.tsx` / `pages/__layout__.vue`）取代，它会成为根容器。`__root__` 与 `keepRoot` 计划在 0.12.0 之后移除。
- **`404` 或 `notfound` 页面**：路径会自动转换为 `/:pathMatch(.*)*`，作为 404 路由。
  - 当 `__root__` 生效为根容器时（默认），404 路由会嵌套为根路由的**最后一个子路由**，404 页因此复用根布局。
  - 其余情况（无 `__root__` 页面或 `keepRoot: true`），它独立位于路由表顶层，不嵌套于任何父路由。
- **views 根目录的 `__layout__.vue`**：根目录下的 `__layout__` 作为**根容器并取代 `__root__`**；二者**不能共存**（插件会抛错）。详见[目录布局 `__layout__`](#目录布局-__layout__)

#### 页面配置

继承自 [Vue Router RouteRecordRaw](https://router.vuejs.org/api/#routerecordraw)，并进行以下修改：

- **移除**：`component`, `children`
- **新增**：`type?: 'single' | 'wrap'`（已废弃）、`asIndex?: boolean`

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
import Views404 from '../views/404.vue'
import ViewsHome from '../views/home/index.vue'
import ViewsUser from '../views/user/index.vue'
import ViewsUserId from '../views/user/[id]/index.vue'

type PageConfig = Partial<
  Omit<RouteRecordRaw, 'component' | 'children'> & {
    type?: 'single' | 'wrap'
    asIndex?: boolean
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: ViewsHome
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
        component: ViewsUserId
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Views404
  }
]
```

##### type: 'wrap'

> **⚠️ 新代码已不推荐。** `type: 'wrap'` 在 0.11.x–0.12.x 中行为不变（无警告、无行为变更），但新代码请优先使用[目录布局 `__layout__`](#目录布局-__layout__)——它会保留 index 层。计划在 0.12.0 之后移除。

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
import Views404 from '../views/404.vue'
import ViewsHome from '../views/home/index.vue'
import ViewsUser from '../views/user/index.vue'
import ViewsUserId from '../views/user/[id]/index.vue'

type PageConfig = Partial<
  Omit<RouteRecordRaw, 'component' | 'children'> & {
    type?: 'single' | 'wrap'
    asIndex?: boolean
  }
>

export const defineConfig = (config: PageConfig) => config

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: ViewsHome
  },
  {
    path: '/user',
    component: ViewsUser,
    children: [
      {
        path: ':id',
        component: ViewsUserId
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Views404
  }
]
```

## ⚙️ 配置选项

### 插件配置

| 选项            | 类型                        | 默认值                         | 说明                                                                                                |
| --------------- | --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `framework`     | `'react' \| 'vue'`          | `'react'`                      | 框架类型（通常由导入路径自动确定，无需手动配置）                                                    |
| `pagesDir`      | `string`                    | `'./src/pages'`                | 页面目录                                                                                            |
| `keepHome`      | `boolean`                   | `false`                        | 是否保留 `home` 页面                                                                                |
| `keepRoot`      | `boolean`                   | `false`                        | 是否保留 `__root__` 页面。**已废弃**——`keepRoot` 仅用于控制已废弃的 `__root__` 行为，将随它一并移除 |
| `lazy`          | `boolean`                   | `true`                         | 是否启用懒加载                                                                                      |
| `configPattern` | `string`                    | `/**/*.config.{js,ts,jsx,tsx}` | 配置文件模式                                                                                        |
| `log`           | `false \| 'tree' \| 'json'` | `false`                        | 控制台输出路由预览：`'tree'` 输出可读树形结构，`'json'` 输出格式化（2 空格缩进）的 JSON             |
| `injectTypes`   | `boolean`                   | `true`                         | 是否自动向 `vite-env.d.ts` 注入虚拟模块类型引用；设为 `false` 则完全不改动你的源码文件              |

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
> **解决方法：** 先单独运行一次 `vite dev` 或 `vite build`，插件会自动创建 `vite-env.d.ts`，之后将该文件提交到版本控制。后续所有构建都能正常通过。

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

> 注入会改写你受版本控制的文件。若不想让插件动你的源码树，设置 `injectTypes: false`（此时需要自行声明虚拟模块类型）。

### 页面配置

| 选项      | 类型                 | 默认值      | 说明                                                                          |
| --------- | -------------------- | ----------- | ----------------------------------------------------------------------------- |
| `type`    | `'single' \| 'wrap'` | `'single'`  | 路由类型（已废弃 —— 请使用 `__layout__`）                                     |
| `path`    | `string`             | `undefined` | 路由路径，支持使用 `[currentPath]` 占位符引用当前路径；**不能为空串**（见下） |
| `asIndex` | `boolean`            | `undefined` | 把该叶子页面下推为其自身 path 下的 index 子路由（见下）                       |
| `*`       | `any`                | `any`       | 继承自路由配置                                                                |

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

> **⚠️ 空串 `path` 直接报错。** 空串不表达任何意图——路由 path 恒由目录派生（分组目录则压根没有段），配置里的空串只会被下游的真值判断丢掉，所以插件改为**报错并点名文件**（页面配置与 `__layout__.config.*` 一视同仁）。想表达「不占 URL 段」请用分组目录，想让页面精确匹配自身 path 请用 `asIndex: true`，想停用这份配置直接删掉配置文件（配置文件本身是可选的）。

#### asIndex 使用示例

默认情况下，**叶子**页面直接产出 `{ path, element }`，不会多套一层 index 子路由。若想让某个页面「占住自己的 path、内容落在 index 层」，在它的配置里写 `asIndex: true`：

```typescript
// src/pages/about.config.ts
import { defineConfig } from 'virtual:onoxm-auto-router/react'

export default defineConfig({
  asIndex: true
})
```

生成的产物按各框架 router 的原生规则表达 index 子路由：

```typescript
// React
{ path: '/about', children: [{ index: true, element: About }] }

// Vue
{ path: '/about', children: [{ path: '', component: About }] }
```

几点说明：

- **只对叶子页面有意义**：页面**确有子路由**时本就会拆，此时 `asIndex` 不改变结果；写 `false` 等同于未设置。
- **写错位置会直接报错**：写在 `__layout__.config.*` 布局配置里，或与 `type: 'wrap'` 同时出现，都会抛错 —— 布局与 wrap 页面本身就是外壳，不存在「把自己下推成 index 子路由」这件事。
- React 的页面配置里**不能**直接写 `index`（`index` 是 react-router 的产物字段，不是配置入口，已从 `PageConfig` 可写字段中排除），表达同一意图请用 `asIndex`。

## 📄 License

MIT
