"use strict";angular.module("seetodo",["ionic","ionic-material","seetodo.controllers","seetodo.services"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$stateProvider","$urlRouterProvider",function(e,o){e.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo.controllers",[]).controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(e,o,t){var r=document.getElementById("fab_seemy");r.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var n=document.getElementById("fab_git_hub");n.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.addTodo=function(){var e=o.newTodo;e.length>0&&t.add(e).then(function(){o.newTodo=""})}}]),module("seetodo.services",[]).factory("storage",function(e,o){return{add:function(t){var r=e.defer();return o.todos.push(t),localStorage.setItem("1",JSON.stringify(t)),r.resolve(o.todos),r.promise}}});