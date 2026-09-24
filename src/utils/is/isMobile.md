# isMobile

当前设备是否为移动端（**布尔值，不是函数**）。

## 基础用法

```ts
import { isMobile } from 'ono-react-element'

if (isMobile) {
  // 移动端逻辑
}
```

可以直接参与条件渲染：

```tsx
import { isMobile } from 'ono-react-element'

function App() {
  return <div>{isMobile ? '移动端布局' : '桌面端布局'}</div>
}

export default App;
```

## API

它是**常量**，直接当布尔值用，不需要调用：

类型|说明
:- | :-
<code>boolean</code>|模块加载时根据 <code>navigator.userAgent</code> 求值的结果

## 注意事项

- **在模块加载时求值一次**，之后不会变化。用户没法在运行时「变成」移动端，所以它适合做初始化判断，不适合放进需要响应式的状态里（放进去也不会更新）。
- 匹配的是 `Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini`。
- ⚠️ **SSR / Node 环境下会直接抛错**（`navigator is not defined`），因为它是在模块顶层读 `navigator.userAgent` 的。需要在 SSR 中用，请改为在 `useEffect` 里判断 `isBrowser` 之后再读取，不要把这个模块在服务端渲染路径上 import。
- 桌面浏览器的「响应式模拟模式」下 `userAgent` 常被改写，用它做布局分支时结果可能与视口宽度不一致；更可靠的做法是配合媒体查询。
- 想要更细的平台信息用 `distinguishPlatform` / `getBrowserInfo`。
