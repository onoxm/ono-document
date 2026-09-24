# elementIsInViewport

观察一批元素是否进入视口，进入与离开时分别触发回调。

## 基础用法

```tsx
import { useEffect, useRef } from 'react'
import { elementIsInViewport } from 'ono-react-element'

function App() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = Array.from(wrapRef.current?.querySelectorAll('.card') ?? [])
    if (!cards.length) return

    elementIsInViewport(
      cards,
      entry => {
        // 进入视口：开始加载图片 / 记录曝光
        console.log('进入', entry.target)
      },
      entry => {
        // 离开视口
        console.log('离开', entry.target)
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.5 }
    )
  }, [])

  return (
    <div ref={wrapRef}>
      <div className="card">卡片 1</div>
      <div className="card">卡片 2</div>
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
elements|待观察的元素数组|<code>HTMLElement[]</code>|-|是
onIntersecting|元素进入视口时触发|<code>(entry: IntersectionObserverEntry) =&gt; void</code>|-|是
onUnIntersecting|元素离开视口时触发|<code>(entry: IntersectionObserverEntry) =&gt; void</code>|-|是
options|观察配置|<code>{ root?, rootMargin?, threshold? }</code>|<code>{ root: null, rootMargin: '0px', threshold: 0 }</code>|否

## 注意事项

- ⚠️ **不返回 `observer` 实例**，调用方无法 `unobserve` / `disconnect`。组件卸载后观察不会自动停止，反复挂载同一个组件会累积观察器。需要清理请改用原生 `IntersectionObserver`。
- 与 `createIntersectionObserver` 的区别：这里的回调是**逐个 entry** 触发的（进入调 `onIntersecting`、离开调 `onUnIntersecting`），而前者把原始 `entries` 数组整体交给你。
- 判定依据是 `entry.isIntersecting`：**元素只要有一部分与视口相交就算「进入」**，`threshold` 只影响触发的时机点，不改变这个布尔值的含义。
- 首次调用时，**初始就在视口内**的元素会立刻触发一次 `onIntersecting`（这是 `IntersectionObserver` 的默认行为，不是 bug）。
- `elements` 必须是**真数组**。传 `NodeList` 会因 `instanceof HTMLElement` 判定失败而走进数组分支，最终遍历不到元素 —— 记得先 `Array.from(...)`。
- 与 `createIntersectionObserver` 一样，`options` 传对象字面量时会被整体替换（不是逐字段合并），所以只想改 `threshold` 的话 `root` / `rootMargin` 要一起写上，或依赖默认值的写法。
