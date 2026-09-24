# clearAsyncContagion

把异步请求「缓存一次、之后同步返回」，让依赖数据的代码能在 `React.Suspense` 里同步拿到结果。

## 基础用法

```tsx
import { Suspense } from 'react'
import { clearAsyncContagion } from 'ono-react-element'

function UserInfo() {
  // 第一次渲染：fetch 被劫持并 throw 一个 Promise，交给 Suspense 挂起
  // Promise 完成后重新执行：fetch 同步返回缓存的数据
  const data = clearAsyncContagion(() =>
    fetch('/api/user').then(res => res.json())
  )

  return <div>{data.name}</div>
}

function App() {
  return (
    <Suspense fallback="加载中...">
      <UserInfo />
    </Suspense>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
func|需要执行的函数，其内部的 <code>fetch</code> 会被缓存处理|<code>() =&gt; void</code>|-|是

## 注意事项

- 它做的事是**临时劫持 `window.fetch`**：执行 `func` 期间，`fetch` 不再返回真正的 Promise，而是
  - 首次调用时**抛出一个 Promise**（即 `throw promise`，Suspense 靠这个挂起子树）；
  - 该 Promise 完成后重新执行 `func`，此时 `fetch` **同步返回已解析的数据**（注意是 `res.json()` 的结果，不是 `Response` 对象）。
- ⚠️ **缓存只有一个槽位，不按 URL 区分**。`func` 里发起多个不同的请求，后完成的会覆盖先完成的；多组件并发使用时也会互相干扰。它只适合「一个组件、一个请求」的最简场景。
- `func` 的返回值就是缓存的 `fetch` 结果，而 `func` 里 `fetch` 之外的语句会在挂起前、恢复后**各执行一遍**，副作用（打点、赋值）会重复，务必写成幂等。
- 请求失败时缓存被标记为 `rejected`，下次调用会**直接抛出那个错误**而不是重新请求。错误会冒泡到 Suspense 的 error boundary。
- 只处理 `fetch`，`XMLHttpRequest`、`axios` 等不受影响。
- 因此它更适合做**原型验证 / 教学演示**。生产中请用 React Query、SWR 或 `use()` + 数据缓存方案，那些方案按 key 缓存、支持并发与重试。
- 依赖 `window.fetch`，只能在浏览器环境使用。
