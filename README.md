# JS Static Site Generator (SSG)

Uses node.js to generate a html file from a textfile or text files in a folder.
[Demo](https://jiahua-zou.github.io/Jia_SSG.github.io/)

## Key Features

- Parse the title from the first line in the text that is followed by two blank lines in the text file.
- Generate a HTML index that links to the other HTML if the input is a folder
- Feature is updated(9/24/2021) now MD(MarkDown) file also can be generated as a HTML.
- Now will encase text in `<code>...text...</code>` if the text is wrap in a single backtick.
- Added new option in CLI: `-l` or `--lang`. Change the language type in the HTML element

## Options

```bash
Usage: node index.js [options] <input>

Options:
  -i, --input          Takes in an Input for file/folder     [string] [required]
  -l, --lang           language type used in the HTML                   [string]
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

```HTML
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
