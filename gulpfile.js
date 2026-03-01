import { series, watch, src, dest } from "gulp";
import vfs from "vinyl-fs";
import { readFile, writeFile } from "node:fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { generateAssignment } from "./src/assignment-generator.js";

const templateDir = import.meta.dirname + "/templates";
let assignmentList = [];

const buildAssignments = () => {
  return new Promise((resolve, reject) => {
    assignmentList = [];
    const buildAssignmentsTask = vfs
      .src(["opdrachten/**/*.md"])
      .pipe(generateAssignment(assignmentList));

    buildAssignmentsTask
      .on("finish", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const copyIndexHtml = async () => {
  const template = await readFile(`${templateDir}/index-template.hbs`, {
    encoding: "utf8",
  });

  const compiledTemplate = Handlebars.compile(template);

  const output = compiledTemplate({
    assignments: assignmentList,
  });

  await writeFile(path.join(process.cwd(), "docs", "index.html"), output);
};

const copyTemplateAssets = async () => {
  return new Promise((resolve, reject) => {
    src([path.join(templateDir, "template-assets", "**/*")], {
      encoding: false,
    })
      .pipe(dest("docs/template-assets"))
      .on("finish", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const watchTask = () => {
  watch(["opdrachten/**/*", "templates/**/*", "global-lib/**/*"], build);
};

export const build = series(
  buildAssignments,
  copyTemplateAssets,
  copyIndexHtml,
);

export const watchChanges = series(watchTask);
