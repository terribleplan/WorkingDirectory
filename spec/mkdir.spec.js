var path = require('path'),
    fs = require('fs');

describe("mkdir functionality", function() {
    var _this = this;
    require('./harness.js')(_this);
    it("creates a directory", function(done) {
        var dirname = "testDir";
        _this.wd.mkdir(dirname, function(err, nwd) {
            expect(err).toBe(null);
            expect(nwd.cwd).toEqual(path.resolve(_this.tempdir, dirname));
            fs.stat(nwd.cwd, function(err, stats) {
                if (err) throw err;
                expect(stats.isDirectory()).toBeTruthy();
                done();
            });
        });
    });
});