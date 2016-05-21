"use strict";

angular.module('seetodo')

.factory('storage', function ($localForage, $q) {

	return {

		add: function (todo) {
			$localForage.setItem(todo)
				.then(function () {
					console.log("ok");
				});
			return;
		}

	};
});
