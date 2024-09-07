# useMouseClick
用于监听鼠标点击时的位置。

## 前置条件
该hooks依赖于`useEventListener`，需要先下载 <a href='/ono-document/hooks/useEventListener'>useEventListener</a> 文件至`src/hooks`文件夹中。

下载`useMouseClick.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useMouseClick';
```

## 基础用法
```tsx
import { useMouseClick } from '@/hooks';

function App() {
    const { clientX, clientY, screenX, screenY, pageX, pageY } = useMouseClick() // 获取鼠标点击位置
}
```
