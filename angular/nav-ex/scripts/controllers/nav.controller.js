(function(angular) {
    'use strict';

    angular
        .module('app.controllers')
        .controller("navController", app)
        .controller("view1Controller", view1)
        .controller("view2Controller", view2);

    function app($location) {
        var vm = this;
        vm.message = "Hello, David";
        vm.goToView2 = goToView2;

        activate();

        function activate() {
        }

        function goToView2() {
            $location.path('view2');
        }
    }

    function view1() {
        var vm = this;
        vm.message = "Hello, David. Welcome to view 1.";

        activate();

        function activate() {
        }
    }

    function view2($log, $routeParams) {
        var vm = this;
        vm.message = "Hello, David. Welcome to view 2, it got called with params:" + $routeParams.userid;

        $log.info('route paramameters:', $routeParams.userid);

        activate();

        function activate() {
        }
    }
})(angular);

