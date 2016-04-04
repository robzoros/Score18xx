'use strict';

var score18xxControllers = angular.module('score18xxControllers', ['ui.bootstrap']);

score18xxControllers.controller('score18xxController', ['$scope', '$rootScope', '$uibModal', 'AuthService', 'bggJuegoFactory', 'GENERAL'
, function($scope, $rootScope, $uibModal, AuthService, bggJuegoFactory, GENERAL) {

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
    };
    
    // Función para abrir ventana de calcular dividendos
    this.open = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'calcular-dividendos.html',
            size: 'lg',
            controller: 'dividendosController',
            controllerAs: 'divCtrl'
        }, 
        function () {
            console.log('Modal dismissed at: ' + new Date());
        });
        
        modalInstance.result.then(function () {
            console.log('Modal instance result: ' + new Date());
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    
    // Función para abrir ventana de cambio de password
    this.openCC = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'cambiar-password.html',
            size: 'me',
            controller: 'cambiarPassController',
            controllerAs: 'cpassCtrl'
        }, 
        function () {
            console.log('Modal dismissed at: ' + new Date());
        });
        
        modalInstance.result.then(function () {
            console.log('Modal instance result: ' + new Date());
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    
    this.linkbgg = bggJuegoFactory.linkbgg;
    this.paginaInicio = GENERAL.entrada;
    this.user = {};
    this.iniciarUsuario();
    
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
    
    $scope.getDividendos = function(div) {

        $scope.divCtrl.listaDividendos = [];
        
        $scope.divCtrl.mul10 = !((div % 10) > 0);

        if ($scope.divCtrl.mul10) {
            for (var i=1; i<= 10; i++ ) {
                $scope.divCtrl.listaDividendos.push(i*(div / 10));
            };
        }
        
    };

}]);

// Modal para calcular dividendos
score18xxControllers.controller ('cambiarPassController', [ '$scope', '$uibModalInstance', 'AuthService'
 , function ($scope, $uibModalInstance, AuthService) {
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
            $scope.passMsg  = "Se ha cambiado la contraseña correctamente.";
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
}]);

