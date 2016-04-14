var listaJuegosCtrl = angular.module('UsuarioController', []);

listaJuegosCtrl.controller('UsuarioCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
    this.idioma = $scope.score18xxCtrl.idioma;
    $scope.score18xxCtrl.mostrarMenu = true;
    $scope.score18xxCtrl.mostrarFooter = false;
    
    this.salvar = function() {
        if(this.idioma === this.nuevoIdioma) return;
        var user = {};
        user.idioma = this.nuevoIdioma;
        AuthService.idioma(user).then(function(data) {
            $scope.score18xxCtrl.user.idioma = data.idioma;
            $scope.usuCtrl.idioma = data.idioma;
            $scope.usuCtrl.success = true;
            $scope.usuCtrl.error = false;
        }), function(errMsg) {
            $scope.usuCtrl.success = false;
            $scope.usuCtrl.error = true;
            $scope.usuCtrl.msg = errMsg;
        };
    };
    
    this.datosUsuario = function() {
        AuthService.userInfo().then(function(data) {
            $scope.usuCtrl.name = data.name;
            $scope.usuCtrl.rol = data.rol;   
            $scope.usuCtrl.idioma = data.idioma;   
            $scope.usuCtrl.email = data.email;
            if (!data.idioma) $scope.usuCtrl.idioma = $scope.score18xxCtrl.idioma;

        }), function(errMsg) {
            console.log(errMsg);
            this.inicio = true;
        };
    };

    this.datosUsuario();
    this.success = false;
    this.error = false;
    $scope.score18xxCtrl.mostrarMenu = true;
    $scope.score18xxCtrl.mostrarFooter = false;
        
}]);