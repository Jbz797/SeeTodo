"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function () {
		console.log('test');
		$ionicSideMenuDelegate.toggleLeft();
	};
});

seetodoCtrl.controller('MainCtrl', function () {});
