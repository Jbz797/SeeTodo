"use strict";

var todos = [];

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: true,
				title: todo.title
			};
			deferred.resolve(
				$localForage.setItem(todo.title, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + todo.title + '" ajoutée en base');
					todos.push(this_todo);
				}));
			return deferred.promise;
		},

		delete: function (todo) {
			var that = this;
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.removeItem(todo.title)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + todo.title + '" archivée');
					for(var i in todos) {
						if(todos[i].title === todo.title) {
							todos.splice(i, 1);
						}
					}
				}));
			return deferred.promise;
		},

		get_database: function () {
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.iterate(function (value, key) {
					if(angular.isString(value.title)) {
						todos.push(value);
					}
				})
				.then(function (data) {
					console.log('SeeTodo -> Base de donnée chargée correctement');
				}));
			return deferred.promise;
		},

		get_todos: function () {
			return todos;
		},

		switch: function (todo) {
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.setItem(todo.title, {
					activate: !todo.activate,
					title: todo.title
				})
				.then(function () {
					console.log('SeeTodo -> Tâche "' + todo.title + '" inversée');
					for(var i in todos) {
						if(todos[i].title === todo.title) {
							todos[i].activate = !todo.activate;
						}
					}
				}));
			return deferred.promise;
		}

	};
});
