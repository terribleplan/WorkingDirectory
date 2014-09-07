var temp = require('./lib/tempdir.js'),
    WorkingDir = require('../index.js'),
    rimraf = require('rimraf');

module.exports = function(_this) {
    beforeEach(function(done) {
        temp(function(dir) {
            _this.tempdir = dir;
            _this.wd = new WorkingDir(_this.tempdir);
            done();
        })
    });
    afterEach(function(done) {
        rimraf(_this.tempdir, function(err) {
            if (err) throw err;
            done();
        })
    });
};
