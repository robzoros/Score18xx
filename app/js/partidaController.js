var partidaController = angular.module('partidaController', ['directivas']);

partidaController.controller('partidaCtrl',  ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
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
    
    $scope.getbggDatos = function(id){
        $http.get('http://localhost:3000/proxy/?url=http://www.boardgamegeek.com/xmlapi2/thing?id=' + id, { 
            transformResponse:function(data) {
                // convert the data to JSON and provide
                // it to the success function below
                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );
                return json;
            }
        })
        .then(function(response){
            console.log(response.data.items.item);
            var juego = {};
            juego.thumbnail = response.data.items.item.thumbnail;
            juego.yearpublished = response.data.items.item.yearpublished._value;
            juego.description = $sce.trustAsHtml(response.data.items.item.description.replace(/&#10;/g,"<br>"));
            juego.minplayers = response.data.items.item.minplayers._value;
            juego.maxplayers = response.data.items.item.maxplayers._value;
            juego.playingtime = response.data.items.item.playingtime._value;
            juego.designer = response.data.items.item.link.filter(function(a){ return a._type === 'boardgamedesigner' })
            juego.artist = response.data.items.item.link.filter(function(a){ return a._type === 'boardgameartist' })
            juego._id = response.data.items.item._id;
            
            if ($.isArray(juego.designer)) {
                var des = "";
                for (var i= 0; i<juego.designer.length;i++) {
                    des += (i>0 && i<(juego.designer.length)) ? ", " : "";
                    des += juego.designer[i]._value;
                }
                juego.designer = des;
            }
            
            if ($.isArray(juego.artist)) {
                var art = "";
                for (var i= 0; i<juego.artist.length;i++) {
                    art += (i>0 && i<(juego.artist.length)) ? ", " : "";
                    art += juego.artist[i]._value;
                }
                juego.artist = art;
            }

            if ($.isArray(response.data.items.item.name)) 
                juego.name = response.data.items.item.name[0]._value;
            else
                juego.name = response.data.items.item.name._value;
            $scope.score18xxCtrl.bggJuego = juego;
            console.log($scope.score18xxCtrl.bggJuego);
        },
        function(err){
            $scope.score18xxCtrl.bggJuego = err;
            console.log(err);
        });
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
            if ($scope.score18xxCtrl.partida.juego) {
                console.log('ID:' + $scope.score18xxCtrl.partida.juego._id);
                $scope.getbggDatos($scope.score18xxCtrl.partida.juego._id);
            }
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
