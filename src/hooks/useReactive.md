# useReactive
一个类似vue中的`reactive`函数的hook，用于将对象转换为响应式对象。

## 前置条件
该hooks依赖于`useCreation`和`useUpdate`，需要先下载 <a href='/ono-document/hooks/useCreation'>useCreation</a> 和 <a href='/ono-document/hooks/useUpdate'>useUpdate</a> 文件。

下载`useReactive.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useReactive';
```

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