import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { Writable } from "streamx";
import logger from "gulplog";
import { createMarkdownRenderer } from "./markdown-factory.js";
import { stat } from "node:fs/promises";

const templateDir = path.join(import.meta.dirname, "../templates");

// Helper to check the existence of a file. Replaces deprecated "exists" in
// node:fs with a custom implementation using stat.
async function exists(f) {
  try {
    await stat(f);
    return true;
  } catch {
    return false;
  }
}

export function generateAssignment(assignmentList) {
  const writable = new Writable({
    async write(data, cb) {
      try {
        logger.info("compiling " + data.path);

        const md = createMarkdownRenderer();

        var assignmentHandlebars = Handlebars.create();

        assignmentHandlebars.registerHelper(
          "renderMarkdown",
          function (object, propertyName, defaultValue, options) {
            return md.render(object.toString());
          },
        );

        const pathInfo = path.parse(data.path);
        const pathInWorkspace = path
          .relative(process.cwd(), data.path)
          .split(path.sep);
        const targetDir = path.join(
          process.cwd(),
          "docs",
          ...pathInWorkspace.slice(1, -1),
        );
        const relativeTargetPath = path.join(...pathInWorkspace.slice(1, -1));

        const env = {
          usedAssets: [],
          currentMdFilePath: data.path,
        };
        const result = md.render(data.contents.toString(), env);

        const templateName = md.meta.template || "default";
        const template = await readFile(
          `${templateDir}/template-${templateName}.hbs`,
          {
            encoding: "utf8",
          },
        );
        const compiledTemplate = assignmentHandlebars.compile(template);

        const output = compiledTemplate({
          content: result,
          meta: md.meta,
          templateAssetFolder: path
            .join(
              path.relative(targetDir, path.join(process.cwd(), "docs")),
              "template-assets",
            )
            .split(path.sep)
            .join("/"),
        });

        // Generate the assignment HTML file
        await mkdir(targetDir, { recursive: true });
        const targetPath = path.join(targetDir, pathInfo.name + ".html");
        await writeFile(targetPath, output);

        const relativeTargetPathForMap = path.join(
          relativeTargetPath,
          pathInfo.name + ".html",
        );
        assignmentList.push({
          path: relativeTargetPathForMap.split(path.sep).join("/"),
          meta: { ...md.meta },
        });

        // Copy used assets to the target directory
        for (const asset of env.usedAssets) {
          const assetSourcePath = path.resolve(
            path.dirname(data.path),
            asset.src,
          );
          const assetTargetPath = path.join(
            targetDir,
            ...path
              .relative(data.path, assetSourcePath)
              .split(path.sep)
              .slice(1),
          );

          const targetDirForAsset = path.dirname(assetTargetPath);

          await mkdir(targetDirForAsset, { recursive: true });

          if (await exists(assetSourcePath)) {
            await copyFile(assetSourcePath, assetTargetPath);
          } else {
            for (const includedPath of asset.includedPaths) {
              const possiblePath = path.resolve(includedPath, asset.src);
              if (await exists(possiblePath)) {
                await copyFile(possiblePath, assetTargetPath);
                continue;
              }
            }
          }
        }

        cb(null, output);
      } catch (e) {
        logger.error(e);
      }
    },
  });

  return writable;
}
