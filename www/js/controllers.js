"use strict";

angular.module('seetodo')

.controller('AppCtrl', function (ionicMaterialInk) {
	ionicMaterialInk.displayEffect();
})

.controller('MainCtrl', function (ionicMaterialInk, $scope, storage) {

	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_git_hub');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://github.com/Jbz797/SeeTodo';
	});

	$scope.options = {
		loop: false,
		effect: 'fade',
		speed: 500,
	};

	$scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
		// data.slider is the instance of Swiper
		$scope.slider = data.slider;
	});

	$scope.newTodo = {};
	$scope.todos = storage.get_todos();

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo;
		if(newTodo.title.length > 0) {
			storage.add(newTodo)
				.then(function success(response) {
					$scope.newTodo = {};
					console.log($scope.todos);
				});
		}
	};
});
