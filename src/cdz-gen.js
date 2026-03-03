#!/usr/bin/env node

import { program, Option } from "commander";
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
  .command("assignment")
  .description("Generates a new assignment markdown file")
  .addOption(
    new Option(
      "-n, --name <name>",
      "Name of the assignment",
    ).makeOptionMandatory(),
  )
  .addOption(
    new Option(
      "-p, --progLang <progLang>",
      "Programming language for the assignment",
      "scratch3",
    ).choices(["scratch1", "scratch2", "scratch3", "python", "arduino"]),
  )
  .addOption(
    new Option(
      "-t, --theme <theme>",
      "Theme for the assignment",
      "scratch",
    ).choices(["scratch", "python", "arduino", "generic"]),
  )
  .addOption(
    new Option("-a, --author <author>", "The author of the assignment", "-"),
  )
  .action(async (args) => {
    const templatePath = `${import.meta.dirname}/templates/assignment-template.hbs`;
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
