'use strict';

/* Directives */
var directivas = angular.module('directivas', [
    'score18xxControllers',
    'ngAnimate',
    'ui.bootstrap',
    'ServicioModal',
    'AuthServiceModule'
]);
    
directivas.directive("menuNav", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "menu-score18xx.html",
        controller: function($scope, $location, AuthService, modalService, gettextCatalog) {
            this.logout = function() {
                var modalOptions = {
                    closeButtonText: 'Cancelar',
                    actionButtonText: 'Continuar',
                    showCloseButton: true,
                    headerText: gettextCatalog.getString('Salir de la aplicación'),
                    bodyText: gettextCatalog.getString('El usuario') + ' ' + $scope.score18xxCtrl.user.name + ' ' + gettextCatalog.getString('va a salir de la aplicación, ¿desea continuar?')
                };

                modalService.showModal({}, modalOptions)
                    .then(function () {
                        AuthService.logout();
                        $scope.score18xxCtrl.user = {};
                        $location.path('/login').replace();
                    });                
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

        },
        controllerAs: "tabJ"
    };
});

directivas.directive("tabAccionesValor",  function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-acciones-valor.html",
        controller: ['$scope', 'modalService', 'gettextCatalog', function($scope, modalService, gettextCatalog) {
            
            // Añade a la partida todas las empresas del juego de golpe
            this.addTodasEmpresas = function() {
                for( var i=0;i<$scope.tabs.companies.length;i++) {
                    var emp = {};

                    emp.nombre = $scope.tabs.companies[i];
                    emp.valor = 0;
                    emp.acciones = [];
                    for( var j=0;j<$scope.score18xxCtrl.partida.jugadores.datos.length;j++) {
                        var accion = {};

                        accion.nombre = $scope.score18xxCtrl.partida.jugadores.datos[j].indice;
                        accion.numero = 0;

                        emp.acciones.push(accion);
                    }

                    $scope.score18xxCtrl.partida.empresas.push(emp);
                }
                $scope.tabs.companies = [];
            };
            
            // Añade una empresa a la partida
            this.addEmpresa = function(empresa) {
                var emp = {};
                
                emp.nombre = empresa.nombre;
                emp.valor = empresa.valor;
                emp.acciones = [];
                for( var i=0;i<$scope.score18xxCtrl.partida.jugadores.datos.length;i++) {
                    var accion = {};

                    accion.indice = $scope.score18xxCtrl.partida.jugadores.datos[i].indice;
                    accion.numero = 0;

                   emp.acciones.push(accion);
                }
                $scope.score18xxCtrl.partida.empresas.push(emp);
                
                var index = $scope.tabs.companies.indexOf(empresa.nombre);
                $scope.tabs.companies.splice(index,1);
                if ($scope.tabs.companies.length > 0) $scope.tabs.empresa.nombre =  $scope.tabs.companies[0];
            };
            
            // Añade una empresa a la partida
            this.quitarEmpresa = function(indice) {
                var dividendos = false;
                for(var i=0;i<$scope.score18xxCtrl.partida.dividendos.length;i++){
                    if ($scope.score18xxCtrl.partida.dividendos[i].nombreEmpresa===$scope.score18xxCtrl.partida.empresas[indice].nombre) {
                        dividendos = true;
                        break;
                    }
                };
                if (dividendos || ($scope.score18xxCtrl.partida.empresas[indice].valor !== 0)) {
                    var modalOptions = {
                        closeButtonText: gettextCatalog.getString('Cancelar'),
                        actionButtonText: gettextCatalog.getString('Continuar'),
                        showCloseButton: true,
                        headerText: gettextCatalog.getString('Eliminar') + ' ' + $scope.score18xxCtrl.partida.empresas[indice].nombre,
                        bodyText: gettextCatalog.getString('Va a eliminar una empresa que tiene información, ¿desea continuar?')
                    };

                    modalService.showModal({}, modalOptions)
                        .then(function () {
                            for(var i=$scope.score18xxCtrl.partida.dividendos.length-1;i>=0;i--){
                                if ($scope.score18xxCtrl.partida.dividendos[i].nombreEmpresa===$scope.score18xxCtrl.partida.empresas[indice].nombre) {
                                    $scope.score18xxCtrl.partida.dividendos.splice(i,1);
                                }
                            };
                            $scope.tabs.companies.push($scope.score18xxCtrl.partida.empresas[indice].nombre);
                            $scope.score18xxCtrl.partida.empresas.splice(indice,1);
                            $scope.tabs.empresa.nombre =  $scope.tabs.companies[0];
                    });
                    
                }
                else {
                    $scope.score18xxCtrl.partida.empresas.splice(indice,1);
                }
            };
        }],
        controllerAs: "tabAV"
    };
});

