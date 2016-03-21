var nuevoJuegoCtrl = angular.module('NuevoJuegoController', ['score18xxFactory']);

nuevoJuegoCtrl.controller('NuevoJuegoCtrl', ['$scope','$http', 'bggJuegoFactory', '$routeParams', function($scope, $http, bggJuegoFactory, $routeParams) {

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
        var params = this.juego;
        console.log('ADDJUEGO: ' + JSON.stringify(this.juego));
        console.log('ADDJUEGO: ' + JSON.stringify(params));
        $scope.nuevo.juegosalvado = false;
        $scope.nuevo.error = '';

        return $http.post('http://localhost:3000/api/juego', params).
            then(function(response){
                console.log(response);
                $scope.nuevo.juegosalvado = true;
                $scope.nuevo.editarNuevo = 'editar';
            },
            function(err){
                $scope.nuevo.juegosalvado = false;
                if (err.data.indexOf('E11000') > -1)
                    $scope.nuevo.error = 'Ya existe un juego con ese identificador';
                else
                    $scope.nuevo.error = err.data;
                console.log(err);
        });        
    };
    
    this.actualizaJuego = function() {
        var params = this.juego;
        console.log('ACTUALIZAJUEGO: ' + JSON.stringify(this.juego));
        console.log('ACTUALIZAJUEGO: ' + JSON.stringify(params));
        $scope.nuevo.juegosalvado = false;

        return $http.put('http://localhost:3000/api/juego/' + params._id, params).
            then(function(response){
                console.log(response);
                $scope.nuevo.editarNuevo = 'editar';
                $scope.nuevo.juegosalvado = true;
            },
        function(err){
            $scope.nuevo.error = err.data;
            console.log(err);
        });   
    };

    this.callbggJuego = function() {
        
        if (angular.isUndefined(this.juego._id) || this.juego._id === '') return;
        var id = this.juego._id;
        console.log('ID:' + id);
        bggJuegoFactory.callbggJuegos(id)
        .then(function(response){
            if (response.data.items.item) {
                $scope.score18xxCtrl.bggJuego = bggJuegoFactory.getbggDatos(response.data.items.item);
            }
            else {
                $scope.score18xxCtrl.bggJuego = "";
                console.log("NUEVOJUEGO-CALLBGGJUEGO. Juego con id " + id + "no encontrado");
                $scope.nuevo.noencontrado = true;
            }
        },
        function(err){
            $scope.score18xxCtrl.bggJuego = err;
            console.log(err);
        });
    };
    
    this.getJuego = function() {
      $http.get('http://localhost:3000/api/juego/' + this.juego._id)
        .then(function(response){
            $scope.nuevo.juego = response.data;
            console.log($scope.nuevo.juego);
    },
        function(err){
            this.error = err;
        });     
    };
    
    this.saveJuego = function() {
        console.log('SAVEJUEGO: ' + this.editarNuevo);
        if (this.editarNuevo === 'editar') 
            this.actualizaJuego();
        else
            this.addJuego();
        
    };
    
    this.quitarEmpresa = function(ind) {
        this.juego.companies.splice(ind, 1)
    };
    
    this.juego = {};
    this.juegosalvado = false;
    $scope.score18xxCtrl.bggJuego = null;
    if ($routeParams.idJuego) {
        this.editarNuevo = 'editar';
        console.log($routeParams.idJuego);
        this.juego._id = $routeParams.idJuego;
        this.titulo = 'Datos del juego';
        this.getJuego();
        this.callbggJuego();
    }
    else {
        console.log('Juego Nuevo');
        this.editarNuevo = 'nuevo';
        this.juego.companies = [];
        this.titulo = 'Añade un nuevo juego';
    }

}]);