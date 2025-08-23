# useCountdown
一个专门处理数组数据的 React Hooks。

## 基础实用
```tsx
import { useCountdown } from 'ono-react-element'

function App() {
    const [remainingTime, startCountdown, resetCountdown] = useCountdown();

    <div>
        <p>{remainingTime}s</p>
        <button onClick={startCountdown}>开始倒计时</button>
        <button onClick={resetCountdown}>重置倒计时</button>
    </div>
}

```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
initialTime|起始时间(单位：秒)|<code>number</code>|60|否
onFinish|倒计时结束回调函数|<code>() => void</code>|-|否
