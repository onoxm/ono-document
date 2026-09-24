# hasDuplicates

判断数组中是否存在重复元素。

## 基础用法

```ts
hasDuplicates([1, 2, 3, 4, 5]) // false
hasDuplicates([1, 2, 3, 4, 5, '1']) // false
hasDuplicates(['1', '2', '3', '4', '5', '1']) // true
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
arr|待检测的数组|<code>Array&lt;unknown&gt;</code>|-|是

## 注意事项

- 判定基于 `Set`，即 **SameValueZero** 比较：数字 `1` 和字符串 `'1'` 不算重复，`NaN` 与 `NaN` 算重复。
- 一旦发现重复立即返回，不会遍历完整个数组。
