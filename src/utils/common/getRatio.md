# getRatio

把两个数字化简为最简整数比，返回 `'16:9'` 这样的字符串。

## 基础用法

```ts
const a = 10
const b = 20

getRatio(a, b) // '1:2'
```

常见于按宽高比设置容器：

```ts
const ratio = getRatio(width, height) // '16:9'
container.style.aspectRatio = ratio
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
num1|第一个数（分子）|<code>number</code>|-|是
num2|第二个数（分母）|<code>number</code>|-|是

## 注意事项

- 内部用 `gcd` 约分，并各自取 `Math.floor`，所以小数结果会被向下取整：`getRatio(1.6, 0.9)` 返回 `'1:0'`。
- 返回值是字符串，可以直接赋值给 CSS 的 `aspect-ratio`。
