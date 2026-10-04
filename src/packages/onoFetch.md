# ono-fetch

零依赖的同构 HTTP 客户端：浏览器与 Node.js 共用一套 API，底层是原生 `fetch`。产物是单文件 ESM，minify 后 5.1 KB / gzip 2.4 KB。

## 安装

::: code-group
```bash [npm]
npm i ono-fetch
```
```bash [yarn]
yarn add ono-fetch
```
```bash [pnpm]
pnpm add ono-fetch
```
```bash [bun]
bun add ono-fetch
```
:::

只发 ESM（`exports` 里没有 `require` 分支），CommonJS 项目请用动态 `import()`。`engines`: Node >= 18。

## 快速上手

```ts
import { createOnoFetch } from 'ono-fetch'

const api = createOnoFetch({
  baseURL: '/api',
  timeout: 10_000,
  headers: { 'client-channel': 'web' }
})

type User = { id: number; name: string }

const { data, status } = await api.get<User>('/users/1')
const created = await api.post<User>('/users', { name: 'ono' })
if (status >= 400) throw new Error('加载失败')
```

`data` 的类型是你声明的，运行时不校验 —— `returnType: 'text'` 配 `api.get<User>` 不会报错，只会给你字符串。

## 两种写法

```ts
api.get(url, options?)                    // 五个语法糖
api.delete(url, options?)
api.post(url, body, options?)             // body 是位置参数
api.put(url, body, options?)
api.patch(url, body, options?)

api(url, options?)                        // 调用式：method / body 都在 options 里
api.buildURL(url, { params }?)            // 只拼 URL，不发请求（同步返回 string）
api.extend(config?)                       // 派生一个新实例，当前实例不受影响
```

- 语法糖的 `options` **不接受** `method` 与 `body` —— 写了直接编译报错，而不是"编译通过、运行时被静默改回"。
- 只有这五个动词有糖，它们代表日常手感，不代表"库支持哪些动词"。其余一律走调用式：

  ```ts
  await api('/users/1', { method: 'DELETE' })
  await api('/probe', { method: 'HEAD' })
  await api('/files/a.txt', { method: 'COPY', body: { dest: '/files/b.txt' } })
  ```

- `method` 接受任意合法 HTTP token（`OnoFetchMethod`），所以私有协议的 `MGET`、WebDAV 的 `PROPFIND` 都能直接写。大小写不敏感：合法方法 token 会在边界统一成大写（`{ method: 'head' }` 等价于 `'HEAD'`），但能不能被对端接受仍由它的方法表决定。
- 代价：`OnoFetchMethod` 含 `string`，拿它做 `switch` 不会有穷举完备性检查。

## 实例配置 `createOnoFetch(config?)`

| 字段               | 默认     | 说明                                                                                                                   |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `baseURL`          | `''`     | 交界处斜杠归一（`'http://a/v1/'` + `'/users'` 不会得到 `//`）；`url` 是绝对地址或协议相对地址（`//h/x`）时跳过 baseURL |
| `timeout`          | `0`      | 毫秒，`0` = 不设超时                                                                                                   |
| `headers`          | —        | 实例级请求头，与请求级按键合并，同名键请求级胜出（大小写不敏感）                                                       |
| `returnType`       | `'json'` | 响应解析方式，请求级可覆盖                                                                                             |
| `paramsSerializer` | —        | 自定义 query 串，请求级可覆盖（见「查询参数」）                                                                        |
| `jsonReviver`      | —        | 透传给 `JSON.parse` 的 reviver，请求级可覆盖                                                                           |
| `maxResponseSize`  | `0`      | 响应体字节上限，`0` = 不限；请求级可覆盖，写 `0` 表示这一条不限                                                        |
| `fetchImpl`        | —        | 自己提供的 transport —— 真正发出请求的那个函数，顶替 `globalThis.fetch`。**只有实例级**（见「换掉底层 transport」）    |
| `onRequest`        | `[]`     | 请求钩子数组，发出前改 `headers` / `body`（见「拦截器」）。**只有实例级**，数组在创建期定死                            |
| `onResponse`       | `[]`     | 响应钩子数组，拿到整个外壳、返回新外壳（拆业务信封挂这一格）。同样只有实例级、创建期定死                               |
| `onError`          | `[]`     | 错误钩子数组，所有 reject 的唯一集中出口 —— 失败上报 / 埋点挂这一格。同样只有实例级、创建期定死                        |

