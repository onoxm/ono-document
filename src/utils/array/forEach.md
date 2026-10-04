# forEach

遍历数组并对每个元素执行回调，等价于手写的 `for` 循环。

## 基础用法

```ts
forEach([1, 2, 3], (item, index) => {
  console.log(index, item) // 0 1 / 1 2 / 2 3
})
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
arr|待遍历的数组|<code>T[]</code>|-|是
callback|对每个元素执行的回调|<code>(item: T, index: number) =&gt; void</code>|-|是

## 注意事项

- 相比原生 `Array.prototype.forEach`，它是个普通 `for` 循环，**不跳过稀疏数组的空洞**，也不会把数组本身作为第三个参数传进回调。
- 回调里 `return` 只结束当前这一次调用，无法中断遍历；要提前退出请用原生的 `for` / `some` / `every`。
- 没有返回值（`undefined`），别写成 `const list = forEach(...)`。
