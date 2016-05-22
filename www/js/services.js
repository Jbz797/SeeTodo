"use strict";

var todos = [];

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.setItem(todo.title, {title: todo.title})
				.then(function () {
					$localForage.getItem(todo.title)
						.then(function (data) {
							if(data === 'test') {
								console.log('SeeTodo -> Tâche "' + todo.title + '" ajoutée en base');
								todos.push(todo);
							}
						});
				}));
			return deferred.promise;
		},

		get_database: function () {
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.iterate(function (value, key) {
					if(angular.isString(value)) {
						console.log(value);
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
		}

	};
});