下面「请求 options」里同名的字段都是请求级覆盖：`undefined`（没写）用实例级，其余以请求级为准。`returnType` 是唯一需要留意的 —— 它的 `null` 是合法值（透传原生 `Response`），所以"没写"只由 `undefined` 表示。`onRequest` / `onResponse` / `onError` 不在那张请求级表里，**是刻意的**（理由见「拦截器」）。`fetchImpl` 同样只有实例级：transport 属于实例，不属于某一次调用。

### 派生新实例 `api.extend(config?)`

`extend` 用当前实例**已经定下来的那份配置**造一个全新的完整实例，原实例一个字都不改，两者并存：

```ts
const base = createOnoFetch({ baseURL: '/api', headers: { 'x-app': 'web' } })
const admin = base.extend({ headers: { 'x-app': 'admin' } })

const config = { baseURL: '/api', onRequest: [addToken] }
// 在原有钩子之后多加一个：数组是覆盖，所以完整名单来自你手里那份 config
const traced = createOnoFetch(config).extend({
  onRequest: [...config.onRequest, addTraceId]
})
```

- 没写的字段沿用（`baseURL` 和三格钩子数组都在沿用之列）。写 `undefined` 算"没写"；`null` 与 `0` 算"写了" —— `returnType: null`、`timeout: 0` 会真的把沿用下来的那格顶掉。
- `headers` 是整体替换，不按键合并。库做的合并只有"实例级 与 请求级"那一处，它没有变。
- 三格钩子数组**整体覆盖，不追加**：`onRequest: [a]` 就是派生实例只有这一个钩子。也没有 `api.defaults` 让你把创建期配置读回来 —— 本库不持有任何可变状态，要完整名单请留着自己那份 config。
- 派生出来的就是正常实例：五个动词糖、`buildURL`、以及它自己的 `extend` 都有。

## 请求 options

| 字段               | 说明                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| `params`           | 查询参数（见下），与 `body` 无关                                        |
| `paramsSerializer` | 覆盖实例级的 query 序列化                                               |
| `headers`          | 请求级请求头，`HeadersInit` 三种形式都行（对象 / `Headers` / 二元数组） |
| `timeout`          | 覆盖实例级                                                              |
| `returnType`       | 覆盖实例级                                                              |
| `jsonReviver`      | 覆盖实例级                                                              |
| `maxResponseSize`  | 覆盖实例级                                                              |
| `signal`           | `AbortSignal`（`null` 等同没给）                                        |
| `onProgress`       | 下载进度，`(progress, loaded, total) => void`（见「进度」）             |
| `method` / `body`  | **只有调用式有**这两个字段                                              |

其余字段透传给底层 `fetch()`（`credentials`、`mode`、`cache` 等）。`params` / `paramsSerializer` / `body` / `onProgress` / `jsonReviver` / `maxResponseSize` / `defaultHeaders` / `fetchImpl` 这些自定义字段不会泄漏进 `fetch()` 的参数对象。

## 返回值

```ts
interface OnoFetchReturnData<T = unknown> {
  url: string
  headers: Record<string, string>
  status: number
  statusText: string
  data: T
}
```

- `headers` 是 `Record<string, string>`，键统一小写；值里含冒号（`Date: a: b` 这类）不会整行丢失。
- 无响应体的应答（如 `HEAD`）`data` 一律是 `null`，**跳过** `returnType` 解析。
- **非 2xx 照常 resolve，不抛错。** 本库只在取消 / 超时 / 网络失败 / 响应超限 / `params` 越界时 reject，状态码判断请自己写。这些 reject 正是 `onError` 看到的那些（见下）。
- 装了 `onResponse` 钩子之后，这一整块外壳就是钩子的返回值（见下）。

