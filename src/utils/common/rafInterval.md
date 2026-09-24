# rafInterval

基于 `requestAnimationFrame` 的定时循环，相当于「跟着浏览器重绘走的 setInterval」。

## 基础用法

```ts
const stop = rafInterval(() => {
  console.log('每隔约 200ms 执行一次')
}, 200)

// 需要停止时
stop()
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
callback|每次触发执行的回调|<code>() =&gt; void</code>|-|是
delay|触发间隔（毫秒）|<code>number</code>|-|是

返回值|<code>() =&gt; void</code>（调用它可停止循环）
:- | :-

## 注意事项

- **必须接收返回值才能停止**，没有返回值就没法中断，回调会一直跑下去。
- 内部用 `rafTimeout` 串联实现，每次回调结束后才安排下一次，所以实际间隔是「上一帧结束后 + `delay`」，会比 `delay` 略长，且受 `delay` 与屏幕刷新率的配合影响。
- 页面切到后台时会暂停，回到前台后继续，不会把后台期间的次数补上。
- 适合驱动动画帧更新；对时间精度要求高的定时任务用 `setInterval`。
