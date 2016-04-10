var nuevoJuegoCtrl = angular.module('NuevoJuegoController', ['score18xxFactory', 'constantes']);

nuevoJuegoCtrl.controller('NuevoJuegoCtrl', ['$scope','$http', '$location', 'bggJuegoFactory', '$routeParams', '$anchorScroll', 'API_ENDPOINT', 
    function($scope, $http, $location, bggJuegoFactory, $routeParams, $anchorScroll, API_ENDPOINT) {

    $scope.score18xxCtrl.mostrarMenu = true;
    $scope.score18xxCtrl.mostrarFooter = false;

    this.addEmpresa = function(empresa) {
        var indice = this.juego.companies.indexOf(empresa);
        this.alerta = "";
        if ($.trim(empresa) === "") { 
            this.alerta = "La empresa no puede ser un texto vacío";
            return;
        }
        if (indice === -1) {
            this.juego.companies.push(empresa);
            this.empresa="";
        }
        else
            this.alerta = "La empresa ya existe";
        
    };
    
    this.addJuego = function() {
        this.juego.usuario = $scope.score18xxCtrl.user.name;
        var params = this.juego;
        $scope.nuevo.juegosalvado = false;
        $scope.nuevo.error = '';

        return $http.post(API_ENDPOINT.url + 'juego', params).
            then(function(response){
                $scope.nuevo.juegosalvado = true;
                $scope.nuevo.editarNuevo = 'editar';
            },
            function(err){
                $scope.nuevo.juegosalvado = false;
                if (err.data.indexOf('E11000') > -1)
                    $scope.nuevo.error = 'Ya existe un juego con ese identificador';
                else
                    $scope.nuevo.error = err.data;
        });        
    };
    
    this.actualizaJuego = function() {
        var params = this.juego;
        $scope.nuevo.juegosalvado = false;

        return $http.put(API_ENDPOINT.url + 'juego/' + params._id, params).
            then(function(response){
                $scope.nuevo.editarNuevo = 'editar';
                $scope.nuevo.juegosalvado = true;
            },
        function(err){
            $scope.nuevo.error = err.data;
            $scope.score18xxCtrl.error = err;
            console.log(err);
        });   
    };

    this.callbggJuego = function() {
        
        if (angular.isUndefined(this.juego._id) || this.juego._id === '') return;
        var id = this.juego._id;
        bggJuegoFactory.callbggJuegos(id)
        .then(function(response){
            if (response.data.items.item) {
                $scope.score18xxCtrl.bggJuego = bggJuegoFactory.getbggDatos(response.data.items.item);
            }
            else {
                $scope.score18xxCtrl.bggJuego = "";
                console.log("NUEVOJUEGO-CALLBGGJUEGO. Juego con id " + id + " no encontrado");
                $scope.nuevo.noencontrado = true;
            }
        },
        function(err){
            $scope.score18xxCtrl.error = err;
            console.log(err);
        });
    };
    
    this.getJuego = function() {
      $http.get(API_ENDPOINT.url + 'juego/' + this.juego._id)
        .then(function(response){
            $scope.nuevo.juego = response.data;
            $scope.nuevo.modJuego = ( $scope.nuevo.juego.usuario === $scope.score18xxCtrl.user.name) || ($scope.score18xxCtrl.user.rol === 'Administrador');

    },
        function(err){
            this.error = err;
            $scope.score18xxCtrl.error = err;
            console.log(err);
            if (err.status === 404)
                $location.path('/404').replace();
            
        });     
    };
    
    this.saveJuego = function() {
        if (this.editarNuevo === 'editar') 
            this.actualizaJuego();
        else
            this.addJuego();
        $anchorScroll();
        
    };
    
    this.quitarEmpresa = function(ind) {
        this.juego.companies.splice(ind, 1);
    };
    
    this.juego = {};
    this.juegosalvado = false;
    $scope.score18xxCtrl.bggJuego = null;
    if ($routeParams.idJuego) {
        this.editarNuevo = 'editar';
        this.juego._id = $routeParams.idJuego;
        this.titulo = 'Datos del juego';
        this.getJuego();
        this.callbggJuego();
    }
    else {
        this.editarNuevo = 'nuevo';
        this.juego.companies = [];
        this.titulo = 'Añade un nuevo juego';
        this.modJuego = true;
    }
    $anchorScroll();

}]);