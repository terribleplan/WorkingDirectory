WorkingDirectory
================
[![License][license-image]][license-url]
[![NPM Version][npm-version-image]][npm-url]
[![Tag Version][tag-version-image]][github-url]
[![Build Status][build-image]][build-url]

WorkingDirectory is a library that allows for simple file manipulation through
creating an instance that all of your file operations can be done relative to.
Usage
-----
```javascript
var WorkingDirectory = require('working-directory');

var wd = new WorkingDirectory(__dirname);

wd.mkdir("someDirectory", function(err, tempdir) {
  if (err) throw err;

  tempdir.writeFile("file.txt", "File contents", function(err) {
    if (err) throw err;

    console.log("A file has been written in the temporary directory");
  });
});
```
Notes
-----
This package does not and will not provide the following functionality:
* Synchronous filesystem access

[license-url]: https://github.com/terribleplan/WorkingDirectory/blob/master/LICENSE
[npm-url]: https://npmjs.org/package/working-directory
[build-url]: https://travis-ci.org/terribleplan/WorkingDirectory
[github-url]: https://github.com/terribleplan/WorkingDirectory
[license-image]: http://img.shields.io/npm/l/working-directory.svg
[build-image]: http://img.shields.io/travis/terribleplan/WorkingDirectory.svg
[npm-version-image]: http://img.shields.io/npm/v/working-directory.svg
[tag-version-image]: http://img.shields.io/github/tag/terribleplan/WorkingDirectory.svg
