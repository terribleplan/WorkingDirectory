var temp = require('./lib/tempdir.js'),
    WorkingDir = require('../index.js'),
    path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf');

describe("mkdir functionality", function() {
    var tempdir, wd;
    beforeEach(function(done) {
        temp(function(dir) {
            tempdir = dir;
            wd = new WorkingDir(tempdir);
            done();
        })
    });
    afterEach(function(done) {
        rimraf(tempdir, function(err) {
            if (err) throw err;
            done();
        })
    });
    it("creates a directory", function(done) {
        var dirname = "testDir";
        wd.mkdir(dirname, function(err, nwd) {
            expect(err).toBe(null);
            expect(nwd.cwd).toEqual(path.resolve(tempdir, dirname));
            fs.stat(nwd.cwd, function(err, stats) {
                if (err) throw err;
                expect(stats.isDirectory()).toBeTruthy();
                done();
            });
        });
    });
});