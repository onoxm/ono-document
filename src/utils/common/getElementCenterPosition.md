# getElementCenterPosition
获取元素中心位置

## 示例
```ts
const div = document.querySelector('div')

getElementCenterPosition(div) // { x: 0, y: 0 }
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
el|元素|<code>HTMLElement</code>|-|是
relativeTo|获取位置的基准元素|<code>'viewport'</code>\|<code>'page'</code>\|<code>'parent'</code>|<code>'viewport'</code>|否
