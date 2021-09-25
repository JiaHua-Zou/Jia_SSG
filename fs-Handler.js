var fs = require("fs");
var fse = require("fs-extra");
const path = require("path");

function isMarkDown(filename) {
  return filename.split('.')[1] === 'md';
}

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
            fs.stat(process.argv[3] + "/" + file, (err, stats) => {
              if (err) {
                console.log("An Errored has occurred!");
                process.exit(1);
              }
              if (!stats.isDirectory()) {
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
              }
            });
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
          fileDir = isMarkDown(filename) ? path.basename(filename, ".md") + ".html" : path.basename(filename, ".txt") + ".html";
          htmlConverter(data, fileDir, isMarkDown(filename));
        }
      });
    });
  }
}

function htmlConverter(src, fileDirName, isMarkDown = false) {
  var fileName = "";
  var text = "";
 
  var title = src.match(/^.+(\r?\n\r?\n\r?\n)/) || "";

  if (!title) {
    fileName = fileDirName.slice(0, -5);
    text = src;
  } else {
    fileName = title[0].trim();
    title = title[0].trim();
    text = src.substring(fileName.length + 3);
  }

  let htmlElement = '';
  if(!isMarkDown){
    htmlElement = text
    .split(/\r?\n\r?\n/)
    .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
    .join(" ");
  }else {
    const htmlArr = [];
    console.log(text.split(/\r?\n/));
    let isOpen = false;
    text
    .split(/\r?\n/)
    .forEach(e => {
      const arrData = e.split(' ');
      arrData[0] = arrData[0].startsWith('```') && arrData[0].length > 3 ? '````' : arrData[0];
      if(arrData[0] !== '```' && isOpen) {
        arrData[0] = 'e';
      }
      switch(arrData[0]) {
        case '#':
          htmlArr.push(`<h1>${arrData.slice(1).join(" ")}</h1><hr />\n`);
          break;
        case '##':
          htmlArr.push(`<h2>${arrData.slice(1).join(" ")}</h2>\n`);
          break;
        case '###':
          htmlArr.push(`<h3>${arrData.slice(1).join(" ")}</h3>\n`);
          break;
        case '```':
          htmlArr.push(`${e}</xmp>\n`);
          isOpen = false;
          break;
        case '````':
          htmlArr.push(`<xmp>${e}\n`);
          isOpen = true;
          break;
        case '':
          htmlArr.push(`<br />\n`);
          break;
        case 'e':
          htmlArr.push(`${e}\n`);
          break;
        default:
          htmlArr.push(`<p>${e}</p>\n`);
      }
      htmlElement = htmlArr.join("")
    });

  }

  var htmlBase =
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title> ${fileName}</title>` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body><h1>${title}</h1>${htmlElement}</body></html>`;

  fs.writeFile(`./dist/${fileDirName}`, htmlBase, function (err) {
    if (err) console.log(err);
  });
}

function indexGenerator(fileSrc) {
  fs.readdir(fileSrc, (err, files) => {
    var list = "";
    files.forEach((element) => {
      console.log(element);
      if (element != null) {
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
