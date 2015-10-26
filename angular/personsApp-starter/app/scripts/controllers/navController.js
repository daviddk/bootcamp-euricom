(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    function NavController($location) {
        var vm = this;

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    };
})();
