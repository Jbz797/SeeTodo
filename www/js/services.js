(function () {

	'use strict';

	angular.module('seetodo')

	.factory('storage', function ($localForage, $q, $timeout) {

		var forage = $localForage;
		var todos = [];

		return {

			/**
			 * @name Add
			 * @desc Ajoute une tâche en base et met à jour le scope
			 * @param {Object} la tâche à ajouter
			 * @returns {Object} une promesse
			 */
			add: function (todo) {
				var thisTodo = {
					activate: true,
					color: false,
					date: new Date(),
					delete: false,
					description: '',
					id: todo.id ? todo.id : Math.floor(Math.random() * 100000) + 1,
					title: todo.title
				};
				var q = $q.defer();
				forage.setItem(thisTodo.id, thisTodo)
					.then(function (result) {
						todos.push(thisTodo);
						q.resolve(result);
					});
				return q.promise;
			},

			/**
			 * @name ClearAll
			 * @desc Supprime la base dans sa totalité et met à jour le scope
			 * @returns {Object} une promesse
			 */
			clearAll: function () {
				var q = $q.defer();
				forage.clear()
					.then(function (result) {
						console.log('SeeTodo -> Toutes les tâches ont bien été supprimées');
						for(var variable in todos) {
							todos[variable] = {};
						}
						q.resolve(result);
					});
				return q.promise;
			},

			/**
			 * @name CountTodos
			 * @desc Renvoi le nombre de tâches actives
			 * @returns {Number} le nombre de tâches
			 */
			countTodos: function () {
				console.log('SeeTodo -> Nombre de tâches: ' + todos.length);
				return todos.length;
			},

			/**
			 * @name Delete
			 * @desc Supprime une tâche en base et met à jour le scope
			 * @param {Object} la tâche à supprimer
			 * @returns {Object} une promesse
			 */
			delete: function (todo) {
				var thisTodo = {
					activate: todo.activate,
					color: todo.color,
					date: todo.date,
					delete: true,
					description: todo.description,
					id: todo.id,
					title: todo.title
				};
				var q = $q.defer();
				forage.setItem(thisTodo.id, thisTodo)
					.then(function (result) {
						todos[todos.indexOf(todo)].delete = true;
						q.resolve(result);
					});
				return q.promise;
			},

			/**
			 * @name Edit
			 * @desc Modifie une tâche en base et met à jour le scope
			 * @param {Object} la tâche à modifier
			 * @returns {Object} une promesse
			 */
			edit: function (todo) {
				var q = $q.defer();
				var that = this;
				forage.setItem(todo.id, todo)
					.then(function (result) {
						that.refresh(todo);
						q.resolve(result);
					});
				return q.promise;
			},

			/**
			 * @name Get_Database
			 * @desc Charge la base de données
			 * @returns {Object} une promesse
			 */
			getDatabase: function () {
				if(todos.length === 0) {
					var q = $q.defer();
					forage.iterate(function (value, key) {
							if(angular.isString(value.title)) {
								todos.push(value);
							}
						})
						.then(function (result) {
							q.resolve(result);
						});
					return q.promise;
				}
			},

			/**
			 * @name Get_Todo
			 * @desc Récupère une tâche en base
			 * @param {Object} la tâche à récupérer
			 * @returns {Object} une promesse
			 */
			getTodo: function (todo) {
				var q = $q.defer();
				forage.getItem(todo.id)
					.then(function (result) {
						q.resolve(result);
					});
				return q.promise;
			},

			/**
			 * @name Get_Todos
			 * @desc Renvoi la liste des tâches
			 * @returns {Object} la liste des tâches
			 */
			getTodos: function () {
				return todos;
			},

			/**
			 * @name Refresh
			 * @desc Désactive puis re-active une tâche afin de rénitialiser le swipe
			 * @param {Object} la tâche à actualiser
			 */
			refresh: function (todo) {
				var todoToRefresh = todos[todos.indexOf(todo)];
				todoToRefresh.delete = !todoToRefresh.delete;
				$timeout(function () {
					todoToRefresh.delete = !todoToRefresh.delete;
				}, 0);
			},

			/**
			 * @name Swith
			 * @desc Inverse l'état d'activation d'une tâche en base et met à jour le scope
			 * @param {Object} la tâche à inverser
			 * @returns {Object} une promesse
			 */
			switch: function (todo) {
				var thisTodo = {
					activate: !todo.activate,
					color: todo.color,
					date: todo.date,
					delete: todo.delete,
					description: todo.description,
					id: todo.id,
					title: todo.title
				};
				var q = $q.defer();
				forage.setItem(thisTodo.id, thisTodo)
					.then(function (result) {
						todos[todos.indexOf(todo)].activate = thisTodo.activate;
						q.resolve(result);
					});
				return q.promise;
			}

		};
	});
})();
