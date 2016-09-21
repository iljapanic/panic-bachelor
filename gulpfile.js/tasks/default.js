var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')

var defaultTask = function (cb) {
  gulpSequence('clean', 'include', 'images', 'markdown', 'html', 'css', 'scripts', 'watch', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask
