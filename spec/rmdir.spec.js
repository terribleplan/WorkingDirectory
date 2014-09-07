var temp = require('./lib/tempdir.js'),
    WorkingDir = require('../index.js'),
    path = require('path'),
    fs = require('fs');

describe("rmdir functionality", function() {
    var tempdir, wd;
    beforeEach(function(done) {
        temp(function(dir) {
            tempdir = dir;
            wd = new WorkingDir(tempdir);
            done();
        })
    });
    it("deletes a directory", function(done) {
        var dirname = "testDir";
        var resolved = path.resolve(tempdir, dirname);
        wd.rmdir(dirname, function(err) {
            expect(err).toBe(null);
            fs.exists(resolved, function(exists) {
                expect(exists).toBeFalsy();
                done();
            });
        });
    });
});