## 拦截器 `onRequest` / `onResponse` / `onError`

三格都是**实例级数组**，没有请求级 —— 单次请求要特殊处理，调用点本来就能自己算 headers、自己 catch，那不叫新能力。

```ts
const config = {
  baseURL: '/api',
  // 发出前一刻现取 token
  onRequest: [
    async (ctx: OnoFetchRequestContext) => {
      const headers = new Headers(ctx.headers)
      headers.set('authorization', `Bearer ${await getToken()}`)
      return { headers }
    }
  ],
  // 只把业务信封里的 .data 交出去
  onResponse: [
    (res: OnoFetchReturnData) => {
      const body = res.data as { code: number; data: unknown; message: string }
      if (body.code !== 0) throw new Error(body.message)
      return { ...res, data: body.data }
    }
  ],
  // 所有 reject 的同一个出口，不管它从哪个入口发出
  onError: [
    (error: unknown) => {
      reportToSentry(error)
    }
  ]
}

const api = createOnoFetch(config)
// 调用点一行不变，拿到的 data 已经是 User
const { data } = await api.get<User>('/users/1')
```

`onRequest` / `onResponse` 两格的口径一共七条（第三格 `onError` 见下一小节）：

1. **请求钩子收到 `{ method, url, headers, body }`**，`url` 是 baseURL 与 query 都算完之后的最终 URL。它**只能返回 `headers` / `body` 两格**（写 `url` / `params` 是编译错误），返回 `undefined` 等于不改。多个钩子按数组顺序串成链，前一个的产出是后一个的输入。
2. **钩子改不动 `url` 与 `params`。** `params` 的口径归 `paramsSerializer` 管，钩子重做一遍就是第二个真相；而"钩子不碰 URL"正是 `api.buildURL()` 那条*逐字符等于真实请求*的恒等还能成立的前提 —— 它是同步纯函数，跑不了 `await getToken()` 这种异步钩子。
3. **钩子产出的 `headers` 落的是请求级那一格**：同名键照样盖实例级 `config.headers`，两边都没写才由 body 推断补 `content-type`。合并仍然只有引擎里那一处。
4. **换 body 会重算 `content-type`**：钩子把对象换成字符串，发出去的就是 `text/plain`；`GET` / `HEAD` / `DELETE` 丢体的规则也照作用于钩子之后的 body。
5. **响应钩子拿到整个外壳**（`url` / `headers` / `status` / `statusText` / `data`），它返回什么调用方就拿到什么 —— 所以判"HTTP 状态 + 业务 `code`"两件事都够。**必须返回值**：`res => { report(res) }` 这种忘了 `return res` 的写法抛 `OnoFetchError(code: 'UNKNOWN')`，而不是静默交出 `undefined` 外壳。只观察请老实写 `return res`。
6. **钩子自己抛的错原样直通**，不包成 `OnoFetchError`（与 `paramsSerializer` / `jsonReviver` 同一口径）。"业务 `code` 非 0 当失败"就是靠这一格 `throw` 实现的 —— 那是调用方在一处自己定的规则，库依旧不判 HTTP 状态，也没有 `validateStatus` 那个开关（见「已知限制」第 1 条）。
7. **数组在创建期拷贝定死**：之后再往原数组 `push` 不影响已创建的实例。要一份多一个钩子的实例就派生：`api.extend({ onRequest: [...config.onRequest, extra] })`（见上面「派生新实例」）—— 数组是覆盖，所以完整名单得从你传进去的那份 config 拿。

`returnType: null` 的透传模式下 `onResponse` **照样执行**（钩子看到的 `data` 是原生 `Response`）；取消 / 超时 / 网络失败这些 reject 通路不跑 `onResponse` —— 那些不是响应。它们跑的是 `onError`。

