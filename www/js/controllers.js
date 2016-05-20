"use strict";

var seetodoCtrl = angular.module('seetodo.controllers', []);

seetodoCtrl.controller('MainCtrl', function ($scope, $stateParams) {
	ionic.material.ink.displayEffect();
});
