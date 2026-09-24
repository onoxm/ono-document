import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"randomString","description":"","frontmatter":{},"headers":[],"relativePath":"utils/common/randomString.md","filePath":"utils/common/randomString.md"}');
const _sfc_main = { name: "utils/common/randomString.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="randomstring" tabindex="-1">randomString <a class="header-anchor" href="#randomstring" aria-label="Permalink to &quot;randomString&quot;">​</a></h1><p>生成指定长度的随机字符串，字符取自大小写字母和数字。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">randomString</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">8</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// &#39;3QS8eZWa&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">randomString</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">() </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// 默认 16 位</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">参数</th><th style="${ssrRenderStyle({ "text-align": "left" })}">说明</th><th style="${ssrRenderStyle({ "text-align": "left" })}">类型</th><th style="${ssrRenderStyle({ "text-align": "left" })}">默认值</th><th style="${ssrRenderStyle({ "text-align": "left" })}">是否必填</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}">len</td><td style="${ssrRenderStyle({ "text-align": "left" })}">生成的字符串长度</td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>number</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>16</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">否</td></tr></tbody></table><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li><code>len &lt;= 0</code> 时返回空字符串。</li><li>基于 <code>Math.random</code>，<strong>不适合用作密钥、令牌等安全场景</strong>，需要加密强度的随机值请用 <code>crypto.getRandomValues</code>。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("utils/common/randomString.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const randomString = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  randomString as default
};
