# ResizeDivider 分栏分隔条
可拖动的分栏分隔条：竖条调整左右两栏的宽度，横条调整上下两栏的高度，同时支持指针拖动与键盘操作。

## 基础用法
面板在分隔条左侧时用默认的 `side="left"`，往右拖即变宽。组件只负责算尺寸，真正的宽高要自己写到面板上 —— 把 `onResize` 拿到的新尺寸存进 state 即可。
```tsx
import { ResizeDivider } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [size, setSize] = useState(220)

  return (
    <div
      style={{
        display: 'flex',
        height: 220,
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: size,
          flex: '0 0 auto',
          padding: 12,
          background: '#f5f5f5'
        }}
      >
        <p>左侧面板</p>
        <p>当前宽度：{Math.round(size)}px</p>
      </div>
      <ResizeDivider
        defaultSize={size}
        minSize={160}
        maxSize={420}
        onResize={setSize}
      />
      <div style={{ flex: 1, padding: 12 }}>
        <p>主内容</p>
        <p>Tab 聚焦分隔条后可用 ← → 调整，Shift 加速，Home / End 直达两端</p>
      </div>
    </div>
  )
}

export default App;
```
`defaultSize` 不仅是初始值：**它变化时内部尺寸会跟着同步**，所以上面这种「外部存 state、再传回来」的写法就是受控用法，不需要额外的 `value` 属性。只想给一次初始值、之后完全交给组件自己维护也可以。

## 面板在右侧
`side` 说明被调整尺寸的面板在分隔条哪一侧，**一个值定三件事**：拖动轴与分隔条形态（`left` / `right` 是竖条、调宽度；`top` / `bottom` 是横条、调高度）、位移与尺寸增量的符号（面板在右侧时往右拖是**变窄**）、以及无障碍的 `aria-orientation`。面板在右侧（`side="right"`）时：
```tsx
import { ResizeDivider } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [size, setSize] = useState(200)

  return (
    <div
      style={{
        display: 'flex',
        height: 220,
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}
    >
      <div style={{ flex: 1, padding: 12 }}>
        <p>主内容</p>
        <p>尺寸按右侧面板算</p>
      </div>
      <ResizeDivider
        side="right"
        defaultSize={size}
        minSize={160}
        maxSize={400}
        onResize={setSize}
      />
      <div
        style={{
          width: size,
          flex: '0 0 auto',
          padding: 12,
          background: '#f5f5f5'
        }}
      >
        <p>右侧面板</p>
        <p>当前宽度：{Math.round(size)}px</p>
      </div>
    </div>
  )
}

export default App;
```
没有单独的「拖动轴」参数：轴向由 `side` 自己推出来（`left` / `right` ⇒ 竖条，`top` / `bottom` ⇒ 横条），因此不存在「横条却沿 X 轴调宽度」这种物理上矛盾的搭配。

## 上下分栏
`side` 传 `top`（或 `bottom`）时分隔条变成横条、沿 Y 轴调整高度，方向键也随之换成 `↑` / `↓`：
```tsx
import { ResizeDivider } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [size, setSize] = useState(120)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 260,
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          height: size,
          flex: '0 0 auto',
          padding: 12,
          background: '#f5f5f5'
        }}
      >
        <p>上方面板</p>
        <p>当前高度：{Math.round(size)}px</p>
      </div>
      <ResizeDivider
        side="top"
        defaultSize={size}
        minSize={80}
        maxSize={200}
        onResize={setSize}
      />
      <div style={{ flex: 1, padding: 12 }}>下方面板</div>
    </div>
  )
}

export default App;
```

## 自定义外观
`hitSize` 是热区宽度、`lineSize` 是那条视觉线的粗细 —— 两者分离：热区透明且比线宽得多，只为让鼠标更容易抓住（触屏 / 手写笔下会自动抬到 `20px`，显式传 `hitSize` 时仍以你的值为准）。`color` 传字符串时它表示**交互态**的颜色（hover / 拖动中 / 键盘聚焦），传对象则可以分别指定 `idle` 与 `active`：
```tsx
import { ResizeDivider } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [size, setSize] = useState(240)

  return (
    <div style={{ display: 'flex', height: 200, border: '1px dashed #bbb' }}>
      <div style={{ width: size, flex: '0 0 auto', padding: 12 }}>
        当前宽度：{Math.round(size)}px
      </div>
      <ResizeDivider
        hitSize={16}
        lineSize={2}
        keyboardStep={1}
        color={{ idle: 'rgba(217, 119, 6, 0.35)', active: '#d97706' }}
        defaultSize={size}
        minSize={120}
        maxSize={420}
        onResize={setSize}
      />
      <div style={{ flex: 1, padding: 12 }}>主内容</div>
    </div>
  )
}

export default App;
```
交互时视觉线会在 `lineSize` 基础上再加粗 2px 并变成交互色，所以只需要给两个颜色、不用自己写 hover 样式。

