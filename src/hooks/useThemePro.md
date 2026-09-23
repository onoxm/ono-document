# useThemePro
基于 useTheme 封装，在切换主题时增加圆形扩散动画的 Hook。

## 基础用法
```tsx
import { Button, useThemePro } from 'ono-react-element'

function App() {
  const { theme, isDark, changeTheme, nextTheme } = useThemePro({
    initTheme: 'light'
  })

  return (
    <div style={{ width: '100vw' }}>
      <h1>
        当前主题：{theme}（实际{isDark ? '深色' : '浅色'}）
      </h1>
      <Button
        onClick={e =>
          changeTheme({ targetTheme: 'dark', element: e.currentTarget })
        }
      >
        切换主题（dark）
      </Button>
      <Button
        onClick={e =>
          changeTheme({ targetTheme: 'light', element: e.currentTarget })
        }
      >
        切换主题（light）
      </Button>
      <Button
        onClick={e =>
          changeTheme({ targetTheme: 'system', element: e.currentTarget })
        }
      >
        切换主题（system）
      </Button>
      <Button onClick={e => nextTheme({ element: e.currentTarget })}>
        循环切换到下一个主题
      </Button>
    </div>
  )
}

export default App;
```

## 自定义主题落地方式
`themeRules` 会拿到「实际生效是否为深色」，由你决定写到哪里（`html` 的 class、`data` 属性、CSS 变量、状态库……）。
```tsx
import { useThemePro } from 'ono-react-element'

function App() {
  const { theme, changeTheme } = useThemePro({
    initTheme: 'dark',
    themeRules: isDark => {
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
      // 让原生滚动条、select、输入框自动填充也跟着变
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    }
  })

  return <h1>当前主题：{theme}</h1>
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
theme|当前模式，可能是 <code>'system'</code>|<code>ThemeMode</code>
isDark|实际生效是否为深色，判深浅请用它而不是 <code>theme</code>|<code>boolean</code>
changeTheme|切换到指定模式|<code>(options: \{ targetTheme: ThemeMode; element?: HTMLElement; onChange?: () => void \}) => void</code>
nextTheme|按循环顺序切到下一个模式|<code>(options?: \{ element?: HTMLElement; onChange?: () => void \}) => void</code>

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|<code>useThemePro</code> 的参数对象|<code>UseThemeProOptions</code>|-|否

### UseThemeProOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
initTheme|初始主题，**仅首次生效**|<code>ThemeMode</code>|<code>'light'</code>|否
themeRules|主题落地规则，入参为实际是否为深色|<code>(isDark: boolean) => void</code>|给 <code>html</code> 加/去 <code>dark</code> class|否
useThreeMode|是否启用「跟随系统 → 浅色 → 深色」三态循环|<code>boolean</code>|<code>true</code>|否
duration|圆形扩散动画时长（毫秒）|<code>number</code>|<code>300</code>|否

### ThemeMode
类型|说明
:- | :- 
<code>'light'</code>|浅色模式
<code>'dark'</code>|暗黑模式
<code>'system'</code>|跟随系统

## 注意事项
- `themeRules` **不是「仅变化时触发」，而是每次应用主题都会被调用**：挂载首帧、每次 `changeTheme` / `nextTheme`、以及 `'system'` 下系统深浅色变化。所以它必须**幂等** —— 照 `isDark` 直接设值，不要写 toggle 逻辑（被多调一次就会反）。
- 默认规则只切 `html` 上的 `dark` class。如果页面里用到原生滚动条、`<select>`、日期选择器或输入框自动填充，建议在自定义 `themeRules` 里补上 `document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'`，否则这些原生控件在暗色下仍是浅色。
- `changeTheme` / `nextTheme` 的 `element` 是圆形扩散的起点：**不传时会沿用上一次传入的元素**，所以只在第一次传也能保证后续切换都有动画。
- 只有用户主动调用 `changeTheme` / `nextTheme` 时才播放动画；挂载首帧与 `'system'` 下的系统切换都是静默落地。
- `changeTheme` / `nextTheme` 的目标模式与当前一致时会直接返回，`onChange` 不会被调用；`onChange` 只在真正发生切换前触发。
- `initTheme` 只在首次生效，之后再改不会重新应用主题。
