# Popconfirm 气泡确认框
点击元素，弹出气泡式的确认框。

## 前置条件
该组件依赖于`Popover组件`，需要先下载 <a href='/ono-document/comps/popover'>Popover</a> 文件至`src/components/tools`文件夹中。

下载Button组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './Popconfirm';
```

## 基础用法
```tsx
import { Button } from '@/components/elements'
import { Popconfirm } from '@/components/tools'

function App() {
  return
    <Popconfirm title={'这是一段内容'}>
      <Button>Click</Button>
    </Popconfirm>
}

export default App;
```

## 默认打开
```tsx
import { Button } from '@/components/elements'
import { Popconfirm } from '@/components/tools'

function App() {
  return
    <Popconfirm title={'这是一段内容'} defaultOpen>
      <Button>Click</Button>
    </Popconfirm>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
width|气泡宽度|<code>number</code>\|<code>string</code>|<code>300</code>|否
children|需要触发气泡确认框的元素|<code>ReactNode</code>|-|是
color|气泡背景色|<code>string</code>|<code>'#fff'</code>|否
borderRadius|圆角大小|<code>number</code>\|<code>string</code>|<code>'5px'</code>|否
title|气泡标题|<code>ReactNode</code>\|<code>() => ReactNode</code>|-|是
content|气泡内容|<code>ReactNode</code>\|<code>() => ReactNode</code>|-|否
padding|气泡内边距|<code>number</code>\|<code>string</code>|<code>16</code>|否
gap|气泡内元素间距|<code>number</code>\|<code>string</code>|<code>12</code>|否
okText|确认按钮文字|<code>string</code>|<code>'确定'</code>|否
cancelText|取消按钮文字|<code>string</code>|<code>'取消'</code>|否
onConfirm|点击确认按钮的回调函数|<code>() => void</code>|<code>() => {}</code>|否
onCancel|点击取消按钮的回调函数|<code>() => void</code>|<code>() => {}</code>|否
zIndex|层级|<code>number</code>|<code>9999</code>|否
defaultOpen|是否默认显示|<code>boolean</code>|<code>false</code>|否
overlayClassName|浮层类名|<code>string</code>|-|否
overlayStyle|浮层样式|<code>CSSProperties</code>|-|否
open|控制浮层显示状态|<code>boolean</code>|<code>false</code>|否
onOpenChange|浮层显示状态改变回调函数|<code>(open: boolean) => void</code>|<code>() => {}</code>|否
btnBarDom|自定义按钮组|<code>({ OkBtn, CancelBtn, handleClose }: { OkBtn: FC; CancelBtn: FC; handleClose: () => void}) => ReactNode</code>|<code>({ OkBtn, CancelBtn }: { OkBtn: FC<{}>; CancelBtn: FC<{}> }) =><>\<CancelBtn />\<OkBtn /></></code>|否
