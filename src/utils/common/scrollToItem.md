# scrollToItem
滚动到指定元素

## 示例
```tsx
import { useRef } from 'react'
import { scrollToItem } from 'ono-react-element'

function App() {
    const containerRef = useRef<HTMLDivElement>(null)

    return <div ref={containerRef} style={{ width: '500px', height: '500px' }}>

    </div>
}
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|滚动配置|<code>ScrollToItemOptions</code>|-|是

### ScrollToItemOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
currentIndex|当前选中项的索引|<code>number</code>|-|是
itemHeight|每个项目的高度|<code>number</code>|-|是
total|项目总数|<code>number</code>|-|是
showMaxNumber|显示最大数量|<code>number</code>|-|是
element|滚动容器元素|<code>HTMLElement</code>|-|是
