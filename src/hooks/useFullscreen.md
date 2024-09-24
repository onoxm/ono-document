# useFullScreen
用于切换全屏模式的自定义 React Hook。

## 前置条件
该hooks依赖于`fullScreen`，需要先下载 <a href='/ono-document/utils/fullScreen'>fullScreen</a> 文件至`src/utils`文件夹中。

下载`useFullScreen.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useFullScreen';
```

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