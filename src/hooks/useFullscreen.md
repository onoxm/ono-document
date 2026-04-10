# useFullScreen
用于切换全屏模式的自定义 React Hook。

## 基础用法
```tsx
import { useFullScreen } from '@/hooks';

function App() {
    const [isFullScreen, toggleFullScreen] = useFullScreen()

    return (
        <button onClick={() => toggleFullScreen()}>
            {isFullScreen ? '退出全屏' : '进入全屏'}
        </button>
    )
}
```