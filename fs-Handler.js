const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { htmlConverter, indexGenerator } = require("./fs-html");

//Main function
function Main(fileSrc, configPath, lang = "en") {
  // Read configuration file if specified
  let configs = {};
  if (configPath) {
    configs = readConfig(configPath);
    console.log(configs);
  }

  // Replace data from configs to variables
  if (configs.input) fileSrc = configs.input;
  if (configs.lang) lang = configs.lang;

  emptyDist();

  if (fs.lstatSync(fileSrc).isDirectory()) {
    fs.readdir(fileSrc, (err, files) => {
      if (err) {
        console.log(`Error: ${err}`);
        process.exit(-1);
      }

      fs.mkdir(process.cwd() + "/dist", { recursive: true }, (error) => {
        if (error) {
          console.log(`An error occurred: ${error}`);
          process.exit(-1);
        }
        for (const file of files) {
          fs.stat(fileSrc + "/" + file, (err, stats) => {
            if (err) {
              console.log("An Errored has occurred!");
              process.exit(-1);
            }
            if (!stats.isDirectory()) {
              readFile(file, fileSrc + "/" + file, lang);
            }
          });
        }
        indexGenerator(fileSrc, lang);
      });
    });
  } else {
    fs.mkdir(process.cwd() + "/dist", { recursive: true }, (error) => {
      if (error) {
        console.log(`An error occurred: ${error}`);
        process.exit(-1);
      }
      readFile(fileSrc, fileSrc, lang);
    });
  }
}

//Create the HTML file.
function readFile(fileSrc, fileDir, lang) {
  console.log(`Creating file: ${fileSrc}`);
  fs.readFile(fileDir, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
    fileSrc = isMarkDown(fileSrc)
      ? path.basename(fileSrc, ".md") + ".html"
      : path.basename(fileSrc, ".txt") + ".html";
    htmlConverter(data, fileSrc, isMarkDown(fileSrc), lang);
  });
}

//check if the file is a MarkDown or not.
function isMarkDown(filename) {
  return filename.substr(filename.length - 3) === ".md";
}

//Empty out the dist folder.
function emptyDist() {
  try {
    fse
      .emptyDir(process.cwd() + "/dist")
      .then(() => {
        console.log("Old file has been deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

//will read the JSON config file.
function readConfig(configPath) {
  try {
    // Read from the path specified
    console.log(configPath);
    const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
    // Create data to export
    let exp = {
      input: "",
      lang: "",
    };
    // Move over data from config file to export
    if (configData.input) exp.input = configData.input;
    if (configData.lang) exp.lang = configData.lang;

    return exp;
  } catch (err) {
    console.log(`Error in reading a config file: ${err}`);
    process.exit(-1);
  }
}

module.exports = Main;
