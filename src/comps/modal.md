# Modal 弹窗

展示一个对话框，提供标题、内容区、操作区。

## 基础用法
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({
            title: '弹窗标题',
            content: '弹窗内容',
            okText: '确定',
            cancelText: '取消',
            onConfirm: () => {
                console.log('确定')
            },
            onCancel: () => {
                console.log('取消')
            }
        })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

## 点击蒙层关闭弹窗
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({
            title: '弹窗标题',
            content: '弹窗内容',
            okText: '确定',
            cancelText: '取消',
            onConfirm: () => {
                console.log('确定')
            },
            onCancel: () => {
                console.log('取消')
            },
            maskClosable: true
        })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

## 自定义底部内容
只需要确认键，不需要取消键，可以这样写：
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({
            footer: ({ OkBtn }) => (
                <>
                    <OkBtn />
                </>
            )
        })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

只需要取消键，不需要确认键，可以这样写：
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({
            footer: ({ CancelBtn }) => (
                <>
                    <CancelBtn />
                </>
            )
        })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

如果不满意默认的按钮样式，可以这样写：
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({
            footer: ({ handleClose }) => (
                <>
                    <button
                        onClick={()=>{
                            console.log('取消')
                            handleClose()
                        }}
                    >
                        取消
                    </button>
                    <button
                        onClick={()=>{
                            console.log('确定')
                            handleClose()
                        }}
                    >
                        确定
                    </button>
                </>
            )
        })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

若不需要底部按钮，可以这样写：
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({ footer: null })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

## 自定义弹窗样式
```tsx
import { Modal } from '@/components/tools'

function App() {
    const handleModal = () => {
        Modal({
            modalBody: handleClose => 
                <div
                    style={{
                        width: '416px',
                        height: '200px',
                        backgroundColor: '#f0f2f5',
                        padding: '20px',
                        borderRadius: '8px'
                    }}
                >
                    <h1>自定义弹窗标题</h1>
                    <p style={{ marginTop: '16px' }}>自定义弹窗内容</p>
                    <button
                        style={{
                        float: 'right',
                        padding: '4px 16px',
                        backgroundColor: '#5644b8',
                        color: '#fff',
                        borderRadius: '4px',
                        marginTop: '64px'
                        }}
                        onClick={handleClose}
                    >
                        关闭弹窗
                    </button>
                </div>
        })
    }

    return <div>
        <Button onClick={handleModal}>打开弹窗</Button>
    </div>
}
```

## API
通用属性参考：通用属性
  参数|说明|类型|默认值|是否必填
  :- | :- | :- | :- | :-
  title|弹窗标题|ReactNode|string|否
  content|弹窗内容|ReactNode|string|否
  icon|弹窗图标|ReactNode|ReactNode|否
  okText|确定按钮文字|string|string|否
  cancelText|取消按钮文字|string|string|否
  confirmDisabled|确定按钮禁用|boolean|false|否
  cancelDisabled|取消按钮禁用|boolean|false|否
  onConfirm|确定按钮回调|() => void|() => void|否
  onCancel|取消按钮回调|() => void|() => void|否
  mask|是否显示蒙层|boolean|true|否
  maskClosable|点击蒙层是否可关闭弹窗|boolean|false|否
  width|弹窗宽度|string｜number|416|否
  btnClr|按钮颜色|string|#5644b8|否
  footer|自定义底部内容|((params: footerRenderParams) => ReactNode)|({ OkBtn, CancelBtn }) => ReactNode|否
  modalBody|自定义弹窗内容|(handleClose: () => void) =>ReactNode|null|否

## footerRenderParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
OkBtn|确定按钮组件|FC<{}>|FC<{}>|否
CancelBtn|取消按钮组件|FC<{}>|FC<{}>|否
handleClose|关闭弹窗回调|() => void|() => void|否