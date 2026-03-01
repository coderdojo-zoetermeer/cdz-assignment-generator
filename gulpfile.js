import { series, watch, src, dest } from "gulp";
import vfs from "vinyl-fs";
import { readFile, writeFile } from "node:fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { generateAssignment } from "./src/assignment-generator.js";
import liveServer from "live-server";
import minimist from "minimist";

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
  const options = minimist(process.argv.slice(2), {
    string: ["port"],
    boolean: ["noOpen"],
    alias: { p: "port", n: "noOpen" },
    default: { port: 8181, "noOpen": false },
    unknown: () => false,
  });

  liveServer.start({
    port: options.port,
    host: "0.0.0.0",
    root: "./docs",
    open: !options.noOpen,
    wait: 1000,
    logLevel: 2,
    middleware: [
      function (req, res, next) {
        next();
      },
    ],
  });

  watch(["opdrachten/**/*", "templates/**/*", "global-lib/**/*"], build);
};
watchTask.description =
  "Watch for changes in the opdrachten, templates, and global-lib folders and rebuild the documentation.";

export const build = series(
  buildAssignments,
  copyTemplateAssets,
  copyIndexHtml,
);
build.description =
  "Build the assignment documentation and copy assets to the docs folder.";

export const server = series(build, watchTask);
export default build;
