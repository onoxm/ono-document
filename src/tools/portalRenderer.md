# PortalRenderer 命令式Dom

把声明式的 React 组件渲染成**命令式**调用：一次函数调用弹出一个独立容器，不需要在 JSX 里维护显隐状态。

## 基础用法

```tsx
import { Button, portalRenderer } from 'ono-react-element'

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

第三个参数是 `rootId`：**同一个 id 只会创建一个 root 容器**，多次调用共享它。

## 同一容器堆叠多个实例

传同一个 `rootId`、不同的 `componentId`，多个实例会共存于同一个 root 里；`reverse` 控制渲染顺序（后调用的排在前面还是后面）：

```tsx
import { portalRenderer } from 'ono-react-element'

const Toast = ({ destroy, text }: { destroy: () => void; text: string }) => (
  <div style={{ padding: 8, background: '#333', color: '#fff' }}>
    {text}
    <button onClick={destroy}>关闭</button>
  </div>
)

function App() {
  return (
    <button
      onClick={() => {
        // 三个实例各自独立，销毁其中一个不影响另外两个
        portalRenderer(Toast, { text: '第一条' }, 'toast-root', 'toast-1')
        portalRenderer(Toast, { text: '第二条' }, 'toast-root', 'toast-2')
        portalRenderer(Toast, { text: '第三条' }, 'toast-root', 'toast-3', true)
      }}
    >
      弹出三条
    </button>
  )
}

export default App;
```

## 指定挂载容器

`getRootParent` 决定 root 挂在哪个节点下（默认 `document.body`）。当页面里有 `Modal`、`Drawer` 这类带高 `z-index`、或处于 top layer 的容器时，把浮层落进它们内部才不会被压住、也才点得动：

```tsx
import { portalRenderer } from 'ono-react-element'

const Popup = ({ destroy }: { destroy: () => void }) => (
  <div onClick={destroy}>点我关闭</div>
)

function App() {
  return (
    <button
      onClick={() =>
        portalRenderer(
          Popup,
          {},
          'inner-popup',
          undefined,
          false,
          () => document.querySelector('.my-modal') ?? document.body
        )
      }
    >
      在弹窗内部打开
    </button>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
Component|要渲染的组件，调用时会收到一个 <code>destroy</code> 属性|<code>(props: T) =&gt; ReactElement</code>|-|是
props|传给组件的属性（不含 <code>destroy</code>）|<code>Omit&lt;T, 'destroy'&gt;</code>|-|是
rootId|root 容器的 id，同一个 id 复用同一个 root|<code>string</code>|随机生成|否
componentId|实例 id（同一 root 内的 key）|<code>string</code>|随机生成|否
reverse|是否倒序渲染|<code>boolean</code>|<code>false</code>|否
getRootParent|root 挂载到哪个父节点下|<code>() =&gt; Element \| DocumentFragment</code>|<code>document.body</code>|否

**返回值**即该实例的销毁函数，与组件内部收到的 `destroy` 是**同一个引用**：

返回值|说明
:- | :-
<code>(onDestroy?: () =&gt; void) =&gt; void</code>|销毁这个实例；<code>onDestroy</code> 会在卸载前同步执行

### PortalComponentProps

组件通过 props 收到的能力：

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
destroy|销毁当前实例|<code>(onDestroy?: () =&gt; void) =&gt; void</code>|-|是

## 注意事项

- **同一个 `rootId` + 同一个 `componentId` 再次调用**：`props` 浅比较相等时不会重新渲染；不相等时会用新 `props` 覆盖渲染，可以当成「更新」用。
- `destroy` 是**幂等**的：root 已卸载后再调用直接返回，不会报错。
- 一个 root 下的实例**全部销毁后，整个 root 容器会连同卸载并移除** —— 所以 `rootId` 相同的多次调用是「共享生命周期」的。
- `destroy(onDestroy)` 里的回调在**组件卸载之前**执行，适合放收尾逻辑（清理定时器、上报等）。
- 若缓存的 root 已经**脱离文档**（例如它挂在某个被关闭的弹窗容器里），下一次调用会丢弃缓存、重建 root —— 否则新浮层会渲染进一个不在文档里的节点，表现为「完全不显示」。
- `getRootParent` 返回 `ShadowRoot` 这类 `DocumentFragment` 也可以：内部不依赖 `document.getElementById`（它穿不透 shadow root）。
- 服务端（无 `document`）环境下直接返回一个空函数，不做任何事。
