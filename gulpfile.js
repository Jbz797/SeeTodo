'use strict';

// Chargement de plug-ins
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var fs = require('fs');
var git = require('gulp-git');
var gulp = require('gulp');
var minify = require('gulp-minify');
var minifyCss = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

// Chemins vers les fichiers de notre application
var paths = {
	js: './www/js/*.js',
	sass: './www/css/*.scss'
};

// Chemins vers les fichiers des librairies
var libs = {
	angularLocalForage: {
		js: './www/lib/angular-localforage/dist/angular-localForage.js'
	},
	ionic: {
		css: './scss/ionic.app.scss'
	},
	ionicMaterial: {
		css: './www/lib/ionic-material/src/scss/index.scss',
		js: './www/lib/ionic-material/dist/ionic.material.js'
	},
	localforage: {
		js: './www/lib/localforage/dist/localforage.js'
	}
};

var getPackageJson = function () {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('default', ['sass', 'js', 'watch']);

// Minifie et concatène le css
gulp.task('sass', function (done) {
	gulp.src(libs.ionicMaterial.css)
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('./www/lib/ionic-material/src/scss/'));
	gulp.src([libs.ionic.css, './www/lib/ionic-material/src/scss/index.min.css', paths.sass])
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

// Minifie et concatène le js
gulp.task('js', function (done) {
	gulp.src([libs.localforage.js, libs.angularLocalForage.js, libs.ionicMaterial.js, paths.js])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./www/js/debug'));
	gulp.src([libs.localforage.js, libs.angularLocalForage.js, libs.ionicMaterial.js, paths.js])
		.pipe(ngAnnotate())
		.pipe(concat('script.js'))
		.pipe(minify({
			noSource: true
		}))
		.pipe(gulp.dest('./www/js/min'))
		.on('end', done);
});

// Incrémente les versions du bower.json et du package.json
gulp.task('bump', function () {
	gulp.src(['./bower.json', './package.json'])
		.pipe(bump({
			type: 'patch'
		}))
		.pipe(gulp.dest('./'));
});

// Commit automatique de la nouvelle version
gulp.task('git', function () {
	var version = getPackageJson()
		.version;
	gulp.src(['./*', '!./node_modules', '!./platforms', '!./plugins'])
		.pipe(git.add({}))
		.pipe(git.commit('v' + version));
});

gulp.task('watch', function () {
	gulp.watch(paths.sass, ['sass', 'bump', 'git']);
	gulp.watch(paths.js, ['js', 'bump', 'git']);
});
