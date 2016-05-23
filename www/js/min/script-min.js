"use strict";angular.module("seetodo",["ionic","ionic-material","ksSwiper","LocalForageModule"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$localForageProvider","$stateProvider","$urlRouterProvider",function(e,t,o){e.config({driver:"localStorageWrapper",name:"SeeTodo",version:1,storeName:"todos_list",description:"todos list for SeeTodo app"}),t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}).state("app.active",{url:"/main/active",views:{menuContent:{templateUrl:"templates/active.html",controller:"MainCtrl"}}}).state("app.dones",{url:"/main/dones",views:{menuContent:{templateUrl:"templates/dones.html",controller:"MainCtrl"}}}).state("app.deletes",{url:"/main/deletes",views:{menuContent:{templateUrl:"templates/deletes.html",controller:"MainCtrl"}}}),o.otherwise("/app/main")}]),angular.module("seetodo").controller("AppCtrl",["ionicMaterialInk",function(e){e.displayEffect()}]).controller("NavCtrl",["$scope","$ionicSideMenuDelegate",function(e,t){e.showMenu=function(){t.toggleLeft()}}]).controller("MainCtrl",["ionicMaterialInk","$ionicPopup","$scope","storage",function(e,t,o,i){var n=document.getElementById("fab_seemy");n.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var r=document.getElementById("fab_git_hub");r.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"}),o.newTodo={},i.get_database(),o.todos=i.get_todos(),o.addTodo=function(){var e=o.newTodo;e.title.length>0&&i.add(e).then(function(e){o.newTodo={}})},o.switchTodo=function(e){e.title.length>0&&i["switch"](e)},o.deleteTodo=function(e){e.title.length>0&&i["delete"](e)},o.editTodo=function(e){e.title.length>0&&i.edit(e)},o.showDetailsPopup=function(e){o.todo=e,t.show({templateUrl:"../templates/popup_details.html",title:"Details",scope:o,buttons:[{text:"OK"}]})},o.showEditPopup=function(e){o.todo=e,t.show({templateUrl:"../templates/popup_edit.html",title:"Modifier",scope:o,buttons:[{text:"Annuler"},{text:"Sauvegarder",type:"button-balanced",onTap:o.editTodo(e)}]})},o.showConfirm=function(){var e=t.confirm({title:"Tout supprimer",template:"Êtes-vous sûr de vouloir tout supprimer ? (Supprimera même les tâches actives)",okType:"button button-small button-balanced"});e.then(function(e){e&&i.clearAll()})}}]);var todos=[];angular.module("seetodo").factory("storage",["$localForage","$q",function(e,t){return{add:function(o){var i=t.defer(),n={activate:!0,color:!1,date:new Date,"delete":!1,description:"",id:Math.floor(1e5*Math.random())+1,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" ajoutée en base'),todos.push(n)})),i.promise},clearAll:function(o){var i=t.defer();return i.resolve(e.clear().then(function(){todos=[]})),i.promise},"delete":function(o){var i=t.defer(),n={activate:o.activate,color:o.color,date:o.date,"delete":!0,description:o.description,id:o.id,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" archivée'),todos[todos.indexOf(o)]["delete"]=!0})),i.promise},edit:function(o){var i=t.defer(),n={activate:o.activate,color:o.color,date:o.date,"delete":o["delete"],description:o.description,id:o.id,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" modifiée'),todos[todos.indexOf(o)].color=n.color,todos[todos.indexOf(o)].description=n.description,todos[todos.indexOf(o)].title=n.title})),i.promise},get_database:function(){var o=t.defer();return o.resolve(e.iterate(function(e,t){angular.isString(e.title)&&todos.push(e)}).then(function(e){console.log("SeeTodo -> Base de donnée chargée correctement")})),o.promise},get_todos:function(){return todos},"switch":function(o){var i=t.defer(),n={activate:!o.activate,color:o.color,date:o.date,"delete":o["delete"],description:o.description,id:o.id,title:o.title};return i.resolve(e.setItem(n.id,n).then(function(){console.log('SeeTodo -> Tâche "'+n.id+'" inversée'),todos[todos.indexOf(o)].activate=n.activate})),i.promise}}}]);