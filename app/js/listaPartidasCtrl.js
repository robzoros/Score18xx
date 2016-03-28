var listaPartidasCtrl = angular.module('ListaPartidasController', ['constantes']);

listaPartidasCtrl.controller('ListaPartidasCtrl', ['$scope', '$http', 'API_ENDPOINT', function($scope, $http, API_ENDPOINT) {
    $scope.score18xxCtrl.mostrarMenu = true;

    this.borrarPartida = function(id){
      $http.delete(API_ENDPOINT.url +'partida/' + id)
        .then(function(response){
            $scope.lista.getPartidas();
        },
        function(err){
            $scope.lista.error = err;
        });
    };
  
    // Función que carga las partidas
    this.getPartidas = function() {
      
      $http.get(API_ENDPOINT.url +'lista')
        .then(function(response){
            $scope.lista.partidas = response.data;
        },
        function(err){
            $scope.lista.error = err;
        });
    };
    
    // Llamada a la función
    this.getPartidas();
}]);
