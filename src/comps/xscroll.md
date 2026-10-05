# Xscroll 滚动组件
横向滚动容器：内容超出容器宽度时可以横向滚动，用普通鼠标滚轮上下滚也能横向滚。

## 基础用法
组件的滚动是原生的 `overflow-x`，所以触控板横滑、触屏横滑、键盘左右键都天然可用；普通纵向滚轮由组件折算成横向滚动补上。

```tsx
import { List, Xscroll } from 'ono-react-element'

function App() {
  const languageList = [
    {
      name: 'html',
      color: '#e65100'
    },
    {
      name: 'css',
      color: '#42a5f5'
    },
    {
      name: 'javascript',
      color: '#ffca28'
    }
  ]

  return (
    <Xscroll gap={10} width={400} height={300}>
      <List list={languageList}>
        {({ name, color }) => (
          <div
            style={{
              width: '500px',
              height: '300px',
              background: color,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h1 style={{ fontSize: '40px', color: 'white' }}>{name}</h1>
          </div>
        )}
      </List>
    </Xscroll>
  )
}

export default App;
```

## 设置尺寸与间距
`width` / `height` 默认都是 `'100%'`，数字按 px 处理、字符串原样使用；`gap` 映射为内容区 flex 布局的 `gap`。纵向不滚动，超出高度的部分会被裁掉，所以高度要明确给出。

```tsx
import { Xscroll } from 'ono-react-element'

function App() {
  return (
    <Xscroll width={400} height={100} gap={16} style={{ background: '#f5f5f5' }}>
      <div style={{ width: 200 }}>第一块</div>
      <div style={{ width: 200 }}>第二块</div>
      <div style={{ width: 200 }}>第三块</div>
    </Xscroll>
  )
}

export default App;
```

## 键盘滚动
容器默认 `tabIndex={0}`，`Tab` 聚焦后即可用 `←` / `→` 滚动；不想让它进入 Tab 序列时传 `tabIndex={-1}`。

```tsx
import { Xscroll } from 'ono-react-element'

function App() {
  return (
    <Xscroll tabIndex={-1} height={80}>
      <div style={{ width: 300 }}>不可聚焦，但仍可用滚轮横向滚动</div>
      <div style={{ width: 300 }}>第二块</div>
    </Xscroll>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|需要横向滚动的内容|<code>ReactNode</code>|-|是
gap|子项之间的间距，映射为内容区 flex 布局的 <code>gap</code>|<code>string</code>\|<code>number</code>|-|否
width|容器宽度，数字按 px 处理|<code>string</code>\|<code>number</code>|<code>'100%'</code>|否
height|容器高度，数字按 px 处理|<code>string</code>\|<code>number</code>|<code>'100%'</code>|否
tabIndex|容器的 tab 序号，用于聚焦后支持左右键滚动|<code>number</code>|<code>0</code>|否
className|追加到根元素的类名|<code>string</code>|-|否
style|追加到根元素的行内样式，可覆盖 <code>width</code> / <code>height</code>|<code>CSSProperties</code>|-|否

## 注意事项
- 滚动是原生 `overflow-x: auto`，横向不滚动才是组件的活：`overflow-y` 固定 `hidden`，内容超出高度会被裁掉。
- 纵向滚轮会被折算成横向滚动（行模式 `deltaMode === 1` 时按 16px/行 换算），触控板横向手势、触屏横滑、键盘左右键交给浏览器原生处理，组件不插手。
- 滚到两端后组件会把滚轮**放行**给页面，不会把滚动吞掉；子项内部若有可纵向滚动的区域（比如内嵌的滚动列表），滚轮也不会被劫持。
- 滚动条默认隐藏（`scrollbar-width: none`），视觉上看不到，但滚动能力仍在。
- 内容区是 flex 布局且子项一律 `flex: none`：如果子项被压扁到总宽刚好等于容器宽，就永远不会溢出、也就滚不动，所以组件禁止了子项收缩。需要固定宽度请直接写在子项上。
- 透传的 `ref` 拿到的是最外层的容器 `div`。
