import Handlebars from "handlebars";
import path from "path";
import { createMarkdownRenderer } from "./markdown-factory.js";
import { readFile } from "node:fs/promises";
import { stat } from "node:fs/promises";

const templateDir = path.join(import.meta.dirname, "templates");

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

export async function generateAssignment(v) {
  const md = createMarkdownRenderer();

  var assignmentHandlebars = Handlebars.create();

  assignmentHandlebars.registerHelper(
    "renderMarkdown",
    function (object, propertyName, defaultValue, options) {
      return md.render(object.toString());
    },
  );

  const env = {
    usedAssets: [],
    currentMdFilePath: v.path,
  };
  const result = md.render(v.contents.toString(), env);

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
    templateAssetFolder: path.join(
      path.relative(path.parse(v.relative).dir, "."),
      "template-assets",
    ),
  });

  // Copy used assets to the target directory
  const assets = [];
  for (const asset of env.usedAssets) {
    const assetSourcePath = path.resolve(path.dirname(v.path), asset.src);
    const assetTargetPath = path.join(path.parse(v.relative).dir, asset.src);

    if (await exists(assetSourcePath)) {
      assets.push({
        sourcePath: assetSourcePath,
        targetPath: assetTargetPath,
      });
    } else {
      for (const includedPath of asset.includedPaths) {
        const possiblePath = path.resolve(includedPath, asset.src);
        if (await exists(possiblePath)) {
          assets.push({
            sourcePath: possiblePath,
            targetPath: assetTargetPath,
          });

          break;
        }
      }
    }
  }

  return {
    output,
    targetPath: path.join(
      path.parse(v.relative).dir,
      path.parse(v.basename).name + ".html",
    ),
    meta: { ...md.meta },
    assets,
  };
}
