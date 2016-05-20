"use strict";

var seetodoApp = angular.module('seetodo', ['ionic', 'seetodo.controllers', 'seetodo.services']);

seetodoApp.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

seetodoApp.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('index', {
			url: "/index",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl'
		});
	$urlRouterProvider.otherwise('/index');
});
