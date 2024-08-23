# 快速开始

## 安装

## 配置vite.config.ts
如果没有使用vite，请忽略此步骤。
```ts
import path from 'path'

export default defineConfig(() => {

  return {
    ...
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
```

## 配置tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    ...
    "lib": [..., "ES2022"],
    ...
    "baseUrl": ".",
    "paths": {
      "@/*":["src/*"]
    }
  }
}
```