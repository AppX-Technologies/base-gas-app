import fs from "fs";

const templateDirName = "./src";

generateWebApp("AppX", "./AppX", "Product Create");
function generateWebApp(projectName, destDir, initialFileName) {
  const unchangedName = initialFileName;
  if (initialFileName) {
    initialFileName = initialFileName.replace(/ /g, "_").toLowerCase();
  }
  fs.readdir(templateDirName, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }

    filenames.forEach((filename) => {
      fs.readFile(
        templateDirName + "/" + filename,
        "utf-8",
        async (err, content) => {
          if (err) {
            onError(err);
            return;
          }

          try {
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
        }
      );
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

    content = content.replace("BRAND", projectName);

    if (initialFileName) {
      fileName = fileName.replace("index", initialFileName);
      content = content.replace(/index/g, initialFileName);
    }

    if (fileName.endsWith(".server.js") && unchangedName) {
      content = content.replace("PAGE TITLE", unchangedName);
    }

    fs.writeFile(destDir + "/" + fileName, content, { flag: "wx" }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function onError(e) {
  console.log(e);
}
