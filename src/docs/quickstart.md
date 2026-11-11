# 快速开始

## ono-react-element

### 介绍

`ono-react-element` 是一个基于 React 19 + TypeScript 的组件库。除了 UI 组件，它还把配套的 Hooks、工具函数、事件派发和状态管理一并透出 —— **装一个包，组件和周边能力都能直接用**，不需要再多装几个 `@onoxm/*`。

### 前置准备

- <a href="https://zh-hans.react.dev/" target="_blank">React</a> **19 及以上**：`react`、`react-dom` 的 peer 要求都是 `>=19`，18 及以下装不上。
- 组件库**不需要在应用根部包 Provider**，全局状态由模块级 store 承载，放在树的任何位置都能用。

### 安装

::: code-group
```bash [npm]
npm install ono-react-element
```
```bash [yarn]
yarn add ono-react-element
```
```bash [pnpm]
pnpm add ono-react-element
```
```bash [bun]
bun add ono-react-element
```
:::

### 引入样式

组件自身的 CSS 会跟着组件按需注入，不用逐个引入；但**库的全局 reset 要在入口手动引一次**：

```tsx
// src/main.tsx
import 'ono-react-element/index.css'
```

::: tip
这份全量样式里包含全局 reset（清掉 `margin` / `padding`、按钮默认外观、列表圆点）以及 `.ono-hidden`（组件靠它做隐藏）。生产构建时，包入口的副作用样式有概率被摇树丢掉，所以这一步别省。
:::

#### 用 Tailwind v4

Tailwind v4 是「分层宿主」：它的工具类写在 `@layer utilities` 里，而组件规则是无层的 —— 无层规则优先级更高，于是 `className="p-4"` 会被组件样式压住。

给 Vite 加上 `onoLayeredCSS()`，它在**构建期**把自动注入的组件 CSS 包进 `@layer components`，按需加载不受影响：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { onoLayeredCSS } from 'ono-react-element/vite'

export default defineConfig({
  plugins: [react(), onoLayeredCSS()]
})
```

非 Vite 构建用不了插件，改成引入全量带层样式（会失去按需加载）：

```tsx
import 'ono-react-element/index.layer.css'
```

::: warning
`onoLayeredCSS()` **只能加在分层宿主里**。普通项目（没有声明 `@layer`）加上它，组件样式会落进 `components` 层，反而被宿主的 reset 压住，出现 padding、边框、背景全归零。
:::

### 开始使用

按需从包入口引入即可，组件、Hooks、工具函数共用一个入口：

```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <Button type="primary" onClick={() => message.success('你好，ONO')}>
      点我
    </Button>
  )
}

export default App;
```

<div style="margin-top: 24px;">
  <a href="/ono-document/comps/button" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: transform 0.2s, box-shadow 0.2s;">
    <span>查看 ono-react-element 组件文档</span>
    <span>→</span>
  </a>
</div>

### 只装需要的部分

上面几个能力平时都从 `ono-react-element` 一个入口拿；只有「完全不想要 React」或「只想要 zustand 那层封装」时才需要单独装：

包|内容|单独安装
:- | :- | :-
<code>ono-react-element</code>|UI 组件 + 全部配套能力（已透出下列四个包）|是（主包）
<code>@onoxm/utils</code>|纯函数工具，不依赖 React，也不带任何样式|否，想脱离 React 单独用时再装
<code>@onoxm/react-hooks</code>|通用 Hooks|否
<code>@onoxm/react-tools</code>|命令式挂载、状态管理|否
<code>@onoxm/event</code>|事件派发|否
<code>@onoxm/zustand-tools</code>|zustand 的状态工具，peer 要求 <code>zustand &gt;= 5</code>|是

表里前五个都从 `ono-react-element` 一个入口拿。`ono-fetch`、`@onoxm/vite-plugin-auto-router` 与这个组件库**没有依赖关系**，是各自独立的包，见下面的章节。

### 常见问题

**在 Web Worker 里跑大文件分片，报 `document is not defined`。**
主入口第一行就 `import` 了全局样式，而 Worker 里没有 `document`。worker 侧改从窄入口引：

```ts
// my.worker.ts
import { createCutFileWorkerHandler } from 'ono-react-element/utils/cutFile'
```

这条子路径只带 `cutFile` 相关的那几个模块（连传递依赖里的 CSS 都没有），模块图比主入口小一个数量级；主线程侧照常从 `ono-react-element` 引即可。

**组件样式覆盖不了，`className` 里的工具类总是不生效。**
先确认是不是 Tailwind v4 之类的分层宿主，是的话按上面「用 Tailwind v4」配 `onoLayeredCSS()`。组件库没有用 `!important` 堆优先级，覆盖不上基本都是层序问题，不要靠在 className 后面加 `!` 硬顶。

---

## @onoxm/vite-plugin-auto-router

### 介绍

一个约定式路由的 Vite 插件：按目录结构自动生成 React / Vue 路由，代码只存在于虚拟模块里，不往磁盘写任何生成产物。

### 安装

```bash
pnpm add -D @onoxm/vite-plugin-auto-router
```

需要 Vite 6 / 7 / 8；React 项目配 `react-router` 7、Vue 项目配 `vue-router` 4（都是可选 peer，只在引入对应入口时才需要），Node 需 `^20.19.0` 或 `>=22.12.0`。

### 完整文档在独立文档站

目录约定、路由分组、目录布局、插件选项、类型安全导航、版本迁移与更新日志，都已在独立文档站维护，本页不再展开：

<div style="margin-top: 24px;">
  <a href="https://onoxm.github.io/vite-plugin-auto-router/" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: transform 0.2s, box-shadow 0.2s;">
    <span>前往 autoRouter 文档站</span>
    <span>→</span>
  </a>
</div>

---

## ono-fetch

### 介绍

零依赖的同构 HTTP 客户端：浏览器和 Node.js 共用一套 API，底层就是原生 `fetch`。产物是单文件 ESM，minify 后 5.1 KB / gzip 2.4 KB。

### 安装

::: code-group
```bash [npm]
npm i ono-fetch
```
```bash [yarn]
yarn add ono-fetch
```
```bash [pnpm]
pnpm add ono-fetch
```
```bash [bun]
bun add ono-fetch
```
:::

只发 ESM（`exports` 里没有 `require` 分支），CommonJS 项目请用动态 `import()`；`engines` 要求 Node >= 18。

### 快速上手

```ts
import { createOnoFetch } from 'ono-fetch'

