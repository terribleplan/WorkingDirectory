var path = require('path'),
    fs = require('fs');

describe("rmdir functionality", function() {
    var _this = this;
    require('./harness.js')(_this);
    it("deletes a directory", function(done) {
        var dirname = "testDir";
        var resolved = path.resolve(_this.tempdir, dirname);
        fs.mkdir(resolved, function(err) {
            if (err) throw err;
            _this.wd.rmdir(dirname, function(err) {
                expect(err).toBe(null);
                fs.exists(resolved, function(exists) {
                    expect(exists).toBeFalsy();
                    done();
                });
            });
        });
    });
});