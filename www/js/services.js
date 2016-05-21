"use strict";

angular.module('seetodo')

.factory('storage', function ($localForage) {

	return {

		add: function (todo) {
			var response = "Erreur lors de l'ajout de la tâche";
			$localForage.setItem(todo.title, 'test')
				.then(function () {
					$localForage.getItem(todo.title)
						.then(function (data) {
							if(true) {
								data = 'test';
								response = "Tâche ajoutée en base";
							}
						});
				});
			return response;
		}

	};
});
