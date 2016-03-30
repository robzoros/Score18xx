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
  'LoginController',
  'score18xxFactory',
  'ServicioModal',
  'AuthServiceModule',
  'constantes'
]);

score18xx.service('APIInterceptor', ['$rootScope', 'API_ENDPOINT', function($rootScope, API_ENDPOINT) {
    var service = this;

    service.request = function(request) {
        if (request.url.indexOf(API_ENDPOINT.url) > -1) {
            if ($rootScope.access_token) {
                request.headers.authorization = $rootScope.access_token;
            }
        }
        return request;
    };

    service.response = function(response) {
        return response;
    };
}]);

score18xx.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
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
    when('/404', {
        templateUrl: '404.html',
        controller: 'ErrorCtrl',
        controllerAs: 'errCtrl'
      }).
      when('/login/:reg?', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        controllerAs: 'logCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
    
    $httpProvider.interceptors.push('APIInterceptor');
  }]);