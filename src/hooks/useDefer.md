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
    const defer = useDefer(count);

    return (
        <div>
            {
                new Array(count).fill(null).map((_, i) => {
                    return defer(i)&&<div>第{i+1}个组件</div>
                })
            }
        </div>
    )
}
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
maxCount|最大延迟渲染组件数量|<code>number</code>|-|是
