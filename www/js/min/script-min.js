"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(t){t.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(t,e,o){t.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),e.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(t){t.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate",function(t,e){t.showMenu=function(){e.toggleLeft()}}]).controller("MainCtrl",["ionicMaterialInk","$scope","storage",function(t,e,o){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var i=document.getElementById("fab_git_hub");i.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),e.newTodo={},o.get_database(),e.todos=o.get_todos(),e.addTodo=function(){var t=e.newTodo;t.title.length>0&&o.add(t).then(function(t){e.newTodo={}})},e.switchTodo=function(t){t.title.length>0&&o["switch"](t)}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(t,e){return{add:function(o){var n=e.defer();return n.resolve(t.setItem(o.title,{activate:!0,title:o.title}).then(function(){t.getItem(o.title).then(function(t){t.title===o.title&&(console.log('SeeTodo -> Tâche "'+o.title+'" ajoutée en base'),todos.push(o))})})),n.promise},get_database:function(){var o=e.defer();return o.resolve(t.iterate(function(t,e){angular.isString(t.title)&&todos.push(t)}).then(function(t){console.log("SeeTodo -> Base de donnée chargée correctement")})),o.promise},get_todos:function(){return todos},"switch":function(o){var n=this,i=e.defer();return i.resolve(t.getItem(o.title).then(function(e){t.setItem(o.title,{activate:!o.activate,title:o.title}).then(function(){e.activate!==o.activate&&(console.log('SeeTodo -> Tâche "'+o.title+'" inversée'),todos=n.get_todos())})})),i.promise}}}]);