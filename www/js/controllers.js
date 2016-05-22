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

	$scope.showPopup = function (todo) {
		$ionicPopup.show({
			templateUrl: '../templates/popup_edit.html',
			title: 'Modifier la tâche',
			cssClass: 'popup_edit',
			buttons: [{
				text: 'Annuler'
			}, {
				text: 'Sauvegarder',
				type: 'button-balanced',
				onTap: function (e) {
					if(!$scope.data.wifi) {
						//don't allow the user to close unless he enters wifi password
						e.preventDefault();
					} else {
						return $scope.data.wifi;
					}
				}
			}]
		});
	};

	$scope.editTodo = function (todo) {
		/*var newTodo = $scope.newTodo;
		if(newTodo.title.length > 0) {
			storage.add(newTodo)
				.then(function success(response) {
					$scope.newTodo = {};
				});
		}*/
	};
});
