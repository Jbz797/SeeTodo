"use strict";var seetodoApp=angular.module("seetodo",["ionic","seetodo.controllers","seetodo.services"]);seetodoApp.run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]),seetodoApp.config(["$stateProvider","$urlRouterProvider",function(e,o){e.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"MainCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html"}}}),o.otherwise("/app/main")}]);var seetodoCtrl=angular.module("seetodo.controllers",[]);seetodoCtrl.controller("MainCtrl",["$scope","$stateParams",function(e,o){ionic.material.ink.displayEffect()}]);var seetodoService=angular.module("seetodo.services",[]);