'use strict';

var score18xxControllers = angular.module('score18xxControllers', ['ui.bootstrap']);

score18xxControllers.controller('score18xxController', ['$uibModal', function($uibModal) {
    this.user = {};
    
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



