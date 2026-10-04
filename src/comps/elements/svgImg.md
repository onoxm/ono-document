# SvgImg 图标染色
把单色图标染成任意颜色，染色由 CSS `filter` 完成，不修改图片本身。

## 基础用法
`src` 是图标地址，`clr` 是染色（默认白色，深色背景上才看得见）：

```tsx
import { SvgImg } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 12, background: '#333', padding: 12 }}>
      <SvgImg src="/icon.svg" clr="#52c41a" />
      <SvgImg src="/icon.svg" clr="#ff4d4f" w={32} h={32} />
    </div>
  )
}

export default App;
```

## 自定义尺寸
`w` / `h` 传数字按 px 处理，传字符串则原样使用，默认都是 `24px`：

```tsx
import { SvgImg } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <SvgImg src="/icon.svg" w={16} h={16} clr="#1677ff" />
      <SvgImg src="/icon.svg" w="2rem" h="2rem" clr="#faad14" />
      <SvgImg src="/icon.svg" className="my-icon" clr="#9254de" />
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
src|图标地址|<code>string</code>|-|是
w|宽度，数字按 px 处理|<code>number</code>\|<code>string</code>|<code>24</code>|否
h|高度，数字按 px 处理|<code>number</code>\|<code>string</code>|<code>24</code>|否
clr|染色颜色|<code>string</code>|<code>#fff</code>|否
className|追加在 <code>ono-svg-img</code> 之后的类名|<code>string</code>|-|否
onClick|点击回调|<code>(e: React.MouseEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否

## 注意事项
- 染色靠 `filter: drop-shadow()` 把阴影平移到原图位置盖住它，所以**只适合纯色（单色）图标**：彩色图标会被染成一片色块。
- 默认颜色是白色 `#fff`，放在浅色背景上会看不见，记得显式传 `clr`。
- ⚠️ `w` / `h` 只在**首次挂载**（以及 `clr` 变化那一次）写入尺寸，之后单独改 `w` / `h` **不会生效**。需要动态尺寸就传 `className` 用 CSS 控制，或者给组件加 `key` 强制重建。
- 内部渲染的是没有 `alt` 的装饰性 `<img>`，无障碍文案请写在父级或相邻文本上。
