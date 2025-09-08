# MenuButton 菜单按钮
菜单按钮用于显示隐藏菜单。

## 前置条件
在react项目入口文件中引入样式，默认为`src/main.tsx`。
```tsx
import 'ono-react-element/dist/style/MenuButton.css'
```

## 基础用法
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

## 多个单选框用法
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
        onchange={setOpen}
      />
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
width|按钮宽度|<code>string</code>\<code>number</code>|<code>40</code>|否
lineColor|按钮横线颜色|<code>string</code>|<code>#f5f5f5</code>|否
backgroundColor|按钮背景颜色|<code>string</code>|<code>#342A7C</code>|否
duration|菜单展开动画时长，单位毫秒|<code>number</code>|<code>400</code>|否
active|是否展开菜单|<code>boolean</code>|<code>false</code>|否
onchange|菜单展开状态改变时触发|<code>(bl: boolean) => void</code>|<code>() => {}</code>|否
