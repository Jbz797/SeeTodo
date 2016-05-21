"use strict";var seetodoApp=angular.module("seetodo",["ionic","ionic-material","seetodo.controllers","seetodo.services"]);seetodoApp.run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]),seetodoApp.config(["$stateProvider","$urlRouterProvider",function(e,o){e.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]);var seetodoCtrl=angular.module("seetodo.controllers",[]);seetodoCtrl.controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect();var o=document.getElementById("fab_seemy");o.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var t=document.getElementById("fab_git_hub");t.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"})}]),seetodoCtrl.controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(e,o,t){o.addTodo=function(){var e=o.newTodo;e.length>0&&t.add(e).then(function(){o.newTodo=""})}}]);var seetodoService=angular.module("seetodo.services",[]);seetodoService.factory("storage",["$q","$scope",function(e,o){return{add:function(t){var r=e.defer();return o.todos.push(t),localStorage.setItem("1",JSON.stringify(t)),r.resolve(o.todos),r.promise}}}]);