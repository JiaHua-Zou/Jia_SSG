const fs = require("fs");
const path = require("path");
var sideBar = "";
module.exports = {
  htmlConverter: (src, fileDirName, isMarkDown = false, lang) => {
    var fileName = "";
    var text = "";
    let htmlElement = "";

    //.txt: will grab the title if there are 2 blank lines
    var title = src.match(/^.+(\r?\n\r?\n\r?\n)/) || "";

    //HTML <title> content will be taken from the file name or the var title.
    if (!title) {
      fileName = fileDirName.slice(0, -5);
      text = src;
    } else {
      fileName = title[0].trim();
      title = title[0].trim();
      text = src.substring(fileName.length + 3);
    }

    if (!isMarkDown) {
      htmlElement = text
        .split(/\r?\n\r?\n/)
        .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
        .join(" ");
    } else {
      //.md process for headers, code and line break
      const htmlArr = [];
      let isOpen = false;

      //Split the text and put it into an array.
      text.split(/\r?\n/).forEach((e) => {
        const arrData = e.split(" ");
        arrData[0] =
          arrData[0].startsWith("```") && arrData[0].length > 3
            ? "````"
            : arrData[0];

        // filter out the 3 and 1 backticks
        if (arrData[0] !== "```" && arrData[0] !== "`" && isOpen) {
          arrData[0] = "e";
        }

        //switch case for different markdown options
        switch (arrData[0]) {
          case "#":
            htmlArr.push(`<h1>${arrData.slice(1).join(" ")}</h1><hr />\n`);
            break;
          case "##":
            htmlArr.push(`<h2>${arrData.slice(1).join(" ")}</h2>\n`);
            break;
          case "###":
            htmlArr.push(`<h3>${arrData.slice(1).join(" ")}</h3>\n`);
            break;
          case "`":
            if (isOpen) {
              htmlArr.push(`</code>\n`);
              isOpen = false;
            } else {
              htmlArr.push(`<code>\n`);
              isOpen = true;
            }
            break;
          case "```":
            htmlArr.push(`</xmp>\n`);
            isOpen = false;
            break;
          case "````":
            htmlArr.push(`<xmp>\n`);
            isOpen = true;
            break;
          case "":
            htmlArr.push(`<br />\n`);
            break;
          case "e":
            htmlArr.push(`${e}\n`);
            break;
          default:
            htmlArr.push(`<p>${e}</p>\n`);
        }
        htmlElement = htmlArr.join("");
      });
    }

    //HTML template
    var htmlBase =
      `<!doctype html><html lang="${
        lang == "" ? "en" : lang
      }"><head><meta charset="utf-8">` +
      `<title> ${fileName}</title>` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<link rel="stylesheet" href="style.css">` +
      `</head><body><div>${sideBar}</div><div class="body"><h1>${title}</h1>${htmlElement}</div></body></html>`;

    fs.writeFile(`./dist/${fileDirName}`, htmlBase, function (err) {
      if (err) console.log(err);
    });
  },

  //Function: create the HTML index if there are multiple HTML file that were created.
  indexGenerator: (fileSrc, lang) => {
    fs.readdir(fileSrc, (err, files) => {
      var list = "";

      //create elements for the sideBar and Links
      for (const file of files) {
        if (file != null) {
          list += `<h3><a href="${
            file.substring(0, file.lastIndexOf(".")) + ".html"
          }">${file.substring(0, file.lastIndexOf("."))}</a></h3>`;
        }
      }
      //Sidebar
      sideBar = SideBarGen(files);

      //HTML template for the index.html file.
      var htmlBase =
        `<!doctype html><html lang="${
          lang == "" ? "en" : lang
        }"><head><meta charset="utf-8">` +
        `<title>Generated Site</title>` +
        `<meta name="viewport" content="width=device-width, initial-scale=1">` +
        `<link rel="stylesheet" href="style.css">` +
        `</head><body><div>${sideBar}</div><div class="body"><div><h1>Generated Site</h1></div><div>${list}</div></div></body></html>`;

      fs.writeFile(`./dist/index.html`, htmlBase, function (err) {
        if (err) {
          console.log(err);
          process.exit(-1);
        }
        sideBarCSS();
        console.log("Done!");
      });
    });
  },
};

function SideBarGen(fileList) {
  var list = '<div class="sidenav">';
  if (fileList.length > 1) {
    list += '<a href="index.html">Main Page</a>';
    for (const file of fileList) {
      if (file) {
        list += `<a href="${
          file.substring(0, file.lastIndexOf(".")) + ".html"
        }">${file.substring(0, file.lastIndexOf("."))}</a>`;
      }
    }
  } else {
    list += list += `<a href="${
      fileList.substring(0, fileList.lastIndexOf(".")) + ".html"
    }">${file.substring(0, fileList.lastIndexOf("."))}</a>`;
  }

  return list;
}

function sideBarCSS() {
  var style =
    ".sidenav {" +
    "height: 100%;" +
    "position: fixed;" +
    "width: auto;" +
    "top: 0;" +
    "left: 0;" +
    "padding-top: 30px;" +
    "}" +
    ".sidenav a {" +
    "padding: 10px;" +
    "background-color: gray;" +
    "text-decoration: none;" +
    "font-size: 18px;" +
    "color: black;" +
    "display: block;" +
    "}" +
    "body {" +
    "position: relative;" +
    "margin-left: 300px;" +
    "padding: 10px;" +
    "}";
  fs.writeFile("./dist/style.css", style, function (err) {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
  });
}
