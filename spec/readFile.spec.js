var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto');

describe("readFile functionality", function() {
    var _this = this;
    require('./harness.js')(_this);
    it("creates a directory", function(done) {
        var fname = "testDir";
        var resolved = path.resolve(_this.tempdir, fname);
        crypto.pseudoRandomBytes(1024, function(err, data) {
            console.log("rnd");
            if (err) throw err;
            fs.writeFile(resolved, data, function(err) {
                if (err) throw err;
                console.log("w");
                _this.wd.readFile(fname, function(err, rdata) {
                    expect(err).toBe(null);
                    expect(rdata).toBe(data);
                    done();
                });
            });
        });
    });
});