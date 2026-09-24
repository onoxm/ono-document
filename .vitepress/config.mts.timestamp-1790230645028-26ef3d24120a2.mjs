// .vitepress/config.mts
import { defineConfig } from "file:///D:/Code/private/ono-document/node_modules/.pnpm/vitepress@1.6.4_@algolia+cl_3f202e2aa17f5bb383874f855d576800/node_modules/vitepress/dist/node/index.js";

// utils/nav.ts
var nav = [
  { text: "Home", link: "/" },
  {
    text: "Docs",
    activeMatch: "/docs/",
    items: [
      { text: "\u5FEB\u901F\u5F00\u59CB", link: "/docs/quickstart" },
      { text: "components", link: "/comps/elements/button" },
      { text: "hooks", link: "/hooks/useClickOutSide" },
      { text: "utils", link: "/utils/common/chainClassNames" },
      { text: "Vite\u63D2\u4EF6", link: "/plugins/autoRouter" }
    ]
  },
  { text: "Examples", link: "/examples/markdown-examples" }
];

// utils/sidebar.ts
var sidebar = {
  "/docs/": [
    {
      text: "Document",
      // collapsed: false,
      items: [
        { text: "\u5FEB\u901F\u5F00\u59CB", link: "/docs/quickstart" },
        { text: "Prettierrc \u914D\u7F6E", link: "/docs/prettierrc" }
      ]
    }
  ],
  "/comps/": [
    {
      text: "Elements",
      collapsed: false,
      items: [
        { text: "Button \u6309\u94AE", link: "/comps/elements/button" },
        { text: "Card3D 3D\u5361\u7247", link: "/comps/elements/card3d" },
        { text: "Checkbox \u591A\u9009\u6846", link: "/comps/elements/checkbox" },
        { text: "Input \u8F93\u5165\u6846", link: "/comps/elements/input" },
        { text: "MenuButton \u83DC\u5355\u6309\u94AE", link: "/comps/elements/menuButton" },
        { text: "Radio \u5355\u9009\u6846", link: "/comps/elements/radio" },
        { text: "Switch \u5F00\u5173", link: "/comps/elements/switch" },
        { text: "Textarea \u6587\u672C\u57DF", link: "/comps/elements/textarea" }
      ]
    },
    {
      text: "Modules",
      collapsed: false,
      items: [
        { text: "Avatar Crop \u5934\u50CF\u88C1\u526A", link: "/comps/modules/avatarCrop" },
        { text: "Select \u4E0B\u62C9\u9009\u62E9", link: "/comps/modules/select" },
        { text: "VirtualList \u865A\u62DF\u5217\u8868", link: "/comps/modules/virtualList" },
        { text: "Waterfall \u7011\u5E03\u6D41", link: "/comps/modules/waterfall" }
      ]
    },
    {
      text: "Tools",
      collapsed: false,
      items: [
        {
          text: "AutoSliderList \u81EA\u52A8\u6ED1\u5757",
          link: "/comps/tools/autoSliderList"
        },
        // { text: 'AutoCenterXscroll 自动滑块', link: '/comps/autoCenterXscroll' },
        { text: "AwaitList \u5F02\u6B65\u5217\u8868\u5FAA\u73AF", link: "/comps/tools/awaitList" },
        { text: "Drawer \u62BD\u5C49", link: "/comps/tools/drawer" },
        { text: "List \u5217\u8868\u5FAA\u73AF", link: "/comps/tools/list" },
        { text: "Message \u6D88\u606F\u63D0\u793A", link: "/comps/tools/message" },
        { text: "Modal \u5F39\u7A97", link: "/comps/tools/modal" },
        { text: "Pagination \u5206\u9875", link: "/comps/tools/pagination" },
        { text: "Popover \u6C14\u6CE1\u5361\u7247", link: "/comps/tools/popover" },
        { text: "Popconfirm \u6C14\u6CE1\u786E\u8BA4\u6846", link: "/comps/tools/popconfirm" },
        // { text: 'Toast 提示框', link: '/comps/tools/toast' },
        {
          text: "TemplateDialog \u6A21\u7248\u5BF9\u8BDD\u6846",
          link: "/comps/tools/templateDialog"
        },
        // { text: 'Tooltip 提示框', link: '/comps/tools/tooltip' },
        { text: "Xscroll \u6EDA\u52A8\u7EC4\u4EF6", link: "/comps/tools/xscroll" }
      ]
    }
  ],
  "/event/": [
    {
      text: "event",
      items: [{ text: "createEventEmitter", link: "/event/createEventEmitter" }]
    }
  ],
  "/hooks/": [
    {
      text: "Hooks",
      items: [
        { text: "useClickOutSide", link: "/hooks/useClickOutSide" },
        { text: "useCountdown", link: "/hooks/useCountdown" },
        { text: "useDefer", link: "/hooks/useDefer" },
        { text: "useEventListener", link: "/hooks/useEventListener" },
        // { text: 'useFullScreen', link: '/hooks/useFullScreen' },
        { text: "useGetElementSize", link: "/hooks/useGetElementSize" },
        { text: "useGlobalData", link: "/hooks/useGlobalData" },
        { text: "useKeypress", link: "/hooks/useKeypress" },
        { text: "useReactive", link: "/hooks/useReactive" },
        { text: "useTheme", link: "/hooks/useTheme" },
        { text: "useThemePro", link: "/hooks/useThemePro" }
        // { text: 'useUpdate', link: '/hooks/useUpdate' }
      ]
    }
  ],
  "/tools/": [
    {
      text: "Tools",
      items: [
        {
          text: "PortalRenderer \u547D\u4EE4\u5F0FDom",
          link: "/tools/portalRenderer"
        }
      ]
    }
  ],
  "/utils/": [
    {
      text: "Common Utils",
      items: [
        { text: "addCommasToNumber", link: "/utils/common/addCommasToNumber" },
        {
          text: "addEventWithOriginHandler",
          link: "/utils/common/addEventWithOriginHandler"
        },
        { text: "chainClassNames", link: "/utils/common/chainClassNames" },
        { text: "checkStatusCode", link: "/utils/common/checkStatusCode" },
        { text: "copyText", link: "/utils/common/copyText" },
        { text: "curry", link: "/utils/common/curry" },
        { text: "debounce", link: "/utils/common/debounce" },
        { text: "deepCopy", link: "/utils/common/deepCopy" },
        { text: "ellipsisString", link: "/utils/common/ellipsisString" },
        {
          text: "firstLetter2Capitalize",
          link: "/utils/common/firstLetter2Capitalize"
        },
        { text: "forEach", link: "/utils/common/forEach" },
        { text: "gcd", link: "/utils/common/gcd" },
        { text: "getAllNumbers", link: "/utils/common/getAllNumbers" },
        {
          text: "getCurrentFrameTime",
          link: "/utils/common/getCurrentFrameTime"
        },
        { text: "getImageSize", link: "/utils/common/getImageSize" },
        { text: "getPointDistance", link: "/utils/common/getPointDistance" },
        { text: "getRatio", link: "/utils/common/getRatio" },
        {
          text: "getStringRealLenght",
          link: "/utils/common/getStringRealLenght"
        },
        { text: "hasDuplicates", link: "/utils/common/hasDuplicates" },
        { text: "interleave", link: "/utils/common/interleave" },
        { text: "isPureNumber", link: "/utils/common/isPureNumber" },
        { text: "lowerString", link: "/utils/common/lowerString" },
        { text: "padZero", link: "/utils/common/padZero" },
        { text: "parseQuery", link: "/utils/common/parseQuery" },
        { text: "passwordStrength", link: "/utils/common/passwordStrength" },
        { text: "pasteText", link: "/utils/common/pasteText" },
        { text: "printStr", link: "/utils/common/printStr" },
        { text: "pureNumber", link: "/utils/common/pureNumber" },
        { text: "quickSort", link: "/utils/common/quickSort" },
        { text: "rafInterval", link: "/utils/common/rafInterval" },
        { text: "rafTimeout", link: "/utils/common/rafTimeout" },
        { text: "randomString", link: "/utils/common/randomString" },
        { text: "removeTag", link: "/utils/common/removeTag" },
        { text: "scaleSize", link: "/utils/common/scaleSize" },
        { text: "scrollToItem", link: "/utils/common/scrollToItem" },
        { text: "selectProperties", link: "/utils/common/selectProperties" },
        { text: "shallowEqual", link: "/utils/common/shallowEqual" },
        { text: "singleton", link: "/utils/common/singleton" },
        { text: "throttle", link: "/utils/common/throttle" },
        { text: "upperString", link: "/utils/common/upperString" }
      ]
    },
    {
      text: "Color Utils",
      items: [
        { text: "adjustColor", link: "/utils/color/adjustColor" },
        { text: "adjustingColors", link: "/utils/color/adjustingColors" },
        { text: "formatColor", link: "/utils/color/formatColor" },
        { text: "getColorType", link: "/utils/color/getColorType" },
        { text: "getContrastColor", link: "/utils/color/getContrastColor" },
        { text: "grayColor", link: "/utils/color/grayColor" },
        { text: "hex2hsl", link: "/utils/color/hex2hsl" },
        { text: "hex2hsv", link: "/utils/color/hex2hsv" },
        { text: "hex2rgb", link: "/utils/color/hex2rgb" },
        { text: "hex3To6", link: "/utils/color/hex3To6" },
        { text: "hsl2hex", link: "/utils/color/hsl2hex" },
        { text: "hsl2rgb", link: "/utils/color/hsl2rgb" },
        { text: "hsv2hex", link: "/utils/color/hsv2hex" },
        { text: "hsv2rgb", link: "/utils/color/hsv2rgb" },
        { text: "isValidColor", link: "/utils/color/isValidColor" },
        { text: "randomColor", link: "/utils/color/randomColor" },
        { text: "rgb2hex", link: "/utils/color/rgb2hex" },
        { text: "rgb2hsl", link: "/utils/color/rgb2hsl" },
        { text: "rgb2hsv", link: "/utils/color/rgb2hsv" },
        { text: "rgb2rgba", link: "/utils/color/rgb2rgba" }
      ]
    },
    {
      text: "File Utils",
      items: [
        { text: "base64ToBlob", link: "/utils/file/base64ToBlob" },
        { text: "base64ToFile", link: "/utils/file/base64ToFile" },
        { text: "blobToBase64", link: "/utils/file/blobToBase64" },
        { text: "blobToFile", link: "/utils/file/blobToFile" },
        { text: "downloadFile", link: "/utils/file/downloadFile" },
        { text: "fileToBase64", link: "/utils/file/fileToBase64" },
        { text: "fileToBlob", link: "/utils/file/fileToBlob" },
        { text: "formatFileSize", link: "/utils/file/formatFileSize" },
        { text: "getFileName", link: "/utils/file/getFileName" },
        { text: "getFileSuffix", link: "/utils/file/getFileSuffix" },
        { text: "isBase64", link: "/utils/file/isBase64" },
        { text: "readerImageFile", link: "/utils/file/readerImageFile" },
        { text: "urlToBase64", link: "/utils/file/urlToBase64" },
        { text: "urlToBlob", link: "/utils/file/urlToBlob" },
        { text: "urlToFile", link: "/utils/file/urlToFile" }
      ]
    },
    {
      text: "Dom Utils",
      items: [
        {
          text: "autoHeightAnimationHide",
          link: "/utils/dom/autoHeightAnimationHide"
        },
        {
          text: "autoHeightAnimationShow",
          link: "/utils/dom/autoHeightAnimationShow"
        },
        { text: "captureFrame", link: "/utils/dom/captureFrame" },
        { text: "captureFrames", link: "/utils/dom/captureFrames" },
        { text: "createImageHTML", link: "/utils/dom/createImageHTML" },
        {
          text: "getElementCenterPosition",
          link: "/utils/dom/getElementCenterPosition"
        },
        { text: "loadImage", link: "/utils/dom/loadImage" },
        {
          text: "mediaAutoplayPolicies",
          link: "/utils/dom/mediaAutoplayPolicies"
        }
      ]
    },
    {
      text: "Time Utils",
      items: [
        {
          text: "convertSecondToOtherTime",
          link: "/utils/time/convertSecondToOtherTime"
        },
        { text: "dayOfYear", link: "/utils/time/dayOfYear" },
        { text: "formatSecond", link: "/utils/time/formatSecond" },
        { text: "formatTime", link: "/utils/time/formatTime" },
        { text: "isToday", link: "/utils/time/isToday" },
        { text: "localFormat", link: "/utils/time/localFormat" },
        { text: "second2Day", link: "/utils/time/second2Day" }
      ]
    },
    {
      text: "Is Utils",
      items: [
        { text: "isArray", link: "/utils/is/isArray" },
        { text: "isBrowser", link: "/utils/is/isBrowser" },
        { text: "isFunction", link: "/utils/is/isFunction" },
        { text: "isMobile", link: "/utils/is/isMobile" },
        { text: "isNode", link: "/utils/is/isNode" },
        { text: "isObject", link: "/utils/is/isObject" },
        { text: "isPromise", link: "/utils/is/isPromise" }
      ]
    },
    {
      text: "Browser Utils",
      items: [
        {
          text: "changeUrlByParams",
          link: "/utils/browser/changeUrlByParams"
        },
        { text: "getBrowserInfo", link: "/utils/browser/getBrowserInfo" },
        {
          text: "getURLSearchParams",
          link: "/utils/browser/getURLSearchParams"
        },
        { text: "uploadFile", link: "/utils/browser/uploadFile" }
      ]
    },
    {
      text: "Platform Utils",
      items: [
        {
          text: "distinguishPlatform",
          link: "/utils/platform/distinguishPlatform"
        },
        {
          text: "distinguishPlatformDelay",
          link: "/utils/platform/distinguishPlatformDelay"
        }
      ]
    },
    {
      text: "Observer Utils",
      items: [
        {
          text: "createIntersectionObserver",
          link: "/utils/intersectionObserver/createIntersectionObserver"
        },
        {
          text: "elementIsInViewport",
          link: "/utils/intersectionObserver/elementIsInViewport"
        }
      ]
    },
    {
      text: "Other Utils",
      items: [
        {
          text: "changeThemeClipPathCircle",
          link: "/utils/changeThemeClipPathCircle"
        },
        { text: "clearAsyncContagion", link: "/utils/clearAsyncContagion" }
      ]
    }
  ],
  "/plugins/": [
    {
      text: "Vite\u63D2\u4EF6",
      collapsed: false,
      items: [{ text: "autoRouter", link: "/plugins/autoRouter" }]
    }
  ],
  "/examples/": [
    {
      text: "Examples",
      items: [
        { text: "Markdown Examples", link: "/examples/markdown-examples" },
        { text: "Runtime API Examples", link: "/examples/api-examples" }
      ]
    }
  ]
};

