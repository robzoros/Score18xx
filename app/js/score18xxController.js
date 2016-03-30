'use strict';

var score18xxControllers = angular.module('score18xxControllers', ['ui.bootstrap']);

score18xxControllers.controller('score18xxController', ['$scope', '$rootScope', '$uibModal', 'AuthService', 'bggJuegoFactory'
, function($scope, $rootScope, $uibModal, AuthService, bggJuegoFactory) {
    if (!this.user) {
        this.user = {};
        if ($rootScope.token) {
            AuthService.userInfo().then(function(data) {
                $scope.score18xxCtrl.user.name = data.name;
                $scope.score18xxCtrl.user.rol = data.rol;
            }), function(errMsg) {
                console.log(errMsg);
            };
        }
    };
    
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
    
    this.linkbgg = bggJuegoFactory.linkbgg;
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

score18xxControllers.controller('ErrorCtrl', [ '$scope', function($scope) {
    $scope.score18xxCtrl.mostrarMenu = false;
}]);

