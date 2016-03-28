var loginCtrl = angular.module('LoginController', ['ui.bootstrap', 'ServicioModal']);

loginCtrl.controller('LoginCtrl', ['$scope', 'AuthService', 'modalService', '$location', '$routeParams', '$rootScope',
    function($scope, AuthService, modalService, $location, $routeParams, $rootScope ) {

    this.cargarUsuario = function() {
        AuthService.userInfo().then(function(data) {
            $scope.score18xxCtrl.user.name = data.name;
            $scope.score18xxCtrl.user.rol = data.rol;
            $location.path('/nueva').replace();
        }), function(errMsg) {
            console.log(errMsg);
            this.inicio = true;
        };
    };
    
    this.login = function() {
        AuthService.login(this.user).then(function(msg) {
            $scope.logCtrl.cargarUsuario();
        }, function(errMsg) {
            var modalOptions = {
                showCloseButton: false,
                actionButtonText: 'Ok',
                headerText: 'Error de conexión',
                bodyText: errMsg
            };

            modalService.showModal({}, modalOptions)
                .then(function () {
            });            
        });
    };

    this.registrar = function() {
        AuthService.register(this.user).then(function(msg) {
            var modalOptions = {
                showCloseButton: false,
                actionButtonText: 'Ok',
                headerText: 'Usuario registrado',
                bodyText: 'Se ha registrado su usuario correctamente.'
            };

            modalService.showModal({}, modalOptions)
                .then(function () {
            });
            AuthService.logout();
            $location.path('/login').replace();
            
        }, function(errMsg) {
            var modalOptions = {
                showCloseButton: false,
                actionButtonText: 'Ok',
                headerText: 'Error en registro de usuario',
                bodyText: errMsg
            };

            modalService.showModal({}, modalOptions)
                .then(function () {
            }); 
        });
    };
    
    //Código de inicio del controlador
    this.inicio = false;
    $scope.score18xxCtrl.mostrarMenu = false;
    
    if ($routeParams.reg) {
        if ($routeParams.reg !== 'r') $location.path('/login/r').replace();
        this.inicio = true;
        this.registro = true;
    }
    else {
        
        if ($rootScope.access_token) {
            // Si ya tenemos token recogemos información del usuario y accedemos a inicio
            this.cargarUsuario();
        }
        else {
            this.user = {
                name: '',
                password: ''
            };        
            this.inicio = true;
        }
        this.registro = false;
    };    
}]);
