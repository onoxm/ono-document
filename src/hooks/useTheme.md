# useTheme
根据传入的主题模式触发对应的回调，并支持跟随系统主题变化。

## 基础用法
```tsx
import { useState } from 'react'
import { useTheme, ThemeMode } from 'ono-react-element'

function App() {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useTheme({
    theme, // 传 'system' 时会根据系统的主题来切换
    onDark: () => document.body.classList.add('dark'),
    onLight: () => document.body.classList.remove('dark')
  })

  return (
    <div>
      <button onClick={() => setTheme('dark')}>切换为暗黑模式</button>
      <button onClick={() => setTheme('light')}>切换为浅色模式</button>
      <button onClick={() => setTheme('system')}>切换为跟随系统</button>
    </div>
  )
}

export default App;
```

## 用 cycleTheme 循环切换
`cycleTheme` 返回循环顺序中的**下一个模式**，本身不执行切换，需要把它交回给 `setTheme`。
```tsx
import { useState } from 'react'
import { useTheme, ThemeMode } from 'ono-react-element'

function App() {
  const [theme, setTheme] = useState<ThemeMode>('system')

  const { cycleTheme, isDark } = useTheme({
    theme,
    onDark: () => document.body.classList.add('dark'),
    onLight: () => document.body.classList.remove('dark')
  })

  return (
    <button onClick={() => setTheme(cycleTheme())}>
      当前：{theme}（实际{isDark ? '深色' : '浅色'}）
    </button>
  )
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
isDark|实际生效是否为深色，<code>'system'</code> 时会跟随系统变化|<code>boolean</code>
cycleTheme|返回循环顺序中的下一个模式，不执行切换|<code>() => ThemeMode</code>

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
params|<code>useTheme</code> 的参数对象|<code>UseThemeProps</code>|-|是

### UseThemeProps
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
theme|当前主题模式|<code>ThemeMode</code>|-|是
onDark|实际生效为深色时调用|<code>() => void</code>|-|是
onLight|实际生效为浅色时调用|<code>() => void</code>|-|是
useThreeMode|是否使用三态循环（跟随系统 → 浅色 → 深色）|<code>boolean</code>|<code>true</code>|否

### ThemeMode
类型|说明
:- | :- 
<code>'light'</code>|浅色模式
<code>'dark'</code>|暗黑模式
<code>'system'</code>|跟随系统

## 注意事项
- `onDark` / `onLight` **不是「仅变化时触发」，而是每次应用主题都会调用**：挂载首帧、`theme` 变化、以及 `'system'` 下系统深浅色变化。所以回调必须**幂等** —— 照目标状态直接设值，不要写 toggle 逻辑（被多调一次就会反）。
- 只有 `theme` 为 `'system'` 时才会监听 `prefers-color-scheme`；手动指定 `'light'` / `'dark'` 后系统怎么变都不会再触发回调。
- 判断实际深浅请用返回的 `isDark`，不要用 `theme` —— `theme` 为 `'system'` 时它并不直接反映当前是深还是浅。
- `useThreeMode` 只影响 `cycleTheme` 的顺序：三态为 `system → light → dark`，两态为 `light → dark`。
