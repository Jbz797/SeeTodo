"use strict";angular.module("seetodo",["ionic","ionic-material","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$q","$scope","storage",function(e,t,o,n){var a=document.getElementById("fab_seemy");a.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},o.addTodo=function(){var e=o.newTodo;if(e.title.length>0){var a=t.defer();n.add(e).then(function(){o.todos_list.push(e)})["finally"](function(e){a.resolve(e),o.newTodo={}})}}}]),angular.module("seetodo").factory("storage",["$localForage",function(e){return{add:function(t){var o="Erreur lors de l'ajout de la tâche";return e.setItem(t.title,"test").then(function(){e.getItem(t.title).then(function(e){e="test",o="Tâche ajoutée en base"})}),o}}}]);