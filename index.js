var path = require('path'),
    fs = require('fs'),
    util = require('util');

function WorkingDirectory(directory) {
    this.cwd = path.resolve(directory);
}

WorkingDirectory.prototype.mkdir = function (userPath, mode, callback) {
    if (typeof userPath !== "string") throw new Error("path must be a string");
    userPath = path.resolve(this.cwd, userPath);
    if (typeof mode === "function") {
        callback = mode;
        mode = 0777 & (~process.umask());
    } else if (typeof callback !== "function") {
        throw new Error("callback must be a function");
    } else if (typeof mode !== "number") {
        mode = 0777 & (~process.umask());
    } else {
        mode = mode & (~process.umask());
    }
    function cb(err) {
        if (err) {
            return callback(err);
        }
        return callback(null, new WorkingDirectory(userPath));
    }

    fs.mkdir(userPath, mode, cb);
};

module.exports = WorkingDirectory;