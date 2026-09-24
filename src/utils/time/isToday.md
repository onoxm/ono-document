# isToday

判断给定的时间戳是否是今天。

## 基础用法

```ts
const timestamp = Math.floor(Date.now() / 1000)

isToday(timestamp) // true
isToday(timestamp - 86400) // false，昨天
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
timestamp|**秒级**时间戳（10 位）|<code>number</code>|-|是

返回值|<code>boolean</code>
:- | :-

## 注意事项

- ⚠️ **只接受秒级时间戳**，内部直接 `timestamp * 1000`。传毫秒级（13 位）会得到一个遥远未来的日期，结果恒为 `false`：
  ```ts
  isToday(Date.now()) // false，传毫秒是错的
  isToday(Math.floor(Date.now() / 1000)) // true
  ```
  这一点与 `formatTime` / `localFormat` 不同 —— 那两个会按位数自动归一化，这个不会，别把两者混用。
- 只比较**年、月、日**，不关心时分秒，所以「今天 00:00」和「今天 23:59」都算今天。
- 用的是本地时区，不是 UTC。
