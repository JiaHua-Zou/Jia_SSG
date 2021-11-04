#!/usr/bin/env node
const { exit } = require("yargs");
const readFile = require("./fs-Handler");
const argv = require("yargs")
  .usage("Usage: node $0 [options] <input>")
  .example("node $0 -i foo.txt", "Create SSG with a given file/folder")
  .alias("-v", "version")
  .options({
    i: {
      alias: "input",
      desc: "Takes in an Input for file/folder",
      type: "string",
    },
    c: {
      alias: "config",
      desc: "specifies a file path for a config file",
      type: "string",
    },
    l: {
      alias: "lang",
      desc: "language type used in the HTML",
      type: "string",
    },
  })
  .nargs("i", 1)
  .help("h")
  .alias("h", "help").argv;

if (!(argv.config || argv.input)) {
  console.log("You have to specify an input path!");
  exit(1);
}
readFile(argv.input, argv.config, argv.lang);
