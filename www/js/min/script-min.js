"use strict";angular.module("seetodo",["ionic","ionic-material"]).run(["$ionicPlatform",function(t){t.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html"}}}),e.otherwise("/app/main")}]).service("storage",["$q",function(t){}]).controller("AppCtrl",["ionicMaterialInk","$scope","storage",function(t,e,o){t.displayEffect();var a=document.getElementById("fab_seemy");a.addEventListener("click",function(){location.href="https://twitter.com/ZachFitzgerald"});var n=document.getElementById("fab_git_hub");n.addEventListener("click",function(){location.href="https://github.com/Jbz797/SeeTodo"})}]);