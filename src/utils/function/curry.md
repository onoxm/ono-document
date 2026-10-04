# curry

把接收多个参数的函数变成逐个接收参数的函数。

## 基础用法

```ts
const add = (a: number, b: number, c: number) => a + b + c

const curriedAdd = curry(add)

curriedAdd(1)(2)(3) // 6
curriedAdd(1, 2)(3) // 6，一次传多个参数也可以
curriedAdd(1)(2) // 还差一个参数，返回函数
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
fn|需要柯里化的函数|<code>(...args: any[]) =&gt; any</code>|-|是
args|预先传入的参数，可省略|<code>...any[]</code>|-|否

## 注意事项

- 分界点用的是 **`fn.length`**，也就是函数「声明」的形参个数。带默认值的参数、剩余参数都不计入 `length`：
  ```ts
  const fn = (a: number, b = 1) => a + b // fn.length === 1
  curry(fn)(1) // 直接返回 2，不会等第二个参数
  ```
- 参数攒够就立即执行，多传的参数会一并交给原函数，不会报错。
- 执行时会把调用处的 `this` 透传给原函数（内部 `fn.apply(this, allArgs)`）。
