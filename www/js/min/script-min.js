"use strict";var app=angular.module("seetodo",["ionic","ionic-material","seetodo.controllers","seetodo.services"]);app.run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]),app.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),t.otherwise("/app/main")}]);var app=angular.module("seetodo.controllers",[]);app.controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]),app.controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(e,t,o){var a=document.getElementById("fab_seemy");a.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"})}]);var app=angular.module("seetodo.services",[]);app.factory("storage",["$q","$scope",function(e,t){return{add:function(o){var a=e.defer();return t.todos.push(o),localStorage.setItem("1",JSON.stringify(o)),a.resolve(t.todos),a.promise}}}]);