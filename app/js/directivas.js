'use strict';

/* Directives */
var directivas = angular.module('directivas', [
    'score18xxControllers',
    'ngAnimate',
    'ui.bootstrap'
]);
    
directivas.directive("menuNav", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "menu-score18xx.html",
        controller: function($scope) {
            $scope.score18xxCtrl.prueba = "Titulo una prueba";
            
            this.clickMenu = function(choice){
                $scope.score18xxCtrl.paginaActiva = choice;
            };
        },
        controllerAs: "menu"
    };
});

directivas.directive("tabJugadores", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-jugadores.html",
        controller: function($scope) {
            this.crearColeccionJugadores = function(num) {
                var jugadores = new Array();
                for (var i = 0; i < num; i++) {
                    jugadores.push({ nombre: "Jugador " + (i+1)});
                }
                return jugadores;
            };
            $scope.tabs.jugadores = this.crearColeccionJugadores($scope.score18xxCtrl.partida.jugadores);
        },
        controllerAs: "tabJ"
    };
});

directivas.directive("tabAccionesValor", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-acciones-valor.html",
        controller: function($scope, $window) {
            
            // Añade a la partida todas las empresas del juego de golpe
            this.addTodasEmpresas = function() {
                for( var i=0;i<$scope.tabAV.empresasJuego.length;i++) {
                    var emp = {};

                    emp.nombre = $scope.tabAV.empresasJuego[i];
                    emp.valor = 0;
                    emp.acciones = [];
                    for( var j=0;j<$scope.tabs.jugadores.length;j++) {
                        var accion = {};

                        accion.nombre = $scope.tabs.jugadores[j].nombre;
                        accion.numero = 0;

                        emp.acciones.push(accion);
                    }

                    $scope.tabs.empresas.push(emp);
                }
                $scope.tabAV.empresasJuego = [];
            };
            
            // Añade una empresa a la partida
            this.addEmpresa = function(empresa) {
                var emp = {};
                
                emp.nombre = empresa.nombre;
                emp.valor = empresa.valor;
                emp.acciones = [];
                for( var i=0;i<$scope.tabs.jugadores.length;i++) {
                    var accion = {};

                    accion.nombre = $scope.tabs.jugadores[i].nombre;
                    accion.numero = 0;

                   emp.acciones.push(accion);
                }
                $scope.tabs.empresas.push(emp);
                
                var index = $scope.tabAV.empresasJuego.indexOf(empresa.nombre);
                $scope.tabAV.empresasJuego.splice(index,1);
                if ($scope.tabAV.empresasJuego.length > 0) $scope.tabAV.empresa.nombre =  $scope.tabAV.empresasJuego[0];
            };
            
            // Añade una empresa a la partida
            this.quitarEmpresa = function(indice) {
                var borrar = true;
                if ($scope.tabs.empresas[indice].valor !== 0) {
                    borrar = $window.confirm('Va a elimanr el valor ásignado a las acciones de la empresa, ¿desea continuar?');
                }
                if (borrar) {
                    $scope.tabAV.empresasJuego.push($scope.tabs.empresas[indice].nombre);
                    $scope.tabs.empresas.splice(indice,1);
                    $scope.tabAV.empresa.nombre =  $scope.tabAV.empresasJuego[0];
                }
            };
            
            // Inicializamos valores de las variables
            $scope.tabAV.empresasJuego = $scope.score18xxCtrl.partida.juego.companies;
            $scope.tabs.empresas = [];            
            $scope.tabAV.empresa = {nombre:String, valor:Number};
            $scope.tabAV.empresa.valor = 0;
            $scope.tabAV.empresa.nombre =  $scope.tabAV.empresasJuego[0];
        },
        controllerAs: "tabAV"
    };
});

directivas.directive("tabAccionesJugadores", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-acciones-jugadores.html",
        controller: function($scope) {
            this.tamColumna = function(){
                var j = $scope.tabs.jugadores.length+1;
                return Math.floor(12/j);
            };
            this.opcionDiez = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        },
        controllerAs: "tabAJ"
    };
});

directivas.directive("tabDividendos", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-dividendos.html",
        controller: function($scope) {

        },
        controllerAs: "tabD"
    };
});

directivas.directive("tabResultado", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-resultado.html",
        controller: function($scope) {

        },
        controllerAs: "tabR"
    };
});