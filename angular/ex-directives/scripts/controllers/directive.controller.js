(function(angular) {
    'use strict';

    angular
        .module('app.controllers')
        .controller('helloController', init);

    function init() {
        var vm = this;
        vm.hello = "hello David";
    }
})(angular);
