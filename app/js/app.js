'use strict';

/* App Module */
var score18xx = angular.module('score18xx', [
  'ngRoute',
  'score18xxControllers',
  'partidaController',
  'directivas',
  'NuevaPartidaController',
  'ListaPartidasController',
  'ListaJuegosController',
  'NuevoJuegoController',
  'score18xxFactory',
  'ServicioModal'
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
      when('/lista', {
        templateUrl: 'lista-partidas.html',
        controller: 'ListaPartidasCtrl',
        controllerAs: 'lista'
      }).
      when('/juego/:idJuego?', {
        templateUrl: 'nuevo-juego.html',
        controller: 'NuevoJuegoCtrl',
        controllerAs: 'nuevo'
      }).
      when('/juegos', {
        templateUrl: 'lista-juegos.html',
        controller: 'ListaJuegosCtrl',
        controllerAs: 'juegos'
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