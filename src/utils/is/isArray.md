# isArray

判断给定值是否为数组。

## 基础用法

```ts
isArray([1, 2, 3]) // true
isArray([]) // true

isArray('abc') // false
isArray({ length: 1 }) // false
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|待检测的值|<code>any</code>|-|是

返回值|<code>boolean</code>
:- | :-

## 注意事项

- 内部就是 `Array.isArray`，能正确处理跨 iframe / 跨 Realm 的数组（`instanceof Array` 做不到这点）。
- 类数组对象（`arguments`、`NodeList`、`{ length: 1 }`）都会返回 `false`。
