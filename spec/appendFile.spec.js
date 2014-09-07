var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto');

describe("appendFile functionality", function () {
    var _this = this;
    require('./harness.js')(_this);
    it("creates a new file", function (done) {
        var fname = "testFile.txt";
        var resolved = path.resolve(_this.tempdir, fname);
        crypto.pseudoRandomBytes(128 * 1024, function (err, data) {
            if (err) throw err;
            _this.wd.appendFile(fname, data, function (err) {
                expect(err).toBe(null);
                fs.readFile(resolved, function (err, rdata) {
                    if (err) throw err;
                    expect(rdata.toString()).toBe(data.toString());
                    done();
                });
            });
        });
    });
    it("appends to an existing file", function (done) {
        var fname = "testFile.txt";
        var resolved = path.resolve(_this.tempdir, fname);
        crypto.pseudoRandomBytes(128 * 1024, function (err, initialData) {
            if (err) throw err;
            fs.writeFile(resolved, initialData, function (err) {
                if (err) throw err;
                crypto.pseudoRandomBytes(128 * 1024, function (err, data) {
                    if (err) throw err;
                    _this.wd.appendFile(fname, data, function (err) {
                        expect(err).toBe(null);
                        fs.readFile(resolved, function (err, rdata) {
                            if (err) throw err;
                            expect(rdata.toString()).toBe(initialData.toString() + data.toString());
                            done();
                        });
                    });
                });
            });
        });
    });
});