# cutFile

按固定大小把文件切成多个分片并逐个计算哈希；文件够大时自动分发给多个 Worker 并行处理。

## 基础用法

```ts
import { cutFile } from 'ono-react-element'
import SparkMD5 from 'spark-md5'

// 10 字节的文件，每片 4 字节 ⇒ 3 片（末片只有 2 字节）
const file = new File(['abcdefghij'], 'demo.txt')

const chunks = await cutFile({
  file,
  chunkSize: 4,
  createHash: buffer => SparkMD5.ArrayBuffer.hash(buffer)
})

chunks.length // 3
chunks[2].start // 8
chunks[2].end // 10 —— 末片的 end 自动夹紧到文件末尾
chunks[2].blob.size // 2
```

示例里的 `spark-md5` **需要你自己安装**（`npm i spark-md5`）—— 库不自带任何哈希实现，`createHash` 必须由你传（见下面的 `HashFn`）。

不传 `createWorker` 时**始终在主线程**跑（每批 20 个并发）。要并发就再传一个 Worker 工厂：

```ts
import { cutFile } from 'ono-react-element'
import { myHash } from './myHash'

const chunks = await cutFile({
  file,
  createHash: myHash,
  // ⚠️ 必须是静态字面量：拼字符串、或先存成变量，打包器都扫不到这个 worker 文件
  createWorker: () =>
    new Worker(new URL('./cut.worker.ts', import.meta.url), { type: 'module' }),
  onProgress: (completed, total) => {
    console.log(`${completed}/${total}`) // 累计已完成数，不是本次增量
  }
})
```

`cut.worker.ts` 的内容见 `createCutFileWorkerHandler` —— 注意 **worker 里的 import 只能走窄入口** `ono-react-element/utils/cutFile`，不能写 `ono-react-element` 或 `ono-react-element/utils`。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
file|待切分的文件|<code>File</code>|-|是
chunkSize|分片大小（字节）|<code>number</code>|<code>1024 * 1024</code>|否
createHash|分片哈希函数，**库不自带算法**|<code>HashFn</code>|-|是
createWorker|Worker 工厂，不传则始终在主线程|<code>() =&gt; Worker</code>|-|否
onProgress|进度回调，收到**累计**已完成分片数|<code>(completed: number, total: number) =&gt; void</code>|-|否

返回值|<code>Promise&lt;ChunkResult[]&gt;</code>，按 <code>index</code> 升序
:- | :-

### ChunkResult

字段|说明|类型
:- | :- | :-
start|分片起始字节（含）|<code>number</code>
end|分片结束字节（不含）|<code>number</code>
index|第几片，从 0 开始|<code>number</code>
hash|<code>createHash</code> 对这片数据算出的结果|<code>string</code>
blob|该分片的数据|<code>Blob</code>

### HashFn

类型值|说明
:- | :-
签名|<code>(buffer: ArrayBuffer) =&gt; string \| Promise&lt;string&gt;</code>

允许返回 Promise —— 库内部一律 `await`，所以同步实现（`SparkMD5.ArrayBuffer.hash`）和异步实现（`crypto.subtle.digest`）都能直接传。

## 什么时候会走多线程

传了 `createWorker` **不等于**会并发。下面三个条件**同时**成立才走多线程：

1. 传了 `createWorker`；
2. 分片数 > 1（即文件大于 `chunkSize`）；
3. `file.size > 10MB` **或者** 分片数 > 50。

否则一律在主线程跑。实测边界（除特别标注外 `chunkSize` 取默认的 1MB）：

| file.size | 分片数 | createWorker | 走多线程 |
| --- | --- | --- | --- |
| 10MB 整 | 10 | 有 | 否 —— 大小阈值是**严格大于** |
| 10MB + 1 字节 | 11 | 有 | 是 —— 由大小触发 |
| 100MB | 100 | **无** | 否 —— 没给工厂就永远是主线程 |
| 1MB | 1 | 有 | 否 —— 只有 1 片 |
| 5,120,000 字节（≈4.88MB，`chunkSize` 100KB） | 50 | 有 | 否 —— 卡在 50 这条线上 |
| 5,120,001 字节（≈4.88MB，`chunkSize` 100KB） | 51 | 有 | 是 —— 由分片数触发（大小远不够 10MB） |

