"use strict";

var todos = [];

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: true,
				delete: false,
				description: '',
				id: Math.floor(Math.random() * 100000) + 1,
				title: todo.title
			};
			deferred.resolve(
				$localForage.setItem(todo.id, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + todo.id + '" ajoutée en base');
					todos.push(this_todo);
				}));
			return deferred.promise;
		},

		delete: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: todo.activate,
				delete: true,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			deferred.resolve(
				$localForage.setItem(todo.id, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + todo.id + '" archivée');
					for(var i in todos) {
						if(todos[i].id === todo.id) {
							todos[i].delete = true;
						}
					}
				}));
			return deferred.promise;
		},

		edit: function (todo) {
			var deferred = $q.defer();
			var this_todo = {
				activate: todo.activate,
				delete: todo.delete,
				description: todo.description,
				id: todo.id,
				title: todo.title
			};
			deferred.resolve(
				$localForage.setItem(todo.id, this_todo)
				.then(function () {
					console.log('SeeTodo -> Tâche "' + todo.id + '" modifiée');
					for(var i in todos) {
						if(todos[i].title === todo.title) {
							todos[i].title = todo.title;
							todos[i].description = todo.description;
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
			var this_todo = {
				activate: !todo.activate,
				delete: todo.delete,
				description: todo.description,
				title: todo.title
			};
			deferred.resolve(
				$localForage.setItem(todo.title, this_todo)
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
