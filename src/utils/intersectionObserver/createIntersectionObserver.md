# createIntersectionObserver

创建 `IntersectionObserver` 并开始观察一个或多个元素。

## 基础用法

```tsx
import { useEffect, useRef } from 'react'
import { createIntersectionObserver } from 'ono-react-element'

function App() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll('.item') ?? [])
    if (!items.length) return

    createIntersectionObserver(
      items,
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.2 }
    )
  }, [])

  return (
    <div ref={listRef}>
      <div className="item">项目 1</div>
      <div className="item">项目 2</div>
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
observingEls|单个元素或元素数组|<code>HTMLElement</code>\|<code>HTMLElement[]</code>|-|是
callBack|可见性变化时的回调|<code>(entries, observer) =&gt; void</code>|-|是
options|观察配置|<code>IntersectionObserverInit</code>|-|否

### options

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
root|用作视口的祖先元素，<code>null</code> 表示浏览器视口|<code>Element</code>\|<code>Document</code>\|<code>null</code>|-|否
rootMargin|视口的外扩边距|<code>string</code>|-|否
threshold|触发阈值，单个数字或数组|<code>number</code>\|<code>number[]</code>|-|否

## 注意事项

- ⚠️ **函数不返回 `observer` 实例**（返回值是 `undefined`）。这意味着调用方**无法 `unobserve` 或 `disconnect`**。
  在 React 里尤其要注意：组件卸载后观察仍然存在，被观察的元素若已从 DOM 移除，仍会占用引用，造成内存泄漏。需要手动清理时请改用原生写法：
  ```ts
  const ob = new IntersectionObserver(callback, options)
  elements.forEach(el => ob.observe(el))
  // 清理
  return () => ob.disconnect()
  ```
- 注意参数名是 **`callBack`**（首字母大写 B），不是 `callback`。
- 传单个 `HTMLElement` 时只会 `observe` 一个；传数组则逐个观察。判定用的是 `instanceof HTMLElement`，传入 `NodeList`、`jQuery` 对象这类**类数组不会被识别**，会走到数组分支并失败（`NodeList` 没有 `length` 遍历的 `forEach` 兼容问题）——请先 `Array.from` 转成真数组。
- 回调参数与原生一致：`(entries, observer)`。
- `rootMargin` / `threshold` 传得不合适会导致回调触发过于频繁，滚动场景建议配合 `rafTimeout` 节流。
