# defineScopedState

定义**作用域状态**：返回 `[Provider, useX]`，同一份定义可以在树的不同位置各持一份独立状态。

## 基础用法

```tsx
import { defineScopedState } from 'ono-react-element'

const [UserProvider, useUser] = defineScopedState({ name: '', age: 18 })

function Panel() {
  const [name, setName] = useUser('name') // 单 key：第一位就是**值**
  const [profile] = useUser(['name', 'age']) // 数组：第一位是 Pick 对象

  return (
    <button onClick={() => setName({ name: 'ono' })}>
      {name} 今年 {profile.age} 岁
    </button>
  )
}

function App() {
  return (
    <UserProvider>
      <Panel />
    </UserProvider>
  )
}

export default App;
```

## 多处各持一份

同一个定义下的每个 `Provider` 实例各有一份独立 store —— 页面上同时开两个向导表单、多标签面板都用它：

```tsx
import { defineScopedState } from 'ono-react-element'

const [CounterProvider, useCounter] = defineScopedState({ count: 0 })

const Panel = () => {
  const [count, setCount] = useCounter('count')
  return (
    <button onClick={() => setCount({ count: count + 1 })}>{count}</button>
  )
}

function App() {
  return (
    <div>
      <CounterProvider>
        <Panel />
      </CounterProvider>
      <CounterProvider>
        <Panel />
      </CounterProvider>
    </div>
  )
}

export default App;
```

点其中一个面板的按钮，另一个不受影响。需要模块级唯一一份、且组件外也要读写时，改用 `defineGlobalState`。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
initData|初始状态|<code>T</code>|-|是
middlewares|中间件数组，内置 <code>persistMiddleware</code>|<code>Middleware&lt;T&gt;[]</code>|<code>[]</code>|否

### 返回值

返回元组 `[Provider, useX]`：

成员|说明
:- | :-
Provider|包裹子树；每个 Provider 实例在首次 render 时**惰性创建**一份独立 store，卸载后重挂得到一份干净状态
useX|作用域内的读取 hook，返回元组 <code>[data, setState]</code>

### ProviderProps

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
name|给 Context 命名，React DevTools 里会显示成 <code>&lt;name&gt;.Provider</code>|<code>string</code>|-|否
children|子节点|<code>ReactNode</code>|-|是

`name` 是**每个 store 的静态名字**（落在 Context 的 displayName 上），不是实例维度 —— 同一份定义下的多个 Provider 实例无法各自取名。

### useX 的三种形态

调用形式|返回值
:- | :-
<code>useX('name')</code>|<code>[T['name'], ScopedSetter&lt;T, 'name'&gt;]</code> —— 第一位是**值本身**
<code>useX(['name', 'age'])</code>|<code>[Pick&lt;T, 'name' \| 'age'&gt;, ScopedSetter&lt;T, 'name' \| 'age'&gt;]</code>
<code>useX()</code>|<code>[T, Store&lt;T&gt;['setState']]</code> —— 不收窄，可写任意字段

### ScopedSetter

`K` 是本次订阅的 keys：

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
data|要合并进 state 的部分字段，或 updater 函数|<code>Partial&lt;Pick&lt;T, K&gt;&gt;</code>\|<code>(prev: Pick&lt;T, K&gt;) =&gt; Partial&lt;Pick&lt;T, K&gt;&gt;</code>|-|是

## 注意事项

- **必须在模块级调用一次**。写在组件函数体里会每次 render 各建一个 Context，Provider 与 hook 拿到两个不同的 Context 对象，React 会把整棵子树**卸载重建** —— 表现为状态被清空、输入框失焦，而且不报任何错。
- **必须在对应的 `<Provider>` 内部调用**，否则抛错（不会静默回落到某个默认 store）。报错文案会带上 `name`，多 store 场景能一眼看出是哪一个。
- **传了 keys 时写入口也随之收窄**：`useX(['name'])` 的第二项只能写 `name`。这是相对全局版的**实质差异**（全局版的 `useUser.setState` 挂在函数上、拿不到 keys，永远收完整 `T`）。需要写任意字段时另取一份不传 keys 的：`const [, setAll] = useX()`。
- ⚠️ 收窄**只发生在类型层**：运行时 updater 的 `prev` 仍是**完整 `T`**，`{...prev}` 展开的是全量字段。
- **单 key 只改读侧**：写入口维持 `Partial<Pick<T, K>>`，不随 keys 数量变形 —— `useX('name')` 的 setter 仍然接收 `{ name: ... }`，而不是裸值。
- `keys` 做的是**选择性订阅**：未列入的字段发生变化不会触发重渲染。
- 作用域 store **没有组件外句柄**：它属于某个 Provider 实例，组件外无法表达「操作哪一个」。需要组件外读写请用 `defineGlobalState`。
