var listaJuegosCtrl = angular.module('ListaJuegosController', ['constantes']);

listaJuegosCtrl.controller('ListaJuegosCtrl', ['$scope', '$http', '$anchorScroll', 'API_ENDPOINT', function($scope, $http, $anchorScroll, API_ENDPOINT) {
    $scope.score18xxCtrl.mostrarMenu = true;
    $scope.score18xxCtrl.mostrarFooter = false;
    
    this.borrarJuego = function(id){
      $http.delete(API_ENDPOINT.url + 'juego/' + id)
        .then(function(response){
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
            $scope.juegos.juegos = response.data.sort(function(a, b){return (b._name < a._name) ? 1 : (b._name > a._name) ? -1 : 0});
        },
        function(err){
            console.log(err);
            $scope.juegos.error = err;
        });
    };
    
    // Llamada a la función
    this.getJuegos();
    $anchorScroll();
    
}]);

