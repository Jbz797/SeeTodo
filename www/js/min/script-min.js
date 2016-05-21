"use strict";angular.module("seetodo",["ionic","ionic-material"]).run(["$ionicPlatform",function(t){t.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$stateProvider","$urlRouterProvider",function(t,o){t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(t){t.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(t,o,e){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var a=document.getElementById("fab_git_hub");a.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},o.addTodo=function(){var t=o.newTodo;t.title.length>0&&e.add(t).then(function(){console.log("Todo envoyée avec succés"),o.todos_list.push(t),o.newTodo={}})}}]),angular.module("seetodo").factory("storage",["$q",function(t){return{add:function(o){var e=t.defer();return localStorage.setItem("1",JSON.stringify(o)),e.promise}}}]);