"use strict";

angular.module('seetodo', ['ionic', 'ionic-material', 'ksSwiper', 'LocalForageModule'])

.run(function ($ionicPlatform) {
	// Configuration par défault de Ionic
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

.config(function ($ionicConfigProvider, $localForageProvider, $stateProvider, $urlRouterProvider) {

	if(ionic.Platform.isAndroid()) {
		$ionicConfigProvider.scrolling.jsScrolling(false);
	}

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
		})
		.state('app.active', {
			url: '/main/active',
			views: {
				'menuContent': {
					templateUrl: 'templates/active.html',
					controller: 'MainCtrl'
				}
			}
		})
		.state('app.dones', {
			url: '/main/dones',
			views: {
				'menuContent': {
					templateUrl: 'templates/dones.html',
					controller: 'MainCtrl'
				}
			}
		})
		.state('app.deletes', {
			url: '/main/deletes',
			views: {
				'menuContent': {
					templateUrl: 'templates/deletes.html',
					controller: 'MainCtrl'
				}
			}
		});
	$urlRouterProvider.otherwise('/app/main');
});
