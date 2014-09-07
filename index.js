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
        if (err) return callback(err);
        return callback(null, new WorkingDirectory(userPath));
    }
    fs.mkdir(userPath, mode, cb);
};

WorkingDirectory.prototype.rmdir = function(userPath, callback) {
    if (typeof userPath !== "string") throw new Error("path must be a string");
    userPath = path.resolve(this.cwd, userPath);
    if (typeof callback !== "function") throw new Error("callback must be a function");
    fs.rmdir(userPath, function (err) {
        if (err) return callback(err);
        return callback(null);
    });
};

WorkingDirectory.prototype.readFile = function(fileName, options, callback) {
    if (typeof fileName !== "string") throw new Error("path must be a string");
    fileName = path.resolve(this.cwd, fileName);
    if (typeof options === "function") {
        callback = options;
        options = {};
    } else if (typeof callback !== "function") {
        throw new Error("callback must be a function");
    } else if (typeof options !== "object") {
        throw new Error("options must be an object");
    } else {
        options = {};
    }
    function cb(err, data) {
        if (err) return callback(err);
        return callback(null, data);
    }
    fs.readFile(fileName, options, cb);
};

module.exports = WorkingDirectory;