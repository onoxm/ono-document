# useArray
一个专门处理数组数据的 React Hooks。

## 前置条件
下载`useArray.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useArray';
```

## 基础实用
```tsx
import { useArray } from '@/hooks'
import { ReactNode } from 'react'

function App() {
    const [list, setList] = useReactive<ReactNode>([])

    const handleAdd = () => {
        // 参数一为value,参数二为索引
        // 如果不传参数二，且参数一为数组，则会将list=value
        setList(<div key={list.length}>Item {list.length + 1}</div>, list.length)
    }

    <div>
        {list}
        <button onClick={handleAdd}>添加一项</button>
    </div>
}

```
