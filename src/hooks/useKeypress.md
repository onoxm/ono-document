# useKeyPress
用于监听键盘事件的hooks。

## 基础用法
```tsx
import { useKeyPress } from 'ono-react-element';

function App() {
    useKeyPress(
        'a',
        (e, key) => {
            console.log(e, key)
        }
    )
}
```

## 监听多个按键
```tsx
import { useKeyPress } from 'ono-react-element';

function App() {
    useKeyPress(
        ['a', 'b', 'c'],
        (e, key) => {
            console.log(e, key)
        }
    )
}
```

## 监听组合键
```tsx
import { useKeyPress } from 'ono-react-element';

function App() {
    useKeyPress(
        'Ctrl+a',
        (e, key) => {
            console.log(e, key)
        }
    )
}
```

## 精确匹配
```tsx
import { useKeyPress } from 'ono-react-element';

function App() {
    useKeyPress(
        'CommandOrControl+a', // 如果想兼容Mac，请使用 CommandOrControl
        (e, key) => {
            console.log(e, key)
        }
    )

    useKeyPress(
        'a',
        (e, key) => {
            console.log(e, key)
        },
        { exactMatch: true } // exactMatch为true时，组合键即便有a键也不会触发
    )
}
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
keyFilter|支持 keyCode、别名、组合键、数组、自定义函数|<code>string</code>\|<code>number</code>\|<code>FunctionKey</code>|-|是
eventHandler|事件处理函数|<code>(e: KeyboardEvent, key: string) => void</code>|-|是
options|可选配置项|<code>Options</code>|-|否

### FunctionKey
参数|说明
:- | :- 
Ctrl|控制键
Shift|Shift键
Alt|Alt键
Meta|Meta键
CommandOrControl|Mac下为Command键，Windows下为Control键


### Options
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
event|触发事件类型|<code>keydown</code>\|<code>keyup</code>|keydown|否
target|触发事件的目标元素|<code>Element</code>|document.body|否
deps|依赖项，当依赖项发生变化时，会重新执行监听|<code>DependencyList</code>|-|否
exactMatch|是否精确匹配组合键|<code>boolean</code>|false|否
