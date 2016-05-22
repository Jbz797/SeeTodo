"use strict";

var todos = [];

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			deferred.resolve($localForage.setItem(todo.title, 'test')
				.then(function () {
					$localForage.getItem(todo.title)
						.then(function (data) {
							if(data === 'test') {
								console.log('Tâche "' + todo.title + '" ajoutée en base');
								todos.push(todo);
							}
						});
				}));
			return deferred.promise;
		},

		get_database: function () {
			console.log('database');
		},

		get_todos: function () {
			return todos;
		}

	};
});
