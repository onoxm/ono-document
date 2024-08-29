# Context
用于管理全局数据，包括用户信息、权限信息等, 一般配合`useGlobalData`使用。

## GlobalContext 代码实现
将下列代码复制到`src/context/GlobalContext.tsx`文件中。
```tsx
import { GlobalContextType, initGlobalData } from '@/context/globalData'
import React, { createContext, useReducer } from 'react'
import { Action, GlobalReducer } from './GlobalReducer'

export const GlobalContext = createContext<{
  globalData: GlobalContextType
  dispatch: React.Dispatch<Action>
} | null>(null)

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalData, dispatch] = useReducer(GlobalReducer, initGlobalData)

  return (
    <GlobalContext.Provider value={{ globalData, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

```

## GlobalReducer 代码实现
将下列代码复制到`src/context/GlobalReducer.tsx`文件中。
```tsx
import { GlobalContextType } from './globalData'

export type Action = {
  type: 'get' | 'set' | 'del'
  key: keyof GlobalContextType
  value?: any
}

export const GlobalReducer = (state: GlobalContextType, action: Action) => {
  switch (action.type) {
    case 'get':
      return state
    case 'set':
      return { ...state, [action.key]: action.value }
    case 'del':
      delete state[action.key]
      return state

    default:
      return state
  }
}

```

## globalData 代码实现
将下列代码复制到`src/context/globalData.tsx`文件中。
```tsx
export const initGlobalData = {
  // 此处可以根据实际情况初始化全局数据
  // user: {
  //   name: 'admin',
  //   roles: ['admin'],
  // },
  // version: '0.0.0',
}

export type GlobalContextType = typeof initGlobalData

```

## 导出context里的工具函数
将下列代码复制到`src/context/index.ts`文件中。
```tsx
export * from './GlobalContext'
export * from './GlobalReducer'
export * from './globalData'

```

## useGlobalData 代码实现
将下列代码复制到`src/hooks/useGlobalData.tsx`文件中。
```tsx
import { GlobalContext } from '@/context/GlobalContext'
import { useContext } from 'react'

export default () => {
  const context = useContext(GlobalContext)
  if (!context) throw new Error('Global data is not initialized')
  return context
}

```

在`src/hooks/index.ts`写入以下代码
```tsx
export * from './useGlobalData';
```

## 使用方法
请前往<a href='/ono-document/hooks/useGlobalData'>useGlobalData</a>中查看具体用法。