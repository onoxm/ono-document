# useTheme
根据传入的theme类型来来触发对应的事件。

## 基础用法
```tsx
import { useState } from'react'
import { useTheme, ThemeType } from 'ono-react-element'

function App() {
    const [theme, setTheme] = useState<ThemeType>('light')

    useTheme({
        theme, // 当传入为system时，会根据系统的主题来切换
        onDark: ()=> document.body.classList.add('dark'),
        onLight: ()=> document.body.classList.remove('dark'),
    })

    return (
        <div>
            <button onClick={() => setTheme('dark')}>切换为暗黑模式</button>
            <button onClick={() => setTheme('light')}>切换为浅色模式</button>
            <button onClick={() => setTheme('system')}>切换为跟随系统</button>
        </div>
    )
}

export default App
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
params|传入的参数|<code>useThemeParams</code>|-|是

### useThemeParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
theme|主题类型|<code>ThemeType</code>|-|是
onDark|暗黑模式切换事件回调函数|<code>() => void</code>|-|是
onLight|浅色模式切换事件回调函数|<code>() => void</code>|-|是

### ThemeType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
ThemeType|主题类型|<code>light</code>\|<code>dark</code>\|<code>system</code>|-|是
