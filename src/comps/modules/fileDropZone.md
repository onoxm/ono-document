# FileDropZone 文件投放区
拖拽或点选文件的投放区域，支持文件类型过滤与文件夹递归读取。

## 基础用法
默认形态只渲染一块拖拽区，拖入后由 `getFileListData` 拿到解析好的文件列表：

```tsx
import { FileDropZone } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: 360, height: 200 }}>
      <FileDropZone
        allowFileType="all"
        getFileListData={list => console.log(list)}
        onFileTypeError={() => alert('文件类型不支持')}
      >
        把文件拖到这里
      </FileDropZone>
    </div>
  )
}

export default App;
```

## 三种形态
`type` 决定渲染成什么：

- `'zone'`（默认）：只有拖拽区、不能点击选择，`children` 是区内内容
- `'box'`：拖拽区，同时也可以点击选择，`children` 是区内内容
- `'button'`：只有一个按钮，`children` 是按钮文字，点击后走系统文件选择框

```tsx
import { FileDropZone } from 'ono-react-element'

function App() {
  return (
    <FileDropZone
      type="button"
      multiple
      allowFileType={['image', 'video']}
      getFileListData={list => console.log(list)}
    >
      选择文件
    </FileDropZone>
  )
}

export default App;
```

## 读取文件夹
`allowFileType` 里带上 `'directory'` 后，拖入的文件夹会被递归读取，结果按顶层文件夹分组：

```tsx
import { FileDropZone } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: 360, height: 240 }}>
      <FileDropZone
        allowFileType={['image', 'directory']}
        getFileListData={list => console.log(list)}
      >
        拖入文件夹
      </FileDropZone>
    </div>
  )
}

export default App;
```

## 读取中状态
`style` / `className` 传函数时可以按「是否正在读取」返回不同值，配合 `readingAnimationOptions` 展示读取提示：

```tsx
import { FileDropZone } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: 360, height: 200 }}>
      <FileDropZone
        allowFileType="all"
        style={isReading => ({
          borderColor: isReading ? '#5644b8' : '#cccccc'
        })}
        readingAnimationOptions={{
          readingCannotOperattion: true,
          animations: '正在读取，请稍候...'
        }}
        getFileListData={list => console.log(list)}
      >
        拖进来
      </FileDropZone>
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
getFileListData|拿到解析后的文件列表（有目录时按目录分组）|<code>(arr: OFileType[]) =&gt; void</code>|-|是
type|渲染形态|<code>'button'</code>\|<code>'box'</code>\|<code>'zone'</code>|<code>'zone'</code>|否
children|<code>zone</code> / <code>box</code> 时是区内内容，<code>button</code> 时是按钮文字|<code>ReactNode</code>|-|否
multiple|是否允许多选 / 多文件拖入|<code>boolean</code>|<code>false</code>|否
canClick|<code>box</code> / <code>button</code> 形态下是否可点击选择文件|<code>boolean</code>|<code>true</code>|否
allowFileType|允许的文件类型|<code>FileType[]</code>\|<code>FileType</code>\|<code>'all'</code>|<code>'image'</code>|否
readingAnimationOptions|读取中的提示与是否禁止操作|<code>ReadingAnimationOptions</code>|-|否
className|类名，可传函数按读取状态返回|<code>string</code>\|<code>(isReading: boolean) =&gt; string</code>|<code>''</code>|否
style|样式，可传函数按读取状态返回|<code>CSSProperties</code>\|<code>(isReading: boolean) =&gt; CSSProperties</code>|<code>{}</code>|否
onFileTypeError|遇到不允许的文件类型时触发|<code>() =&gt; void</code>|-|否

### FileType
类型值|说明
:- | :- 
<code>'image'</code>|图片
<code>'video'</code>|视频
<code>'audio'</code>|音频
<code>'text'</code>|文本
<code>'application'</code>|其他二进制文件
<code>'directory'</code>|文件夹，只有拖拽目录时才会遇到
<code>'all'</code>|等价于前五项，**不包含** <code>'directory'</code>

### OFileType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
name|文件名（文件夹为文件夹名）|<code>string</code>|-|是
fileType|MIME 类型，文件夹固定为 <code>'directory'</code>|<code>string</code>|-|是
file|文件对象，文件夹为空字符串|<code>File</code>\|<code>string</code>|-|是
isFile|是否文件，文件夹为 <code>false</code>|<code>boolean</code>|-|是
fileSize|文件大小（字节），文件夹为 <code>0</code>|<code>number</code>|-|是
children|该项是文件夹时，里面包含的文件|<code>OFileType[]</code>|<code>[]</code>|是
parent|所属文件夹名，顶层为空字符串|<code>string</code>|-|是

### ReadingAnimationOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
animations|读取中展示的内容|<code>ReactNode</code>|<code>'正在读取文件...'</code>|否
readingCannotOperattion|读取中是否禁止再次拖入 / 点击|<code>boolean</code>|<code>false</code>|否

## 注意事项
- `allowFileType` 默认是 `'image'`，只收图片；要收全部类型得传 `'all'`。
- ⚠️ `'all'` **不包含文件夹**：拖入目录时 `'all'` 会直接走 `onFileTypeError`。要收目录必须显式写数组，例如 `['image', 'directory']`。
- 读取目录时会**递归**展开子目录，并把结果按顶层文件夹分组：文件夹项自己的 `children` 里放里面的文件，文件的 `parent` 指向所属文件夹名。没拖到目录时，`getFileListData` 收到的就是扁平的文件列表。
- 名为 `.DS_Store` 的文件会被自动忽略。
- `multiple` 为 `false` 时只处理拖入的第一个条目。
- `type="button"` 内部的按钮就是 `Button`，除了 `children` 还能接 `ButtonProps`（`type`、`size`、`disabled` 等）。
- 读取目录依赖浏览器非标准 API（`webkitGetAsEntry`），目前只有 Chromium 内核支持 —— 其他浏览器下拖文件夹收不到内容。
