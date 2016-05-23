"use strict";

angular.module('seetodo')

.controller('AppCtrl', function (ionicMaterialInk) {
	ionicMaterialInk.displayEffect();
})

.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate) {
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

.controller('MainCtrl', function (ionicMaterialInk, $ionicPopup, $scope, storage) {

	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_git_hub');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://github.com/Jbz797/SeeTodo';
	});

	$scope.newTodo = {};
	storage.get_database();
	$scope.todos = storage.get_todos();

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		if(newTodo.title.length > 0) {
			storage.add(newTodo)
				.then(function success(response) {
					$scope.newTodo = {};
				});
		}
	};

	$scope.switchTodo = function (todo) {
		if(todo.title.length > 0) {
			storage.switch(todo);
		}
	};

	$scope.deleteTodo = function (todo) {
		if(todo.title.length > 0) {
			storage.delete(todo);
		}
	};

	$scope.editTodo = function (todo) {
		if(todo.title.length > 0) {
			storage.edit(todo);
		}
	};

	$scope.showDetailsPopup = function (todo) {
		$scope.todo = todo;
		$ionicPopup.show({
			templateUrl: '../templates/popup_details.html',
			title: 'Details',
			scope: $scope,
			buttons: [{
				text: 'OK'
			}]
		});
	};

	$scope.showEditPopup = function (todo) {
		$scope.todo = todo;
		$ionicPopup.show({
			templateUrl: '../templates/popup_edit.html',
			title: 'Modifier',
			scope: $scope,
			buttons: [{
				text: 'Annuler'
			}, {
				text: 'Sauvegarder',
				type: 'button-balanced',
				onTap: $scope.editTodo(todo)
			}]
		});
	};

	$scope.showConfirm = function () {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Tout supprimer',
			template: 'Êtes-vous sûr de vouloir tout supprimer ?',
			okType: 'button-relative'
		});

		confirmPopup.then(function (res) {
			if(res) {
				storage.clearAll();
			}
		});
	};
});
