"use strict";angular.module("seetodo",["ionic","ionic-material","LocalForageModule"]).run(["$ionicPlatform",function(o){o.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$stateProvider","$urlRouterProvider",function(o,e){o.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),e.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(o){o.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(o,e,t){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var a=document.getElementById("fab_git_hub");a.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),e.newTodo={},e.addTodo=function(){var o=e.newTodo;o.title.length>0&&t.add(o).then(function(){e.todos_list.push(o)})["finally"](function(){console.log("Todo envoyée avec succés"),e.newTodo={}})}}]),angular.module("seetodo").factory("storage",["$q",function(o){return{add:function(e){var t=o.defer();return window.localStorage.SeeTodo=angular.toJson(e),t.promise}}}]);