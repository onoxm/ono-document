# useDefer
用于分帧渲染大量元素、缓解首屏白屏的 Hook。

## 基础用法
`useDefer` 返回一个判断函数，传入元素下标，返回该元素当前是否可以渲染。
```tsx
import { useDefer } from 'ono-react-element'

function App() {
  const count = 1000
  const defer = useDefer(count)

  return (
    <div>
      {new Array(count).fill(null).map(
        (_, i) => defer(i) && <div key={i}>第 {i + 1} 个组件</div>
      )}
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
maxCount|最多推进到第几帧|<code>number</code>|<code>100</code>|否

## 返回值
参数|说明|类型
:- | :- | :-
defer|判断下标为 <code>n</code> 的元素是否已可渲染|<code>(n: number) => boolean</code>

## 注意事项
- 每帧只放行一个下标，`defer(n)` 在累计帧数超过 `n` 后才变为 `true`，因此列表是**从前往后逐帧长出来**的，而不是一次性出现。
- `maxCount` 是帧数上限。要让 N 个元素全部出现，`maxCount` 至少传 N —— 用默认值 `100` 渲染 1000 个元素时，只有前约 100 个会显示。
- 返回的判断函数每次渲染都是新闭包，读取的是当前帧计数，直接在渲染里调用即可，不要缓存它。
- 元素卸载时会取消最后一次调度的帧；被推迟渲染的元素不占用 DOM，如果需要保持滚动位置稳定，请自行给出占位高度。
