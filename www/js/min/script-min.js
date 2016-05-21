"use strict";angular.module("seetodo",["ionic","ionic-material","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,o,t){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),o.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),t.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(e,o,t){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var a=document.getElementById("fab_git_hub");a.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},o.addTodo=function(e){var n=o.newTodo;if(n.title.length>0){e.defer();t.add(n).then(function(){o.todos_list.push(n)})["finally"](function(){console.log("Todo envoyée avec succés"),o.newTodo={}})}}}]),angular.module("seetodo").factory("storage",["$localForage",function(e){return{add:function(o){var t=$q.defer();return e.setItem(o.title,"test").then(function(){e.getItem(o.title).then(function(e){e="test",console.log("Tâche ajoutée en base")})}),t.promise}}}]);