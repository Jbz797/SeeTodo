"use strict";

angular.module('seetodo', ['ionic', 'ionic-material', 'ksSwiper', 'LocalForageModule'])

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
		driver: 'localStorageWrapper',
		name: 'SeeTodo',
		version: 1.0,
		storeName: 'todos_list',
		description: 'todos list for SeeTodo app'
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
