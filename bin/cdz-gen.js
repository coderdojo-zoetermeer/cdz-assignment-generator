#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import Handlebars from "handlebars";
import { execSync } from "child_process";

program
  .name("cdz-gen")
  .description("Generates HTML files for CoderDojo assignments")
  .version("1.0.0");

program
  .command("build")
  .description("Builds the assignments")
  .action(async () => {
    execSync("npx gulp -LLL build", {
      stdio: "inherit",
    });
  });

program
  .command("server")
  .option("-p, --port <port>", "Port to run the server on", "8181")
  .option("-n , --no-browser-open", "Do not open the browser")
  .description(
    "Builds the assignments and watches for changes and rebuilds assignments." +
      " Also starts a local server to serve the generated files.",
  )
  .action(async (args) => {
    execSync(
      `npx gulp -LLL server -p ${args.port} ${!args.browserOpen ? "-n" : ""}`,
      {
        stdio: "inherit",
      },
    );
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
      const output = template({ ...args });
      await fs.promises.writeFile(outputPath, output);
      console.log(
        `Assignment "${args.name}" generated successfully at ${outputPath}`,
      );
    } catch (e) {
      logger.error(e);
    }
  });

program.parse();