const api = createOnoFetch({
  baseURL: '/api',
  timeout: 10_000,
  headers: { 'client-channel': 'web' }
})

type User = { id: number; name: string }

const { data, status } = await api.get<User>('/users/1')
const created = await api.post<User>('/users', { name: 'ono' })
if (status >= 400) throw new Error('加载失败')
```

- 五个动词糖是 `api.get` / `post` / `put` / `patch` / `delete`，其余方法（`HEAD`、`PROPFIND`、私有协议的 `MGET`…）走调用式 `api(url, { method })`。
- `api.extend({ ... })` 派生一个只改几项配置的新实例，原实例不受影响；`api.buildURL(url, { params })` 只拼 URL 不发请求。
- `data` 的类型完全由你声明的泛型决定，运行时**不校验**。

<div style="margin-top: 24px;">
  <a href="/ono-document/packages/onoFetch" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: linear-gradient(135deg, #06b6d4, #0e7490); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: transform 0.2s, box-shadow 0.2s;">
    <span>查看 ono-fetch 完整文档</span>
    <span>→</span>
  </a>
</div>

---

## @onoxm/zustand-tools

### 介绍

把 zustand 的 `useStore` 包成更顺手的一个 hook：同一个函数支持「取全量 / 选择器 / 单个 key / 多个 key」四种写法，内部统一用 `useShallow` 做浅比较。**它不在 `ono-react-element` 主入口里**，要单独安装、单独导入。

### 安装

::: code-group
```bash [npm]
npm i @onoxm/zustand-tools zustand
```
```bash [yarn]
yarn add @onoxm/zustand-tools zustand
```
```bash [pnpm]
pnpm add @onoxm/zustand-tools zustand
```
```bash [bun]
bun add @onoxm/zustand-tools zustand
```
:::

`zustand` 是 peer 依赖（`>= 5`），要项目自己装。

### 快速上手

```tsx
import { createStoreHook } from '@onoxm/zustand-tools'
import { create } from 'zustand'

const useCounterStore = create<{
  count: number
  increment: () => void
}>((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 })
}))

const useCounter = createStoreHook(useCounterStore)

function App() {
  const count = useCounter('count') // 单 key：直接是值
  const double = useCounter(state => state.count * 2) // 选择器

  return (
    <button onClick={() => useCounter.setState({ count: count + 1 })}>
      {count} / double: {double}
    </button>
  )
}

export default App;
```

- 传数组可一次取多个字段（返回 `Pick`），不传参取完整 state；`setState` 挂在函数上，与 zustand 原生签名一致。
- 组件外读写仍用原生的 `useCounterStore.getState()` / `.subscribe()` —— 返回的函数上只有 `setState`。
- 新项目如果不想引入 zustand，直接用 `ono-react-element` 自带的 `defineGlobalState` 即可，两者不共用实现。

<div style="margin-top: 24px;">
  <a href="/ono-document/packages/zustandTools" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: transform 0.2s, box-shadow 0.2s;">
    <span>查看 zustand-tools 完整文档</span>
    <span>→</span>
  </a>
</div>

---

## 下一步

想找什么|去哪里
:- | :-
具体组件怎么配参数|[components](/comps/button)，按功能分组
请求、节流、颜色转换这类纯函数|[utils](/utils/string/chainClassNames)
倒计时、元素尺寸、键盘事件|[hooks](/hooks/useCountdown)
命令式挂载 DOM、全局 / 作用域状态|[tools](/tools/defineGlobalState)
事件派发（类与工厂两种用法）|[event](/event/createEventEmitter)
独立的 npm 包：请求、zustand 工具、路由插件|[packages](/packages/onoFetch)
几个组件拼成一个能跑的界面|[组合场景示例](/examples/)
