'use strict';

/* App Module */
var score18xx = angular.module('score18xx', [
  'ngRoute',
  'score18xxControllers',
  'partidaController',
  'phonecatAnimations',
  'directivas'
]);

score18xx.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/nueva', {
        templateUrl: 'nueva-partida.html',
        controller: 'NuevaPartidaCtrl'
      }).
      when('/partida/:idPartida', {
        templateUrl: 'datos-partida.html',
        controller: 'partidaCtrl',
        controllerAs: 'tabs'
      }).
      when('/login', {
        templateUrl: 'login.html',
        controller: 'loginCtrl',
        controllerAs: 'login'
      }).
      otherwise({
        redirectTo: ''
      });
  }]);