# ScrollableTabs 可滚动标签页
一排能横向滚动的标签，选中某一项时会把它自动滚动到可视区内的指定位置。

## 基础用法
`children` 是一个渲染函数，入参是单个标签组件 `ItemDom`：

```tsx
import { useState } from 'react'
import { ScrollableTabs } from 'ono-react-element'

const tabs = [
  { label: 'Tab 1', key: '1' },
  { label: 'Tab 2', key: '2' },
  { label: 'Tab 3', key: '3' },
  { label: 'Tab 4', key: '4' },
  { label: 'Tab 5', key: '5' }
]

function App() {
  const [activeKey, setActiveKey] = useState('1')

  return (
    <div style={{ width: 320 }}>
      <ScrollableTabs
        style={{ gap: 10 }}
        activeIndex={tabs.findIndex(item => item.key === activeKey)}
        onChange={index => setActiveKey(tabs[index]?.key ?? '1')}
      >
        {ItemDom =>
          tabs.map(({ label, key }) => (
            <ItemDom
              key={key}
              style={{
                width: 100,
                padding: '5px 10px',
                borderRadius: 5,
                background: activeKey === key ? 'skyblue' : 'transparent',
                color: activeKey === key ? 'white' : 'black'
              }}
            >
              {label}
            </ItemDom>
          ))
        }
      </ScrollableTabs>
    </div>
  )
}

export default App;
```

## 受控与非受控
- 传了 `activeIndex` 就是**受控**：选中态完全由它决定。点击仍会触发 `onChange`，但组件不做乐观更新，你要在 `onChange` 里把 `activeIndex` 改掉，高亮才会跟着动。
- 不传 `activeIndex` 就是**非受控**：初始选中项由 `defaultActiveIndex` 决定（默认 `0`），之后组件自己维护，适合只要滚动、不关心选中值的场景。

非受控时可以直接用 `aria-selected` / `aria-disabled` 驱动外观：

```tsx
import { ScrollableTabs } from 'ono-react-element'

const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']

function App() {
  return (
    <div style={{ width: 320 }}>
      <style>{`
        .my-tab[aria-selected='true'] {
          background: skyblue;
          color: #fff;
        }
        .my-tab[aria-disabled='true'] {
          opacity: 0.4;
        }
      `}</style>
      <ScrollableTabs defaultActiveIndex={2} style={{ gap: 10 }}>
        {ItemDom =>
          tabs.map((label, i) => (
            <ItemDom key={label} className="my-tab" disabled={i === 3}>
              {label}
            </ItemDom>
          ))
        }
      </ScrollableTabs>
    </div>
  )
}

export default App;
```

## 停靠位置
`position` 决定选中项滚动后停在哪里：`'start'` 靠左、`'center'` 居中（默认）、`'end'` 靠右。点击与受控变更都走它。

```tsx
import { useState } from 'react'
import { ScrollableTabs } from 'ono-react-element'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabs = ['一', '二', '三', '四', '五', '六']

  return (
    <div style={{ width: 320 }}>
      <ScrollableTabs
        position="start"
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        style={{ gap: 10 }}
      >
        {ItemDom =>
          tabs.map((label, index) => (
            <ItemDom key={label} style={{ width: 100, padding: '5px 10px' }}>
              {label}
            </ItemDom>
          ))
        }
      </ScrollableTabs>
    </div>
  )
}

export default App;
```

## 键盘导航
默认开启（`keyboard` 默认 `true`）：

- `←` / `→`：移动到上一个 / 下一个**可用**的标签
- `Home` / `End`：跳到第一个 / 最后一个可用的标签
- `Enter` / 空格：选中当前聚焦的标签

`Tab` 只会停在选中项上（roving `tabIndex`），进入标签条后再用方向键在项间移动。传 `keyboard={false}` 可整体关闭。

## 禁用某一项
给 `ItemDom` 传 `disabled` 后：点击不会选中它，键盘导航会跳过它，并以 `aria-disabled="true"` 输出。

```tsx
<ItemDom key="3" disabled>
  Tab 3
</ItemDom>
```

