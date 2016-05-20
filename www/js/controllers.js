"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
});

seetodoCtrl.controller('MainCtrl', function () {});
