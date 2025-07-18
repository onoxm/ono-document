# Message 全局提示
全局展示操作反馈信息。

## 前置条件
该组件依赖`injunctiveDom`组件，请先下载<a href='/ono-document/comps/tools/injunctiveDom'>`injunctiveDom`</a>文件至`src/components/tools`文件夹中。

下载Message组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './Message';
```

## 基础用法
```tsx
import { Button } from '@/components/elements'
import { Message } from '@/components/tools'

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 10 }}>
      <Button type="success" onClick={() => message.success('Success')}>
        Success
      </Button>
      <Button type="warning" onClick={() => message.warning('Warning')}>
        Warning
      </Button>
      <Button type="danger" onClick={() => message.error('Error')}>
        Error
      </Button>
      <Button type="info" onClick={() => message.info('Info')}>
        Info
      </Button>
    </div>
  )
}

export default App;
```

## loading用法
```tsx
import { Button } from '@/components/elements'
import { Message } from '@/components/tools'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() => {
          message.loading({ message: 'Loading...', key: 'loading' })
          setTimeout(
            () => message.success({ message: 'Success', key: 'loading' }),
            3000
          )
        }}
      >
        Loading
      </Button>
    </div>
  )
}

export default App;
```

## 使用duration属性
```tsx
import { Button } from '@/components/elements'
import { Message } from '@/components/tools'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() =>
          message.success({
            message: 'Success',
            duration: 10000
          })
        }
      >
        Success
      </Button>
    </div>
  )
}

export default App;
```

## 使用close按钮关闭
```tsx
import { Button } from '@/components/elements'
import { Message } from '@/components/tools'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() =>
          message.success({
            message: 'Success',
            showClose: true
          })
        }
      >
        Success
      </Button>
    </div>
  )
}

export default App;
```

## API
静态方法

- <code>message.success(message)</code>
- <code>message.warning(message)</code>
- <code>message.error(message)</code>
- <code>message.info(message)</code>
- <code>message.loading(message)</code>

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
message|提示内容|<code>string</code>\|<code>MessageParams</code>|-|是

### MessageParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
key|当前提示的唯一标志|<code>string</code>|-|否
duration|自动关闭的延时，单位毫秒。|<code>number</code>|3000|否
message|提示内容|<code>ReactNode</code>\|<code>(icon: ReactNode, closeButton?: ReactNode) => ReactNode</code>|-|是
speed|动画速度，单位毫秒。|<code>number</code>|300|否
offset|偏移距离|<code>number</code>|20|否
showClose|显示关闭按钮|<code>boolean</code>|false|否
zIndex|层级|<code>number</code>|9999|否
