import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"rgb2hsv","description":"","frontmatter":{},"headers":[],"relativePath":"utils/color/rgb2hsv.md","filePath":"utils/color/rgb2hsv.md"}');
const _sfc_main = { name: "utils/color/rgb2hsv.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="rgb2hsv" tabindex="-1">rgb2hsv <a class="header-anchor" href="#rgb2hsv" aria-label="Permalink to &quot;rgb2hsv&quot;">​</a></h1><p>把 <code>rgb</code> 颜色转换为 <code>hsv</code> 格式。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">rgb2hsv</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;rgb(255, 0, 0)&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;hsv(0, 100, 100)&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">rgb2hsv</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;rgb(0, 0, 255)&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;hsv(240, 100, 100)&#39;</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">参数</th><th style="${ssrRenderStyle({ "text-align": "left" })}">说明</th><th style="${ssrRenderStyle({ "text-align": "left" })}">类型</th><th style="${ssrRenderStyle({ "text-align": "left" })}">默认值</th><th style="${ssrRenderStyle({ "text-align": "left" })}">是否必填</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}">rgb</td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>rgb(...)</code> 颜色字符串</td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>string</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">-</td><td style="${ssrRenderStyle({ "text-align": "left" })}">是</td></tr></tbody></table><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li>与 <code>rgb2hsl</code> 不同，这里的 H、S、V <strong>不做四舍五入</strong>，结果可能带小数（如 <code>hsv(359.99999999999994, 100, 100)</code>）。要拼字符串给外部用时自己处理小数位。</li><li><code>hsv(...)</code> 不是标准 CSS 颜色函数，这个格式主要适合在取色器、颜色选择面板里做数据传递。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("utils/color/rgb2hsv.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rgb2hsv = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  rgb2hsv as default
};
