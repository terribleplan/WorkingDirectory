var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto');

describe("writeFile functionality", function() {
    var _this = this;
    require('./harness.js')(_this);
    it("writes data to a file that doesn't exist", function(done) {
        var fname = "testFile.txt";
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
    it("overwrites a file that does exist", function(done) {
        var fname = "testFile.txt";
        var resolved = path.resolve(_this.tempdir, fname);
        crypto.pseudoRandomBytes(128 * 1024, function(err, initialData) {
            if (err) throw err;
            fs.writeFile(resolved, initialData, function(err) {
                if (err) throw err;
                crypto.pseudoRandomBytes(128 * 1024, function(err, data) {
                    if (err) throw err;
                    _this.wd.writeFile(fname, data, function(err) {
                        expect(err).toBe(null);
                        fs.readFile(resolved, function(err, rdata) {
                            if (err) throw err;
                            expect(rdata.toString()).not.toBe(initialData.toString());
                            expect(rdata.toString()).toBe(data.toString());
                            done();
                        });
                    });
                });
            });
        });
    });
});