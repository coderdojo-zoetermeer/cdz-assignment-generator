import MarkdownIt from "markdown-it";
import { readFile, writeFile } from "node:fs/promises";
import { snippet } from "@mdit/plugin-snippet";
import meta from "markdown-it-meta";
import Handlebars from "handlebars";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import path from "path";
import vfs from "vinyl-fs";
import map from "map-stream";
import { Writable } from "streamx";

hljs.registerLanguage("cpp", cpp);

const md = MarkdownIt({
  highlight: function (str, lang) {
    if (lang === "ino") {
      lang = "cpp";
    }
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
});
md.use(snippet, {
  currentPath: (env) => env.filePath,
});
md.use(meta);

function generate() {
  const writable = new Writable({
    async write(data, cb) {
      const template = await readFile("templates/template.html", {
        encoding: "utf8",
      });
      const compiledTemplate = Handlebars.compile(template);

      const result = md.render(data.contents.toString());

      const output = compiledTemplate({
        content: result,
        meta: md.meta,
        learningGoal: md.render(md.meta.learningGoal),
        skillsNeeded: md.render(md.meta.skillsNeeded),
      });

      await writeFile(`output/${path.parse(data.path).name}.html`, output);

      cb(null, output);
      cb();
    },
  });

  return writable;
}

// generate(
//   new Vinyl({
//     path: "src/opdracht 1.md",
//   }),
// );

// var log = function (file, cb) {
//   console.log(file.path);
//   cb(null, file);
// };

vfs.src(["src/**/*.md"]).pipe(generate());
vfs.src(["src/images/**"]).pipe(vfs.dest("output/images"));
