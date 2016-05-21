"use strict";

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			window.localStorage.SeeTodo = angular.toJson(todo);
			return deferred.promise;
		}

	};
});
