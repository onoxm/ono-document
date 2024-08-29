# useGlobalData
用于管理全局数据，包括用户信息、权限信息等。

## 前置条件
该hooks依赖于`GlobalContext`，需要先下载 <a href='/ono-document/docs/context'>GlobalContext</a> 文件至`src/context`文件夹中。

下载`useGlobalData.ts`文件,并将文件放入`src/hooks`文件夹下。

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useGlobalData';
```

## 基础实用
`src/App.tsx`
```tsx
import { GlobalProvider } from '@/context/GlobalContext'
import { Home } from '@/pages';

function App() {
    <GlobalProvider>
      <Home />
    </GlobalProvider>
}

```

`src/pages/Home.tsx`
```tsx
import { useGlobalData } from '@/hooks';

export const Home = () => {
    const { dispatch, globalData } = useGlobalData();

    const handleSetUsername = (name: string) => {
        dispatch({ type: 'set', key: 'username', value: name })
    }

    return (
        <div>
            <h1>Hello, {globalData.username}</h1>
            <button onClick={() => handleSetUsername('John Doe')}>Change Name</button>
        </div>
    )
}

```