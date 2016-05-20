"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MainCtrl', function (ionicMaterialInk) {

	ionicMaterialInk.displayEffect();

  var fab = document.getElementById('fab_seemy');
  fab.addEventListener('click', function() {
      location.href = 'https://twitter.com/ZachFitzgerald';
  });
});
