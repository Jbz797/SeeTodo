"use strict";

var bump = require('gulp-bump');
var concat = require('gulp-concat');
var fs = require('fs');
var git = require('gulp-git');
var gulp = require('gulp');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var paths = {
	js: './www/js/*.js',
	sass: './www/css/*.scss'
};

var getPackageJson = function () {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('default', ['material-sass', 'sass', 'js', 'watch']);

gulp.task('material-sass', function (done) {
	gulp.src('./www/lib/ionic-material/src/scss/index.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('./www/lib/ionic-material/src/scss/'))
		.on('end', done);
});

gulp.task('sass', function (done) {
	gulp.src(['./scss/ionic.app.scss', './www/lib/Swiper/dist/css/swiper.min.css', paths.sass])
		.pipe(concat('style.css'))
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('./www/css/'))
		.on('end', done);
});

gulp.task('js', function (done) {
	gulp.src(paths.js)
		.pipe(ngAnnotate())
		.pipe(concat('script.js'))
		.pipe(minify({
			noSource: true
		}))
		.pipe(gulp.dest('./www/js/min'))
		.on('end', done);
});

gulp.task('bump', function () {
	gulp.src(['./bower.json', './package.json'])
		.pipe(bump({
			type: 'patch'
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('git', function () {
	var version = getPackageJson()
		.version;
	gulp.src(['./*', '!./node_modules', '!./platforms'])
		.pipe(git.add({}))
		.pipe(git.commit('v' + version));
});

gulp.task('watch', function () {
	gulp.watch(paths.sass, ['sass', 'bump', 'git']);
	gulp.watch(paths.js, ['js', 'bump', 'git']);
});
