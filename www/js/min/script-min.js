"use strict";var seetodoApp=angular.module("seetodo",["ionic","ionic-material","seetodo.controllers","seetodo.services"]);seetodoApp.run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]),seetodoApp.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"MainCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html"}}}),t.otherwise("/app/main")}]);var seetodoCtrl=angular.module("seetodo.controllers",[]);seetodoCtrl.controller("MainCtrl",["ionicMaterialInk",function(e){e.displayEffect();var t=document.getElementById("fab_seemy");t.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var o=document.getElementById("fab_seemy");o.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"})}]);var seetodoService=angular.module("seetodo.services",[]);