# hex3To6

把 3 位简写的十六进制颜色展开成 6 位标准写法。

## 基础用法

```ts
hex3To6('#fff') // '#ffffff'
hex3To6('#0ab') // '#00aabb'
```

常用于把用户随手写的简写色交给只认 6 位的函数（如 `adjustColor`、`hex2rgb`）：

```ts
const safe = color.length === 4 ? hex3To6(color) : color
adjustColor(safe, 'darken', 20)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
hex|3 位简写的十六进制颜色|<code>string</code>|-|是

## 注意事项

- 只按「每位重复一次」拼接，**不做格式校验**：传 6 位进去不会报错，但结果会是错乱的字符串。用它之前先确认入参确实是 3 位。
