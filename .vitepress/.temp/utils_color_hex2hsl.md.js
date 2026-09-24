import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"hex2hsl","description":"","frontmatter":{},"headers":[],"relativePath":"utils/color/hex2hsl.md","filePath":"utils/color/hex2hsl.md"}');
const _sfc_main = { name: "utils/color/hex2hsl.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="hex2hsl" tabindex="-1">hex2hsl <a class="header-anchor" href="#hex2hsl" aria-label="Permalink to &quot;hex2hsl&quot;">​</a></h1><p>把十六进制颜色转换为 <code>hsl</code> 格式，内部先转 <code>rgb</code> 再转 <code>hsl</code>。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">hex2hsl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;#ff0000&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;hsl(0, 100%, 50%)&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">hex2hsl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;#ffffff&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;hsl(0, 0%, 100%)&#39;</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">参数</th><th style="${ssrRenderStyle({ "text-align": "left" })}">说明</th><th style="${ssrRenderStyle({ "text-align": "left" })}">类型</th><th style="${ssrRenderStyle({ "text-align": "left" })}">默认值</th><th style="${ssrRenderStyle({ "text-align": "left" })}">是否必填</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}">hex</td><td style="${ssrRenderStyle({ "text-align": "left" })}">十六进制颜色，6 位</td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>string</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">-</td><td style="${ssrRenderStyle({ "text-align": "left" })}">是</td></tr></tbody></table><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li>等价于 <code>rgb2hsl(hex2rgb(hex))</code>，所以 <code>hex2rgb</code> 的限制同样适用：只接受 6 位写法，8 位带透明度的 hex 会被当成 6 位解析，得到错误结果。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("utils/color/hex2hsl.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const hex2hsl = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  hex2hsl as default
};
