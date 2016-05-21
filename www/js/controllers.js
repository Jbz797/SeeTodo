"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('AppCtrl', function (ionicMaterialInk) {

	ionicMaterialInk.displayEffect();

	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_git_hub');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://github.com/Jbz797/SeeTodo';
	});
});

seetodoCtrl.controller('MainCtrl', function (ionicMaterialInk, $scope, storage) {

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		if(newTodo.length > 0) {
			storage.add(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				});
		}
	};
});
