"use strict";

angular.module('seetodo')

.controller('AppCtrl', function (ionicMaterialInk, $scope, storage) {
	ionicMaterialInk.displayEffect();
	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_git_hub');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://github.com/Jbz797/SeeTodo';
	});

	/*$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		if(newTodo.length > 0) {
			storage.add(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				});
		}
	};*/
});
