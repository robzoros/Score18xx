var partidaController = angular.module('partidaController', []);

partidaController.controller('partidaCtrl',  ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.score18xxCtrl.dondeEstamos = "Partida";
    $scope.score18xxCtrl.tabActiva = 1;

    this.elegirTab = function(choice){
        $scope.score18xxCtrl.tabActiva = choice;
        $('.nav-tabs a[id=tab'+choice+']').tab('show') ;
    };

    this.mostrarTab = function(checkTab) {
        return $scope.score18xxCtrl.tabActiva === checkTab;
    };
 
    this.mostrarBoton = function() {
        switch ($scope.score18xxCtrl.tabActiva)
        {
           case 2: 
           case 3: return ($scope.tabs.empresas.length > 0);
           break;

           case 1: return true;
           break;
           
           default: return false;
        }
    };
    
    $scope.getPartida = function(id) {
      
      $http.get('http://localhost:3000/api/partida/' + id)
        .then(function(response){
            $scope.score18xxCtrl.partida = response.data;
        },
        function(err){
            $scope.score18xxCtrl.partida = err;
        });
    };
    $scope.getPartida($routeParams.idPartida);
    
}]);
