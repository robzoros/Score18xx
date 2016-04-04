var servicioModal = angular.module('ServicioModal', ['ui.bootstrap']);

servicioModal.service('modalService', ['$uibModal', '$sce', function ($uibModal, $sce) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Cerrar',
        showCloseButton: true,
        actionButtonText: 'OK',
        headerText: 'Cabecera',
        bodyText: '¿Ejecutar?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        customModalOptions.bodyText = $sce.trustAsHtml(customModalOptions.bodyText);
        console.log(customModalOptions.bodyText);

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            }];
        }

        return $uibModal.open(tempModalDefaults).result;
    };

}]);
