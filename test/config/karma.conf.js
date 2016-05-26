'use strict';

module.exports = function (config) {

	config.set({
		autoWatch: true,
		basePath: '../../',
		browsers: ['PhantomJS'],
		colors: true,
		files: [
			'www/lib/ionic/release/js/ionic.bundle.js',
			'www/lib/ionic-material/dist/ionic.material.js',
			'www/lib/localforage/dist/localforage.min.js',
			'www/lib/angular-localforage/dist/angular-localForage.min.js',
			'www/js/*.js',
			'test/unit/**/*.js'
		],
		frameworks: ['jasmine'],
		plugins: [
			'angular-mocks',
			'karma-jasmine',
			'karma-mocha-reporter',
			'karma-mocha',
			'karma-phantomjs-launcher',
			'mocha'
		],
		reporters: ['mocha'],
		singleRun: false
	});
};
