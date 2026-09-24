# isPromise

判断给定值是否为 Promise（或 thenable）对象。

## 基础用法

```ts
isPromise(Promise.resolve()) // true
isPromise(fetch('/api')) // true

isPromise({ then: () => {} }) // true，thenable 也算
isPromise(async () => {}) // false，这是函数不是 Promise
isPromise(null) // false
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|待检测的值|<code>T</code>|-|是

返回值|<code>boolean</code>
:- | :-

## 注意事项

- 判定条件是「是个对象 + 有 `then` 方法」，所以**自定义的 thenable 也会返回 `true`**，不能拿它当「是不是原生 Promise」的依据。
- 函数返回 `false`，即使它是 `async` 函数（`async` 函数调用后的返回值才是 Promise）。
- 需要注意 `'then' in value` 会**沿原型链查找**，因此类实例上的 `then` 方法也会被认出来。
- 常见用途：在工具函数里判断入参是否要 `await`，而不是直接对结果做 `.then`。
