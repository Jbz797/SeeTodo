"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate",function(e,t){e.showMenu=function(){t.toggleLeft()}}]).controller("MainCtrl",["ionicMaterialInk","$ionicPopup","$scope","storage",function(e,t,o,i){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var d=document.getElementById("fab_git_hub");d.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},i.get_database(),o.todos=i.get_todos(),o.addTodo=function(){var e=o.newTodo;e.title.length>0&&i.add(e).then(function(e){o.newTodo={}})},o.switchTodo=function(e){e.title.length>0&&i["switch"](e)},o.deleteTodo=function(e){e.title.length>0&&i["delete"](e)},o.editTodo=function(e){e.title.length>0&&i.edit(e)},o.showDetailsPopup=function(e){o.todo=e,t.show({templateUrl:"../templates/popup_details.html",title:"Details",cssClass:"popup_details",scope:o,buttons:[{text:"OK"}]})},o.showEditPopup=function(e){o.todo=e,t.show({templateUrl:"../templates/popup_edit.html",title:"Modifier",cssClass:"popup_edit",scope:o,buttons:[{text:"Annuler"},{text:"Sauvegarder",type:"button-balanced",onTap:o.editTodo(e)}]})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(e,t){return{add:function(o){var i=t.defer(),n={activate:!0,date:new Date,"delete":!1,description:"",id:Math.floor(1e5*Math.random())+1,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" ajoutée en base'),todos.push(n)})),i.promise},"delete":function(o){var i=t.defer(),n={activate:o.activate,date:o.date,"delete":!0,description:o.description,id:o.id,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" archivée');for(var e in todos)todos[e].id===n.id&&(todos[e]["delete"]=!0)})),i.promise},edit:function(o){var i=t.defer(),n={activate:o.activate,date:new Date,"delete":o["delete"],description:o.description,id:o.id,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" modifiée');for(var e in todos)todos[e].id===n.id&&(todos[e].date=o.date,todos[e].description=o.description,todos[e].title=o.title)})),i.promise},get_database:function(){var o=t.defer();return o.resolve(e.iterate(function(e,t){angular.isString(e.title)&&todos.push(e)}).then(function(e){console.log("SeeTodo -> Base de donnée chargée correctement")})),o.promise},get_todos:function(){return todos},"switch":function(o){var i=t.defer(),n={activate:!o.activate,date:o.date,"delete":o["delete"],description:o.description,id:o.id,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" inversée');for(var e in todos)todos[e].id===n.id&&(todos[e].activate=!o.activate)})),i.promise}}}]);