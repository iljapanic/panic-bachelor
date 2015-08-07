// Global Modules
var browserSync 	= require('browser-sync');
var requireDir		= require('require-dir');


// Gulp Modules
var gulp        	= require('gulp');
var autoprefixer 	= require('gulp-autoprefixer');
var cmq 			= require('gulp-combine-media-queries');
var fileInclude		= require('gulp-file-include');
var markdown		= require('gulp-markdown');
var minifyCSS		= require('gulp-minify-css');
var notify			= require('gulp-notify');
var plumber			= require('gulp-plumber');
var sass			= require('gulp-sass');
var sourcemaps		= require('gulp-sourcemaps');
var util			= require('gulp-util');
var watch			= require('gulp-watch');


// Path variables
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



// helper for handling errors
function handleErrors() {

	module.exports = function(errorObject, callback) {
		notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
		// Keep gulp from hanging on this task
		if (typeof this.emit === 'function') this.emit('end');
	};

}



// 'browser-sync' task
//
// 		- spins up a local server

gulp.task('browser-sync', function() {

	browserSync.init({
		server: {
			baseDir: path.publicDir,
			open: 'local',
			host: 'localhost'
		}
	});

});



// 'markdown' task
//
//		- compiles all the .md files into .html files

gulp.task('markdown', function() {

	return gulp.src(path.markdown)
	.pipe(markdown())
	.on('error', handleErrors)
	.pipe(gulp.dest(path.htmlDir))
	.pipe(browserSync.reload({stream:true}));

});


// 'html' task
//
//		- includes .html partials

gulp.task('html', function() {

	return gulp.src(path.html)
	.pipe(fileInclude())
	.on('error', handleErrors)
	.pipe(gulp.dest(path.publicDir))
	.pipe(browserSync.reload({stream:true}));

});


// 'sass' task
// 
//		- compiles SASS into CSS
//		- creates SASS sourcemaps (for debugging)
//		- combines indetical media queries into a single one
// 		- adds vendor prefixes
//		- minifies the outputed CSS

gulp.task('sass', function () {

	return gulp.src(path.sass)
	.pipe(sourcemaps.init())
	.pipe(sass())
	.on('error', handleErrors)
	.pipe(sourcemaps.write())
	    // .pipe(autoprefixer({
	    // 	browsers: ['last 2 versions'],
     //        cascade: false
	    // }))
.pipe(cmq())
.pipe(minifyCSS({keepSpecialComments: '0'}))
.pipe(gulp.dest(path.cssDir))
.pipe(browserSync.reload({stream:true}))

});


// 'watch' task
//
//		- watches for changes in files
//		- runs appropriate task when changes are detected
//		- reloads browserSync

gulp.task('watch', ['browser-sync'], function() {

	watch(path.markdown, function() { gulp.start('markdown'); });
	watch(path.html, function() { gulp.start('html'); });
	watch(path.sass, function() { gulp.start('sass'); });

});




// 'default' task
//
// 		- default set of tasks that are triggered after running 'gulp'

gulp.task('default', ['sass', 'markdown', 'html', 'watch']);
