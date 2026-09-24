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
        // { text: 'useFullScreen', link: '/hooks/useFullScreen' },
        { text: 'useGetElementSize', link: '/hooks/useGetElementSize' },
        { text: 'useGlobalData', link: '/hooks/useGlobalData' },
        { text: 'useKeypress', link: '/hooks/useKeypress' },
        { text: 'useReactive', link: '/hooks/useReactive' },
        { text: 'useTheme', link: '/hooks/useTheme' },
        { text: 'useThemePro', link: '/hooks/useThemePro' }
        // { text: 'useUpdate', link: '/hooks/useUpdate' }
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
    }
  ],
  '/utils/': [
    {
      text: 'Common Utils',
      collapsed: false,
      items: [
        { text: 'addCommasToNumber', link: '/utils/common/addCommasToNumber' },
        {
          text: 'addEventWithOriginHandler',
          link: '/utils/common/addEventWithOriginHandler'
        },
        { text: 'chainClassNames', link: '/utils/common/chainClassNames' },
        { text: 'checkStatusCode', link: '/utils/common/checkStatusCode' },
        { text: 'copyText', link: '/utils/common/copyText' },
        { text: 'curry', link: '/utils/common/curry' },
        { text: 'debounce', link: '/utils/common/debounce' },
        { text: 'deepCopy', link: '/utils/common/deepCopy' },
        { text: 'ellipsisString', link: '/utils/common/ellipsisString' },
        {
          text: 'firstLetter2Capitalize',
          link: '/utils/common/firstLetter2Capitalize'
        },
        { text: 'forEach', link: '/utils/common/forEach' },
        { text: 'gcd', link: '/utils/common/gcd' },
        { text: 'getAllNumbers', link: '/utils/common/getAllNumbers' },
        {
          text: 'getCurrentFrameTime',
          link: '/utils/common/getCurrentFrameTime'
        },
        { text: 'getImageSize', link: '/utils/common/getImageSize' },
        { text: 'getPointDistance', link: '/utils/common/getPointDistance' },
        { text: 'getRatio', link: '/utils/common/getRatio' },
        {
          text: 'getStringRealLenght',
          link: '/utils/common/getStringRealLenght'
        },
        { text: 'hasDuplicates', link: '/utils/common/hasDuplicates' },
        { text: 'interleave', link: '/utils/common/interleave' },
        { text: 'isPureNumber', link: '/utils/common/isPureNumber' },
        { text: 'lowerString', link: '/utils/common/lowerString' },
        { text: 'padZero', link: '/utils/common/padZero' },
        { text: 'parseQuery', link: '/utils/common/parseQuery' },
        { text: 'passwordStrength', link: '/utils/common/passwordStrength' },
        { text: 'pasteText', link: '/utils/common/pasteText' },
        { text: 'printStr', link: '/utils/common/printStr' },
        { text: 'pureNumber', link: '/utils/common/pureNumber' },
        { text: 'quickSort', link: '/utils/common/quickSort' },
        { text: 'rafInterval', link: '/utils/common/rafInterval' },
        { text: 'rafTimeout', link: '/utils/common/rafTimeout' },
        { text: 'randomString', link: '/utils/common/randomString' },
        { text: 'removeTag', link: '/utils/common/removeTag' },
        { text: 'scaleSize', link: '/utils/common/scaleSize' },
        { text: 'scrollToItem', link: '/utils/common/scrollToItem' },
        { text: 'selectProperties', link: '/utils/common/selectProperties' },
        { text: 'shallowEqual', link: '/utils/common/shallowEqual' },
        { text: 'singleton', link: '/utils/common/singleton' },
        { text: 'throttle', link: '/utils/common/throttle' },
        { text: 'upperString', link: '/utils/common/upperString' }
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
      text: 'Dom Utils',
      collapsed: false,
      items: [
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
        { text: 'createImageHTML', link: '/utils/dom/createImageHTML' },
        {
          text: 'getElementCenterPosition',
          link: '/utils/dom/getElementCenterPosition'
        },
        { text: 'loadImage', link: '/utils/dom/loadImage' },
        {
          text: 'mediaAutoplayPolicies',
          link: '/utils/dom/mediaAutoplayPolicies'
        }
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
        { text: 'dayOfYear', link: '/utils/time/dayOfYear' },
        { text: 'formatSecond', link: '/utils/time/formatSecond' },
        { text: 'formatTime', link: '/utils/time/formatTime' },
        { text: 'isToday', link: '/utils/time/isToday' },
        { text: 'localFormat', link: '/utils/time/localFormat' },
        { text: 'second2Day', link: '/utils/time/second2Day' }
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
        },
        { text: 'uploadFile', link: '/utils/browser/uploadFile' }
      ]
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
      text: 'Other Utils',
      collapsed: false,
      items: [
        {
          text: 'changeThemeClipPathCircle',
          link: '/utils/changeThemeClipPathCircle'
        },
        { text: 'clearAsyncContagion', link: '/utils/clearAsyncContagion' }
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
