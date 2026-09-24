# localFormat

把时间戳格式化为本地化文案（中文 / 英文），年月日会转成可读文字。

## 基础用法

```ts
const timestamp = 1790231405

localFormat(timestamp) // '二零二六-九月-二十四日 14:30:05'
localFormat(timestamp, 'YY-MM-DD hh:mm:ss', 'en') // '2026-Sept-24th 14:30:05'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
number|时间戳，秒级或毫秒级|<code>number</code>|-|是
format|格式字符串|<code>string</code>|<code>'YY-MM-DD hh:mm:ss'</code>|否
language|语言|<code>LanguageType</code>|<code>'cn'</code>|否

### LanguageType

类型值|年份|月份|日期
:- | :- | :- | :-
<code>cn</code>|<code>二零二六</code>|<code>九月</code>|<code>二十四日</code>
<code>en</code>|<code>2026</code>|<code>Sept</code>|<code>24th</code>

本地化后的占位符仍支持 `YY`、`MM`、`DD`、`hh`、`mm`、`ss`。

## 注意事项

- ⚠️ **年份占位符只能写 `YY`，不要写 `YYYY`**。替换是按 `'YY'` 做的，写 `'YYYY'` 会只替换掉前两个字符，得到 `'二零二六YY'` 这样的残留：
  ```ts
  localFormat(timestamp, 'YYYY-MM-DD', 'cn') // '二零二六YY-九月-二十四日'
  ```
- ⚠️ **中英文格式串别照着公历习惯加「年/月/日」后缀**，因为本地化结果本身已经带了这些字：
  ```ts
  localFormat(timestamp, 'YY年MM月DD日', 'cn')
  // '二零二六年九月月二十四日日'，多了「月」和「日」
  ```
  中文场景直接用默认的 `YY-MM-DD hh:mm:ss` 或 `YY/MM/DD` 即可。
- 英文月份缩写里九月是 **`Sept`**（四个字母），不是 `Sep`；序数词只覆盖了 `1st / 2nd / 3rd` 及 `21 / 22 / 23 / 31`，其余统一加 `th`（如 `11th`、`12th`、`13th`）。
- 时间戳的位数推断规则与 `formatTime` 一致，短数字会被补零成 13 位而不是报错。
