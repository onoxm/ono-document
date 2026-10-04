# rafTimeout

基于 `requestAnimationFrame` 的延时执行，相当于「跟着浏览器重绘走的 setTimeout」。

## 基础用法

```ts
const cancel = rafTimeout(() => {
  console.log('300ms 后执行')
}, 300)

// 需要提前取消时
cancel()
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
callback|延时结束后执行的回调|<code>() =&gt; void</code>|-|是
delay|延时时间（毫秒）|<code>number</code>|-|是

返回值|<code>() =&gt; void</code>（调用它可取消）
:- | :-

## 注意事项

- **必须接收返回值才能取消**。不接返回值的话回调一旦排上就会执行，没有别的方式中断。
- 计时基于 raf 的时间戳，页面切到后台时 raf 暂停，**回调会被推迟到页面回到前台之后**（这正是它相对 `setTimeout` 的取舍：动画友好、但后台不按时）。需要「不管前后台都要准时」的场景请用 `setTimeout`。
- 实际触发时刻会对齐到下一次重绘，所以真实延时是「不小于 `delay` 的某一帧」，不是精确的 `delay`。
