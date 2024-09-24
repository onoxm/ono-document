# fullScreen
全屏的工具函数。

## 代码实现
将下列代码复制到`src/utils/fullScreen.ts`文件中：

```ts
const getPropertyName = (names: string[], el: HTMLElement | Document) => names.find(n => n in el)

const enterFullScreenName = getPropertyName(['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'], document.documentElement)

const exitFullScreenName = getPropertyName(['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'], document)

const enter = (el: HTMLElement) => enterFullScreenName && el[enterFullScreenName as 'requestFullscreen']()

const exit = () => exitFullScreenName && document.exitFullscreen()

const fullScreenElement = getPropertyName(['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'], document)

const fullEl = () => document[fullScreenElement as 'fullscreenElement'] || null

const isFull = () => !!fullEl()

const toggle = (el: HTMLElement) => isFull() ? exit() : enter(el)

export default { toggle }
```