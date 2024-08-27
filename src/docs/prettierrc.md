# Prettier Configuration
如果使用 Prettier 来格式化代码， 且使用 VScode 编辑器， 可以在项目根目录下创建一个 `.prettierrc` 文件， 并将以下内容复制进去：

```json
{
    "arrowParens": "avoid",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "strict",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 80,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": false,
    "singleAttributePerLine": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "none",
    "useTabs": false,
    "vueIndentScriptAndStyle": true
}
```