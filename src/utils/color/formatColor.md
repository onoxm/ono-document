# formatColor

把 `rgb` 颜色格式化成指定的颜色格式。

## 基础用法

```ts
formatColor('rgb(255, 0, 0)', 0.5, 'hex') // '#ff0000'
formatColor('rgb(255, 0, 0)', 0.5, 'hsl') // 'hsl(0, 100%, 50%)'
formatColor('rgb(255, 0, 0)', 0.5, 'hsv') // 'hsv(0, 100, 100)'
formatColor('rgb(255, 0, 0)', 0.5, 'rgb') // 'rgb(255, 0, 0)'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
rgb|输入的 `rgb(...)` 颜色字符串|<code>string</code>|-|是
a|透明度，**仅在 <code>type</code> 为 <code>rgba</code> 时使用**|<code>number</code>|<code>1</code>|否
type|目标格式|<code>ColorType</code>|<code>'rgba'</code>|否

### ColorType

类型值|说明
:- | :-
<code>rgb</code>|原样返回入参
<code>rgba</code>|返回归一化的 <code>rgba(r, g, b, a)</code>
<code>hex</code>|转成 6 位十六进制
<code>hsl</code>|转成 hsl 字符串
<code>hsv</code>|转成 hsv 字符串

## 注意事项

- 不传 `type` 时默认 `'rgba'`，输出的三通道是 **0 - 1 的归一化值**，不是 0 - 255：
  ```ts
  formatColor('rgb(255, 0, 0)') // 'rgba(1,0,0,1)'
  ```
  这种写法浏览器能解析，但和常见的 `rgba(255, 0, 0, 1)` 不是同一个视觉约定，直接当字符串拼接或做比较时要注意。
- `type` 传 `'rgb'` 或其它未识别的值时，函数**原样返回输入的 `rgb` 字符串**；`a` 只影响 `'rgba'` 分支，转 hex / hsl / hsv 时会被忽略（这几种格式本身也不带透明度）。
- `hsv` 分支的结果不做取整，可能带很长的小数。
