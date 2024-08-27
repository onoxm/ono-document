# Avatar Crop 头像裁剪
一个头像裁剪功能的组件。

## 前置条件
下载AutoSliderList组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './AvatarCrop';
```

## 基础用法
```tsx
import React, { useState } from'react';
import { AvatarCrop } from '@/components/modules';

function App() {
    const [imgFile, setImgFile] = useState<File>();

    return (
        <div>
            <input type="file" onChange={(e) => setImgFile(e.target.files?.[0])} />
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
                            color: '#ccc',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                        onClick={() => setImgFile(undefined)}
                    >
                        Close
                    </button>
                    <AvatarCrop
                        cvsW={552}
                        imgFile={imgFile}
                        handleSave={avatarData => console.log(avatarData)}
                        footerBtnList={({ OkBtn, ReductionBtn }) => (
                            <>
                                <ReductionBtn />
                                <OkBtn />
                            </>
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default App;
```

## 自定义底部按钮
```tsx
import React, { useState } from'react';
import { AvatarCrop } from '@/components/modules';

function App() {
    const [imgFile, setImgFile] = useState<File>();

    return (
        <div>
            <input type="file" onChange={(e) => setImgFile(e.target.files?.[0])} />
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
                        color: '#ccc',
                        border: '1px solid #ccc',
                        outline: 'none'
                        }}
                        onClick={() => setImgFile(undefined)}
                    >
                        Close
                    </button>
                    <AvatarCrop
                        cvsW={552}
                        imgFile={imgFile}
                        handleSave={avatarData => console.log(avatarData)}
                        footerBtnList={({ handleConfirm, ReductionBtn }) => (
                            <>
                                <ReductionBtn />
                                <button
                                    style={{
                                        color: '#fff',
                                        border: 'none',
                                        outline: 'none',
                                        padding: '4px 16px',
                                        borderRadius: '4px',
                                        backgroundColor: '#5644b8',
                                    }}
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </button>
                            </>
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default App;
```

## 自定义底部按钮
```tsx{44,45,48,52,75,90}
import React, { useState } from'react';
import { AvatarCrop } from '@/components/modules';

function App() {
    const [imgFile, setImgFile] = useState<File>();
    const [isReduction, setIsReduction] = useState<boolean>(false);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    return (
        <div>
            <input type="file" onChange={(e) => setImgFile(e.target.files?.[0])} />
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
                        color: '#ccc',
                        border: '1px solid #ccc',
                        outline: 'none'
                        }}
                        onClick={() => setImgFile(undefined)}
                    >
                        Close
                    </button>
                    <AvatarCrop
                        cvsW={552}
                        imgFile={imgFile}
                        isConfirm={isConfirm} // 控制确认按钮是否触发（自定义按钮必须使用该属性控制）
                        isReduction={isReduction} // 控制还原按钮是否触发（自定义按钮必须使用该属性控制）
                        onReductionSuccess={() => {
                            console.log('click reduction');
                            setIsReduction(false); // 自定义按钮必须在回调函数中将状态设置为false
                        }}
                        handleSave={avatarData => {
                            console.log(avatarData)
                            setIsConfirm(true); // 自定义按钮必须在回调函数中将状态设置为false
                        }}
                        footerBtnList={null}
                    />
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
                            onClick={() => {
                                setIsReduction(true); // 将还原按钮状态置为true
                            }}
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
                            onClick={() => {
                                setIsConfirm(true); // 将确认按钮状态置为true
                            }}
                        >
                            Save
                        </button>
                    </div>
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
imgFile|图片文件|File|string|-|是
cvsW|画布宽度|<code>number</code>|<code>520</code>|否
imageSaveType|图片保存类型|png|jpeg|webp|png|否
dataSaveType|数据保存类型|string|Blob|<code>string</code>|否
maskBG|蒙版背景颜色|<code>string</code>|<code>rgba(0, 0, 0, 0.5)</code>|否
border|边框样式|<code>string</code>|<code>4px solid #fff</code>|否
quality|图片质量|<code>number</code>|<code>100</code>|否
wheelScale|滚轮缩放比例|<code>number</code>|<code>0.1</code>|否
confirmBtnText|确认按钮文字|<code>string</code>|<code>Save</code>|否
reductionBtnText|还原按钮文字|<code>string</code>|<code>reduction</code>|否
isConfirm|是否使用确认按钮的功能|<code>boolean</code>|-|否
isReduction|是否使用还原按钮的功能|<code>boolean</code>|-|否
isReduction|是否使用还原按钮的功能|<code>boolean</code>|-|否
onReductionSuccess|还原成功的回调函数|<code>() => void</code>|-|否
handelSave|保存回调函数|<code>(avatarData: AvatarData) => void</code>|-|是

## footerBtnList
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
footerBtnList|底部按钮列表|<code>{(params: FooterBtnListParams) => React.ReactNode}</code>|<code>{({ OkBtn, ReductionBtn }) => ( <><ReductionBtn /><OkBtn /></> )}</code>|否

## AvatarData
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
AvatarData|头像裁剪数据|string|Blob|-|否

## footerRenderParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
OkBtn|确定按钮组件|<code>FC</code>|<code>FC</code>|否
ReductionBtn|还原按钮组件|<code>FC</code>|<code>FC</code>|否
handleConfirm|确认按钮的回调函数|<code>() => void</code>|<code>() => void</code>|否
handleReduction|还原按钮的回调函数|<code>() => void</code>|<code>() => void</code>|否
