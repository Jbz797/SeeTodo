"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate",function(e,t){e.showMenu=function(){t.toggleLeft()}}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(e,t,o){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),t.newTodo={},o.get_database(),t.todos=o.get_todos(),t.addTodo=function(){var e=t.newTodo;e.title.length>0&&o.add(e).then(function(e){t.newTodo={}})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(e,t){return{add:function(o){var n=t.defer();return n.resolve(e.setItem(o.title,{title:o.title}).then(function(){e.getItem(o.title).then(function(e){e.title===o.title&&(console.log('SeeTodo -> Tâche "'+o.title+'" ajoutée en base'),todos.push(o))})})),n.promise},get_database:function(){var o=t.defer();return o.resolve(e.clear().iterate(function(e,t){angular.isString(e.title)&&todos.push(e)}).then(function(e){console.log("SeeTodo -> Base de donnée chargée correctement")})),o.promise},get_todos:function(){return todos}}}]);