## 拖过下限时收起面板
`onCloseLessMinSize` 在尺寸**小于** `minSize` 时触发，参数是本次算出的**原始尺寸**（可能小于 `minSize`），由你决定要不要把面板收起来。典型用法是把侧栏拖到最左就自动折叠：
```tsx
import { ResizeDivider } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [size, setSize] = useState(220)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', height: 220, border: '1px solid #ddd' }}>
      {!collapsed && (
        <div
          style={{
            width: size,
            flex: '0 0 auto',
            padding: 12,
            background: '#f5f5f5'
          }}
        >
          侧栏
        </div>
      )}
      {!collapsed && (
        <ResizeDivider
          defaultSize={size}
          minSize={160}
          maxSize={420}
          onResize={setSize}
          onCloseLessMinSize={() => setCollapsed(true)}
        />
      )}
      <div style={{ flex: 1, padding: 12 }}>
        {collapsed ? (
          <button onClick={() => setCollapsed(false)}>展开侧栏</button>
        ) : (
          '把分隔条拖到最左，侧栏会收起'
        )}
      </div>
    </div>
  )
}

export default App;
```
判据是**严格小于**：尺寸正好等于 `minSize` 不算越界。拖动时尺寸本身已经被夹在 `[minSize, maxSize]` 里（视觉上停在边界），所以「收起」发生在你继续往越界方向拖的那一刻。

## 键盘操作
分隔条可 `Tab` 聚焦，方向键让**分隔条本身**朝按键方向移动：

按键|作用
:- | :-
<code>←</code> \| <code>→</code>|竖条（`side` 为 `left` / `right`）时调整宽度，步长 `keyboardStep`
<code>↑</code> \| <code>↓</code>|横条（`side` 为 `top` / `bottom`）时调整高度，步长 `keyboardStep`
<code>Shift</code> + 方向键|步长放大 10 倍
<code>PageUp</code> \| <code>PageDown</code>|尺寸增大 / 减小一页（`keyboardStep * 10`），与面板在哪一侧无关
<code>Home</code> \| <code>End</code>|直接跳到 `minSize` / `maxSize`

## API
通用属性参考：通用属性

除 `children` 与 `color` 外的 `div` 原生属性会透传到根元素上（`color` 被占用于线色，原生同名属性已被排除）。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
defaultSize|当前尺寸（px）。**外部变化时会同步内部尺寸**，受控用法直接传状态值，非受控传一次初始值即可|<code>number</code>|-|是
minSize|尺寸下限（px），视觉上不会越过它|<code>number</code>|-|是
maxSize|尺寸上限（px）|<code>number</code>|-|是
onResize|尺寸变化时触发，参数为夹取后的新尺寸|<code>(size: number) => void</code>|-|是
side|被调整尺寸的面板在分隔条的哪一侧：同时决定拖动轴与分隔条形态、尺寸增量符号、<code>aria-orientation</code>|<code>ResizeDividerSide</code>|<code>'left'</code>|否
onCloseLessMinSize|尺寸小于 <code>minSize</code> 时触发，参数为**未经夹取**的原始尺寸|<code>(size: number) => void</code>|-|否
onResizeStart|开始拖动时触发（指针交互；键盘步进不触发）|<code>() => void</code>|-|否
onResizeEnd|结束拖动时触发（含拖动中被卸载的情况）|<code>() => void</code>|-|否
disabled|禁用后不响应指针与键盘，且不可聚焦|<code>boolean</code>|<code>false</code>|否
hitSize|热区宽度，数字按 px 处理；视觉线比它细得多，触屏 / 手写笔下自动抬到 <code>20</code>|<code>number</code>\|<code>string</code>|<code>9</code>|否
lineSize|常态下的视觉线宽，数字按 px 处理|<code>number</code>\|<code>string</code>|<code>1</code>|否
color|线色：字符串 = 交互态色；对象可分别指定常态 / 交互态|<code>string</code>\|<code>\{ idle?: string; active?: string \}</code>|-|否
keyboardStep|键盘单次步进（px），Shift 与 PageUp / PageDown 按 10 倍计算|<code>number</code>|<code>10</code>|否
className|追加到根元素 <code>.ono-resize-divider</code> 的类名|<code>string</code>|-|否
style|根元素内联样式，与组件注入的 CSS 变量合并（内联优先）|<code>CSSProperties</code>|-|否

### ResizeDividerSide
一个值同时决定分隔条形态、拖动轴（及方向键）、位移符号与 `aria-orientation`：

