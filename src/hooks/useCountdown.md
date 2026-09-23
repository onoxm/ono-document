# useCountdown
一个用于倒计时的 Hook，返回剩余秒数以及开始、重置的方法。

## 基础用法
```tsx
import { useCountdown } from 'ono-react-element'

function App() {
  const [remainingTime, startCountdown, resetCountdown] = useCountdown(60, () =>
    console.log('倒计时结束')
  )

  return (
    <div>
      <p>{remainingTime}s</p>
      <button onClick={startCountdown}>开始倒计时</button>
      <button onClick={resetCountdown}>重置倒计时</button>
    </div>
  )
}

export default App;
```

## 返回值
返回值是一个只读三元组，按顺序解构即可。

参数|说明|类型
:- | :- | :-
remainingTime|剩余秒数|<code>number</code>
startCountdown|开始倒计时，调用后每秒递减|<code>() => void</code>
resetCountdown|停止并重置为初始值，同时触发 <code>onFinish</code>|<code>() => void</code>

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
initialTime|起始时间（单位：秒）|<code>number</code>|<code>60</code>|否
onFinish|倒计时结束或重置时的回调函数|<code>() => void</code>|-|否

## 注意事项
- 归零后**不会停住**：组件会自动重置回 `initialTime` 并调用 `onFinish`，所以 `remainingTime` 会从 0 跳回初始值。
- 手动调用 `resetCountdown` 同样会触发 `onFinish`，如果只希望在自然结束时执行逻辑，需要在回调里自行区分。
- 组件卸载或调用 `resetCountdown` 时会清掉定时器；倒计时进行中再次调用 `startCountdown` 不会重置时间，只是把状态置为进行中。
- 中途修改 `initialTime` 不会影响当前正在走的倒计时，只影响下一次重置后的起始值。
