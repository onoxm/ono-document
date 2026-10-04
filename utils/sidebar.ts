export const sidebar = {
  '/docs/': [
    {
      text: 'Document',
      // collapsed: false,
      items: [
        { text: '快速开始', link: '/docs/quickstart' },
        { text: 'Prettierrc 配置', link: '/docs/prettierrc' }
      ]
    }
  ],
  '/comps/': [
    {
      text: 'Elements',
      collapsed: false,
      items: [
        { text: 'Button 按钮', link: '/comps/elements/button' },
        { text: 'Card3D 3D卡片', link: '/comps/elements/card3d' },
        { text: 'Checkbox 多选框', link: '/comps/elements/checkbox' },
        { text: 'Input 输入框', link: '/comps/elements/input' },
        { text: 'MenuButton 菜单按钮', link: '/comps/elements/menuButton' },
        { text: 'Radio 单选框', link: '/comps/elements/radio' },
        { text: 'Switch 开关', link: '/comps/elements/switch' },
        { text: 'Textarea 文本域', link: '/comps/elements/textarea' }
      ]
    },
    {
      text: 'Modules',
      collapsed: false,
      items: [
        { text: 'Avatar Crop 头像裁剪', link: '/comps/modules/avatarCrop' },
        { text: 'Select 下拉选择', link: '/comps/modules/select' },
        { text: 'VirtualList 虚拟列表', link: '/comps/modules/virtualList' },
        { text: 'Waterfall 瀑布流', link: '/comps/modules/waterfall' }
      ]
    },
    {
      text: 'Tools',
      collapsed: false,
      items: [
        {
          text: 'AutoSliderList 自动滑块',
          link: '/comps/tools/autoSliderList'
        },
        // { text: 'AutoCenterXscroll 自动滑块', link: '/comps/autoCenterXscroll' },
        { text: 'AwaitList 异步列表循环', link: '/comps/tools/awaitList' },
        { text: 'Drawer 抽屉', link: '/comps/tools/drawer' },
        { text: 'List 列表循环', link: '/comps/tools/list' },
        { text: 'Message 消息提示', link: '/comps/tools/message' },
        { text: 'Modal 弹窗', link: '/comps/tools/modal' },
        { text: 'Pagination 分页', link: '/comps/tools/pagination' },
        { text: 'Popover 气泡卡片', link: '/comps/tools/popover' },
        { text: 'Popconfirm 气泡确认框', link: '/comps/tools/popconfirm' },
        // { text: 'Toast 提示框', link: '/comps/tools/toast' },
        {
          text: 'TemplateDialog 模版对话框',
          link: '/comps/tools/templateDialog'
        },
        // { text: 'Tooltip 提示框', link: '/comps/tools/tooltip' },
        { text: 'Xscroll 滚动组件', link: '/comps/tools/xscroll' }
      ]
    }
  ],
  '/event/': [
    {
      text: 'event',
      items: [{ text: 'createEventEmitter', link: '/event/createEventEmitter' }]
    }
  ],
  '/hooks/': [
    {
      text: 'Hooks',
      items: [
        { text: 'useClickOutSide', link: '/hooks/useClickOutSide' },
        { text: 'useCountdown', link: '/hooks/useCountdown' },
        { text: 'useDefer', link: '/hooks/useDefer' },
        { text: 'useEventListener', link: '/hooks/useEventListener' },
        { text: 'useGetElementSize', link: '/hooks/useGetElementSize' },
        { text: 'useKeyPress', link: '/hooks/useKeypress' },
        { text: 'useMouseClick', link: '/hooks/useMouseClick' },
        { text: 'useTheme', link: '/hooks/useTheme' },
        { text: 'useThemePro', link: '/hooks/useThemePro' },
        { text: 'useWindowSize', link: '/hooks/useWindowSize' }
      ]
    }
  ],
  '/tools/': [
    {
      text: 'Tools',
      items: [
        {
          text: 'PortalRenderer 命令式Dom',
          link: '/tools/portalRenderer'
        }
      ]
    },
    {
      text: 'State 状态管理',
      collapsed: false,
      items: [
        {
          text: 'defineGlobalState 全局状态',
          link: '/tools/defineGlobalState'
        },
        {
          text: 'defineScopedState 作用域状态',
          link: '/tools/defineScopedState'
        },
        {
          text: 'persistMiddleware 持久化中间件',
          link: '/tools/persistMiddleware'
        },
        {
          text: 'defineMiddleware 自定义中间件',
          link: '/tools/defineMiddleware'
        }
      ]
    }
  ],
  '/utils/': [
    {
      text: 'Array Utils',
      collapsed: false,
      items: [
        { text: 'forEach', link: '/utils/array/forEach' },
        { text: 'hasDuplicates', link: '/utils/array/hasDuplicates' },
        { text: 'interleave', link: '/utils/array/interleave' },
        { text: 'quickSort', link: '/utils/array/quickSort' }
      ]
    },
    {
      text: 'Browser Utils',
      collapsed: false,
      items: [
        {
          text: 'changeUrlByParams',
          link: '/utils/browser/changeUrlByParams'
        },
        { text: 'getBrowserInfo', link: '/utils/browser/getBrowserInfo' },
        {
          text: 'getURLSearchParams',
          link: '/utils/browser/getURLSearchParams'
        }
      ]
    },
    {
      text: 'Color Utils',
      collapsed: false,
      items: [
        { text: 'adjustColor', link: '/utils/color/adjustColor' },
        { text: 'adjustingColors', link: '/utils/color/adjustingColors' },
        { text: 'formatColor', link: '/utils/color/formatColor' },
        { text: 'getColorType', link: '/utils/color/getColorType' },
        { text: 'getContrastColor', link: '/utils/color/getContrastColor' },
        { text: 'grayColor', link: '/utils/color/grayColor' },
        { text: 'hex2hsl', link: '/utils/color/hex2hsl' },
        { text: 'hex2hsv', link: '/utils/color/hex2hsv' },
        { text: 'hex2rgb', link: '/utils/color/hex2rgb' },
        { text: 'hex3To6', link: '/utils/color/hex3To6' },
        { text: 'hsl2hex', link: '/utils/color/hsl2hex' },
        { text: 'hsl2rgb', link: '/utils/color/hsl2rgb' },
        { text: 'hsv2hex', link: '/utils/color/hsv2hex' },
        { text: 'hsv2rgb', link: '/utils/color/hsv2rgb' },
        { text: 'isValidColor', link: '/utils/color/isValidColor' },
        { text: 'randomColor', link: '/utils/color/randomColor' },
        { text: 'rgb2hex', link: '/utils/color/rgb2hex' },
        { text: 'rgb2hsl', link: '/utils/color/rgb2hsl' },
        { text: 'rgb2hsv', link: '/utils/color/rgb2hsv' },
        { text: 'rgb2rgba', link: '/utils/color/rgb2rgba' }
      ]
    },
    {
      text: 'Dom Utils',
      collapsed: false,
      items: [
        {
          text: 'addEventWithOriginHandler',
          link: '/utils/dom/addEventWithOriginHandler'
        },
        {
          text: 'autoHeightAnimationHide',
          link: '/utils/dom/autoHeightAnimationHide'
        },
        {
          text: 'autoHeightAnimationShow',
          link: '/utils/dom/autoHeightAnimationShow'
        },
        { text: 'captureFrame', link: '/utils/dom/captureFrame' },
        { text: 'captureFrames', link: '/utils/dom/captureFrames' },
        { text: 'createHTML', link: '/utils/dom/createHTML' },
        { text: 'createImageHTML', link: '/utils/dom/createImageHTML' },
        { text: 'drawVideo', link: '/utils/dom/drawVideo' },
        {
          text: 'getElementCenterPosition',
          link: '/utils/dom/getElementCenterPosition'
        },
        { text: 'getImageSize', link: '/utils/dom/getImageSize' },
        { text: 'loadImage', link: '/utils/dom/loadImage' },
        {
          text: 'mediaAutoplayPolicies',
          link: '/utils/dom/mediaAutoplayPolicies'
        },
        { text: 'printStr', link: '/utils/dom/printStr' },
        { text: 'scrollToItem', link: '/utils/dom/scrollToItem' }
      ]
    },
    {
      text: 'File Utils',
      collapsed: false,
      items: [
        { text: 'base64ToBlob', link: '/utils/file/base64ToBlob' },
        { text: 'base64ToFile', link: '/utils/file/base64ToFile' },
        { text: 'blobToBase64', link: '/utils/file/blobToBase64' },
        { text: 'blobToFile', link: '/utils/file/blobToFile' },
        { text: 'downloadFile', link: '/utils/file/downloadFile' },
        { text: 'fileToBase64', link: '/utils/file/fileToBase64' },
        { text: 'fileToBlob', link: '/utils/file/fileToBlob' },
        { text: 'formatFileSize', link: '/utils/file/formatFileSize' },
        { text: 'getFileName', link: '/utils/file/getFileName' },
        { text: 'getFileSuffix', link: '/utils/file/getFileSuffix' },
        { text: 'isBase64', link: '/utils/file/isBase64' },
        { text: 'readerImageFile', link: '/utils/file/readerImageFile' },
        { text: 'urlToBase64', link: '/utils/file/urlToBase64' },
        { text: 'urlToBlob', link: '/utils/file/urlToBlob' },
        { text: 'urlToFile', link: '/utils/file/urlToFile' }
      ]
    },
    {
      text: 'Function Utils',
      collapsed: false,
      items: [
        { text: 'curry', link: '/utils/function/curry' },
        { text: 'debounce', link: '/utils/function/debounce' },
        {
          text: 'getCurrentFrameTime',
          link: '/utils/function/getCurrentFrameTime'
        },
        { text: 'rafInterval', link: '/utils/function/rafInterval' },
        { text: 'rafTimeout', link: '/utils/function/rafTimeout' },
        { text: 'singleton', link: '/utils/function/singleton' },
        { text: 'throttle', link: '/utils/function/throttle' }
      ]
    },
    {
      text: 'Observer Utils',
      collapsed: false,
      items: [
        {
          text: 'createIntersectionObserver',
          link: '/utils/intersectionObserver/createIntersectionObserver'
        },
        {
          text: 'elementIsInViewport',
          link: '/utils/intersectionObserver/elementIsInViewport'
        }
      ]
    },
    {
      text: 'Is Utils',
      collapsed: false,
      items: [
        { text: 'isArray', link: '/utils/is/isArray' },
        { text: 'isBrowser', link: '/utils/is/isBrowser' },
        { text: 'isFunction', link: '/utils/is/isFunction' },
        { text: 'isMobile', link: '/utils/is/isMobile' },
        { text: 'isNode', link: '/utils/is/isNode' },
        { text: 'isObject', link: '/utils/is/isObject' },
        { text: 'isPromise', link: '/utils/is/isPromise' }
      ]
    },
    {
      text: 'Number Utils',
      collapsed: false,
      items: [
        { text: 'addCommasToNumber', link: '/utils/number/addCommasToNumber' },
        { text: 'gcd', link: '/utils/number/gcd' },
        { text: 'getPointDistance', link: '/utils/number/getPointDistance' },
        { text: 'getRatio', link: '/utils/number/getRatio' },
        { text: 'padZero', link: '/utils/number/padZero' },
        { text: 'pureNumber', link: '/utils/number/pureNumber' },
        { text: 'scaleSize', link: '/utils/number/scaleSize' }
      ]
    },
    {
      text: 'Object Utils',
      collapsed: false,
      items: [
        { text: 'deepCopy', link: '/utils/object/deepCopy' },
        { text: 'selectProperties', link: '/utils/object/selectProperties' },
        { text: 'shallowEqual', link: '/utils/object/shallowEqual' }
      ]
    },
    {
      text: 'Path Utils',
      collapsed: false,
      items: [{ text: 'resourcesPath', link: '/utils/path/resourcesPath' }]
    },
    {
      text: 'Platform Utils',
      collapsed: false,
      items: [
        {
          text: 'distinguishPlatform',
          link: '/utils/platform/distinguishPlatform'
        },
        {
          text: 'distinguishPlatformDelay',
          link: '/utils/platform/distinguishPlatformDelay'
        }
      ]
    },
    {
      text: 'String Utils',
      collapsed: false,
      items: [
        { text: 'chainClassNames', link: '/utils/string/chainClassNames' },
        { text: 'ellipsisString', link: '/utils/string/ellipsisString' },
        {
          text: 'firstLetter2Capitalize',
          link: '/utils/string/firstLetter2Capitalize'
        },
        { text: 'getAllNumbers', link: '/utils/string/getAllNumbers' },
        {
          text: 'getStringRealLenght',
          link: '/utils/string/getStringRealLenght'
        },
        { text: 'isPureNumber', link: '/utils/string/isPureNumber' },
        { text: 'lowerString', link: '/utils/string/lowerString' },
        { text: 'parseQuery', link: '/utils/string/parseQuery' },
        { text: 'passwordStrength', link: '/utils/string/passwordStrength' },
        { text: 'randomString', link: '/utils/string/randomString' },
        { text: 'removeTag', link: '/utils/string/removeTag' },
        { text: 'upperString', link: '/utils/string/upperString' }
      ]
    },
    {
      text: 'Time Utils',
      collapsed: false,
      items: [
        {
          text: 'convertSecondToOtherTime',
          link: '/utils/time/convertSecondToOtherTime'
        },
        { text: 'convertTimestamp', link: '/utils/time/convertTimestamp' },
        { text: 'dateFormat', link: '/utils/time/dateFormat' },
        { text: 'dayOfYear', link: '/utils/time/dayOfYear' },
        { text: 'formatSecond', link: '/utils/time/formatSecond' },
        { text: 'formatTime', link: '/utils/time/formatTime' },
        { text: 'isToday', link: '/utils/time/isToday' },
        { text: 'localFormat', link: '/utils/time/localFormat' },
        { text: 'monthFormat', link: '/utils/time/monthFormat' },
        { text: 'second2Day', link: '/utils/time/second2Day' },
        { text: 'yearFormat', link: '/utils/time/yearFormat' }
      ]
    },
    {
      text: 'Web Utils',
      collapsed: false,
      items: [
        {
          text: 'changeThemeClipPathCircle',
          link: '/utils/web/changeThemeClipPathCircle'
        },
        { text: 'checkStatusCode', link: '/utils/web/checkStatusCode' },
        { text: 'clearAsyncContagion', link: '/utils/web/clearAsyncContagion' },
        { text: 'copyText', link: '/utils/web/copyText' },
        { text: 'pasteText', link: '/utils/web/pasteText' },
        { text: 'uploadFile', link: '/utils/web/uploadFile' }
      ]
    }
  ],
  '/plugins/': [
    {
      text: 'Vite插件',
      collapsed: false,
      items: [{ text: 'autoRouter', link: '/plugins/autoRouter' }]
    }
  ],
  '/packages/': [
    {
      text: 'Packages 独立包',
      collapsed: false,
      items: [{ text: 'onoFetch 同构请求库', link: '/packages/onoFetch' }]
    }
  ],
  '/examples/': [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/examples/markdown-examples' },
        { text: 'Runtime API Examples', link: '/examples/api-examples' }
      ]
    }
  ]
}
