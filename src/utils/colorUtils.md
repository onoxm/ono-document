# Color Utils
颜色的工具函数。

将下列代码复制到`src/utils/colorUtils.ts`文件中：
```tsx
export type ColorType = 'rgb' | 'hsl' | 'hex' | 'hsv' | 'rgba'

export const reg = /\d+/g

// 随机颜色
const randomColor = () => '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0')

// rgb转16进制（包括rgba）
const rgb2hex = (rgb: string) => {
    const rgbArr = rgb.match(reg)

    const to16 = (num: string | number) =>
        Number(num).toString(16).padStart(2, '0')

    const rgbToHex = (rgbArr: string[]) =>
        rgbArr.reduce((pre, cur) => pre + to16(cur), '#')

    const rgbLength4 = (rgba: (string | number)[]) => {
        const rgb = rgba
        const op =
            Number(rgba[rgba.length - 1]) !== 1 ? Number(rgba[rgba.length - 1]) : 100
        rgb.pop()
        return rgbToHex(rgb as string[]) + to16(op * 2.56)
    }

    if (rgbArr!.length === 3) return rgbToHex(rgbArr!)

    if (rgbArr!.length === 5) {
        const newRgbArr = [
            rgbArr![0],
            rgbArr![1],
            rgbArr![2],
            Number(rgbArr![rgbArr!.length - 1]) * 10
        ]

        return rgbLength4(newRgbArr)
    }

    return rgbLength4(rgbArr!)
}

// 16进制转rgb（包括rgba）
const hex2rgb = (hex: string) => {
    const hexVal = hex.split('#')[1]

    const hexLength6 = (hex: string) => {
        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)

        return [r, g, b]
    }

    if (hexVal.length === 8) {
        const op = parseInt(hexVal.slice(-2), 16) / 256
        const val = hexVal.slice(0, -2)

        const arr = hexLength6(val)
        arr.push(op)

        return 'rgba(' + arr.join(', ') + ')'
    }

    return 'rgb(' + hexLength6(hexVal).join(', ') + ')'
}

const rgb2rgba = (bg: string, op?: number) => {
    if (!op) return bg
    if (bg.includes('rgba')) {
        const arr = bg.split(',')
        arr.pop()
        arr.push(op + ')')
        const newBg = arr.join(',')
        return newBg
    }
    if (bg.includes('rgb')) {
        const arr = bg.split(',')
        const rgb = 'rgba(' + arr[0].split('(')[1]
        const b = arr[arr.length - 1].split(')')[0]
        const newBg = [rgb, arr[1], b, ' ' + op + ')'].join(',')
        return newBg
    }
}

// rgb转hsl
const rgb2hsl = (rgb: string) => {
    const rbgArr = rgb.match(reg)!
    const r = Number(rbgArr[0]) / 255
    const g = Number(rbgArr[1]) / 255
    const b = Number(rbgArr[2]) / 255

    const min = Math.min(r, g, b), max = Math.max(r, g, b)

    let h = 0, s = 0, l = (max + min) / 2

    if (max === min) h = s = 0 // achromatic
    else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }
        h /= 6
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

// hsl转rgb
const hsl2rgb = (hsl: string) => {
    const hslArr = hsl.match(reg)!
    const h = Number(hslArr[0]) / 360
    const s = Number(hslArr[1]) / 100
    const l = Number(hslArr[2]) / 100

    let r, g, b

    function hue2Rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2Rgb(p, q, h + 1 / 3);
    g = hue2Rgb(p, q, h);
    b = hue2Rgb(p, q, h - 1 / 3);

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

// 16进制转hsl
const hex2hsl = (hex: string) => rgb2hsl(hex2rgb(hex))

// hsl转16进制
const hsl2hex = (hsl: string) => rgb2hex(hsl2rgb(hsl))

// rgb转hsv
const rgb2hsv = (rgb: string) => {
    const rbgArr = rgb.match(reg)!
    let r = Number(rbgArr[0]) / 255,
        g = Number(rbgArr[1]) / 255,
        b = Number(rbgArr[2]) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0,
        s: number = 0;
    let v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return `hsv(${h * 360}, ${s * 100}, ${v * 100})`;
}

// hsv转rgb (未完成)
const hsv2rgb = (hsv: string) => {
    const hsvArr = hsv.match(reg)!
    let h = Number(hsvArr[0]) / 360,
        s = Number(hsvArr[1]) / 100,
        v = Number(hsvArr[2]) / 100;
    let r, g, b, i, f, p, q, t;
    if (h && s === 0) {
        r = g = b = v; //  achromatic
    } else {
        h /= 60; //  sector 0 to 5
        i = Math.floor(h);
        f = h - i; //  factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default: // case 5:
                r = v;
                g = p;
                b = q;
        }
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

// 16进制转hsv
const hex2hsv = (hex: string) => rgb2hsv(hex2rgb(hex))

// hsv转16进制
const hsv2hex = (hsv: string) => rgb2hex(hsv2rgb(hsv))

export const formatColor = (
    rgb: string,
    a: number,
    type: ColorType = 'rgba'
): string => {
    const rbgArr = rgb.match(reg)!
    let r = Number(rbgArr[0]) / 255,
        g = Number(rbgArr[1]) / 255,
        b = Number(rbgArr[2]) / 255;
    if (type === 'rgba') {
        return `rgba(${r},${g},${b},${a})`;
    } else if (type === 'rgb') {
        return rgb;
    } else if (type === 'hex') {
        return rgb2hex(rgb);
    } else if (type === 'hsl') {
        return rgb2hsl(`rgba(${r},${g},${b},${a})`);
    }
    return `rgba(${r},${g},${b},${a})`;
};

// 判断字符串是否为十六进制或rgb格式的字符串
const isValidColor = (clr: string) => {
    // 十六进制颜色格式
    const hexPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/
    // rgb颜色格式
    const rgbPattern = /^rgb\((1?\d{1,3},\s*1?\d{1,3},\s*1?\d{1,3})\)$/

    if (hexPattern.test(clr) || rgbPattern.test(clr)) return true
    else return false
}

// 判断颜色字符串格式
const getColorType = (clr: string) => {
    // 十六进制颜色格式
    const hexPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/
    // rgb颜色格式
    const rgbPattern = /^rgb\((1?\d{1,3},\s*1?\d{1,3},\s*1?\d{1,3})\)$/

    if (hexPattern.test(clr)) return 'hex'
    else if (rgbPattern.test(clr)) return 'rgb'
    else return 'unknown'
}

// 向一个函数传入一个16进制颜色值，一个类型（lighten或darken）和一个百分比值，并返回一个调整亮度或暗度后的颜色值
const adjustColor = (color: string, type: 'lighten' | 'darken', percent: number) => {
    const colorType = getColorType(color)
    if (colorType === 'hex') {
        const hex = color.replace('#', '')
        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)
        if (type === 'lighten') {
            const r2 = Math.min(255, Math.max(0, r + (255 - r) * percent / 100))
            const g2 = Math.min(255, Math.max(0, g + (255 - g) * percent / 100))
            const b2 = Math.min(255, Math.max(0, b + (255 - b) * percent / 100))
            return `#${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}`
        } else if (type === 'darken') {
            const r2 = Math.min(255, Math.max(0, r - r * percent / 100))
            const g2 = Math.min(255, Math.max(0, g - g * percent / 100))
            const b2 = Math.min(255, Math.max(0, b - b * percent / 100))
            return `#${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}`
        }
    } else if (colorType === 'rgb') {
        const rgb = color.match(/\d+/g)!
        const r = parseInt(rgb[0])
        const g = parseInt(rgb[1])
        const b = parseInt(rgb[2])
        if (type === 'lighten') {
            const r2 = Math.min(255, Math.max(0, r + (255 - r) * percent / 100))
            const g2 = Math.min(255, Math.max(0, g + (255 - g) * percent / 100))
            const b2 = Math.min(255, Math.max(0, b + (255 - b) * percent / 100))
            return `rgb(${r2},${g2},${b2})`
        } else if (type === 'darken') {
            const r2 = Math.min(255, Math.max(0, r - r * percent / 100))
            const g2 = Math.min(255, Math.max(0, g - g * percent / 100))
            const b2 = Math.min(255, Math.max(0, b - b * percent / 100))
            return `rgb(${r2},${g2},${b2})`
        }
    }
    return color
}