**做不了的一件事：重放。** 钩子能看到响应、也能改它，但库不会因为一个钩子再把请求发第二遍，所以"401 → 刷新 token → 重放原请求"仍由调用方自己写（本库不提供 `api.interceptors.response.use()` 那种命令式注册，也没有 `.eject()`；要一份换了钩子集合的配置，请用 `api.extend` 派生一个新实例）。

### 错误钩子 `onError`

这一格的意义是**失败上报能集中在一处**。在调用点包一层 `.catch(report)` 不是同一件事：它只盖得住那一个调用点，而 `onError` 盖住每一个 reject，调用式和五个动词糖都从同一个出口出来。

```ts
const api = createOnoFetch({
  baseURL: '/api',
  onError: [
    async error => {
      await report({ error, when: Date.now() }) // 只观察，什么都不 return
    },
    error =>
      // 把 `TypeError: fetch failed` 翻成这块屏幕能显示的话
      error instanceof TypeError
        ? new Error('网络不可用，请稍后重试')
        : undefined
  ]
})
```

- **每一个 reject 都跑，包括一个字节都没发出去的那些**：`INVALID_QUERY`、`paramsSerializer` 抛错、传入已中止的 `signal`。钩子链挂在请求外面而不是里面，所以"库根本没发出东西"也照样上报得到。
- **它看不到的**：非 2xx（那是 resolve，库不判 HTTP 状态），以及 `onRequest` / `onResponse` 函数体里抛的错。把这两类喂进来就是钩子互相上报对方，而且"请求失败了"和"调用方自己的钩子写崩了"也分不开。有一格是有意留下的例外：响应钩子忘了 `return` 那个 `UNKNOWN` 是库自己判定的，它进得来。
- **收到的就是 promise reject 的那个原值，这里不做任何包装**。也就是说一个参数里同时有三种东西：底层的 `TypeError: fetch failed`、库判定的 `OnoFetchError`（`ABORTED` / `TIMEOUT` / `TOO_LARGE` / `INVALID_QUERY`）、以及你自己那些回调抛的错。**第一种和第三种分不出来**，所以这一格适合*上报*，不适合用来判*要不要重试* —— "断网了"和"你 header 值写错了"在这里长得一模一样。
- **不给上下文**。参数里只有错误本身，没有 `{ method, url }`：本库的错误对象和实例都不带 config，而 reject 那一刻根本没有 status、没有 headers、也没有 `url` 可给。要 URL 请在自己的调用点记。
- **返回 `undefined` 等于不改**（与 `onResponse` 那条"必须返回值"是相反的口径，因为观察失败正是这一格的主用途，而观察成功不是）。其余任何返回值都成为新的 rejection 值，并作为数组里后一个钩子的入参 —— 所以把 `fetch failed` 换成项目自己的错误类就是一个钩子的事。
- **不能把 reject 恢复成 resolve。** 那一刻没有外壳可合成，"吞掉错误返回一个默认值"仍然是调用点 `try/catch` 的活。
- **`onError` 自己抛错，会盖掉它正要上报的那个错**（与其他回调的直通口径一致）。上报逻辑请自己包 `try/catch`。

## 响应解析 `returnType`

| 值               | `data`                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `'json'`（默认） | `JSON.parse` 的结果；解析失败时原样返回文本，不抛。可写 `jsonReviver` 参与解析（见下）                                   |
| `'text'`         | 字符串                                                                                                                   |
| `'blob'`         | `Blob`，`type` 取响应的 content-type                                                                                     |
| `'arrayBuffer'`  | `ArrayBuffer`                                                                                                            |
| `'formData'`     | `FormData`，按响应 content-type 解析；响应不是 `multipart/form-data` / `application/x-www-form-urlencoded` 时 **reject** |
| `null`           | 不解析 —— `data` 就是 `fetch()` 给的原生 `Response`，body 一个字节都没读（见下）                                         |

