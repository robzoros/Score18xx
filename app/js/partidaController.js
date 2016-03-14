var partidaController = angular.module('partidaController', ['directivas']);

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
           case 3: return ($scope.score18xxCtrl.partida.empresas.length > 0);
           break;

           case 4:
           case 1: return true;
           break;
           
           default: return false;
        }
    };
    
    $scope.getPartida = function(id) {
      
      $http.get('http://localhost:3000/api/partida/' + id)
        .then(function(response){
            $scope.score18xxCtrl.partida = response.data;

            // Inicializamos valores de las variables
            if (! $scope.score18xxCtrl.partida.jugadores.datos) {
                var jugadores = new Array();
                for (var i = 0; i < $scope.score18xxCtrl.partida.jugadores.numero; i++) {
                    var jug={};
                    jug.nombre = "Jugador " + (i+1);
                    jug.indice = (i+1);
                    jug.efectivo = 0;
                    jug.dividendos = 0;

                    jugadores.push(jug);
                }
                $scope.score18xxCtrl.partida.jugadores.datos = jugadores;
            }
            $scope.tabs.companies = $scope.score18xxCtrl.partida.juego.companies.slice();
            if (! $scope.score18xxCtrl.partida.empresas) {
                $scope.score18xxCtrl.partida.empresas = [];            
            }
            else {
                for(var i=0;i<$scope.score18xxCtrl.partida.empresas.length;i++) {
                    var index = $scope.tabs.companies.indexOf($scope.score18xxCtrl.partida.empresas[i].nombre);
                    $scope.tabs.companies.splice(index,1);
                }
            }
            if ($scope.tabs.companies.length > 0) {
                $scope.tabs.empresa = {nombre:String, valor:Number};
                $scope.tabs.empresa.valor = 0;
                $scope.tabs.empresa.nombre =  $scope.tabs.companies[0];
            }
            if (! $scope.score18xxCtrl.partida.dividendos) $scope.score18xxCtrl.partida.dividendos = [] ;
        },
        function(err){
            $scope.score18xxCtrl.partida = err;
        });
    };
    
       
    this.actualizaPartida = function() {

        $http.put('http://localhost:3000/api/partida/' + $scope.score18xxCtrl.partida._id, $scope.score18xxCtrl.partida).
        then(function(response){
            console.log(response.data);
        },
        function(err){
            $scope.score18xxCtrl.error = err;
            console.log("Se ha producido un error al actualizar");
            console.log(err);
        });
   };
   
   this.siguiente = function() {
       this.actualizaPartida();
       this.elegirTab(($scope.score18xxCtrl.tabActiva < 5) ? $scope.score18xxCtrl.tabActiva +1 : 1);
   };
   
    $scope.getPartida($routeParams.idPartida);
    
}]);
