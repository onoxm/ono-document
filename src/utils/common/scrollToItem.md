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
- 选中项已经完整落在可视区间内时**不会滚动**，避免列表来回抖动。
- `total <= showMaxNumber` 时所有项本来就都可见，函数直接返回。
- `itemHeight` 是固定行高：这项能力依赖每一项高度一致，行高不固定的列表请改用 `IntersectionObserver` 方案。
- 向上滚时选中项贴到**顶部**，向下滚时贴到**底部**，滚动位置会被 `total - showMaxNumber` 限制在合法范围内。