// 3位十六进制转6位十六进制
const hex3To6 = (hex: string) => {
    const hexArr = hex.replace('#', '').split('')
    return `#${hexArr[0] + hexArr[0] + hexArr[1] + hexArr[1] + hexArr[2] + hexArr[2]}`
}

// 根据背景颜色获取文字颜色（黑 / 白）
const getContrastColor = (backgroundColor: string) => {
    // 将颜色字符串转换为标准的 RGB 格式
    function normalizeColor(color: string) {
        if (color.startsWith('#')) {
            // 将 3 位简写的颜色值扩展为 6 位
            if (color.length === 4) {
                color = `#${color.slice(1).repeat(2)}`
            }
            // 提取各个颜色分量的值
            const r = parseInt(color.substr(1, 2), 16)
            const g = parseInt(color.substr(3, 2), 16)
            const b = parseInt(color.substr(5, 2), 16)
            return [r, g, b];
        } else if (color.startsWith('rgb')) {
            // 提取各个颜色分量的值
            const rgb = color.match(/\d+/g)!
            const r = parseInt(rgb[0])
            const g = parseInt(rgb[1])
            const b = parseInt(rgb[2])
            return [r, g, b]
        }
        return null; // 非法颜色格式
    }

    // 计算亮度值
    const getBrightness = (color: number[]) =>
        (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000

    // 选择合适的文字颜色
    const chooseTextColor = (brightness: number) =>
        brightness > 128 ? '#000' : '#fff'

    const normalizedColor = normalizeColor(backgroundColor)
    if (normalizedColor === null) {
        return null; // 非法颜色格式
    }

    const brightness = getBrightness(normalizedColor)
    const textColor = chooseTextColor(brightness)

    return textColor
}

// 调节颜色亮度
/**
 * 
 * @param clr 颜色值 16进制 / rgb / hsl
 * @param type 类型（light / dark）
 * @param percentage 百分比值（0 - 100）
 * @returns 颜色值 16进制
 */
export const adjustingColors = (
    clr: string,
    type: 'light' | 'dark',
    percentage: number
) => {
    let clrArr: string[] = []
    if(clr.includes('#')) clrArr = hex2hsl(clr).match(reg)!
    else if(clr.includes('rgb')) clrArr = rgb2hsl(clr).match(reg)!
    else if(clr.includes('hsl')) clrArr = clr.match(reg)!
    else throw new Error('颜色格式错误')

    const adjustingLuminance = () => {
        if (type === 'light')
            return Number(clrArr[2]) + percentage > 100
                ? 100
                : Number(clrArr[2]) + percentage
        else
            return Number(clrArr[2]) - percentage < 0
                ? 0
                : Number(clrArr[2]) - percentage
    }

    return hsl2hex(
        `${clrArr[0]}, ${clrArr[1]}%, ${adjustingLuminance()}%`
    )
}

// 系统吸管
const myDropper = async (onSuccess: (clr: string) => void) => {
    const dropper = new EyeDropper()
    try {
        const result = await dropper.open()
        onSuccess(result.sRGBHex)
    } catch {
        console.log('user canceled')
    }
}

export default { randomColor, rgb2hex, hex2rgb, rgb2rgba, rgb2hsl, hsl2rgb, hex2hsl, hsl2hex, rgb2hsv, hsv2rgb, hex2hsv, hsv2hex, formatColor, getContrastColor, adjustColor, isValidColor, getColorType, hex3To6, adjustingColors, myDropper }
```