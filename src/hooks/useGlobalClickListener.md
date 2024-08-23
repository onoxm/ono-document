# useGlobalClickListener
用于监听鼠标点击时的位置。

## 前置条件
该hooks依赖于`useEventListener`，需要先下载 <a href='/ono-document/hooks/useEventListener'>useEventListener</a> 文件至`src/hooks`文件夹中。

下载`useGlobalClickListener.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useGlobalClickListener';
```

## 基础用法
```tsx
import { useGlobalClickListener } from '@/hooks';

function App() {
    const { x, y } = useGlobalClickListener() // 获取鼠标点击位置
}
```
