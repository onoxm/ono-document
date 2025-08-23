# useMouseClick
用于监听鼠标点击时的位置。

## 基础用法
```tsx
import { useMouseClick } from 'ono-react-element';

function App() {
    const { clientX, clientY, screenX, screenY, pageX, pageY } = useMouseClick() // 获取鼠标点击位置
}
```
