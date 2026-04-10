# useReactive
一个类似vue中的`reactive`函数的hook，用于将对象转换为响应式对象。

## 基础实用
```tsx
import { useReactive } from '@/hooks'

function App() {
    const state = useReactive({
        count: 0
    })

    <div>
        <p>{state.count}</p>
        <button onClick={() => state.count++}>count++</button>
    </div>
}

```