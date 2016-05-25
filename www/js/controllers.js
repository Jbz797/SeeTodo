(function () {

	"use strict";

	angular.module('seetodo')

	.controller('AppCtrl', function (ionicMaterialInk) {
		ionicMaterialInk.displayEffect(); // Actionne les effets de vague sur certains éléments
		if(ionic.Platform.isIOS()) { // Vérifie si l'on se trouve sur une plateforme ios
			vm.is_ios = true;
		}
	})

	.controller('NavCtrl', function ($ionicSideMenuDelegate) {

		var vm = this;

		/**
		 * @name ShowMenu
		 * @desc Affiche le slide munu de gauche
		 */
		vm.showMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};

		/**
		 * @desc Vérifie si le menu est ouvert
		 */
		vm.$watch(function () {
			return $ionicSideMenuDelegate.isOpen();
		}, function (value) {
			vm.is_open = value;
		});

		/**
		 * @desc Vérifie l'url actuelle
		 */
		vm.$watch(function () {
			return location.hash;
		}, function (value) {
			vm.url = value;
		});
	})

	.controller('MainCtrl', function (ionicMaterialInk, $ionicPopup, storage) {

		var vm = this;

		vm.newTodo = {};
		vm.todos = storage.get_todos();
		storage.get_database(); // On charge la base de donnée

		/**
		 * @name AddTodo
		 * @desc Ajoute une tâche
		 */
		vm.addTodo = function () {
			var newTodo = vm.newTodo;
			if(newTodo.title.length > 0) {
				storage.add(newTodo)
					.then(function success(response) {
						vm.newTodo = {};
					});
			}
		};

		/**
		 * @name SwithTodo
		 * @desc Inverse l'état d'activation d'une tâche
		 * @param {Object} la tâche à inverser
		 */
		vm.switchTodo = function (todo) {
			if(todo.title.length > 0) {
				storage.switch(todo);
			}
		};

		/**
		 * @name DeleteTodo
		 * @desc Supprime une tâche
		 * @param {Object} la tâche à supprimer
		 */
		vm.deleteTodo = function (todo) {
			if(todo.title.length > 0) {
				storage.delete(todo);
			}
		};

		/**
		 * @name EditTodo
		 * @desc Modifie une tâche
		 * @param {Object} la tâche à modifier
		 */
		vm.editTodo = function (todo) {
			if(todo.title.length > 0) {
				storage.edit(todo);
			}
		};

		/**
		 * @name ShowDetailsPopup
		 * @desc Affiche les details d'une tâche
		 * @param {Object} la tâche concernée
		 */
		vm.showDetailsPopup = function (todo) {
			vm.todo = todo;
			$ionicPopup.show({
				templateUrl: 'templates/popup_details.html',
				title: 'Details',
				scope: vm,
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
		vm.showEditPopup = function (todo) {
			vm.todo = todo;
			$ionicPopup.show({
				templateUrl: 'templates/popup_edit.html',
				title: 'Modifier',
				scope: vm,
				buttons: [{
					text: 'Annuler'
				}, {
					text: 'Sauvegarder',
					type: 'button-balanced',
					onTap: function () {
						vm.editTodo(todo);
					}
				}]
			});
		};

		/**
		 * @name ShowConfirm
		 * @desc Popup de confirmation avant suppression de la base
		 */
		vm.showConfirm = function () {
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
})();
