# Theme
切换主题的动画效果。

## 前置条件
需要先下载 <a href='/ono-document/utils/themeUtils'>themeUtils</a> 文件至`src/utils`文件夹中。

## 基础用法
```tsx
import React, { useState } from'react';
import themeUtils from '@/utils/themeUtils';
import './App.css';

function App() {
    const [theme, setTheme] = useState<'light'|'dark'>('light');

    return (
        <>
            <p>当前主题：{theme}</p>
            <button
                onClick={e =>
                    themeUtils.changeClip({
                        duration: 300,
                        el: e.target as HTMLElement,
                        theme: theme === 'light' ? 'dark' : 'light',
                        changeTheme: theme => {
                            setTheme(theme)
                            if (theme === 'dark') 
                                document.documentElement.classList.add('dark')
                            else
                                document.documentElement.classList.remove('dark')
                        }
                    })
                }
            >
                切换主题
            </button>
        </>
    )
}

export default App;
```

在`src/App.css`中添加如下样式（在总样式文件中添加如下样式为最佳实践）：
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
```