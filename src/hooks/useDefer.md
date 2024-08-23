# useDefer
用于延迟渲染，处理白屏问题。

## 前置条件
下载`useDefer.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useDefer';
```

## 基础用法
```tsx
import { useDefer } from '@/hooks';

function App() {
    const count = 1000;

    return (
        <div>
            {
                new Array(count).fill(null).map((_, i) => {
                    return useDefer(i)&&<div>第{i+1}个组件</div>
                })
            }
        </div>
    )
}
```
