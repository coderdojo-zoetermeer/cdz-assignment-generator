#!/usr/bin/env node

import { program } from "commander";
import logger from "gulplog";
import * as gulpfile from "../gulpfile.js";
import fs from "fs";
import Handlebars from "handlebars";
import liveServer from "live-server";

logger.on("info", (message) => {
  console.log(message);
});

logger.on("error", (message) => {
  console.error(message);
});

program
  .name("cdz-gen")
  .description("Generates HTML files for CoderDojo assignments")
  .version("1.0.0");

program
  .command("build")
  .description("Builds the assignments")
  .action(() => {
    gulpfile.build();
  });

program
  .command("server")
  .option("-p, --port <port>", "Port to run the server on", "8181")
  .option("-n , --no-browser-open", "Do not open the browser")
  .description(
    "Builds the assignments and watches for changes and rebuilds assignments." +
      " Also starts a local server to serve the generated files.",
  )
  .action((args) => {
    gulpfile.server();

    liveServer.start({
      port: Number(args.port),
      host: "0.0.0.0",
      root: "./docs",
      open: args.browserOpen,
      wait: 1000,
      logLevel: 2,
      middleware: [
        function (req, res, next) {
          next();
        },
      ],
    });
  });

program
  .command("gen-assignment")
  .description("Generates a new assignment file")
  .requiredOption("-n, --name <name>", "Name of the assignment")
  .option(
    "-p, --progLang <progLang>",
    "Programming language for the assignment",
    "scratch3",
  )
  .option("-t, --theme <theme>", "Theme for the assignment", "scratch")
  .action(async (args) => {
    const templatePath = `${import.meta.dirname}/../templates/assignment-template.hbs`;
    const outputPath = `${args.name}.md`;

    try {
      const templateContent = await fs.promises.readFile(templatePath, {
        encoding: "utf8",
      });
      const template = Handlebars.compile(templateContent);
      const output = template({...args});
      await fs.promises.writeFile(outputPath, output);
      console.log(
        `Assignment "${args.name}" generated successfully at ${outputPath}`,
      );
    } catch (e) {
      logger.error(e);
    }
  });

program.parse();