### `jsonReviver` · 参与 JSON.parse

```ts
api.get('/orders', {
  jsonReviver: (key, value) =>
    key === 'createdAt' && typeof value === 'string' ? new Date(value) : value
})
```

- 只在 `returnType: 'json'` 生效；实例级与请求级各一份，请求级覆盖实例级。
- **reviver 自己抛错时 promise 会 reject，抛的就是你那个原始错误**，不会被"非法 JSON 回退成文本"吞掉。
- 响应本身不是合法 JSON 时 reviver 一次都不会被调用（语法先于 reviver），回退成文本的口径照常。
- 已知做不到的一件事：后端把 `Long` 直接写成 JSON number 时 reviver 救不回来 —— `JSON.parse` 交给 reviver 的已经是丢精度的 `double`（`1234567890123456789` → `1234567890123456800`）。这类需求要在调用方拿 `returnType: 'text'` 后自己处理，或者让后端发字符串。

注意 `blob.type`：`Blob` 规范会把 `type` 整体 ASCII 小写，multipart 的 `boundary` 参数值因此会变形。要自己切 multipart，请用 `headers['content-type']`，别用 `blob.type`。

### `returnType: null` · 透传原生 Response

想自己消费响应体（流式读、自定义解析、`pipe`）时传 `null`：

```ts
const { data: rep } = await api.get<Response>('/stream', { returnType: null })
if (rep.body) {
  for await (const chunk of rep.body) {
    // ...
  }
}
```

- 返回值外壳不变：`url` / `headers` / `status` / `statusText` 照给，非 2xx 依旧 resolve；变的只有 `data`。
- 为什么是 `null` 不是 `undefined`：不写 `returnType` 已经是"默认 `'json'`"的语义，而 `undefined` 与"没写"在运行时是同一个东西。
- 这一模式下 `timeout` 到响应头就完成使命 —— 库根本不读 body，也就不替它计时；resolve 之后 `signal` 仍连着这个响应 —— 和把 signal 直接交给 `fetch()` 同语义，`abort()` 会打断你后续的 `rep.json()` / body 读取。
- `onProgress` 与 `maxResponseSize` 在此模式下都不生效 —— 库根本不碰 body，既无从计量，也不该替你决定读多少。

## 查询参数 `params`

```ts
api.get('/search', {
  params: { q: 'a b', ids: [1, 2], empty: null, skip: undefined }
})
// → /search?q=a+b&ids=1&ids=2&empty=
```

- `undefined` = 整个键不发；`null` = 发空值（`?empty=`）；数组展开成重复 key。
- 编码按 `URLSearchParams`（空格 → `+`），不做 `ids[]=` 这种 brackets 语法。
- 与 `method` 无关，任意动词都生效；`url` 自带 query 时用 `&` 续接。
- 值只能是标量或标量数组。越界的值（对象、函数……）在类型面写不出来，绕过类型（纯 JS、`as any`）时**抛错** `OnoFetchError(code: 'INVALID_QUERY')`，而不是给你一个 `filter=%5Bobject%20Object%5D` —— 那是能发出去、后端却一定认不出的废 URL。真需要那种值，交给下面的 `paramsSerializer`。

### `paramsSerializer` · 整套口径交给你

`ids[]=1&ids[]=2`（PHP / Rails）、`ids=1,2`（Spring 默认）、按 key 排序算签名 —— 内置的重复 key 口径必然只对上一半，所以这里开放的是整个序列化步骤：

```ts
const api = createOnoFetch({
  baseURL: '/api',
  paramsSerializer: params =>
    `ids=${(params.ids as (string | number)[]).join(',')}`
})
// 请求级 paramsSerializer 覆盖实例级
```

