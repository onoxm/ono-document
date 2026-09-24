# debounce

防抖：在最后一次调用后等待指定时间再执行。

## 基础用法

```tsx
import { useState } from 'react'
import { debounce } from 'ono-react-element'

function App() {
  const [keyword, setKeyword] = useState('')

  const search = debounce((value: string) => {
    console.log('发起搜索', value)
  }, 300)

  return (
    <input
      value={keyword}
      onChange={e => {
        setKeyword(e.target.value)
        search(e.target.value)
      }}
    />
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
func|需要防抖的函数|<code>(...args: any[]) =&gt; any</code>|-|是
delay|延迟时间（毫秒）|<code>number</code>|-|是

返回值|防抖后的函数（无返回值）
:- | :-

## 注意事项

- **没有 `cancel`、没有 `immediate` 选项**。如果需要在组件卸载时取消待执行的调用，请在外面自己包一层：
  ```tsx
  import { useEffect, useMemo } from 'react'
  import { debounce } from 'ono-react-element'

  // 每次渲染都会重建防抖函数，务必用 useMemo 固定引用
  const search = useMemo(() => debounce(fn, 300), [])
  ```
- 在 React 里**一定要用 `useMemo` / `useRef` 固定这个函数的引用**：每次渲染都重新 `debounce(...)` 会得到全新实例，计时器各算各的，防抖直接失效。
- 定时器用的是 `setTimeout`，不会在组件卸载时自动清理。
- 执行时机固定在延迟之后，首次调用也要等满 `delay`。
