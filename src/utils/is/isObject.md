# isObject

判断给定值是否为普通对象（Plain Object）。

## 基础用法

```ts
isObject({}) // true
isObject({ a: 1 }) // true
isObject(Object.create(null)) // true

isObject([]) // false
isObject(new Date()) // false
isObject(null) // false
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|待检测的值|<code>unknown</code>|-|是

返回值|<code>boolean</code>
:- | :-

## 注意事项

- 判断依据是 `Object.prototype.toString.call(value) === '[object Object]'`，所以**数组、`Date`、`RegExp`、`Map`、`Set`、类实例都会返回 `false`**。
- `null` 返回 `false`（不会抛错）。
- 和 `typeof value === 'object'` 的区别就在这：后者对数组和 `null` 都会返回 `true`，做属性遍历前用它更安全。
