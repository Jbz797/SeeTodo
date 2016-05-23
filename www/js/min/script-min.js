"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}).state("app.active",{url:"/main/active",views:{menuContent:{templateUrl:"templates/active.html",controller:"MainCtrl"}}}).state("app.dones",{url:"/main/dones",views:{menuContent:{templateUrl:"templates/dones.html",controller:"MainCtrl"}}}).state("app.deletes",{url:"/main/deletes",views:{menuContent:{templateUrl:"templates/deletes.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate",function(e,t){e.showMenu=function(){t.toggleLeft()}}]).controller("MainCtrl",["ionicMaterialInk","$ionicPopup","$scope","storage",function(e,t,o,n){var i=document.getElementById("fab_seemy");i.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},n.get_database(),o.todos=n.get_todos(),o.addTodo=function(){var e=o.newTodo;e.title.length>0&&n.add(e).then(function(e){o.newTodo={}})},o.switchTodo=function(e){e.title.length>0&&n["switch"](e)},o.deleteTodo=function(e){e.title.length>0&&n["delete"](e)},o.editTodo=function(e){e.title.length>0&&n.edit(e)},o.showDetailsPopup=function(e){o.todo=e,t.show({templateUrl:"../templates/popup_details.html",title:"Details",scope:o,buttons:[{text:"OK"}]})},o.showEditPopup=function(e){o.todo=e,t.show({templateUrl:"../templates/popup_edit.html",title:"Modifier",scope:o,buttons:[{text:"Annuler"},{text:"Sauvegarder",type:"button-balanced",onTap:o.editTodo(e)}]})},o.showConfirm=function(){var e=t.confirm({title:"Tout supprimer",template:"Êtes-vous sûr de vouloir tout supprimer ? (Supprimera même les tâches actives)",okType:"button button-small button-balanced"});e.then(function(e){e&&n.clearAll()})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(e,t){var o=e;return{add:function(e){var n={activate:!0,color:!1,date:new Date,"delete":!1,description:"",id:e.id?e.id:Math.floor(1e5*Math.random())+1,title:e.title},i=t.defer();return o.setItem(n.id,n).then(function(e){console.log('SeeTodo -> Tâche "'+n.id+'" ajoutée en base'),todos.push(n),i.resolve(e)}),i.promise},clearAll:function(e){var n=t.defer();return o.clear().then(function(e){console.log("SeeTodo -> Toutes les tâches ont bien été supprimées");for(var t in todos)todos[t]={};n.resolve(e)}),n.promise},"delete":function(e){var n={activate:e.activate,color:e.color,date:e.date,"delete":!0,description:e.description,id:e.id,title:e.title},i=t.defer();return o.setItem(n.id,n).then(function(t){console.log('SeeTodo -> Tâche "'+n.id+'" archivée'),todos[todos.indexOf(e)]["delete"]=!0,i.resolve(t)}),i.promise},edit:function(e){var n={activate:e.activate,color:e.color,date:e.date,"delete":e["delete"],description:e.description,id:e.id,title:e.title},i=t.defer();return o.setItem(n.id,n).then(function(t){console.log('SeeTodo -> Tâche "'+n.id+'" modifiée'),todos[todos.indexOf(e)].color=n.color,todos[todos.indexOf(e)].description=n.description,todos[todos.indexOf(e)].title=n.title,i.resolve(t)}),i.promise},get_database:function(){if(0===todos.length){var e=t.defer();return o.iterate(function(e,t){angular.isString(e.title)&&todos.push(e)}).then(function(t){console.log("SeeTodo -> Base de donnée chargée correctement"),e.resolve(t)}),e.promise}},get_todo:function(e){var n={};t.defer();return o.getItem(e.id).then(function(e){n=e}),n},get_todos:function(){return todos},"switch":function(e){var n={activate:!e.activate,color:e.color,date:e.date,"delete":e["delete"],description:e.description,id:e.id,title:e.title},i=t.defer();return o.setItem(n.id,n).then(function(t){console.log('SeeTodo -> Tâche "'+n.id+'" inversée'),todos[todos.indexOf(e)].activate=n.activate,i.resolve(t)}),i.promise}}}]);