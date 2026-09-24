# formatTime

把时间戳按指定占位符格式化为日期时间字符串。

## 基础用法

```ts
const timestamp = 1790231405 // 秒级时间戳

formatTime(timestamp) // '2026-09-24 14:30:05'
formatTime(timestamp, 'YYYY/MM/DD') // '2026/09/24'
formatTime(timestamp, 'MM-DD hh:mm') // '09-24 14:30'
```

毫秒级时间戳同样可以，内部会自动归一化：

```ts
formatTime(1790231405000) // '2026-09-24 14:30:05'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
number|时间戳，秒级或毫秒级|<code>number</code>|-|是
format|格式字符串|<code>string</code>|<code>'YYYY-MM-DD hh:mm:ss'</code>|否

### 支持的占位符

占位符|含义|示例
:- | :- | :-
<code>YYYY</code>|四位年份|<code>2026</code>
<code>MM</code>|月份（补零）|<code>09</code>
<code>DD</code>|日期（补零）|<code>24</code>
<code>hh</code>|小时（补零，24 小时制）|<code>14</code>
<code>mm</code>|分钟（补零）|<code>30</code>
<code>ss</code>|秒（补零）|<code>05</code>

## 注意事项

- 占位符是**逐个 `replace` 第一个匹配**，不是全局替换。同一个占位符在 `format` 里出现两次，只有第一个会被替换。
- 注意大小写约定与常见库的差异：**`MM` 是月份、`mm` 是分钟**，`hh` 是 24 小时制（不是 12 小时制）。
- 时间戳**按数字位数**推断单位（见 `convertTimestamp`）：位数 > 13 截前 13 位，等于 10 按秒处理，10 - 13 位之间在末尾补零。所以像 `123456` 这种短数字会被当成一个很远的日期（补零成 13 位），不会报错。
- 返回值是**本地时区**的时间，不是 UTC。
