"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MainCtrl', function (ionicMaterialInk) {

	ionicMaterialInk.displayEffect();

	var fab_seemy = document.getElementById('fab_seemy');
	fab_seemy.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});

	var fab_git_hub = document.getElementById('fab_seemy');
	fab_git_hub.addEventListener('click', function () {
		location.href = 'https://twitter.com/ZachFitzgerald';
	});
});
