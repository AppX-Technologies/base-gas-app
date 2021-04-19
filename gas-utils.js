#!/usr/bin/env node

import fs, { readdir } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDirName = path.resolve(__dirname, "./template");

const srcDirName = path.resolve(__dirname, "./template/src");

const pageTemplateDirName = path.resolve(
  __dirname,
  "./template/src/pageTemplate"
);

parseArgs(process.argv);

function parseArgs(args) {
  if (args.length > 2) {
    switch (args[2]) {
      case "generate-template": {
        var isArgsValid = checkTemplateArgs(args);
        if (isArgsValid) {
          generateWebApp(args[3], args[4], args[5]);
        }
        return;
      }
      case "generate-page": {
        generateWebPage(args[3], args[4]);
        return;
      }
    }
  }

  console.error(
    "\nInvalid command, command must be one of generate-template|generate-page\n"
  );
}

function checkTemplateArgs(args) {
  if (args.length < 5) {
    console.error(
      "\nPlease provide both project name and destination directory\n"
    );
    return false;
  }

  return true;
}

function generateWebPage(initialFileName, projectName) {
  const unchangedName = initialFileName;
  if (initialFileName) {
    initialFileName = initialFileName.replace(/ /g, "_").toLowerCase();
  }

  copyFilesInDir(
    pageTemplateDirName,
    ".",
    projectName ? projectName : "",
    unchangedName,
    initialFileName
  );
}

function generateWebApp(projectName, destDir, initialFileName) {
  const unchangedName = initialFileName;
  if (initialFileName) {
    initialFileName = initialFileName.replace(/ /g, "_").toLowerCase();
  }

  copyFilesInDir(
    templateDirName,
    destDir,
    projectName,
    unchangedName,
    initialFileName
  );
}

function copyFilesInDir(
  dirName,
  destDir,
  projectName,
  unchangedName,
  initialFileName
) {
  fs.readdir(dirName, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }

    filenames.forEach(async (filename) => {
      if (!isSrc(filename)) {
        try {
          const content = fs.readFileSync(dirName + "/" + filename, "utf-8");

          await createWebAppFile(
            projectName,
            filename,
            content,
            destDir,
            initialFileName,
            unchangedName
          );
        } catch (e) {
          onError(e);
        }
      } else {
        copyFilesInDir(
          srcDirName,
          destDir + "/src",
          projectName,
          unchangedName,
          initialFileName
        );
      }
    });
  });
}

async function createWebAppFile(
  projectName,
  fileName,
  content,
  destDir,
  initialFileName,
  unchangedName
) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir);
    }
    if (shouldModify(fileName)) {
      content = content.replace("BRAND", projectName);

      if (initialFileName) {
        fileName = fileName.replace("index", initialFileName);
        content = content.replace(/index/g, initialFileName);
      }

      if (fileName.endsWith(".server.js") && unchangedName) {
        content = content.replace("PAGE TITLE", unchangedName);
      }
    }

    if (fileName !== "src") {
      fs.writeFile(destDir + "/" + fileName, content, { flag: "wx" }, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    }
  });
}

function shouldModify(fileName) {
  return !fileName.startsWith(".");
}

function isSrc(fileName) {
  return fileName === "src";
}

function onError(e) {
  console.log(e);
}
