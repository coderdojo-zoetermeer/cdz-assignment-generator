import { series, watch } from "gulp";
import vfs from "vinyl-fs";
import MarkdownIt from "markdown-it";
import { readFile, writeFile } from "node:fs/promises";
import meta from "markdown-it-meta";
import Handlebars from "handlebars";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import path from "path";
import { Writable } from "streamx";
import logger from "gulplog";
import markdownItAttrs from "markdown-it-attrs";
import { snippet } from "@mdit/plugin-snippet";
import { icon, fontawesomeRender } from "@mdit/plugin-icon";
import { imgSize } from "@mdit/plugin-img-size";
import { uml } from "@mdit/plugin-uml";
import { mark } from "@mdit/plugin-mark";
import { container } from "@mdit/plugin-container";
import { demo } from "@mdit/plugin-demo";

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("ino", cpp);
hljs.registerLanguage("py", python);

const md = MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true })
          .value;
      } catch (__) {}
    }

    return "";
  },
});
md.use(snippet, {
  currentPath: (env) => env.filePath,
});
md.use(meta);
md.use(imgSize);
md.use(markdownItAttrs);
md.use(icon, {
  render: fontawesomeRender,
});
md.use(mark);
md.use(container, { name: "challenge" });
md.use(container, { name: "codeblock" });
md.use(demo);

Handlebars.registerHelper(
  "renderMarkdown",
  function (object, propertyName, defaultValue, options) {
    return md.render(object.toString());
  },
);

function generateAssignment() {
  const writable = new Writable({
    async write(data, cb) {
      try {
        logger.info("compiling " + data.path);

        const result = md.render(data.contents.toString());

        const templateName = md.meta.template || "default";
        const template = await readFile(
          `templates/template-${templateName}.hbs`,
          {
            encoding: "utf8",
          },
        );
        const compiledTemplate = Handlebars.compile(template);

        const output = compiledTemplate({
          content: result,
          meta: md.meta,
          templateAssetFolder: "/template-assets",
        });

        const pathInfo = path.parse(data.path);
        const targetPath = path.join(pathInfo.dir, pathInfo.name + '.html');
        await writeFile(targetPath, output);

        cb(null, output);
      } catch (e) {
        logger.error(e);
      }
    },
  });

  return writable;
}

export function buildAssignments(cb) {
  const buildAssignmentsTask = vfs
    .src(["src/**/*.md"])
    .pipe(generateAssignment());

  buildAssignmentsTask.on("finish", () => {
    cb();
  });
}

export function watchTask(cb) {
  const watcher = watch("src/**/*.md");

  watcher.on("change", (path) => {
    vfs.src(path).pipe(generateAssignment());
  });
}

export const build = series(buildAssignments);
export const buildWatch = series(build, watchTask);
