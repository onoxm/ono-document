# isFunction

判断给定值是否为函数。

## 基础用法

```ts
isFunction(() => {}) // true
isFunction(function () {}) // true
isFunction(class {}) // true

isFunction({}) // false
isFunction('fn') // false
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|待检测的值|<code>any</code>|-|是

返回值|<code>boolean</code>
:- | :-

## 注意事项

- 判定依据是 `typeof value === 'function'`，所以 **class 和 `async` / `generator` 函数都会返回 `true`**，它只回答「能不能调用」，不区分是普通函数还是构造函数。
- 返回 `false` 的典型值：`null`、`undefined`、字符串、数字、对象。
