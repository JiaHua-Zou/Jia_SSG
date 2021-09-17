# JS Static Site Generator (SSG)

Uses node.js to generate a html file from a textfile or text files in a folder.
[Demo](https://jiahua-zou.github.io/Jia_SSG.github.io/)
## Key Features
* Parse the title from the first line in the text that is followed by two blank lines in the text file.
* Generate a HTML index that links to the other HTML if the input is a folder

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/JiaHua-Zou/Jia_SSG.git

# Run the app
$ node .\index.js [options] <file/folder>
```

## Options
```bash
Usage: node index.js [options] <input>

Options:
  -i, --input          Takes in an Input for file/folder     [string] [required]
  -h, --help           Show help                                       [boolean]
      ---v, --version  Show version number                             [boolean]

Examples:
  node index.js -i foo.txt  Create SSG with a given file/folder
```
## Example

The input of a text file.
```text
Title


This is Paragraph 1

This is Paragraph 2

```

It will generate the HTML file as following:

``` HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Title</h1>
  <p>This is Paragraph 1</p>
  <p>This is Paragraph 2</p>
</body>
</html>
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