⚠️ 第三条的条件是「**或**」：把 `chunkSize` 调小时**分片数会先触发**多线程。例如 `chunkSize` 设成 100KB 时，5MB 的文件（**52 片**，分片数是 `Math.ceil(size / chunkSize)`）就已经走多线程，而按 10MB 那条它还远不够。

## 注意事项

- **返回数组按 `index` 升序**，与完成先后无关。多线程下各线程是乱序完成的，库按 `index` 把结果回填到对应位置，所以 `chunks[i]` 永远是第 `i` 片，可以直接照顺序拼回去。
- `onProgress` 给的是**累计值**（`completed` 为「已完成分片总数」，`total` 等于分片数）。主线程每批（20 个）报一次；多线程下**跨重试单调不减** —— 重试会把同一批从头再算一遍，但进度不会倒退。
- **只有「加载期」失败会自动重试 2 次**：worker 脚本或其模块图没取到（dev server 正在重启、产物正被重写、页面正在整页刷新这类瞬时抖动）会线性退避重试（300ms × 第几次）。执行期抛错、回传形状不对、数据不能结构化克隆都**不重试** —— 那些是确定性的，重试只会白等。
- 重试用尽后抛出的错误里会注明**这是第几次尝试的结果**，别读成「一定是代码问题」：若消息里写着「服务器不可达」，那只是 server 到那一刻还没回来。
- **空文件返回 `[]`**，不报错、也不会调用 `onProgress`。
- `createHash` **必须自己传**，库不自带任何算法；并且**主线程与 worker 必须 import 同一份实现**。函数不能结构化克隆进 worker，库没办法替你把它传过去，只能靠两边指向同一个模块。一旦一边换了算法而另一边没换，表现是「大文件走一套哈希、小文件走另一套」，静默且极难查。
- 多线程的**线程数** = `min(navigator.hardwareConcurrency || 4, 分片数)`，每个线程分到一段**连续**区间（不是轮询取片）。
- worker 侧必须用 `createCutFileWorkerHandler` 注册 `onmessage`，否则主线程会收到「库不认识的形状」而报错。
- worker 文件必须用 `new Worker(new URL('./cut.worker.ts', import.meta.url), { type: 'module' })` 这种**静态字面量**写法。把它拼成字符串、或先存进变量再传，打包器就扫不到这个入口 —— 表现是**产物里压根没有这个 worker 文件**（dev 能跑，是因为 dev 是运行时按 URL 去要的）。
- ⚠️ 这条路径是**相对本文件**的：`cut.worker.ts` 与写这段代码的文件必须保持那个相对位置。文件一搬家而路径没跟着改，**dev 下不会报错** —— Vite 不校验文件存在性，dev server 还会对不存在的路径回 **200 + index.html**，worker 拿到一段 HTML 当 ESM 解析 ⇒ 报「脚本没能加载」，而整条请求链上**一个非 200 都没有**。同一件事在 `vite build` 下反而是**硬报错**（`[UNRESOLVED_ENTRY]`）⇒ 属于「只跑 dev 永远看不见、一 build 就炸」。
- worker 里的 import **只能是** `ono-react-element/utils/cutFile` 这条窄入口：用主入口会连带引入 `global.css`（worker 里没有 `document`，dev 阶段直接抛错）；用 `ono-react-element/utils` 会把整张模块图从 **10 个 URL** 放大到 **123 个**（16 个 worker ⇒ 约 160 个请求变成 2000 个），请求越多越容易撞上瞬时失败。详见 `createCutFileWorkerHandler`。
- 加载失败时库会去读**页面**的 resource timing，把坏掉的那一跳（URL + 状态码）写进报错里 —— 浏览器对 worker 加载失败本身不给任何详情，只有一个连 `message` 都没有的空 Event。
  - ⚠️ 这条只对「worker 脚本**先**加载成功、随后某条 import 失败」成立。若**脚本自身**就没落成合法 JS（上一条那种路径写错、文件被搬走、请求被中止），它的模块图压根没开始拉，页面时间线里**一条都不记** —— 此时报错会改说「查不到」，并把**头号嫌疑指向「worker 的 URL 写错」**。别把这句读成「浏览器不记录 worker 请求」：实测 Chromium/Edge 下路径正确时，脚本自身的请求**是记得的**（`initiatorType: 'other'`，窄入口共 10 条 URL）。
