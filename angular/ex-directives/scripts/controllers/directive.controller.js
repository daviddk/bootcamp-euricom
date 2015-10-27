(function(angular) {
    'use strict';

    angular
        .module('app.controllers')
        .controller('helloController', init);

    function init() {
        var vm = this;
        vm.doThat = doThat;
        vm.hello = "hello David";


        function doThat() {
            console.log("doing that");
        }
    }

})(angular);
