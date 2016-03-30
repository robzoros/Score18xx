var partidaController = angular.module('partidaController', ['directivas' , 'score18xxFactory', 'constantes']);

partidaController.controller('partidaCtrl',  ['$scope', '$http', '$routeParams', '$location', 'bggJuegoFactory', '$anchorScroll', 'API_ENDPOINT'
, function($scope, $http, $routeParams, $location, bggJuegoFactory, $anchorScroll, API_ENDPOINT) {
    $scope.score18xxCtrl.dondeEstamos = "Partida";
    $scope.score18xxCtrl.tabActiva = 1;
    $scope.score18xxCtrl.mostrarMenu = true;
    
    // Rellenamos datos para mostrar resultado
    $scope.dibujaPieChart = function() {
        var part =  $scope.score18xxCtrl.partida;
        
        // Asignamos colores a cada jugador
        var colores = ["#807dba", "#e08214", "#41ab5d", "#4D4D4D", "#F17CB0", "#B2912F", "#5DA5DA", "#B276B2", "#DECF3F", "#F15854"];
        var coloresJugadores = {};
        for (var i=0; i <part.jugadores.datos.length; i++) {
            coloresJugadores[part.jugadores.datos[i].nombre] = colores[i];
        }
        
        // Creamos los datos de la partida en duplas Empresa, Valor de las acciones para cada jugador.
        // [ {Empresa:'AL',valor:{Roberto:4786, mid:1319, high:249}} ]
        var data = [];
        
        //Añadimos efectivo
        {
            var elemento = {};
            elemento.Empresa = 'Efectivo';
            elemento.valor = {};
            for (var i=0; i <part.jugadores.datos.length; i++) {
                elemento.valor[part.jugadores.datos[i].nombre] = part.jugadores.datos[i].efectivo;
            }
            data.push(elemento);
        }
        
        //Añadimos dividendos
        {
            var elemento = {};
            elemento.Empresa = 'Dividendos';
            elemento.valor = {};
            for (var i=0; i <part.jugadores.datos.length; i++) {
                elemento.valor[part.jugadores.datos[i].nombre] = part.jugadores.datos[i].dividendos;
            }
            data.push(elemento);
        }
        //Añadimos empresas
        for (var i=0; i<part.empresas.length; i++) {
            var elemento = {};
            elemento.Empresa = part.empresas[i].nombre;
            elemento.valor = {};
            for (var j=0; j <part.empresas[i].acciones.length; j++) {
                elemento.valor[part.jugadores.datos[j].nombre] = part.empresas[i].acciones[j].numero * part.empresas[i].valor;
            }
            data.push(elemento);            
        }
        
        // Llamamos a JS que dibuja y controla pie chart
        dashboard('#dashboard', data, coloresJugadores);

    };

    this.elegirTab = function(choice){
        if (choice === 5)$scope.dibujaPieChart();

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
      
      $http.get(API_ENDPOINT.url + 'partida/' + id)
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
            if ($scope.score18xxCtrl.partida.juego) {
                bggJuegoFactory.callbggJuegos($scope.score18xxCtrl.partida.juego._id)
                    .then(function(response){
                        $scope.score18xxCtrl.bggJuego = bggJuegoFactory.getbggDatos(response.data.items.item);
                        if ($scope.tabs.soloResultado) $scope.dibujaPieChart();

                    },
                    function(err){
                        $scope.score18xxCtrl.bggJuego = err;
                        console.log(err);
                    });
            }
            if ((! $scope.score18xxCtrl.user) || ($scope.score18xxCtrl.partida.usuario !== $scope.score18xxCtrl.user.name)) {
                $scope.tabs.soloResultado = true;
                $scope.score18xxCtrl.mostrarMenu = false;
                $scope.score18xxCtrl.tabActiva = $scope.tabs.soloResultado ? 5 : $scope.score18xxCtrl.tabActiva
            }
            else $scope.tabs.soloResultado = false;

        },
        function(err){
            $scope.score18xxCtrl.error = err;
            if (err.status === 404)
                $location.path('/404').replace();
        });
    };
       
    this.actualizaPartida = function() {

        $http.put( API_ENDPOINT.url + 'partida/' + $scope.score18xxCtrl.partida._id, $scope.score18xxCtrl.partida).
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
       $anchorScroll();
   };
   
    $scope.getPartida($routeParams.idPartida)
    $anchorScroll();
    
}]);
