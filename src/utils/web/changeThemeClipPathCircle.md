# changeThemeClipPathCircle

主题切换时的圆形扩散过渡动画，基于 View Transitions API。动画的**方向由「主角主题」`expandOn` 决定**：切到主角主题时圆从起点扩散铺满，主角主题退场时圆从满屏聚拢回起点。

## 基础用法

```tsx
import { useRef, useState } from 'react'
import { changeThemeClipPathCircle } from 'ono-react-element'

function App() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    if (!btnRef.current) return

    const targetIsDark = !isDark

    changeThemeClipPathCircle({
      element: btnRef.current, // 以按钮中心为圆心扩散
      targetIsDark,
      onChangeTheme: () => {
        // 真正的主题落地逻辑写在这里
        setIsDark(targetIsDark)
        document.documentElement.classList.toggle('dark', targetIsDark)
      }
    })
  }

  return <button ref={btnRef} onClick={toggleTheme}>切换主题</button>
}

export default App;
```

想让「切到浅色」时才是扩散的主角（即把默认方向反过来）：

```tsx
changeThemeClipPathCircle({
  element: btnRef.current,
  targetIsDark: !isDark,
  expandOn: 'light',
  onChangeTheme: () => setIsDark(prev => !prev)
})
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
element|动画起点元素，圆心取它的中心|<code>HTMLElement</code>|-|是
targetIsDark|**切换后**的目标主题是否为深色|<code>boolean</code>|-|是
onChangeTheme|真正落地主题切换的回调|<code>() =&gt; void</code>|-|是
duration|过渡时长（毫秒）|<code>number</code>|<code>300</code>|否
expandOn|圆扩散发生在切到哪个主题时（即谁是动画主角）|<code>ThemeExpandOn</code>|<code>'dark'</code>|否

### ThemeExpandOn

类型值|说明
:- | :-
<code>'dark'</code>|切**到**深色时圆扩散、深色退场时圆聚拢（默认）
<code>'light'</code>|切**到**浅色时圆扩散、浅色退场时圆聚拢

## 注意事项

- ⚠️ **`targetIsDark` 必须传「切换后的目标主题」，不是切换前的状态**。两者互为取反，传错方向整个动画会反过来（该扩散的在收缩）。它和调用方各自维护的 `isDark` 差一步，很容易接错 —— 接线时用「目标值」而不是「当前值」。
- ⚠️ **不要在 `onChangeTheme` 里读 DOM 反推方向**。回调执行时主题还没落地，读到的一定是切换**前**的状态；用 `data-*` 属性落地主题的方案更是恒判浅色。方向必须由调用方显式传入。
- ⚠️ **要「翻转动画方向」请改 `expandOn`，不要在调用方写 `targetIsDark: !isDark`**。后者会让 `targetIsDark` 重新变成「同一个名字、两种含义」，正是历史上出过 bug 的那种写法。
- `expandOn` 传了非法值时**回落到默认的深色主角**（内部判定是 `!== 'light'`），不会悄悄反转方向。
- 浏览器**不支持 View Transitions API 时不会报错**，而是直接调用 `onChangeTheme()` 完成切换，只是没有圆点扩散的效果。
- 函数只负责「在合适的时机调用 `onChangeTheme`」，**自己不修改任何主题状态**，主题的实际落地完全由这个回调决定。
- 内部会向 `<head>` 注入一个 `<style>` 标签来关掉默认的交叉淡入淡出，并在过渡**彻底结束后移除自己那一个**标签。这个清理不能省略，也不应改成批量删除（连续快速切换时会误删正在进行的那次过渡的样式）。
- 快速连续切换可能触发浏览器「跳过过渡」（transition skipped），这属于正常情况，函数内部已做了 catch。
- 动画结束后会 `cancel` 本次创建的动画，避免泄漏到下一次切换。
