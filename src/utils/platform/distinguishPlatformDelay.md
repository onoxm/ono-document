# distinguishPlatformDelay

延迟执行平台区分。它**返回一个函数**，调用返回的函数才会在延时后触发判断。

## 基础用法

```ts
import { distinguishPlatformDelay } from 'ono-react-element'

// 第一步：生成触发器
const run = distinguishPlatformDelay({
  onAndroid: () => console.log('安卓端'),
  onIOS: () => console.log('iOS 端'),
  timeout: 500
})

// 第二步：在需要的时候触发（500ms 后才会执行回调）
run()
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onAndroid|检测到 Android 时执行|<code>() =&gt; void</code>|-|是
onIOS|检测到 iOS 时执行|<code>() =&gt; void</code>|-|是
onUnknown|其它平台时执行|<code>() =&gt; void</code>|-|否
timeout|延迟时间（毫秒）|<code>number</code>|<code>500</code>|否

返回值|<code>() =&gt; void</code>（调用它才触发延迟判断）
:- | :-

## 注意事项

- 它是**两段式**的：`distinguishPlatformDelay(...)` 只是准备好触发器，**不会执行任何判断**；必须再调用一次返回的函数。
- `timeout` 是配置项（上面例子里的 `timeout: 500`），而 `distinguishPlatform` 的 `timeout` 是另一个概念，虽然名字一样但别混。
- 每次调用返回的函数都会**新排一个定时器**，连点多次会触发多次回调；需要去重请自己在外部加状态位。
- **没有取消能力**：返回的函数只负责「排一个 `setTimeout`」，不返回定时器 id，也没提供 `clearTimeout` 的途径。组件卸载后定时器仍会执行，回调里如果操作了 DOM，记得先判断元素是否还在。
- 实际判断逻辑完全复用 `distinguishPlatform`，UA 规则与限制见那一篇。
