var listaJuegosCtrl = angular.module('ListaJuegosController', []);

listaJuegosCtrl.controller('ListaJuegosCtrl', ['$scope', '$http', function($scope, $http) {
    
    this.borrarJuego = function(id){
      $http.delete('http://localhost:3000/api/juego/' + id)
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
      
      $http.get('http://localhost:3000/api/juegos')
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

