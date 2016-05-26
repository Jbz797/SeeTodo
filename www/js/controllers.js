(function () {

	'use strict';

	angular.module('seetodo')

	.controller('AppCtrl', function (ionicMaterialInk, $scope, storage) {
		ionicMaterialInk.displayEffect(); // Actionne les effets de vague sur certains éléments
		storage.getDatabase()
			.then(function succes(response) {
				console.log('SeeTodo -> Base de donnée chargée correctement');
			}); // On charge la base de donnée
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
			$scope.isOpen = value;
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

	.controller('MainCtrl', function (ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $ionicSlideBoxDelegate, $scope, storage, $timeout) {

		$scope.animation = {};
		$scope.newTodo = {};
		$scope.todos = storage.getTodos();
		var configEditTodos = {
			finishDelayThrottle: 0,
			finishSpeedPercent: 0.5,
			leftOffsetPercentage: 0.8,
			startVelocity: 1100
		};

		/**
		 * @name AddTodo
		 * @desc Ajoute une tâche
		 */
		$scope.addTodo = function () {
			var newTodo = $scope.newTodo;
			if(newTodo.title.length > 0) {
				storage.add(newTodo)
					.then(function success(response) {
						console.log('SeeTodo -> Tâche "' + response.id + '" ajoutée en base');
						$scope.newTodo = {};
						$timeout(function () {
							ionicMaterialMotion.ripple();
						}, 0);

						// Invitation au swipe
						if(storage.countTodos() === 1) {
							var vitesseInvitation = 600;
							$timeout(function () {
									$ionicSlideBoxDelegate.next();
								}, vitesseInvitation)
								.then(function () {
									$timeout(function () {
										$ionicSlideBoxDelegate.previous();
									}, vitesseInvitation);
								});
						}
					});
			}
		};

		/**
		 * @name DeleteTodo
		 * @desc Supprime une tâche
		 * @param {Object} la tâche à supprimer
		 */
		$scope.deleteTodo = function (todo) {
			if(todo.title.length > 0) {
				storage.delete(todo)
					.then(function success(response) {
						console.log('SeeTodo -> Tâche "' + response.id + '" archivée');
					});
			}
		};

		/**
		 * @name EditTodo
		 * @desc Modifie une tâche
		 * @param {Object} la tâche à modifier
		 */
		$scope.editTodo = function (todo) {
			if(todo.title.length > 0) {
				storage.edit(todo)
					.then(function success(response) {
						console.log('SeeTodo -> Tâche "' + response.id + '" modifiée');
						$timeout(function () {
							ionicMaterialMotion.ripple(configEditTodos);
						}, 0);
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
				storage.switch(todo)
					.then(function (reponse) {
						console.log('SeeTodo -> Tâche "' + reponse.id + '" inversée');
					});
			}
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

		$timeout(function () {
			ionicMaterialMotion.ripple();
		}, 0);
	});
})();
