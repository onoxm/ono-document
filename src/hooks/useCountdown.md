# useCountdown
一个专门处理数组数据的 React Hooks。

## 前置条件
下载`useCountdown.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useCountdown';
```

## 基础实用
```tsx
import { useCountdown } from '@/hooks'

function App() {
    const [time, startCountdown, resetCountdown] = useCountdown();

    <div>
        <p>{time}s</p>
        <button onClick={startCountdown}>开始倒计时</button>
        <button onClick={resetCountdown}>重置倒计时</button>
    </div>
}

```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
startTime|起始时间(单位：秒)|<code>number</code>|60|否
onFinish|倒计时结束回调函数|<code>() => void</code>|-|否
