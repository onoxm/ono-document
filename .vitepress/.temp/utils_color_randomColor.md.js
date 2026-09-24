import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"randomColor","description":"","frontmatter":{},"headers":[],"relativePath":"utils/color/randomColor.md","filePath":"utils/color/randomColor.md"}');
const _sfc_main = { name: "utils/color/randomColor.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="randomcolor" tabindex="-1">randomColor <a class="header-anchor" href="#randomcolor" aria-label="Permalink to &quot;randomColor&quot;">​</a></h1><p>生成一个随机的 6 位十六进制颜色值。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">randomColor</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">() </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;#f8e2e8&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">randomColor</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">() </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;#1a2b3c&#39;</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">返回值</th><th style="${ssrRenderStyle({ "text-align": "left" })}"><code>string</code></th></tr></thead></table><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li>基于 <code>Math.random</code>，<strong>不是加密安全的随机源</strong>；做随机主题色这类装饰性用途没问题，但不要用它生成需要不可预测的颜色标识。</li><li>返回值恒为 <code>#</code> 开头的 6 位十六进制（不足 6 位时右侧补 <code>0</code>），可以直接交给 CSS 解析。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("utils/color/randomColor.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const randomColor = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  randomColor as default
};
