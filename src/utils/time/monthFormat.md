# monthFormat

把月份数字格式化成指定语言的可读字符串。

## 基础用法

```ts
monthFormat('01', 'en') // 'Jan'
monthFormat('09', 'en') // 'Sept'
monthFormat('12', 'cn') // '十二月'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
month|月份数字字符串，取 <code>'01'</code> ~ <code>'12'</code>|<code>string</code>|-|是
language|目标语言，<code>'en'</code> 为英文、<code>'cn'</code> 为中文|<code>LanguageType</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- ⚠️ **英文九月返回 `'Sept'`（四个字母）而不是 `'Sep'`** —— 与常见的三字母缩写约定不同，若你在别处按 `'Sep'` 做字符串匹配会对不上。
- 内部用 `Number(month) - 1` 取数组下标，传入 `'00'`、`'13'` 等越界值会返回 **`undefined`**（不报错），直接拼接会在页面上出现字面的 `undefined`。
- 英文月份缩写不走国际化库，是硬编码的数组，`'Mar'`/`'May'` 等与直觉一致，唯独九月那项要留意。
- 它是 `localFormat` 的内部辅助函数，日常格式化日期时间更推荐直接用 `localFormat`。
