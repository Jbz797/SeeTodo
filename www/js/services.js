"use strict";

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			$localForage.setItem(todo)
				.then(function () {
					console.log("ok");
				});
			return deferred.promise;
		}

	};
});
