(function () {

	'use strict';

	angular.module('seetodo')

	.controller('AppCtrl', function (ionicMaterialInk, $scope) {
		ionicMaterialInk.displayEffect(); // Actionne les effets de vague sur certains éléments
		if(ionic.Platform.isIOS()) { // Vérifie si l'on se trouve sur une plateforme ios
			$scope.isIos = true;
		}
	})

	.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate) {

		/**
		 * @name ShowMenu
		 * @desc Affiche le slide munu de gauche
		 */
		$scope.showMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};

		/**
		 * @desc Vérifie si le menu est ouvert
		 */
		$scope.$watch(function () {
			return $ionicSideMenuDelegate.isOpen();
		}, function (value) {
			$scope.isOpen = value;
		});

		/**
		 * @desc Vérifie l'url actuelle
		 */
		$scope.$watch(function () {
			return location.hash;
		}, function (value) {
			$scope.url = value;
		});
	})

	.controller('MainCtrl', function (ionicMaterialInk, $ionicPopup, $scope, storage) {

	});
})();
