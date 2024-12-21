# Button 按钮
按钮用于开始一个即时操作。

## 前置条件
该组件依赖`colorUtils`里的方法，请先下载<a href='/ono-document/utils/colorUtils'>`colorUtils`</a>文件至`src/utils`文件夹中。

下载Button组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/elements/index.ts`写入以下代码
```tsx
export * from './Button';
```

## 基础用法
```tsx
import { Button } from '@/components/elements'

function App() {
  return <Button onClick={() => console.log('click')}>点击按钮</Button>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
width|组件宽度|<code>number</code>\|<code>string</code>|<code>'fit-content'</code>|否
height|组件高度|<code>number</code>\|<code>string</code>|<code>'fit-content'</code>|否
btnClr|按钮背景色|<code>string</code>|<code>'#967aeb'</code>|否
color|文字颜色|<code>string</code>|<code>'#fff'</code>|否
children|区域子元素|<code>ReactNode</code>|-|是
disabled|是否禁用|<code>boolean</code>|-|否
padding|内边距|<code>number</code>\|<code>string</code>|<code>'5px 12px'</code>|否
margin|外边距|<code>number</code>\|<code>string</code>|<code>0</code>|否
border|边框|<code>string</code>|<code>'none'</code>|否
borderRadius|圆角大小|<code>number</code>\|<code>string</code>|<code>'4px'</code>|否
onClick|点击事件回调函数|<code>(e: React.MouseEvent\<HTMLButtonElement>) => void</code>|-|否
