"use strict";

angular.module('seetodo')

.controller('AppCtrl', function (ionicMaterialInk, $scope) {
	ionicMaterialInk.displayEffect(); // Actionne les effets de vague sur certains éléments
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

	$scope.newTodo = {};
	$scope.todos = storage.get_todos();
	storage.get_database();

	/**
	 * @name AddTodo
	 * @desc Ajoute une tâche
	 */
	$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		if(newTodo.title.length > 0) {
			storage.add(newTodo)
				.then(function success(response) {
					$scope.newTodo = {};
				});
		}
	};

	/**
	 * @name SwithTodo
	 * @desc Inverse l'état d'activation d'une tâche
	 * @param {Object} la tâche à inverser
	 */
	$scope.switchTodo = function (todo) {
		if(todo.title.length > 0) {
			storage.switch(todo);
		}
	};

	/**
	 * @name DeleteTodo
	 * @desc Supprime une tâche
	 * @param {Object} la tâche à supprimer
	 */
	$scope.deleteTodo = function (todo) {
		if(todo.title.length > 0) {
			storage.delete(todo);
		}
	};

	/**
	 * @name EditTodo
	 * @desc Modifie une tâche
	 * @param {Object} la tâche à modifier
	 */
	$scope.editTodo = function (todo) {
		if(todo.title.length > 0) {
			storage.edit(todo);
		}
	};

	/**
	 * @name ShowDetailsPopup
	 * @desc Affiche les details d'une tâche
	 * @param {Object} la tâche concernée
	 */
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

	/**
	 * @name ShowEditPopup
	 * @desc Affiche la popup d'édition d'une tâche
	 * @param {Object} la tâche concernée
	 */
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

	/**
	 * @name ShowConfirm
	 * @desc Popup de confirmation avant suppression de la base
	 */
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
