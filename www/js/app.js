"use strict";

angular.module('seetodo', ['ionic', 'ionic-material'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})
		.state('app.main', {
			url: '/main',
			views: {
				'menuContent': {
					templateUrl: 'templates/main.html'
				}
			}
		});
	$urlRouterProvider.otherwise('/app/main');
})
.service('storage', function ($q, $scope) {

	return {

		add: function (todo) {
			var deferred = $q.defer();
			$scope.todos.push(todo);
			localStorage.setItem("1", JSON.stringify(todo));
			deferred.resolve($scope.todos);
			return deferred.promise;
		}

	};
})


.controller('AppCtrl', function (ionicMaterialInk, $scope, storage) {
	ionicMaterialInk.displayEffect();
	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_git_hub');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://github.com/Jbz797/SeeTodo';
	});

	/*$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		if(newTodo.length > 0) {
			storage.add(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				});
		}
	};*/
});
