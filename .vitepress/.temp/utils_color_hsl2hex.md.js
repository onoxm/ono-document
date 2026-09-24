import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"hsl2hex","description":"","frontmatter":{},"headers":[],"relativePath":"utils/color/hsl2hex.md","filePath":"utils/color/hsl2hex.md"}');
const _sfc_main = { name: "utils/color/hsl2hex.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="hsl2hex" tabindex="-1">hsl2hex <a class="header-anchor" href="#hsl2hex" aria-label="Permalink to &quot;hsl2hex&quot;">​</a></h1><p>把 <code>hsl</code> 颜色转换为十六进制，内部先转 <code>rgb</code> 再转 <code>hex</code>。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">hsl2hex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;hsl(0, 100%, 50%)&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;#ff0000&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">hsl2hex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;hsl(0, 0%, 100%)&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;#ffffff&#39;</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">参数</th><th style="${ssrRenderStyle({ "text-align": "left" })}">说明</th><th style="${ssrRenderStyle({ "text-align": "left" })}">类型</th><th style="${ssrRenderStyle({ "text-align": "left" })}">默认值</th><th style="${ssrRenderStyle({ "text-align": "left" })}">是否必填</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}">hsl</td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>hsl(...)</code> 颜色字符串</td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>string</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">-</td><td style="${ssrRenderStyle({ "text-align": "left" })}">是</td></tr></tbody></table><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li>等价于 <code>rgb2hex(hsl2rgb(hsl))</code>，返回的是 6 位不带透明度的十六进制。</li><li>因为中间经过了 <code>hsl2rgb</code> 的取整，往返转换（<code>hsl</code> → <code>hex</code> → <code>hsl</code>）不保证能还原成完全一样的数值。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("utils/color/hsl2hex.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const hsl2hex = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  hsl2hex as default
};
