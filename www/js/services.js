"use strict";

angular.module('seetodo')

.factory('storage', function ($q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			localStorage.setItem("1", JSON.stringify(todo));
			return deferred.promise;
		}

	};
});
