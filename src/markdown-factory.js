import MarkdownIt from "markdown-it";
import meta from "markdown-it-meta";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import path from "path";
import markdownItAttrs from "markdown-it-attrs";
import { snippet } from "@mdit/plugin-snippet";
import { icon, fontawesomeRender } from "@mdit/plugin-icon";
import { imgSize } from "@mdit/plugin-img-size";
import { uml } from "@mdit/plugin-uml";
import { mark } from "@mdit/plugin-mark";
import { container } from "@mdit/plugin-container";
import { demo } from "@mdit/plugin-demo";
import { stylize } from "@mdit/plugin-stylize";
import { include } from "@mdit/plugin-include";
import { katex } from "@mdit/plugin-katex";
import { tab } from "@mdit/plugin-tab";

hljs.registerLanguage("c", cpp);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("ino", cpp);
hljs.registerLanguage("py", python);

export function createMarkdownRenderer() {
  const md = MarkdownIt({
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang, ignoreIllegals: false })
            .value;
        } catch (__) {}
      }

      return "";
    },
  });
  md.use(snippet, {
    currentPath: (env) => env.currentMdFilePath,
    resolvePath: (filePath, currentPath) => {
      const pathParts = filePath.split(path.sep);
      if (pathParts[0].indexOf("global-") === 0) {
        return path.resolve(import.meta.dirname, filePath);
      } else {
        return path.resolve(currentPath, filePath);
      }
    },
  });
  md.use(include, {
    currentPath: (env) => env.currentMdFilePath,
    resolvePath: (filePath, currentPath) => {
      const pathParts = filePath.split(path.sep);
      if (pathParts[0].indexOf("global-") === 0) {
        return path.resolve(import.meta.dirname, filePath);
      } else {
        return path.resolve(currentPath, filePath);
      }
    },
    deep: true,
  });
  md.use(meta);
  md.use(katex);
  md.use(imgSize);
  md.use(markdownItAttrs);
  md.use(icon, {
    render: fontawesomeRender,
  });
  md.use(mark);
  const containerCloseRender = (tokens, index, options, _env, slf) =>
    '<div class="clear-float"></div></div>';

  md.use(container, {
    name: "challenge",
    closeRender: containerCloseRender,
  });
  md.use(container, {
    name: "codeblock",
    closeRender: containerCloseRender,
  });
  md.use(container, {
    name: "read",
    closeRender: containerCloseRender,
  });
  md.use(container, {
    name: "build",
    closeRender: containerCloseRender,
  });
  md.use(container, {
    name: "program",
    closeRender: containerCloseRender,
  });
  md.use(demo, {
    showCodeFirst: true,
  });
  md.use(stylize, {
    config: [
      {
        matcher: "pagebreak",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "div",
              attrs: { class: "pagebreak" },
              content: "",
            };
        },
      },
      {
        matcher: "clear-float",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "div",
              attrs: { class: "clear-float" },
              content: "",
            };
        },
      },
    ],
  });
  md.use(tab, {
    name: "tabs",
  });

  const ruleProxy = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options);

  const defaultHrRenderer = md.renderer.hr || ruleProxy;

  md.renderer.rules.hr = (tokens, idx, options, env, self) => {
    if (tokens[idx].markup[0] === "-") {
      tokens[idx].attrJoin("class", "separator-thin");
    } else if (tokens[idx].markup[0] === "_") {
      tokens[idx].attrJoin("class", "separator-hidden");
    } else if (tokens[idx].markup[0] === "*") {
      tokens[idx].attrJoin("class", "separator-fat");
    }

    return defaultHrRenderer(tokens, idx, options, env, self);
  };

  const defaultLinkRenderer = md.renderer.image || ruleProxy;

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    env.usedAssets.push({
      src: tokens[idx].attrGet("src"),
      includedPaths: [...(env.includedPaths || [])],
    });

    return defaultLinkRenderer(tokens, idx, options, env, self);
  };

  return md;
}
