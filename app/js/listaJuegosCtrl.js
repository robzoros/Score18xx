var listaJuegosCtrl = angular.module('ListaJuegosController', ['constantes']);

listaJuegosCtrl.controller('ListaJuegosCtrl', ['$scope', '$http', 'API_ENDPOINT', function($scope, $http, API_ENDPOINT) {
    $scope.score18xxCtrl.mostrarMenu = true;
    
    this.borrarJuego = function(id){
      $http.delete(API_ENDPOINT.url + 'juego/' + id)
        .then(function(response){
            console.log(response);
            $scope.juegos.getJuegos();
        },
        function(err){
            console.log(err);
            $scope.juegos.error = err;
        });
    };
  
    // Función que carga las juegos
    this.getJuegos = function() {
      
      $http.get(API_ENDPOINT.url + 'juegos')
        .then(function(response){
            console.log(response);
            $scope.juegos.juegos = response.data;
        },
        function(err){
            console.log(err);
            $scope.juegos.error = err;
        });
    };
    
    // Llamada a la función
    this.getJuegos();
}]);

