# useEventListener
用于监听事件的Hook。

## 前置条件
下载`useEventListener.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useEventListener';
```

## 基础用法
```tsx
import { useEventListener } from '@/hooks';

function App() {
    useEventListener({
        event: 'click', // 你想要监听的事件类型
        target: document.documentElement, // 你想要监听的目标元素
        handler: (e:Event) => { // 事件触发时执行的回调函数
            console.log('点击事件触发了！');
        },
        deps: [] // 依赖项，当依赖项发生变化时，会重新绑定事件监听
    })
}
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
params|监听参数|<code>EventListenerOptions</code>|-|是

## EventListenerOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
event|你想要监听的事件类型|<code>string</code>|-|是
target|你想要监听的目标元素|<code>Element</code>|<code>window</code>|否
handler|事件触发时执行的回调函数|<code>(e:Event) => void</code>|-|是
deps|依赖项，当依赖项发生变化时，会重新绑定事件监听|<code>any[]</code>|<code>[]</code>|否
