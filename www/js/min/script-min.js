"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$ionicConfigProvider","$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o,n){ionic.Platform.isAndroid()&&e.scrolling.jsScrolling(!1),t.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),o.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}).state("app.active",{url:"/main/active",views:{menuContent:{templateUrl:"templates/active.html",controller:"MainCtrl"}}}).state("app.dones",{url:"/main/dones",views:{menuContent:{templateUrl:"templates/dones.html",controller:"MainCtrl"}}}).state("app.deletes",{url:"/main/deletes",views:{menuContent:{templateUrl:"templates/deletes.html",controller:"MainCtrl"}}}),n.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate","$state",function(e,t,o){e.showMenu=function(){t.toggleLeft()},e.$watch("myVar",function(){e.url=o.current.url})}]).controller("MainCtrl",["ionicMaterialInk","$ionicPopup","$scope","storage",function(e,t,o,n){var i=document.getElementById("fab_seemy");i.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},n.get_database(),o.todos=n.get_todos(),o.addTodo=function(){var e=o.newTodo;e.title.length>0&&n.add(e).then(function(e){o.newTodo={}})},o.switchTodo=function(e){e.title.length>0&&n["switch"](e)},o.deleteTodo=function(e){e.title.length>0&&n["delete"](e)},o.editTodo=function(e){e.title.length>0&&n.edit(e)},o.showDetailsPopup=function(e){o.todo=e,t.show({templateUrl:"templates/popup_details.html",title:"Details",scope:o,buttons:[{text:"OK"}]})},o.showEditPopup=function(e){o.todo=e,t.show({templateUrl:"templates/popup_edit.html",title:"Modifier",scope:o,buttons:[{text:"Annuler"},{text:"Sauvegarder",type:"button-balanced",onTap:function(){o.editTodo(e)}}]})},o.showConfirm=function(){var e=t.confirm({cancelText:"Annuler",okType:"button button-small button-balanced",template:"Êtes-vous sûr de vouloir tout supprimer ? (Supprimera même les tâches actives)",title:"Tout supprimer"});e.then(function(e){e&&n.clearAll()})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q","$timeout",function(e,t,o){var n=e;return{add:function(e){var o={activate:!0,color:!1,date:new Date,"delete":!1,description:"",id:e.id?e.id:Math.floor(1e5*Math.random())+1,title:e.title},i=t.defer();return n.setItem(o.id,o).then(function(e){console.log('SeeTodo -> Tâche "'+o.id+'" ajoutée en base'),todos.push(o),i.resolve(e)}),i.promise},clearAll:function(e){var o=t.defer();return n.clear().then(function(e){console.log("SeeTodo -> Toutes les tâches ont bien été supprimées");for(var t in todos)todos[t]={};o.resolve(e)}),o.promise},"delete":function(e){var o={activate:e.activate,color:e.color,date:e.date,"delete":!0,description:e.description,id:e.id,title:e.title},i=t.defer();return n.setItem(o.id,o).then(function(t){console.log('SeeTodo -> Tâche "'+o.id+'" archivée'),todos[todos.indexOf(e)]["delete"]=!0,i.resolve(t)}),i.promise},edit:function(e){var o=t.defer(),i=this;return n.setItem(e.id,e).then(function(t){console.log('SeeTodo -> Tâche "'+e.id+'" modifiée'),i.refresh(e),o.resolve(t)}),o.promise},get_database:function(){if(0===todos.length){var e=t.defer();return n.iterate(function(e,t){angular.isString(e.title)&&todos.push(e)}).then(function(t){console.log("SeeTodo -> Base de donnée chargée correctement"),e.resolve(t)}),e.promise}},get_todo:function(e){var o=t.defer();return n.getItem(e.id).then(function(e){o.resolve(e)}),o.promise},get_todos:function(){return todos},refresh:function(e){var t=todos[todos.indexOf(e)];t["delete"]=!t["delete"],o(function(){t["delete"]=!t["delete"]},0)},"switch":function(e){var o={activate:!e.activate,color:e.color,date:e.date,"delete":e["delete"],description:e.description,id:e.id,title:e.title},i=t.defer();return n.setItem(o.id,o).then(function(t){console.log('SeeTodo -> Tâche "'+o.id+'" inversée'),todos[todos.indexOf(e)].activate=o.activate,i.resolve(t)}),i.promise}}}]);