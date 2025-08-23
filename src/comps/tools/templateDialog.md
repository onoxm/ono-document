# TemplateDialog 模版对话框
一个模版对话框组件，用于模版对话框。

## 前置条件
在react项目入口文件中引入样式，默认为`src/main.tsx`。
```tsx
import 'ono-react-element/dist/style/Pagination.css'
```

## 基础用法
```tsx
import { useState } from'react'
import { Button, TemplateDialog } from 'ono-react-element'

function MyDialog({ destroy }: { destroy: () => void }) {
  return (
    <TemplateDialog
      dialogClose={destroy}
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
      <h1>This is my dialog</h1>
      <Button
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onClick={destroy}
      >
        Close
      </Button>
    </TemplateDialog>
  )
}

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      {openDialog && <MyDialog destroy={() => setOpenDialog(false)} />}
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
    </div>
  )
}

export default App;
```

## 结合PortalRenderer用法
```tsx
import { useState } from'react'
import { Button, PortalRenderer, TemplateDialog } from 'ono-react-element'

function MyDialog({ destroy }: { destroy: () => void }) {
  return (
    <TemplateDialog
      dialogClose={destroy}
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
      <h1>This is my dialog</h1>
      <Button
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onClick={destroy}
      >
        Close
      </Button>
    </TemplateDialog>
  )
}

function App() {
  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => portalRenderer(MyDialog, {}, 'my-dialog')}>
        Open My Dialog
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
children|弹窗内容|<code>ReactNode</code>\|<code>(enhancedDialogClose: () => void) => ReactNode</code>|-|是
animation|动画类型|<code>{ type: 'zoom'; element: HTMLElement }</code>\|<code>{ type: 'fade'; direction?: 'top-center' \| 'left-center'; startPosition: string }</code>|-|否
duration|动画持续时间|<code>number</code>|<code>300</code>|否
className|自定义样式类名|<code>string</code>|-|否
style|自定义样式|<code>CSSProperties</code>|-|否
maskColor|遮罩颜色|<code>string</code>|<code>'rgba(0, 0, 0, 0.5)'</code>|否
disableContextMenu|禁用右键菜单|<code>boolean</code>|<code>false</code>|否
maskClickClose|点击遮罩关闭|<code>boolean</code>|<code>true</code>|否
dialogClose|点击对话框关闭|<code>() => void</code>|-|是
