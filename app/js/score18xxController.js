'use strict';

var score18xxControllers = angular.module('score18xxControllers', ['ui.bootstrap']);

score18xxControllers.controller('score18xxController', ['$scope', '$window', '$rootScope', '$location', '$uibModal', 'AuthService', 'bggJuegoFactory', 'GENERAL', 'gettextCatalog'
, function($scope, $window, $rootScope, $location, $uibModal, AuthService, bggJuegoFactory, GENERAL, gettextCatalog) {

    // recuperamos token e información de usuario si existe token
    this.iniciarUsuario = function() {
        if ($rootScope.access_token) {
            AuthService.userInfo().then(function(data) {
                $scope.score18xxCtrl.user.name = data.name;
                $scope.score18xxCtrl.user.rol = data.rol;
            }), function(errMsg) {
                console.log(errMsg);
            };
        }
        else
            $location.path('/login').replace();
    };
    
    // Modal calculo dividendos
    this.open = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'calcular-dividendos.html',
            size: 'lg',
            controller: 'dividendosController',
            controllerAs: 'divCtrl'
        }, 
        function () {
        });
        
        modalInstance.result.then(function () {
        }, function () {
        });
    };
    
    // Modal cambio de password
    this.openCC = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'cambiar-password.html',
            size: 'me',
            controller: 'cambiarPassController',
            controllerAs: 'cpassCtrl'
        }, 
        function () {
        });
        
        modalInstance.result.then(function () {
        }, function () {
        });
    };
    
    // Modal cambio de password
    this.terminosDeUso = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'terminos-uso.html',
            size: 'lg',
            controller: 'termsOfUseController',
            controllerAs: 'termsCtrl'
        }, 
        function () {
        });
        
        modalInstance.result.then(function () {
        }, function () {
        });
    };
    
    this.cambiarIdioma = function(idioma){
        gettextCatalog.setCurrentLanguage(idioma);
        this.idioma = idioma;
        var clase = 'flag-icon ' +  this.listaClasesIdiomas[this.listaIdiomas.indexOf(idioma)];
        var flag = document.getElementById('currentFlag');
        if (flag) flag.className = clase;
    };

    this.textoJuego = function() {
        return gettextCatalog.getString('Juego elegido');
    };
    
    this.linkbgg = bggJuegoFactory.linkbgg;
    this.paginaInicio = GENERAL.entrada;
    this.listaIdiomas = ['es_ES', 'en_US'];
    this.listaClasesIdiomas = ['flag-icon-es', 'flag-icon-us'];
    this.user = {};
    this.iniciarUsuario();
    var lang = $window.navigator.language || $window.navigator.userLanguage;
    if (lang.substring(0, 2) === 'es')
        lang = 'es_ES';
    else
        lang = 'en_US';
    this.cambiarIdioma(lang);
    gettextCatalog.debug = true;
    
}]);

// Modal para calcular dividendos
score18xxControllers.controller ('dividendosController', [ '$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    this.mul10 = true;
    
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.getDividendos = function(div, acciones) {

        $scope.divCtrl.listaDividendos = [];
        
        $scope.divCtrl.mul10 = !((div % 10) > 0);

        if ($scope.divCtrl.mul10) {
            for (var i=1; i<= acciones; i++ ) {
                $scope.divCtrl.listaDividendos.push(i*(div / acciones));
            };
        }
        
    };

}]);

// Modal para términos de uso
score18xxControllers.controller ('termsOfUseController', [ '$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };
}]);

// Modal para cambiar password
score18xxControllers.controller ('cambiarPassController', [ '$scope', '$uibModalInstance', 'AuthService', 'gettextCatalog'
 , function ($scope, $uibModalInstance, AuthService, gettextCatalog) {
    $scope.passChanged = false;
    $scope.passError = false;
    this.password = "";
    this.newPassword = "";
    this.confirmPassword = "";

    $scope.cancel = function () {
        $scope.passChanged = false;
        $scope.passError = false;
        this.password = "";
        this.newPassword = "";
        this.confirmPassword = "";        
        $uibModalInstance.close();
    };
    
    $scope.cambiarPassword = function(nombre) {
        if ($scope.cambiarPass.confirmPassword.$error.validator) return;
        var user = {};
        user.name = nombre;;
        user.newPassword = $scope.cpassCtrl.newPassword;
        user.password = $scope.cpassCtrl.password;
        AuthService.cambiar(user).then(function(msg) {
            $scope.passChanged = true;
            $scope.passError = false;
            $scope.passMsg  = gettextCatalog.getString("Se ha cambiado la contraseña correctamente.");
        }, function(errMsg) {
            $scope.passChanged = false;
            $scope.passError = true;
            $scope.passMsg  = errMsg;
            console.log(errMsg);
        });
    };

}]);

score18xxControllers.controller('ErrorCtrl', [ '$scope', function($scope) {
    $scope.score18xxCtrl.mostrarMenu = false;
    $scope.score18xxCtrl.mostrarFooter = false;
}]);

