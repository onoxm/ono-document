# Theme Utils
主题切换的工具函数。

## 代码实现
将下列代码复制到`src/utils/themeUtils.ts`文件中：
```tsx
// 计算两点之间的距离
const distance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

const countCircleRadius = (circleX: number, circleY: number, screenWidth: number, screenHeight: number) => {
    let circlePosition = 't-l',
        circleRadius = 0
    // 判断位置
    if (circleX < screenWidth / 2 && circleY < screenHeight / 2) circlePosition = 't-l'
    else if (circleX > screenWidth / 2 && circleY < screenHeight / 2) circlePosition = 't-r'
    else if (circleX < screenWidth / 2 && circleY > screenHeight / 2) circlePosition = 'b-l'
    else if (circleX > screenWidth / 2 && circleY > screenHeight / 2) circlePosition = 'b-r'
    else if (circleX === screenWidth / 2 && circleY < screenHeight / 2) circlePosition = 't-c'
    else if (circleX === screenWidth / 2 && circleY > screenHeight / 2) circlePosition = 'b-c'
    else if (circleX < screenWidth / 2 && circleY === screenHeight / 2) circlePosition = 'l-c'
    else if (circleX > screenWidth / 2 && circleY === screenHeight / 2) circlePosition = 'r-c'
    else circlePosition = 'center'

    switch (circlePosition) {
        case 't-l':
            circleRadius = Math.ceil(distance(circleX, circleY, screenWidth, screenHeight))
            break;
        case 't-r':
            circleRadius = Math.ceil(distance(circleX, circleY, 0, screenHeight))
            break;
        case 'b-l':
            circleRadius = Math.ceil(distance(circleX, circleY, screenWidth, 0))
            break;
        case 'b-r':
            circleRadius = Math.ceil(distance(circleX, circleY, 0, 0))
            break;
        case 't-c':
            circleRadius = Math.ceil(distance(circleX, circleY, 0, screenHeight))
            break;
        case 'b-c':
            circleRadius = Math.ceil(distance(circleX, circleY, 0, 0))
            break;
        case 'l-c':
            circleRadius = Math.ceil(distance(circleX, circleY, screenWidth, 0))
            break;
        case 'r-c':
            circleRadius = Math.ceil(distance(circleX, circleY, 0, 0))
            break;

        default:
            circleRadius = Math.ceil(distance(circleX, circleY, 0, 0))
            break;
    }
    return circleRadius;
}

// 获取圆的圆心（x,y）和半径（r）
const spreadCircle = (options: { top: number, left: number, width: number, height: number }) => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const circleX = options.left + options.width / 2
    const circleY = options.top + options.height / 2
    return { x: circleX, y: circleY, r: countCircleRadius(circleX, circleY, screenWidth, screenHeight) }
}

// 将下面的代码复制到全局css文件中，即可实现全局的主题切换过渡动画效果
// 暗示元素的过渡动画效果
//   ::view-transition-old(root),
//   ::view-transition-new(root) {
//     animation: none;
//     mix-blend-mode: normal;
//   }

//   .dark::view-transition-old(root) {
//     z-index: 1;
//   }

//   .dark::view-transition-new(root) {
//     z-index: 999;
//   }

//   ::view-transition-old(root) {
//     z-index: 999;
//   }

//   ::view-transition-new(root) {
//     z-index: 1;
//   }

// 亮色元素的过渡动画效果
//   .dark::view-transition-old(root) {
//     z-index: 999;
//   }

//   .dark::view-transition-new(root) {
//     z-index: 1;
//   }

//   ::view-transition-old(root) {
//     z-index: 1;
//   }

//   ::view-transition-new(root) {
//     z-index: 999;
//   }

/**
 * 主题切换时的过渡动画效果
 * @el 点击切换主题的元素
 * @duration 过渡动画时长
 * @theme 切换前的主题
 * @spreadTheme 主题是light/dark时扩散
 * @changeTheme 切换主题的回调函数
*/
const changeClip = (options: { el: HTMLElement, duration?: number, theme: 'light' | 'dark', spreadTheme?: 'light' | 'dark', changeTheme: (theme: 'light' | 'dark') => void }) => {
    const isAppearanceTransition = document.startViewTransition(() =>
        options.changeTheme(options.theme)
    );

    if (!isAppearanceTransition) return alert("浏览器不支持此API");
    if (!options.spreadTheme) options.spreadTheme = 'dark'

    const { top, left, width, height } =
        options.el.getBoundingClientRect();
    const { x, y, r } = spreadCircle({ left, top, width, height });

    const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${r}px at ${x}px ${y}px)`,
    ];

    isAppearanceTransition.ready.then(() =>
        document.documentElement.animate(
            {
                clipPath:
                    options.theme === options.spreadTheme ? clipPath : clipPath.reverse(),
            },
            {
                duration: options.duration || 300,
                easing: "ease-in-out",
                pseudoElement:
                    options.theme === options.spreadTheme
                        ? "::view-transition-new(root)"
                        : "::view-transition-old(root)",
            }
        )
    );
}

export default { spreadCircle, changeClip }
```