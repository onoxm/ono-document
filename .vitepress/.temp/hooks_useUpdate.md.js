import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"useUpdate","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/useUpdate.md","filePath":"hooks/useUpdate.md"}');
const _sfc_main = { name: "hooks/useUpdate.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="useupdate" tabindex="-1">useUpdate <a class="header-anchor" href="#useupdate" aria-label="Permalink to &quot;useUpdate&quot;">​</a></h1><p>用于强行刷新状态的hook</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("hooks/useUpdate.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useUpdate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  useUpdate as default
};
