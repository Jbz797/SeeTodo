"use strict";

angular.module('seetodo')

.controller('AppCtrl', function (ionicMaterialInk, $scope) {
	ionicMaterialInk.displayEffect();
	if(ionic.Platform.isIOS()) {
		$scope.is_ios = true;
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
		$scope.is_open = value;
	});

	// Vérifie l'url coutante
	$scope.$watch(function () {
		return location.hash;
	}, function (value) {
		$scope.url = value;
	});
})

.controller('MainCtrl', function (ionicMaterialInk, $ionicPopup, $scope, storage) {

	$scope.newTodo = {};
	$scope.todos = storage.get_todos();
	storage.get_database();

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
			templateUrl: 'templates/popup_details.html',
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
			templateUrl: 'templates/popup_edit.html',
			title: 'Modifier',
			scope: $scope,
			buttons: [{
				text: 'Annuler'
			}, {
				text: 'Sauvegarder',
				type: 'button-balanced',
				onTap: function () {
					$scope.editTodo(todo);
				}
			}]
		});
	};

	$scope.showConfirm = function () {
		var confirmPopup = $ionicPopup.confirm({
			cancelText: 'Annuler',
			okType: 'button button-small button-balanced',
			template: 'Êtes-vous sûr de vouloir tout supprimer ? (Supprimera même les tâches actives)',
			title: 'Tout supprimer'
		});

		confirmPopup.then(function (res) {
			if(res) {
				storage.clearAll();
			}
		});
	};
});
