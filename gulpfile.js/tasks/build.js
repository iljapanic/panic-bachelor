var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')

var buildTask = function (cb) {
  gulpSequence('clean', 'include', 'images', 'markdown', 'html', 'css', 'scripts', cb)
}

gulp.task('build', buildTask)
module.exports = buildTask
