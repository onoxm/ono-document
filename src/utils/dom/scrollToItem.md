# scrollToItem

让滚动容器滚动到指定索引的项，使它变成可见项；已经在可视区域内时不做任何事。

## 基础用法

```tsx
import { useRef, useState } from 'react'
import { scrollToItem } from 'ono-react-element'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const total = 50
  const itemHeight = 40
  const showMaxNumber = 5

  const handleSelect = (index: number) => {
    setCurrentIndex(index)
    if (!containerRef.current) return

    scrollToItem({
      currentIndex: index,
      itemHeight,
      total,
      showMaxNumber,
      element: containerRef.current
    })
  }

  return (
    <div>
      <button onClick={() => handleSelect(20)}>选中第 20 项</button>
      <div
        ref={containerRef}
        style={{ width: '200px', height: '200px', overflow: 'auto' }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{ height: itemHeight, background: i === currentIndex ? '#eee' : '' }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|滚动配置|<code>ScrollToItemOptions</code>|-|是

### ScrollToItemOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
currentIndex|当前选中项的索引|<code>number</code>|-|是
itemHeight|每一项的高度（px）|<code>number</code>|-|是
total|项目总数|<code>number</code>|-|是
showMaxNumber|可视区域内最多显示几项|<code>number</code>|-|是
element|滚动容器元素|<code>HTMLElement</code>|-|是

## 注意事项

- 它是**命令式**的：只在被调用的那一刻滚动一次，容器高度变化不会自动跟随，需要在合适的时机（如选中项变化、容器尺寸变化）自行再调一次。
- 函数内部按 `showMaxNumber * itemHeight` **推算**可视区高度，并不去读元素的真实高度 —— 所以请让容器可视高度约等于这个值，否则「可见」的判断会和实际观感对不上。
- 选中项**已完整落在可视区内时不会滚动**，避免列表来回抖动。「完整」带 **1px 容差**：项被裁掉不超过 1px 也算可见；滚动目标与当前位置相差不超过 1px 时也不会真的调用 `scrollTo`。
- `total <= showMaxNumber` 时所有项本来就都可见，直接返回；`total` / `showMaxNumber` / `itemHeight` 有任一 ≤ 0 也直接返回。
- 向上滚时选中项贴到**顶部**（目标 `currentIndex * itemHeight`），向下滚时贴到**底部**（目标 `itemBottom - showMaxNumber * itemHeight`），最终位置被上界 `(total - showMaxNumber) * itemHeight` 钳制在合法范围内。
- `itemHeight` 必须是固定行高：这项能力依赖每一项等高，行高不固定的列表请改用 `IntersectionObserver` 方案。
- 可见性判断走**像素边界**（`itemTop` / `itemBottom` 对比 `scrollTop`）。别退回「用 `Math.floor(scrollTop / itemHeight)` 反推可视区首项」的写法 —— 浏览器读回的 `scrollTop` 是取整后的整数像素，行高一旦是非整数（如 `35.3`），反推出的首项会偏小 1，把「其实完全不可见的第一项」误判成已可见，于是**永远滚不到第一项**。（该缺陷已在 2026-10-06 的版本中修复。）
- 行高为整数时滚动目标也是整数，行为最直观；行高带小数时目标带小数，浏览器按物理像素取整，最终位置可能差零点几像素，视觉上无影响。