类型值|形态与轴|方向键|说明
:- | :- | :- | :-
<code>'left'</code>|竖条，沿 X 轴调宽度|<code>←</code> \| <code>→</code>|面板在分隔条左侧，往右拖变宽
<code>'right'</code>|竖条，沿 X 轴调宽度|<code>←</code> \| <code>→</code>|面板在分隔条右侧，往右拖变**窄**
<code>'top'</code>|横条，沿 Y 轴调高度|<code>↑</code> \| <code>↓</code>|面板在分隔条上方，往下拖变高
<code>'bottom'</code>|横条，沿 Y 轴调高度|<code>↑</code> \| <code>↓</code>|面板在分隔条下方，往下拖变**矮**

## 注意事项
- 组件**不渲染面板**，只输出那条可拖动的分隔条并算出尺寸。面板的 `width` / `height`、以及 flex 布局里的 `flex: '0 0 auto'` 都要自己写，否则拖动时面板会被 flex 拉伸而不跟手。
- 没有独立的 `direction` 参数：轴向由 `side` 推导，`left` / `right` 是竖条（沿 X 轴），`top` / `bottom` 是横条（沿 Y 轴）。`aria-orientation` 与拖动轴**相反** —— 竖条在 ARIA 里是 `vertical`、横条是 `horizontal`，别按 `side` 的字面去猜。
- 方向键的语义是「让分隔条朝该方向移动」，因此尺寸是加还是减取决于 `side`（面板在 `right` / `bottom` 时反向）；`PageUp` / `PageDown` 则是无条件的「尺寸变大 / 变小」，与面板在哪一侧无关。
- `onResize` **只在夹取后的值真的变化时触发**：拖到边界后继续往同方向拖不会重复回调（也不会每帧刷同一个数）。`onCloseLessMinSize` 相反，只要原始尺寸越界就会触发，可能在一次拖动中连续回调多次 —— 记得在自己的处理里做幂等。
- `minSize` / `maxSize` 传反了不会算出负区间，内部按大小排序兜住（`min/max` 互换后行为与正确传参一致）。
- `onResizeStart` / `onResizeEnd` 只报**指针拖动**，键盘步进不触发。拖动过程中若分隔条被卸载（比如外部收起了面板），会补发一次 `onResizeEnd` 并还原页面原本的 `userSelect`。
- 键盘事件会**先交给宿主的 `onKeyDown`**：在里面调用 `e.preventDefault()` 就表示这次按键由你接管，组件不再处理。
- `className` 落在根元素（即热区）上，组件自身规则都是单类选择器，`w-*` / `h-*` / `bg-*` 这类工具类可以直接覆盖 —— 组件刻意**没有**给热区写 `background-color`（那会是一条单类声明、可能压掉宿主的 `bg-*`），所以给热区上色是安全的。但**视觉线是 `::before`**，工具类改不到它 —— 要改线色请用 `color` 或 CSS 变量 `--line-clr` / `--line-active-clr`，改线宽用 `lineSize` / `--line-size`。
- 轴类名是 `ono-resize-divider-axis-horizontal` / `-axis-vertical`（由 `side` 推导，不是参数名）；早前的 `ono-resize-divider-direction-*` 已经改名，自定义 CSS 若按旧类名写过要一起改。
- `style` 挂在根元素上且内联优先，可以直接写变量细调样式表里的默认值，比如把 `--hit` 这一项改写成 `'12px'`。
- 交互态包含 hover、拖动中与键盘聚焦（`focus-visible`）三种；禁用态会关掉指针事件（`pointer-events: none`）、把 `tabIndex` 设为 `-1` 并把线降到 40% 透明度。
- 拖动只认主键与**发起拖动的那个指针**：鼠标必须按左键（触摸 / 触控笔不受 `button` 限制）；已经有一根手指在拖时，后来按下的指针不会接管，位移与抬起也只认发起者 —— 多点触控下第二根手指乱动不会把尺寸带飞。拖动期间页面禁止选中文本，结束后还原为进入拖动前的值。
- 拖动中途把 `disabled` 变成 `true` 会**就地收尾**：`pointer-events: none` 拦不住已经捕获的指针，所以组件在移动事件里自己结束这次拖动、清掉拖动态与页面上的 `userSelect`，不会出现「已禁用但尺寸还在跟着走」。
- 早期版本用 `closeFit` + `direction` 两个参数分别描述方位与轴向，现已合并为单个 `side`（两者只能组出 4 种合法搭配，且 `horizontal` + `top` 这种组合物理上不成立却过得了类型检查）。迁移时 `closeFit="right"` 对应 `side="right"`，`direction="vertical"` 对应 `side="top"` / `bottom`；类型也从 `ResizeDividerFit` / `ResizeDividerDirection` 收敛成 `ResizeDividerSide`。
