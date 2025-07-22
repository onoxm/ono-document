# MenuButton 菜单按钮
菜单按钮用于显示隐藏菜单。

## 前置条件
下载MenuButton组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/elements/index.ts`写入以下代码
```tsx
export * from './MenuButton';
```

## 基础用法
```tsx
import { MenuButton } from '@/components/elements'

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
import { MenuButton } from '@/components/elements'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <MenuButton
        w="80px"
        clr="#333"
        bgc="pink"
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
w|按钮宽度|<code>string</code>|<code>40px</code>|否
clr|按钮文字颜色|<code>string</code>|<code>#f5f5f5</code>|否
bgc|按钮背景颜色|<code>string</code>|<code>#342A7C</code>|否
duration|菜单展开动画时长，单位毫秒|<code>number</code>|<code>400</code>|否
active|是否展开菜单|<code>boolean</code>|<code>false</code>|否
onchange|菜单展开状态改变时触发|<code>(bl: boolean) => void</code>|<code>() => {}</code>|否
