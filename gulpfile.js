import { series, watch, src, dest } from "gulp";
import { readFile } from "node:fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { generateAssignment } from "./src/assignment-generator.js";
import liveServer from "live-server";
import minimist from "minimist";
import Vinyl from "vinyl";
import { Duplex } from "streamx";
import fs from "node:fs";
import logger from "gulplog";
import chalk from "chalk";

const templateDir = path.join(import.meta.dirname, "src", "templates");

const buildAssignments = () => {
  return src(["opdrachten/**/*.md"], {
    base: "opdrachten",
  })
    .pipe(
      new Duplex({
        open(cb) {
          this.assignmentList = [];
          cb();
        },
        async write(data, cb) {
          logger.info(`Processing '${chalk.cyan(data.relative)}'`);

          const assignment = await generateAssignment(data);

          this.assignmentList.push({
            path: assignment.targetPath.split(path.sep).join("/"),
            targetPath: assignment.targetPath,
            meta: assignment.meta,
          });

          for (const asset of assignment.assets) {
            this.push(
              new Vinyl({
                path: asset.targetPath,
                contents: fs.createReadStream(asset.sourcePath),
              }),
            );
          }

          this.push(
            new Vinyl({
              path: assignment.targetPath,
              contents: Buffer.from(assignment.output),
            }),
          );

          cb();
        },
        async final(cb) {
          const template = await readFile(`${templateDir}/index-template.hbs`, {
            encoding: "utf8",
          });

          const compiledTemplate = Handlebars.compile(template);

          const output = compiledTemplate({
            assignments: this.assignmentList,
          });

          this.push(
            new Vinyl({
              path: "index.html",
              contents: Buffer.from(output),
            }),
          );

          this.push(null); // EOF
          cb();
        },
      }),
    )
    .pipe(dest(path.join(process.cwd(), "docs")));
};

const copyTemplateAssets = async () => {
  src([path.join(templateDir, "template-assets/**/*")], {
    encoding: false,
    base: path.join(templateDir, "template-assets")
  }).pipe(dest("docs/template-assets"));
};

const watchTask = () => {
  const options = minimist(process.argv.slice(2), {
    string: ["port"],
    boolean: ["noOpen"],
    alias: { p: "port", n: "noOpen" },
    default: { port: 8181, noOpen: false },
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

export const build = series(buildAssignments, copyTemplateAssets);
build.description =
  "Build the assignment documentation and copy assets to the docs folder.";

export const server = series(build, watchTask);
server.description =
  "Runs a HTTP server with live-reload when a assignment changes";
server.flags = {
  '--port': 'The port to listen on. Default=8181',
  '--noOpen': 'Do not open the browser. Default: false'
};

export default build;
