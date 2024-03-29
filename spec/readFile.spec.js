var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto');

describe("readFile functionality", function() {
    var _this = this;
    require('./harness.js')(_this);
    it("reads a file", function(done) {
        var fname = "testFile.txt";
        var resolved = path.resolve(_this.tempdir, fname);
        crypto.pseudoRandomBytes(128 * 1024, function(err, data) {
            if (err) throw err;
            fs.writeFile(resolved, data, function(err) {
                if (err) throw err;
                _this.wd.readFile(fname, function(err, rdata) {
                    expect(err).toBe(null);
                    expect(rdata.toString()).toBe(data.toString());
                    done();
                });
            });
        });
    });
});