(function(angular) {
    'use strict';

    angular
        .module('app.controllers')
        .controller('tabAppController', tabAppController);

    function tabAppController() {
        var vm = this;
        vm.hello = "hello David";
    }

})(angular);
