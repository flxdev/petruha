var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'pug:watch',
    // 'html:watch',
    // 'font:watch',
    'js:watch',
    'svg:watch',
    'svgmin:watch',
    // 'critical:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['server', 'watch'], function() {});
gulp.task('build', [/*'html','font',*/'sprite','copy','js','sass','svg','svgmin'], function() {});