"use strict";

var todos = [];

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.setItem(todo.title, {
					activate: true,
					title: todo.title
				})
				.then(function () {
					$localForage.getItem(todo.title)
						.then(function (data) {
							if(data.title === todo.title) {
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
			var that = this;
			var deferred = $q.defer();
			deferred.resolve(
				$localForage.getItem(todo.title)
				.then(function (data) {
					$localForage.setItem(todo.title, {
							activate: !todo.activate,
							title: todo.title
						})
						.then(function () {
							if(data.activate !== todo.activate) {
								console.log('SeeTodo -> Tâche "' + todo.title + '" inversée');
								that.get_database();
							}
						});
				}));
			return deferred.promise;
		}

	};
});
