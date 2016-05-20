"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MainCtrl', function (ionicMaterialInk) {

	ionicMaterialInk.displayEffect();

	var fab = document.getElementById('fab_seemy');
	fab.addEventListener('click', function () {
    window.open(
      'https://www.seemy.com/fr/',
      '_blank'
    );
	});
});
