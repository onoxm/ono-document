# downloadFile

触发浏览器下载：支持传 URL 或 `Blob`。

## 基础用法

```tsx
import { downloadFile } from 'ono-react-element'

function App() {
  return (
    <div>
      <button onClick={() => downloadFile('/files/report.pdf', '季度报告.pdf')}>
        下载报告
      </button>
      <button onClick={() => downloadFile(blob, 'export.csv')}>导出 CSV</button>
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
file|文件地址或 Blob|<code>string</code>\|<code>Blob</code>|-|是
fileName|下载时使用的文件名|<code>string</code>|-|是

## 注意事项

- 传 URL 时会**先 `fetch` 一遍再下载**（而不是直接给 `<a>` 设 href），因此：
  - 跨域地址需要对方允许 CORS，否则会失败；
  - **大文件会被整份读进内存**再转 Blob，不如直接 `<a href download>` 省资源；
  - 需要接口携带 Cookie 时依赖 `fetch` 的默认凭据策略（同源会自动带上）。
- 文件名会被 `encodeURIComponent` 编码后写入 `a.download`，中文名在部分浏览器会显示成 `%E5%AD%A3...` 这样的字面量，此时请改用不带编码的方案。
- **失败不抛错**：网络异常、响应非 2xx 都只 `console.error` 一条日志，Promise 正常 resolve。调用方**无法通过 `await` 判断下载是否成功**，需要反馈就要自己重写这段逻辑。
- 内部创建的 `blob URL` 会在点击后立即 `revokeObjectURL`，不再需要手动释放。
