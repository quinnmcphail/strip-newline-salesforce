# strip-newline-salesforce

strip-newline-salesforce is a [Gulp plugin](https://gulpjs.com/docs/en/getting-started/using-plugins/) and CLI that strips EOF newline characters. Useful where Prettier and Salesforce are used together.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install `strip-newline-salesforce`.

```bash
npm install --save-dev strip-newline-salesforce
```

## Usage

### Gulp Plugin

```javascript
const stripFinalNewline =
  require("strip-newline-salesforce").removeNewlineFromGulpProcess;

gulp.task("remove EOF newline", function () {
  return gulp
    .src("src", { base: "./" })
    .pipe(stripFinalNewline())
    .pipe(gulp.dest("./"));
});
```

### CLI

```bash
strip-newline-salesforce file1.css file2.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
