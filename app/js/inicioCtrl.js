var inicioCtrl = angular.module('InicioController', []);

inicioCtrl.controller('InicioCtrl', ['$scope', '$http', 'API_ENDPOINT', function($scope, $http, API_ENDPOINT) {
    $scope.score18xxCtrl.mostrarMenu = false;
    $scope.score18xxCtrl.mostrarFooter = true;
    this.chartBottomRight = 'Derecha';
    this.funcionLlamada = false;
    
    //Obtener Partidas Totales
    this.getTotalPartidas = function() {
        $http.get(API_ENDPOINT.url +'pcount')
        .then(function(response){
            $scope.iniCtrl.totalPartidas = response.data[0].cuenta;
        },
        function(err){
            console.log(err);
            $scope.iniCtrl.error = err;
        });
    };
    
    //Obtener Juegos Totales
    this.getTotalJuegos = function() {
        $http.get(API_ENDPOINT.url +'jcount')
        .then(function(response){
            $scope.iniCtrl.totalJuegos = response.data[0].cuenta;
        },
        function(err){
            console.log(err);
            $scope.iniCtrl.error = err;
        });
    };
    
    this.getPartidasJugador = function() {
        $http.get(API_ENDPOINT.url +'pjcount')
        .then(function(response){
            $scope.labels = [];
            $scope.data = [];
            $scope.media = [];
            $scope.series = ["Media Jugadores"];
            var med = [];
            for(var i=0; i < response.data.length; i++) {
                $scope.labels.push(response.data[i]._id);
                $scope.data.push(response.data[i].cuenta);
                med.push(Math.round(response.data[i].media_j * 100) / 100);
                
            };
            $scope.media.push(med);

        },
        function(err){
            console.log(err);
            $scope.iniCtrl.error = err;
        });    
    };
    
    this.getUsuarios = function() {
        $http.get(API_ENDPOINT.url +'ucount')
        .then(function(response){
            console.log(response.data);
            $scope.iniCtrl.totalUsuarios = response.data[0].cuenta;
        },
        function(err){
            console.log(err);
            $scope.iniCtrl.error = err;
        });    
    };

    $scope.legendRight = function(){
        var contenedor = document.createElement("div"),
            contenedor2 = document.createElement("div"),
            canvas = document.getElementById('partidasJugador'),
            parent = canvas.parentNode,
            legend = parent.getElementsByTagName('chart-legend')[0],
            ul = legend.getElementsByTagName('ul')[0];
        
        contenedor.className = "col-lg-9 padd-left-0";
        contenedor.appendChild(canvas);
        contenedor2.className = "col-lg-3";
        contenedor2.id = "legendChart";
        ul.className="polararea-legend polararea-legend-right";
        contenedor2.appendChild(legend);
        parent.appendChild(contenedor);
        parent.appendChild(contenedor2);
        
    };
    
    $scope.legendBottom = function() {
        var div = document.getElementById('legendChart'),
            chart = div.getElementsByTagName('chart-legend')[0],
            padre = chart.parentNode,
            abuelo = padre.parentNode,
            canvas = document.getElementById('partidasJugador'),
            padreCanvas = canvas.parentNode;

        chart.getElementsByTagName('ul')[0].className="polararea-legend";
        abuelo.appendChild(canvas);
        abuelo.appendChild(chart);
        abuelo.removeChild(padre);
        abuelo.removeChild(padreCanvas);  
    };
    
    $scope.legendLeftRight = function() {
        if ($scope.iniCtrl.chartBottomRight === 'Derecha') {
            $scope.iniCtrl.chartBottomRight = 'Abajo';
            $scope.legendRight();
        }
        else {
            $scope.iniCtrl.chartBottomRight = 'Derecha';
            $scope.legendBottom();
        }
    };

    //Cargar datos
    this.getTotalJuegos();
    this.getTotalPartidas();
    this.getPartidasJugador();
    this.getUsuarios();
}]);



