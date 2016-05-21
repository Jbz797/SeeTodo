"use strict";angular.module("seetodo",["ionic","ionic-material","LocalForageModule"]).run(["$ionicPlatform",function(o){o.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(o,t,e){o.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),e.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(o){o.displayEffect()}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(o,t,e){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),t.newTodo={},t.todos=e.get_todos(),t.addTodo=function(){var o=t.newTodo;o.title.length>0&&e.add(o).then(function(o){t.newTodo={},console.log(t.todos)})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(o,t){return{add:function(e){var n=t.defer();return n.resolve(o.setItem(e.title,"test").then(function(){o.getItem(e.title).then(function(o){"test"===o&&(console.log('Tâche "'+e.title+'" ajoutée en base'),todos.push(e.title))})})),n.promise},get_todos:function(){return todos}}}]);