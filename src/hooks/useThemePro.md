# useThemePro
基于useTheme封装，增加切换主题动画的hook。

## 基础用法
```tsx
import { useThemePro, ThemeType } from 'ono-react-element'

function App() {
    const [theme, changeTheme] = useThemePro({ initTheme: 'dark' })

    return (
        <div style={{ width: '100vw' }}>
            <h1>当前主题：{theme}</h1>
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
        </div>
    )
}

export default App
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
initTheme|初始主题|<code>ThemeType</code>|<code>'light'</code>|否
themeRules|主题规则|<code>(isDark: boolean) => void</code>|<code>(isDark: boolean) => isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')</code>|否

### ThemeType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
ThemeType|主题类型|<code>'light'</code>\|<code>'dark'</code>\|<code>'system'</code>|-|是
