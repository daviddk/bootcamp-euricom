(function(angular) {
    'use strict';

    angular
        .module('app.controllers')
        .controller("navController", app)
        .controller("view1Controller", view1)
        .controller("view2Controller", view2);

    function app($state) {
        var vm = this;
        vm.message = "Hello, David";
        vm.goToView2 = goToView2;
        vm.userid = 123;

        activate();

        function activate() {
        }

        function goToView2() {
            $state.go('view2');
        }
    }

    function view1() {
        var vm = this;
        vm.message = "Hello, David. Welcome to view 1.";

        activate();

        function activate() {
        }
    }

    function view2($log, $stateParams) {
        var vm = this;
        vm.message = "Hello, David. Welcome to view 2, it got called with params:" + $stateParams.userid;

        $log.info('route paramameters:', $stateParams.userid);

        activate();

        function activate() {
        }
    }
})(angular);

