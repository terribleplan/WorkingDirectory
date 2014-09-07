WorkingDirectory
================
WorkingDirectory is a library that allows for simple file manipulation through
creating an instance that all of your file operations can be done relative to.
[![Build Status](https://secure.travis-ci.org/terribleplan/WorkingDirectory.png?branch=master)](https://travis-ci.org/terribleplan/WorkingDirectory)

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