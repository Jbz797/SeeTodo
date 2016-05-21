"use strict";

var app = angular.module('seetodo.services', []);

app.factory('storage', function ($q, $scope) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			$scope.todos.push(todo);
			localStorage.setItem("1", JSON.stringify(todo));
			deferred.resolve($scope.todos);
			return deferred.promise;
		}

	};
});
