# Avatar Crop 头像裁剪
一个头像裁剪功能的组件。

## 特性
- **直观的裁剪操作**：支持拖拽移动和滚轮缩放图片
- **灵活的配置选项**：可自定义画布尺寸、边框样式、蒙版颜色等
- **多种输出格式**：支持 PNG、JPEG、WebP 等图片格式输出
- **高质量输出**：可配置图片质量参数，确保输出效果
- **易于集成**：简单的 API 设计，轻松集成到任何 React 应用中
- **响应式设计**：适配不同屏幕尺寸和设备

## 使用场景
头像裁剪组件适用于各种需要用户上传和裁剪头像的场景：
- 用户个人资料页面
- 社交媒体应用
- 用户管理系统
- 头像上传功能
- 任何需要图片裁剪功能的Web应用

## 前置条件
下载AutoSliderList组件文件,并将文件放入`src/components/modules`文件夹下。

在`src/components/modules/index.ts`写入以下代码
```tsx
export * from './AvatarCrop';
```

## 基础用法
```tsx
import React, { useState, useRef } from'react';
import { AvatarCrop } from '@/components/modules';

function App() {
    const [imgFile, setImgFile] = useState<File>();
    const [showImg, setShowImg] = useState<string>('');
    const [isHover, setIsHover] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                value=""
                onChange={e => setImageFile(e.target.files?.[0])}
            />
            <button
              style={{
                padding: '4px 16px',
                borderRadius: '4px',
                backgroundColor: '#40a9ff',
                color: '#fff',
                border: 'none',
                outline: 'none'
              }}
              onClick={() => inputRef.current?.click()}
            >
              选择图片
            </button>
            {showImg && <img src={showImg} alt="avatar" />}
            {imgFile && (
                <div
                    style={{
                        gap: '16px',
                        width: '600px',
                        height: '700px',
                        padding: '24px',
                        display: 'flex',
                        background: 'white',
                        borderRadius: '8px',
                        flexDirection: 'column',
                        border: '1px solid #333'
                    }}
                >
                    <button
                        style={{
                            marginLeft: 'auto',
                            width: 'fit-content',
                            padding: '4px 16px',
                            borderRadius: '4px',
                            background: '#fff',
                            color: isHover ? '#f00' : '#ccc',
                            border: `1px solid ${isHover ? '#f00' : '#ccc'}`,
                            outline: 'none'
                        }}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        onClick={() => setImgFile(undefined)}
                    >
                        Close
                    </button>
                    <AvatarCrop cvsW={'100%'} imageFile={imageFile}>
                        {({ handleConfirm, handleReduction }) => (
                          <>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 'auto',
                                gap: '16px'
                              }}
                            >
                              <button
                                style={{
                                  padding: '4px 16px',
                                  borderRadius: '4px',
                                  background: '#fff',
                                  color: '#333',
                                  border: '1px solid #333',
                                  outline: 'none'
                                }}
                                onClick={() => handleReduction()}
                              >
                                Reduction
                              </button>
                              <button
                                style={{
                                  padding: '4px 16px',
                                  borderRadius: '4px',
                                  backgroundColor: '#40a9ff',
                                  color: '#fff',
                                  border: 'none',
                                  outline: 'none'
                                }}
                                onClick={() =>
                                  handleConfirm(avatarData => {
                                    setImageFile(undefined)
                                    setShowImg(avatarData as string)
                                  })
                                }
                              >
                                Save
                              </button>
                            </div>
                          </>
                        )}
                    </AvatarCrop>
                </div>
            )}
        </div>
    )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
imgFile|图片文件|<code>File</code>\|<code>string</code>|-|是
cvsW|画布宽度|<code>number</code>|<code>520</code>|否
maskBG|蒙版背景颜色|<code>string</code>|<code>rgba(0, 0, 0, 0.5)</code>|否
border|边框样式|<code>string</code>|<code>4px solid #fff</code>|否
wheelScale|滚轮缩放比例|<code>number</code>|<code>0.1</code>|否
children|子元素|<code>({handleConfirm, handleReduction}: ChildrenParams) => JSX.Element</code>|-|否

### ChildrenParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
handleConfirm|确认按钮的回调函数|<code>(handelSave:(avatarData: string \| Blob) => void, options: OptionsParams) => void</code>|-|否
handleReduction|还原按钮的回调函数|<code>(onReductionSuccess?: () => void) => void</code>|-|否

### OptionsParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
imageSaveType|图片保存类型|<code>png</code>\|<code>jpeg</code>\|<code>webp</code>|<code>png</code>|否
dataSaveType|数据保存类型|<code>string</code>\|<code>Blob</code>|<code>string</code>|否
quality|图片质量|<code>number</code>|<code>100</code>|否
