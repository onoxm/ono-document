# resourcesPath

把相对路径解析成基于**当前模块位置**的绝对 URL。

## 基础用法

```ts
resourcesPath('./assets/logo.png') // 'https://.../assets/logo.png'
```

常用于库内部引用随包一起发布的静态资源（字体、图标、默认占位图）：

```ts
import { resourcesPath } from 'ono-react-element'

const defaultAvatar = resourcesPath('./static/avatar.png')
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
path|相对路径|<code>string</code>|-|是

返回值|<code>string</code>（绝对 URL）
:- | :-

## 注意事项

- ⚠️ 基准是 **`import.meta.url`，也就是本模块（库）自身的位置，不是调用方页面的位置**。它适合解析「跟库一起发布的资源」；要引用用户项目 `public/` 下的文件，请直接用以 `/` 开头的根路径或完整 URL。
- 依赖 `import.meta.url`，**只在 ESM 构建产物下成立**。若最终被打成 CJS，`import.meta` 不可用，这里会报错或得到错误结果 —— 消费方的打包器需要保留 ESM 语义。
- 传已经是绝对 URL、`data:` / `blob:` 的地址时，`new URL(path, base)` 会**原样返回**，不会被拼接。
- 传以 `/` 开头的路径会按 URL 规则解析到**域名根**，而不是模块所在目录。
