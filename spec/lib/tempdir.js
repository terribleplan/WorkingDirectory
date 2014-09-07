var crypto = require('crypto'),
    path = require('path'),
    fs = require('fs');

module.exports = function (callback) {
    if (typeof callback !== "function") throw new Error("callback must be a function");
    crypto.pseudoRandomBytes(32, function (err, buf) {
        if (err) throw err;
        var temp = path.resolve(__dirname, '../..', "tempdir-" + buf.toString('hex'))
        fs.mkdir(path.resolve(__dirname, '../..', temp), function (err) {
            if (err) throw err;
            callback(temp);
        })
    })
};
