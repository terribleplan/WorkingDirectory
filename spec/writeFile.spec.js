var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto');

describe("writeFile functionality", function() {
    var _this = this;
    require('./harness.js')(_this);
    it("creates a directory", function(done) {
        var fname = "testDir";
        var resolved = path.resolve(_this.tempdir, fname);
        crypto.pseudoRandomBytes(128 * 1024, function(err, data) {
            if (err) throw err;
            _this.wd.writeFile(fname, data, function(err) {
                expect(err).toBe(null);
                fs.readFile(resolved, function(err, rdata) {
                    if (err) throw err;
                    expect(rdata.toString()).toBe(data.toString());
                    done();
                });
            });
        });
    });
});