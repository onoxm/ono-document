# adjustColor

在 RGB 空间里把颜色调亮或调暗，返回与输入同格式的颜色。

## 基础用法

```ts
adjustColor('#ffffff', 'darken', 20) // '#cccccc'
adjustColor('#000000', 'lighten', 20) // '#333333'
adjustColor('rgb(255, 0, 0)', 'darken', 50) // 'rgb(127.5,0,0)'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
color|颜色值，支持 6 位 hex 或 rgb|<code>string</code>|-|是
type|调整方向|<code>'lighten'</code>\|<code>'darken'</code>|-|是
percent|调整百分比（0 - 100）|<code>number</code>|-|是

## 注意事项

- **不要传 3 位简写 hex**。函数按「前 2 位 R、中间 2 位 G、后 2 位 B」切片解析，`#fff` 这种写法会解析失败并返回 `'#7f.87.8NaN'` 这种无效字符串。传之前先过一遍 `hex3To6`。
- 变亮是「向 255 靠拢」，变暗是「按比例减少」，两者不是互逆运算：`darken 50` 后再 `lighten 50` 回不到原色。
- 返回格式跟随输入：hex 进 hex 出，rgb 进 rgb 出；hex 输出会补齐两位，rgb 输出**不取整**（可能出现 `127.5`）。
- 颜色格式识别不了时原样返回输入值，不会报错。
