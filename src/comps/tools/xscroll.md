# Xscroll 滚动组件
一个可滚动组件，纵向滚动时，组件会横向滚动。

## 前置条件
下载Xscroll组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './Xscroll';
```

## 基础用法
```tsx
import { List, Xscroll } from '@/components/tools'

function App() {
    const languageList = [
      {
        name: 'html',
        color: '#e65100'
      },
      {
        name: 'css',
        color: '#42a5f5'
      },
      {
        name: 'javascript',
        color: '#ffca28'
      }
    ]
  
    return (
      <Xscroll gap={10} width={400} height={300}>
        <List list={languageList}>
          {({ name, color }) => (
            <div
              style={{
                width: '500px',
                height: '300px',
                background: color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h1 style={{fontSize: '40px', color: 'white' }}>{name}</h1>
            </div>
          )}
        </List>
      </Xscroll>
    )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|区域子元素|<code>ReactNode</code>|-|是
gap|子元素间距|<code>number</code>\|<code>string</code>|-|否
width|组件宽度|<code>number</code>\|<code>string</code>|<code>'100%'</code>|否
height|组件高度|<code>number</code>\|<code>string</code>|<code>'100%'</code>|否
