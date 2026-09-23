# Avatar Crop 头像裁剪
头像裁剪组件，提供拖拽移动与滚轮缩放，确认后输出裁剪结果。

## 特性
- **直观的操作**：拖拽移动图片、滚轮缩放，松手后自动回弹到边界内
- **可配置的画布**：支持自定义画布宽度、裁剪框样式与蒙版颜色
- **多种输出格式**：支持 PNG、JPEG、WebP，可输出 base64 或 Blob
- **可控的输出质量**：可配置图片质量参数
- **自定义操作区**：按钮与布局完全由使用者通过 `children` 渲染

## 基础用法
选择本地图片后进入裁剪，点击保存把裁剪结果输出为 base64 图片地址。
```tsx
import { AvatarCrop } from 'ono-react-element'
import { useRef, useState } from 'react'

function App() {
  const [imageFile, setImageFile] = useState<File>()
  const [showImg, setShowImg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={e => setImageFile(e.target.files?.[0])}
      />
      <button onClick={() => inputRef.current?.click()}>选择图片</button>
      {showImg && <img src={showImg} alt="avatar" />}
      {imageFile && (
        <AvatarCrop imageFile={imageFile}>
          {({ handleConfirm, handleReduction }) => (
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button onClick={() => handleReduction()}>还原</button>
              <button
                onClick={() =>
                  handleConfirm(avatarData => {
                    setShowImg(avatarData as string)
                    setImageFile(undefined)
                  })
                }
              >
                保存
              </button>
            </div>
          )}
        </AvatarCrop>
      )}
    </div>
  )
}

export default App;
```

## 输出 Blob
`handleConfirm` 的第二个参数用于指定输出格式，`dataSaveType` 为 `'blob'` 时回调收到的是 `Blob`，通常配合 `URL.createObjectURL` 预览。
```tsx
import { AvatarCrop } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')

  return (
    <div>
      {url && <img src={url} alt="avatar" />}
      <AvatarCrop imageFile="/avatar.png">
        {({ handleConfirm }) => (
          <button
            onClick={() =>
              handleConfirm(
                data => setUrl(URL.createObjectURL(data as Blob)),
                {
                  dataSaveType: 'blob',
                  imageSaveType: 'jpeg',
                  quality: 80
                }
              )
            }
          >
            保存
          </button>
        )}
      </AvatarCrop>
    </div>
  )
}

export default App;
```

## 调整画布宽度与裁剪框样式
`cvsW` 支持数字或带单位的字符串，画布的实际尺寸取自容器宽度；`border` 是裁剪框的边框，`maskBG` 是框外蒙版的颜色。
```tsx
import { AvatarCrop } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: 400 }}>
      <AvatarCrop
        imageFile="/avatar.png"
        cvsW={'100%'}
        border="2px dashed #5644b8"
        maskBG="rgba(0, 0, 0, 0.7)"
      />
    </div>
  )
}

export default App;
```

## 调整缩放灵敏度
`wheelScale` 决定滚轮每滚动一次缩放的比例，数值越大缩放越快。
```tsx
import { AvatarCrop } from 'ono-react-element'

function App() {
  return <AvatarCrop imageFile="/avatar.png" wheelScale={0.05} />
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
imageFile|图片文件，支持 File 或图片地址|<code>File</code>\|<code>string</code>|-|是
cvsW|画布宽度，字符串会原样作为容器宽度|<code>number</code>\|<code>string</code>|<code>520</code>|否
maskBG|裁剪框外蒙版的背景色|<code>string</code>|<code>rgba(0, 0, 0, 0.5)</code>|否
border|裁剪框的边框样式|<code>string</code>|<code>4px solid #fff</code>|否
wheelScale|滚轮每次缩放的步进比例|<code>number</code>|<code>0.1</code>|否
children|自定义操作区，接收 <code>handleConfirm</code> 与 <code>handleReduction</code>|<code>(params: ChildrenParams) => ReactElement</code>|-|否

### ChildrenParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
handleConfirm|确认裁剪并输出结果|<code>(handleSave: (avatarData: string \| Blob) => void, options?: OptionsParams) => void</code>|-|否
handleReduction|还原到图片初始位置与大小|<code>(onReductionSuccess?: () => void) => void</code>|-|否

### OptionsParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
imageSaveType|图片保存类型|<code>'png'</code>\|<code>'jpeg'</code>\|<code>'webp'</code>|<code>'png'</code>|否
dataSaveType|数据保存类型|<code>'base64'</code>\|<code>'blob'</code>|<code>'base64'</code>|否
quality|图片质量（0 - 100）|<code>number</code>|<code>100</code>|否

## 注意事项
- 属性名是 `imageFile`，不是 `imgFile`。
- `dataSaveType` 取值是 **`'base64'` 或 `'blob'`** 这两个字符串，它决定回调参数的类型：选 `'base64'` 回调节点收到 `string`，选 `'blob'` 收到 `Blob`。写成 `string` / `Blob` 是不生效的。
- 裁剪结果**始终是正方形**，边长由图片等比缩放到画布宽度后的较短边决定。
- 输出时 `quality` 会被除以 100 再交给 canvas，所以传 0 - 100 的数值。
- 缩放范围被限制在「初始尺寸 ~ 原图尺寸」之间，无法缩得比初始状态更小、也无法超过原图分辨率。
- 拖拽或缩放超出边界后，松开鼠标会自动回弹，把图片拉回可裁剪区域。
- `handleConfirm` 在画布尚未初始化完成时会直接返回，因此不要在 `imageFile` 生效前就调用它。
- 组件只负责画布与裁剪逻辑，确定/取消/还原这些按钮都需要自己在 `children` 里渲染。
