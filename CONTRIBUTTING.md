# Setup and Development

## How to setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash

#Fork the repo.

# Clone this repository
$ git clone https://github.com/<your GitHub name>/Jia_SSG.git

# Install the package
npm install

# Run the app
$ node .\index.js [option] <file/folder> [option]
```

## Example
From the main directory

`$ node index.js -i file.txt -l fr` - Generate `file.txt` with the `fr` language.
`$ node index.js --input /SherlocksStories` - Generate files inside of the folder.
