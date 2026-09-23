# MenuButton 菜单按钮
菜单按钮用于显示隐藏菜单，点击时按钮内的线条会变形为关闭图标。

## 基础用法
点击时组件会切换内部状态，三条横线收拢成叉号，右侧的圆点滑出。
```tsx
import { MenuButton } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <MenuButton />
    </div>
  )
}

export default App;
```

## 受控用法
`active` 控制展开状态，`onClick` 的第二个参数就是本次点击后的状态，可以直接用它回写。
```tsx
import { MenuButton } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <MenuButton
        width="80px"
        lineColor="#333"
        backgroundColor="pink"
        active={open}
        onClick={(_, next) => setOpen(next)}
      />
    </div>
  )
}

export default App;
```

## 自定义颜色与尺寸
`width` 同时决定按钮的宽和高（正方形），内部的线条长度、圆点位移、圆角都由它按比例换算。
```tsx
import { MenuButton } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <MenuButton
        width={64}
        duration={200}
        lineColor="#5644b8"
        backgroundColor="#f0f2f5"
      />
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
width|按钮宽高（正方形边长）|<code>string</code>\|<code>number</code>|<code>40</code>|否
lineColor|按钮线条颜色|<code>string</code>|<code>#f5f5f5</code>|否
backgroundColor|按钮背景颜色|<code>string</code>|<code>#342A7C</code>|否
duration|线条变形动画时长，单位毫秒|<code>number</code>|<code>400</code>|否
active|是否展开菜单|<code>boolean</code>|<code>false</code>|否
onClick|点击时触发，第二个参数为本次点击后的状态|<code>(e: React.MouseEvent, bl: boolean) => void</code>|<code>() => {}</code>|否

## 注意事项
- 事件名是 `onClick`，不是 `onchange`；签名为 `(e, bl)`，注意**第一个参数是点击事件**，状态在第二个参数上。
- 点击时组件会先调用 `onClick`，再翻转自己的内部状态，因此不传 `active` 也能自己切换；一旦传了 `active`，外部状态就是「最终生效的那一份」。
- `active` 只在**值发生变化**时同步到内部状态：点击后若外部没有回写 `active`，按钮会保持翻转后的外观（此时 `active` 与内部状态已不一致）。
- `width` 传数字时按 px 处理（`40` 等价于 `'40px'`），传字符串则原样使用，内部线条尺寸按该数值等比计算，所以传百分比之类的相对单位会算不出正确比例。
