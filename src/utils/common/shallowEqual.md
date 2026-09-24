# shallowEqual

浅比较两个值是否相等。

## 基础用法

```ts
shallowEqual(1, 1) // true
shallowEqual({ a: 1 }, { a: 1 }) // true
shallowEqual([1, 2], [1, 2]) // true
shallowEqual([1, 2], [2, 1]) // false
```

常用于判断 props 是否变化，避免不必要的更新：

```ts
shallowEqual(prevProps.data, nextProps.data) // false 时才需要重新渲染
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
objA|第一个值|<code>unknown</code>|-|是
objB|第二个值|<code>unknown</code>|-|是

返回值|<code>boolean</code>
:- | :-

## 注意事项

- **只比较一层**。嵌套对象按引用比较，内容一样也会判为不等：
  ```ts
  shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }) // false
  ```
  需要递归比较请用 `deepCopy` + 序列化，或专门的深比较实现。
- 两个数组会比较长度和每一项；数组与对象之间不会互相判定为相等。
- 两个 `null` 返回 `true`（走的是 `===` 分支）；`null` 与非对象比较时返回 `false`。
- 用的是 `===` 比较值，所以 `NaN` 与 `NaN` 判为不等，`+0` 与 `-0` 判为相等。