## 单独使用 ScrollableTab
`ScrollableTab` 也可以单独渲染。脱离 `ScrollableTabs` 时它会降级为普通 `<li>`：不输出 `role` / `aria-selected` / `tabIndex`，点击也不切换。

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|渲染函数，入参是标签组件 <code>ItemDom</code>|<code>(ItemDom: FC&lt;ScrollableTabProps&gt;) =&gt; ReactNode</code>|-|是
activeIndex|受控的当前下标，传了即受控|<code>number</code>|-|否
defaultActiveIndex|非受控时的初始下标|<code>number</code>|<code>0</code>|否
onChange|选中项变化时触发，参数是选中项的下标|<code>(index: number) =&gt; void</code>|-|否
position|选中项滚动后的停靠位置|<code>'start'</code>\|<code>'center'</code>\|<code>'end'</code>|<code>'center'</code>|否
scrollBehavior|程序化滚动的行为，系统开启「减少动态效果」时会被忽略并强制瞬时跳转|<code>'auto'</code>\|<code>'smooth'</code>|<code>'smooth'</code>|否
keyboard|是否启用方向键 / <code>Home</code> / <code>End</code> 键盘导航|<code>boolean</code>|<code>true</code>|否
className|追加到 <code>ul</code> 的类名|<code>string</code>|-|否
style|写在 <code>ul</code> 上的样式，标签间距用它的 <code>gap</code>|<code>CSSProperties</code>|-|否

### ScrollableTabProps
通用属性参考：通用属性

除 `onClick`、`children` 外的 `li` 原生属性（如 `id`、`title`、`aria-controls`、`data-*` 等）会透传到 `<li>` 上；`role`、`aria-selected`、`tabIndex` 由组件按选中状态接管。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|标签内容|<code>ReactNode</code>|-|是
disabled|是否禁用：不可点击、不参与键盘导航，并以 <code>aria-disabled</code> 输出|<code>boolean</code>|<code>false</code>|否
onClick|点击回调，在组件自身的选中逻辑**之前**执行；<code>disabled</code> 为真时不触发|<code>(e: MouseEvent&lt;HTMLLIElement&gt;) =&gt; void</code>|-|否
className|追加在 <code>ono-scrollable-tab</code> 之后的类名|<code>string</code>|-|否
style|标签样式|<code>CSSProperties</code>|-|否

## 注意事项
- ⚠️ 渲染函数请**直接返回 `ItemDom` 列表，不要用 Fragment（`<>...</>`）包裹**：组件按 `children` 的顺序给每个标签注入下标，Fragment 会让整组共用一个下标，点击、`aria-selected`、键盘导航会一起错位。
- 组件**不维护选中样式**：高亮、边框、背景都要你在 `ItemDom` 的 `style` / `className` 里按选中状态自己写（非受控时可参考 `aria-selected`）。
- 标签间距写在 `style.gap` 里即可，**不需要额外告知组件**：定位靠相邻 `getBoundingClientRect()` 的差值算出目标项相对内容起点的偏移量，`gap`、不等宽标签、`padding` 都会被正确计入，`gap` 写百分比也不会算错。
- 滚动定位只在选中下标 / `position` / `scrollBehavior` 变化时重算，**刻意不跟随 `children`**：否则父组件每次重渲染（渲染函数每次都是新函数）都会把选中项拉回落点，打断用户正在进行的手动滚动。容器宽度变化（窗口缩放、侧栏收起）同样不会自动重新定位。
- 容器取消了 CSS 的 `scroll-behavior: smooth`，落点动画改由 `scrollTo({ behavior })` 按 `scrollBehavior` 控制 —— 否则鼠标滚轮折算的 `scrollLeft` 赋值也会被缓动，手感很差且关不掉。
- 若你自己渲染了裸 `<li>` 而不是用 `ItemDom`，点击会由外层 `ul` 的委托补上切换；带 `role="tab"` 的元素会被跳过，不会重复处理。
- 透传的 `ref` 拿到的是内部的 `ul` 元素。
