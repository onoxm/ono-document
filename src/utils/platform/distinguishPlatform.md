# distinguishPlatform

区分当前运行平台（Android / iOS / 其它），并执行对应回调。

## 基础用法

```ts
import { distinguishPlatform } from 'ono-react-element'

distinguishPlatform({
  onAndroid: () => console.log('安卓端'),
  onIOS: () => console.log('iOS 端'),
  onUnknown: () => console.log('其它平台')
})
```

它同时**返回平台标识**，可以当返回值用：

```ts
const platform = distinguishPlatform({
  onAndroid: () => {},
  onIOS: () => {}
}) // 'Android' | 'iOS' | 'Unknown'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onAndroid|检测到 Android 时执行|<code>() =&gt; void</code>|-|是
onIOS|检测到 iOS 时执行|<code>() =&gt; void</code>|-|是
onUnknown|其它平台时执行|<code>() =&gt; void</code>|-|否

返回值|<code>'Android'</code>\|<code>'iOS'</code>\|<code>'Unknown'</code>
:- | :-

## 注意事项

- 判定基于 `navigator.userAgent`：先匹配 `/android/i`，再匹配 `/iPad|iPhone|iPod/`。**检测顺序是 Android 在前**，所以 UA 里同时含有两个关键词时按 Android 处理。
- 桌面端（Windows / macOS）、鸿蒙等都会落到 `'Unknown'` 分支。
- `onUnknown` 是**可选**的，不传就静默跳过。
- 回调是**同步立即执行**的，不是事件订阅：函数一返回，回调就已经跑完了。需要延后执行用 `distinguishPlatformDelay`。
- SSR 环境下会抛错（`navigator` 不存在），只能在浏览器里调用。
- 只区分「系统」，不区分浏览器品牌；要浏览器信息用 `getBrowserInfo`。
