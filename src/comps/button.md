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
type|按钮类型|<code>'primary'</code>\|<code>'success'</code>\|<code>'warning'</code>\|<code>'danger'</code>\|<code>'info'</code>\|<code>'default'</code>|<code>'primary'</code>|否
htmlType|设置button原生type属性|<code>'button'</code>\|<code>'submit'</code>\|<code>'reset'</code>|<code>'button'</code>|否
shape|按钮形状|<code>'default'</code>\|<code>'round'</code>\|<code>'circle'</code>|<code>'#default'</code>|否
plain|是否朴素按钮|<code>boolean</code>|<code>false</code>|否
disabled|是否禁用|<code>boolean</code>/|<code>() => boolean</code>|<code>false</code>|否
loading|是否显示加载中状态|<code>boolean</code>/|<code>boolean</code>|<code>false</code>|否
children|区域子元素|<code>ReactNode</code>|-|否
className|自定义类名||<code>string</code>|-|否
style|自定义样式|<code>CSSProperties</code>|-|否
onClick|点击事件回调函数|<code>(e: React.MouseEvent\<HTMLButtonElement>) => void</code>|-|否