// utils/socialLinks.ts
var socialLinks = [
  {
    icon: {
      svg: '<svg t="1724080930363" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5092" width="512" height="512"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="5093"></path></svg>'
    },
    link: "https://gitee.com/onoxm"
  },
  { icon: "github", link: "https://github.com/onoxm" }
];

// .vitepress/config.mts
var config_default = defineConfig({
  lang: "zh-CN",
  title: "ONO\u7684\u5728\u7EBF\u6587\u6863\u5E93",
  description: "A VitePress Site",
  srcDir: "./src",
  base: "/ono-document/",
  // locales,
  head: [["link", { rel: "icon", href: "/ono-document/logo.svg" }]],
  themeConfig: {
    logo: "/logo.svg",
    outlineTitle: "\u672C\u9875\u5BFC\u822A",
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks,
    footer: {
      copyright: "Copyright \xA9 2024-present ONO"
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "\u641C\u7D22",
            buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
          },
          modal: {
            noResultsText: "\u6CA1\u6709\u627E\u5230\u7ED3\u679C",
            resetButtonTitle: "\u91CD\u7F6E\u641C\u7D22\u6761\u4EF6",
            footer: {
              selectText: "\u9009\u62E9",
              navigateText: "\u5207\u6362",
              closeText: "\u5173\u95ED"
            }
          }
        }
      }
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgInV0aWxzL25hdi50cyIsICJ1dGlscy9zaWRlYmFyLnRzIiwgInV0aWxzL3NvY2lhbExpbmtzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcQ29kZVxcXFxwcml2YXRlXFxcXG9uby1kb2N1bWVudFxcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlXFxcXHByaXZhdGVcXFxcb25vLWRvY3VtZW50XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9wcml2YXRlL29uby1kb2N1bWVudC8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCB7IG5hdiwgc2lkZWJhciwgc29jaWFsTGlua3MgfSBmcm9tICcuLi91dGlscydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBsYW5nOiAnemgtQ04nLFxyXG4gIHRpdGxlOiAnT05PXHU3Njg0XHU1NzI4XHU3RUJGXHU2NTg3XHU2ODYzXHU1RTkzJyxcclxuICBkZXNjcmlwdGlvbjogJ0EgVml0ZVByZXNzIFNpdGUnLFxyXG4gIHNyY0RpcjogJy4vc3JjJyxcclxuICBiYXNlOiAnL29uby1kb2N1bWVudC8nLFxyXG4gIC8vIGxvY2FsZXMsXHJcblxyXG4gIGhlYWQ6IFtbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL29uby1kb2N1bWVudC9sb2dvLnN2ZycgfV1dLFxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICBsb2dvOiAnL2xvZ28uc3ZnJyxcclxuICAgIG91dGxpbmVUaXRsZTogJ1x1NjcyQ1x1OTg3NVx1NUJGQ1x1ODIyQScsXHJcbiAgICBvdXRsaW5lOiBbMiwgNl0sXHJcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXHJcbiAgICBuYXYsXHJcbiAgICBzaWRlYmFyLFxyXG4gICAgc29jaWFsTGlua3MsXHJcbiAgICBmb290ZXI6IHtcclxuICAgICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0IFx1MDBBOSAyMDI0LXByZXNlbnQgT05PJ1xyXG4gICAgfSxcclxuICAgIHNlYXJjaDoge1xyXG4gICAgICBwcm92aWRlcjogJ2xvY2FsJyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIHRyYW5zbGF0aW9uczoge1xyXG4gICAgICAgICAgYnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGJ1dHRvblRleHQ6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbW9kYWw6IHtcclxuICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ1x1NkNBMVx1NjcwOVx1NjI3RVx1NTIzMFx1N0VEM1x1Njc5QycsXHJcbiAgICAgICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTkxQ0RcdTdGNkVcdTY0MUNcdTdEMjJcdTY3NjFcdTRFRjYnLFxyXG4gICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICBzZWxlY3RUZXh0OiAnXHU5MDA5XHU2MkU5JyxcclxuICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxyXG4gICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlXFxcXHByaXZhdGVcXFxcb25vLWRvY3VtZW50XFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlXFxcXHByaXZhdGVcXFxcb25vLWRvY3VtZW50XFxcXHV0aWxzXFxcXG5hdi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9wcml2YXRlL29uby1kb2N1bWVudC91dGlscy9uYXYudHNcIjtleHBvcnQgY29uc3QgbmF2ID0gW1xyXG4gIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnLycgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnRG9jcycsXHJcbiAgICBhY3RpdmVNYXRjaDogJy9kb2NzLycsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7IHRleHQ6ICdcdTVGRUJcdTkwMUZcdTVGMDBcdTU5Q0InLCBsaW5rOiAnL2RvY3MvcXVpY2tzdGFydCcgfSxcclxuICAgICAgeyB0ZXh0OiAnY29tcG9uZW50cycsIGxpbms6ICcvY29tcHMvZWxlbWVudHMvYnV0dG9uJyB9LFxyXG4gICAgICB7IHRleHQ6ICdob29rcycsIGxpbms6ICcvaG9va3MvdXNlQ2xpY2tPdXRTaWRlJyB9LFxyXG4gICAgICB7IHRleHQ6ICd1dGlscycsIGxpbms6ICcvdXRpbHMvY29tbW9uL2NoYWluQ2xhc3NOYW1lcycgfSxcclxuICAgICAgeyB0ZXh0OiAnVml0ZVx1NjNEMlx1NEVGNicsIGxpbms6ICcvcGx1Z2lucy9hdXRvUm91dGVyJyB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB7IHRleHQ6ICdFeGFtcGxlcycsIGxpbms6ICcvZXhhbXBsZXMvbWFya2Rvd24tZXhhbXBsZXMnIH1cclxuXVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXENvZGVcXFxccHJpdmF0ZVxcXFxvbm8tZG9jdW1lbnRcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGVcXFxccHJpdmF0ZVxcXFxvbm8tZG9jdW1lbnRcXFxcdXRpbHNcXFxcc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9wcml2YXRlL29uby1kb2N1bWVudC91dGlscy9zaWRlYmFyLnRzXCI7ZXhwb3J0IGNvbnN0IHNpZGViYXIgPSB7XHJcbiAgJy9kb2NzLyc6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0RvY3VtZW50JyxcclxuICAgICAgLy8gY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6ICdcdTVGRUJcdTkwMUZcdTVGMDBcdTU5Q0InLCBsaW5rOiAnL2RvY3MvcXVpY2tzdGFydCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdQcmV0dGllcnJjIFx1OTE0RFx1N0Y2RScsIGxpbms6ICcvZG9jcy9wcmV0dGllcnJjJyB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gICcvY29tcHMvJzogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnRWxlbWVudHMnLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogJ0J1dHRvbiBcdTYzMDlcdTk0QUUnLCBsaW5rOiAnL2NvbXBzL2VsZW1lbnRzL2J1dHRvbicgfSxcclxuICAgICAgICB7IHRleHQ6ICdDYXJkM0QgM0RcdTUzNjFcdTcyNDcnLCBsaW5rOiAnL2NvbXBzL2VsZW1lbnRzL2NhcmQzZCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdDaGVja2JveCBcdTU5MUFcdTkwMDlcdTY4NDYnLCBsaW5rOiAnL2NvbXBzL2VsZW1lbnRzL2NoZWNrYm94JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ0lucHV0IFx1OEY5M1x1NTE2NVx1Njg0NicsIGxpbms6ICcvY29tcHMvZWxlbWVudHMvaW5wdXQnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnTWVudUJ1dHRvbiBcdTgzRENcdTUzNTVcdTYzMDlcdTk0QUUnLCBsaW5rOiAnL2NvbXBzL2VsZW1lbnRzL21lbnVCdXR0b24nIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnUmFkaW8gXHU1MzU1XHU5MDA5XHU2ODQ2JywgbGluazogJy9jb21wcy9lbGVtZW50cy9yYWRpbycgfSxcclxuICAgICAgICB7IHRleHQ6ICdTd2l0Y2ggXHU1RjAwXHU1MTczJywgbGluazogJy9jb21wcy9lbGVtZW50cy9zd2l0Y2gnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnVGV4dGFyZWEgXHU2NTg3XHU2NzJDXHU1N0RGJywgbGluazogJy9jb21wcy9lbGVtZW50cy90ZXh0YXJlYScgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnTW9kdWxlcycsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiAnQXZhdGFyIENyb3AgXHU1OTM0XHU1MENGXHU4OEMxXHU1MjZBJywgbGluazogJy9jb21wcy9tb2R1bGVzL2F2YXRhckNyb3AnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnU2VsZWN0IFx1NEUwQlx1NjJDOVx1OTAwOVx1NjJFOScsIGxpbms6ICcvY29tcHMvbW9kdWxlcy9zZWxlY3QnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnVmlydHVhbExpc3QgXHU4NjVBXHU2MkRGXHU1MjE3XHU4ODY4JywgbGluazogJy9jb21wcy9tb2R1bGVzL3ZpcnR1YWxMaXN0JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ1dhdGVyZmFsbCBcdTcwMTFcdTVFMDNcdTZENDEnLCBsaW5rOiAnL2NvbXBzL21vZHVsZXMvd2F0ZXJmYWxsJyB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdUb29scycsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ0F1dG9TbGlkZXJMaXN0IFx1ODFFQVx1NTJBOFx1NkVEMVx1NTc1NycsXHJcbiAgICAgICAgICBsaW5rOiAnL2NvbXBzL3Rvb2xzL2F1dG9TbGlkZXJMaXN0J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8geyB0ZXh0OiAnQXV0b0NlbnRlclhzY3JvbGwgXHU4MUVBXHU1MkE4XHU2RUQxXHU1NzU3JywgbGluazogJy9jb21wcy9hdXRvQ2VudGVyWHNjcm9sbCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdBd2FpdExpc3QgXHU1RjAyXHU2QjY1XHU1MjE3XHU4ODY4XHU1RkFBXHU3M0FGJywgbGluazogJy9jb21wcy90b29scy9hd2FpdExpc3QnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnRHJhd2VyIFx1NjJCRFx1NUM0OScsIGxpbms6ICcvY29tcHMvdG9vbHMvZHJhd2VyJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ0xpc3QgXHU1MjE3XHU4ODY4XHU1RkFBXHU3M0FGJywgbGluazogJy9jb21wcy90b29scy9saXN0JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ01lc3NhZ2UgXHU2RDg4XHU2MDZGXHU2M0QwXHU3OTNBJywgbGluazogJy9jb21wcy90b29scy9tZXNzYWdlJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ01vZGFsIFx1NUYzOVx1N0E5NycsIGxpbms6ICcvY29tcHMvdG9vbHMvbW9kYWwnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnUGFnaW5hdGlvbiBcdTUyMDZcdTk4NzUnLCBsaW5rOiAnL2NvbXBzL3Rvb2xzL3BhZ2luYXRpb24nIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnUG9wb3ZlciBcdTZDMTRcdTZDRTFcdTUzNjFcdTcyNDcnLCBsaW5rOiAnL2NvbXBzL3Rvb2xzL3BvcG92ZXInIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnUG9wY29uZmlybSBcdTZDMTRcdTZDRTFcdTc4NkVcdThCQTRcdTY4NDYnLCBsaW5rOiAnL2NvbXBzL3Rvb2xzL3BvcGNvbmZpcm0nIH0sXHJcbiAgICAgICAgLy8geyB0ZXh0OiAnVG9hc3QgXHU2M0QwXHU3OTNBXHU2ODQ2JywgbGluazogJy9jb21wcy90b29scy90b2FzdCcgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnVGVtcGxhdGVEaWFsb2cgXHU2QTIxXHU3MjQ4XHU1QkY5XHU4QkREXHU2ODQ2JyxcclxuICAgICAgICAgIGxpbms6ICcvY29tcHMvdG9vbHMvdGVtcGxhdGVEaWFsb2cnXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB7IHRleHQ6ICdUb29sdGlwIFx1NjNEMFx1NzkzQVx1Njg0NicsIGxpbms6ICcvY29tcHMvdG9vbHMvdG9vbHRpcCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdYc2Nyb2xsIFx1NkVEQVx1NTJBOFx1N0VDNFx1NEVGNicsIGxpbms6ICcvY29tcHMvdG9vbHMveHNjcm9sbCcgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuICAnL2V2ZW50Lyc6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogJ2V2ZW50JyxcclxuICAgICAgaXRlbXM6IFt7IHRleHQ6ICdjcmVhdGVFdmVudEVtaXR0ZXInLCBsaW5rOiAnL2V2ZW50L2NyZWF0ZUV2ZW50RW1pdHRlcicgfV1cclxuICAgIH1cclxuICBdLFxyXG4gICcvaG9va3MvJzogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnSG9va3MnLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogJ3VzZUNsaWNrT3V0U2lkZScsIGxpbms6ICcvaG9va3MvdXNlQ2xpY2tPdXRTaWRlJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3VzZUNvdW50ZG93bicsIGxpbms6ICcvaG9va3MvdXNlQ291bnRkb3duJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3VzZURlZmVyJywgbGluazogJy9ob29rcy91c2VEZWZlcicgfSxcclxuICAgICAgICB7IHRleHQ6ICd1c2VFdmVudExpc3RlbmVyJywgbGluazogJy9ob29rcy91c2VFdmVudExpc3RlbmVyJyB9LFxyXG4gICAgICAgIC8vIHsgdGV4dDogJ3VzZUZ1bGxTY3JlZW4nLCBsaW5rOiAnL2hvb2tzL3VzZUZ1bGxTY3JlZW4nIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAndXNlR2V0RWxlbWVudFNpemUnLCBsaW5rOiAnL2hvb2tzL3VzZUdldEVsZW1lbnRTaXplJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3VzZUdsb2JhbERhdGEnLCBsaW5rOiAnL2hvb2tzL3VzZUdsb2JhbERhdGEnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAndXNlS2V5cHJlc3MnLCBsaW5rOiAnL2hvb2tzL3VzZUtleXByZXNzJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3VzZVJlYWN0aXZlJywgbGluazogJy9ob29rcy91c2VSZWFjdGl2ZScgfSxcclxuICAgICAgICB7IHRleHQ6ICd1c2VUaGVtZScsIGxpbms6ICcvaG9va3MvdXNlVGhlbWUnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAndXNlVGhlbWVQcm8nLCBsaW5rOiAnL2hvb2tzL3VzZVRoZW1lUHJvJyB9XHJcbiAgICAgICAgLy8geyB0ZXh0OiAndXNlVXBkYXRlJywgbGluazogJy9ob29rcy91c2VVcGRhdGUnIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgJy90b29scy8nOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdUb29scycsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ1BvcnRhbFJlbmRlcmVyIFx1NTQ3RFx1NEVFNFx1NUYwRkRvbScsXHJcbiAgICAgICAgICBsaW5rOiAnL3Rvb2xzL3BvcnRhbFJlbmRlcmVyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gICcvdXRpbHMvJzogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnQ29tbW9uIFV0aWxzJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6ICdhZGRDb21tYXNUb051bWJlcicsIGxpbms6ICcvdXRpbHMvY29tbW9uL2FkZENvbW1hc1RvTnVtYmVyJyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdhZGRFdmVudFdpdGhPcmlnaW5IYW5kbGVyJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvY29tbW9uL2FkZEV2ZW50V2l0aE9yaWdpbkhhbmRsZXInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6ICdjaGFpbkNsYXNzTmFtZXMnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9jaGFpbkNsYXNzTmFtZXMnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnY2hlY2tTdGF0dXNDb2RlJywgbGluazogJy91dGlscy9jb21tb24vY2hlY2tTdGF0dXNDb2RlJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2NvcHlUZXh0JywgbGluazogJy91dGlscy9jb21tb24vY29weVRleHQnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnY3VycnknLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9jdXJyeScgfSxcclxuICAgICAgICB7IHRleHQ6ICdkZWJvdW5jZScsIGxpbms6ICcvdXRpbHMvY29tbW9uL2RlYm91bmNlJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2RlZXBDb3B5JywgbGluazogJy91dGlscy9jb21tb24vZGVlcENvcHknIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZWxsaXBzaXNTdHJpbmcnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9lbGxpcHNpc1N0cmluZycgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnZmlyc3RMZXR0ZXIyQ2FwaXRhbGl6ZScsXHJcbiAgICAgICAgICBsaW5rOiAnL3V0aWxzL2NvbW1vbi9maXJzdExldHRlcjJDYXBpdGFsaXplJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZm9yRWFjaCcsIGxpbms6ICcvdXRpbHMvY29tbW9uL2ZvckVhY2gnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZ2NkJywgbGluazogJy91dGlscy9jb21tb24vZ2NkJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2dldEFsbE51bWJlcnMnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9nZXRBbGxOdW1iZXJzJyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdnZXRDdXJyZW50RnJhbWVUaW1lJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvY29tbW9uL2dldEN1cnJlbnRGcmFtZVRpbWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6ICdnZXRJbWFnZVNpemUnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9nZXRJbWFnZVNpemUnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZ2V0UG9pbnREaXN0YW5jZScsIGxpbms6ICcvdXRpbHMvY29tbW9uL2dldFBvaW50RGlzdGFuY2UnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZ2V0UmF0aW8nLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9nZXRSYXRpbycgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnZ2V0U3RyaW5nUmVhbExlbmdodCcsXHJcbiAgICAgICAgICBsaW5rOiAnL3V0aWxzL2NvbW1vbi9nZXRTdHJpbmdSZWFsTGVuZ2h0J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaGFzRHVwbGljYXRlcycsIGxpbms6ICcvdXRpbHMvY29tbW9uL2hhc0R1cGxpY2F0ZXMnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaW50ZXJsZWF2ZScsIGxpbms6ICcvdXRpbHMvY29tbW9uL2ludGVybGVhdmUnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaXNQdXJlTnVtYmVyJywgbGluazogJy91dGlscy9jb21tb24vaXNQdXJlTnVtYmVyJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2xvd2VyU3RyaW5nJywgbGluazogJy91dGlscy9jb21tb24vbG93ZXJTdHJpbmcnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncGFkWmVybycsIGxpbms6ICcvdXRpbHMvY29tbW9uL3BhZFplcm8nIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncGFyc2VRdWVyeScsIGxpbms6ICcvdXRpbHMvY29tbW9uL3BhcnNlUXVlcnknIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncGFzc3dvcmRTdHJlbmd0aCcsIGxpbms6ICcvdXRpbHMvY29tbW9uL3Bhc3N3b3JkU3RyZW5ndGgnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncGFzdGVUZXh0JywgbGluazogJy91dGlscy9jb21tb24vcGFzdGVUZXh0JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3ByaW50U3RyJywgbGluazogJy91dGlscy9jb21tb24vcHJpbnRTdHInIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncHVyZU51bWJlcicsIGxpbms6ICcvdXRpbHMvY29tbW9uL3B1cmVOdW1iZXInIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncXVpY2tTb3J0JywgbGluazogJy91dGlscy9jb21tb24vcXVpY2tTb3J0JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3JhZkludGVydmFsJywgbGluazogJy91dGlscy9jb21tb24vcmFmSW50ZXJ2YWwnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncmFmVGltZW91dCcsIGxpbms6ICcvdXRpbHMvY29tbW9uL3JhZlRpbWVvdXQnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncmFuZG9tU3RyaW5nJywgbGluazogJy91dGlscy9jb21tb24vcmFuZG9tU3RyaW5nJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3JlbW92ZVRhZycsIGxpbms6ICcvdXRpbHMvY29tbW9uL3JlbW92ZVRhZycgfSxcclxuICAgICAgICB7IHRleHQ6ICdzY2FsZVNpemUnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9zY2FsZVNpemUnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnc2Nyb2xsVG9JdGVtJywgbGluazogJy91dGlscy9jb21tb24vc2Nyb2xsVG9JdGVtJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3NlbGVjdFByb3BlcnRpZXMnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9zZWxlY3RQcm9wZXJ0aWVzJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3NoYWxsb3dFcXVhbCcsIGxpbms6ICcvdXRpbHMvY29tbW9uL3NoYWxsb3dFcXVhbCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdzaW5nbGV0b24nLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi9zaW5nbGV0b24nIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAndGhyb3R0bGUnLCBsaW5rOiAnL3V0aWxzL2NvbW1vbi90aHJvdHRsZScgfSxcclxuICAgICAgICB7IHRleHQ6ICd1cHBlclN0cmluZycsIGxpbms6ICcvdXRpbHMvY29tbW9uL3VwcGVyU3RyaW5nJyB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdDb2xvciBVdGlscycsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiAnYWRqdXN0Q29sb3InLCBsaW5rOiAnL3V0aWxzL2NvbG9yL2FkanVzdENvbG9yJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2FkanVzdGluZ0NvbG9ycycsIGxpbms6ICcvdXRpbHMvY29sb3IvYWRqdXN0aW5nQ29sb3JzJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2Zvcm1hdENvbG9yJywgbGluazogJy91dGlscy9jb2xvci9mb3JtYXRDb2xvcicgfSxcclxuICAgICAgICB7IHRleHQ6ICdnZXRDb2xvclR5cGUnLCBsaW5rOiAnL3V0aWxzL2NvbG9yL2dldENvbG9yVHlwZScgfSxcclxuICAgICAgICB7IHRleHQ6ICdnZXRDb250cmFzdENvbG9yJywgbGluazogJy91dGlscy9jb2xvci9nZXRDb250cmFzdENvbG9yJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2dyYXlDb2xvcicsIGxpbms6ICcvdXRpbHMvY29sb3IvZ3JheUNvbG9yJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2hleDJoc2wnLCBsaW5rOiAnL3V0aWxzL2NvbG9yL2hleDJoc2wnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaGV4MmhzdicsIGxpbms6ICcvdXRpbHMvY29sb3IvaGV4MmhzdicgfSxcclxuICAgICAgICB7IHRleHQ6ICdoZXgycmdiJywgbGluazogJy91dGlscy9jb2xvci9oZXgycmdiJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2hleDNUbzYnLCBsaW5rOiAnL3V0aWxzL2NvbG9yL2hleDNUbzYnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaHNsMmhleCcsIGxpbms6ICcvdXRpbHMvY29sb3IvaHNsMmhleCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdoc2wycmdiJywgbGluazogJy91dGlscy9jb2xvci9oc2wycmdiJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2hzdjJoZXgnLCBsaW5rOiAnL3V0aWxzL2NvbG9yL2hzdjJoZXgnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaHN2MnJnYicsIGxpbms6ICcvdXRpbHMvY29sb3IvaHN2MnJnYicgfSxcclxuICAgICAgICB7IHRleHQ6ICdpc1ZhbGlkQ29sb3InLCBsaW5rOiAnL3V0aWxzL2NvbG9yL2lzVmFsaWRDb2xvcicgfSxcclxuICAgICAgICB7IHRleHQ6ICdyYW5kb21Db2xvcicsIGxpbms6ICcvdXRpbHMvY29sb3IvcmFuZG9tQ29sb3InIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncmdiMmhleCcsIGxpbms6ICcvdXRpbHMvY29sb3IvcmdiMmhleCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdyZ2IyaHNsJywgbGluazogJy91dGlscy9jb2xvci9yZ2IyaHNsJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3JnYjJoc3YnLCBsaW5rOiAnL3V0aWxzL2NvbG9yL3JnYjJoc3YnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncmdiMnJnYmEnLCBsaW5rOiAnL3V0aWxzL2NvbG9yL3JnYjJyZ2JhJyB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdGaWxlIFV0aWxzJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6ICdiYXNlNjRUb0Jsb2InLCBsaW5rOiAnL3V0aWxzL2ZpbGUvYmFzZTY0VG9CbG9iJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2Jhc2U2NFRvRmlsZScsIGxpbms6ICcvdXRpbHMvZmlsZS9iYXNlNjRUb0ZpbGUnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnYmxvYlRvQmFzZTY0JywgbGluazogJy91dGlscy9maWxlL2Jsb2JUb0Jhc2U2NCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdibG9iVG9GaWxlJywgbGluazogJy91dGlscy9maWxlL2Jsb2JUb0ZpbGUnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZG93bmxvYWRGaWxlJywgbGluazogJy91dGlscy9maWxlL2Rvd25sb2FkRmlsZScgfSxcclxuICAgICAgICB7IHRleHQ6ICdmaWxlVG9CYXNlNjQnLCBsaW5rOiAnL3V0aWxzL2ZpbGUvZmlsZVRvQmFzZTY0JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2ZpbGVUb0Jsb2InLCBsaW5rOiAnL3V0aWxzL2ZpbGUvZmlsZVRvQmxvYicgfSxcclxuICAgICAgICB7IHRleHQ6ICdmb3JtYXRGaWxlU2l6ZScsIGxpbms6ICcvdXRpbHMvZmlsZS9mb3JtYXRGaWxlU2l6ZScgfSxcclxuICAgICAgICB7IHRleHQ6ICdnZXRGaWxlTmFtZScsIGxpbms6ICcvdXRpbHMvZmlsZS9nZXRGaWxlTmFtZScgfSxcclxuICAgICAgICB7IHRleHQ6ICdnZXRGaWxlU3VmZml4JywgbGluazogJy91dGlscy9maWxlL2dldEZpbGVTdWZmaXgnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaXNCYXNlNjQnLCBsaW5rOiAnL3V0aWxzL2ZpbGUvaXNCYXNlNjQnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAncmVhZGVySW1hZ2VGaWxlJywgbGluazogJy91dGlscy9maWxlL3JlYWRlckltYWdlRmlsZScgfSxcclxuICAgICAgICB7IHRleHQ6ICd1cmxUb0Jhc2U2NCcsIGxpbms6ICcvdXRpbHMvZmlsZS91cmxUb0Jhc2U2NCcgfSxcclxuICAgICAgICB7IHRleHQ6ICd1cmxUb0Jsb2InLCBsaW5rOiAnL3V0aWxzL2ZpbGUvdXJsVG9CbG9iJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3VybFRvRmlsZScsIGxpbms6ICcvdXRpbHMvZmlsZS91cmxUb0ZpbGUnIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0RvbSBVdGlscycsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ2F1dG9IZWlnaHRBbmltYXRpb25IaWRlJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvZG9tL2F1dG9IZWlnaHRBbmltYXRpb25IaWRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ2F1dG9IZWlnaHRBbmltYXRpb25TaG93JyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvZG9tL2F1dG9IZWlnaHRBbmltYXRpb25TaG93J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnY2FwdHVyZUZyYW1lJywgbGluazogJy91dGlscy9kb20vY2FwdHVyZUZyYW1lJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2NhcHR1cmVGcmFtZXMnLCBsaW5rOiAnL3V0aWxzL2RvbS9jYXB0dXJlRnJhbWVzJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2NyZWF0ZUltYWdlSFRNTCcsIGxpbms6ICcvdXRpbHMvZG9tL2NyZWF0ZUltYWdlSFRNTCcgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnZ2V0RWxlbWVudENlbnRlclBvc2l0aW9uJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvZG9tL2dldEVsZW1lbnRDZW50ZXJQb3NpdGlvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2xvYWRJbWFnZScsIGxpbms6ICcvdXRpbHMvZG9tL2xvYWRJbWFnZScgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnbWVkaWFBdXRvcGxheVBvbGljaWVzJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvZG9tL21lZGlhQXV0b3BsYXlQb2xpY2llcydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdUaW1lIFV0aWxzJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnY29udmVydFNlY29uZFRvT3RoZXJUaW1lJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvdGltZS9jb252ZXJ0U2Vjb25kVG9PdGhlclRpbWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6ICdkYXlPZlllYXInLCBsaW5rOiAnL3V0aWxzL3RpbWUvZGF5T2ZZZWFyJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2Zvcm1hdFNlY29uZCcsIGxpbms6ICcvdXRpbHMvdGltZS9mb3JtYXRTZWNvbmQnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnZm9ybWF0VGltZScsIGxpbms6ICcvdXRpbHMvdGltZS9mb3JtYXRUaW1lJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2lzVG9kYXknLCBsaW5rOiAnL3V0aWxzL3RpbWUvaXNUb2RheScgfSxcclxuICAgICAgICB7IHRleHQ6ICdsb2NhbEZvcm1hdCcsIGxpbms6ICcvdXRpbHMvdGltZS9sb2NhbEZvcm1hdCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdzZWNvbmQyRGF5JywgbGluazogJy91dGlscy90aW1lL3NlY29uZDJEYXknIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0lzIFV0aWxzJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6ICdpc0FycmF5JywgbGluazogJy91dGlscy9pcy9pc0FycmF5JyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2lzQnJvd3NlcicsIGxpbms6ICcvdXRpbHMvaXMvaXNCcm93c2VyJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2lzRnVuY3Rpb24nLCBsaW5rOiAnL3V0aWxzL2lzL2lzRnVuY3Rpb24nIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnaXNNb2JpbGUnLCBsaW5rOiAnL3V0aWxzL2lzL2lzTW9iaWxlJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2lzTm9kZScsIGxpbms6ICcvdXRpbHMvaXMvaXNOb2RlJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2lzT2JqZWN0JywgbGluazogJy91dGlscy9pcy9pc09iamVjdCcgfSxcclxuICAgICAgICB7IHRleHQ6ICdpc1Byb21pc2UnLCBsaW5rOiAnL3V0aWxzL2lzL2lzUHJvbWlzZScgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnQnJvd3NlciBVdGlscycsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ2NoYW5nZVVybEJ5UGFyYW1zJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvYnJvd3Nlci9jaGFuZ2VVcmxCeVBhcmFtcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdGV4dDogJ2dldEJyb3dzZXJJbmZvJywgbGluazogJy91dGlscy9icm93c2VyL2dldEJyb3dzZXJJbmZvJyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdnZXRVUkxTZWFyY2hQYXJhbXMnLFxyXG4gICAgICAgICAgbGluazogJy91dGlscy9icm93c2VyL2dldFVSTFNlYXJjaFBhcmFtcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdGV4dDogJ3VwbG9hZEZpbGUnLCBsaW5rOiAnL3V0aWxzL2Jyb3dzZXIvdXBsb2FkRmlsZScgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnUGxhdGZvcm0gVXRpbHMnLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdkaXN0aW5ndWlzaFBsYXRmb3JtJyxcclxuICAgICAgICAgIGxpbms6ICcvdXRpbHMvcGxhdGZvcm0vZGlzdGluZ3Vpc2hQbGF0Zm9ybSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdkaXN0aW5ndWlzaFBsYXRmb3JtRGVsYXknLFxyXG4gICAgICAgICAgbGluazogJy91dGlscy9wbGF0Zm9ybS9kaXN0aW5ndWlzaFBsYXRmb3JtRGVsYXknXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnT2JzZXJ2ZXIgVXRpbHMnLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdjcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcicsXHJcbiAgICAgICAgICBsaW5rOiAnL3V0aWxzL2ludGVyc2VjdGlvbk9ic2VydmVyL2NyZWF0ZUludGVyc2VjdGlvbk9ic2VydmVyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ2VsZW1lbnRJc0luVmlld3BvcnQnLFxyXG4gICAgICAgICAgbGluazogJy91dGlscy9pbnRlcnNlY3Rpb25PYnNlcnZlci9lbGVtZW50SXNJblZpZXdwb3J0J1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ090aGVyIFV0aWxzJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnY2hhbmdlVGhlbWVDbGlwUGF0aENpcmNsZScsXHJcbiAgICAgICAgICBsaW5rOiAnL3V0aWxzL2NoYW5nZVRoZW1lQ2xpcFBhdGhDaXJjbGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6ICdjbGVhckFzeW5jQ29udGFnaW9uJywgbGluazogJy91dGlscy9jbGVhckFzeW5jQ29udGFnaW9uJyB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gICcvcGx1Z2lucy8nOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdWaXRlXHU2M0QyXHU0RUY2JyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgaXRlbXM6IFt7IHRleHQ6ICdhdXRvUm91dGVyJywgbGluazogJy9wbHVnaW5zL2F1dG9Sb3V0ZXInIH1dXHJcbiAgICB9XHJcbiAgXSxcclxuICAnL2V4YW1wbGVzLyc6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0V4YW1wbGVzJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6ICdNYXJrZG93biBFeGFtcGxlcycsIGxpbms6ICcvZXhhbXBsZXMvbWFya2Rvd24tZXhhbXBsZXMnIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnUnVudGltZSBBUEkgRXhhbXBsZXMnLCBsaW5rOiAnL2V4YW1wbGVzL2FwaS1leGFtcGxlcycgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcQ29kZVxcXFxwcml2YXRlXFxcXG9uby1kb2N1bWVudFxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ29kZVxcXFxwcml2YXRlXFxcXG9uby1kb2N1bWVudFxcXFx1dGlsc1xcXFxzb2NpYWxMaW5rcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9wcml2YXRlL29uby1kb2N1bWVudC91dGlscy9zb2NpYWxMaW5rcy50c1wiO2ltcG9ydCB7IERlZmF1bHRUaGVtZSB9IGZyb20gJ3ZpdGVwcmVzcydcclxuXHJcbmV4cG9ydCBjb25zdCBzb2NpYWxMaW5rczogRGVmYXVsdFRoZW1lLlNvY2lhbExpbmtbXSA9IFtcclxuICB7XHJcbiAgICBpY29uOiB7XHJcbiAgICAgIHN2ZzogJzxzdmcgdD1cIjE3MjQwODA5MzAzNjNcIiBjbGFzcz1cImljb25cIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgcC1pZD1cIjUwOTJcIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjUxMlwiPjxwYXRoIGQ9XCJNNTEyIDEwMjRDMjI5LjIyMiAxMDI0IDAgNzk0Ljc3OCAwIDUxMlMyMjkuMjIyIDAgNTEyIDBzNTEyIDIyOS4yMjIgNTEyIDUxMi0yMjkuMjIyIDUxMi01MTIgNTEyeiBtMjU5LjE0OS01NjguODgzaC0yOTAuNzRhMjUuMjkzIDI1LjI5MyAwIDAgMC0yNS4yOTIgMjUuMjkzbC0wLjAyNiA2My4yMDZjMCAxMy45NTIgMTEuMzE1IDI1LjI5MyAyNS4yNjcgMjUuMjkzaDE3Ny4wMjRjMTMuOTc4IDAgMjUuMjkzIDExLjMxNSAyNS4yOTMgMjUuMjY3djEyLjY0NmE3NS44NTMgNzUuODUzIDAgMCAxLTc1Ljg1MyA3NS44NTNoLTI0MC4yM2EyNS4yOTMgMjUuMjkzIDAgMCAxLTI1LjI2Ny0yNS4yOTNWNDE3LjIwM2E3NS44NTMgNzUuODUzIDAgMCAxIDc1LjgyNy03NS44NTNoMzUzLjk0NmEyNS4yOTMgMjUuMjkzIDAgMCAwIDI1LjI2Ny0yNS4yOTJsMC4wNzctNjMuMjA3YTI1LjI5MyAyNS4yOTMgMCAwIDAtMjUuMjY4LTI1LjI5M0g0MTcuMTUyYTE4OS42MiAxODkuNjIgMCAwIDAtMTg5LjYyIDE4OS42NDVWNzcxLjE1YzAgMTMuOTc3IDExLjMxNiAyNS4yOTMgMjUuMjk0IDI1LjI5M2gzNzIuOTRhMTcwLjY1IDE3MC42NSAwIDAgMCAxNzAuNjUtMTcwLjY1VjQ4MC4zODRhMjUuMjkzIDI1LjI5MyAwIDAgMC0yNS4yOTMtMjUuMjY3elwiIGZpbGw9XCIjQzcxRDIzXCIgcC1pZD1cIjUwOTNcIj48L3BhdGg+PC9zdmc+J1xyXG4gICAgfSxcclxuICAgIGxpbms6ICdodHRwczovL2dpdGVlLmNvbS9vbm94bSdcclxuICB9LFxyXG4gIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vb25veG0nIH1cclxuXVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsb0JBQW9COzs7QUNBN0MsSUFBTSxNQUFNO0FBQUEsRUFDblMsRUFBRSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsRUFDMUI7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSw0QkFBUSxNQUFNLG1CQUFtQjtBQUFBLE1BQ3pDLEVBQUUsTUFBTSxjQUFjLE1BQU0seUJBQXlCO0FBQUEsTUFDckQsRUFBRSxNQUFNLFNBQVMsTUFBTSx5QkFBeUI7QUFBQSxNQUNoRCxFQUFFLE1BQU0sU0FBUyxNQUFNLGdDQUFnQztBQUFBLE1BQ3ZELEVBQUUsTUFBTSxvQkFBVSxNQUFNLHNCQUFzQjtBQUFBLElBQ2hEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsRUFBRSxNQUFNLFlBQVksTUFBTSw4QkFBOEI7QUFDMUQ7OztBQ2RpUyxJQUFNLFVBQVU7QUFBQSxFQUMvUyxVQUFVO0FBQUEsSUFDUjtBQUFBLE1BQ0UsTUFBTTtBQUFBO0FBQUEsTUFFTixPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sNEJBQVEsTUFBTSxtQkFBbUI7QUFBQSxRQUN6QyxFQUFFLE1BQU0sMkJBQWlCLE1BQU0sbUJBQW1CO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVztBQUFBLElBQ1Q7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNMLEVBQUUsTUFBTSx1QkFBYSxNQUFNLHlCQUF5QjtBQUFBLFFBQ3BELEVBQUUsTUFBTSx5QkFBZSxNQUFNLHlCQUF5QjtBQUFBLFFBQ3RELEVBQUUsTUFBTSwrQkFBZ0IsTUFBTSwyQkFBMkI7QUFBQSxRQUN6RCxFQUFFLE1BQU0sNEJBQWEsTUFBTSx3QkFBd0I7QUFBQSxRQUNuRCxFQUFFLE1BQU0sdUNBQW1CLE1BQU0sNkJBQTZCO0FBQUEsUUFDOUQsRUFBRSxNQUFNLDRCQUFhLE1BQU0sd0JBQXdCO0FBQUEsUUFDbkQsRUFBRSxNQUFNLHVCQUFhLE1BQU0seUJBQXlCO0FBQUEsUUFDcEQsRUFBRSxNQUFNLCtCQUFnQixNQUFNLDJCQUEyQjtBQUFBLE1BQzNEO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNMLEVBQUUsTUFBTSx3Q0FBb0IsTUFBTSw0QkFBNEI7QUFBQSxRQUM5RCxFQUFFLE1BQU0sbUNBQWUsTUFBTSx3QkFBd0I7QUFBQSxRQUNyRCxFQUFFLE1BQU0sd0NBQW9CLE1BQU0sNkJBQTZCO0FBQUEsUUFDL0QsRUFBRSxNQUFNLGdDQUFpQixNQUFNLDJCQUEyQjtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBO0FBQUEsUUFFQSxFQUFFLE1BQU0sa0RBQW9CLE1BQU0seUJBQXlCO0FBQUEsUUFDM0QsRUFBRSxNQUFNLHVCQUFhLE1BQU0sc0JBQXNCO0FBQUEsUUFDakQsRUFBRSxNQUFNLGlDQUFhLE1BQU0sb0JBQW9CO0FBQUEsUUFDL0MsRUFBRSxNQUFNLG9DQUFnQixNQUFNLHVCQUF1QjtBQUFBLFFBQ3JELEVBQUUsTUFBTSxzQkFBWSxNQUFNLHFCQUFxQjtBQUFBLFFBQy9DLEVBQUUsTUFBTSwyQkFBaUIsTUFBTSwwQkFBMEI7QUFBQSxRQUN6RCxFQUFFLE1BQU0sb0NBQWdCLE1BQU0sdUJBQXVCO0FBQUEsUUFDckQsRUFBRSxNQUFNLDZDQUFvQixNQUFNLDBCQUEwQjtBQUFBO0FBQUEsUUFFNUQ7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUE7QUFBQSxRQUVBLEVBQUUsTUFBTSxvQ0FBZ0IsTUFBTSx1QkFBdUI7QUFBQSxNQUN2RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxXQUFXO0FBQUEsSUFDVDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTyxDQUFDLEVBQUUsTUFBTSxzQkFBc0IsTUFBTSw0QkFBNEIsQ0FBQztBQUFBLElBQzNFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVztBQUFBLElBQ1Q7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSx5QkFBeUI7QUFBQSxRQUMxRCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sc0JBQXNCO0FBQUEsUUFDcEQsRUFBRSxNQUFNLFlBQVksTUFBTSxrQkFBa0I7QUFBQSxRQUM1QyxFQUFFLE1BQU0sb0JBQW9CLE1BQU0sMEJBQTBCO0FBQUE7QUFBQSxRQUU1RCxFQUFFLE1BQU0scUJBQXFCLE1BQU0sMkJBQTJCO0FBQUEsUUFDOUQsRUFBRSxNQUFNLGlCQUFpQixNQUFNLHVCQUF1QjtBQUFBLFFBQ3RELEVBQUUsTUFBTSxlQUFlLE1BQU0scUJBQXFCO0FBQUEsUUFDbEQsRUFBRSxNQUFNLGVBQWUsTUFBTSxxQkFBcUI7QUFBQSxRQUNsRCxFQUFFLE1BQU0sWUFBWSxNQUFNLGtCQUFrQjtBQUFBLFFBQzVDLEVBQUUsTUFBTSxlQUFlLE1BQU0scUJBQXFCO0FBQUE7QUFBQSxNQUVwRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxXQUFXO0FBQUEsSUFDVDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxXQUFXO0FBQUEsSUFDVDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLHFCQUFxQixNQUFNLGtDQUFrQztBQUFBLFFBQ3JFO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0EsRUFBRSxNQUFNLG1CQUFtQixNQUFNLGdDQUFnQztBQUFBLFFBQ2pFLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSxnQ0FBZ0M7QUFBQSxRQUNqRSxFQUFFLE1BQU0sWUFBWSxNQUFNLHlCQUF5QjtBQUFBLFFBQ25ELEVBQUUsTUFBTSxTQUFTLE1BQU0sc0JBQXNCO0FBQUEsUUFDN0MsRUFBRSxNQUFNLFlBQVksTUFBTSx5QkFBeUI7QUFBQSxRQUNuRCxFQUFFLE1BQU0sWUFBWSxNQUFNLHlCQUF5QjtBQUFBLFFBQ25ELEVBQUUsTUFBTSxrQkFBa0IsTUFBTSwrQkFBK0I7QUFBQSxRQUMvRDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSxXQUFXLE1BQU0sd0JBQXdCO0FBQUEsUUFDakQsRUFBRSxNQUFNLE9BQU8sTUFBTSxvQkFBb0I7QUFBQSxRQUN6QyxFQUFFLE1BQU0saUJBQWlCLE1BQU0sOEJBQThCO0FBQUEsUUFDN0Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQSxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sNkJBQTZCO0FBQUEsUUFDM0QsRUFBRSxNQUFNLG9CQUFvQixNQUFNLGlDQUFpQztBQUFBLFFBQ25FLEVBQUUsTUFBTSxZQUFZLE1BQU0seUJBQXlCO0FBQUEsUUFDbkQ7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQSxFQUFFLE1BQU0saUJBQWlCLE1BQU0sOEJBQThCO0FBQUEsUUFDN0QsRUFBRSxNQUFNLGNBQWMsTUFBTSwyQkFBMkI7QUFBQSxRQUN2RCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sNkJBQTZCO0FBQUEsUUFDM0QsRUFBRSxNQUFNLGVBQWUsTUFBTSw0QkFBNEI7QUFBQSxRQUN6RCxFQUFFLE1BQU0sV0FBVyxNQUFNLHdCQUF3QjtBQUFBLFFBQ2pELEVBQUUsTUFBTSxjQUFjLE1BQU0sMkJBQTJCO0FBQUEsUUFDdkQsRUFBRSxNQUFNLG9CQUFvQixNQUFNLGlDQUFpQztBQUFBLFFBQ25FLEVBQUUsTUFBTSxhQUFhLE1BQU0sMEJBQTBCO0FBQUEsUUFDckQsRUFBRSxNQUFNLFlBQVksTUFBTSx5QkFBeUI7QUFBQSxRQUNuRCxFQUFFLE1BQU0sY0FBYyxNQUFNLDJCQUEyQjtBQUFBLFFBQ3ZELEVBQUUsTUFBTSxhQUFhLE1BQU0sMEJBQTBCO0FBQUEsUUFDckQsRUFBRSxNQUFNLGVBQWUsTUFBTSw0QkFBNEI7QUFBQSxRQUN6RCxFQUFFLE1BQU0sY0FBYyxNQUFNLDJCQUEyQjtBQUFBLFFBQ3ZELEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSw2QkFBNkI7QUFBQSxRQUMzRCxFQUFFLE1BQU0sYUFBYSxNQUFNLDBCQUEwQjtBQUFBLFFBQ3JELEVBQUUsTUFBTSxhQUFhLE1BQU0sMEJBQTBCO0FBQUEsUUFDckQsRUFBRSxNQUFNLGdCQUFnQixNQUFNLDZCQUE2QjtBQUFBLFFBQzNELEVBQUUsTUFBTSxvQkFBb0IsTUFBTSxpQ0FBaUM7QUFBQSxRQUNuRSxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sNkJBQTZCO0FBQUEsUUFDM0QsRUFBRSxNQUFNLGFBQWEsTUFBTSwwQkFBMEI7QUFBQSxRQUNyRCxFQUFFLE1BQU0sWUFBWSxNQUFNLHlCQUF5QjtBQUFBLFFBQ25ELEVBQUUsTUFBTSxlQUFlLE1BQU0sNEJBQTRCO0FBQUEsTUFDM0Q7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLGVBQWUsTUFBTSwyQkFBMkI7QUFBQSxRQUN4RCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sK0JBQStCO0FBQUEsUUFDaEUsRUFBRSxNQUFNLGVBQWUsTUFBTSwyQkFBMkI7QUFBQSxRQUN4RCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sNEJBQTRCO0FBQUEsUUFDMUQsRUFBRSxNQUFNLG9CQUFvQixNQUFNLGdDQUFnQztBQUFBLFFBQ2xFLEVBQUUsTUFBTSxhQUFhLE1BQU0seUJBQXlCO0FBQUEsUUFDcEQsRUFBRSxNQUFNLFdBQVcsTUFBTSx1QkFBdUI7QUFBQSxRQUNoRCxFQUFFLE1BQU0sV0FBVyxNQUFNLHVCQUF1QjtBQUFBLFFBQ2hELEVBQUUsTUFBTSxXQUFXLE1BQU0sdUJBQXVCO0FBQUEsUUFDaEQsRUFBRSxNQUFNLFdBQVcsTUFBTSx1QkFBdUI7QUFBQSxRQUNoRCxFQUFFLE1BQU0sV0FBVyxNQUFNLHVCQUF1QjtBQUFBLFFBQ2hELEVBQUUsTUFBTSxXQUFXLE1BQU0sdUJBQXVCO0FBQUEsUUFDaEQsRUFBRSxNQUFNLFdBQVcsTUFBTSx1QkFBdUI7QUFBQSxRQUNoRCxFQUFFLE1BQU0sV0FBVyxNQUFNLHVCQUF1QjtBQUFBLFFBQ2hELEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSw0QkFBNEI7QUFBQSxRQUMxRCxFQUFFLE1BQU0sZUFBZSxNQUFNLDJCQUEyQjtBQUFBLFFBQ3hELEVBQUUsTUFBTSxXQUFXLE1BQU0sdUJBQXVCO0FBQUEsUUFDaEQsRUFBRSxNQUFNLFdBQVcsTUFBTSx1QkFBdUI7QUFBQSxRQUNoRCxFQUFFLE1BQU0sV0FBVyxNQUFNLHVCQUF1QjtBQUFBLFFBQ2hELEVBQUUsTUFBTSxZQUFZLE1BQU0sd0JBQXdCO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLGdCQUFnQixNQUFNLDJCQUEyQjtBQUFBLFFBQ3pELEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSwyQkFBMkI7QUFBQSxRQUN6RCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sMkJBQTJCO0FBQUEsUUFDekQsRUFBRSxNQUFNLGNBQWMsTUFBTSx5QkFBeUI7QUFBQSxRQUNyRCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sMkJBQTJCO0FBQUEsUUFDekQsRUFBRSxNQUFNLGdCQUFnQixNQUFNLDJCQUEyQjtBQUFBLFFBQ3pELEVBQUUsTUFBTSxjQUFjLE1BQU0seUJBQXlCO0FBQUEsUUFDckQsRUFBRSxNQUFNLGtCQUFrQixNQUFNLDZCQUE2QjtBQUFBLFFBQzdELEVBQUUsTUFBTSxlQUFlLE1BQU0sMEJBQTBCO0FBQUEsUUFDdkQsRUFBRSxNQUFNLGlCQUFpQixNQUFNLDRCQUE0QjtBQUFBLFFBQzNELEVBQUUsTUFBTSxZQUFZLE1BQU0sdUJBQXVCO0FBQUEsUUFDakQsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDhCQUE4QjtBQUFBLFFBQy9ELEVBQUUsTUFBTSxlQUFlLE1BQU0sMEJBQTBCO0FBQUEsUUFDdkQsRUFBRSxNQUFNLGFBQWEsTUFBTSx3QkFBd0I7QUFBQSxRQUNuRCxFQUFFLE1BQU0sYUFBYSxNQUFNLHdCQUF3QjtBQUFBLE1BQ3JEO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQSxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sMEJBQTBCO0FBQUEsUUFDeEQsRUFBRSxNQUFNLGlCQUFpQixNQUFNLDJCQUEyQjtBQUFBLFFBQzFELEVBQUUsTUFBTSxtQkFBbUIsTUFBTSw2QkFBNkI7QUFBQSxRQUM5RDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSxhQUFhLE1BQU0sdUJBQXVCO0FBQUEsUUFDbEQ7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSxhQUFhLE1BQU0sd0JBQXdCO0FBQUEsUUFDbkQsRUFBRSxNQUFNLGdCQUFnQixNQUFNLDJCQUEyQjtBQUFBLFFBQ3pELEVBQUUsTUFBTSxjQUFjLE1BQU0seUJBQXlCO0FBQUEsUUFDckQsRUFBRSxNQUFNLFdBQVcsTUFBTSxzQkFBc0I7QUFBQSxRQUMvQyxFQUFFLE1BQU0sZUFBZSxNQUFNLDBCQUEwQjtBQUFBLFFBQ3ZELEVBQUUsTUFBTSxjQUFjLE1BQU0seUJBQXlCO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLFdBQVcsTUFBTSxvQkFBb0I7QUFBQSxRQUM3QyxFQUFFLE1BQU0sYUFBYSxNQUFNLHNCQUFzQjtBQUFBLFFBQ2pELEVBQUUsTUFBTSxjQUFjLE1BQU0sdUJBQXVCO0FBQUEsUUFDbkQsRUFBRSxNQUFNLFlBQVksTUFBTSxxQkFBcUI7QUFBQSxRQUMvQyxFQUFFLE1BQU0sVUFBVSxNQUFNLG1CQUFtQjtBQUFBLFFBQzNDLEVBQUUsTUFBTSxZQUFZLE1BQU0scUJBQXFCO0FBQUEsUUFDL0MsRUFBRSxNQUFNLGFBQWEsTUFBTSxzQkFBc0I7QUFBQSxNQUNuRDtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSxrQkFBa0IsTUFBTSxnQ0FBZ0M7QUFBQSxRQUNoRTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSxjQUFjLE1BQU0sNEJBQTRCO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSx1QkFBdUIsTUFBTSw2QkFBNkI7QUFBQSxNQUNwRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsT0FBTyxDQUFDLEVBQUUsTUFBTSxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFBQSxJQUM3RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0scUJBQXFCLE1BQU0sOEJBQThCO0FBQUEsUUFDakUsRUFBRSxNQUFNLHdCQUF3QixNQUFNLHlCQUF5QjtBQUFBLE1BQ2pFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FDaFVPLElBQU0sY0FBeUM7QUFBQSxFQUNwRDtBQUFBLElBQ0UsTUFBTTtBQUFBLE1BQ0osS0FBSztBQUFBLElBQ1A7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxFQUFFLE1BQU0sVUFBVSxNQUFNLDJCQUEyQjtBQUNyRDs7O0FITkEsSUFBTyxpQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBO0FBQUEsRUFHTixNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0seUJBQXlCLENBQUMsQ0FBQztBQUFBLEVBQ2hFLGFBQWE7QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFBQTtBQUFBLElBRWQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNQLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxZQUNOLFlBQVk7QUFBQSxZQUNaLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsVUFDQSxPQUFPO0FBQUEsWUFDTCxlQUFlO0FBQUEsWUFDZixrQkFBa0I7QUFBQSxZQUNsQixRQUFRO0FBQUEsY0FDTixZQUFZO0FBQUEsY0FDWixjQUFjO0FBQUEsY0FDZCxXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
