# persistMiddleware

把状态持久化到 `localStorage` 的中间件，支持自动恢复与字段过滤；环境不支持时**静默降级**。

## 基础用法

字符串简写 = 键名 + 全量落盘 + 开启恢复：

```ts
import { defineGlobalState, persistMiddleware } from 'ono-react-element'

export const useUser = defineGlobalState({ name: '', age: 18 }, [
  persistMiddleware('user')
])
```

只落白名单里的字段（新增字段默认不落盘，更安全）：

```ts
persistMiddleware({ name: 'user', properties: ['name', 'age'] })
```

排除不该落盘的字段（token、大体积缓存）：

```ts
persistMiddleware({ name: 'user', properties: ['token'], include: false })
```

## 与 defineScopedState 同用

```ts
import { defineScopedState, persistMiddleware } from 'ono-react-element'

const [UserProvider, useUser] = defineScopedState({ name: '' }, [
  persistMiddleware('user')
])
```

⚠️ 恢复（rehydrate）只在**定义时**算一次（模块求值期），之后把算好的结果交给每个 Provider 实例 —— 它不会按实例各跑一次。

## 迁移存量数据

两类历史数据都**零配置自动兼容**：

```ts
// ① 从 zustand/persist 迁过来：它落盘的是 { state, version } 信封，
//    沿用同一个键名即可 —— 恢复时自动解包出 state，不必手工清洗存储
persistMiddleware('user')

// ② 换过键名：旧键名通过 legacyNames 指定（单个字符串，或按优先级排列的数组）
persistMiddleware({ name: 'user', legacyNames: 'old-user' })
persistMiddleware({ name: 'user', legacyNames: ['old-user', 'app-state'] })
```

`legacyNames` 只在**主键读不到有效值**时启用：依次尝试，命中第一个能解析出数据的旧键，并立刻把它（**过滤后**的扁平格式）**写回主键**。下次启动主键已有值，就不会再走这条路。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|存储键名，或配置对象|<code>string</code>\|<code>PersistOptions&lt;T&gt;</code>|-|是

### PersistOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
name|localStorage 的键名|<code>string</code>|-|是
properties|要筛选的字段，语义与 <code>selectProperties</code> 的第 2 参一致|<code>(keyof T)[]</code>|-|否
include|为 <code>true</code> 时只落盘 <code>properties</code> 列出的字段，为 <code>false</code> 时排除它们|<code>boolean</code>|<code>true</code>|否
rehydrate|是否在启动时从存储恢复|<code>boolean</code>|<code>true</code>|否
legacyNames|旧存储键名，用于跨键迁移；单个字符串或按优先级排列的数组|<code>string</code>\|<code>string[]</code>|-|否

## 注意事项

- **过滤作用在三处**：首次播种、每次写入、**恢复**。所以存储里此前已经躺着的、被排除的字段不会回到 state，不会出现「我明明排除了它，它还是出现了」。
- `properties` 省略 ⇒ **全量落盘**，整条链跳过，零开销。
- `properties: []` 的含义**按方向算**：`include: true`（默认）时**一个字段都不落盘**，`include: false` 时等于没排除。⚠️ 这与 `selectProperties` 的 `[]`（表示不筛选）**不同**。
- `properties` 里出现重复 key 会在**定义 store 时**就抛错 `Each item in properties must be unique`（校验复用 `selectProperties`）。
- 过滤只作用于**落盘与恢复两侧**，store 本身始终保留全量字段。
- **只在「还没存过」时播种**初始值，不会盖掉已持久化的数据。
- **自动兼容 `zustand/persist` 的落盘格式**：该库落盘的是 `{ state, version }` 信封，本中间件是扁平 state。恢复时若读到「顶层键**全部**落在 `{ state, version }` 内」，会先解包出 `state` 再走过滤；只要多出任何别的键，就当成业务 state 原样返回（判据刻意收紧，避免把带 `state` 字段的业务 state 掏空）。
- **恢复时会剔掉值为 `undefined` 的字段**：空壳存储（`"{}"`）、键名撞车（别的库写了同名键）、或字段不全（白名单比存储里的键多）都会走到这里。否则这些键会在合并时把初始默认值**精确保留地覆盖成 `undefined`** —— 合并是 `Object.assign` 语义，不跳过 `undefined`。空壳存储还因此**自锁**（它 truthy，每次启动都还走恢复），只能靠这条兜底止住。
- 环境不支持持久化时（SSR / Node / Worker / 无痕 / 关闭 cookie）**静默降级**：不落盘、不恢复，store 照常读写，也不记日志。`localStorage` 存在但**访问即抛**（配额满 / `SecurityError`）时同样降级，但会在 dev 下留一条 `console.error`。
- 中间件的**工厂函数体在定义时同步执行**（模块求值期），所以这里会当场写一次 localStorage，也因此工厂体内要避免其他副作用。
