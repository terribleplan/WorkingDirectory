var temp = require('./lib/tempdir.js'),
    WorkingDir = require('../index.js'),
    path = require('path'),
    fs = require('fs');

describe("mkdir functionality", function() {
    var tempdir, wd;
    beforeEach(function(done) {
        temp(function(dir) {
            tempdir = dir;
            wd = new WorkingDir(tempdir);
            done();
        })
    });
    it("creates a directory", function(done) {
        var dirname = "testDir";
        wd.mkdir(dirname, function(err, nwd) {
            expect(err).toBe(null);
            expect(nwd.cwd).toEqual(path.resolve(tempdir, dirname));
            expect(fs.statSync(nwd.cwd).isDirectory()).toBeTruthy();
            done();
        });
    });
});