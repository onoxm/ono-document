# useArray
一个专门处理数组数据的 React Hooks。

## 基础实用
```tsx
import { useArray } from '@/hooks'
import { ReactNode } from 'react'

function App() {
    const [list, setList] = useReactive<ReactNode>([])

    const handleAdd = () => {
        // 参数一为value, 参数二为索引
        // 如果不传参数二，则默认插入到数组末尾
        // 如果value传入一个返回值为数组的函数，则该函数的返回值会替换掉list的值
        setList(<div key={list.length}>Item {list.length + 1}</div>, list.length)
    }

    <div>
        {list}
        <button onClick={handleAdd}>添加一项</button>
    </div>
}

```
