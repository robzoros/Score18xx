'use strict';

/* App Module */
var score18xx = angular.module('score18xx', [
  'ngRoute',
  'score18xxControlers',
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
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: ''
      });
  }]);