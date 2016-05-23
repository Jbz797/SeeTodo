"use strict";

var todos = [];

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	var forage = $localForage;

	return {

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

		clearAll: function (todo) {
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

		delete: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: todo.activate,
				color: todo.color,
				date: todo.date,
				delete: true,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			deferred.resolve(
				forage.setItem(this_todo.id, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + this_todo.id + '" archivée');
					todos[todos.indexOf(todo)].delete = true;
				}));
			return deferred.promise;
		},

		edit: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: todo.activate,
				color: todo.color,
				date: todo.date,
				delete: todo.delete,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			deferred.resolve(
				forage.setItem(this_todo.id, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + this_todo.id + '" modifiée');
					todos[todos.indexOf(todo)].color = this_todo.color;
					todos[todos.indexOf(todo)].description = this_todo.description;
					todos[todos.indexOf(todo)].title = this_todo.title;
				}));
			return deferred.promise;
		},

		get_database: function () {
			if(todos.length === 0) {
				var deferred = $q.defer();
				deferred.resolve(
					forage.iterate(function (value, key) {
						if(angular.isString(value.title)) {
							todos.push(value);
						}
					})
					.then(function () {
						console.log('SeeTodo -> Base de donnée chargée correctement');
					}));
				return deferred.promise;
			}
		},

		get_todo: function (todo) {
			var this_todo = {};
			forage.getItem(todo.id)
				.then(function (data) {
					this_todo = data;
				});
			return this_todo;
		},

		get_todos: function () {
			return todos;
		},

		switch: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: !todo.activate,
				color: todo.color,
				date: todo.date,
				delete: todo.delete,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			deferred.resolve(
				forage.setItem(this_todo.id, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + this_todo.id + '" inversée');
					todos[todos.indexOf(todo)].activate = this_todo.activate;
				}));
			return deferred.promise;
		}

	};
});
