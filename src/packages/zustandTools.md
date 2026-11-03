# zustandTools zustand 状态工具

`@onoxm/zustand-tools` 把 zustand 的 `useStore` 包装成一个更顺手的 hook：一个函数同时支持「取全量 / 选择器 / 单个 key / 多个 key」四种写法，内部统一套 `useShallow` 做浅比较。

## 安装

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

`zustand` 是 peer 依赖（>= 5），需要项目自己装。本包不在 `ono-react-element` 的主入口里，要单独安装、单独导入。

## 快速上手

```tsx
import { createStoreHook } from '@onoxm/zustand-tools'
import { create } from 'zustand'

const useCounterStore = create<{
  count: number
  name: string
  increment: () => void
}>((set, get) => ({
  count: 0,
  name: 'Counter',
  increment: () => set({ count: get().count + 1 })
}))

const useCounter = createStoreHook(useCounterStore)

function App() {
  const count = useCounter('count') // 单 key：直接是值
  const double = useCounter(state => state.count * 2) // 选择器：自己算派生值
  const { name } = useCounter(['count', 'name']) // 多 key：Pick 对象
  const all = useCounter() // 不传：完整 state

  return (
    <div>
      <p>
        {name} / {count} × 2 = {double} / {all.count}
      </p>
      <button onClick={() => useCounter.setState({ count: count + 1 })}>
        +1
      </button>
    </div>
  )
}

export default App;
```

## 四种调用形态

调用形式|返回值
:- | :-
<code>useCounter()</code>|完整 state <code>T</code>
<code>useCounter(state =&gt; state.count * 2)</code>|选择器的返回类型 <code>R</code>
<code>useCounter('count')</code>|单个字段的值 <code>T['count']</code>
<code>useCounter(['count', 'name'])</code>|<code>Pick&lt;T, 'count' \| 'name'&gt;</code>

`setState` 是挂在函数上的静态方法，与 zustand 原生签名一致（支持传对象或 `(state) => patch`）：`useCounter.setState({ count: 1 })`。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
useStore|zustand 的 store hook（`create()` 的返回值）|<code>UseBoundStore&lt;StoreApi&lt;T&gt;&gt;</code>|-|是

返回值是一个函数，四种调用形态见上表，并带一个 `setState`。

## 注意事项

- **所有形态都经过 `useShallow`**：`useCounter(['a', 'b'])` 每次 render 都会新建对象，靠浅比较才能避免无谓重渲染 —— 这也是它相对裸用 zustand 的主要价值。
- 传**空数组**（`useCounter([])`）等价于不传，返回完整 state，不是空对象。
- 返回的函数上**只有 `setState`**，没有 `getState` / `subscribe`：组件外读写请直接用原生的 `useCounterStore.getState()` / `.subscribe()`。
- `include` 参数只能传 `true`（类型上写死），所以多 key 形态永远走「只选这些字段」，不存在「排除」写法。
- 与 `ono-react-element` 内置的 `defineGlobalState` 不共用实现：这里包的是 zustand 自己的 store，适合已有 zustand 的项目；新项目不需要 zustand 时直接用 `defineGlobalState` 即可。
