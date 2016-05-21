"use strict";

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
								return "test";
							}
						});
				}));
			return deferred.promise;
		}

	};
});
