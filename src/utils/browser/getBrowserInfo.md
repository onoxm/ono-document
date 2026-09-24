# getBrowserInfo

解析 `userAgent`，得到浏览器名称、主版本号与是否移动端。

## 基础用法

```ts
const info = getBrowserInfo()

console.log(info)
// { name: 'Chrome', version: '131', isMobile: false }
```

按浏览器做差异化处理：

```tsx
import { getBrowserInfo } from 'ono-react-element'

function App() {
  const { name } = getBrowserInfo()

  return <div>{name === 'Safari' ? '提示：Safari 请手动允许自动播放' : '播放中'}</div>
}

export default App;
```

## API

返回值|<code>BrowserInfo</code>
:- | :-

### BrowserInfo

字段|说明|类型
:- | :- | :-
name|浏览器名称，识别不出时为 <code>'Unknown'</code>|<code>string</code>
version|主版本号字符串，识别不出时为 <code>'Unknown'</code>|<code>string</code>
isMobile|是否移动端，直接复用 <code>isMobile</code> 常量|<code>boolean</code>

## 注意事项

- **现代 Edge 识别不出来，会被报成 `Chrome`**。判定顺序是 Chrome → Firefox → Safari → Edge，而 Chromium 版 Edge 的 UA 里同时含有 `Chrome/xx`，会先命中 Chrome 分支；而且现在 Edge 的标识是 `Edg/xx`，源码里匹配的却是旧的 `Edge/(\d+)`，即便顺序调对也匹配不上。
- Chrome 系的一众浏览器（国内常见的内核套壳浏览器、Opera、Brave）也会统一报成 `Chrome`，它识别的是**内核**而不是品牌。
- Safari 分支要求 UA 里同时有 `Safari/` 和 `Version/`，这是正常的 Safari 写法；但 iOS 上的 Chrome / Firefox 也是 Safari 内核，会落到 Safari 分支。
- 只取**主版本号**（`\d+`），拿不到 `131.0.6778.86` 这样的完整版本。
- 依赖 `navigator.userAgent`，SSR 环境下会抛错；且 UA 可以被客户端伪造，不要拿它做安全判断。
- 返回值里的 `isMobile` 来自模块常量，移动端的判定规则见 `isMobile`。