directivas.directive("tabAccionesJugadores", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-acciones-jugadores.html",
        controller: function($scope) {
            this.opcionVeinte = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            this.opcionDiez = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            this.tamColumna = function(){
                var j = $scope.score18xxCtrl.partida.jugadores.datos.length+1;
                return Math.floor(12/j);
            };
            this.elegirOpcion = function(nombre){
                if ($scope.score18xxCtrl.partida.juego._id === '183308-1844') {
                    if (nombre === 'SBB' || (nombre.indexOf('V') === 0))
                        return $scope.tabAJ.opcionVeinte;
                }
                return $scope.tabAJ.opcionDiez;
            };
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
            $scope.tabD.numRepeticiones = 1;

            this.addDividendo = function(emp, div, rep) {
                    for(var j=0;j<rep;j++) {
                        var divFila={};
                        divFila.nombreEmpresa = emp.nombre;
                        divFila.dividendos=[];
                        for(var i=0;i<emp.acciones.length;i++){
                            var dividendo={};
                            dividendo.indice = emp.acciones[i].indice;
                            dividendo.valor = (emp.acciones[i].numero/10) * div;
                    
                            divFila.dividendos.push(dividendo);
                            $scope.score18xxCtrl.partida.jugadores.datos[i].dividendos += dividendo.valor;
                        };
                        $scope.score18xxCtrl.partida.dividendos.push(divFila);
                    };
            };
            
            this.quitarDividendo = function (divFila, indice){
                
                for (var j=0; j<$scope.score18xxCtrl.partida.jugadores.datos.length ;j++){
                    var index = divFila.dividendos.map(function(e) { return e.indice; }).indexOf($scope.score18xxCtrl.partida.jugadores.datos[j].indice);
                    $scope.score18xxCtrl.partida.jugadores.datos[j].dividendos -= divFila.dividendos[index].valor;
                };
                $scope.score18xxCtrl.partida.dividendos.splice(indice, 1);
            };
        },
        controllerAs: "tabD"
    };
});

directivas.directive("tabResultado", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "tab-resultado.html",
        controller: function($scope, gettextCatalog) {
            this.tabla = 'tabla';
            this.textoShare =  gettextCatalog.getString('Partida jugada a') + ' ';
            this.total = function(j){
                var valoracion = j.efectivo + j.dividendos;
                
                for(var i=0; i<$scope.score18xxCtrl.partida.empresas.length;i++){
                    var empresa = $scope.score18xxCtrl.partida.empresas[i];
                    valoracion += this.valorAcciones(empresa, j.indice);
                };
                return valoracion;
            };
            
            this.valorAcciones= function(emp, indice) {
                var index = emp.acciones.map(function(e) { return e.indice; }).indexOf(indice);
                return emp.valor * emp.acciones[index].numero;
            };
            
            this.ganador = function(j) {
                var valor = this.total(j);
                var g = true;
                for (var i=0; i< $scope.score18xxCtrl.partida.jugadores.datos.length;i++) {
                    var total = this.total($scope.score18xxCtrl.partida.jugadores.datos[i]);
                    if (total > valor) {
                        g = false;
                        break;
                    }
                }
                return g;
            };
        },
        controllerAs: "tabR"
    };
});

directivas.directive("juegoBgg", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "juego-bgg.html"
    };
});

//directiva para ejecutar submit fuera de form con objeto linkado
directivas.directive("linked",function(){
    return function (scope, element, attrs) {
        var id = attrs["linked"];
        element.on("click",function(){
            document.getElementById(id).click();
        });
    };
});

directivas.directive("piePagina", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "pie-pagina.html"
    };
});