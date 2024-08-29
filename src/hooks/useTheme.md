# useTheme
根据传入的theme类型来来触发对应的事件。

## 前置条件
下载`useTheme.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useTheme';
```

## 基础用法
```tsx
import { useTheme, ThemeType } from '@/hooks'

function App() {
    const [theme, setTheme] = useTheme<ThemeType>('light')

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

## useThemeParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
theme|主题类型|<code>ThemeType</code>|-|是
onDark|暗黑模式切换事件回调函数|<code>() => void</code>|-|是
onLight|浅色模式切换事件回调函数|<code>() => void</code>|-|是

## ThemeType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
ThemeType|主题类型|<code>light</code>\|<code>dark</code>\|<code>system</code>|-|是
