"use strict";

angular.module('seetodo')

.factory('storage', function ($q) {

	return {

		add: function (todo) {
			/*var deferred = $q.defer();
			$scope.todos.push(todo);
			localStorage.setItem("1", JSON.stringify(todo));
			deferred.resolve($scope.todos);
			return deferred.promise;*/
		}

	};
});
