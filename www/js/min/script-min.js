"use strict";angular.module("seetodo",["ionic","ionic-material","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(e,t,o){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),t.newTodo={},t.todos=o.get_todos(),t.addTodo=function(){var e=t.newTodo;e.title.length>0&&o.add(e).then(function(e){t.newTodo={}})}}]),angular.module("seetodo").factory("storage",["$localForage","$q",function(e,t){var o=[];return{add:function(n){var r=t.defer();return r.resolve(e.setItem(n.title,"test").then(function(){e.getItem(n.title).then(function(e){"test"===e&&(console.log('Tâche "'+n.title+'" ajoutée en base'),o.push(n.title))})})),r.promise},get_todos:function(){return o}}}]);