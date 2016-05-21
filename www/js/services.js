"use strict";

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			$localForage.setItem(todo)
				.then(function () {
					console.log("Tâche ajoutée en base");
					$localForage.getItem('myName')
						.then(function (data) {
							console.log('data');
						});
				});
			return deferred.promise;
		}

	};
});
