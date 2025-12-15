# createEventEmitter
创建一个事件发射器

## 基础用法
```ts
import { createEventEmitter } from 'ono-react-element'

export default createEventEmitter(['event1', 'event2'])
```

```ts
import event from './event'

event.on('event1', (data) => console.log('event1:' + data))
event.emit('event1', 'hello world') // hello world
event.clear('event1') // 清空event1事件
event.clear() // 清空所有事件
```
