# Textarea 文本域
文本域用于接收多行文本，支持自适应高度、字数统计，并内置撤销与删除选区的快捷键。

## 基础用法
```tsx
import { OnoTextarea } from 'ono-react-element'

function App() {
  return <OnoTextarea placeholder="请输入内容" />
}

export default App;
```

## 字数统计
`showCount` 需要配合 `maxLength` 使用，计数显示在文本域右下角。
```tsx
import { OnoTextarea } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <OnoTextarea
      showCount
      maxLength={100}
      value={value}
      placeholder="最多 100 个字"
      onChange={e => setValue(e.target.value)}
    />
  )
}

export default App;
```

## 自适应高度
`autoSize` 为真时组件会按内容自动增减高度，`minRows` 控制最小行数，不传时默认为 2 行。
```tsx
import { OnoTextarea } from 'ono-react-element'

function App() {
  return <OnoTextarea autoSize={{ minRows: 2 }} placeholder="输入试试" />
}

export default App;
```

## 限制最大行数
同时指定 `maxRows` 后，超出部分不再继续撑高，而是出现滚动条。
```tsx
import { OnoTextarea } from 'ono-react-element'

function App() {
  return (
    <OnoTextarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="最多撑到 6 行" />
  )
}

export default App;
```

## 禁止手动拉伸
`resize` 默认为 `true`（允许纵向拉伸），设为 `false` 后右下角的拉伸角标消失。
```tsx
import { OnoTextarea } from 'ono-react-element'

function App() {
  return <OnoTextarea resize={false} placeholder="不可拉伸" />
}

export default App;
```

## 禁用状态
```tsx
import { OnoTextarea } from 'ono-react-element'

function App() {
  return <OnoTextarea disabled value="不可编辑的内容" />
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
id|文本域 id|<code>string</code>|-|否
name|文本域 name|<code>string</code>|-|否
rows|原生 rows 属性，固定显示行数|<code>number</code>|-|否
value|文本域的值|<code>string</code>|<code>''</code>|否
placeholder|占位文本|<code>string</code>|-|否
readonly|是否只读|<code>boolean</code>|-|否
autocomplete|原生 autocomplete 属性|<code>string</code>|<code>'off'</code>|否
form|所属表单 id|<code>string</code>|-|否
maxLength|最大长度|<code>number</code>|-|否
minLength|最小长度|<code>number</code>|-|否
disabled|是否禁用|<code>boolean</code>|-|否
autoSize|自适应高度，可指定最小/最大行数|<code>boolean</code>\|<code>{ minRows?: number; maxRows?: number }</code>|-|否
resize|是否允许手动拉伸，<code>autoSize</code> 为真时强制不可拉伸|<code>boolean</code>|<code>true</code>|否
showCount|是否显示字数统计，需配合 <code>maxLength</code>|<code>boolean</code>|-|否
border|聚焦时的边框|<code>string</code>|<code>1px solid #5644b8</code>|否
boxShadow|聚焦时的阴影|<code>string</code>|<code>0 0 0 2px #7969d11a</code>|否
className|自定义类名，作用在文本域内层|<code>string</code>|-|否
onChange|内容改变时触发|<code>(event: ChangeEvent\<HTMLTextAreaElement>) => void</code>|-|否
onFocus|获得焦点时触发|<code>(event: ChangeEvent\<HTMLTextAreaElement>) => void</code>|-|否
onBlur|失去焦点时触发|<code>(event: ChangeEvent\<HTMLTextAreaElement>) => void</code>|-|否
onKeyUp|按键抬起时触发|<code>(event: KeyboardEvent\<HTMLTextAreaElement>) => void</code>|-|否
onKeyDown|按键按下时触发|<code>(event: KeyboardEvent\<HTMLTextAreaElement>) => void</code>|-|否

## 注意事项
- 组件导出的名字是 **`OnoTextarea`**，不是 `Textarea`。
- 类型声明里虽然有 `defaultValue`，但组件实现中并未读取它，**目前传了不生效**，请用 `value`。
- `autoSize` 为真时 `resize` 会被强制置为不可拉伸，两者同时传以 `autoSize` 为准。
- 自适应高度的基准是每行 34px，`minRows` 默认为 2；只写 `autoSize` 而不传对象时，等价于只指定最小 2 行。
- 组件内置了两个快捷键（仅在文本域聚焦时生效）：
  - `Ctrl / Cmd + Z`：撤销到上一步内容（组件自己维护历史栈，并已阻止浏览器默认撤销）；
  - `Ctrl / Cmd + D`：删除当前选中的内容；**没有选中任何内容时不会做任何改动**。
- 上述两个快捷键触发后也会调用 `onChange`，但传入的是组件手工构造的事件对象，**只有 `target` 一个字段**（`e.target.value` 可用，`e.currentTarget` 等不存在），处理时不要依赖其他字段。
- `className` 挂在内层的 `.ono-textarea-wrapper` 上，该层样式已做降权处理；`showCount` 的计数条在这一层之外，点击它不会触发文本域聚焦。
