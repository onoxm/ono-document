# throttle

节流：在指定时间窗口内最多执行一次。

## 基础用法

```tsx
import { useState } from 'react'
import { throttle } from 'ono-react-element'

function App() {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)

  // 每次渲染都会重建，实际项目里请用 useMemo 固定引用
  const handleClick = throttle(() => setCount(c => c + 1), 300)

  return (
    <div>
      <button onClick={handleClick}>快速点击我</button>
      <button onClick={() => setActive(v => !v)}>
        {active ? '已激活' : '未激活'}
      </button>
      <p>count: {count}</p>
    </div>
  )
}

export default App;
```

取消待执行的调用：

```ts
const handleScroll = throttle(onScroll, 200)
// 组件卸载或不再需要时
handleScroll.cancel()
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
func|需要节流的函数|<code>(...args: any[]) =&gt; any</code>|-|是
delay|节流时间窗口（毫秒）|<code>number</code>|-|是
options|行为配置|<code>ThrottleOptions</code>|-|否

### ThrottleOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
leading|窗口开始时是否立即执行|<code>boolean</code>|<code>true</code>|否
trailing|窗口结束时是否用最后一次参数补执行|<code>boolean</code>|<code>true</code>|否

## 注意事项

- 返回值上挂了 **`cancel` 方法**，用来清掉待执行的 trailing 调用并重置计时。`debounce` 没有这个能力，需要清理时用这个。
- `leading` 与 `trailing` 都默认为 `true`，即「首次立即执行 + 窗口内的最后一次在窗口结束时补执行」，所以一连串调用通常会执行两次（开头一次、结尾一次）。只想要开头一次就传 `{ trailing: false }`。
- 在 React 里请用 `useMemo` / `useRef` 固定返回函数的引用，否则每次渲染都是新实例，节流不生效。
- 计时基于 `performance.now()`，不是 `Date.now()`，不受系统时间调整影响。
