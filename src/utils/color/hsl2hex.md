# hsl2hex

把 `hsl` 颜色转换为十六进制，内部先转 `rgb` 再转 `hex`。

## 基础用法

```ts
hsl2hex('hsl(0, 100%, 50%)') // '#ff0000'
hsl2hex('hsl(0, 0%, 100%)') // '#ffffff'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
hsl|`hsl(...)` 颜色字符串|<code>string</code>|-|是

## 注意事项

- 等价于 `rgb2hex(hsl2rgb(hsl))`，返回的是 6 位不带透明度的十六进制。
- 因为中间经过了 `hsl2rgb` 的取整，往返转换（`hsl` → `hex` → `hsl`）不保证能还原成完全一样的数值。
