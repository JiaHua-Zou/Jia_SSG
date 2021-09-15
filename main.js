
var fs = require("fs");
var fse = require("fs-extra");
const path = require("path");

function readFile(fileSrc) {
  // Read the argument to find if it is a folder or a .txt file.
  var fileDir;
  fse
    .emptyDir(process.cwd() + "/dist")
    .then(() => {
      console.log("Success!");
    })
    .catch((err) => {
      console.log(err);
    });
  if (fs.lstatSync(fileSrc).isDirectory()) {
    fs.readdir(fileSrc, (err, files) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      fs.mkdir(process.cwd() + "/dist", { recursive: true }, (error) => {
        if (error) {
          console.log(`An error occurred: ${error}`);
        } else {
          files.forEach((file) => {
            fs.readFile(
              process.argv[3] + "/" + file,
              "utf8",
              function (err, data) {
                if (err) {
                  console.log(err);
                  process.exit(1);
                }
                fileDir = path.basename(file, ".txt") + ".html";
                htmlConverter(data, fileDir);
              }
            );
          });
          indexGenerator(fileSrc);
        }
      });
    });
  } else {
    var filename = process.argv[3];
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      fs.mkdir(process.cwd() + "/dist", { recursive: true }, (error) => {
        if (error) {
          console.log(`An error occurred: ${error}`);
        } else {
          fileDir = path.basename(filename, ".txt") + ".html";
          htmlConverter(data, fileDir);
        }
      });
    });
  }
}

function htmlConverter(src, fileDirName) {
    //bug fix TODO: Still create the title even if there are two blank lines.
  var dat = src;
  const title = dat.split("\n\n\n");
  const text = dat.slice(dat.search("\n\n\n") + 3);
  const htmlElement = text
    .split(/\r?\n\r?\n/)
    .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
    .join(" ");

  var htmlBase =
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title> ${title[0]}</title>` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body><h1>${title[0]}</h1>${htmlElement}</body></html>`;

  fs.writeFile(`./dist/${fileDirName}`, htmlBase, function (err) {
    if (err) console.log(err);
  });
}

function indexGenerator(fileSrc) {
  fs.readdir(fileSrc, (err, files) => {
    var list = "";
    files.forEach((element) => {
      console.log(element)
      if (element != null){
          list += `<h3><a href="${
              path.basename(element, ".txt") + ".html"
            }">${path.basename(element, ".txt")}</a></h3>`;
        }
    });
    var htmlBase =
      `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<title>Generated Site</title>` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `</head><body><h1>Generated Site</h1><div>${list}</div></body></html>`;

    fs.writeFile(`./dist/index.html`, htmlBase, function (err) {
      if (err) console.log(err);
      console.log("Done!");
    });
  });
}

module.exports = readFile;
