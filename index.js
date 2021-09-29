#!/usr/bin/env node
const readFile = require("./fs-Handler");
const argv = require("yargs")
  .usage("Usage: node $0 [options] <input>")
  .example("node $0 -i foo.txt", "Create SSG with a given file/folder")
  .alias("-v", "version")
  .options({
    i: {
      alias: "input",
      demandOption: true,
      desc: "Takes in an Input for file/folder",
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

readFile(argv.input, argv.lang);
