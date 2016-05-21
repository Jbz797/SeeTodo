"use strict";

angular.module('seetodo', ['ionic', 'ionic-material', 'LocalForageModule'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function ($localForageProvider, $stateProvider, $urlRouterProvider) {

	$localForageProvider.config({
		driver: 'localStorageWrapper', // if you want to force a driver
		name: 'myApp', // name of the database and prefix for your data, it is "lf" by default
		version: 1.0, // version of the database, you shouldn't have to use this
		storeName: 'keyvaluepairs', // name of the table
		description: 'some description'
	});

	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})
		.state('app.main', {
			url: '/main',
			views: {
				'menuContent': {
					templateUrl: 'templates/main.html',
					controller: 'MainCtrl'
				}
			}
		});
	$urlRouterProvider.otherwise('/app/main');
});
