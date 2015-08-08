// MODULES

// Global
var browserSync = require('browser-sync');
var requireDir = require('require-dir');

// Gulp
var gulp = require('gulp');
var fileInclude	= require('gulp-file-include');
var markdown = require('gulp-markdown');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var watch = require('gulp-watch');



// VARIABLES

// Paths
var path = {

	publicDir: './',

	markdownDir: './markdown',
	markdown: './markdown/**/**/**.md',

	htmlDir: './html',
	html: './html/**/**/*.html',

	sassDir: './sass',
	sass: './sass/**/**/**/*.{sass,scss}',

	cssDir: './css',
	css: './css/**/**.css'

};



// GULP TASKS

// 'browser-sync'
//
// 	- spins up a local server

gulp.task('browser-sync', function() {

	browserSync.init({
		server: {
			baseDir: path.publicDir,
			open: 'local',
			host: 'localhost'
		}
	});

});



// 'markdown'
//
//	- compiles all the .md files into .html files

gulp.task('markdown', function() {

	return gulp.src(path.markdown)
		.pipe(plumber())
		.pipe(markdown())
		.pipe(gulp.dest(path.htmlDir))
		.pipe(browserSync.reload({stream:true}));

});


// 'html'
//
//	- includes .html partials

gulp.task('html', function() {

	return gulp.src(path.html)
		.pipe(plumber())
		.pipe(fileInclude())
		.pipe(gulp.dest(path.publicDir))
		.pipe(browserSync.reload({stream:true}));

});


// 'sass'
// 
//	- compiles SASS into CSS
//	- creates SASS sourcemaps (for debugging)
//	- combines indetical media queries into a single one
// 	- adds vendor prefixes
//	- minifies the outputed CSS

gulp.task('sass', function () {

	return gulp.src(path.sass)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(minifyCSS({keepSpecialComments: '0'}))
		.pipe(gulp.dest(path.cssDir))
		.pipe(browserSync.reload({stream:true}))

});


// 'watch'
//
//	- watches for changes in files
//	- runs appropriate task when changes are detected
//	- reloads browserSync

gulp.task('watch', ['browser-sync'], function() {

	watch(path.markdown, function() { gulp.start('markdown'); });
	watch(path.html, function() { gulp.start('html'); });
	watch(path.sass, function() { gulp.start('sass'); });

});




// 'default'
//
//	- default set of tasks that are triggered after running 'gulp'

gulp.task('default', ['sass', 'markdown', 'html', 'watch']);
