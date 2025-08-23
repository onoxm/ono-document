# Button 按钮
按钮用于开始一个即时操作。

## 前置条件
在react项目入口文件中引入样式，默认为`src/main.tsx`。
```tsx
import 'ono-react-element/dist/style/Button.css'
```

## 基础用法
```tsx
import { Button } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return <Button onClick={() => setCount(count + 1)}>count: {count}</Button>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
type|按钮类型|<code>ButtonType</code>|<code>'primary'</code>|否
htmlType|设置button原生type属性|<code>ButtonHtmlType</code>|<code>'button'</code>|否
shape|按钮形状|<code>ButtonShape</code>|<code>'default'</code>|否
plain|是否朴素按钮|<code>boolean</code>|<code>false</code>|否
disabled|是否禁用|<code>boolean</code>\|<code>() => boolean</code>|<code>false</code>|否
loading|是否显示加载中状态|<code>boolean</code>\|<code>{ delay?: number; icon?: ReactNode }</code>|<code>false</code>|否
children|区域子元素|<code>ReactNode</code>|-|否
className|自定义类名||<code>string</code>|-|否
style|自定义样式|<code>CSSProperties</code>|-|否
onClick|点击事件回调函数|<code>(e: React.MouseEvent\<HTMLButtonElement>) => void</code>|-|否

### ButtonType
类型|说明
:- | :- 
<code>'primary'</code>|主要按钮
<code>'success'</code>|成功按钮
<code>'warning'</code>|警告按钮
<code>'danger'</code>|危险按钮
<code>'info'</code>|信息按钮
<code>'default'</code>|默认按钮

### ButtonHtmlType
类型|说明
:- | :- 
<code>'button'</code>|按钮
<code>'submit'</code>|提交按钮
<code>'reset'</code>|重置按钮

### ButtonShape
类型|说明
:- | :- 
<code>'default'</code>|默认按钮
<code>'round'</code>|圆角按钮
<code>'circle'</code>|圆形按钮
