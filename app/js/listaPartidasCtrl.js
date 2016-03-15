var listaPartidasCtrl = angular.module('ListaPartidasController', []);

listaPartidasCtrl.controller('ListaPartidasCtrl', ['$scope', '$http', function($scope, $http) {
    
    this.borrarPartida = function(id){
      $http.delete('http://localhost:3000/api/partida/' + id)
        .then(function(response){
            $scope.lista.getPartidas();
        },
        function(err){
            $scope.lista.error = err;
        });
    };
  
    // Función que carga las partidas
    this.getPartidas = function() {
      
      $http.get('http://localhost:3000/api/lista')
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

