"use strict";

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
			var this_todo = {
				activate: true,
				color: false,
				date: new Date(),
				delete: false,
				description: '',
				id: todo.id ? todo.id : Math.floor(Math.random() * 100000) + 1,
				title: todo.title
			};
			var q = $q.defer();
			forage.setItem(this_todo.id, this_todo)
				.then(function (result) {
					console.log('SeeTodo -> Tâche "' + this_todo.id + '" ajoutée en base');
					todos.push(this_todo);
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
		 * @name Delete
		 * @desc Supprime une tâche en base et met à jour le scope
		 * @param {Object} la tâche à supprimer
		 * @returns {Object} une promesse
		 */
		delete: function (todo) {
			var this_todo = {
				activate: todo.activate,
				color: todo.color,
				date: todo.date,
				delete: true,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			var q = $q.defer();
			forage.setItem(this_todo.id, this_todo)
				.then(function (result) {
					console.log('SeeTodo -> Tâche "' + this_todo.id + '" archivée');
					todos[todos.indexOf(todo)].delete = true;
					q.resolve(result);
				});
			return q.promise;
		},

		edit: function (todo) {
			var q = $q.defer();
			var that = this;
			forage.setItem(todo.id, todo)
				.then(function (result) {
					console.log('SeeTodo -> Tâche "' + todo.id + '" modifiée');
					that.refresh(todo);
					q.resolve(result);
				});
			return q.promise;
		},

		get_database: function () {
			if(todos.length === 0) {
				var q = $q.defer();
				forage.iterate(function (value, key) {
						if(angular.isString(value.title)) {
							todos.push(value);
						}
					})
					.then(function (result) {
						console.log('SeeTodo -> Base de donnée chargée correctement');
						q.resolve(result);
					});
				return q.promise;
			}
		},

		get_todo: function (todo) {
			var q = $q.defer();
			forage.getItem(todo.id)
				.then(function (result) {
					q.resolve(result);
				});
			return q.promise;
		},

		get_todos: function () {
			return todos;
		},

		refresh: function (todo) {
			var todo_to_refresh = todos[todos.indexOf(todo)];
			todo_to_refresh.delete = !todo_to_refresh.delete;
			$timeout(function () {
				todo_to_refresh.delete = !todo_to_refresh.delete;
			}, 0);
		},

		switch: function (todo) {
			var this_todo = {
				activate: !todo.activate,
				color: todo.color,
				date: todo.date,
				delete: todo.delete,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			var q = $q.defer();
			forage.setItem(this_todo.id, this_todo)
				.then(function (result) {
					console.log('SeeTodo -> Tâche "' + this_todo.id + '" inversée');
					todos[todos.indexOf(todo)].activate = this_todo.activate;
					q.resolve(result);
				});
			return q.promise;
		}

	};
});
