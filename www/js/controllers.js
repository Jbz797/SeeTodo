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

	});
})();
