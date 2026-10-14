# createCutFileWorkerHandler

worker 侧的 `onmessage` 处理器工厂 —— 库只提供协议壳，哈希实现由你传进来。

## 基础用法

一共三个文件。哈希实现被两侧共用，所以单独放一份（原因见下面的「为什么不把哈希内置进库」）。

`myHash.ts` —— 唯一事实来源，主线程与 worker 都 import 它：

```ts
import SparkMD5 from 'spark-md5'

export const myHash = (buffer: ArrayBuffer): string =>
  SparkMD5.ArrayBuffer.hash(buffer)
```

示例里的 `spark-md5` **需要你自己安装**（`npm i spark-md5`）—— 库不自带任何哈希实现，这里只是挑了个最省事的。

`cut.worker.ts` —— worker 入口：

```ts
// ⚠️ 必须走这条窄入口，两侧边界都别越：
//    · 用主入口 ⇒ 它第一行就 import 了 global.css，而 worker 里没有 document
//      ⇒ dev 会真的去注入样式而抛错（build 把 CSS 剥掉，所以只有 dev 炸）；
//    · 用 `ono-react-element/utils` ⇒ 那是整个工具桶，dev 不做 tree-shaking
//      ⇒ worker 的模块图从 10 个 URL 涨到 123 个。
import { createCutFileWorkerHandler } from 'ono-react-element/utils/cutFile'
import type { CutFileWorkerScope } from 'ono-react-element/utils/cutFile'
import { myHash } from './myHash'

const scope = self as unknown as CutFileWorkerScope
scope.onmessage = createCutFileWorkerHandler(myHash)
```

主线程 —— 用**同一个** `myHash` 调 `cutFile`：

```ts
import { cutFile } from 'ono-react-element'
import { myHash } from './myHash'

cutFile({
  file,
  createHash: myHash,
  createWorker: () =>
    new Worker(new URL('./cut.worker.ts', import.meta.url), { type: 'module' })
})
```

要换算法（比如 `crypto.subtle.digest`）只改 `myHash.ts` 一份，两侧自动跟着变。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
createHash|分片哈希函数，与主线程传入的**必须是同一份实现**|<code>HashFn</code>|-|是

返回值|<code>(event: MessageEvent&lt;CutFileWorkerRequest&gt;) =&gt; Promise&lt;void&gt;</code>，直接赋给 <code>scope.onmessage</code>
:- | :-

### CutFileWorkerScope

字段|说明|类型
:- | :- | :-
onmessage|接收主线程消息，赋成工厂的返回值|<code>((event: MessageEvent&lt;CutFileWorkerRequest&gt;) =&gt; void) \| null</code>
postMessage|向主线程回传分片数组、错误或报到|<code>(data: CutFileWorkerResponse) =&gt; void</code>

⚠️ `CutFileWorkerRequest` / `CutFileWorkerResponse` 是库内部的握手形状，**没有对外导出**（对外每多一个名字就多一份 semver 承诺）。表里列出它们只是为了说明签名长什么样 —— 你不需要、也无法具名 import；真要写全自定义 worker 也不会缺类型，`onmessage` 的参数上就带着 `CutFileWorkerRequest`。

## 为什么不把哈希内置进库

函数**不能结构化克隆**，主线程没办法把算法 `postMessage` 进 worker。所以「库内置一份哈希」等价于「强制所有消费方接受某个算法」。改成必传之后，主线程与 worker 各自 import 你的那份实现 —— **同源成了物理保证，不靠自觉**。

## 注意事项

- 调用这个工厂时会**当场做三件事**：注册 `unhandledrejection` 监听、向主线程报一次到、返回处理器。所以必须写成 `scope.onmessage = createCutFileWorkerHandler(myHash)` 这种「赋值即调用」的形式，别把它包进函数里延迟执行。
- **报到机制**：worker 起来后会先发一条 `{ __onoCutFile: 'ready' }`。它解决的是主线程侧的盲区 —— 主线程收到的 `onerror` 对「脚本没加载」和「脚本加载了但执行期抛错」是同一种 Event，只看它分不开；报到把这件事变成**事实**：收到报到就说明脚本、整张模块图、handler 注册**全都成功了**。
- 它**只挂 `unhandledrejection`，刻意不挂 `error`**：未捕获的 error 主线程本来就能收到带 `filename:lineno` 的 ErrorEvent，这里再报一次要跟它抢「谁先到」，反而可能把信息量更大的那条挤掉；而未处理的 Promise 拒绝**只有这里**捞得到 —— 它在主线程侧既不触发 `onerror`、也没有任何消息，表现就是永远卡住。
- 处理器按 `startChunkIndex` 到 `endChunkIndex` **顺序**切片并一次性回传整段结果。单条消息负责哪个区间由主线程算好，worker 不参与分片规划。
- 失败时的回传形状固定为 `{ error: string }`，主线程只认 `error` 这一个字段判成败，不要改这个形状。
- `CutFileWorkerScope` 刻意**不用** `DedicatedWorkerGlobalScope`：共享 tsconfig 的 `lib` 只开了 DOM，补 `"WebWorker"` 会和 DOM 的 `self` / `postMessage` 全局声明打架。这里只声明真正会用到的两个成员，顺带绕开 DOM 版 `postMessage` 要求 `targetOrigin` 的签名（那是 window 的语义）。
- **worker 文件只该被 `new Worker(new URL(...))` 引用**，不要从别处 import 它：一旦成了普通 import，它会被打进主线程产物、在页面里执行一遍（往 window 上挂 `onmessage`，然后静默失效）。
