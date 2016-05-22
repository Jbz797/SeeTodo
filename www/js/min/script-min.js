"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate",function(e,t){e.showMenu=function(){t.toggleLeft()}}]).controller("MainCtrl",["ionicMaterialInk","$ionicPopup","$scope","storage",function(e,t,o,n){var i=document.getElementById("fab_seemy");i.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var a=document.getElementById("fab_git_hub");a.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},n.get_database(),o.todos=n.get_todos(),o.addTodo=function(){var e=o.newTodo;e.title.length>0&&n.add(e).then(function(e){o.newTodo={}})},o.switchTodo=function(e){e.title.length>0&&n["switch"](e)},o.deleteTodo=function(e){e.title.length>0&&n["delete"](e)},o.showPopup=function(e){t.show({templateUrl:"../templates/popup_edit.html/"+e.title,title:"Modifier la tâche",cssClass:"popup_edit",buttons:[{text:"Annuler"},{text:"Sauvegarder",type:"button-balanced",onTap:function(e){return o.data.wifi?o.data.wifi:void e.preventDefault()}}]})}}]).controller("popup_editCtrl",["ionicMaterialInk","$ionicPopup","$scope","storage",function(e,t,o,n){o.newTodo={},n.get_database(),o.todos=n.get_todos(),o.editTodo=function(){var e=o.newTodo;e.title.length>0&&n.add(e).then(function(e){o.newTodo={}})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(e,t){return{add:function(o){var n=t.defer(),i={activate:!0,"delete":!1,title:o.title};return n.resolve(e.setItem(o.title,i).then(function(){console.log('SeeTodo -> Tâche "'+o.title+'" ajoutée en base'),todos.push(i)})),n.promise},"delete":function(o){var n=t.defer(),i={activate:o.activate,"delete":!0,title:o.title};return n.resolve(e.setItem(o.title,i).then(function(){console.log('SeeTodo -> Tâche "'+o.title+'" archivée');for(var e in todos)todos[e].title===o.title&&(todos[e]["delete"]=!0)})),n.promise},get_database:function(){var o=t.defer();return o.resolve(e.iterate(function(e,t){angular.isString(e.title)&&todos.push(e)}).then(function(e){console.log("SeeTodo -> Base de donnée chargée correctement")})),o.promise},get_todos:function(){return todos},"switch":function(o){var n=t.defer(),i={activate:!o.activate,"delete":o["delete"],title:o.title};return n.resolve(e.setItem(o.title,i).then(function(){console.log('SeeTodo -> Tâche "'+o.title+'" inversée');for(var e in todos)todos[e].title===o.title&&(todos[e].activate=!o.activate)})),n.promise}}}]);