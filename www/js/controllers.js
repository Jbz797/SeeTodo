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

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		console.log(newTodo.title);
		if(newTodo.title.length > 0) {
			storage.add(newTodo)
				.then(function success() {
					console.log('Todo envoyée avec succés');
					$scope.todos_list.push(newTodo);
					$scope.newTodo = {};
				});
		}
	};
});
