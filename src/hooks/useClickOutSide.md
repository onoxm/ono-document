# useClickOutSide
一个用于监听点击外部元素的hooks。

## 基础实用
```tsx
import { useRef } from 'react'
import { useClickOutSide } from 'ono-react-element'

function App() {
    const btnRef = useRef<HTMLButtonElement>(null)

    useClickOutSide(btnRef, () => {
        window.alert('点击外部')
    })

    <div>
        <button ref={btnRef} onClick={() => {
            window.alert('点击我')
        }}>点击我</button>
        <button>点击外部</button>
    </div>
}

```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
outsideElement|你想要监听的元素|<code>RefObject\<HTMLElement \| null></code>\|<code>HTMLElement</code>\|<code>(RefObject\<HTMLElement \| null> \| HTMLElement)[]</code>\|<code>null</code>|-|是
handler|事件触发时执行的回调函数|<code>(e:Event) => void</code>|-|是
options|监听参数|<code>OutsideOptions</code>|-|否

### ClickEventTypes
 - click
 - contextmenu
 - mousedown
 - mouseup
 - mousemove
 - touchstart
 - touchend

### OutsideOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
event|你想要监听的事件类型|<code>ClickEventTypes</code>\|<code>ClickEventTypes[]</code>|-|否
deps|依赖项，当依赖项发生变化时，会重新绑定事件监听|<code>any[]</code>|<code>[]</code>|否