"use strict";

angular.module('seetodo')

.controller('AppCtrl', function (ionicMaterialInk) {
	ionicMaterialInk.displayEffect();
})

.controller('MainCtrl', function (ionicMaterialInk, $scope, storage) {

	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_git_hub');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://github.com/Jbz797/SeeTodo';
	});

	$scope.newTodo = {};

	$scope.addTodo = function ($q) {
		var newTodo = $scope.newTodo;
		if(newTodo.title.length > 0) {
			var deferred = $q.defer();
			storage.add(newTodo)
				.then(function success() {
					$scope.todos_list.push(newTodo);
				})
				.finally(function () {
					console.log('Todo envoyée avec succés');
					$scope.newTodo = {};
				});
		}
	};
});
