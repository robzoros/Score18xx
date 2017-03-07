var loginCtrl = angular.module('LoginController', ['ui.bootstrap', 'ServicioModal']);

loginCtrl.controller('LoginCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'AuthService', 'modalService', 'GENERAL', 'gettextCatalog'
, function($scope, $location, $routeParams, $rootScope,  AuthService, modalService, GENERAL, gettextCatalog ) {

    this.cargarUsuario = function() {
        AuthService.userInfo().then(function(data) {
            $scope.loading = false;
            $scope.score18xxCtrl.user.name = data.name;
            $scope.score18xxCtrl.user.rol = data.rol;
            if (data.idioma) {
                $scope.score18xxCtrl.idioma = data.idioma;
                $scope.score18xxCtrl.cambiarIdioma(data.idioma);
            };
            $location.path(GENERAL.entrada).replace();
        }), function(errMsg) {
            console.log(errMsg);
            this.inicio = true;
        };
    };
    
    this.login = function() {
        $scope.loading = true;
        AuthService.login(this.user).then(function(msg) {
            $scope.logCtrl.cargarUsuario();
        }, function(errMsg) {
            AuthService.login(this.user).then(function(msg) {
                $scope.logCtrl.cargarUsuario();
            }, 
            function(errMsg) {
                $scope.loading = false;
                var modalOptions = {
                    showCloseButton: false,
                    actionButtonText: 'Ok',
                    headerText: gettextCatalog.getString('Error de conexión'),
                    bodyText: errMsg
                };

                modalService.showModal({}, modalOptions)
                    .then(function () {
                });
            });
        });
    };

    this.registrar = function() {
        if ($scope.loginform.confirmPassword.$error.validator) return;
        var usuario = this.user;
        usuario.idioma = 'es_ES';
        AuthService.register(usuario).then(function(msg) {
            var modalOptions = {
                showCloseButton: false,
                actionButtonText: 'Ok',
                headerText: gettextCatalog.getString('Usuario registrado'),
                bodyText: gettextCatalog.getString('Se ha registrado su usuario correctamente.')
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
                headerText: gettextCatalog.getString('Error en registro de usuario'),
                bodyText: errMsg
            };

            modalService.showModal({}, modalOptions)
                .then(function () {
            }); 
        });
    };
    
    this.reset = function() {
        AuthService.reset(this.user).then(function(msg) {
            var modalOptions = {
                showCloseButton: false,
                actionButtonText: 'Ok',
                headerText: gettextCatalog.getString('Contraseña creada'),
                bodyText: gettextCatalog.getString('Se ha creado una nueva contraseña.<br\>Recibirá un correo electrónico con dicha clave.')
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
                headerText: gettextCatalog.getString('Error en cambio de contraseña'),
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
    $scope.score18xxCtrl.mostrarFooter = false;
    
    if ($routeParams.reg) {
        if (($routeParams.reg !== 'r') && ($routeParams.reg !== 's')) $location.path('/login/r').replace();
        this.inicio = true;
        this.registro = $routeParams.reg;
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
        this.registro = 'login';
    };    
}]);
