'use strict';

/* Directives */
var directivas = angular.module('directivas', [
    'score18xxControlers',
    'ngAnimate',
    'ui.bootstrap'
]);
    
directivas.directive("menuTabs", function() {
    return {
        scope: false,
        restrict: "E",
        templateUrl: "menu-score18xx.html",
        controller: function($scope) {
            $scope.score18xxCtrl.prueba = "Titulo una prueba";
            
            this.clickMenu = function(choice){
                $scope.score18xxCtrl.paginaActiva = choice;
            };

            /* this.status = {
                isopen: false
            };

            this.toggled = function(open) {

            };
            

            this.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                this.status.isopen = !this.status.isopen;
            };



            this.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
            */

        },
        controllerAs: "menu"
    };
});