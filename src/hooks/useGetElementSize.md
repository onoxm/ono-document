# useGetElementSize
用于获取某个元素宽高的Hook。

## 前置条件
在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useGetElementSize';
```

## 基础用法
```tsx
import { useEventListener } from '@/hooks';

function App() {
    const { w, h } = useGetElementSize() // 如果没有传入参数，则默认获取window的宽高
}
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
target|需要获取宽高的元素|<code>() => Element</code>\|<code>Element</code>|-|否
