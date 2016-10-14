var config = require('../config')

var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync')
var cssnano = require('gulp-cssnano')
var gmq = require('gulp-group-css-media-queries')
var gulp = require('gulp')
var handleErrors = require('../lib/handleErrors')
var path = require('path')
var sass = require('gulp-sass')
var uncss = require('gulp-uncss')

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var unCssTask = function () {
  return gulp.src(paths.src)
		.pipe(sass())
    .on('error', handleErrors)
    .pipe(uncss({
      html: ['dist/**/*.html', 'http://iljapanic.me/information-design/']
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .on('error', handleErrors)
    .pipe(gmq())
    .on('error', handleErrors)
    .pipe(cssnano({autoprefixer: false}))
    .on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

gulp.task('unCss', unCssTask)
module.exports = unCssTask
