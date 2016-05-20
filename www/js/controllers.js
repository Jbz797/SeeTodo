"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft({'enable-menu-with-back-views':true});
	};
});

seetodoCtrl.controller('MainCtrl', function () {});
