# JS Static Site Generator (SSG)

Uses node.js to generate a html file from a textfile or text files in a folder.

## Key Features
* Parse the title if the first line is followed by two blank lines in the text file.


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/JiaHua-Zou/Jia_SSG.git

# Install dependencies
$ npm install fs-extra yargs

# Run the app
$ node .\index.js [options] <file/folder>
```

## Options
```bash
Usage: index.js <command> [options]

Commands:
  index.js SSG  Create SSG with input of a file/folder

Options:
      --version  Show version number                                   [boolean]
  -i, --file     Takes in an input of file/folder                     [required]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js SSG -i foo.js  Create SSG with a given file/folder
```

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [Yargs](https://github.com/yargs/yargs)



## License

MIT

---

> GitHub [JiaHua](https://github.com/JiaHua-Zou) &nbsp;&middot;&nbsp;

