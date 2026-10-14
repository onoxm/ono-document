# useKeyPress
用于监听键盘事件的 Hook。

## 基础用法
```tsx
import { useKeyPress } from 'ono-react-element'

function App() {
  useKeyPress('a', (e, key) => {
    console.log(key) // 'a'
  })

  return <div>按下 a 键试试</div>
}

export default App;
```

## 监听多个按键
`keyFilter` 传数组时，命中数组里任意一项都会触发。
```tsx
import { useKeyPress } from 'ono-react-element'

function App() {
  useKeyPress(['a', 'b', 'c'], (e, key) => {
    console.log(key)
  })

  return <div>按下 a、b 或 c</div>
}

export default App;
```

## 监听组合键
用 `+` 连接修饰键与主键，修饰键支持 `Ctrl`、`Shift`、`Alt`、`Meta`、`CommandOrControl`。回调拿到的 `key` 是**归一化后的小写过滤键**，不是你传入的原始大小写。
```tsx
import { useKeyPress } from 'ono-react-element'

function App() {
  useKeyPress('CommandOrControl+a', (e, key) => {
    console.log(key) // 'commandorcontrol+a'
  })

  return <div>Windows 下按 Ctrl + A，Mac 下按 Command + A</div>
}

export default App;
```

## 精确匹配
默认模式下，按下的键只要带任意修饰键（`Ctrl` / `Meta` / `Shift` / `Alt`）就不会触发单键过滤。`exactMatch: true` 时改用**全等**比较键名。
```tsx
import { useKeyPress } from 'ono-react-element'

function App() {
  useKeyPress('a', () => console.log('按下了 a'), { exactMatch: true })

  return <div>按下 a</div>
}

export default App;
```

## 指定监听目标
`target` 不传时监听 `window`；传 `ref` 时若元素尚未挂载会回落到 `window`。
```tsx
import { useRef } from 'react'
import { useKeyPress } from 'ono-react-element'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  useKeyPress('enter', () => console.log('在输入框里按下了回车'), {
    target: inputRef
  })

  return <input ref={inputRef} placeholder="在这里按回车" />
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
keyFilter|要监听的键，可是单个键、组合键或数组|<code>KeyType</code>\|<code>KeyType[]</code>|-|是
eventHandler|命中时执行的回调，第二个参数为归一化后的小写过滤键|<code>(event: KeyboardEvent, key: KeyType) => void</code>|-|是
options|可选配置项|<code>Options</code>|-|否

### KeyType
类型值|说明
:- | :-
<code>string</code>|键名，大小写不敏感（内部统一转小写后比较）
<code>number</code>|数字，⚠️ 实际不可用，详见下方注意事项
<code>FunctionKey</code>|修饰键别名

### FunctionKey
类型值|说明
:- | :-
<code>'Ctrl'</code>|控制键
<code>'Shift'</code>|Shift 键
<code>'Alt'</code>|Alt 键
<code>'Meta'</code>|Meta 键
<code>'CommandOrControl'</code>|Mac 下为 Command 键，其他平台为 Control 键

### KeyEvent
类型值|说明
:- | :-
<code>'keydown'</code>|按键按下时触发
<code>'keyup'</code>|按键抬起时触发

### Options
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
events|触发的事件类型，支持传数组|<code>KeyEvent</code>\|<code>KeyEvent[]</code>|<code>'keydown'</code>|否
target|监听的目标，不传或传空引用时回落到 <code>window</code>|<code>EventTarget</code>\|<code>RefObject\<EventTarget \| null></code>\|<code>null</code>|<code>window</code>|否
exactMatch|是否改用全等比较键名|<code>boolean</code>|<code>false</code>|否

## 注意事项
- **默认模式用的是「包含」判断，长键名会被短按键误伤**：内部拿 `过滤键.includes(按下键)` 来判定，所以 `useKeyPress('enter', cb)` 在按下 `e`、`n`、`t`、`r` 时**都会触发**；`useKeyPress('a', cb)` 按 `a` 触发是正常的，但像 `'enter'` 这类多字母键名会连带一串字母。要严格匹配请加 `exactMatch: true`。
- **`number` 类型的 `keyFilter` 不可用**：数字同样被转成字符串参与「包含」比较，`useKeyPress(13, cb)` 按 Enter **不会触发**，反而按 `1` 或 `3`（`'13'` 的子串）会触发；加上 `exactMatch` 后则永远不触发。监听回车请直接写 `'enter'`。
- **数组过滤可能一次按键触发多次**：`['enter', 'escape']` 在按下 `e` 时两项同时命中，回调会被调用两次，带去重的逻辑要自己兜住。
- **`exactMatch: true` 不会拦截修饰键**：该分支只比较键名本身，因此按 `Ctrl + A` 同样会命中 `useKeyPress('a', cb, { exactMatch: true })`。想排除带修饰键的输入，用默认模式反而更严格。
- 组合键需要修饰键与主键同时成立：三键写法（如 `'ctrl+shift+a'`）要求两个修饰键都按下，只按 `Ctrl + A` 不触发。
- 没有 `deps` 参数：`eventHandler` 用 ref 保存，每次渲染都取最新的回调，读到的是最新 state / props。
