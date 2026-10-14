# EventEmitter

事件发射器的**类形式**：与 `createEventEmitter` 用的是同一套实现，实例方法完全相同，区别只在构造参数怎么传。

## 基础用法

第一个参数是**事件名数组**（不是映射对象），回调参数的类型由类型参数 `M` 描述：

```ts
import { EventEmitter } from 'ono-react-element'

const bus = new EventEmitter<{
  LOGIN: [username: string, password: string]
}>(['LOGIN'])

const off = bus.on('LOGIN', (username, password) => {
  console.log(`${username} 已登录`)
})

bus.emit('LOGIN', 'admin', '123456')

off() // 取消本次订阅
```

## 与 createEventEmitter 的差异

同一个发射器有工厂函数与类两个入口，选哪个只影响**怎么声明事件名与参数类型**：

```ts
import { createEventEmitter, EventEmitter } from 'ono-react-element'

// 工厂函数：收「事件名 → 参数元组」的映射，事件名与参数类型都能被推断出来
const a = createEventEmitter({
  LOGIN: {} as [username: string, password: string]
})

// 类：收事件名数组，参数类型只能写在泛型 M 上
const b = new EventEmitter<{ LOGIN: [username: string, password: string] }>([
  'LOGIN'
])
```

1. **参数形态**：工厂函数收映射对象（`{} as [元组]` 写法），类收事件名字符串数组。
2. **类型来源**：工厂函数从映射对象里**推断**事件名和参数类型；类的参数类型只能手写在 `M` 上。
3. **单例**：类形式**没有**单例选项，全局单例只由 `createEventEmitter(映射, true)` 提供。

## 不传泛型

`M` 不传时回落为 `Record<string, any[]>`，即弱类型：

```ts
import { EventEmitter } from 'ono-react-element'

const bus = new EventEmitter(['API:LOGIN', 'API:LOGOUT'])

bus.on('API:LOGIN', (...args) => {
  console.log('登录事件', args)
})

bus.emit('API:LOGIN', 'admin', '123456')
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
eventNames|合法事件名列表，只有列在这里的名字才能直接 <code>emit</code>|<code>string[]</code>|-|是

### 类型参数 M

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
M|描述每个事件名对应的回调参数元组，如 <code>{ LOGIN: [string, string] }</code>|<code>Record&lt;string, unknown[]></code>|<code>Record&lt;string, any[]></code>|否

### 实例方法

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
on|订阅事件，返回取消订阅的函数|<code>(eventName, callback) => () => void</code>|-|是
once|订阅事件，仅在首次触发时执行，返回取消订阅的函数|<code>(eventName, callback) => () => void</code>|-|是
off|移除指定事件的某个回调|<code>(eventName, callback) => void</code>|-|是
emit|触发事件并传入参数|<code>(eventName, ...args) => void</code>|-|是
clear|清空事件，不传事件名时清空全部|<code>(eventName?) => void</code>|-|是

## 注意事项

- **泛型 `M` 不会创建运行时事件条目**：只把名字写进 `M`、却不放进构造参数数组的话，直接 `emit` 依然会抛 `Event xxx does not exist` —— 运行时只认构造参数数组，以及被 `on` / `once` 登记过的名字。
- `on` / `once` 会把**未知事件名**自动登记进内部表，所以名字没写进 `eventNames` 时，「先 `on` 再 `emit`」是可行的，反过来直接 `emit` 会抛错。
- `clear` 只清空回调、不删除事件名条目，`clear()` 之后再 `emit` 同名事件不会抛错。
- 同一个回调重复 `on` 不会重复注册（内部用 `Set` 存储），`off` 一次即可移除；`emit` 按订阅的先后顺序调用。
- 类形式**不参与全局单例**：每次 `new` 都得到新实例；需要跨模块共享同一个实例时，用工厂函数的 `isGlobal` 参数（见 [createEventEmitter](/event/createEventEmitter)）。
