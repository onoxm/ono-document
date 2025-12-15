# useEventListener
用于监听事件的Hook。

## 基础用法
```tsx
import { useEventListener } from 'ono-react-element';

function App() {
    useEventListener(
        'click', // 你想要监听的事件类型
        (e:Event) => { // 事件触发时执行的回调函数
            console.log('点击事件触发了！');
        },
        {
        target: document.documentElement, // 你想要监听的目标元素
        deps: [] // 依赖项，当依赖项发生变化时，会重新绑定事件监听
        }
    )
}
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
event|你想要监听的事件类型|<code>string</code>|-|是
handler|事件触发时执行的回调函数|<code>(e:Event) => void</code>|-|是
options|监听参数|<code>EventListenerOptions</code>|-|否

### EventListenerOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
isDeferred|是否延迟执行回调函数，值为true时会返回一个函数，可供随时调用|<code>boolean</code>|false|否
target|你想要监听的目标元素|<code>Element</code>|<code>window</code>|否
deps|依赖项，当依赖项发生变化时，会重新绑定事件监听|<code>any[]</code>|<code>[]</code>|否
