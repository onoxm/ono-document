# Popover 气泡卡片
点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 前置条件
该组件依赖于`useEventListener`，需要先下载 <a href='/ono-document/hooks/useEventListener'>useEventListener</a> 文件至`src/hooks`文件夹中。

下载Popover组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './Popover';
```

## 基础用法
```tsx
import { Popover } from '@/components/tools'

function App() {
  return
    <Popover content={'这是一段内容'}>
      <div>Hover</div>
    </Popover>
}

export default App;
```

## 点击触发
```tsx
import { Button } from 'ono-react-element'
import { Popover } from '@/components/tools'

function App() {
  return
    <Popover content={'这是一段内容'} trigger="click">
      <Button>Click</Button>
    </Popover>
}

export default App;
```

## 默认打开
```tsx
import { Popover } from '@/components/tools'

function App() {
  return
    <Popover content={'这是一段内容'} defaultOpen>
      <div>Hover</div>
    </Popover>
}

export default App;
```

## 隐藏箭头
```tsx
import { Popover } from '@/components/tools'

function App() {
  return
    <Popover content={'这是一段内容'} isShowArrow={false}>
      <div>Hover</div>
    </Popover>
}

export default App;
```

## 自定义位置
```tsx
import { List } from 'ono-react-element'
import { Popover, PositionType } from '@/components/tools'

function App() {
  const position = [
    {
      pos: '',
      label: ''
    },
    {
      pos: 'topLeft',
      label: '上左'
    },
    {
      pos: 'top',
      label: '上'
    },
    {
      pos: 'topRight',
      label: '上右'
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: 'leftTop',
      label: '左上'
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: 'rightTop',
      label: '右上'
    },
    {
      pos: 'left',
      label: '左'
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: 'right',
      label: '右'
    },
    {
      pos: 'leftBottom',
      label: '左下'
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: 'rightBottom',
      label: '右下'
    },
    {
      pos: '',
      label: ''
    },
    {
      pos: 'bottomLeft',
      label: '下左'
    },
    {
      pos: 'bottom',
      label: '下'
    },
    {
      pos: 'bottomRight',
      label: '下右'
    },
    {
      pos: '',
      label: ''
    }
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          width: '800px',
          gap: '10px'
        }}
      >
        <List list={position}>
          {({ pos, label }, i) =>
            pos === '' ? (
              <div key={i}></div>
            ) : (
              <Popover
                key={i}
                overlayStyle={{ width: '300px' }}
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptatibus doloribus iure quia excepturi iste sunt esse quibusdam omnis nesciunt ullam laborum accusamus amet recusandae, soluta velit! Amet, maiores nisi."
                position={pos as PositionType}
              >
                <div style={{ padding: '8px', border: '1px solid #333' }}>
                  {label}
                </div>
              </Popover>
            )
          }
        </List>
      </div>
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|需要触发气泡卡片的元素|<code>ReactNode</code>|-|是
color|气泡背景色|<code>string</code>|<code>'#fff'</code>|否
borderRadius|圆角大小|<code>number</code>\|<code>string</code>|<code>'5px'</code>|否
content|气泡内容|<code>ReactNode</code>\|<code>() => ReactNode</code>|-|是
padding|气泡内边距|<code>number</code>\|<code>string</code>|<code>10</code>|否
trigger|触发方式|<code>'hover'</code>\|<code>'click'</code>|<code>'hover'</code>|否
zIndex|层级|<code>number</code>|<code>9999</code>|否
defaultOpen|是否默认显示|<code>boolean</code>|<code>false</code>|否
overlayClassName|浮层类名|<code>string</code>|-|否
overlayStyle|浮层样式|<code>CSSProperties</code>|-|否
open|控制浮层显示状态|<code>boolean</code>|<code>false</code>|否
onOpenChange|浮层显示状态改变回调函数|<code>(open: boolean) => void</code>|<code>() => {}</code>|否
isShowArrow|是否显示箭头|<code>boolean</code>|<code>true</code>|否
position|气泡位置|<code>positionParams</code>|<code>'top'</code>|否

### positionParams
类型|说明
:- | :- 
<code>'top'</code>|上方
<code>'bottom'</code>|下方
<code>'left'</code>|左侧
<code>'right'</code>|右侧
<code>'topLeft'</code>|上左方
<code>'topRight'</code>|上右方
<code>'bottomLeft'</code>|下左方
<code>'bottomRight'</code>|下右方
<code>'leftTop'</code>|左上角
<code>'leftBottom'</code>|左下角
<code>'rightTop'</code>|右上角
<code>'rightBottom'</code>|右下角