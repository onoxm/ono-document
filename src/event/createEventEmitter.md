# createEventEmitter
创建一个事件发射器，用于在互不相识的模块之间收发事件。

## 基础用法
用「事件名 → 参数元组」的映射创建，`emit` 与 `on` 的参数类型都会自动推断。
```ts
import { createEventEmitter } from 'ono-react-element'

export default createEventEmitter({
  'API:LOGIN': {} as [username: string, password: string],
  'API:LOGOUT': {} as []
})
```

```ts
import event from './event'

// 订阅：回调参数会自动推断为 (username, password)
const off = event.on('API:LOGIN', (username, password) => {
  console.log(username, password)
})

event.emit('API:LOGIN', 'admin', '123456')

off() // 取消本次订阅
```

## 事件名数组
不需要类型推断时，也可以直接传事件名数组（回调参数为 `any[]`）。
```ts
import { createEventEmitter } from 'ono-react-element'

export default createEventEmitter(['API:LOGIN', 'API:LOGOUT'] as const)
```

## 只触发一次
`once` 订阅的回调在首次触发后会自动移除。
```ts
import event from './event'

event.once('API:LOGIN', username => console.log('只提示一次：', username))
```

## 全局单例
第二个参数传 `true` 时返回全局共享的同一个实例，适合在多个模块间复用同一套事件。
```ts
import { createEventEmitter } from 'ono-react-element'

export default createEventEmitter(['API:LOGIN', 'API:LOGOUT'] as const, true)
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
eventMap|<code>{ '事件名': 参数元组 }</code> 形式的映射，用于推断事件参数类型|<code>Record\<string, unknown[]></code>|-|是（与 <code>eventNames</code> 二选一）
eventNames|事件名数组（弱类型写法），回调参数为 <code>any[]</code>|<code>string[]</code>\|<code>readonly string[]</code>|-|是（与 <code>eventMap</code> 二选一）
isGlobal|是否返回全局单例|<code>boolean</code>|<code>false</code>|否

### 实例方法
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
on|订阅事件，返回取消订阅的函数|<code>(eventName, callback) => () => void</code>|-|是
once|订阅事件，仅在首次触发时执行，返回取消订阅的函数|<code>(eventName, callback) => () => void</code>|-|是
off|移除指定事件的某个回调|<code>(eventName, callback) => void</code>|-|是
emit|触发事件并传入参数|<code>(eventName, ...args) => void</code>|-|是
clear|清空事件，不传事件名时清空全部|<code>(eventName?) => void</code>|-|是

## 注意事项
- `emit` 一个**从未声明过**的事件名会直接抛错 `Event xxx does not exist`；而声明过的事件名即使暂时没有订阅者也不会报错。
- `isGlobal` 为 `true` 时返回的是全局单例：**只有第一次创建时传入的事件名会被注册**，后续用不同事件名列表再调用返回的仍是同一个实例，新的名字不会进入初始化列表（此时 `on` 仍可懒注册，但 `emit` 前必须先有 `on`）。
- `on` / `once` 返回的函数就是取消订阅的入口，在 React 里可直接作为 `useEffect` 的清理函数返回。
- 同一个回调重复 `on` 不会重复注册（内部用 `Set` 存储），`off` 一次即可移除。
