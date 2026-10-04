# defineGlobalState

定义**全局状态**：在模块级创建一份单例 store，返回一个「hook + 静态方法」的函数。不需要 Provider，组件内外都能读写，形状同 zustand。

## 基础用法

在模块级定义并导出（`store/user.ts`）：

```ts
import { defineGlobalState } from 'ono-react-element'

export const useUser = defineGlobalState({ name: '', age: 18 })
```

组件内直接调用它就是响应式读取，按实参形态有三种写法：

```tsx
import { useUser } from './store/user'

function App() {
  const name = useUser('name') // 单 key：直接就是**值**
  const { age } = useUser(['age']) // 数组：给 Pick 对象
  const all = useUser() // 不传：给完整 T

  return (
    <div>
      <p>
        {name} / {age} / {all.name}
      </p>
      <button onClick={() => useUser.setState({ name: 'ono' })}>改名</button>
    </div>
  )
}

export default App;
```

## 组件外读写

静态方法在 `defineGlobalState()` 调用时就已经绑定，**与组件挂载无关** —— 模块加载后、首次渲染前就能用：

```ts
import { useUser } from './store/user'

// 挂载前写入：登录后把用户信息落进 state，之后组件里直接就能读到
useUser.setState({ name: 'ono' })

// 路由守卫 / axios 拦截器：同步读当前值，不触发渲染
const { name } = useUser.getState()

// 需要响应变化时自行订阅，返回值就是取消订阅
const unsubscribe = useUser.subscribe(() => {
  console.log(useUser.getState())
})
```

## 跨独立容器使用

全局版不依赖 Context，所以对 `portalRenderer`、`Modal` 这类**自成 root** 的浮层同样有效 —— 不存在「忘包 Provider」这个失败模式。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
initData|初始状态|<code>T</code>|-|是
middlewares|中间件数组，内置 <code>persistMiddleware</code>|<code>Middleware&lt;T&gt;[]</code>|<code>[]</code>|否

### 返回值

返回一个函数，它**既是 hook、又带三个静态方法**：

调用形式|返回值
:- | :-
<code>useUser('name')</code>|单个字段的值 <code>T['name']</code>
<code>useUser(['name', 'age'])</code>|<code>Pick&lt;T, 'name' \| 'age'&gt;</code>
<code>useUser()</code>|完整 <code>T</code>
<code>useUser.getState()</code>|完整 <code>T</code>（任何地方可调）
<code>useUser.setState(data)</code>|<code>void</code>
<code>useUser.subscribe(cb)</code>|取消订阅函数 <code>() =&gt; void</code>

### setState

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
data|要合并进 state 的部分字段，或 updater 函数|<code>Partial&lt;T&gt;</code>\|<code>(prev: T) =&gt; Partial&lt;T&gt;</code>|-|是

## 注意事项

- **必须在模块级调用一次**。写在组件函数体里会每次 render 重建一份 store，状态每次归零。
- **单 key 直接给值、数组形态给对象**，这个不对称是刻意的：单 key 时 `<p>{name}</p>` 能直接渲染，包成对象会抛 `Objects are not valid as a React child`；而数组形态要能接**动态** keys，返回形状必须与 keys 的内容无关。想要「单个字段但对象形状」就写 `useUser(['age'])`。
- **多字段必须写数组**：`useUser('name', 'age')` 这类散参数多值没有匹配的重载，编译期就会报错 —— 它曾经能过类型却只订阅了第一个 key，第二个字段恒为 `undefined`。
- `setState` 是 **merge 语义**，只覆盖传入的字段；updater 的 `prev` 恒为**完整 `T`**（它没有 keys 概念）。
- 组件内调用与组件外的静态方法操作的是**同一个 store**，也都走整条中间件链。
- 订阅者回调抛错会被**隔离**：一个订阅者抛错不会打断其余订阅者，错误仍会留痕（浏览器走 `reportError`，否则退回 `console`），不会被静默吞掉。
- 中间件的**工厂函数体**在这里就同步执行 —— 内置 `persistMiddleware` 会在模块求值期写一次 localStorage。
