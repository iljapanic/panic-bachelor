var config = require('../config')

var browserSync = require('browser-sync')
var fs = require('fs')
var gulp = require('gulp')
var handleErrors = require('../lib/handleErrors')
var path = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.include.src, '/**/**/**/**/*'),
  dest: path.join(config.root.dest)
}

var includeTask = function () {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('include', includeTask)
module.exports = includeTask
