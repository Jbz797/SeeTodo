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
			'www/lib/swiper/dist/js/swiper.min.js',
			'www/lib/angular-swiper/dist/angular-swiper.js',
			'www/lib/localforage/dist/localforage.min.js',
			'www/lib/angular-localforage/dist/angular-localForage.min.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'www/js/*.js',
			'test/unit/**/*.js'
		],
		frameworks: ['mocha', 'chai', 'sinon'],
		plugins: [
			'karma-chai',
			'karma-mocha',
			'karma-mocha-reporter',
			'karma-phantomjs-launcher',
			'karma-sinon'
		],
		reporters: ['mocha'],
		singleRun: false
	});
};
