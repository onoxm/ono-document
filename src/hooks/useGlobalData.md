# useGlobalData
用于管理全局数据，包括用户信息、权限信息等。

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