- 返回值是**不含 `?`** 的完整 query 串（`a=1&b=2`），用 `?` 起头还是 `&` 续接由库根据 url 决定；返回空串等于不发 query。
- 它拿到的是整个 `params` 对象，库不再替你做校验 —— 排序、`encodeURIComponent`（不是 `+`）、brackets 都在这几行里自己写。
- serializer 自己抛错时 promise 直接 reject，抛的就是你那个原始错误（不包成 `OnoFetchError`）。
- 没给 `params` 时 serializer 不参与（也没东西可序列化）。

## URL 拼装 `api.buildURL(url, options?)`

```ts
api.buildURL('/users/1', { params: { expand: 'orders' } })
// → 'https://api.example.com/v1/users/1?expand=orders'
```

它与真实请求共用同一次 `joinURL` / `withQuery`，所以返回值逐字符等于最终发出去的那个 URL —— 拿它做分享链接、缓存 key、埋点 key 或测试断言，都不会和请求漂移。

- 只算 URL，不碰 headers：`method` / `body` / `headers` 都不参与拼接，`options` 里也只有 `params` 与 `paramsSerializer` 两格，写别的编译报错。
- 它是同步返回 `string` 的纯函数，所以 `params` 越界在这里是**抛出**，不是 rejected promise。
- 返回值含完整 query：别把长效凭证写进 `params` 再拿去上报或打印。

## 请求体

`api.post(url, body)` 或调用式 `{ body }`。Content-Type 按传入值的形状推断：

| 传入              | 推断出的 Content-Type                                         |
| ----------------- | ------------------------------------------------------------- |
| 普通对象          | `application/json;charset=utf-8`（`JSON.stringify`）          |
| 数组              | `application/json;charset=utf-8`（`JSON.stringify`）          |
| `FormData`        | 不设置 —— 交给浏览器生成 `boundary`，手动设会导致后端解析失败 |
| `URLSearchParams` | `application/x-www-form-urlencoded;charset=utf-8`             |
| `Blob`            | `blob.type`，为空时 `application/octet-stream`                |
| `string`          | `text/plain;charset=utf-8`（不猜它是不是 JSON）               |

- 你显式给的 Content-Type 不会被推断值覆盖（大小写不敏感）。
- `OnoFetchParams` 就是这张表的形状（`Record<string, unknown> | unknown[] | FormData | URLSearchParams | string | Blob | undefined`），类型面与运行时一一对应。裸基本类型（`api.post(url, 1)`）不在类型面里 —— 运行时有一条把任何值 `String()` 起来的兜底分支，它只服务绕过类型的调用方。
- GET / HEAD / DELETE 带 body 会被静默丢弃，见「已知限制」。

## 取消、超时与错误

```ts
import { OnoFetchError } from 'ono-fetch'

const controller = new AbortController()
try {
  await api.get('/slow', { signal: controller.signal, timeout: 3_000 })
} catch (e) {
  if (e instanceof OnoFetchError) {
    // 'ABORTED' | 'TIMEOUT' | 'TOO_LARGE' | 'INVALID_QUERY' | 'UNKNOWN'
    if (e.code === 'TIMEOUT') console.log('超时')
  }
}
```

- `OnoFetchError` 是 `Error` 子类，`name` 为 `'OnoFetchError'`，老的 `catch (e)` 与消息匹配都不受影响。
- **按 `code` 分支，不要匹配 message 文本**：timeout 的历史文案就是 `'Request aborted'`，与主动取消同字 —— 区分两者请用 `code`。已发布的消息文本不会改。
- 传入"已中止"的 `signal` 会立即 reject `ABORTED`，且一个请求都不会发出。
- `signal` 与 `timeout` 同时给时两者都生效。
- **两者管的都是整个 promise，不是只到响应头。** 到点交给 `AbortController.abort()` 的就是那个时限，所以对端痛快回头、却磨磨蹭蹭送 body 时照样被切断（`TIMEOUT`）；响应头之后 `abort()` 也仍断得掉库自己那次读体（`ABORTED`）。唯一的例外是 `returnType: null` —— 那一格 body 归你读，`timeout` 就到响应头为止。
- 只有库自己判定的失败会被包起来：取消 `ABORTED`、超时 `TIMEOUT`、超限 `TOO_LARGE`、`params` 越界 `INVALID_QUERY`、响应钩子没返回外壳 `UNKNOWN`。其余一律原样抛出底层错误 —— 连接失败（服务没起、DNS 挂了）是 `TypeError: fetch failed`（细节在 `error.cause`），响应解析期抛的错、你在 `paramsSerializer` / `jsonReviver` / `onRequest` / `onResponse` / `onError` 里抛的错、以及注入的 `fetchImpl` 抛的错都直接透出来。包装会让 `e instanceof TypeError` 之类的老写法失效，所以这条界线不放宽。`onError` 收到的就是这同一个没被包装的原值。

