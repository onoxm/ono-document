# PortalRenderer 命令式Dom
将声明式的组件转换成命令式组件。

## 前置条件
下载PortalRenderer组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './PortalRenderer';
```

## 基础用法
```tsx
import { Button } from '@/components/elements'
import { portalRenderer } from '@/components/tools'

const MyComponent = ({ destroy }: { destroy: () => void }) => {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: 500,
          height: 300,
          background: 'white',
          border: '1px solid #333',
          borderRadius: 4,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1>This is my component</h1>
        <Button
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          onClick={destroy}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 10 }}>
      <Button onClick={() => portalRenderer(MyComponent, {}, 'my-component')}>
        Open My Component
      </Button>
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
Component|传入组件的props必须带有destroy函数属性|<code>(props: T) => JSX.Element</code>|-|是
props|传入组件的props，除了destroy函数属性|<code>Omit<T, "destroy"></code>|-|是
id|dom的id，destroy函数会根据传入的id删除对应的dom|<code>string</code>|-|否

### ComponentProps
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
destroy|命令式组件的销毁函数|<code>(onDestroy?: () => void) => void</code>|-|是
