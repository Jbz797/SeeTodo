"use strict";

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	var todos = [];

	return {

		add: function (todo) {
			var deferred = $q.defer();
			deferred.resolve($localForage.setItem(todo.title, 'test')
				.then(function () {
					$localForage.getItem(todo.title)
						.then(function (data) {
							if(data === 'test') {
								console.log('Tâche "' + todo.title + '" ajoutée en base');
								todos.push(todo.title);
							}
						});
				}));
			return deferred.promise;
		}
	};
});