## 响应体体积上限 `maxResponseSize`

```ts
const api = createOnoFetch({ baseURL: '/api', maxResponseSize: 5_000_000 })
// 某一条特赦：0 = 这一条不限
await api.get('/export', { maxResponseSize: 0 })
```

超限的代价是**断流并 reject** `OnoFetchError(code: 'TOO_LARGE')`，不是截断后给你一个残缺的 `data`。量的是**解码后**的字节，所以 gzip 响应下它会大于响应的 `content-length`。只管下载方向 —— 请求体多大是你的代码决定的，库不在 `normalizeBody` 之后替你判。

## 进度

```ts
api.get('/large.json', {
  onProgress: (progress, loaded, total) => {
    if (progress === undefined) {
      // 不知道总量：显示已读字节数，别画百分比
      setStatus(`已下载 ${loaded} 字节`)
      return
    }
    setPercent(progress)
  }
})
```

每读到一个数据块回调一次，与响应有没有 `content-length` 无关。三个参数：`progress`（0..1 比值）、`loaded`（已读的解码后字节数）、`total`（`content-length` 声明的总量）。

- `total` 与 `progress` **同时**为 `undefined`：chunked 响应没有 `content-length`；带 `content-encoding`（gzip 等）时那个头量的是压缩后的字节，与解压后的 `loaded` 不可比，宁可不报总量。
- `progress` 的类型是 `number | undefined`，所以 TS 项目里不处理未知就是编译错误 —— 这是刻意的：把未知当已知画出来的进度条比不画更糟。
- 只有下载方向。fetch 这一层没有上传进度事件，`onUploadProgress` 之类做不到。
- `returnType: null` 时不会触发 —— body 归你自己读。

## 换掉底层 transport `fetchImpl`

```ts
const api = createOnoFetch({ baseURL: '/api', fetchImpl: myFetch })
```

它顶替的只有一个调用 —— `globalThis.fetch(input, init)`。它上面那些仍然是库的：baseURL 拼接、query 序列化、请求头合并、`timeout` 与 `signal` 的接线、流式读体、`maxResponseSize`、`returnType` 解析、三格钩子。

开这一格的原因是平台的一个洞，不是我们漏了一个功能：`fetch`（浏览器 fetch、Node 的 undici）**没有 per-request 的 `agent` / `proxy` / `dispatcher` 选项**，所以库就算收下 `proxy` 这个字段，也没有任何东西可以把它交给。静默失效的选项比缺功能更糟，于是这里开放的是 transport 本身：

```ts
// Node：这个实例走代理（undici 由你安装，不是我们的依赖）
import { fetch, ProxyAgent } from 'undici'

const dispatcher = new ProxyAgent('http://127.0.0.1:7890')
const api = createOnoFetch({
  fetchImpl: (input, init) => fetch(input, { ...init, dispatcher })
})
```

两条硬要求，因为中止接线和返回外壳都要穿过这个函数：

- **它必须接住 `init.signal`。** 我们塞进去的那个 `AbortController` 是 `timeout` 与你的 `signal` 唯一到达它的通路，不理它就等于这两格都失效。信号触发时请按 `fetch` 的方式 reject（`error.name === 'AbortError'`）—— 库认的是这个名字，靠它翻成 `TIMEOUT` / `ABORTED`；其他 rejection 值一律原样透出。
- **它必须返回真正的 `Response`。** `status` / `statusText` / `headers` / `url` 和那段读体都从这个对象上取，给别的东西就以 `TypeError` reject。

