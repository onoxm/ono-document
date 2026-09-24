# adjustingColors

在 HSL 空间里调整亮度（L 分量），返回十六进制颜色。

## 基础用法

```ts
adjustingColors('#ff0000', 'light', 20) // '#ff6666'
adjustingColors('#ff0000', 'dark', 20) // '#990000'
adjustingColors('rgb(255, 0, 0)', 'dark', 10) // '#cc0000'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
clr|颜色值，支持 hex / rgb / hsl|<code>string</code>|-|是
type|调整方向|<code>'light'</code>\|<code>'dark'</code>|-|是
percentage|亮度调整的百分比（0 - 100）|<code>number</code>|-|是

## 注意事项

- 与 `adjustColor` 不同，这里改的是 **HSL 的亮度**，色相和饱和度保持不变，观感上更接近设计工具里的「调亮 / 调暗」。
- 亮度会被夹在 `0 - 100`：加超了取 100，减到负值取 0。
- 颜色格式无法识别时**抛错**（`Error: 颜色格式错误`），是靠入参里是否含 `#` / `rgb` / `hsl` 判断的，传入 CSS 颜色关键字（如 `red`）会直接抛错。
- 无论输入是什么格式，返回值都是十六进制。
