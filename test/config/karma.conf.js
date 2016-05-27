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
			'www/lib/localforage/dist/localforage.js',
			'www/lib/angular-localforage/dist/angular-localForage.js',
			'www/js/debug/script.js',
			'test/unit/*.js'
		],
		frameworks: ['mocha', 'chai-sinon'],
		plugins: [
			'angular-mocks',
			'karma-chai-sinon',
			'karma-mocha-reporter',
			'karma-mocha',
			'karma-phantomjs-launcher'
		],
		reporters: ['mocha'],
		singleRun: false
	});
};