- **只有实例级**：请求级 options 里写 `fetchImpl` 是编译错误，和三格钩子一样。某一次调用想换 transport，请用 `api.extend({ fetchImpl: other })`。
- **范围比 axios 的 `adapter` 窄**：`adapter` 拿的是整个 config、还的是 response，URL 拼装与 body 处理都归它；这一格坐在库所有步骤做完之后，收到的就是最终的 `(url, init)`。
- **它抛的错不做包装**，`onError` 把它算进和 `TypeError: fetch failed` 同一桶 —— 也就是说换 transport 同时把它的错误形状也带进了那一格。
- **这是换行为，不是沙箱**：这个函数看得见你发出的每一个请求头（包括钩子刚补上的 token）和每一个 body，也决定回来的字节是什么，所以只交给你自己控制的代码。
- `returnType: null` 下调用方拿到的原生 `Response` **就是这个实现给的对象**，它对 `url` / `headers` 做了什么，外壳里就是什么。

## 已知限制（有意保留的口径）

1. 非 2xx 不抛错。
2. `GET` / `HEAD` / `DELETE` 带请求体时，body 与推断出的 `content-type` 一起被静默丢弃（原生 `fetch` 对带体的 `HEAD` 是直接抛 `TypeError`，这里替它挡掉）。`DELETE` 规范允许带体，放开它属于独立的行为变更，目前没做。
3. 类型只挡对象字面量：`const o = { method: 'POST' }; api.get(url, o)` 仍编译得过（TS 的 excess property check 不对非 fresh 对象生效），运行时以方法名为准。
4. 钩子只有 `onRequest` / `onResponse` / `onError` 三格、且只在创建实例时给：没有命令式注册（`use` / `eject`），没有重试、并发限制、队列，也不能重放请求。而 `onError` 是上报出口，不是重试策略 —— 断网与调用方写错在那一格可能分不出来。全库唯一的扩展点是 `fetchImpl`，它换的是那一次 transport 调用，别的都不换。
5. `OnoFetchMethod` 含 `string`，不可穷举。
6. 泛型 `data` 与 `returnType` 不做一致性校验。
7. **同构**指的是 API 一致、代码路径只有一条 —— 库不按平台分支。它不是"浏览器 `fetch` 与 Node（`undici`）行为一致"的声明：这条边界以下的差异由 transport 层决定，本库既不用垫片把它们藏起来，也不承诺抹平。装了 `fetchImpl` 也不削弱这句：那是你替某个实例选了一个 transport，不是库在代码里按平台分叉。

## 与 axios 的取舍

**选 ono-fetch**：在意体积与零依赖；浏览器与 Node 要同一套 API；喜欢 `api(url, { method })` 这一条通用通路而不是 config 对象。

**选 axios**：需要命令式的拦截器注册、请求重放、取消令牌生态、上传进度、CommonJS 直接 require，或者把 transport 当声明式字段用（`proxy`、`httpAgent`……）—— axios 在 Node 那条路上真有一个持有这些参数的适配器，而 `fetch` 没有给本库放它们的位置，所以这里换成"注入整个 transport"这一个函数。

关键的口径差异：axios 默认对非 2xx **抛错**，本库 resolve；axios 的 `params` 与 `data` 都在 config 对象里，本库的 `body` 在 `post/put/patch` 的位置参数上；axios 的 `interceptors` 挂在实例上、随时 `use`，本库的三格钩子在 `createOnoFetch` 时定死，且请求钩子改不动 URL 与 `params`。axios 那边改配置靠就地 mutate `api.defaults` / `api.interceptors`，本库给你的是一个新实例：`api.extend(config)`。

## License

MIT
