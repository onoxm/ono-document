# quickSort

快速排序，返回一个排序后的**新数组**。

## 基础用法

```ts
const arr = [5, 4, 3, 2, 1]
const arr2 = [8, 6, 3, 7, 1, 5, 4, 2]

quickSort(arr) // [1, 2, 3, 4, 5]
quickSort(arr2) // [1, 2, 3, 4, 5, 6, 7, 8]
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
arr|待排序的数字数组|<code>number[]</code>|-|是

## 注意事项

- **不修改原数组**：内部先 `[...arr]` 复制一份再原地分区，所以 `quickSort(arr)` 之后 `arr` 顺序不变。
- 需要拿到结果就必须用返回值：`const sorted = quickSort(arr)`。
- 元素少于 2 个时直接返回副本，不做排序。
