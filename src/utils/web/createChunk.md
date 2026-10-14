# createChunk

切出第 `index` 个分片并算出它的哈希 —— 单个分片的原子操作。

## 基础用法

```ts
import { createChunk } from 'ono-react-element'
import SparkMD5 from 'spark-md5'

const file = new File(['abcdefghij'], 'demo.txt') // 10 字节

const chunk = await createChunk(file, 2, 4, buffer =>
  SparkMD5.ArrayBuffer.hash(buffer)
)

chunk.start // 8
chunk.end // 10 —— 末片的 end 夹紧到文件末尾
chunk.index // 2
chunk.blob.size // 2
chunk.hash // 该分片的 SparkMD5 值
```

示例里的 `spark-md5` **需要你自己安装**（`npm i spark-md5`）—— 库不自带任何哈希实现。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
file|待切分的文件|<code>File</code>|-|是
index|要切第几片，从 0 开始|<code>number</code>|-|是
chunkSize|分片大小（字节）|<code>number</code>|-|是
createHash|分片哈希函数|<code>HashFn</code>|-|是

返回值|<code>Promise&lt;ChunkResult&gt;</code>
:- | :-

## 什么时候用它

- 常规场景（包括多线程）直接用 `cutFile` 就好 —— 库内部的 worker 处理器已经替你调好了它。
- 只有当你**完全自己写 worker 循环**（连 `createCutFileWorkerHandler` 都不用）时才需要自己调它。
- 区间公式固定为 `start = index * chunkSize`、`end = min(start + chunkSize, file.size)`。

## 注意事项

- 它**不检查 `index` 是否越界**，也不报错：`index` 超出合法范围时（`start` 已超过 `file.size`）`end` 仍会被夹到 `file.size`，于是得到 `end < start`、`blob.size` 为 `0` 的空分片。实测 10 字节的文件每片 4 字节时，`index = 3` 得到 `{ start: 12, end: 10, blob.size: 0 }`，`hash` 是空数据的哈希。
- 空文件（`size` 为 0）传 `index = 0` 同样不报错，得到 `start` 与 `end` 都为 `0` 的空分片。
- `createHash` 必传 —— 库不自带任何哈希算法，原因见 `createCutFileWorkerHandler`。
- 它只读 `file.size` 和 `file.slice()`，不关心 `index` 是否连续，所以可以并行调用多个 `index`（`cutFile` 的主线程路径就是这么每批并发 20 个的）。
- 库对 `hash` 只做存储，不做校验或比较 —— 拿它去重、断点续传还是秒传，判据完全由调用方定义。
